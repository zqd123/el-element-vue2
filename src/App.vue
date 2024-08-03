<template>
  <div id="app">
     <FormTable></FormTable>
     <TableForm></TableForm>
<TB></TB>
  </div>
</template>

<script>
import FormTable from './components/FormTable.vue'
import TableForm from './components/TableForm.vue'
import TB from './components/TB.vue'

export default {
  name: 'App',
  components: {
    FormTable,
    TableForm,
    TB
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
