<template>
  <div class="summary-card">
    <div class="card-top">
      <div class="icon-wrapper" :class="type">
        <span class="icon">
          {{ icon }}
        </span>
      </div>

      <div class="value">
        {{ formattedAmount }}
      </div>
    </div>

    <div class="card-body">
      <h4>{{ title }}</h4>
      <p class="subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="bottom-line" :class="type"></div>
  </div>
</template>

<script>
export default {
  name: "CardSummary",
  props: {
    title: String,
    amount: Number,
    type: String
  },
  computed: {
    formattedAmount() {
      return this.amount?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      }) || "R$ 0,00";
    },
    icon() {
      if (this.type === "expense") return "💸";
      if (this.type === "limit") return "🎯";
      if (this.type === "income") return "💰";
      return "📊";
    },
    subtitle() {
      if (this.type === "expense") return "Total gasto no mês";
      if (this.type === "limit") return "Limite definido";
      if (this.type === "income") return "Valor restante";
      return "";
    }
  }
};
</script>

<style scoped>
.summary-card {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-3px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.icon-wrapper.expense {
  background-color: #FDECEC;
}

.icon-wrapper.limit {
  background-color: #E8F8F1;
}

.icon-wrapper.income {
  background-color: #EAF2FF;
}

.value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2C3E50;
}

.card-body {
  margin-top: 1rem;
}

.card-body h4 {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.subtitle {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #7F8C8D;
}

.bottom-line {
  height: 4px;
  width: 100%;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.bottom-line.expense {
  background-color: #E74C3C;
}

.bottom-line.limit {
  background-color: #27AE60;
}

.bottom-line.income {
  background-color: #3498DB;
}
</style>