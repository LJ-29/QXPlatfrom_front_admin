<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #545c64">
        <el-menu
          default-active="/main/home"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
        >
          <el-menu-item index="/main/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-user"></i>用户管理</template
            >
            <el-menu-item index="/main/userInformation"
              >用户信息管理</el-menu-item
            >
            <el-menu-item index="/main/userAccount">用户账号管理</el-menu-item>
            <el-menu-item index="/main/userUploadUrl"
              >用户上传链接管理</el-menu-item
            >
            <el-menu-item index="/main/userFeedback"
              >用户反馈信息管理</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-link"></i>网站管理</template
            >
            <el-menu-item index="/main/websiteType">网站类型管理</el-menu-item>
            <el-menu-item index="/main/websiteTitle"
              >网站总名称管理</el-menu-item
            >
            <el-menu-item index="/main/website">网站信息管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-cpu"></i>角色权限管理</template
            >
            <el-menu-item index="/main/role">角色管理</el-menu-item>
            <el-menu-item index="/main/permission">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-platform"></i>系统管理</template
            >
            <el-menu-item index="/main/systemNotice">系统通知管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <!-- 内容 -->
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
};
</script>

<style>
</style>