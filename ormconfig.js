require('dotenv/config')

const isProduction = process.env.NODE_ENV === 'production'

// In production the app runs the compiled output (dist/*.js); in dev it runs
// the TypeScript sources via ts-node (src/*.ts).
const root = isProduction ? 'dist' : 'src'
const ext = isProduction ? 'js' : 'ts'

const hasDatabaseUrl = !!process.env.DATABASE_URL

// Railway's private network usually does not require SSL; the public proxy does.
// Controlled by env so it can be flipped without a code change (see STATE.md).
const useSsl = process.env.DATABASE_SSL === 'true'

const connectionTarget = hasDatabaseUrl
  ? { url: process.env.DATABASE_URL }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT) || 5433,
      username: process.env.PGUSER || 'igmp_user',
      password: process.env.PGPASSWORD || '123456',
      database: process.env.PGDATABASE || 'igmp_db',
    }

module.exports = {
  type: 'postgres',
  ...connectionTarget,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  migrations: [`./${root}/shared/infra/typeorm/migrations/*.${ext}`],
  entities: [`./${root}/modules/**/entities/*.${ext}`],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
}
