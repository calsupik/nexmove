<template>
  <div id="dashboard" class="container-fluid">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#/dashboard">Dashboard</a>
      </li>
      <li class="breadcrumb-item active">Overview</li>
    </ol>
    <b-row>
      <div class="col-xl-3 col-sm-6 mb-3">
        <div class="card text-white bg-primary o-hidden h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fas fa-fw fa-location-arrow"></i>
            </div>
            <div class="mr-5">{{locations.length}} Total Locations</div>
          </div>
          <a class="card-footer text-white clearfix small z-1" href="#/locations">
            <span class="float-left">View All</span>
            <span class="float-right">
              <i class="fas fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import Locations from '../factories/Locations'

export default {
  name: 'Dashboard',
  components: {},
  data () {
    return {
      locations: null
    }
  },
  computed: {},
  methods: {
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
<style lang="scss" scoped>
#dashboard {
  .card-body-icon {
    position: absolute;
    z-index: 0;
    top: -1.25rem;
    right: -1rem;
    opacity: 0.4;
    font-size: 5rem;
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
}
</style>
