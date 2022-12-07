<template>
  <div class="section">
    <h2>Foto</h2>
<!--    <p>Damit wir Dir Deine persönliche Memberkarte erstellen können, brauchen wir auch ein Foto von Dir.</p>-->
    <p>Für Deine persönliche Memberkarte lade bitte hier Dein Bild hoch.</p>
<!--    <p>Wenn Du grad keines hast ist das kein Problem, wir machen bei Deinem ersten Besuch in der GG eins von Dir.</p>-->
    <form class="form">
      <div v-if="image != null" class="form-item">
        <span class="label">{{ $t('Image-Preview') }}</span>
        <img class="profilePic" v-if="image" :src="imageUrl">
      </div>
      <div class="form-item">
        <span class="label">{{ $t('Upload-Image') }}</span>
        <input
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="onChange"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    onboardingData: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      image: null,
      imageUrl: null,
      loading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('INAGE FROM: ', from.path)
    if ((from.path === '/wizard/onboarding/contact') || (from.path === '/wizard/onboarding/payment')) {
      next()
    } else {
      next('/wizard/onboarding/')
    }
  },
  computed: {
  },
  methods: {
    onChange (e) {
      const file = e.target.files[0]
      if (file.size > 20000000) {
        alert('Es sind nur Bilddateien unter 20MB erlaubt')
        return false
      }
      this.image = file
      this.imageUrl = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        this.onboardingData.image64 = reader.result
      }
      this.onboardingData.image64 = reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>

.form {
  margin-left: -6em;
  @include media-breakpoint-down(md) {
    margin-left: 0em;
  }
}

.red {
  color: $color-red;
}

.form-item {
  min-width: 27em;
  @include media-breakpoint-down(md) {
    min-width: auto;
  }
}

img {
  width: 27em;
  height: auto;
  @include media-breakpoint-down(md) {
    width: 250px;
  }
}

</style>
