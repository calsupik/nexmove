import bunyan from 'bunyan'
import PostgresClient from '../libs/PostgresClient'
import config from '../config'

const log = bunyan.createLogger(config.logger.options)
const postgres_url = process.env.DATABASE_URL || 'postgres://localhost:5432/nexmove'

const postgres = new PostgresClient(postgres_url, { max: 1 })

;(async () => {
  try {
    await Promise.all([
      createUsers(postgres),
      createUsersIndexes(postgres),
      createLocations(postgres)
    ])

    log.info("Successfully ran DB migrations!")
    process.exit()

  } catch(err) {
    log.error("Error running DB migrations", err)
    process.exit()
  }
})()

async function createUsers(postgres) {
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS users (
      id bigserial PRIMARY KEY,
      name varchar(255),
      username_email varchar(255) not null,
      password_hash varchar(255),
      first_name varchar(255),
      last_name varchar(255),
      needs_password_reset boolean,
      last_password_reset timestamp(6),
      last_login timestamp(6),
      last_session_refresh timestamp(6),
      num_logins integer,
      created_at timestamp(6) without time zone NOT NULL DEFAULT now(),
      updated_at timestamp(6) without time zone NOT NULL DEFAULT now()
    );
  `)
}

async function createUsersIndexes(postgres) {
  await postgres.query(`CREATE INDEX CONCURRENTLY IF NOT EXISTS users_username_email_idx on users (username_email)`)
}

async function createLocations(postgres) {
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS locations (
      id serial PRIMARY KEY,
      name varchar(255),
      short_desc varchar(255),
      long_desc varchar(255),
      img varchar(255),
      lat double precision,
      lng double precision,
      radius integer,
      type varchar(255),
      created_at timestamp(6) without time zone NOT NULL DEFAULT now(),
      updated_at timestamp(6) without time zone NOT NULL DEFAULT now()
    );
  `)
}
