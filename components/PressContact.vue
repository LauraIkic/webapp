<template>
    <div
        class="press-contact"
    >
        <div  class="contact-details">
          <h2  class="your-contact">
            Ihr Kontakt
          </h2>
          <h2 class="teaser">
            {{ person.title }}
          </h2>
          <h4>
            {{ person.position}}
          </h4>
          <h4>
            {{ person.company_details}}
          </h4>
          <h4>
            {{ person.contact}}
          </h4>
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
  background-color: black;
  display: flex;
  justify-content: center;
  .contact-details{
    max-width: 1000px;
    .your-contact{
      font-size: 3rem;
      font-family: Chakra Petch;
      line-height: 1.1;
    }
    color: white;
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
