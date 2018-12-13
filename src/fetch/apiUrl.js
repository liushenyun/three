const apiUrl = {
  'accountInitPwd': 'account/init_pwd', // account - 初始化账号密码
  'serviceAccountBackInitPwd': 'service_account_back/init_pwd', // service_account_back - 服务账号初始化账号密码
  'accountDel': 'account/del', // account - 删除账号
  'menuGetList': 'menu/get_list', // menu - 获取菜单列表
  'accountChangePwd': 'account/change_pwd', // account - 修改密码
  'accountGetAccountInfo': 'account/get_account_info', // account - 获取账号信息
  'UploadifyUploadFile': 'Uploadify/upload_file', // Uploadify - 上传文件
  'UploadifyUploadImage': 'Uploadify/upload_image', // Uploadify - 上传图片
  'UploadifyUploadImageByWangEditor': 'Uploadify/upload_image_by_wangEditor', // Uploadify - 上传图片(wangEditor富文本)
  // 登录部分
  'accountLogin': 'account/login', // account - 登录 ok
  'accountLogout': 'account/logout', // account - 登出 ok
  /* ==== 账号管理部分 ==== */
  // 服务人员审
  'serviceAccountFrontGetApplyList': 'service_account_front/get_apply_list', // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  'serviceAccountFrontGetApplyDetail': 'service_account_front/get_apply_detail', // service_account_front - 获取服务账号申请详情(服务人员审核)
  'serviceAccountFrontAddApplyHandle': 'service_account_front/add_apply_handle', // service_account_front - 新增申请处理记录(服务人员审核)
  'serviceAccountFrontGetApplyHandleList': 'service_account_front/get_apply_handle_list', // service_account_front - 获取服务账号申请审核列表(服务人员审核)
  // 前端账号管理
  'serviceAccountBackAdd': 'service_account_back/add', // service_account_back - 新增服务账号
  'serviceAccountBackEdit': 'service_account_back/edit', // service_account_back - 编辑服务账号
  'serviceAccountBackGetDetail': 'service_account_back/get_detail', // service_account_back - 获取服务账号[后台创建]详情
  'serviceAccountBackGetList': 'service_account_back/get_list', // service_account_back - 获取服务账号[后台创建]列表
  // 运营账号管理
  'accountOperateGetList': 'account_operate/get_list', // account_operate - 获取运营账号列表
  'accountOperateGetDetail': 'account_operate/get_detail', // account_operate - 获取运营账号详情
  'accountOperateAdd': 'account_operate/add', // account_operate - 新增运营账号
  'accountOperateEdit': 'account_operate/edit', // account_operate - 编辑运营账号
  // 代理商账号管理
  'accountAgentGetList': 'account_agent/get_list', // account_agent - 获取代理商账号列表
  'accountAgentGetDetail': 'account_agent/get_detail', // account_agent - 获取代理商账号详情
  'accountAgentAdd': 'account_agent/add', // account_agent - 新增代理商账号
  'accountAgentEdit': 'account_agent/edit', // account_agent - 编辑代理商账号
  /* ==== 设备管理部分 ==== */
  // 设备管理
  'DeviceDeviceList': 'Device/device_list', // Device - 设备列表
  'DeviceDeviceWarningLog': 'Device/device_warning_log', // Device - 设备报警日志
  'DeviceDeviceOperateLog': 'Device/device_operate_log', // Device - 操作设备日志
  'exportDevice': 'Device/export_device', // Device - 设备导出
  'DeviceDeviceDetail': 'Device/device_detail', // Device - 设备详情
  'DeviceOverview': 'Device/overview', // Device - 设备首页4个统计
  // 产品概述
  'DeviceActiveGraph': 'Device/active_graph', // Device_graph - 1.激活设备统计曲线图
  'DeviceOnlineGraph': 'Device/online_graph', // Device_graph - 2.在线设备统计曲线图
  'DeviceWaterGraph': 'Device/water_graph', // Device_graph - 3.设备制水量统计曲线图
  'DeviceLivelyGraph': 'Device/lively_graph', // Device_graph - 4.活跃设备统计曲线图
  // 非智能设备管理
  'DeviceGetNonSmartDeviceList': 'Device/get_non_smart_device_list', // Device - 获取非智能设备列表
  'DeviceAddNonSmartDevice': 'Device/add_non_smart_device', // Device - 添加非智能设备
  'DeviceUpdateNonSmartDevice': 'Device/update_non_smart_device', // Device - 修改非智能设备
  'DeviceDeleteNonSmartSevice': 'Device/delete_non_smart_device', // Device - 删除非智能设备
  'exportNonSmartDevice': 'Device/export_non_smart_device', // Device - 导出非智能设备
  // 设备地图部分
  'DeviceDeviceMapOverview': 'Device/device_map_overview', // Device - 设备地图
  /* ==== 服务管理部分 ==== */
  // 待处理订单
  'FaultRepairGetServiceList': 'Fault_repair/get_service_list', // Fault_repair - 获取待处理订单列表
  'FaultRepairServiceCheck': 'Fault_repair/service_check', // Fault_repair - 订单审核
  'FaultRepairServiceSendOut': 'Fault_repair/service_send_out', // Fault_repair - 后台派单
  'FaultRepairGetCheckList': 'Fault_repair/get_check_list', // Fault_repair - 审核记录
  'FaultRepairGetDispatchList': 'Fault_repair/get_dispatch_list', // Fault_repair - 派单记录
  'FaultRepairGetDetails': 'Fault_repair/get_details', // Fault_repair - 获取服务详情
  'FaultRepairGetServers': 'Fault_repair/get_servers', // Fault_repair - 获取服务人员列表
  // 处理中订单
  'FaultRepairGetServiceToBeCompleted': 'Fault_repair/get_service_to_be_completed', // Fault_repair - 获取处理中订单列表
  'FaultRepairGetServiceTree': 'Fault_repair/get_service_tree', // Fault_repair - 服务流程图
  // 已经处理订单
  'FaultRepairGetCompletedList': 'Fault_repair/get_completed_list', // Fault_repair - 获取已完成订单列表
  'FaultRepairGetEvaluation': 'Fault_repair/get_evaluation', // Fault_repair - 获取评价
  /* ==== 告警与推送部分 ==== */
  // 用户反馈管理
  'FeedbackGetFeedbackList': 'Feedback/get_feedback_list', // Feedback - 获取反馈列表
  'FeedbackGetFeedbackLogList': 'Feedback/get_feedback_log_list', // Feedback - 获取反馈处理记录列表
  'FeedbackGetFeedbackDetail': 'Feedback/get_feedback_detail', // Feedback - 获取反馈详情
  'FeedbackDealFeedback': 'Feedback/deal_feedback', // Feedback - 处理反馈
  // 推送模板设置
  'msgTemplateGetList': 'msg_template/get_list', // Msg_template - 获取模版列表
  'msgTemplateGetAll': 'msg_template/get_all', // Msg_template - 获取模版列表
  'msgTemplateGetDetail': 'msg_template/get_detail', // Msg_template - 获取模版详情
  'msgTemplateAdd': 'msg_template/add', // Msg_template - 添加模版
  'msgTemplateEdit': 'msg_template/edit', // Msg_template - 编辑模版
  'msgTemplateDel': 'msg_template/del', // Msg_template - 删除模版
  // 咨询推送记录
  'informationDel': 'information/del', // information - 删除资讯
  'informationAdd': 'information/add', // information - 新增资讯
  'informationEdit': 'information/edit', // information - 编辑资讯
  'informationGetList': 'information/get_list', // information - 获取资讯列表
  'informationGetDetail': 'information/get_detail', // information - 获取资讯详情
  // 广告图片设置
  'advertisementDel': 'advertisement/del', // advertisement - 删除广告图片
  'advertisementAdd': 'advertisement/add', // advertisement - 新增广告图片
  'advertisementGetList': 'advertisement/get_list', // advertisement - 获取广告图片列表
  // 信息公告推送
  'UserMsgSendMsgs': 'User_msg/send_msgs', // User_msg - 批量发送消息
  'UserMsgGetMsgList': 'User_msg/get_msg_list', // User_msg - 获取信息推送列表
  'UserMsgGetUserList': 'User_msg/get_user_list', // User_msg - 获取用户列表
  // 设备报警记录
  'DeviceWarningGetWarningList': 'Device_warning/get_warning_list', // Device_warning - 设备报警记录
  // 更换滤芯提醒
  'FilterWarningSendMsgs': 'Filter_warning/send_msgs', // Filter_warning - 批量发送消息
  'FilterWarningGetUserDevice': 'Filter_warning/get_user_device', // Filter_warning - 获取用户设备列表
  /* ==== 用户管理部分 ==== */
  // 用户画像
  'UserUserStatistics': 'User/user_statistics', // User - 1.用户统计
  'UserAgeMap': 'User/age_map', // User - 2.用户年龄分布
  'UserSexMap': 'User/sex_map', // User - 3.用户性别分布
  'UserUserMap': 'User/user_map', // User - 6.用户地图分布(省份)
  // 用户列表
  'UserUsers': 'User/users', // User - 4.用户列表
  'UserUserDevices': 'User/user_devices', // User - 5.用户设备
  'UserRxportUsers': 'User/export_users', // User - 用户列表导出
  /* ==== 财务管理部分 ==== */
  'financeIndex': 'finance/index', // finance - 财务管理
  'financeExportData': 'finance/export_data', // finance - 财务管理
  /* ==== 系统设置部分 ==== */
  // 参数设置
  'SystemSaveBoards': 'System/save_boards', // System - 保存勾选要展示的面板
  'SystemAccountBoards': 'System/account_boards', // System - 2.获取需要在首页展示的面板
  'SystemBoards': 'System/boards', // System - 3.获取所有面板
  /* ==== 租赁管理部分 => 租赁规则列表 ==== */
  'leaseLeaseList': 'lease/lease_list', // lease - 1.获取租赁规则表
  'leaseAddLease': 'lease/add_lease', // lease - 2.添加租赁规则
  'leaseOneLease': 'lease/one_lease', // lease - 3.获取一个租赁规则
  'leaseAddPackage': 'lease/add_package', // lease - 4.添加套餐
  'leaseDelLease': 'lease/del_lease', // lease - 删除租赁规则
  /* ==== 租赁管理部分 => 设备规则管理 ==== */
  'deviceLeaseSetList': 'device_lease/get_list', // device_lease - 获取设备规则列表
  /* ==== 滤芯管理部分 ==== */
  // 滤芯防伪管理
  'FilterGetFilterList': 'Filter/get_filter_list', // Filter - 获取滤芯列表
  'FilterImportFilter': 'Filter/import_filter', // Filter - 上传滤芯
  /* ==== 升级管理部分 ==== */
  'FirmwareLists': 'firmware/lists', // firmware - 获取固件版本管理列表
  'FirmwareDetail': 'firmware/detail', // firmware - 获取固件版本详情
  'UpgradeLogLists': 'upgrade_log/lists', // upgrade_log - 获取设备升级记录
  'OssUploadGetPostObjectParams': 'Oss_upload/get_post_object_params', // Oss_upload - 获取OSS表单上传参数
  /* ==== 系统日志部分 ==== */
  'AccountAssignGetAssignLog': 'Account_assign/get_assign_log', // Account_assign - 获取分配记录
  'LoginLogGetLoginLog': 'Login_log/get_login_log' // Login_log - 人员登录信息
}

export default apiUrl;
