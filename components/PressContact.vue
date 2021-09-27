<template>
  <div>
    <div class="background">
      <div class="press-header">
        <h2>
          Presse
        </h2>
      </div>
    </div>
    <div
        v-editable="blok"
        class="press-contact"
    >
      <div class="contact-details">
        <h2  class="your-contact">
          Ihr Kontakt
        </h2>
        <h2 class="teaser">
          {{ blok.title }}
        </h2>
        <h4>
          {{ blok.position}}
        </h4>
        <h4>
          {{ blok.company_details}}
        </h4>
        <h4>
          {{ blok.contact}}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  name: 'PressContact'
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
    .your-contact{
      font-size: 4.6875rem;
      line-height: 1.1;
    }
    color: white;
    display: flex;
    align-self: center;
    flex-flow: column;
    max-width: 960px;
    margin-left:auto;
    margin-right: auto;
  }
}
</style>
