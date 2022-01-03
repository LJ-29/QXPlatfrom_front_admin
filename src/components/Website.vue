<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingTilte"
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
        <div class="websiteTitleByType">
          <!-- 类型筛选 -->
          <el-select @change="typescreening" v-model="screeningTitleId" placeholder="总名称">
            <el-option label="全部名称" value="0">全部名称</el-option>
            <el-option
              v-for="item in websiteidTitleData"
              :key="item.contentId"
              :label="item.contentName"
              :value="item.contentId"
            >
              <span style="float: left">{{ item.contentName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.contentId
              }}</span>
            </el-option>
          </el-select>
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
          <el-input v-model="seachData" placeholder="搜索网站名/简介">
            <el-button @click="seach" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="currentPage" stripe style="width: 100%">
        <el-table-column
          prop="websiteId"
          label="网站id"
          align="center"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="contentId"
          label="网站内容id"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="websiteName"
          label="网站名称"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="websiteUrl"
          label="网站路径"
          align="center"
          :show-overflow-tooltip="true"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="网站介绍"
          align="center"
          width="100"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column label="是否已上线" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.isOnLine == 2 ? "已上线" : "未上线" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="websiteImage"
          label="网站展示图片路径"
          align="center"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="openUpdate(scope.$index, scope.row)"
              icon="el-icon-edit"
              type="primary"
              circle
            ></el-button>
            <el-button
              @click="del(scope.$index, scope.row.websiteId)"
              type="danger"
              circle
              icon="el-icon-delete"
            ></el-button>
            <el-button circle @click="offline(scope.$index, scope.row)">
              {{ scope.row.isOnLine == 2 ? "下线" : "上线" }}
            </el-button>
          </template></el-table-column
        ></el-table
      >
    </div>
    <div class="dibu">
      <div class="pagination">
        <el-pagination background @current-change="turnPage" :page-size="7" layout="prev, pager, next" :total="tableData.length">
        </el-pagination>
      </div>
      <div class="gn">
        <el-button
          type="primary"
          round
          icon="el-icon-circle-plus-outline"
          @click="dialogFormVisible = true"
          >添加</el-button
        >
      </div>
    </div>

    <!-- 添加网站信息弹出框 -->
    <el-dialog
      title="添加网站"
      center
      :visible.sync="dialogFormVisible"
      v-loading="addwebsiteloading"
      element-loading-text="网站添加中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="addWebsiteData">
        <el-form-item label="网站名称：" label-width="120px">
          <el-input v-model="addWebsiteData.websiteName"></el-input>
        </el-form-item>
        <el-form-item label="网站总名称：" label-width="120px">
          <el-select v-model="addWebsiteData.contentId" placeholder="请选择">
            <el-option
              v-for="item in websiteidTitleData"
              :key="item.contentId"
              :label="item.contentName"
              :value="item.contentId"
            >
              <span style="float: left">{{ item.contentName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.contentId
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站链接：" label-width="120px">
          <el-input v-model="addWebsiteData.websiteUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站简介：" label-width="120px">
          <el-input v-model="addWebsiteData.introduce"></el-input>
        </el-form-item>
        <el-form-item label="网站图片链接：" label-width="120px">
          <el-input v-model="addWebsiteData.websiteImage"></el-input>
        </el-form-item>
      </el-form>
      <div class="fasong">
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="addwebsite"
          >添加</el-button
        >
        <p></p>
        <el-button
          type="danger"
          icon="el-icon-s-promotion"
          @click="dialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改网站信息弹出框 -->
    <el-dialog
      title="修改网站类型"
      center
      :visible.sync="updateWebsiteDialogFormVisible"
      v-loading="updateWebsiteLoading"
      element-loading-text="网站修改中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="oneUpdateWebsiteData">
        <el-form-item label="网站id：" label-width="120px">
          <span>{{ oneUpdateWebsiteData.websiteId }}</span>
        </el-form-item>
        <el-form-item label="网站总名称id:" label-width="120px">
          <el-select
            v-model="oneUpdateWebsiteData.contentId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in websiteidTitleData"
              :key="item.contentId"
              :label="item.contentName"
              :value="item.contentId"
            >
              <span style="float: left">{{ item.contentName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.contentId
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站名称：" label-width="120px">
          <el-input v-model="oneUpdateWebsiteData.websiteName"></el-input>
        </el-form-item>
        <el-form-item label="网站链接：" label-width="120px">
          <el-input v-model="oneUpdateWebsiteData.websiteUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站介绍：" label-width="120px">
          <el-input v-model="oneUpdateWebsiteData.introduce"></el-input>
        </el-form-item>
        <el-form-item label="网站图片链接：" label-width="120px">
          <el-input v-model="oneUpdateWebsiteData.websiteImage"></el-input>
        </el-form-item>
        <el-form-item label="是否上线：" label-width="120px">
          <span>{{
            oneUpdateWebsiteData.isOnLine == 2 ? "已上线" : "未上线"
          }}</span>
        </el-form-item>
        <el-form-item label="更新时间：" label-width="120px">
          <span v-text="oneUpdateWebsiteData.addTime"></span>
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
          @click="updateWebsiteDialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findWebsiteAll,
  findWebsiteTitleAll,
  addWebsite,
  updateWebsite,
  offlineWebsite,
  delOneWebsite,
  findWebsiteByOnLine,
  findWebsiteSeach,
  findWebsiteByDate,
  findWebsiteByTitleId
} from "../api/getData";
import { getTime } from "../config/public";
export default {
  data() {
    return {
      /**
       * 更新网站加载中
       */
      updateWebsiteLoading: false,
      /**
       * 更新对话框是否打开
       */
      updateWebsiteDialogFormVisible: false,
      oneUpdateWebsiteData: {},
      tableData: [],
      loading: false,
      loadingTilte: "",
      websiteidTitleData: [],
      seachData:"",
      /**
       * 当前页面显示的数据
       */
      currentPage:[],
      dialogFormVisible: false, //添加网站弹出框
      addWebsiteData: {
        contentId: null,
        websiteName: "",
        websiteUrl: "",
        introduce: "",
        addTime: "",
        websiteImage: "",
      },
      addwebsiteloading: false,
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
      /**
       * 筛选总名称id
       */
      screeningTitleId: null,
    };
  },
  created() {
    this.findAll();
  },
  methods: {
    findAll() {
      findWebsiteAll().then((res) => {
        this.tableData = res.data.data;
        this.currentPage=res.data.data.slice(0,7)
      });
      findWebsiteTitleAll().then((res) => {
        this.websiteidTitleData = res.data.data;
      });
    },
    /**
     * 打开更新弹出框
     */
    openUpdate(index, infor) {
      this.oneUpdateWebsiteData = infor;
      this.updateWebsiteDialogFormVisible = true;
    },
    /**
     * 更新网站类型
     */
    update() {
      if (
        this.oneUpdateWebsiteData.contentId == null ||
        this.oneUpdateWebsiteData.websiteName == "" ||
        this.oneUpdateWebsiteData.websiteUrl == "" ||
        this.oneUpdateWebsiteData.websiteImage == "" ||
        this.oneUpdateWebsiteData.introduce == ""
      ) {
        this.$message.error("内容不能为空");
        return;
      }
      this.updateWebsiteLoading = true;
      this.oneUpdateWebsiteData.addTime = getTime();
      updateWebsite(this.oneUpdateWebsiteData).then((res) => {
        if (res.data.code == "300") {
          this.findAll();
          this.updateWebsiteDialogFormVisible = false;
          this.updateWebsiteLoading = false;
          this.$message({
            message: "网站修改成功",
            type: "success",
          });
          return;
        }
        this.$message.error("网站修改失败");
        this.updateWebsiteLoading = false;
      });
    },
    /**
     * 上线/下线网站类型
     */
    offline(index, infor) {
      this.loadingTitle = "更新上线状态中...";
      this.loading = true;
      offlineWebsite({
        websiteId: infor.websiteId,
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
      findWebsiteByDate({date:this.date}).then(res=>{
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
     * 类型筛选
     */
    typescreening(){
      if (this.screeningTitleId==0) {
        this.findAll()
        return
      }
      findWebsiteByTitleId({contentId:this.screeningTitleId}).then(res=>{
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
     * 搜索
     */
    seach(){
      if (this.seachData == ""){
         this.findAll() 
         return;
      }
      findWebsiteSeach({info:this.seachData}).then(res=>{
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
      if (this.onLineStateData==0) {
        this.findAll()
        return
      }
      findWebsiteByOnLine({isOnLine:this.onLineStateData}).then(res=>{
        if (res.data.code=="200") {
          this.tableData=res.data.data
          this.currentPage=res.data.data.slice(0,7)
          return
        }
        console.log(res);
        this.$message.error('查询失败');
      })
    },
    /**
     * 删除一条网站类型
     */
    del(index, websiteId) {
      this.$confirm("此操作将永久删除该网站信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadingTitle = "网站正在删除...";
          this.loading = true;
          delOneWebsite({ websiteId: websiteId }).then((res) => {
            if (res.data.code == "600") {
              this.findAll();
              this.loading = false;
              this.$message({
                message: "网站删除成功",
                type: "success",
              });
              return;
            }

            console.log(res);
            this.loading = false;
            this.$message.error("网站删除失败");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 添加网站
     */
    addwebsite() {
      if (
        this.addWebsiteData.contentId == null ||
        this.addWebsiteData.websiteName == "" ||
        this.addWebsiteData.websiteUrl == "" ||
        this.addWebsiteData.introduce == "" ||
        this.addWebsiteData.websiteImage == ""
      ) {
        this.$message.error("请先填写内容");
        return;
      }
      this.addwebsiteloading = true;
      this.addWebsiteData.addTime = getTime();
      addWebsite(this.addWebsiteData).then((res) => {
        if (res.data.code == "100") {
          this.findAll();
          this.addWebsiteData.contentId = null;
          this.addWebsiteData.websiteName = "";
          this.addWebsiteData.websiteUrl = "";
          this.addWebsiteData.introduce = "";
          this.addWebsiteData.websiteImage = "";
          this.addwebsiteloading = false;
          this.$message({
            message: "网站添加成功",
            type: "success",
          });
          return;
        }
        console.log(res);
        this.$message.error("数据添加失败");
        this.addwebsiteloading = false;
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
.gn {
  position: absolute;
  right: 30px;
  top: 20px;
}
.pagination {
  position: absolute;
  left: 100px;
  top: 20px;
}
.dibu {
  width: 100%;
  height: 60px;
  position: relative;
}
.shaixuan {
  width: 100%;
  height: 40px;
  position: relative;
}
.websiteTypeSeach {
  width: 300px;
  position: absolute;
  right: 200px;
}
.shaixuan h3 {
  position: absolute;
  left: 30px;
  bottom: -10px;
}
.websiteTypeOnLine {
  position: absolute;
  left: 570px;
  width: 130px;
}
.websiteTitleByType {
  position: absolute;
  width: 150px;
  left: 380px;
}
.websiteTypeDate {
  position: absolute;
  left: 100px;
}
.biaoge {
  height: 540px;
}
</style>