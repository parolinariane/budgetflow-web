<template>
  <button class="btn-float" @click="$emit('click')">
    +
  </button>
</template>

<script>
export default {
  name: "FloatingButton",
};
</script>

<style scoped>
.btn-float {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #27AE60;
  color: white;
  border: none;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: 0.2s;
}

.btn-float:hover {
  background-color: #1e8449;
}
</style>
