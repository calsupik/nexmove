
import Locations from '../../../models/Locations'
import config from '../../../../config'

export default {
  async all({ req, res, postgres }) {
    const locations = new Locations(postgres)
    const info = req.body
    const rows = await locations.getLocations(info)
    res.json(rows)
  }
}
