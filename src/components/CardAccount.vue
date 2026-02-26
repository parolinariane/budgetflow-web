<template>
  <div class="card-account">
    <div class="icon" :style="{ backgroundColor: color }">{{ initials }}</div>
    <div class="info">
      <h5>{{ name }}</h5>
      <p>{{ description }}</p>
    </div>
    <div class="balance">R$ {{ balance.toFixed(2) }}</div>
  </div>
</template>

<script>
export default {
  name: "CardAccount",
  props: {
    name: String,
    description: String,
    balance: Number,
    color: { type: String, default: "#27AE60" },
    initials: { type: String, default: "AC" },
  },
};
</script>

<style scoped>
.card-account {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

.info h5 {
  margin: 0;
  font-weight: 600;
}

.info p {
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.balance {
  font-weight: bold;
  font-size: 1rem;
}
</style>
