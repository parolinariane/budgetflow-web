<template>
  <header class="app-header">
    <div class="header-content">
      <div class="brand">
        <img src="../assets/logo.png" alt="Logo BudgetFlow" class="logo" />
        <h1>BudgetFlow</h1>
      </div>

      <nav class="nav-actions">
        <button class="nav-btn" @click="$router.push('/')">
          Dashboard
        </button>

        <button class="nav-btn" @click="$router.push('/limite')">
          Limite Mensal
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style scoped>
.app-header {
  width: 100%;
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 1rem 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand h1 {
  color: #27AE60;
  font-size: 1.8rem;
  margin: 0;
}

.logo {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  background: none;
  border: none;
  color: #2C3E50;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.nav-btn:hover {
  color: #27AE60;
}
</style>