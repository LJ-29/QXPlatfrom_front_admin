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
        <div class="websiteTitleByType">
          <!-- 类型筛选 -->
          <el-select @change="typescreening" v-model="screeningTypeId" placeholder="类型">
            <el-option label="全部类型" value="0">全部类型</el-option>
            <el-option
              v-for="item in typeData"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            >
              <span style="float: left">{{ item.typeName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.typeId
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
          <el-input v-model="seachData" placeholder="搜索类型名">
            <el-button @click="seach" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="currentPage" stripe style="width: 100%">
        <el-table-column
          prop="contentId"
          label="网站内容id"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="typeId"
          label="类型id"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="contentName"
          label="内容名称"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column label="是否已上线" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.isOnLine == 2 ? "已上线" : "未上线" }}
          </template>
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
              @click="del(scope.$index, scope.row.contentId)"
              type="danger"
              round
              >删除</el-button
            >
            <el-button round @click="offline(scope.$index, scope.row)">
              {{ scope.row.isOnLine == 2 ? "下线" : "上线" }}
            </el-button>
          </template></el-table-column
        ></el-table
      >
    </div>
    <div class="websitetitle">
      <el-divider></el-divider>
      <div class="addwebsitetitle">
        <p>添加网站总名称</p>
        网站类型:
        <el-select v-model="addwebsitetitledata.typeId" placeholder="请选择">
          <el-option
            v-for="item in typeData"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          >
            <span style="float: left">{{ item.typeName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.typeId
            }}</span>
          </el-option>
        </el-select>
        <p></p>
        总名称: <el-input v-model="addwebsitetitledata.contentName"></el-input>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="addwebsitetitle"
          >添加</el-button
        >
      </div>
    </div>
    <div class="dibu">
      <div class="pagination">
        <el-pagination background @current-change="turnPage" :page-size="7" layout="prev, pager, next" :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <!-- 添加网站信息弹出框 -->
    <el-dialog
      title="修改网站类型"
      center
      :visible.sync="updateTitleDialogFormVisible"
      v-loading="updateTitleLoading"
      element-loading-text="网站添加中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="oneUpdateTitleData">
        <el-form-item label="总名称id：" label-width="120px">
          <span>{{ oneUpdateTitleData.contentId }}</span>
        </el-form-item>
        <el-form-item label="类型id:" label-width="120px">
          <el-select v-model="oneUpdateTitleData.typeId" placeholder="请选择">
            <el-option
              v-for="item in typeData"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            >
              <span style="float: left">{{ item.typeName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.typeId
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站总名称：" label-width="120px">
          <el-input v-model="oneUpdateTitleData.contentName"></el-input>
        </el-form-item>
        <el-form-item label="是否上线：" label-width="120px">
          <span>{{
            oneUpdateTitleData.isOnLine == 2 ? "已上线" : "未上线"
          }}</span>
        </el-form-item>
        <el-form-item label="更新时间：" label-width="120px">
          <span v-text="oneUpdateTitleData.addTime"></span>
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
          @click="updateTitleDialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findWebsiteTitleAll,
  findWebsiteTypeAll,
  addWebsiteTitle,
  updateTitle,
  offlineTitle,
  delOneTitle,
  findTitleByOnLine,
  findSeach,
  findTitleByTypeId,
  findTitleByDate,
} from "../api/getData";
import { getTime } from "../config/public";
export default {
  data() {
    return {
      /**
       * 更新网站总名称加载中
       */
      updateTitleLoading: false,
      /**
       * 更新对话框是否打开
       */
      updateTitleDialogFormVisible: false,
      oneUpdateTitleData: {},
      tableData: [],
      typeData: [],
      seachData:"",
      loading: false,
      loadingTitle: "",
      addwebsitetitledata: {
        typeId: null,
        contentName: "",
        addTime: "",
      },
      /**
       * 当前页面显示的数据
       */
      currentPage:[],
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
       * 筛选类型id值
       */
      screeningTypeId:null,
      /**
       * 上线状态选中的值
       */
      onLineStateData: "",
    };
  },
  created() {
    this.findAll();
  },
  methods: {
    findAll() {
      findWebsiteTitleAll().then((res) => {
        this.tableData = res.data.data;
        this.currentPage=res.data.data.slice(0,7)
      });
      findWebsiteTypeAll().then((res) => {
        this.typeData = res.data.data;
      });
    },
    /**
     * 打开更新弹出框
     */
    opneUpdate(index, infor) {
      this.oneUpdateTitleData = infor;
      this.updateTitleDialogFormVisible = true;
    },
    /**
     * 更新网站类型
     */
    update() {
      if (
        this.oneUpdateTitleData.typeId == null ||
        this.oneUpdateTitleData.contentName == ""
      ) {
        this.$message.error("内容不能为空");
        return;
      }
      this.updateTitleLoading = true;
      this.oneUpdateTitleData.addTime = getTime();
      updateTitle(this.oneUpdateTitleData).then((res) => {
        if (res.data.code == "300") {
          this.findAll();
          this.updateTitleDialogFormVisible = false;
          this.updateTitleLoading = false;
          this.$message({
            message: "网站总名称修改成功",
            type: "success",
          });
          return;
        }
        this.$message.error("网站总名称修改失败");
        this.updateTitleLoading = false;
      });
    },
    /**
     * 上线/下线网站类型
     */
    offline(index, infor) {
      this.loadingTitle = "更新上线状态中...";
      this.loading = true;
      offlineTitle({
        contentId: infor.contentId,
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
      findTitleByDate({date:this.date}).then(res=>{
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
      if (this.screeningTypeId==0) {
        this.findAll()
        return
      }
      findTitleByTypeId({typeId:this.screeningTypeId}).then(res=>{
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
     * 翻页
     */
    turnPage(page){
      this.currentPage= this.tableData.slice((page-1)*7,page*7)
    },
    /**
     * 搜索
     */
    seach(){
      if (this.seachData == ""){
         this.findAll() 
         return;
      }
      findSeach({content:this.seachData}).then(res=>{
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
      findTitleByOnLine({isOnLine:this.onLineStateData}).then(res=>{
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
    del(index, contentid) {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadingTitle = "网站总名称正在删除...";
          this.loading = true;
          delOneTitle({ contentId: contentid }).then((res) => {
            if ((res.data.code == "777")) {
              this.$message.error(res.data.msg);
              this.loading = false;
              return;
            }
            if (res.data.code == "600") {
              this.findAll();
              this.loading = false;
              this.$message({
                message: "网站总名称删除成功",
                type: "success",
              });
              return;
            }

            console.log(res);
            this.loading = false;
            this.$message.error("网站总名称删除失败");
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
     * 添加websitetitle
     */
    async addwebsitetitle() {
      if (
        this.addwebsitetitledata.typeId == null ||
        this.addwebsitetitledata.contentName == ""
      ) {
        this.$message.error("请先填写内容");
        return;
      }
      this.loadingTitle = "网站总名称添加中...";
      this.loading = true;
      this.addwebsitetitledata.addTime = await getTime();
      addWebsiteTitle(this.addwebsitetitledata).then((res) => {
        if (res.data.code == "100") {
          this.findAll();
          this.addwebsitetitledata.contentName = "";
          this.loading = false;
          this.$message({
            message: "网站总名称添加成功",
            type: "success",
          });
          return;
        }
        console.log(res);
        this.$message.error("数据添加失败");
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.dibu{
  margin-top: 10px;
  width: 100%;
  height: 50px;
  position: relative;
}
.biaoge {
  width: 980px;
  height: 540px;
  display: inline-block;
}
.websitetitle {
  width: 250px;
  height: 550px;
  background-color: #545c64;
  float: right;
  padding: 5px;
  color: #ffffff;
}
.addwebsitetitle {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
}
.addwebsitetitle p {
  font-weight: bold;
  text-align: center;
}
.addwebsitetitle button {
  width: 100%;
  margin-top: 20px;
}
.fasong button {
  width: 100%;
}
.shaixuan {
  width: 100%;
  height: 40px;
  position: relative;
}
.websiteTypeSeach {
  width: 300px;
  position: absolute;
  right: 20px;
}
.pagination{
  position: absolute;
  left: 100px;
  top: 10px;
}
.shaixuan h3 {
  position: absolute;
  left: 30px;
  bottom: -10px;
}
.websiteTypeOnLine {
  position: absolute;
  left: 510px;
  width: 120px;
}
.websiteTitleByType{
  position: absolute;
  width: 120px;
  left: 360px;
}
.websiteTypeDate {
  position: absolute;
  left: 100px;
}
</style>