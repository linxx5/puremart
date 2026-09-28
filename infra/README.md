# Infra — local environments

## Start an environment (needs Docker)

```powershell
cd infra
docker compose -f docker-compose.dev.yml up -d        # dev: API :3001, Postgres :5433, Redis :6380
docker compose -f docker-compose.staging.yml up -d    # staging: API :3002 (needs infra/.env)
```

Health checks: `http://localhost:3001/health` (dev), `:3002/health` (staging).
Paystack test webhooks → `POST /webhooks/paystack` (answers 200, test run only).

## Backups

Schedule `backup-postgres.ps1` in Windows Task Scheduler (daily). Then copy
`C:\PuremartBackups` off-device — same-disk copies don't survive disk failure.
Restore drill: `pg_restore` into a fresh container and point staging at it.
