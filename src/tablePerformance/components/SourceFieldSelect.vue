<template>
  <el-select
    size="mini"
    :value="value"
    @change="sourceColumnNameChange"
    @visible-change="sourceColumnNameVisibleChange"
    filterable
  >
    <template>
      <el-option
        v-for="(item, index) in _sourceTableFields"
        :key="index"
        :value="item.columnName"
        :label="item.columnName"
      ></el-option>
    </template>
    <template v-if="sourceType === 1">
      <el-option
        v-for="(item, index) in customParameters"
        :key="index"
        :value="item.prop"
        :label="item.prop"
      ></el-option>
    </template>
  </el-select>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["value"]);
const props = defineProps({
  sourceType: {
    type: Number,
    default: 0,
  },
  value: String,
  sourceTableFields: Array,
  customParameters: Array,
});
const _sourceTableFields = ref([]);
function sourceColumnNameChange(v) {
  console.log(v);

  emit("input", v);
}
function sourceColumnNameVisibleChange(v) {
  if (v && _sourceTableFields.value.length === 0) {
    console.log(v);

    _sourceTableFields.value = props.sourceTableFields;
  }
}

// console.log(props);
</script>
