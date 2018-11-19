import DatabaseModel from './DatabaseModel'

export default function Locations(postgres) {
  const factoryToExtend = DatabaseModel(postgres, 'locations')

  return Object.assign(
    factoryToExtend,
    {
      accessibleColumns: [
        'name', 'short_desc', 'long_desc', 'img', 'lat',
        'lng', 'radius', 'type'
      ]
    }
  )
}
