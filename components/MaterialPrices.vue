<template>
  <section
      v-editable="blok"
      class="material-prices"
  >
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>
      <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">
        <div class="expander" @click="toggleTags()">
        </div>
        <div class="headline">
          {{ $t('area') }}
        </div>
        <div class="tag-list">
          <div v-for="tag in tags" :key="tag.id" class="tag">
            <input :id="tag.id" type="checkbox" :value="tag.value" v-model="selectedMaterial">
            {{tag.name}}
          </div>
        </div>
      </div>
      <div class="search">
        <input type="text" :placeholder="[[ $t('searchMachines') ]]" v-model="search" name="" id=""/>
      </div>
    </div>
    <div class="material-prices-list">
      <div v-for="material in filteredMaterials" :key="material.id" class="material content-card">
        <div v-if="material.department === '2'" class="title">
          <span>Metallwerkstatt</span>
          <table>
            <tr>
              <th>Maschine</th>
              <th>Kosten in €</th>
            </tr>
            <tr>
              <td>{{material.internal_name}}</td>
            </tr>
          </table>
        </div>
        <div v-if="material.department === '3'" class="title">
          <span>Digitallabor</span>
        </div>
        <table>
        </table>
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
      loading: false,
      search: '',
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
  //   search () {
  //     this.update()
  //   }
  // },
  // methods: {
  //   update () {
  //     this.loading = true
  //     this.$store.dispatch('getMaterials', this.filters).then((data) => {
  //       this.loading = false
  //       this.materials = data
  //     })
  //   }
  //   toggleTags () {
  //     this.tagsCollapsed = !this.tagsCollapsed
  //   }
  // },
  computed: {
    filteredMaterials () {
      if (this.selectedMaterial.length === 0) {
        return this.materials.filter((item) => item.department)
      }
      return this.materials.filter((material) => {
        let result = false
        this.selectedMaterial.forEach(checkedItem => {
          if (parseInt(checkedItem) === parseInt(material.department)) {
            result = true
          }
        })
        return result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';
.machine-filters {
  flex: 1;
  .loading {
    position: absolute;
  }
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
.title {
  position: relative;
  z-index: 1;
  font-family: $font-mono;
  font-size: 0.9rem;
  letter-spacing: .1em;
  margin-bottom: .3rem;
  text-transform: uppercase;
  color: $color-blue;
}
</style>
