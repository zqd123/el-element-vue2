<template>
  <div class="table-block draggable">
    <el-table
      :data="tableList"
      row-key="customId"
      size="small"
    >
      <el-table-column prop="columnName" label="字段编码">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.columnName"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="columnType"
        label="字段类型"
        width="130"
      >
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.columnType"
          >
            <el-option
              v-for="(item, index) in fieldTypeList"
              :key="index"
              :value="item.code"
              :label="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="sourceType"
        label="来源形式"
        width="130"
      >
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.sourceType"
            @change="sourceTypeChange(scope.row)"
          >
            <el-option
              v-for="(item, index) in sourceTypeEnum"
              :key="index"
              :value="item.code"
              :label="item.label"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="columnType" label="源字段">
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.sourceColumnName"
            filterable
          >
            <template v-if="scope.row.sourceType === 0">
              <el-option
                v-for="(item, index) in sourceTableFields"
                :key="index"
                :value="item.columnName"
                :label="item.columnName"
              ></el-option>
            </template>
            <template v-if="scope.row.sourceType === 1">
              <el-option
                v-for="(item, index) in customParameters"
                :key="index"
                :value="item.prop"
                :label="item.prop"
              ></el-option>
            </template>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="加密算法" width="130">
        <template v-slot="{ row }">
          <el-select
            size="mini"
            class="ruleId-select"
            v-model="row.securityRuleId"
            filterable
            clearable
          >
            <el-option
              v-for="item in securityRuleIdList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="主键"
        width="50"
        align="center"
      >
        <template v-slot="{ row }">
          <el-checkbox
            v-model="row.isPk"
            @change="setPrimaryKey()"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="分区"
        width="70"
        align="center"
      >
        <template v-slot="{ row }">
          <el-checkbox v-model="row.isPartition"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <div
            type="text"
            class="t-c-red cs-p"
            size="mini"
            @click="delHeaderParams(scope.$index, $event)"
          >
            删除
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    //v-model值
    value: {
      type: Array,
      default: () => [],
    },
    //数据过滤(是否自动建表)0-已存在的表 1-是自动创建
    isAutoCreateTable: {
      type: Number,
      default: 0,
    },
    //来源表字段
    sourceTableFields: {
      type: Array,
      default: () => [],
    },
    targetTableFields: {
      type: Array,
      default: () => [],
    },
    //目标源-数据源类型
    destDatabaseType: {
      type: String,
      default: "",
    },
    //字段类型
    fieldTypeList: {
      type: Array,
      default: () => [],
    },
    // 自定义参数
    customParameters: {
      type: Array,
      default: () => [],
    },
    //加密规则list
    securityRuleIdList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sourceTypeEnum: [
  { code: 0, label: '接口返回' },
  { code: 1, label: '自定义参数' },
], // 来源类型
      tableList: [], //表字段
      previousSortable: {}, // 拖动实例
      // setInter: null, // 懒加载定时器
      // asyncSourceTableFields: [], //延迟加载目标表源字段下拉数据
      // asyncTableIndex: 0, //截取数组索引
      // asyncTableList: [], // 目标表懒加载
    };
  },
  computed: {
    isShowPartitionPK() {
      return this.destDatabaseType === "STARROCKS" && this._isisAutoCreateTable;
    },
    _isisAutoCreateTable() {
      return this.isAutoCreateTable === 1;
    },
  },
  mounted() {
    this.initData(this.value);
  },
  watch: {
    value(newData) {
      this.initData(newData);
    },
  },
  methods: {
    setPrimaryKey() {
    },
    /**来源形式变更 */
    sourceTypeChange(row) {
      row.sourceColumnName = "";
    },
    /**初始化数据 */
    initData(newData) {
      // debugger
      const initArray = JSON.parse(JSON.stringify(newData));
      this.tableList = initArray.map((item, index) => {
        if (!("customId" in item)) {
          item.customId = new Date().getTime() + index;
        }
        if (!("sourceType" in item)) {
          item.sourceType = 0;
        }
        if (!("sourceColumnName" in item)) {
          item.sourceColumnName = "";
        }
        if (!("securityRuleId" in item)) {
          item.securityRuleId = "";
        }
        return item;
      });
      //更新表格数据
      // this.updateAsyncTableList(this.asyncTableIndex)
      // console.log('🐶 ~ file: TargetTable.vue:148 ~ value ~ this.tableList:', this.tableList)
    },
    // 拖拽排序
    /**去掉前端加的唯一值 */
    unMappingTableList(arr) {
      return arr.map((item) => {
        delete item.customId;
        return item;
      });
    },
    /**
     * 为字段增加sourceIndex属性
     * @param {array} arr 原字段list
     * @returns {array} 增加sourceIndex后字段list
     */
    addSourceIndex(arr) {
      const sourceFieldOfMap = new Map(
        this.sourceTableFields.map((item, index) => {
          item.sourceIndex = index;
          return [item.columnName, item];
        })
      );
      return arr.map((item) => {
        // 来源是来源表
        if (item.sourceType === 0 || item.sourceType === "0") {
          item.sourceIndex =
            sourceFieldOfMap.get(item.sourceColumnName)?.sourceIndex ?? "";
        } else {
          item.sourceIndex = "";
        }
        return item;
      });
    },

    exData() {
      return this.addSourceIndex(this.tableList);
    },
  },
};
</script>
