import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)
firebase.initializeApp({
  apiKey: "AIzaSyC70osmta_T43krUlLcLOiOCugkf5A4IWI",
  authDomain: "momo-8cfa1.firebaseapp.com",
  databaseURL: "https://momo-8cfa1.firebaseio.com",
  projectId: "momo-8cfa1",
  storageBucket: "momo-8cfa1.appspot.com",
  messagingSenderId: "600539359987"
})

const state = {
  db: firebase.firestore(),
  position: null
}
const mutations = {
  SET_POSITION(state, position){
    state.position = position
  }
}
const actions = {
  getPosition({commit}, position){
    commit('SET_POSITION', position)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})