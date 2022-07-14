import Vuex from 'vuex'
import auth0 from 'auth0-js'
import { getUserFromLocalStorage, setToken, unsetToken } from '~/utils/auth'
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'

const origin = process.client ? window.location.origin : process.env.ORIGIN

console.log('### Nuxt environment is: ' + process.env.NUXT_ENV_ENVIRONMENT)

let tmpAuth = null

// Define auth0 routes depending on your environment
switch (process.env.NUXT_ENV_ENVIRONMENT) {
  case 'develop':
    tmpAuth = new auth0.WebAuth({
      domain: 'gg-develop.eu.auth0.com',
      clientID: 'kJfGQ92cUMcTWEhjYaYQ0NDBir6ByYs9',
      audience: 'https://api.grandgarage.eu/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
    break
  case 'staging':
    tmpAuth = new auth0.WebAuth({
      domain: 'gg-staging.eu.auth0.com',
      clientID: 'LsZ4ug7c87ae1SAq1Q3nW4FjvJsQXb7T',
      audience: 'https://api.grandgarage.eu/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
    break
  default: // production
    tmpAuth = new auth0.WebAuth({
      domain: 'auth.grandgarage.eu',
      clientID: 'lwqb_LrkbU8b2rHfbC05C87xqM4bSfms',
      audience: 'https://api.grandgarage.eu/',
      responseType: 'token id_token',
      redirectUri: origin + '/auth'
    })
}

const webAuth = tmpAuth

const baseUrl = process.env.NUXT_ENV_CONNECTOR_URL ? process.env.NUXT_ENV_CONNECTOR_URL : 'https://connector.grandgarage.eu'
const connectorBaseUrl = baseUrl + '/api'

let connector

const version = process.env.CONNECTOR_API_URL

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
      getUserMetadata () {
        return connector.get('member/metadata').then((r) => {
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
        return c.post('/blog/votes/vote', data).then((r) => {
          if (r.data.success) {
            return r.data
          }
        })
      },
      getVotesByUuids ({ state }, data) {
        const c = axios.create({
          baseURL: connectorBaseUrl
        })
        return c.post('/blog/votes', data).then((r) => {
          return r.data
        })
      },
      getWorkshopDateMetadata ({ state }, data) {
        if (connector) {
          return connector.post('/member/getWorkshopDateMetadata', data).then((r) => {
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
        return connector.post('/member/checkoutWorkshop', data)
      },
      checkout ({ state }, data) {
        return connector.post('/member/checkoutTransaction', data)
      },
      workshopStorno ({ state }, data) {
        return connector.post('/member/workshopStorno', data)
      },
      async getCredits ({ state }) {
        const res = await connector.get('/member/getCredits')
        return res.data
      },
      async getCreditsLog ({ state }) {
        const res = await connector.get('/member/getCreditsLog')
        return res.data
      },
      startTransaction ({ state }, data) {
        // Returns payrexx checkout link
        return axios.post(connectorBaseUrl + '/payrexx/checkout', data)
      },
      async redeemGiftCard ({ state }, data) {
        const res = await connector.post('/gift-cards/redeem', data)
        return res.data
      },
      async getInvoices ({ state }) {
        const res = await connector.get('/member/invoices')
        return res.data
      },
      async getActivities ({ state }) {
        const res = await connector.get('/member/activities')
        return res.data
      },
      async getPDF ({ state }, id) {
        return await connector.get('/member/invoice/' + id, {
          responseType: 'arraybuffer'
        }, {
          headers: {
            'Content-Type': 'application/pdf'
          }
        })
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
      saveQuiz ({ state }, data) {
        return connector.post('/courses/save-quiz', data).then((r) => {
          if (r.data.success) {
            return r.data.data
          }
        })
      },
      async savePublicQuiz ({ state }, data) {
        const r = await axios.post(connectorBaseUrl + '/save-public-quiz', data)
        if (r.data.success) {
          return r.data.data
        }
      },
      async getAsu () {
        const r = await axios.get(connectorBaseUrl + '/get-asu')
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
        return connector.get('/courses/get-quiz', { params }).then((r) => {
          if (r.data.success) {
            return r.data.data
          }
        })
      },
      getBookings ({ state }, id) {
        return axios.get(`${origin}/.netlify/functions/getBookings?id=${id}`).then((r) => {
          return r.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
      },
      checkStatus ({ state }, id) {
        return axios.get(`${origin}/.netlify/functions/checkStatus?id=${id}`).then((r) => {
          return r.data
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
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
      getUser ({ state, commit, dispatch }) {
        return axios.get(`${origin}/.netlify/functions/getUser`).then((r) => {
          commit('setUser', r.data)
          dispatch('getMember', r.data.profile.id)
          return dispatch('getFabman')
        }).catch((err) => {
          this.$sentry.captureException(err)
        })
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
        return connector.post('/courses/start-course', context).then((r) => {
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
      async startOnboarding ({ commit }, data) {
        const res = await connector.post('/member/startOnboarding', data)
        return res.data
      },
      async hasCompletedOnboarding () {
        const res = await connector.get('/member/hasCompletedOnboarding')
        return res.data
      },
      async hasCompletedRequiredCourses () {
        const res = await connector.get('/member/hasCompletedRequiredCourses')
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

        return connector.get('/courses/get-member-courses').then((r) => {
          if (r.data.success) {
            commit('setMemberCourses', r.data.data)
          }
        })
      },
      getCourses ({ state, commit }, id) {
        if (!state.auth) return null

        return connector.get('/courses/get-courses').then((r) => {
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
      findWorkshops ({ state }, filters) {
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
          return Object.values(workshops).sort((a, b) => a.name.localeCompare(b.name))
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
