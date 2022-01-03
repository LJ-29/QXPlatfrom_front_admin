<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingTitle"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="biaoge">
      <div class="shaixuan">
        <h3>筛选：</h3>
        <div class="websiteTypeDate">
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            type="date"
            @blur="screeningDate"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="websiteTypeOnLine">
          <!-- 上线状态 -->
          <el-select
            v-model="onLineStateData"
            placeholder="上线状态"
            @change="onLineStateChange"
          >
            <el-option
              v-for="item in onLineState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="websiteTypeSeach">
          <el-input v-model="seachData" placeholder="搜索类型名">
            <el-button
              @click="seach"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="typeId"
          label="类型id"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型名称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="isOnLine"
          label="是否已上线"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.isOnLine == 2 ? "已上线" : "未上线" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="typeIcon"
          label="类型图标"
          align="center"
          width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              round
              @click="opneUpdate(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              round
              @click="del(scope.$index, scope.row.typeId)"
              >删除</el-button
            >
            <el-button round @click="offline(scope.$index, scope.row)">
              {{ scope.row.isOnLine == 2 ? "下线" : "上线" }}
            </el-button>
          </template></el-table-column
        ></el-table
      >
    </div>
    <div class="website">
      <el-divider></el-divider>
      <div class="addwebsite">
        <p>添加网站类型</p>
        类型名: <el-input v-model="addtypedata.typeName"></el-input>
        <p></p>
        类型图标: <el-input v-model="addtypedata.typeIcon"></el-input>
        <el-button icon="el-icon-circle-plus-outline" @click="addtype"
          >添加</el-button
        >
      </div>
    </div>

    <!-- 修改网站类型弹出框 -->
    <el-dialog
      title="修改网站类型"
      center
      :visible.sync="updateTypeDialogFormVisible"
      v-loading="updateTypeLoading"
      element-loading-text="网站添加中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="oneUpdateTypeData">
        <el-form-item label="类型id：" label-width="120px">
          <span>{{ oneUpdateTypeData.typeId }}</span>
        </el-form-item>
        <el-form-item label="类型名称：" label-width="120px">
          <el-input v-model="oneUpdateTypeData.typeName"></el-input>
        </el-form-item>
        <el-form-item label="更新时间：" label-width="120px">
          <span>{{ oneUpdateTypeData.addTime }}</span>
        </el-form-item>
        <el-form-item label="是否上线：" label-width="120px">
          <span>{{
            oneUpdateTypeData.isOnLine == 2 ? "已上线" : "未上线"
          }}</span>
        </el-form-item>
        <el-form-item label="类型图标：" label-width="120px">
          <el-input v-model="oneUpdateTypeData.typeIcon"></el-input>
        </el-form-item>
      </el-form>
      <div class="fasong">
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="update"
          >修改</el-button
        >
        <p></p>
        <el-button
          type="danger"
          icon="el-icon-s-promotion"
          @click="updateTypeDialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findWebsiteTypeAll,
  addType,
  updateType,
  offlineType,
  delOneType,
  findByOnLine,
  findTypeByType,
  findTypeByDate,
} from "../api/getData";
import { getTime } from "../config/public";
export default {
  data() {
    return {
      /**
       * 更新网站类型加载中
       */
      updateTypeLoading: false,
      /**
       * 更新对话框是否打开
       */
      updateTypeDialogFormVisible: false,
      tableData: [],
      currentPage:[],
      addtypedata: { typeName: "", typeIcon: "", addTime: "" },
      loading: false,
      loadingTitle: "",
      seachData: "",
      oneUpdateTypeData: {},
      /**
       *筛选日期
       */
      date: "",
      /**
       * 上线状态筛选
       */
      onLineState: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "2",
          label: "已上线",
        },
        {
          value: "1",
          label: "未上线",
        },
      ],
      /**
       * 上线状态选中的值
       */
      onLineStateData: "",
    };
  },
  created() {
    this.loading = true;
    this.loadingTitle = "加载内容中...";
    this.findAll();
    this.loading = false;
  },
  methods: {
    //查询所有网站类型
    findAll() {
      findWebsiteTypeAll().then((res) => {
        this.tableData = res.data.data;
        this.currentPage=res.data.data.slice(0,7)
      });
    },
    /**
     * 打开更新弹出框
     */
    opneUpdate(index, infor) {
      this.oneUpdateTypeData = infor;
      this.updateTypeDialogFormVisible = true;
    },
    /**
     * 更新网站类型
     */
    update() {
      if (
        this.oneUpdateTypeData.typeName == "" ||
        this.oneUpdateTypeData.typeIcon == ""
      ) {
        this.$message.error("内容不能为空");
        return;
      }
      this.updateTypeLoading = true;
      this.oneUpdateTypeData.addTime = getTime();
      updateType(this.oneUpdateTypeData).then((res) => {
        if (res.data.code == "300") {
          this.findAll();
          this.updateTypeDialogFormVisible = false;
          this.updateTypeLoading = false;
          this.$message({
            message: "网站类型修改成功",
            type: "success",
          });
          return;
        }
        this.$message.error("网站类型修改失败");
        this.updateTypeLoading = false;
      });
    },
    /**
     * 上线/下线网站类型
     */
    offline(index, infor) {
      this.loadingTitle = "更新上线状态中...";
      this.loading = true;
      offlineType({
        typeId: infor.typeId,
        isOnLine: infor.isOnLine == 2 ? 1 : 2,
      }).then((res) => {
        if (res.data.code == 300) {
          this.findAll();
          this.loading = false;
          this.$message({
            message: "上线状态成功",
            type: "success",
          });
          return;
        }
        console.log(res);
        this.$message.error("上线状态失败");
        this.loading = false;
      });
    },
    /**
    筛选日期触发事件
     */
    screeningDate() {
      findTypeByDate({date:this.date}).then(res=>{
        if (res.data.code==200) {
          this.tableData=res.data.data
          this.currentPage=res.data.data.slice(0,7)
          return
        }
        console.log(res);
        this.$message.error("查询失败");
      })
    },
    /**
     * 搜索
     */
    seach() {
      if (this.seachData == ""){
         this.findAll() 
         return;
      }
      findTypeByType({type:this.seachData}).then(res=>{
        if (res.data.code=="200") {
          this.tableData=res.data.data
          this.currentPage=res.data.data.slice(0,7)
          return
        }
        console.log(res);
        this.$message.error("查询失败");
      })
    },
    /**
     * 筛选上线状态值改变时触发事件
     */
    onLineStateChange() {
      if (this.onLineStateData == 0) {
        this.findAll();
        return;
      }
      findByOnLine({ isOnLine: this.onLineStateData }).then((res) => {
        if (res.data.code == "200") {
          this.tableData = res.data.data;
          this.currentPage=res.data.data.slice(0,7)
          return;
        }
        console.log(res);
        this.$message.error("查询失败");
      });
    },
    /**
     * 删除一条网站类型
     */
    del(index, typeid) {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadingTitle = "网站类型正在删除...";
          this.loading = true;
          delOneType({ typeId: typeid }).then((res) => {
            if (res.data.code == "777") {
              this.$message.error(res.data.msg);
              this.loading = false;
              return;
            }
            if (res.data.code == "600") {
              this.findAll();
              this.loading = false;
              this.$message({
                message: "网站类型删除成功",
                type: "success",
              });
              return;
            }

            console.log(res);
            this.loading = false;
            this.$message.error("网站类型删除失败");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加websiteType
    addtype() {
      if (this.addtypedata.typeName == "" || this.addtypedata.typeIcon == "") {
        this.$message.error("内容不能为空");
        return;
      }
      this.loadingTitle = "网站类型添加中...";
      this.loading = true;
      this.addtypedata.addTime = getTime();
      addType(this.addtypedata).then((res) => {
        if (res.data.code == "100") {
          this.findAll();
          this.addtypedata.typeIcon = "";
          this.addtypedata.typeName = "";
          this.addtypedata.addTime = "";
          this.loading = false;
          this.$message({
            message: "网站类型添加成功",
            type: "success",
          });
          return;
        }
        this.loading = false;
        this.$message.error("数据添加失败");
      });
    },
    /**
     * 翻页
     */
    turnPage(page){
      this.currentPage= this.tableData.slice((page-1)*7,page*7)
    },
  },
};
</script>

<style scoped>
.fasong button {
  width: 100%;
}
.biaoge {
  width: 1000px;
  display: inline-block;
}
.website {
  width: 250px;
  height: 600px;
  background-color: #545c64;
  float: right;
  padding: 5px;
  color: #ffffff;
}
.addwebsite {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
}
.addwebsite p {
  font-weight: bold;
  text-align: center;
}
.addwebsite button {
  width: 100%;
  margin-top: 20px;
}
.shaixuan {
  width: 100%;
  height: 40px;
  position: relative;
}
.websiteTypeSeach {
  width: 300px;
  position: absolute;
  right: 100px;
}
.shaixuan h3 {
  position: absolute;
  left: 30px;
  bottom: -10px;
}
.websiteTypeOnLine {
  position: absolute;
  left: 350px;
}
.websiteTypeDate {
  position: absolute;
  left: 100px;
}
</style>