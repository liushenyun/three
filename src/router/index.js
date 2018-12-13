import Vue from 'vue';
import Router from 'vue-router';
// import Sign from '../components/Sign.vue'  这种会把所有的东西都在vender里面
// const Login = () => import('../pages/Login.vue') 这样会按需加载
/* eslint func-call-spacing: ["error", "always", { "allowNewlines": true }] */
const Login = () =>
  import ('../pages/Login.vue');
const Sign = () =>
  import ('../pages/Sign.vue');
const Home = () =>
  import ('../pages/Home.vue');
const Homepage = () =>
  import ('../pages/home/index.vue');
const DeviceSummary = () =>
  import ('../pages/device/summary.vue');
const DeviceManage = () =>
  import ('../pages/device/manage.vue');
const StupidManage = () =>
  import ('../pages/device/StupidManage.vue');
const DeviceMap = () =>
  import ('../pages/device/map.vue');
const UserPersonas = () =>
  import ('../pages/user/personas.vue');
const UserList = () =>
  import ('../pages/user/list.vue');
const FilterManage = () =>
  import ('../pages/filter/manage.vue');
const PushFeedback = () =>
  import ('../pages/push/feedback.vue');

// PushConsultRecord  咨询推送记录
const PushConsultRecord = () =>
  import ('../pages/push/ConsultRecord.vue');

// PushAdPicture  广告图片设置
const PushAdPicture = () =>
  import ('../pages/push/AdPicture.vue');

const PushPush = () =>
  import ('../pages/push/push.vue');

// 告警与推送=> 设备报警记录
const PushAlarmRecord = () =>
  import ('../pages/push/AlarmRecord.vue');

// 信息推送记录
const PushInfoRecord = () =>
  import ('../pages/push/InfoRecord.vue');

const PushRemind = () =>
  import ('../pages/push/remind.vue');
const PushTemplate = () =>
  import ('../pages/push/template.vue');
const ServeHandling = () =>
  import ('../pages/serve/handling.vue');
const ServeSolved = () =>
  import ('../pages/serve/solved.vue');
const ServeWaiting = () =>
  import ('../pages/serve/waiting.vue');
// 租赁管理
const RentRuleList = () =>
  import ('../pages/rent/RentRuleList.vue');
const RentRuleManage = () =>
  import ('../pages/rent/RentRuleManage.vue');
// 财务管理
const FinanceManage = () =>
  import ('../pages/finance/Manage.vue');

const InventoryManage = () =>
  import ('../pages/inventory/manage.vue');
const UpgradeCreate = () =>
  import ('../pages/upgrade/create.vue');
const UpgradeRecord = () =>
  import ('../pages/upgrade/record.vue');
const UpgradeVersion = () =>
  import ('../pages/upgrade/version.vue');
const AdminAgent = () =>
  import ('../pages/admin/agent.vue');
const AdminBackend = () =>
  import ('../pages/admin/backend.vue');
const AdminFrontend = () =>
  import ('../pages/admin/frontend.vue');
const AdminReview = () =>
  import ('../pages/admin/review.vue');

// 系统设置
const SystemModelSet = () =>
  import ('../pages/system/SystemModelSet.vue');
const SystemBatch = () =>
  import ('../pages/system/SystemBatch.vue');
const SystemSetting = () =>
  import ('../pages/system/SystemSetting.vue');
const LogAssign = () =>
  import ('../pages/log/assign.vue');
const LogUserinfo = () =>
  import ('../pages/log/userinfo.vue');
const PushSure = () =>
  import ('../pages/push/pushsure.vue');
const FeedbackDetail = () =>
  import ('../pages/push/feedback/feedbackDetail.vue');
const FeedbackDeal = () =>
  import ('../pages/push/feedback/feedbackDeal.vue');
import NotFoundComponent from "../pages/NotFoundComponent .vue";
/* eslint func-call-spacing: "off" */
Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [{ path: '*', component: NotFoundComponent },
    { path: '/', redirect: '/sign' },
    {
      path: '/sign',
      component: Sign,
      children: [{
        path: '',
        name: 'login',
        component: Login
      }]
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', name: 'home', component: Homepage },
        { path: 'device/summary', name: 'deviceSummary', component: DeviceSummary },
        { path: 'device/summary/info', name: 'deviceSummaryInfo', component: DeviceSummary },
        { path: 'device/manage', name: 'deviceManage', component: DeviceManage },
        { path: 'device/stumanage', name: 'StupidManage', component: StupidManage },
        { path: 'device/map', name: 'deviceMap', component: DeviceMap },
        { path: 'user/personas', name: 'userPersonas', component: UserPersonas },
        { path: 'user/list', name: 'userList', component: UserList },
        { path: 'filter/manage', name: 'filterManage', component: FilterManage },
        { path: 'push/feedback', name: 'pushFeedback', component: PushFeedback },
        { path: 'push/feedback/:detail', name: 'pushFeedbackDetail', component: FeedbackDetail },
        { path: 'push/feedback/:deal', name: 'pushFeedbackDeal', component: FeedbackDeal },
        { path: 'push/consultRecord', name: 'PushConsultRecord', component: PushConsultRecord },
        { path: 'push/adPicture', name: 'PushAdPicture', component: PushAdPicture },
        { path: 'push/push', name: 'pushPush', component: PushPush },
        { path: 'push/push/:sure', name: 'pushPushSure', component: PushSure },
        { path: 'push/alarmRecord', name: 'PushAlarmRecord', component: PushAlarmRecord },
        { path: 'push/infoRecord', name: 'PushInfoRecord', component: PushInfoRecord },
        { path: 'push/remind', name: 'pushRemind', component: PushRemind },
        { path: 'push/template', name: 'pushTemplate', component: PushTemplate },
        // 服务管理
        { path: 'serve/waiting', name: 'serveWaiting', component: ServeWaiting },
        { path: 'serve/handling', name: 'serveHandling', component: ServeHandling },
        { path: 'serve/solved', name: 'serveSolved', component: ServeSolved },
        // 租赁管理
        { path: 'rent/rulelist', name: 'RentRuleList', component: RentRuleList },
        { path: 'rent/manage', name: 'RentRuleManage', component: RentRuleManage },
        // 财务管理
        { path: 'finance/manage', name: 'FinanceManage', component: FinanceManage },
        { path: 'inventory/manage', name: 'inventoryManage', component: InventoryManage },
        { path: 'upgrade/create', name: 'upgradeCreate', component: UpgradeCreate },
        { path: 'upgrade/Record', name: 'upgradeRecord', component: UpgradeRecord },
        { path: 'upgrade/version', name: 'upgradeVersion', component: UpgradeVersion },
        { path: 'admin/agent', name: 'adminAgent', component: AdminAgent },
        { path: 'admin/backend', name: 'adminBackend', component: AdminBackend },
        { path: 'admin/frontend', name: 'adminFrontend', component: AdminFrontend },
        { path: 'admin/review', name: 'adminReview', component: AdminReview },
        // 系统设置
        { path: 'system/modelset', name: 'SystemModelSet', component: SystemModelSet },
        { path: 'system/batch', name: 'SystemBatch', component: SystemBatch },
        { path: 'system/setting', name: 'SystemSetting', component: SystemSetting },
        // 系统日志
        { path: 'log/assign', name: 'logAssign', component: LogAssign },
        { path: 'log/userinfo', name: 'logUserinfo', component: LogUserinfo }
      ]
    }
  ]
})

/**
 * 滤芯跟换提醒  ok
 * 信息公告推送  ok
 * 信息推送记录  ok
 * 用户反馈管理  ok
 * 咨询推送记录  ok
 * 广告图片设置  ok
 * 设备报警记录  ok
 * 推送模块设置  ok
 */

/**
 * 滤芯跟换提醒
 * 信息公告推送
 * 用户反馈管理
 * 设备报警记录
 * 推送模板管理
 */
