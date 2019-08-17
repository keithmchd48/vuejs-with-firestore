import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store/index'
import * as firebase from 'firebase/app';
import 'firebase/firestore'

Vue.config.productionTip = false;
const firebaseConfig = {
    apiKey: "AIzaSyBOKSa_e0YkKaXFCAbH9VmJixA82gVHeLo",
    authDomain: "vue-firebase-fa9c0.firebaseapp.com",
    databaseURL: "https://vue-firebase-fa9c0.firebaseio.com",
    projectId: "vue-firebase-fa9c0",
    storageBucket: "",
    messagingSenderId: "445865602862",
    appId: "1:445865602862:web:6239629d731d53a2"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

new Vue({
    store,
  render: h => h(App),
}).$mount('#app');
