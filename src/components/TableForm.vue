<template>
  <el-form :model="form" label-position="left" label-width="100" ref="form">
    <el-form-item label="其他表单项" prop="name" :rules="rules.name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-table :data="form.tableData" border stripe>
      <el-table-column label="该列单元格校验">
        <template slot-scope="{ row, $index }">
          <el-form-item
            :prop="`tableData.${$index}.input`"
            :rules="rules.input"
          >
            <el-input v-model="row.input"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        tableData: [
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
        ],
      },
      rules: {
        name: [
          { required: true, trigger: ["blur", "change"], message: "请选择" },
        ],
        input: [
          { required: true, trigger: ["blur", "change"], message: "请选择" },
        ],
      },
    };
  },
};
</script>
