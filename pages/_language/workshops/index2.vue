<template>
  <section class="workshop-overview">
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>
      <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">
        <div class="expander" @click="toggleTags()">
        </div>
        <div class="headline">
          Ansicht
        </div>
        <div class="toggle-button">
          <div class="switch">
            <input type="checkbox" name="toggle" v-model="showCalendar">
            <label for="toggle"><i></i></label>
            <span></span>
          </div>
          <span class="toggle-to-text">
            KALENDER
          </span>
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
        <br>
      </div>
      <div class="search">
        <input type="text" :placeholder="[[ $t('searchForWorkshopsAndEvents') ]]" v-model="search">
      </div>
    </div>
    <div v-if="!showCalendar" class="workshop-list-wrapper" :key="this.filtered">
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
    <link rel="stylesheet" type="text/css" href="https://pretix.eu/demo/democon/widget/v1.css">
    <script type="text/javascript" src="https://pretix.eu/widget/v1.de.js" async></script>
    <div  class="pretix-content">
      <div v-if="selectedEvent !== ''">
        <pretix-widget name="pretix" event="https://pretix.eu/grandgarage" ></pretix-widget>
      </div>
      <div v-if="selectedEvent === ''">
        <pretix-widget name="pretix" event="https://pretix.eu/grandgarage"></pretix-widget>
      </div>
      <noscript>
        <div class="pretix-widget">
          <div class="pretix-widget-info-message">
            JavaScript is disabled in your browser. To access our ticket shop without JavaScript,
            please <a target="_blank" href="https://pretix.eu/ggTest">click here</a>.
          </div>
        </div>
      </noscript>
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
      filtered: 0,
      showCalendar: false
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
      this.$store.dispatch('findWorkshops', this.filters).then((data) => {
        this.loading = false
        this.workshops = data
      })
      this.selectedEvents = this.selectedCategories()
      this.filteredWorkshops = []
      console.log('SELECTED EVENTS')
      console.log(this.selectedEvents)
      this.workshops = this.filterCategory()
      console.log(this.workshops)
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
        },
        search_term: this.search
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
.pretix-content {
  display: flex;
  justify-content: center;
  .pretix-widget-wrapper{
    a {
      color: $color-secondary;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    button {
      background-color: $color-secondary;
      border-color: $color-secondary;
    }
    button:hover {
      background-color: black;
      border-color: black;
    }
    .pretix-widget-event-week-table {
      margin-top: 3%;
    }
    .pretix-widget-event-availability-green {
      background-color: $color-primary !important;
    }
    .pretix-widget-event-availability-red {
      background-color: $color-secondary !important;
    }
    .pretix-widget-event-availability-reserved {
      background-color: $color-yellow !important;
    }
    width: 70vw;
    max-width: 1000px;
    background: white;
    .pretix-widget {
      border: none;
      .pretix-widget-event-week-col:first-child {
        @media screen and (min-width: 1145px) {
          margin-left: 50px !important;
        }
      }
    }
    .pretix-widget-event-calendar-events {
      margin: 3% 0;
      @media screen and (min-width: 1145px) {
        margin-top: 15%;
      }
    }
    .pretix-widget-event-calendar-previous-month{
      padding: 10px;
    }
    .pretix-widget-event-calendar-next-month{
      padding: 10px;
    }
    .pretix-widget .pretix-widget-loading svg {
      top: Min(40%);
      position: center;
    }
  }
}

.toggle-button{
  margin-left: 4%;
  margin-right: 4%;
  display: flex;
  justify-content: start;
  padding:10px;
  padding-bottom:20px;
  .toggle-to-text{
    top: 5px;
    position: relative;
    padding-left: 10px;
  }

  .switch input {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    opacity: 0;
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .switch {
    width: 100px;
    height: 30px;
    position: relative;
  }

  .switch label {
    display: block;
    width: 80%;
    height: 100%;
    position: relative;

    border-radius: 30px 30px 30px 30px;
    box-shadow:
        inset 0 3px 8px 1px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(0, 0, 0, 0.13),
        0 1px 0 rgba(255,255,255,0.2);
    -webkit-transition: all .5s ease;
    transition: all .5s ease;

  }

  .switch input ~ label i {
    display: block;
    height: 26px;
    width: 26px;
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: 2;
    border-radius: inherit;
    background: #6aa1b0; /* Fallback */

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.2),
        0 0 8px rgba(0, 0, 0, 0.15),
        0 12px 12px rgba(0, 0, 0, 0.15);
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
  }

  .switch label + span {
    content: "";
    display: inline-block;
    position: absolute;
    right: 0px;
    top:7px;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background: #283446;

    box-shadow:
        inset 0 1px 0 rgba(0,0,0,0.2),
        0 1px 0 rgba(255,255,255,0.1),
        0 0 10px rgba(185,231,253,0),
        inset 0 0 8px rgba(0, 0, 0, 0.22),
        inset 0 -2px 5px rgba(0, 0, 0, 0.24),
        inset 0 -5px 5px rgba(0, 0, 0, 0.3);
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    z-index: 2;
  }
  /* Toggle */
  .switch input:checked ~ label + span  {
    content: "";
    display: inline-block;
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    z-index: 2;
    background: #b9f3fe;
    background: gradient-gradient(#ffffff, #77a1b9);
    box-shadow:
        inset 0 1px 0 rgba(0,0,0,0.1),
        0 1px 0 rgba(255,255,255,0.1),
        0 0 10px rgba(100,231,253,1),
        inset 0 0 8px rgba( 61,157,247,0.8),
        inset 0 -2px 5px rgba(185,231,253,0.3),
        inset 0 -3px 8px rgba(185,231,253,0.5);
  }

  .switch input:checked ~ label i {
    left: 64%;
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.2),
        0 0 8px rgba(0, 0, 0, 0.15),
        0 8px 8px rgba(0, 0, 0, 0.14),
        inset -1px 0 1px #b9f3fe;

    -webkit-transition: all .5s ease;
    transition: all .5s ease;
  }

}

</style>
