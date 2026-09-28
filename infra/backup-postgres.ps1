# Daily PostgreSQL backup (Windows Task Scheduler → run once daily)
# Backs up dev, staging, and prod databases from the local compose services.
$BackupDir = "C:\PuremartBackups"
$KeepDays = 14
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
$Stamp = Get-Date -Format "yyyyMMdd-HHmm"

$Jobs = @(
  @{ Service = "infra-postgres-dev"; Db = "puremart_dev"; File = "dev" },
  @{ Service = "infra-postgres-staging"; Db = "puremart_staging"; File = "staging" },
  @{ Service = "infra-postgres-prod"; Db = "puremart_prod"; File = "prod" }
)

foreach ($j in $Jobs) {
  $Out = Join-Path $BackupDir "$($j.File)-$Stamp.dump"
  # NOTE: never redirect pg_dump stdout with PowerShell `>` — it re-encodes binary
  # dumps as UTF-16 and corrupts them. Dump to a file inside the container, then copy out.
  docker exec $j.Service pg_dump -U puremart -Fc -f /tmp/backup.dump $j.Db 2>> (Join-Path $BackupDir "backup.log")
  if ($?) {
    docker cp "$($j.Service):/tmp/backup.dump" $Out
    if ($?) { Write-Output "OK: $Out" } else { Write-Output "FAIL (copy): $($j.Service)" }
  } else {
    Write-Output "SKIP (service not running?): $($j.Service)"
  }
}

Get-ChildItem -Path $BackupDir -Filter "*.dump" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$KeepDays) } | Remove-Item
Write-Output "Cleanup: dumps older than $KeepDays days removed."
Write-Output "Next: copy $BackupDir off-device (external drive or R2) — a backup on the same disk is not a backup."
