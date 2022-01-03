import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main'
import Home from '../components/Home'
import Permission from '../components/Permissions'
import Role from '../components/Role'
import SystemNotice from '../components/SystemNotice'
import UserAccount from '../components/UserAccount'
import UserFeedback from '../components/UserFeedback'
import UserInformation from '../components/UserInformation'
import UserUploadUrl from '../components/UserUploadUrl'
import Website from '../components/Website'
import WebsiteTitle from '../components/WebsiteTitle'
import WebsiteType from '../components/WebsiteType'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
}, {
    path: "/main",
    name: "Main",
    component: Main,
    children: [{
            path: "/main/home",
            name: Home,
            component: Home
        },
        {
            path: "/main/permission",
            name: Permission,
            component: Permission
        },
        {
            path: "/main/role",
            name: Role,
            component: Role
        },
        {
            path: "/main/systemNotice",
            name: SystemNotice,
            component: SystemNotice
        },
        {
            path: "/main/userAccount",
            name: UserAccount,
            component: UserAccount
        },
        {
            path: "/main/userFeedback",
            name: UserFeedback,
            component: UserFeedback
        },
        {
            path: "/main/userInformation",
            name: UserInformation,
            component: UserInformation
        },
        {
            path: "/main/userUploadUrl",
            name: UserUploadUrl,
            component: UserUploadUrl
        },
        {
            path: "/main/website",
            name: Website,
            component: Website
        },
        {
            path: "/main/websiteTitle",
            name: WebsiteTitle,
            component: WebsiteTitle
        },
        {
            path: "/main/websiteType",
            name: WebsiteType,
            component: WebsiteType
        }
    ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router