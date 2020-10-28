<template>
  <div>
    <label v-if="label" :for="name">{{label}}</label>
    <input
      v-model="input"
      :type="type"
      :class="[$style[size],$style[align]]"
      :disabled="disabled"
      @input="(e) => handleInput(e)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: true,
      default: ""
    },
    size: {
      type: String,
      required: true,
      default: "max",
      validator: value =>
        ["small", "medium", "large", "max"].indexOf(value) !== -1
    },
    align: {
      type: String,
      required: true,
      default: "center",
      validator: value => ["left", "center", "right"].indexOf(value) !== -1
    },
    type: {
      type: String,
      default: "text",
      validator: value => ["text", "password"].indexOf(value) !== -1
    },
    input: {
      type: String,
      required: true,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style module>
label {
  display: block;
  text-align: left;
  width: 100%;
  margin: 0 auto;
}

input {
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: #dddddd 2px 2px 5px;
  padding: 1%;
}

input:active,
input:focus {
  outline: none !important;
  border: 1px solid #dd5800;
  box-shadow: 0 0 10px #719ece;
}

.left {
  float: left;
}

.small {
  width: 30%;
  padding: 0.75%;
}

.medium {
  width: 50%;
}

.large {
  width: 80%;
}

.max {
  width: 100%;
}
</style>