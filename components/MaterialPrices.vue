<template>
  <section
      v-editable="blok"
      class="material-prices"
  >
    <div class="machine-filters">
<!--      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>-->
      <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">
        <div class="expander" @click="toggleTags()">
        </div>
        <div class="headline">
          {{ $t('area') }}
        </div>
        <div class="tag-list">
          <div v-for="tag in tags" :key="tag.id" class="tag">
            <label class="checkbox">
              <span class="checkmark"/>
              <input :id="tag.id"
                     type="checkbox"
                     :value="tag.value"
                     v-model="selectedMaterial">
              {{tag.name}}
            </label>
          </div>
        </div>
      </div>
      <div class="search">
<!--        <input type="text" :placeholder="[[ $t('searchMachines') ]]" v-model="search" name="" id=""/>-->
      </div>
    </div>
    <div class="material-prices-list">
      <div v-for="items in selectedMaterial" class="body content-card" :key="items.id">
        <div v-for="(names, i) in tags" :key="names.id">
           <span v-if="tags[i].value === items" class="department">{{tags[i].name}}</span>
        </div>
        <div class="material-prices">
           <div
               v-for="material in materials" :key="material.id"
               class="material-price"
           >
            <div
                v-if="material.department === items.toString()"
                class="info-row"
            >
              <div class="info-block">
                <div class="col info">
                  {{material.external_name}}
                </div>
                <div class="col info">
                  {{material.price_sell}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedMaterial.length < 1">
        <div v-for="items in [2,3] " class="body content-card" :key="items.id">
          <div v-for="(names, i) in tags" :key="names.id">
             <span v-if="tags[i].value === items" class="department">{{tags[i].name}}</span>
          </div>
          <div class="material-header">
            <div class="header">
              <div class="title">
                Maschine
              </div>
              <div class="title">
                Kosten in €
              </div>
            </div>
          </div>
          <div class="material-prices">
            <div
                v-for="material in materials" :key="material.id"
                class="material-price"
            >
              <div
                  v-if="material.department === items.toString()"
                  class="info-row"
              >
                <div class="info-block">
                  <div class="col info">
                    {{material.external_name}}
                  </div>
                  <div class="col info">
                    {{material.price_sell}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  middleware: 'authenticated',
  data () {
    return {
      materials: [],
      tags: [
        { id: 1, name: 'Metallwerkstatt', value: 2 },
        { id: 2, name: 'Digitallabor', value: 3 }
      ],
      selectedMaterial: [],
      tagsCollapsed: true
    }
  },
  async mounted () {
    this.materials = await this.$store.dispatch('getMaterials')
  },
  // watch: {
  //   selectedMaterial: function (to) {
  //     console.log('hu')
  //   }
  // },
  methods: {
    toggleTags () {
      this.tagsCollapsed = !this.tagsCollapsed
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';
.machine-filters {
  .loading {
    position: absolute;
  }
  .tags {
    padding: 8vh 0;
    margin-top: 4%;
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
        .checkbox {
          position: relative;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 1em;
          height: 25px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: flex;
          align-items: center;
          input[type=checkbox] {
            outline: none;
            -webkit-appearance: none;
            width: 1.3em;
            height: 1.3em;
            border: 2px solid #FFF;
            border-radius: 2px;
            margin-right: 10px;
            position: relative;
            &:checked {
              background-color: #FFF;
            }
          }
          &:hover {
            .checkmark {
              background-color: #FFF;
              border: none;
            }
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
.body {
  position: relative;
  z-index: 1;
  margin-bottom: 4%;
  width: 100%;
  padding: 5%;
  .department {
    font-family: $font-mono;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: .1em;
    padding: 2% 0 2% 2%;
    text-transform: uppercase;
    color: $color-blue;
  }
  .material-header {
    margin-top: 20px;
    .header {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: -8px;
      display: flex;
      .title {
        flex: 1;
        flex-direction: row;
        display: flex;
      }
    }
  }
  .material-prices {
    margin-top: 20px;
    .material-price {
      &:nth-child(odd) {
        background-color: rgba(242, 243, 238,0.9);
      }
      margin: 5px;
      @include media-breakpoint-down(xs) {
        border: .11em solid #f2f3ee;
        padding:7px;
      }
      .info-row {
        @include media-breakpoint-down(md) {
          flex-direction: column;
        }
        line-height: 1.6;
        font-family: $font-mono;
        font-size: 0.9rem;
        margin: -8px;
        display: flex;
        .info-block {
          flex: 1;
          flex-direction: row;
          display: flex;
        }
        .col {
          padding: 8px;
          margin-right: 10px;
          width: 50%;

        }
      }
    }
  }
}
</style>
