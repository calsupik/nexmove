import bunyan from 'bunyan'
import Errors from '../errors'
import PostgresClient from '../libs/PostgresClient'
import LoginHandler from '../libs/LoginHandler'
import Users from '../libs/models/Users'
import config from '../config'

const log       = bunyan.createLogger(config.logger.options)
const postgres  = new PostgresClient()

export default async function AuthSession(req, res) {
  res.json({ session: req.session })
}
