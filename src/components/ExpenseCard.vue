<template>
  <div class="expense-card">
    <div class="left">
      <div class="icon">
        {{ expense.title.charAt(0).toUpperCase() }}
      </div>

      <div class="info">
        <h4>{{ expense.title }}</h4>
        <p>
          {{ expense.category }} •
          {{ formatDate(expense.date) }}
        </p>
      </div>
    </div>

    <div class="amount">
      - R$ {{ expense.amount.toFixed(2) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenseCard",
  props: {
    expense: Object,
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR");
    },
  },
};
</script>

<style scoped>
.expense-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: 0.2s;
}

.expense-card:hover {
  transform: translateY(-2px);
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #27AE60;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info h4 {
  margin: 0;
  font-size: 1rem;
}

.info p {
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.amount {
  font-weight: bold;
  color: #E74C3C;
  font-size: 1rem;
}
</style>
