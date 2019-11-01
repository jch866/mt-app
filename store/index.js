import Vue from 'vue';
import Vuex from 'vuex';
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex);

const store = () => (new Vuex.Store({
    modules: {
        geo,
        home
    },
    actions: {
        async nuxtServerInit({ commit }, { app }) {
            {
                const { status, data: { province, city } } = await app.$axios.get('http://localhost:3000/geo/getPosition');
                commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
            } {

                const { status, data: { menu } } = await app.$axios.get('http://localhost:3000/geo/menu')
                commit('home/setMenu', status === 200 ? menu : [])
            }
        }
    }
}))

export default store;