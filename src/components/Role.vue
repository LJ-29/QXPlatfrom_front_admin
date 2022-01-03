<template>
   <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
        prop="roleId"
        label="角色id"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述"
        align="center"
        :show-overflow-tooltip="true"
        width="200"
      >
      </el-table-column>
      
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button @click="del(scope.$index, scope.row.roleId)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
  </div>
</template>

<script>
import {findRoleAll} from "../api/getData"
export default {
data() {
    return {
      tableData: [],
    };
  },
  created() {
    findRoleAll().then((res) => {
      this.tableData = res.data.data;
    });
  },
  methods: {
    update(index, infor) {
      console.log(infor);
    },
    del(index,roleId){
      
    }
  },
}
</script>

<style>

</style>