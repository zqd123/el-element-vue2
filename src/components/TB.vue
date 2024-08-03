<template>
    <div>
      <el-form
      :model="formData"
      ref="formRef"
      :rules="rules"
      label-width="108px"
      :inline="true"
      >
      <el-table
      :data="formData.tableData"
      style="width: 100%" border
      >
      <el-table-column type="index" width="55" align="center">
      </el-table-column>
      <el-table-column label="姓名" prop="name" resizable align="center" header-align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules="rules.name">
            <el-input type="text" size="small" placeholder="请输入姓名" v-model="scope.row.name"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" resizable align="center" header-align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.age'" :rules="rules.age">
            <el-input type="text" size="small" placeholder="请输入年龄" v-model="scope.row.age"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="sex" resizable align="center" header-align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.sex'" :rules="rules.sex">
            <el-input type="text" size="small" placeholder="请输入性别" v-model="scope.row.sex"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" resizable align="center" header-align="center">
       <template slot-scope="{$index}">
        <el-button type="primary" icon="el-icon-plus" circle @click="addTable()" v-if="$index == 0"></el-button>
        <el-button icon="el-icon-minus" circle @click="delTable($index)" v-if="$index > 0"></el-button>
        </template>
       </el-table-column>
      </el-table>
      <el-form-item class="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button>取消</el-button>
      </el-form-item>
     </el-form>
    </div>
  </template>
   
  <script>
  export default{
    data(){
      return{
        formData:{
          tableData:[
            {name:'张三',age:18,sex:'男'},
            {name:'李四',age:19,sex:''},
          ]
        },
        rules:{
          name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          age:[
          { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          sex:[
          { required: true, message: '请输入性别', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      //保存
      save(){
        this.$refs.formRef.validate((valid) => {
          console.log('valid',valid);
          if(valid){
            //如果valid为true，表示校验通过，可以提交表单，调取接口进行保存
            console.log('表单校验通过');
            this.$message.success("保存成功");
          }else {
          this.$message.warning("请填写完整的数据");
         }
        })
      },
      //添加
      addTable(){
        let newArr = [
          {
            name:'',
            age:'',
            sex:''
          }
        ]
        this.formData.tableData.push(...newArr)
      },
      //删除
      delTable(i){
        this.formData.tableData.splice(i,1)
      }
    }
  }
  </script>
   
  <style>
  .footer{
    margin-top: 50px;
  }
  </style>