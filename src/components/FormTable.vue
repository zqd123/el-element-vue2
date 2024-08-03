<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-table :data="ruleForm.tableData" style="width: 100%">
        <el-table-column label="日期">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.name'"
              :rules="rules.name"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.age'"
              :rules="rules.age"
            >
              <el-input v-model="scope.row.age"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column width="50px" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-form-item>
              <div type="text" @click="delRow(scope.row)">
                删除
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
      ruleForm: {
        tableData: [
          {
            name: "",
            age: "",
          }
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [{ validator: this.verifyAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    /*eslint no-debugger: "warn"*/
    verifyAge(rule, value, callback) {
      // debugger
      if (!value) {
        callback(new Error("年龄不能为空"));
      } else {
        callback();
      }
      console.log({ rule, value, callback });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // setTimeout(() => {
      //   this.ruleForm = {
      //     tableData: [
      //       {
      //         name: "",
      //         age: "",
      //       },
      //     ],
      //   };
      // }, 3000);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
