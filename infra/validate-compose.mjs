import { readFileSync } from 'node:fs';
import { load as yamlLoad } from 'js-yaml';

// Validates infra/docker-compose.*.yml without needing Docker:
// services, images, healthchecks, dependencies, required secrets, port clashes.
const files = ['docker-compose.dev.yml', 'docker-compose.staging.yml', 'docker-compose.prod.yml'];
const errors = [];

for (const file of files) {
  const doc = yamlLoad(readFileSync(new URL(file, import.meta.url), 'utf8'));
  const tag = `[${file}]`;
  for (const svc of ['postgres', 'redis', 'api']) {
    if (!doc.services?.[svc]) errors.push(`${tag} missing service: ${svc}`);
  }
  if (!doc.services?.postgres?.healthcheck) errors.push(`${tag} postgres has no healthcheck`);
  if (!doc.services?.redis?.healthcheck) errors.push(`${tag} redis has no healthcheck`);
  const api = doc.services?.api;
  const deps = api?.depends_on ?? {};
  if (!(deps.postgres?.condition === 'service_healthy')) errors.push(`${tag} api must wait for healthy postgres`);
  if (!(deps.redis?.condition === 'service_healthy')) errors.push(`${tag} api must wait for healthy redis`);
  if (file !== 'docker-compose.dev.yml') {
    const envText = JSON.stringify(api?.environment ?? {});
    if (!envText.includes('${POSTGRES_PASSWORD}')) {
      errors.push(`${tag} api must take POSTGRES_PASSWORD from environment, not hardcode it`);
    }
    if (/(change-me|password123|secret123)/i.test(envText)) {
      errors.push(`${tag} api contains a placeholder-looking hardcoded secret`);
    }
  }
}

const ports = new Map();
for (const file of files) {
  const doc = yamlLoad(readFileSync(new URL(file, import.meta.url), 'utf8'));
  for (const [name, svc] of Object.entries(doc.services ?? {})) {
    for (const p of svc.ports ?? []) {
      const host = String(p).split(':')[0];
      const key = `${host}`;
      if (ports.has(key)) errors.push(`host port ${host} used by both ${ports.get(key)} and ${file}:${name}`);
      ports.set(key, `${file}:${name}`);
    }
  }
}

if (errors.length > 0) {
  console.error('COMPOSE VALIDATION FAILED:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log('Compose files OK:', files.join(', '));
