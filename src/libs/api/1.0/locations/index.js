
import Locations from '../../../models/Locations'
import config from '../../../../config'

export default {
  async all({ req, res, postgres }) {
    const locations = new Locations(postgres)
    const rows = await locations.getAll()
    res.json(rows)
  },

  async update({ req, res, postgres }) {
    const locations = new Locations(postgres)
    const info = req.body
    const row = await locations.updateOrCreateBy(info)
    res.json(row)
  },

  async delete({ req, res, postgres }) {
    const locations = new Locations(postgres)
    const info = req.body
    const row = await locations.delete(info.id)
    res.json(row)
  }
}
