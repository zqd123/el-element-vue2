<template>
  <div id="app">
     <FormTable></FormTable>
     <TableForm></TableForm>
  </div>
</template>

<script>
import FormTable from './components/FormTable.vue'
import TableForm from './components/TableForm.vue'

export default {
  name: 'App',
  components: {
    FormTable,
    TableForm
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
