<template>
  <section class="workshop-overview">
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>
      <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">
        <div class="expander" @click="toggleTags()">
        </div>
        <div class="headline">
          {{ $t('area') }}
        </div>
        <div class="tag-list">
          <div v-for="t in categories" :key="t.key" class="tag">
            <checkbox
                v-model="t.value"
                class="tag"
                theme="white"
            >{{ t.name }}
            </checkbox>
          </div>
        </div>
      </div>
      <div class="search">
        <input type="text" :placeholder="[[ $t('searchForWorkshopsAndEvents') ]]" v-model="search">
      </div>
    </div>
    <div class="workshop-list-wrapper" :key="this.filtered">
      <div v-if="filteredWorkshops && filteredWorkshops.length > 0" class="workshop-list">
        <transition-group name="list">
          <workshop-list-item
              v-for="item in filteredWorkshops"
              :blok="item"
              :key="item.id"
              class="list-item"
              :slim="false"
          ></workshop-list-item>
        </transition-group>
      </div>
      <div v-else>
        <div v-if="workshops && workshops.length > 0" class="workshop-list">
          <transition-group name="list">
            <workshop-list-item
                v-for="item in workshops"
                :blok="item"
                :key="item.id"
                class="list-item"
                :slim="false"
            ></workshop-list-item>
          </transition-group>
        </div>
        <div v-else>
          <div class="workshop-list-none">
            <code> {{ $t('noSearchResults') }}</code>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      categories: [
        { key: 'event', name: 'Event', value: false },
        { key: 'workshop', name: 'Workshop', value: false },
        { key: 'training', name: 'Einschulungen', value: false }
      ],
      loading: false,
      search: '',
      workshops: [],
      tags: [],
      tagsCollapsed: false,
      selectedEvents: [],
      filteredWorkshops: [],
      filtered: 0
    }
  },
  created () {
    this.$watch('categories', (newVal, oldVal) => {
      this.update()
    }, { deep: true })
  },
  watch: {
    search () {
      this.update()
    }
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('findWorkshops', { filters: this.filters, search: this.search }).then((data) => {
        this.loading = false
        this.workshops = data
      })
      this.selectedEvents = this.selectedCategories()
      this.filteredWorkshops = []
      // console.log('SELECTED EVENTS')
      // console.log(this.selectedEvents)
      this.workshops = this.filterCategory()
      //console.log(this.workshops)
      this.filtered = true
    },
    toggleTags () {
      this.tagsCollapsed = !this.tagsCollapsed
    },
    filterCategory () {
      this.workshops.forEach((item) => {
        this.selectedEvents.forEach((selectedItem) => {
          if (item.content.category === selectedItem) {
            this.filteredWorkshops.push(item)
          }
        })
      })
      return this.filteredWorkshops
    },
    selectedCategories () {
      return this.categories.filter((c) => {
        return (c.value) ? c.key : ''
      }).map((v) => {
        return v.key
      })
    }
  },
  computed: {
    filters () {
      return {
        filter_query: {
          component: {
            in: 'workshop-date'
          },
          starttime: {
            'gt-date': moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm')
          }
        }
        // search_term: this.search
      }
    }
  },
  async asyncData (context) {
    // let tags = await context.store.dispatch("loadTags");
    const filters = {
      filter_query: {
        component: {
          in: 'workshop-date'
        },
        starttime: {
          'gt-date': moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm')
        }
      }
    }
    const workshops = await context.store.dispatch('findWorkshops', filters).then((data) => {
      if (data) {
        return { workshops: data }
      }
      return { workshops: [] }
    })
    return { ...workshops }
  }
}
</script>

<style lang="scss">

.workshop-overview {
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40px);
  }

  .workshop-filters {
    .filters {
      background-color: $color-orange;
      display: flex;

      .tags {
        flex: 3;
      }

      .calendar {
        flex: 1;
        max-width: 320px;

        .reset {
          margin-top: -3px;
          background-color: #000;
          padding: 10px;

          .all {
            padding: 10px;
            color: #FFF;

            &:hover {
              cursor: pointer;
              color: #000;
              background-color: $color-yellow;
            }
          }
        }
      }
    }

    .tags {
      padding-bottom: 4vh;
      @include media-breakpoint-down(sm) {
        padding: 4vh 0;
      }

      .headline {
        padding-top: 4vh;
        color: #FFF;
        font-weight: bold;
        font-size: 1.8rem;
        @include margin-page-wide();
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: .05em;
        @include media-breakpoint-down(sm) {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      }

      .tag-list {
        @include margin-page-wide();
        display: grid;
        max-width: 70em;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        @include media-breakpoint-down(lg) {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(sm) {
          grid-template-columns: 1fr 1fr;
          font-size: .85em;
        }
        @include media-breakpoint-down(xs) {
          grid-template-columns: 1fr;
        }
        grid-gap: 15px 20px;

        > .tag {
          font-family: $font-mono;
          color: #FFF;
          user-select: none;
          cursor: pointer;
          /* input[type=checkbox] {
             outline: none;
             -webkit-appearance: none;
             padding: 5px;
             border: 1px solid #FFF;
             border-radius: 3px;
             position: relative;
             top: 0;
             &:checked {
               background-color: #FFF;
             }*/
        }
      }
    }

    @include media-breakpoint-down(sm) {
      overflow: hidden;
      position: relative;
      max-height: 1000px;
      transition: all .3s linear;
      padding-bottom: 30px;
      .expander {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20px;
        transition: all .3s linear;

        &:after {
          transition: all .3s linear;
          content: "";
          position: absolute;
          bottom: 18px;
          left: 50%;
          width: 10px;
          height: 10px;
          bottom: 8px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          margin-left: -13px;
          transform: rotate(225deg);
          transform-origin: center center;
        }
      }
      &.collapsed {
        max-height: 17vh;

        .expander {
          height: 70px;
          background: linear-gradient(rgba(0, 0, 0, 0), $color-orange 80%);

          &:after {
            transform: rotate(45deg);
            bottom: 18px;
          }
        }
      }
    }
  }

  .search {
    display: flex;
    @include media-breakpoint-down(lg) {
      @include margin-page-wide;
    }
    padding-top: 1rem;
    @include media-breakpoint-down(xs) {
      padding-bottom: 0rem;
    }

    input[type="text"] {
      flex: 1;
      display: block;
      width: 100%;
      padding: 10px;
      outline: none;
      font-family: $font-secondary;
      font-size: 1.1rem;
      border: none;
    }

    input[type="button"] {
      font-size: 1.1rem;
      margin-left: 10px;
      text-transform: uppercase;
      background-color: transparent;
      border: none;
      font-weight: bold;
      color: $color-orange;
      outline: none;
    }
  }
}

.workshop-list-wrapper {
  display: flex;
  .workshop-list {
    padding-right: 10px;
    padding-left: 10px;
    > span {
      display: grid;
      @include media-breakpoint-up(sm) {
        grid-template-columns: 1fr 1fr;
      }
      @include media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr;
      }

      @include media-breakpoint-up(xl) {
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0px;
      }
      grid-column-gap: 2vw;
      grid-row-gap: 2vw;
    }
    flex: 3;
    .list-item {
      min-width: 150px;
      border-radius: 10px;
      @include media-breakpoint-up(lg) {
        min-width: 200px;
      }
    }
    .list-enter-active, .list-leave-active {
      transition: all 0.5s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(30px);
    }
  }
  .workshop-list-none {
    flex: 1;
    text-align: center;
  }
}

.machine-filters {
  .tags {
    padding: 8vh 0;
    @include media-breakpoint-down(sm) {
      padding: 4vh 0;
    }

    .headline {
      color: #FFF;
      font-weight: bold;
      font-size: 1.8rem;
      @include margin-page-wide();
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: .05em;
      @include media-breakpoint-down(sm) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
    }

    .tag-list {
      @include margin-page-wide();
      display: grid;
      max-width: 70em;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      @include media-breakpoint-down(lg) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }
      @include media-breakpoint-down(md) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @include media-breakpoint-down(sm) {
        grid-template-columns: 1fr 1fr;
        font-size: .85em;
      }
      @include media-breakpoint-down(xs) {
        grid-template-columns: 1fr;
      }
      grid-gap: 15px 20px;

      > .tag {
        font-family: $font-mono;
        color: #FFF;
        user-select: none;
        cursor: pointer;

        input[type=checkbox] {
          outline: none;
          -webkit-appearance: none;
          padding: 5px;
          border: 1px solid #FFF;
          border-radius: 3px;
          position: relative;
          top: 0;

          &:checked {
            background-color: #FFF;
          }
        }
      }
    }

    background-color: $color-blue;
    @include media-breakpoint-down(sm) {
      overflow: hidden;
      position: relative;
      max-height: 1000px;
      transition: all .3s linear;
      padding-bottom: 30px;
      .expander {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20px;
        transition: all .3s linear;

        &:after {
          transition: all .3s linear;
          content: "";
          position: absolute;
          bottom: 18px;
          left: 50%;
          width: 10px;
          height: 10px;
          bottom: 8px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          margin-left: -13px;
          transform: rotate(225deg);
          transform-origin: center center;
        }
      }
      &.collapsed {
        max-height: 17vh;

        .expander {
          height: 70px;
          background: linear-gradient(rgba(0, 0, 0, 0), $color-blue 80%);

          &:after {
            transform: rotate(45deg);
            bottom: 18px;
          }
        }
      }
    }
  }

  .search {
    display: flex;
    @include margin-page-wide();
    margin-top: 1vh;
    margin-bottom: 2vh;
    input[type=text] {
      flex: 1;
      display: block;
      width: 100%;
      padding: 10px;
      outline: none;
      font-family: $font-secondary;
      font-size: 1.1rem;
      border: none;
    }

    input[type=button] {
      font-size: 1.1rem;
      margin-left: 10px;
      text-transform: uppercase;
      background-color: transparent;
      border: none;
      font-weight: bold;
      color: $color-orange;
      outline: none;
    }
  }
}
</style>
