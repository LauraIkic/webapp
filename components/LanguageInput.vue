 <template>
   <div class="language-input">
     <div class="lang-dropdown">
       <select class="holder" v-model="language">  <!-- v-model="$i18n.locale"> -->
         <option
             v-for="l in $i18n.locales"
             :key="l.code"
             :value="l.code"
         >{{l.name}}
         </option>
       </select>
       language {{ language }}
<!--       <nuxt-link
           :to="switchLocalePath($i18n.locale)">LANG CHANGE</nuxt-link>
       <br>
       <nuxt-link :to="switchLocalePath('en')">LANGUAGE</nuxt-link>
       <br>
       <nuxt-link :to="switchLocalePath('de')">Deutsch</nuxt-link>
       <br>-->
       <h1 class="title">{{ $t('message') }}"  "{{ this.localeLocation.toString()}}</h1>
     </div>
   </div>
</template>

<script>
import { i18n as $i18n } from '../nuxt.config'

export default {
  name: 'LanguageInput',
  data: () => ({
    language: null
  }),
  watch: {
    language: function (to) {
      console.log('change', to)
      console.log(this.$route)
      this.$router.push('/' + to)
    }
  },
  computed: {
    languages () {
      return {
        lang: $i18n.locales
      }
    },
    currentLanguage () {
      return {
        selected: this.localeLocation(this.$i18n.locale)
      }
    }
  },
  methods: {
    setLanguage (to) {
      console.log(to)
    }
  }
}

</script>

<style scoped>
.lang-dropdown{
  padding-left: 10vw;
}
.language-input{
  background-color: grey;
}
.holder{
  padding-left: 10vw;
}

</style>
