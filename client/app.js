/*
 * Read more on http-vue-loader
 * https://www.npmjs.com/package/http-vue-loader
 */
const Home = window.httpVueLoader('./components/Home.vue')
const Foot = window.httpVueLoader('./components/Foot.vue')
const Navbar = window.httpVueLoader('./components/Navbar.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Artists = window.httpVueLoader('./components/Artists.vue')
const Artist = window.httpVueLoader('./components/Artist.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/foot', component: Foot },
  { path: '/nav', component: Navbar },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/artists', component: Artists }, 
  { path: '/artist/:artistId', component: Artist, name: 'artist' },
  { path: '/panier', component: Panier },
  { path: '/contact', component: Contact}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  el: '#app',
  router,
  data: {
    userRegistrationResult: '', 
    userLoginResult: '',
    artists: [],
    albums: []
  },
  

  methods: {
    
    async userRegistration (email, password, pseudo){
      try{
        const res = await axios.post('api/register/',{email: email, password: password, pseudo: pseudo})
        console.log(res.data)
        this.userRegistrationResult = res.data
      }

      catch (err){
        console.log(err.response.data.message)
        this.userRegistrationResult = err.response.data.message
      }
    },

    async userLogin (email, password){
      
      try {
        const res = await axios.post('api/login/',{email: email, password: password})    
        console.log(res.data)  
        this.userLoginResult = res.data
      }

      catch(err) {
        this.userLoginResult = err.response.data.message
        console.log(err.response.data.message)
      }
    },

    async fillAlbums(artistId){
      try {
        this.albums = []
        artistId = parseInt(artistId)
        console.log(artistId)
        setTimeout(console.log('timeout'), 2000)
        const res = await axios.get('api/getAlbums/', artistId)
        for (i = 0; i < res.data.length ; i++){
          this.albums.push({
            name: res.data[i].name,
            releaseYear: res.data[i].releaseyear,
            imageUrl: res.data[i].imageurl
          })
          console.log(albums[i])
        }
      }
      catch(err) {
        console.log(err.response.data.message)
      }
    }
  },

  components: { Home },

  async created(){
          try {
          const res = await axios.get('api/getArtists')
          temp = []
          console.log(res.data.length)
          for (i = 0; i < res.data.length ; i++){
            this.artists.push({
              name: res.data[i].name,
              id: res.data[i].id,
              genre: res.data[i].genre,
              imageUrl: res.data[i].image
            })
          }
        }

        catch(err) {
          console.log(err.response.data.message)
        }
        
      }

}).$mount('#app')


