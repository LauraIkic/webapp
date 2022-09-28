<template>
  <div
      v-editable="blok"
      class="faq-block"
  >
    <div class="downloads">
      <div class="headline">
        {{ $t('downloads') }}
      </div>
      <div class="download-list">
        <download-item
            v-for="i in blok.downloads"
            :key="i.uid"
            :blok="i"
        />
      </div>
    </div>
    <div class="faqs">
      <h3><span id="general"></span>Allgemein</h3>
      <faq-item
          v-for="i in generalQuestions"
          :key="i.uid"
          :blok="i"
      />
      <br>
      <h3><span id="membership"></span>Mitgliedschaft</h3>
      <faq-item
          v-for="i in memberQuestions"
          :key="i.uid"
          :blok="i"
      />
      <br>
      <h3 v-if="workshopGiftCardQuestions.length > 0"><span id="workshop_giftCard"></span>Workshops & Gutscheine</h3>
      <faq-item
          v-for="i in workshopGiftCardQuestions"
          :key="i.uid"
          :blok="i"
      />
      <br>
      <h3 v-if="creditsQuestions.length > 0 "><span id="credits"></span>Credits</h3>
      <faq-item
          v-for="i in creditsQuestions"
          :key="i.uid"
          :blok="i"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    memberQuestions () {
      //return this.filterFaqs('general')
      return this.filterFaqs('member')
    },
    generalQuestions () {
      return this.filterFaqs('general')
    },
    workshopGiftCardQuestions () {
      return this.filterFaqs(' ')
    },
    creditsQuestions () {
      return this.filterFaqs('credits')
    }
  },
  methods: {
    filterFaqs (category) {
      return this.blok.faqs.filter((item) => {
        return (item.category === category) ? item : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  position: relative;
  padding: 20px;
  background: white;
  margin-left: 20px;
}

h3 span {
  position: absolute;
  top: -100px;

}

.faq-block {
  display: flex;
  @include media-breakpoint-down(sm) {
    flex-direction: column-reverse;
  }
  align-items: flex-start;
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }

  .downloads {
    padding: 25px;
    flex: 1;

    .headline {
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: .8em;
    }

    background-color: #FFF;

    .download-list {
    }
  }

  .faqs {
    flex: 4;
    margin-bottom: 3vh;
  }
}
</style>
