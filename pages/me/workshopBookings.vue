<template>
  <div>
    <h2>Meine Workshops</h2>
    <div
      v-if="bookings.length"
      class="workshops"
    >
      <div
        v-for="workshopDate in bookings"
        :key="workshopDate.content.workshop.uuid"
        class="workshop-item"
      >
        <workshop-preview
          :id="workshopDate.content.workshop.uuid"
          :key="workshopDate.content.workshop.uuid"
          class="preview"
        />
        <button
            class="input-button-primary"
            @click="storno(workshopDate)"
        >
          Diesen Workshop stornieren
        </button>
        <workshop-dates
          :dates="[workshopDate]"
          class="workshop-dates"
          :hide-register="true"
          :no-metadata="true"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      bookings: [],
      error: null
    }
  },
  computed: {},
  mounted () {
    this.$store.dispatch('getBookedWorkshops').then(data => {
      data.forEach(uuid => {
        this.$store.dispatch('loadStoryByUUid', uuid).then(data => {
          this.bookings.push(data.story)
        })
      })
    })
  },
  methods: {
    storno: function (workshopDate) {
      const data = {
        workshop_date_id: workshopDate.uuid
      }
      if (confirm('Workshop ' + workshopDate.content.workshop.name + ' wirklich stornieren?')) {
        this.$store.dispatch('workshopStorno', data).then((data) => {
          if (data.status >= 200 && data.status <= 300) {
            this.$toast.show('Der Workshop wurde erfolgreich storniert!', {
              className: 'goodToast'
            })
          } else {
            if (data.status >= 400 && data.status < 500) {
              //  TODO get some kind of messages.
            } else {
              this.$sentry.captureException(new Error(data))
              this.error = 'Leider ist ein Fehler aufgetreten.'
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.workshops{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.workshop-item{
  max-width: 50%;
}
</style>
