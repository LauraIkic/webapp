<template>
  <section class="workshop-overview">
    <link rel="stylesheet" type="text/css" href="https://pretix.eu/demo/democon/widget/v1.css">
    <script type="text/javascript" src="https://pretix.eu/widget/v1.de.js" async></script>
    <div class="workshop-filters">
      <div class="filters">
      </div>
      <div class="search">
        <input type="text" :placeholder="[[ $t('searchForWorkshopsAndEvents') ]]" v-model="search">
      </div>
      <loading class="loading" v-if="loading"></loading>
    </div>
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>
      <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">
        <div class="expander" @click="toggleTags()">
        </div>
        <div class="headline">
          {{ $t('area') }}
        </div>
        <div class="tag-list" :key="this.filter">
          <div v-for="c in categories" :key="c.key" class="tag">
            <checkbox
                v-model="c.value"
                class="tag"
                theme="white"
            >{{c.name}}</checkbox>
          </div>
        </div>
      </div>
      <!--      <div class="search">
              <input type="text" :placeholder="[[ $t('search') ]]" v-model="search" name="" id=""/>
            </div>-->
    </div>
    <div class="workshop-list-wrapper "  :key="this.selectedEvent">
      <div v-if="selectedEvent !== ''">
        <pretix-widget name="pretix" event="https://pretix.eu/grandgarage" :filter="`attr[Kategorie]=${this.filter}`"></pretix-widget>
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
import Checkbox from '~/components/Checkbox.vue'

export default {
  components: {
    Checkbox
  },
  data () {
    return {
      categories: [
        { key: 'event', name: 'Event', value: false },
        { key: 'workshop', name: 'Workshop', value: false },
        { key: 'training', name: 'Einschulungen', value: false }
      ],
      loading: false,
      search: '',
      tagsCollapsed: true,
      selectedEvent: '',
      filter: '',
      eventToToggle: ''
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
      if (this.selectedEvent !== '') {
        this.checkExistingSelection()
        this.selectedEvent = this.filterCategories()
        this.unselectEvents()
      } else {
        this.selectedEvent = this.filterCategories()
      }
      if (this.selectedEvent.length > 0) {
        this.filter = this.selectedEvent[0].name
      } else {
        this.selectedEvent = ''
        this.filter = ''
      }
      window.PretixWidget.buildWidgets()
      this.loading = false
    },
    toggleTags () {
      this.tagsCollapsed = !this.tagsCollapsed
    },
    filterCategories () {
      return this.categories.filter((c) => {
        return (c.value) ? c.name : ''
      }).map((c) => {
        return { name: c.name, value: c.value }
      })
    },
    unselectEvents () {
      let i = 0
      while (i < this.selectedEvent.length - 1) {
        this.categories.forEach((o) => {
          if (o.name === this.eventToToggle.name) {
            o.value = false
          }
        })
        i++
      }
    },
    checkExistingSelection () {
      const newEvent = this.filterCategories()
      this.selectedEvent.forEach((item) => {
        newEvent.forEach((newItem) => {
          if (item.name !== newItem.name) {
            this.eventToToggle = item
          }
        })
      })
    }
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
        >.tag {
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
          background: linear-gradient(rgba(0,0,0,0), $color-orange 80%);
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
    margin-bottom: 2em;
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
  justify-content: center;
  .pretix-widget-wrapper{
    a {
      color: $color-secondary;
      text-decoration: underline;
    }
    width: 70vw;
    max-width: 1264px;
    background: white;
    .pretix-widget-event-calendar-previous-month{
      padding: 10px;
    }
    .pretix-widget-event-calendar-next-month{
      padding: 10px;
    }
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
      >.tag {
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
          background: linear-gradient(rgba(0,0,0,0), $color-blue 80%);
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
    padding-top: 3vh;
    @include margin-page-wide();
    padding-bottom: 5vh;
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
