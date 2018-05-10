<template>
<v-container fluid grid-list-xs>
  <v-layout row wrap>
    <v-flex d-flex xs12>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm8 md10>
      <div id="map"></div>
    </v-flex>
    <v-flex d-flex xs12 sm4 md2>
      <v-card color="indigo" dark>
        <v-card-title primary-title>
          {{currentLocation}}
        </v-card-title>
        <v-list class="pt-0" v-if="trabajo.sites.length">
          <v-list-tile v-for="(sites, i) in trabajo.sites" :key="i">
            <v-list-tile-title>site.name</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
   <v-fab-transition>
      <v-btn
        :color="indigo"
        v-model="openDialog"
        dark
        fab
        fixed
        bottom
        left
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-fab-transition>
</v-container>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
    name: 'nuevo',
    data: () => ({
      map: '',
      myMarker : '',
      currentLocation: 'Mueve el mapa.',
      bottomVisible: false,
      bottomItem: 1,
      trabajo : {
        sites: []
      }
    }),
    computed: {
      position(){
        return this.$store.state.position
      }
    },
    methods: {
      initMap(position){
          mapboxgl.accessToken = 'pk.eyJ1Ijoic3VnYXJ0YXl0YSIsImEiOiJjamRrZTc2Z2YxOXh1MnFwcnVwamI2OWY3In0.QSF0ljlTpK5bil7mjTUsNg';
          this.map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 12
          });
          this.map.on('load', () => {
            const el = document.createElement('div');
            el.className = 'marker';
            this.myMarker = new mapboxgl.Marker(el)
            .setLngLat(this.map.getCenter())
            .addTo(this.map);
          
            this.map.on('move', () => {
              this.myMarker.setLngLat(this.map.getCenter())
            })
            this.map.on('moveend', () => {
              const location = this.myMarker.getLngLat()
              this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyC70osmta_T43krUlLcLOiOCugkf5A4IWI`)
              .then(response => {
                this.currentLocation = response.data.results[0].formatted_address
              })
            })
          })
      }
    },
    mounted(){
      if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch('getPosition', {lat: position.coords.latitude, lng: position.coords.longitude})
        .then(()=>{ 
          this.initMap(position)
        })
      }, error => {
          console.log(error);
      })
      } else {
        alert('Cannot access geolocation');
      }
    }
}
</script>
<style>
#map {
  background: tomato;
  width: 100%;
  height: 100vh;
}
.marker {
  background-image: url('../assets/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>

