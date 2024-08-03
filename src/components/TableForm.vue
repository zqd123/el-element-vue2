<template>
  <div>

    <el-form :model="form" label-position="left" label-width="100" ref="ruleForm">
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
        <el-table-column width="50px" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-form-item>
              <div type="text" >
                删除{{ scope.row.input }}
              </div>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        tableData: [
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
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      })
  }
}
}
</script>
