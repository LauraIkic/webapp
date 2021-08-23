 <template>
   <div class="language-input">
     <div class="lang-dropdown">
       <select class="holder" v-model="$i18n.locale">
         <option
             v-for="l in $i18n.locales"
             :key="l.code"
             :value="l.code"
         >{{l.name}}
         </option>
       </select>
       <a :href="$i18n.locale" @click="$router.push(localeLocation({ name: 'index', params: { foo: '1' } }))">Change</a>
       <h1 class="title">{{ $t('message') }}{{$store.state.language}} "  " {{$i18n.locale}}</h1>
     </div>
   </div>
</template>

<script>
import { i18n as $i18n } from '../nuxt.config'

export default {
  name: 'LanguageInput',
  pathData () {
    return this.data
  },
  computed: {
    languages () {
      return {
        lang: $i18n.locales
      }
    }
  },
  mounted () {
    this.$store.state.language = $i18n.locale
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
