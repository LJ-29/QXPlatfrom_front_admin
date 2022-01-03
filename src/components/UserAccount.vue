<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="upId" label="账户表id" align="center" width="180">
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="用户邮箱"
        align="center"
        width="300"
      >
      </el-table-column>

      <el-table-column prop="pwd" label="用户密码" align="center" width="300">
      </el-table-column>
      <el-table-column label="密码是否加密" align="center" width="200">
        是
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row.upId)"
            >修改</el-button
          >
          <el-button @click="del(scope.$index, scope.row.upId)">删除</el-button>
        </template></el-table-column
      ></el-table
    >
  </div>
</template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { findUserpAll } from "../api/getData";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    findUserpAll().then((res) => {
      this.tableData = res.data.data;
    });
  },
  methods: {
    update(index, email) {
      console.log(email);
    },
    del(index,email){
      
    }
  },
};
</script>

<style>
</style>