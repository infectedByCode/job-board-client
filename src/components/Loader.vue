<template>
  <div v-if="loading" :class="$style.loader">
    <svg
      :class="$style.svgSpinner"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="4" r="4" fill="#3cbf0a" />
      <circle cx="12.19" cy="7.86" r="3.7" fill="#3cbf0a" />
      <circle cx="5.02" cy="17.68" r="3.4" fill="#3cbf0a" />
      <circle cx="5.02" cy="30.32" r="3.1" fill="#3cbf0a" />
      <circle cx="12.19" cy="40.14" r="2.8" fill="#3cbf0a" />
      <circle cx="24" cy="44" r="2.5" fill="#3cbf0a" />
      <circle cx="35.81" cy="40.14" r="2.2" fill="#3cbf0a" />
      <circle cx="42.98" cy="30.32" r="1.9" fill="#3cbf0a" />
      <circle cx="42.98" cy="17.68" r="1.6" fill="#3cbf0a" />
      <circle cx="35.81" cy="7.86" r="1.3" fill="#3cbf0a" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style module>
.loader {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(40, 40, 40);
  background-color: rgba(40, 40, 40, 0.7);
}

.loader > h1 {
  width: 100%;
}

.svgSpinner {
  display: block;
  margin: 0 auto;

  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1.2s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;

  -moz-transition-property: -moz-transform;
  -moz-animation-name: rotate;
  -moz-animation-duration: 1.2s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;

  transition-property: transform;
  animation-name: rotate;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>