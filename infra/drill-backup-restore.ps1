# Backup-and-restore drill (no Docker needed).
# Uses portable PostgreSQL binaries (see ADR 0005) to prove backup-postgres.ps1 style
# dumps actually restore: create data -> dump -> destroy -> restore -> verify.
#
# Usage:
#   .\drill-backup-restore.ps1 -PgBin "C:\path\to\pgsql\bin" [-Port 54333]
param(
  [Parameter(Mandatory = $true)][string]$PgBin,
  [int]$Port = 54333
)

$ErrorActionPreference = 'Stop'
$Work = Join-Path ([System.IO.Path]::GetTempPath()) 'puremart-drill'
$Data = Join-Path $Work 'data'
$Dump = Join-Path $Work 'drill.dump'
$env:PGPASSWORD = 'drill'
$env:Path = "$PgBin;" + $env:Path

function Step($msg) { Write-Output "==> $msg" }

Remove-Item -Recurse -Force $Work -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $Data | Out-Null

Step '1. initdb (fresh cluster)'
& "$PgBin\initdb.exe" -D $Data -U postgres --auth=trust -E UTF8 | Out-Null

Step '2. start server'
& "$PgBin\pg_ctl.exe" start -D $Data -o "-p $Port" -l (Join-Path $Work 'server.log')
Start-Sleep -Seconds 5

Step '3. create sample escrow ledger'
& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -c 'CREATE DATABASE drilldb;' | Out-Null
& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -d drilldb -c 'CREATE TABLE escrow_ledger(id serial primary key, amount_kobo bigint);' | Out-Null
& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -d drilldb -c "INSERT INTO escrow_ledger(amount_kobo) VALUES (2450000),(800000);" | Out-Null
$before = (& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -d drilldb -tAc 'SELECT count(*), sum(amount_kobo) FROM escrow_ledger;').Trim()
Step "   rows before disaster: $before"

Step '4. pg_dump (custom format, like backup-postgres.ps1)'
# NOTE: dbname goes LAST (this build stops parsing options after it), and never use
# PowerShell `>` redirect for binary dumps — it re-encodes as UTF-16 and corrupts them.
& "$PgBin\pg_dump.exe" -h 127.0.0.1 -p $Port -U postgres -Fc -f $Dump drilldb
Step "   dump size: $((Get-Item $Dump).Length) bytes"

Step '5. DISASTER: wipe the cluster'
& "$PgBin\pg_ctl.exe" stop -D $Data -m fast | Out-Null
Remove-Item -Recurse -Force $Data
& "$PgBin\initdb.exe" -D $Data -U postgres --auth=trust -E UTF8 | Out-Null
& "$PgBin\pg_ctl.exe" start -D $Data -o "-p $Port" -l (Join-Path $Work 'server2.log')
Start-Sleep -Seconds 5
& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -c 'CREATE DATABASE drilldb;' | Out-Null

Step '6. pg_restore into the fresh cluster'
& "$PgBin\pg_restore.exe" -h 127.0.0.1 -p $Port -U postgres -d drilldb $Dump

Step '7. verify'
$after = (& "$PgBin\psql.exe" -h 127.0.0.1 -p $Port -U postgres -d drilldb -tAc 'SELECT count(*), sum(amount_kobo) FROM escrow_ledger;').Trim()
Step "   rows after restore:  $after"

& "$PgBin\pg_ctl.exe" stop -D $Data -m fast | Out-Null
Remove-Item -Recurse -Force $Work -ErrorAction SilentlyContinue

if ($before -eq $after -and $before -ne '') {
  Write-Output 'DRILL RESULT: PASS — backup restores every kobo.'
} else {
  Write-Output 'DRILL RESULT: FAIL — data mismatch!'
  exit 1
}
