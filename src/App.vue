<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list class="pt-0" dense>
        <v-list-tile :to="item.path" v-for="item in items" :key="item.name">
          <v-list-tile-action >
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Qawaq</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      drawer : false,
      items : [
        {path:'/dashboard', name: 'Dashboard', icon: 'home'},
        {path:'/historial', name: 'Historial', icon: 'mdi-history'},
        {path:'/nuevo', name: 'Nuevo trabajo', icon: 'mdi-calendar-plus'},
      ],
    }
  }
}
</script>

<style>

</style>
