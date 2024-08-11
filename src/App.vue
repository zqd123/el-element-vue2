<template>
  <div id="app">
    <!-- <FormTable></FormTable>
     <TableForm></TableForm>
<TB></TB> -->
    <el-select
      size="mini"
      v-model="currentSourceTable"
      value-key="sourceTable"
      @change="sourceTableChange"
    >
      <el-option
        v-for="item in selectedTables"
        :key="item.sourceTable"
        :value="item"
        :label="item.sourceTable"
      ></el-option>
    </el-select>
    <SelectsInTable
      v-model="currentSourceTable.mapping"
      :isAutoCreateTable="currentSourceTable.isAutoCreateTable"
      :fieldTypeList="fieldTypeList"
      :securityRuleIdList="securityRuleIdList"
      :sourceTableFields="currentSourceTable.sourceTableFields"
      :customParameters="[]"
      destDatabaseType="HIVE"
    ></SelectsInTable>
  </div>
</template>

<script>
// import FormTable from './components/FormTable.vue'
// import TableForm from './components/TableForm.vue'
// import TB from './components/TB.vue'
import SelectsInTable from "./tablePerformance/SelectsInTable";
import {
  dataSyncInfoList,
  fieldTypeList,
  securityRuleIdList,
} from "./tablePerformance/data";

export default {
  name: "App",
  components: {
    // FormTable,
    // TableForm,
    // TB,
    SelectsInTable,
  },
  data() {
    return {
      currentSourceTable: {},
      selectedTables: dataSyncInfoList,
      fieldTypeList,
      securityRuleIdList,
    };
  },
  methods: {
    sourceTableChange(v) {
      console.log(v);
      this.currentSourceTable = v;
    },
  },
};
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
