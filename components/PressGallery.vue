<template>
  <div>
    <ul
        class="grid-container">
      <li v-for="image in imageList" :key="image.uuid" class="relative">
        <div
            class="display-grid-item"
            @click="showModal(image.image)">
          <img :src="image.image" alt=""
               class="grid-image" @click="showModal(image.image)"
          />
        </div>
      </li>
    </ul>
    <div id="modal" class="modal">
      <div class="modal-display">
        <a class="xButton" href="javascript:void(0)"
           @click="closeModal()">&times;</a>
        <div class="display-image">
          <a class="arrow-left" href="javascript:void(0)"
             @click="changeImage(-1)">&lt;</a>
          <img id="modal-img" class="modal-img"/>
          <a class="arrow-right" href="javascript:void(0)"
             @click="changeImage(1)">></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressGallery',
  props: ['images'],
  data () {
    return {
      container: null,
      currentPosition: 0
    }
  },
  computed: {
    imageList () {
      return this.images
    }
  },
  methods: {
    showModal (src) {
      console.log('huhu')
      const modal = document.getElementById('modal')
      modal.style.setProperty('display', 'flex')
      console.log(modal.style)
      const modalImg = document.getElementById('modal-img')
      modalImg.src = src
      this.imageList.forEach((item, index) => {
        if (item.src === src) {
          this.currentPosition = index
        }
      })
    },
    closeModal () {
      const modal = document.getElementById('modal')
      modal.style.setProperty('display', 'none')
    },
    changeImage (val) {
      if (this.currentPosition + val === this.imageList.length) {
        return
      }
      const modalImg = document.getElementById('modal-img')
      this.currentPosition = this.currentPosition + val
      console.log(this.currentPosition)
      this.imageList.forEach((item, index) => {
        if (this.currentPosition === index) {
          modalImg.src = item.image
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.grid-container {
  width: 100%;
  display: grid;
  padding-bottom: 10rem;
  column-gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  list-style: none;
}

.display-grid-item {
  display: block;
  overflow: hidden;
  width: 100%;

  &:hover {
    .grid-image {
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --transform-scale-x: 1.25;
      --transform-scale-y: 1.25;
      opacity: 0.75;
      --tw-scale-x: 1.25;
      --tw-scale-y: 1.25;
      --tw-border-spacing-x: 0;
      --tw-border-spacing-y: 0;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      transition-duration: 500ms;
    }
  }
}

.grid-image {
  object-fit: cover;
  cursor: pointer;
  pointer-events: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  height: auto;
  width: 100%;

  &:hover {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --transform-scale-x: 1.25;
    --transform-scale-y: 1.25;
    opacity: 0.75;
    --tw-scale-x: 1.25;
    --tw-scale-y: 1.25;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    transition-duration: 500ms;
  }
}

.relative {
  position: relative;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.74);
  z-index: 100;

  .modal-display {
    display: flex;
    flex-flow: column;
    opacity: 1;
  }
  .xButton {
    align-self: flex-end;
    color: white;
    text-decoration: white;
    font-weight: bold;
    font-size: 3rem;
    line-height: 1;
  }
  .display-image {
    display: flex;
    .arrow-left{
      padding-right: 2.5rem;
      color: #ffffff;
      font-size: 3rem;
      line-height: 1;
      font-weight: 700;
      align-self: center;
    }
    .arrow-right{
      padding-left: 2.5rem;
      color: #ffffff;
      font-size: 3rem;
      line-height: 1;
      font-weight: 700;
      align-self: center;
    }
    .modal-img{
      object-fit: cover;
      @media (min-width: 768px) {
        width: 600px;
      }
      @media (min-width: 1024px) {
        width: 1000px;
      }
    }
  }
}

</style>
