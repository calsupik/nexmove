<template>
  <div id="locations">
    <h4 class="text-center">Locations</h4>

    <b-row class="justify-content-md-center">
      <b-btn class="create-location" variant="primary" v-on:click="createLocation()">Create New Location</b-btn>
    </b-row>

    <!-- Confirmation Alert -->
    <b-row class="justify-content-md-center" v-if="dismissCountDown">
      <b-alert :show="dismissCountDown" :variant="dismissCountDownVariant" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" dismissible>
        <p>{{alertText}}</p>
        <b-progress :variant="dismissCountDownVariant" :value="dismissCountDown" :max="dismissSecs" height="4px"></b-progress>
      </b-alert>
    </b-row>

    <!-- Locations Table -->
    <b-table v-if="locations" :items="locations" :fields="fields" striped hover bordered>
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" v-on:click.stop="toggleEditLocation(row.item)" class="mr-1">
          Edit
        </b-btn>
        <b-btn variant="danger" size="sm" v-on:click.stop="deleteLocationModal=true">
          Delete
        </b-btn>
      </template>
    </b-table>

    <!-- Create/Edit Location Modal -->
    <b-modal v-model="editLocationModal" v-if="currentLocation" title="Location">
      <div class="d-block text-center">
        <b-form>
          <h3>Edit Location</h3>
          <b-form-group>
            <b-form-input v-model="currentLocation.name" type="text" placeholder="Name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-textarea v-model="currentLocation.short_desc" placeholder="Short Description" rows="3" maxlength="255"></b-form-textarea>
          </b-form-group>
          <b-form-group>
            <b-form-textarea v-model="currentLocation.long_desc" placeholder="Long Description" rows="3" maxlength="255"></b-form-textarea>
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
          <b-btn v-on:click="toggleEditLocation()">Cancel</b-btn>
          <b-btn variant="success" v-on:click="saveLocation(currentLocation)">Save</b-btn>
      </div>
    </b-modal>

    <!-- Delete Location Confirmation Modal -->
    <b-modal v-model="deleteLocationModal" v-if="currentLocation" title="Location">
      <div class="d-block text-center">
        <h3>Delete Location</h3>
        <p>Are you sure you want to delete this location?</p>
      </div>
      <div slot="modal-footer">
          <b-btn v-on:click="deleteLocationModal=false">Cancel</b-btn>
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
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDownVariant: 'success',
      alertText: null,
      fields: [
        { key: 'name', sortable: true },
        { key: 'lat', label: 'Latitude', sortable: true },
        { key: 'lng', label: 'Longitude', sortable: true },
        { key: 'radius', label: 'Radius', sortable: true },
        { key: 'type', label: 'Category', sortable: true },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  computed: {},
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    toggleEditLocation (location) {
      this.currentLocation = Object.assign({}, location)
      this.editLocationModal = !this.editLocationModal
    },
    createLocation () {
      this.toggleEditLocation({})
    },
    async saveLocation (location) {
      const response = await Locations.save(location)

      this.dismissCountDown = this.dismissSecs
      if (response >= 400) {
        this.alertText = 'Error Saving Location.'
        this.dismissCountDownVariant = 'warning'
      } else {
        this.alertText = 'Location Saved Successfully!'
      }

      this.toggleEditLocation()
      await this.getLocations()
    },
    async deleteLocation (location) {
      const response = await Locations.delete(location)

      this.dismissCountDown = this.dismissSecs
      if (response >= 400) {
        this.alertText = 'Error Deleting Location.'
        this.dismissCountDownVariant = 'warning'
      } else {
        this.alertText = 'Location Deleted Successfully!'
      }

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
.row{
  padding: 10px;
}
</style>
