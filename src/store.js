import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/functions";

firebase.initializeApp({
  apiKey: "AIzaSyDX41xGjLJ_lvL7fdBEmlRfaHkAqDBJMvQ",
  authDomain: "gdg-galway-24365.firebaseapp.com",
  databaseURL: "https://gdg-galway-24365.firebaseio.com",
  projectId: "gdg-galway-24365",
  storageBucket: "",
  messagingSenderId: "948204882669",
  appId: "1:948204882669:web:850022d0ebd80072"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    firebase,
    items: [
      { text: "Home", to: "/", icon: "home" },
      { text: "Events", to: "/events", icon: "rounded_corner" },
      { text: "Team", to: "/team", icon: "group" },
      { text: "About", to: "/about", icon: "toc" },
      { text: "Contact", to: "/contact", icon: "person" }
    ]
  },
  getters: {
    links: state => {
      return state.items;
    },
    functions: state => {
      return state.firebase.functions();
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {}
});
