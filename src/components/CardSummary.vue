<template>
  <div class="card-summary" :class="type">
    <h4>{{ title }}</h4>
    <p>R$ {{ amount.toFixed(2) }}</p>
  </div>
</template>

<script>
export default {
  name: "CardSummary",
  props: {
    title: String,
    amount: Number,
    type: {
      type: String,
      default: "normal", // normal | expense | income
    },
  },
};
</script>

<style scoped>
.card-summary {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex: 1;
  text-align: center;
}

.card-summary.normal h4 {
  color: #2C3E50;
}

.card-summary.income h4 {
  color: #27AE60;
}

.card-summary.expense h4 {
  color: #E74C3C;
}

.card-summary p {
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0;
  font-weight: bold;
}
</style>
