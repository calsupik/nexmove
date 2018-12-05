const appName = process.env.APP_NAME || "NexMove"

export default {
  app: {
    name: appName,
    host: process.env.APP_HOST || "http://localhost:3030"
  },

  server: {
    is_production:    process.env.NODE_ENV === 'production',
    port:             process.env.PORT || 8080,
    web_concurrency:  parseInt(process.env.WEB_CONCURRENCY || 1),
    host:             process.env.SERVER_HOST || "http://localhost:8080"
  },

  auth: {
    global_admin: process.env.GLOBAL_ADMIN,
    global_password: process.env.GLOBAL_PASSWORD
  },

  session: {
    sessionSecret: process.env.SESSION_SECRET || 'nm05041992',
    sessionCookieKey: process.env.SESSION_COOKIE_KEY || 'nexmove'
  },

  newrelic: {
    key:    process.env.NEWRELIC_KEY,
    level:  process.env.NEWRELIC_LEVEL || 'info'
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },

  postgres: {
    connection_string: process.env.DATABASE_URL || 'postgres://localhost:5432/nexmove'
  },

  slack: {
    webhook_url: process.env.SLACK_WEBHOOK_URL
  },

  logger: {
    options: {
      name:   appName,
      level:  process.env.LOGGING_LEVEL || "info",
      stream: process.stdout
    }
  },

  mailer: {
    transporterConfig: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }
  }
}
