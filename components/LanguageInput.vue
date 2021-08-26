 <template>
   <div>
     <div class="dropdown">
       <button class="dropbtn">{{language}}</button>
       <div class="dropdown-content" >
         <option v-modal="language">
           <a v-for="l in $i18n.locales"
                     :key="l.code"
                     :value="l.code"
                      @click="language = l.name"
         >{{l.name}}</a>
         </option>
     </div></div>
   </div>
</template>

<script>

export default {
  name: 'LanguageInput',
  data: () => ({
    language: 'DE'
  }),
  watch: {
    languageChange: function (to) {
      console.log('change', to)
      console.log(this.$route)
      this.$router.push('/' + to)
    }
  },
  computed: {
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
 <style lang="scss" scoped>
 @import '/assets/scss/styles.scss';
 .dropbtn {
   background-color: #f2f3ee;
   padding: 16px;
   border: none;
 }

 .dropdown {
   position: relative;
   display: inline-block;
 }

 .dropdown-content {
   display: none;
   position: absolute;
   background-color: #f1f1f1;
   min-width: 50px;
   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
   z-index: 1;
   text-transform: uppercase;
   color: #000;
   text-decoration: none;
   font-weight: bold;
   font-size: 0.9rem;
   padding: 8px;
 }

 .dropdown-content a {
   color: black;
   display: block;
   padding: 16px;
   text-align: left;
 }

 .dropdown-content a:hover {color: $color-secondary;    white-space: nowrap;
}

 .dropdown:hover .dropdown-content {display: block;}

 .dropdown:hover .dropbtn {background-color: black;   color: white;}
</style>
