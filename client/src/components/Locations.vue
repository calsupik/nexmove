<template>
  <div class="container">
    <h4>Locations</h4>
    <b-btn variant="primary" v-on:click="createLocation()">Create New Location</b-btn>
    <b-table v-if="locations" :items="locations" :fields="fields" striped hover bordered v-on:row-clicked="(item,index,event) => {toggleEditLocation(item)}"></b-table>
    <b-modal v-model="editLocationModal" v-if="currentLocation" title="Location">
      <div class="d-block text-center">
        <b-form>
          <h3>Edit Location</h3>
          <b-form-group>
            <b-form-input v-model="currentLocation.name" type="text" placeholder="Name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-textarea v-model="currentLocation.short_desc" placeholder="Short Description" rows="3"></b-form-textarea>
          </b-form-group>
          <b-form-group>
            <b-form-textarea v-model="currentLocation.long_desc" placeholder="Long Description" rows="3"></b-form-textarea>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="currentLocation.img" type="text" placeholder="Image URL"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="currentLocation.lat" type="number" placeholder="Latitude"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="currentLocation.lng" type="number" placeholder="Longitude"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="currentLocation.radius" type="number" placeholder="Radius"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="currentLocation.type" type="text" placeholder="Type"></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <div slot="modal-footer">
          <b-btn variant="danger" v-on:click="deleteLocationModal=true">Delete</b-btn>
          <b-btn v-on:click="toggleEditLocation()">Cancel</b-btn>
          <b-btn variant="success" v-on:click="saveLocation(currentLocation)">Save</b-btn>
      </div>
    </b-modal>
    <b-modal v-model="deleteLocationModal" v-if="currentLocation" title="Location">
      <h3>Delete Location</h3>
      <p>Are you sure you want to delete this location?</p>
      <div slot="modal-footer">
          <b-btn v-on:click="toggleEditLocation(currentLocation)">Cancel</b-btn>
          <b-btn variant="danger" v-on:click="deleteLocation(currentLocation)">Delete</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Locations from '../factories/Locations'

export default {
  name: 'Locations',
  data () {
    return {
      locations: null,
      currentLocation: null,
      editLocationModal: false,
      deleteLocationModal: false,
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'short_desc',
          label: 'Short Description',
          sortable: false
        },
        {
          key: 'long_desc',
          label: 'Long Description',
          sortable: false
        },
        {
          key: 'img',
          label: 'Image URL',
          sortable: false
        },
        {
          key: 'lat',
          label: 'Latitude',
          sortable: false
        },
        {
          key: 'lng',
          label: 'Longitude',
          sortable: false
        },
        {
          key: 'radius',
          label: 'Radius',
          sortable: true
        },
        {
          key: 'type',
          label: 'Category',
          sortable: true
        }
      ]
    }
  },
  computed: {},
  methods: {
    toggleEditLocation (location) {
      this.currentLocation = location || null
      this.editLocationModal = !this.editLocationModal
    },
    createLocation () {
      this.toggleEditLocation({})
    },
    async saveLocation (location) {
      await Locations.save(location)
      this.toggleEditLocation()
      await this.getLocations()
    },
    async deleteLocation (location) {
      await Locations.delete(location)
      this.toggleEditLocation()
      await this.getLocations()
    },
    async getLocations () {
      this.locations = await Locations.get()
    }
  },
  async mounted () {
    await this.getLocations()
  },
  async created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  cursor: pointer;
  margin: 20px 0px;
}
</style>
