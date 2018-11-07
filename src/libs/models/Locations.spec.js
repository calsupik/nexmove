import '../../../tests/spec_helper'

import path from 'path'
import assert from 'assert'
import PostgresClient from '../PostgresClient'
import Locations from './Locations.js'

const NOOP = () => {}
const postgresUrl = process.env.TEST_DB || process.env.DATABASE_URL || 'postgresql://localhost:5432/nexmove_test'

const pg = new PostgresClient(postgresUrl)
const locations = Locations(pg)

describe('Locations', function() {
  describe('#getLocations', function() {
    it('should get all locations', function() {
      const locations = Locations(pg)
      const allLocations = locations.getLocations()

      assert.equal(false, allLocations)
    })
  })
})
