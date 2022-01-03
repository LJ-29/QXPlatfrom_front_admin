<template>
   <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
        prop="permissionId"
        label="权限id"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="permission"
        label="权限"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="权限描述"
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
          <el-button @click="del(scope.$index, scope.row.permissionId)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
  </div>
</template>

<script>
import {findPermissionAll} from "../api/getData"
export default {
data() {
    return {
      tableData: [],
    };
  },
  created() {
    findPermissionAll().then((res) => {
      this.tableData = res.data.data;
    });
  },
  methods: {
    update(index, infor) {
      console.log(infor);
    },
    del(index,permissionId){
      
    }
  },
}
</script>

<style>

</style>