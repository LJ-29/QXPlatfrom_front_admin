<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="userEmail" label="邮箱" align="center" width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="usersex"
        label="用户性别"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="userage"
        label="用户年龄"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="headPortrait"
        label="头像链接"
        align="center"
        :show-overflow-tooltip="true"
        width="200"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row.userEmail)"
            >修改</el-button
          >
          <el-button @click="del(scope.$index, scope.row.userEmail)"
            >删除</el-button
          >
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
import { findUserAll } from "../api/getData";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    findUserAll().then((res) => {
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