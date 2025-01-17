import Vuex from 'vuex'
import auth0 from 'auth0-js'
import { getUserFromLocalStorage, setToken, unsetToken } from '~/utils/auth'
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'

const origin = process.client ? window.location.origin : process.env.ORIGIN

console.log('### Nuxt environment is: ' + process.env.NUXT_ENV_ENVIRONMENT)

let tmpAuth = null
let tmpVersion = null

// Define auth0 routes depending on your environment
switch (process.env.NUXT_ENV_ENVIRONMENT) {
  case 'develop':
    tmpAuth = new auth0.WebAuth({
      domain: 'gg-develop.eu.auth0.com',
      clientID: 'kJfGQ92cUMcTWEhjYaYQ0NDBir6ByYs9',
      audience: 'https://gg-develop.eu.auth0.com/api/v2/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
    tmpVersion = process.env.CONNECTOR_API_URL_DEVELOP
    break
  case 'staging':
    tmpAuth = new auth0.WebAuth({
      domain: 'gg-staging.eu.auth0.com',
      clientID: 'LsZ4ug7c87ae1SAq1Q3nW4FjvJsQXb7T',
      audience: 'https://gg-staging.eu.auth0.com/api/v2/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
    tmpVersion = process.env.CONNECTOR_API_URL_STAGING
    break
  default: // production
    tmpAuth = new auth0.WebAuth({
      domain: 'auth.grandgarage.eu',
      clientID: 'lwqb_LrkbU8b2rHfbC05C87xqM4bSfms',
      audience: 'https://api.grandgarage.eu/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
    tmpVersion = process.env.CONNECTOR_API_URL
}

const webAuth = tmpAuth
const version = tmpVersion

const baseUrl = process.env.NUXT_ENV_CONNECTOR_URL ? process.env.NUXT_ENV_CONNECTOR_URL : 'https://connector.grandgarage.eu'
const connectorBaseUrl = baseUrl + '/api'
const pretixBaseUrl = 'https://connector.grandgarage.eu/api/pretix/events'

let connector = axios.create({
  baseURL: connectorBaseUrl,
  headers: {}
})

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      debug: '',
      language: 'de',
      sidebar: null,
      settings: {},
      user: null,
      auth: null,
      fabman: null,
      courses: null,
      memberCourses: null,
      member: null,
      workshops: null,
      necessaryCookie: false,
      analyticsCookie: false
    },
    getters: {
      getMemberCourseById: (state) => (id) => {
        if (!state.memberCourses) return
        return state.memberCourses.find(c => c.course_id === parseInt(id))
      },
      getStorageUrl () {
        return baseUrl + '/storage/'
      },
      getBaseUrl () {
        return baseUrl
      },
      getCourses: (state) => () => {
        return state.courses
      },
      getMemberCourses: (state) => () => {
        return state.memberCourses
      },
      getMemberWorkshopsById: (state) => (id) => {
        return state.workshops.find(w => w.content.workshop.uuid === id)
      },
      getPackageById: (state) => (id) => {
        return state.fabman.packages.find(p => p.id === id)
      },
      getTrainingById: (state) => (id) => {
        return state.fabman.trainings.find(t => t.id === id)
      },
      getResourceById: (state) => (id) => {
        return state.fabman.resources.find(r => r.id === id)
      }
    },
    filters: {
      truncate: function (text, length, suffix) {
        if (text.length > length) {
          return text.substring(0, length) + suffix
        } else {
          return text
        }
      }
    },
    mutations: {
      setAnalyticsCookie (state, data) {
        state.analyticsCookie = data
      },
      setNecessaryCookie  (state, data) {
        state.necessaryCookie = data
      },
      setAuth (state, auth) {
        state.auth = auth
      },
      setUser (state, user) {
        state.user = user
      },
      setFabman (state, data) {
        state.fabman = data
      },
      setCourses (state, data) {
        state.courses = data
      },
      setMember (state, data) {
        state.member = data
      },
      setMemberCourses (state, data) {
        state.memberCourses = data
      },
      setSettings (state, settings) {
        state.settings = settings
      },
      setLanguage (state, language) {
        state.language = language
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version
      }
    },
    actions: {
      nuxtServerInit ({ state }, context) {
      },
      init ({ state, dispatch }, context) {
        const chain = []
        if (!state.auth) {
          chain.push(dispatch('checkAuth'))
        } else {
          if (!state.user) {
            chain.push(dispatch('getUser'))
          } else {
            chain.push(dispatch('getData'))
          }
        }
        return Promise.all(chain)
      },
      getRecourseLogs () {
        return connector.get('member/resourceLogs').then((r) => {
          return r
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      getCurrentActivities () {
        return connector.get('member/currentActivities').then((r) => {
          return r
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      getUserMetadata ({ state }) {
        const id = state.member.id
        return connector.get(`v1/fabman/members/${id}/metadata`).then((r) => {
          return r
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      getBookedWorkshops () {
        return connector.post('member/bookedWorkshops').then((r) => {
          return r.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      voteBlog ({ state }, data) {
        const c = axios.create({
          baseURL: connectorBaseUrl
        })
        return c.post('v1/blog/votes/vote', data).then((r) => {
          if (r.data.success) {
            return r.data
          }
        })
      },
      getVotesByUuids ({ state }, data) {
        const c = axios.create({
          baseURL: connectorBaseUrl
        })
        return c.post('v1/blog/votes', data).then((r) => {
          return r.data
        })
      },
      getWorkshopDateMetadata ({ state }, data) {
        if (connector) {
          return connector.post('/v1/workshops/getWorkshopDateMetadata', data).then((r) => {
            if (r.data) {
              return r.data
            }
          })
        } else {
          return new Promise((resolve, reject) => {
            throw new Error({ logged_in: false })
          })
        }
      },
      bookWorkshop ({ state }, data) {
        return connector.post('/v1/workshops/checkoutWorkshop', data)
      },
      checkout ({ state }, data) {
        return connector.post('/member/checkoutTransaction', data)
      },
      workshopStorno ({ state }, data) {
        return connector.post('/member/workshopStorno', data)
      },
      async getCredits ({ state }) {
        const res = await connector.get('/v1/members/getCredits')
        return res.data
      },
      async getCreditsLog ({ state }) {
        const res = await connector.get('/v1/members/getCreditsLog')
        return res.data
      },
      startTransaction ({ state }, data) {
        // Returns payrexx checkout link
        return axios.post(connectorBaseUrl + '/payrexx/checkout', data)
      },
      // old version
      // async redeemGiftCard ({ state }, data) {
      //   const res = await connector.post('/gift-cards/redeem', data)
      //   return res.data
      // },
      // new version with pretix
      async redeemGiftCard ({ state }, data) {
        const id = state.member.id
        const res = await connector.post(`v1/pretix/${id}/`, data)
        return res.data
      },
      async getInvoices ({ state }) {
        const params = {
          member: state.member.id
        }
        const res = await connector.get('/v1/fabman/invoices', { params })
        return res.data
      },
      async getActivities ({ state }) {
        const params = {
          member: state.member.id
        }
        const res = await connector.get('/v1/fabman/charges', { params })
        return res.data
      },
      async getPDF ({ state }, id) {
        const res = await connector.get(`/v1/fabman/invoices/${id}/pdf`)
        return res.data
      },
      async getMemberPackages ({ state }, id) {
        const res = await connector.get(`/v1/fabman/members/${id}/packages`)
        return res.data
      },
      async getPackages ({ state }) {
        const res = await connector.get('/v1/fabman/packages')
        return res.data
      },
      async setPackage ({ state }, data) {
        const id = state.member.id
        const res = await connector.post(`v1/fabman/members/${id}/packages`, data)
        return res.data
      },
      async setPackageOnboarding ({ state }, data) {
        const id = data.memberId
        //const req = data.req
        const res = await connector.post(`v1/fabman/members/${id}/packages`, data)
        return res.data
      },
      async uploadImage ({ state }, data) {
        const res = await connector.post('v1/files/image', data)
        //console.log(res)
        return res.data
      },
      async cancelPackage ({ state }, memberPackageId, data) {
        const id = state.member.id
        const res = await connector.put(`v1/fabman/members/${id}/packages/${memberPackageId}`, data)
        return res.data
      },
      async getPaymentMethod ({ state }) {
        const id = state.member.id
        const res = await connector.get(`v1/fabman/members/${id}/payment-method`)
        return res.data
      },
      getInvoiceDocument ({ commit, dispatch, state }, id) {
        if (state.auth || getUserFromLocalStorage()) {
          // renew Token
          return new Promise((resolve, reject) => {
            webAuth.checkSession({}, function (err, authResult) {
              if (err) {
                unsetToken()
                return reject(err)
              }
              if (authResult && authResult.accessToken) {
                // set auth
                const auth = {
                  accessToken: authResult.accessToken
                }
                setToken(authResult.accessToken)
                commit('setAuth', auth)
                axios.create({
                  baseURL: connectorBaseUrl + '/member/invoice/' + id,
                  // headers: {'Authorization': `Bearer ${auth.accessToken}`, 'Content-Type' : 'application/pdf'}
                  headers: { Authorization: `Bearer ${auth.accessToken}` }
                })
                dispatch('getPDF', id)
                resolve()
              }
            })
          }).then((r) => {
          })
        }
      },
      async getPretixEvents ({ state }) {
        const r = await axios.get(`${baseUrl + '/api/pretix/subevents'}`)
        if (r.status === 200) {
          return r.data
        }
      },
      async getPretixEventsForWorkshop ({ state }, subEvent) {
        const r = await axios.get(`${baseUrl + '/api/pretix/events'}/${subEvent}`)
        if (r.status === 200) {
          return r.data
        }
      },
      saveQuiz ({ state }, data) {
        return connector.post('/v1/courses/save-quiz', data).then((r) => {
          if (r.data.success) {
            return r.data.data
          }
        })
      },
      async savePublicQuiz ({ state }, data) {
        const r = await axios.post(connectorBaseUrl + '/v1/save-public-quiz', data)
        if (r.data.success) {
          return r.data.data
        }
      },
      async getAsu () {
        const r = await axios.get(connectorBaseUrl + '/v1/get-asu')
        if (r.data.success) {
          return r.data.data
        }
      },
      getQuiz ({ state }, id) {
        if (!connector) {
          return false
        }
        const params = {
          course_id: id
        }
        return connector.get('/v1/courses/get-quiz', { params }).then((r) => {
          if (r.data.success) {
            return r.data.data
          }
        })
      },
      async getBookings ({ state }, id) {
        const r = await connector.get(`v1/fabman/resources/${id}/bookings`)
        return r.data
      },
      async getResource ({ state }, id) {
        const r = await connector.get(`v1/fabman/resources/${id}`)
        return r.data
      },
      getFabman ({ state, commit }) {
        return axios.get(`${origin}/.netlify/functions/getFabman`).then((r) => {
          commit('setFabman', r.data)
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      updateUser ({ state, commit, dispatch }, data) {
        return axios.post(`${origin}/.netlify/functions/updateUser`, data).then((r) => {
          const patch = { profile: r.data }
          const user = Object.assign(state.user, patch)
          commit('setUser', user)
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      updateMember ({ state, commit, dispatch }, data) {
        Vue.delete(data, 'lockVersion')
        const req = JSON.parse(JSON.stringify((data)))
        return connector.put('/v1/fabman/members/' + data.id, req).then((r) => {
          const member = Object.assign(state.member, r.data)
          commit('setMember', member)
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      updatePaymentMethod ({ state, commit, dispatch }, data) {
        //Vue.delete(data, 'lockVersion')
        const req = JSON.parse(JSON.stringify((data)))
        const id = state.member.id
        return connector.put(`v1/fabman/members/${id}/payment-method`, req).then((r) => {
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      getUser ({ state, commit, dispatch }) {
        return axios.get(`${origin}/.netlify/functions/getUser`).then((r) => {
          dispatch('getMemberByEmail', { email: r.data }).then((response) => {
            const profile = response
            //console.log(response)
            const user = {
              profile
              // trainings,
              // packages,
              // payment
            }
            //console.log(user)
            commit('setUser', user)
            // TODO remove getMember again (use user)
            dispatch('getMember', user.profile.id)
            //return dispatch('getFabman')
          })
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      async getMemberByEmail ({ commit }, data) {
        const res = await connector.post('/v1/fabman/members/getMemberByEmail/', data)
        return res.data
      },
      getMember ({ state, commit }, id) {
        return connector.get('/v1/fabman/members/' + id).then((r) => {
          commit('setMember', r.data)
        })
      },

      checkAuth ({ commit, dispatch, state }) {
        if (state.auth || getUserFromLocalStorage()) {
          // renew Token
          return new Promise((resolve, reject) => {
            webAuth.checkSession({}, function (err, authResult) {
              if (err) {
                unsetToken()
                return reject(err)
              }
              if (authResult && authResult.accessToken) {
                // set auth
                const auth = {
                  accessToken: authResult.accessToken
                }
                setToken(authResult.accessToken)
                commit('setAuth', auth)
                connector = axios.create({
                  baseURL: connectorBaseUrl,
                  headers: { Authorization: `Bearer ${auth.accessToken}` }
                })
                dispatch('getCourses')
                dispatch('getMemberCourses')
                resolve()
              }
            })
          }).then(() => {
            if (!state.user) {
              return dispatch('getUser')
            }
          })
        } else {
          return new Promise((resolve, reject) => {
            resolve(false)
          })
        }
      },
      auth ({ commit }, { hash }) {
        return new Promise((resolve, reject) => {
          webAuth.parseHash({ hash }, function (err, authResult) {
            if (err) {
              return reject(err)
            }

            // set auth
            const auth = {
              accessToken: authResult.accessToken
            }
            setToken(authResult.accessToken)
            connector = axios.create({
              baseURL: connectorBaseUrl,
              headers: { Authorization: `Bearer ${auth.accessToken}` }
            })
            resolve()
          })
        })
      },
      logout ({ commit }) {
        commit('setAuth', null)
        unsetToken()
      },
      startCourse ({ commit }, context) {
        return connector.post('/v1/courses/start-course', context).then((r) => {
          if (r.data.success) {
            return r.data.data
          }
        })
      },
      getMaterials ({ state }, id) {
        return axios.get(connectorBaseUrl + '/products/materials').then((result) => {
          return result.data
        })
      },
      // @deprecated
      async startOnboarding ({ commit }, data) {
        const res = await connector.post('/member/startOnboarding', data)
        return res.data
      },
      async hasCompletedOnboarding () {
        const res = await connector.get('/member/hasCompletedOnboarding')
        return res.data
      },
      async hasCompletedRequiredCourses ({ state, commit }, id) {
        const res = await connector.get(`/v1/fabman/members/${id}/hasCompletedRequiredCourses`)
        return res.data
      },
      loginUser ({ commit }, context) {
        return new Promise((resolve, reject) => {
          webAuth.login({
            connection: 'Username-Password-Authentication',
            email: context.email,
            password: context.password
          }, function (err, r) {
            if (err) reject(err)
            resolve(r)
          })
        })
      },
      async checkLoginData ({ commit }, data) {
        const res = await connector.post('/v1/fabman/services/checkEmail/', data)
        return res.data
      },
      async checkCompanyCode ({ commit }, data) {
        // connector = axios.create({
        //   baseURL: connectorBaseUrl,
        //   headers: {}
        // })
        const res = await connector.post('/v1/fabman/services/checkCompanyCode/', data)
        return res.data
      },
      async getCountries ({ commit }) {
        // connector = axios.create({
        //   baseURL: connectorBaseUrl,
        //   headers: {}
        // })
        const res = await connector.get('/v1/fabman/countries/')
        return res.data
      },
      async createMember ({ commit }, data) {
        const res = await connector.post('/v1/fabman/members/', data)
        return res.data
      },
      registerUser ({ commit }, context) {
        return new Promise((resolve, reject) => {
          webAuth.signup({
            connection: 'Username-Password-Authentication',
            email: context.email,
            password: context.password,
            user_metadata: context.user_metadata
          }, function (err, r) {
            if (err) reject(err)
            resolve(r)
          })
        })
      },
      recoverPassword ({ commit }, context) {
        return new Promise((resolve, reject) => {
          webAuth.changePassword({
            connection: 'Username-Password-Authentication',
            email: context.email
          }, function (err, r) {
            if (err) reject(err)
            resolve(r)
          })
        })
      },
      setSidebar ({ state }, value) {
        state.sidebar = value
      },
      getMemberCourses ({ state, commit }, id) {
        if (!state.auth) return null

        return connector.get('/v1/courses/get-member-courses').then((r) => {
          if (r.data.success) {
            commit('setMemberCourses', r.data.data)
          }
        })
      },
      getCourses ({ state, commit }, id) {
        if (!state.auth) return null

        return connector.get('/v1/courses/get-courses').then((r) => {
          if (r.data.success) {
            commit('setCourses', r.data.data)
          }
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      loadTagsMachine ({ state }) {
        return this.$storyapi.get('cdn/tags', {
          filter_query: {
            component: {
              in: 'machine'
            }
          }
        }).then((res) => {
          return res.data.tags
        })
      },
      loadTagsTeam ({ state }) {
        return this.$storyapi.get('cdn/tags', {
          filter_query: {
            component: {
              in: 'team-member'
            }
          }
        }).then((res) => {
          const tagRes = res.data.tags
          return [...tagRes].reverse()
        })
      },
      loadTeam ({ state }) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: {
            component: {
              in: 'team-member'
            }
          },
          per_page: 50,
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        })
      },
      loadPress ({ state }) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: {
            component: {
              in: 'press-overview'
            }
          },
          per_page: 50,
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        })
      },
      loadFullPage ({ state }, path) {
        return this.$storyapi.get(`cdn/stories${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      loadStoryByUUid ({ state }, uuid) {
        return this.$storyapi.get(`cdn/stories/${uuid}`, {
          version: version,
          cv: state.cacheVersion,
          find_by: 'uuid',
          resolve_relations: 'workshop-date.workshop'
        }).then((res) => {
          return res.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      loadPage ({ state }, path) {
        if (!path) {
          path = '/'
        }

        return this.$storyapi.get(`cdn/stories/${state.language}${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      loadMachineItem ({ state }, slug) {
        const endpoint = `cdn/stories/${state.language}/machines/${slug}`
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadMachineItemById ({ state }, id) {
        const endpoint = `cdn/stories/${state.language}/machines/${id}`
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadEventItem ({ state }, slug) {
        const endpoint = `cdn/stories/${state.language}/events/${slug}`
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      async loadWorkshopItem ({ state, dispatch }, slug) {
        const endpoint = `cdn/stories/${state.language}/workshops/${slug}`
        const workshop = await this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data.story
        })
        if (!workshop) {
          console.log('workshop not found: ', workshop)
        }
        const dates = await this.$storyapi.get('cdn/stories', {
          filter_query: {
            workshop: {
              in: workshop.uuid
            },
            component: {
              in: 'workshop-date'
            },
            starttime: {
              'gt-date': moment().format('YYYY-MM-DD HH:mm')
            }
          },
          version: version,
          cv: state.cacheVersion,
          sort_by: 'content.starttime:asc'
        }).then((res) => {
          return res.data.stories
        })
        return { workshop, dates }
      },
      findStatusMachines ({ state }) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: {
            component: {
              in: 'machine'
            },
            machine_status_items: {
              is: 'not_empty_array'
            }
          },
          version: version,
          cv: state.cacheVersion,
          per_page: 150
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      findItems ({ state }, filters) {
        return this.$storyapi.get('cdn/stories', {
          ...filters,
          version: version,
          cv: state.cacheVersion,
          per_page: 150
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      findEvents ({ state }, filters) {
        return this.$storyapi.get('cdn/stories', {
          ...filters,
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadWorkshops ({ state }) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: {
            component: {
              in: 'workshop'
            }
          },
          per_page: 100,
          version: version,
          cv: state.cacheVersion,
          sort_by: 'content.title:asc'
        }).then((res) => {
          return res.data
        })
      },
      findWorkshops ({ state }, data) {
        const filters = data.filters
        const search = data.search
        return this.$storyapi.get('cdn/stories', {
          ...filters,
          version: version,
          cv: state.cacheVersion,
          resolve_relations: 'workshop',
          sort_by: 'content.starttime:desc',
          per_page: 100
        }).then((res) => {
          const workshopdates = res.data.stories.reverse()
          const workshops = {}
          for (const w of workshopdates) {
            if (!w.content.workshop) {
              continue
            }
            const wid = w.content.workshop.uuid
            if (!(wid in workshops)) {
              workshops[wid] = Object.assign({ dates: [] }, w.content.workshop)
            }
            workshops[wid].dates.push(w)
          }
          if (search === '' || !search) {
            return Object.values(workshops).sort((a, b) => a.content.title.localeCompare(b.content.title))
          }
          const searchString = new RegExp(search, 'i')
          return Object.values(workshops).filter((w) => {
            return w.content.title.match(searchString)
          }).sort((a, b) => a.content.title.localeCompare(b.content.title))
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      findWorkshopDates ({ state }, filters) {
        return this.$storyapi.get('cdn/stories', {
          ...filters,
          version: version,
          cv: state.cacheVersion,
          sort_by: 'content.starttime:desc',
          per_page: 100
        }).then((res) => {
          return res.data.stories
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadNewsItem ({ state }, slug) {
        const endpoint = `cdn/stories/${state.language}/news/${slug}`
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      findNews ({ state }, filters) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: filters.filter_query,
          version: version,
          cv: state.cacheVersion,
          starts_with: `${state.language}/news`,
          per_page: 100,
          sort_by: 'content.datetime:desc'
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadSitemap ({ state, commit }) {
        return this.$storyapi.get('cdn/links', {
          version: version,
          cv: state.cacheVersion,
          starts_with: state.language
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      },
      loadSettings ({ state, commit }, context) {
        return this.$storyapi.get(`cdn/stories/${context.language}/settings`, {
          version: version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        }).catch((e) => {
          console.log(e)
        })
      },
      findPress ({ state }, filters) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: filters.filter_query,
          version: version,
          cv: state.cacheVersion,
          starts_with: `${state.language}/press`
        }).then((res) => {
          return res.data
        }).catch((res) => {
          this.$sentry.captureException(res)
        })
      }
    }
  })
}

export default createStore
