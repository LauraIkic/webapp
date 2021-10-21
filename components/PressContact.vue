<template>
    <div
        class="press-contact"
    >
        <div  class="contact-details">
          <h2  class="your-contact">
            {{ $t('yourContact') }}
          </h2>
          <h2 class="teaser">
            {{ person.title }}
          </h2>
          <h4 class="position">
            {{ person.position}}
          </h4>
          <h4>
            <markdown :value="person.company_details" />
          </h4>
          <h4 class="contact-email">
            {{ person.contact}}
          </h4>
          <div
              class="contact-image"
              :style="{ 'background-image': 'url(' + $resizeImage(person.Image, '600x600') + ')' }"
          />
        </div>
      </div>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    person () {
      return this.story
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.background{
  background-color: white;
}
.press-header{
  font-size: 3rem;
  display: flex;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  background-color: #FFF;
  padding: 0px 75px;
  margin-bottom: 10vh;
}
.press-contact{
  .contact-image{
    height: 2vh;
    background-size: contain;
    background-repeat: no-repeat;
  }
  justify-content: center;
  .position{
    margin-top:0%;
  }
  .contact-email{
    margin-top: -2%;
  }
  .contact-details{
    max-width: 1000px;
    .your-contact{
      font-size: 3rem;
      font-family: Chakra Petch;
      line-height: 1.1;
    }
    display: flex;
    align-self: center;
    flex-flow: column;
    margin-left:auto;
    margin-right: auto;
  }
  @include media-breakpoint-down(sm) {
    .contact-details{
      max-width: 350px;
      .your-contact{
        font-size: 2rem;
      }
    }
  }
}
@include media-breakpoint-down(md) {
  .press-contact{
    .contact-details{
      margin-left:10%;
      margin-right: 10%;
    }
  }
}
</style>
