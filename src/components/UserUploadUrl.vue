<template>
  <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
        prop="userUrlId"
        label="上传链接id"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="websiteUrl"
        label="网站链接"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="websiteName"
        label="网站名称"
        align="center"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="用户邮箱"
        align="center"
        :show-overflow-tooltip="true"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="uptime"
        label="上传时间"
        align="center"
        width="150"
        
      >
      </el-table-column>
      <el-table-column
        prop="websiteDescription"
        label="网站描述"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="审核状态"
        align="center"
        width="100"
      >
      <template slot-scope="scope">
        {{scope.row.state==1?"待审核":scope.row.state==2?"审核通过":"未审核通过"}}
      </template>
      </el-table-column>
      <el-table-column
        prop="cause"
        label="审核未通过原因"
        align="center"
        width="200"
      >
      <template slot-scope="scope">
        {{scope.row.cause!=null||scope.row.cause!=""?scope.row.cause:"无原因"}}
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button @click="del(scope.$index, scope.row.userUrlId)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
  </div>
</template>

<script>
import {findUserUploadUrlAll} from "../api/getData"
export default {
data() {
    return {
      tableData: [],
    };
  },
  created() {
    findUserUploadUrlAll().then((res) => {
      this.tableData = res.data.data;
    });
  },
  methods: {
    update(index, infor) {
      console.log(infor);
    },
    del(index,userUrlId){
      
    }
  },
}
</script>

<style>

</style>