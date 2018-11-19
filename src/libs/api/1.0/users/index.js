
import Users from '../../../models/Users'
import config from '../../../../config'

export default {
  async all({ req, res, postgres }) {
    const users = new Users(postgres)
    const rows = await users.getAll()
    res.json(rows)
  },

  async update({ req, res, postgres }) {
    const users = new Users(postgres)
    const info = req.body
    const row = await users.updateOrCreateBy(info)
    res.json(row)
  },

  async delete({ req, res, postgres }) {
    const users = new Users(postgres)
    const info = req.body
    const row = await users.delete(info.id)
    res.json(row)
  }
}
