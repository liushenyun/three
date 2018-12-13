import Vue from "vue";
import fetch from './index';
import apiUrl from './apiUrl';
import Validate from './Validate';
import { aesEncrypt } from "../utils/dtAes";
import isEmpty from "../utils/isEmpty";
import { send } from './formdata';

/* ==== 用户http请求提示 =====  */
const SuccessTips = (con, callbck, type = 'success') => {
  Vue.prototype.$message({
    showClose: true,
    message: con,
    duration: 1500,
    type: type
  });
  setTimeout(() => {
    callbck && callbck()
  }, 1400);
};
/* ==== 获取apply_id ==== */
const GetApplyId = () => {
  let _applyId = localStorage.getItem('Three-Apply_Id');
  return _applyId;
};
// 初始化密码
const accountInitPwd = (ids, callback) => {
  fetch(apiUrl.accountInitPwd, { 'ids_str': ids }).then(msg => {
    SuccessTips('初始化密码成功', () => { callback && callback(msg) })
  })
};

// 服务账号初始化账号密码 - service_account_back
const serviceAccountBackInitPwd = (ids, callback) => {
  fetch(apiUrl.serviceAccountBackInitPwd, { 'ids_str': ids }).then(msg => {
    SuccessTips('初始化密码成功', () => { callback && callback(msg) })
  })
};

// account - 删除账号
const accountDel = (ids, callback) => {
  if (ids.length < 1) { Vue.prototype.$message.warning('请选择要删除的账号'); return; }
  fetch(apiUrl.accountDel, { 'ids_str': ids.join(',') }).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
};

// menu - 获取菜单列表
const menuGetList = (callback) => {
  fetch(apiUrl.menuGetList, {}).then(msg => { callback && callback(msg) })
}

// account - 修改密码
const accountChangePwd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['old_pwd', _params.old_pwd, '旧密码', 'empty'],
    ['new_pwd', _params.new_pwd, '新密码', 'empty|password'],
    ['re_pwd', _params.re_pwd, '确认新密码', 'empty|password']
  ]
  let _Validated = Validate(vArr);
  if (!_Validated) { return };
  if (_params.new_pwd !== _params.re_pwd) {
    Vue.prototype.$message.warning('新密码与确认密码不一致');
    return;
  };
  fetch(apiUrl.accountChangePwd, { 'old_pwd': aesEncrypt(_params.old_pwd), 'new_pwd': aesEncrypt(_params.new_pwd), 're_pwd': aesEncrypt(_params.re_pwd) }).then(msg => { callback && callback(msg) })
}

// account - 获取账号信息
const accountGetAccountInfo = (callback) => {
  fetch(apiUrl.accountGetAccountInfo, {}).then(msg => { callback && callback(msg) })
}

// Uploadify - 上传文件
const UploadifyUploadFile = (file, callback) => {
  // 'myfile' 是与后台协定的名字
  send(apiUrl.UploadifyUploadFile, { 'myfile': file }).then(msg => { callback && callback(msg) }).catch(err => {
    Vue.prototype.$message.warning(err.errmsg);
  })
}

// Uploadify - 上传图片
const UploadifyUploadImage = (file, callback) => {
  // 'myfile' 是与后台协定的名字
  send(apiUrl.UploadifyUploadImage, { 'myfile': file }).then(msg => { callback && callback(msg) }).catch(err => {
    Vue.prototype.$message.warning(err.errmsg);
  })
}

/* ======  登录  ======= */
// 用户登录
const accountLogin = (username, password, callback) => {
  fetch(apiUrl.accountLogin, { 'username': aesEncrypt(username), 'password': aesEncrypt(password) }).then(msg => {
    SuccessTips('登录成功', () => { callback && callback(msg) })
  })
};

// account - 登出
const accountLogout = (callback) => {
  fetch(apiUrl.accountLogout, {}).then(msg => {
    SuccessTips('退出成功', () => { callback && callback(msg) });
  })
};

/* ======  账号管理部分 => 服务人员审核  ======= */
// service_account_front - 获取服务账号申请列表(服务人员审核列表)
const serviceAccountFrontGetApplyList = (params, callback) => {
  fetch(apiUrl.serviceAccountFrontGetApplyList, params).then(msg => { callback && callback(msg) })
}

// service_account_front - 新增申请处理记录(服务人员审核)
const serviceAccountFrontAddApplyHandle = (applyId, handleState, content, callback) => {
  if (isEmpty(content)) { Vue.prototype.$message.warning('信息内容不能为空'); return; }
  fetch(apiUrl.serviceAccountFrontAddApplyHandle, { 'apply_id': applyId, 'handle_state': handleState, 'content': content }).then((msg) => {
    SuccessTips('提交成功', () => { callback && callback(msg); })
  })
}

// service_account_front - 获取服务账号申请详情(服务人员审核)
const serviceAccountFrontGetApplyDetail = (id, callback) => {
  fetch(apiUrl.serviceAccountFrontGetApplyDetail, { 'id': id }).then((msg) => { callback && callback(msg) })
}

// service_account_front - 获取服务账号申请审核列表(服务人员审核)
const serviceAccountFrontGetApplyHandleList = (page, id, callback) => {
  fetch(apiUrl.serviceAccountFrontGetApplyHandleList, { 'page': page, 'apply_id': id }).then((msg) => { callback && callback(msg) })
}

/* ======  账号管理部分 => 服务账号管理  ======= */
// service_account_back - 获取服务账号[后台创建=>]列表
const serviceAccountBackGetList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'options|empty|account'],
    ['fullname', _params.fullname, '姓名', 'options|empty']
  ]
  let _Validated = Validate(vArr);
  if (!_Validated) { return };
  fetch(apiUrl.serviceAccountBackGetList, { 'page': _params.page, 'username': _params.username, 'fullname': _params.fullname, 'role_type': _params.role_type }).then(msg => {
    callback && callback(msg)
  })
}

// service_account_back - 新增服务账号
const serviceAccountBackAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['email', _params.email, '邮箱', 'empty|email'],
    // ['area_province_code', _params.area_province_code, '服务地区', 'empty'],
    // ['area_city_code', _params.area_city_code, '服务地区', 'empty'],
    ['area_ids', _params.area_ids, '服务地区', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  _params.password = aesEncrypt(_params.password);
  fetch(apiUrl.serviceAccountBackAdd, _params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};
// service_account_back - 编辑服务账号
const serviceAccountBackEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['email', _params.email, '邮箱', 'empty|email'],
    ['area_ids', _params.area_ids, '服务地区', 'empty']
    // ['area_province_code', _params.area_province_code, '服务地区', 'empty'],
    // ['area_city_code', _params.area_city_code, '服务地区', 'empty'],
    // ['area_district_ids', _params.area_district_ids, '服务地区', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  fetch(apiUrl.serviceAccountBackEdit, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}

// 获取服务账号[后台创建]详情
const serviceAccountBackGetDetail = (id, callback) => {
  fetch(apiUrl.serviceAccountBackGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

/* ==== 账号管理部分 => 运营账号管理 ===== */
// account_operate - 获取运营账号列表
const accountOperateGetList = (params, callback) => {
  let _params = params;
  fetch(apiUrl.accountOperateGetList, { 'page': _params.page, 'username': _params.username, 'fullname': _params.fullname }).then(msg => {
    callback && callback(msg)
  })
}

// account_operate - 新增运营账号
const accountOperateAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['company_position', _params.company_position, '公司职务', 'empty'],
    ['email', _params.email, '邮箱', 'empty|email']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  _params.password = aesEncrypt(_params.password);
  fetch(apiUrl.accountOperateAdd, _params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};

// account_operate - 编辑运营账号
const accountOperateEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['company_position', _params.company_position, '公司职务', 'empty'],
    ['email', _params.email, '邮箱', 'empty|email']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  fetch(apiUrl.accountOperateEdit, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}

// 获取服务账号[后台创建]详情
const accountOperateGetDetail = (id, callback) => {
  fetch(apiUrl.accountOperateGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

/* ==== 账号管理部分 => 代理商账号管理  ==== */
// account_agent - 获取代理商账号列表
const accountAgentGetList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'options|empty'],
    ['fullname', _params.fullname, '姓名', 'options|empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.accountAgentGetList, { 'page': _params.page, 'username': _params.username, 'fullname': _params.fullname }).then(msg => { callback && callback(msg) })
};
// account_agent - 获取代理商账号详情
const accountAgentGetDetail = (id, callback) => {
  fetch(apiUrl.accountAgentGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};
// account_agent - 新增代理商账号
const accountAgentAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '姓名', 'empty'],
    ['mobile', _params.mobile, '电话号码', 'empty|phone'],
    ['company', _params.company, '公司名称', 'empty'],
    ['level_type', _params.level_type, '所属等级', 'empty'],
    ['address', _params.address, '详细地址', 'empty'],
    ['area_ids', _params.area_ids, '省市区', 'empty|area'],
    ['menu_ids', _params.menu_ids, '权限', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  let _urlData = {
    'username': aesEncrypt(_params.username),
    'password': aesEncrypt(_params.password),
    'fullname': _params.fullname,
    'state': _params.state,
    'mobile': _params.mobile,
    'company': _params.company,
    'level_type': _params.level_type,
    'address': _params.address,
    'area_ids': _params.area_ids,
    'menu_ids': _params.menu_ids
  }
  fetch(apiUrl.accountAgentAdd, _urlData).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  })
};
// account_agent - 编辑代理商账号
const accountAgentEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['fullname', _params.fullname, '姓名', 'empty'],
    ['mobile', _params.mobile, '电话号码', 'empty|phone'],
    ['company', _params.company, '公司名称', 'empty'],
    ['level_type', _params.level_type, '所属等级', 'empty'],
    ['address', _params.address, '详细地址', 'empty'],
    ['area_ids', _params.area_ids, '省市区', 'empty|area'],
    ['menu_ids', _params.menu_ids, '权限', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  let _urlData = {
    'id': _params.id,
    'fullname': _params.fullname,
    'state': _params.state,
    'mobile': _params.mobile,
    'company': _params.company,
    'level_type': _params.level_type,
    'address': _params.address,
    'area_ids': _params.area_ids,
    'menu_ids': _params.menu_ids
  }
  fetch(apiUrl.accountAgentEdit, _urlData).then(msg => {
    SuccessTips('修改成功', () => { callback && callback(msg) })
  })
};

/* ==== 设备管理部分 ==== */
// Device - 设备列表
const DeviceDeviceList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceDeviceList, _params).then(msg => { callback && callback(msg) });
};

// Device - 设备报警日志
const DeviceDeviceWarningLog = (deviceId, page, callback) => {
  fetch(apiUrl.DeviceDeviceWarningLog, { 'device_id': deviceId, 'page': page }).then(msg => { callback && callback(msg) });
};

// Device - 操作设备日志
const DeviceDeviceOperateLog = (deviceId, page, callback) => {
  fetch(apiUrl.DeviceDeviceOperateLog, { 'device_id': deviceId, 'page': page }).then(msg => { callback && callback(msg) });
};

// Device - 导出设备
const exportDevice = (deviceId, callback) => {
  fetch(apiUrl.exportDevice, { 'device_id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};

// Device - 设备详情
const DeviceDeviceDetail = (deviceId, callback) => {
  fetch(apiUrl.DeviceDeviceDetail, { 'device_id': deviceId }).then(msg => { callback && callback(msg) });
};

// Device - 设备详情
const DeviceOverview = (callback) => {
  fetch(apiUrl.DeviceOverview, {}).then(msg => { callback && callback(msg) });
};

/* ==== 设备管理部分 => 产品概述 ==== */
// Device_graph - 1.激活设备统计曲线图
const DeviceActiveGraph = (type, callback) => {
  fetch(apiUrl.DeviceActiveGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 2.在线设备统计曲线图
const DeviceOnlineGraph = (type, callback) => {
  fetch(apiUrl.DeviceOnlineGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 3.设备制水量统计曲线图
const DeviceWaterGraph = (type, callback) => {
  fetch(apiUrl.DeviceWaterGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 4.活跃设备统计曲线图
const DeviceLivelyGraph = (type, callback) => {
  fetch(apiUrl.DeviceLivelyGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

/* ==== 设备管理 => 非智能设备 === */
// Device - 获取非智能设备列表
const DeviceGetNonSmartDeviceList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceGetNonSmartDeviceList, _params).then(msg => { callback && callback(msg) });
};

//  Device - 添加非智能设备
const DeviceAddNonSmartDevice = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_name', _params.device_name, '设备名称', 'empty'],
    ['brand', _params.brand, '设备品牌', 'empty'],
    ['series', _params.series, '设备系列', 'empty'],
    ['model', _params.model, '设备型号', 'empty'],
    ['province_code', _params.province_code, '省市区', 'empty|area'],
    ['city_code', _params.city_code, '省市区', 'empty|area'],
    ['district_code', _params.district_code, '省市区', 'empty|area'],
    ['addr', _params.addr, '详细地址', 'empty'],
    ['realname', _params.realname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  fetch(apiUrl.DeviceAddNonSmartDevice, _params).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  })
}

// Device - 修改非智能设备
const DeviceUpdateNonSmartDevice = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_name', _params.device_name, '设备名称', 'empty'],
    ['brand', _params.brand, '设备品牌', 'empty'],
    ['series', _params.series, '设备系列', 'empty'],
    ['model', _params.model, '设备型号', 'empty'],
    ['province_code', _params.province_code, '省市区', 'empty|area'],
    ['city_code', _params.city_code, '省市区', 'empty|area'],
    ['district_code', _params.district_code, '省市区', 'empty|area'],
    ['addr', _params.addr, '详细地址', 'empty'],
    ['realname', _params.realname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  fetch(apiUrl.DeviceUpdateNonSmartDevice, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
};

// Device - 删除非智能设备
const DeviceDeleteNonSmartSevice = (ids, callback) => {
  fetch(apiUrl.DeviceDeleteNonSmartSevice, { 'device_id': ids }).then(msg => {
    SuccessTips('设备删除成功', () => { callback && callback(msg) })
  })
};

// Device - 导出非智能设备
const exportNonSmartDevice = (deviceId, callback) => {
  fetch(apiUrl.exportNonSmartDevice, { 'device_id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};

/* ==== 设备管理 => 设备地图 === */
const DeviceDeviceMapOverview = (areaId = '100000', callback) => {
  fetch(apiUrl.DeviceDeviceMapOverview, { 'area_id': areaId }).then(msg => { callback && callback(msg) })
};

/* ==== 服务管理部分 => 待处理订单 ==== */
// Fault_repair - 获取待处理订单列表
const FaultRepairGetServiceList = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'service_id': _params.service_id,
    'service_type': _params.service_type,
    'query_type': _params.query_type,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code
  }
  fetch(apiUrl.FaultRepairGetServiceList, _urlData).then(msg => { callback && callback(msg) })
};

// Fault_repair - 订单审核
const FaultRepairServiceCheck = (params, callback) => {
  let _params = params;
  let vArr = [
    ['remark', _params.remark, '信息内容', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.FaultRepairServiceCheck, { 'service_id': _params.service_id, 'state': _params.state, 'remark': _params.remark }).then(msg => {
    SuccessTips('审核成功', () => { callback && callback(msg) })
  })
};

// Fault_repair - 后台派单
const FaultRepairServiceSendOut = (params, callback) => {
  let _params = params;
  if (Number(_params.executor_id) < 1 || _params.executor_id === undefined) {
    Vue.prototype.$message.warning('无服务人员，无法派单');
    return;
  }
  let _urlData = {
    'service_id': _params.service_id,
    'executor_id': _params.executor_id,
    'emergency': _params.emergency
  };
  fetch(apiUrl.FaultRepairServiceSendOut, _urlData).then(msg => {
    SuccessTips('派单成功', () => { callback && callback(msg) })
  })
};

// Fault_repair - 审核记录
const FaultRepairGetCheckList = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetCheckList, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

// Fault_repair - 派单记录
const FaultRepairGetDispatchList = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetDispatchList, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取服务详情
const FaultRepairGetDetails = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetDetails, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取服务详情
const FaultRepairGetServers = (serviceId, districtCode, callback) => {
  fetch(apiUrl.FaultRepairGetServers, { 'service_id': serviceId, 'district_code': districtCode }).then(msg => { callback && callback(msg) })
};

/* ==== 服务管理部分 => 处理中订单 ==== */
// Fault_repair - 获取处理中订单列表
const FaultRepairGetServiceToBeCompleted = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'service_id': _params.service_id,
    'service_type': _params.service_type,
    'query_type': _params.query_type,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code,
    'time_type': _params.time_type
  }
  fetch(apiUrl.FaultRepairGetServiceToBeCompleted, _urlData).then(msg => { callback && callback(msg) })
};

// Fault_repair - 服务流程图
const FaultRepairGetServiceTree = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetServiceTree, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

/* ==== 服务管理部分 => 经完成的订单 ==== */
// Fault_repair - 获取已完成订单列表
const FaultRepairGetCompletedList = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'service_id': _params.service_id,
    'service_type': _params.service_type,
    'query_type': _params.query_type,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code
  }
  fetch(apiUrl.FaultRepairGetCompletedList, _urlData).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取评价
const FaultRepairGetEvaluation = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetEvaluation, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

/* ==== 告警与推送 => 用户反馈管理 ==== */
// Feedback - 获取反馈列表
const FeedbackGetFeedbackList = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'query_type': _params.query_type,
    'state': _params.state,
    'method': _params.method,
    'channel': _params.channel
  };
  fetch(apiUrl.FeedbackGetFeedbackList, _urlData).then(msg => { callback && callback(msg) })
};

// Feedback - 获取反馈处理记录列表
const FeedbackGetFeedbackLogList = (id, callback) => {
  fetch(apiUrl.FeedbackGetFeedbackLogList, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Feedback - 获取反馈详情
const FeedbackGetFeedbackDetail = (id, callback) => {
  fetch(apiUrl.FeedbackGetFeedbackDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Feedback - 处理反馈
const FeedbackDealFeedback = (params, callback) => {
  let _params = params
  fetch(apiUrl.FeedbackDealFeedback, { 'id': _params.id, 'state': _params.state, 'remark': _params.remark }).then(msg => {
    SuccessTips('处理成功', () => {
      callback && callback(msg)
    })
  })
};

/* ==== 告警与推送部分 => 推送模板设置 ==== */
// Msg_template - 获取模版列表
const msgTemplateGetList = (params, callback) => {
  fetch(apiUrl.msgTemplateGetList, { 'page': params.page, 'msg_type': params.msgType || '' }).then(msg => {
    callback && callback(msg)
  })
};

// Msg_template - 获取模版列表
const msgTemplateGetAll = (params, callback) => {
  fetch(apiUrl.msgTemplateGetAll, { 'page': params.page, 'msg_type': params.msgType || '' }).then(msg => {
    callback && callback(msg)
  })
};

// Msg_template - 获取模版详情
const msgTemplateGetDetail = (id, callback) => {
  fetch(apiUrl.msgTemplateGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Msg_template - 添加模版
const msgTemplateAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['name', _params.name, '模板名称', 'empty'],
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '信息内容', 'empty'],
    ['url', _params.url, '信息链接', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  // fetch(apiUrl.msgTemplateAdd, {
  //   'id': _params.id,
  //   'msg_type': _params.msg_type,
  //   'name': _params.name,
  //   'title': _params.title,
  //   'content': _params.content,
  //   'url': _params.url
  // }).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) });
  fetch(apiUrl.msgTemplateAdd, _params).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
};

// Msg_template - 编辑模版
const msgTemplateEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['name', _params.name, '模板名称', 'empty'],
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '信息内容', 'empty'],
    ['url', _params.url, '信息链接', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.msgTemplateEdit, _params).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
    // fetch(apiUrl.msgTemplateEdit, {
    //   'id': _params.id,
    //   'msg_type': _params.msg_type,
    //   'name': _params.name,
    //   'title': _params.title,
    //   'content': _params.content,
    //   'url': _params.url
    // }).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
};

// Msg_template - 删除模版
const msgTemplateDel = (id, callback) => {
  fetch(apiUrl.msgTemplateDel, { 'ids_str': id }).then(msg => {
    SuccessTips('模板删除成功', () => { callback && callback(msg) })
  })
};
/* ==== 告警与推送部分 => 广告图片设置 ==== */
// information - 删除资讯
const informationDel = (id, callback) => {
  fetch(apiUrl.informationDel, { 'id': id }).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
}

// information - 新增资讯
const informationAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '内容', 'empty'],
    ['cover_img', _params.cover_img, '封面图片', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.informationAdd, params).then(msg => {
    SuccessTips('新增咨询成功', () => { callback && callback(msg) })
  })
}

// information - 编辑资讯
const informationEdit = (params, callback, tips = '保存成功') => {
  fetch(apiUrl.informationEdit, params).then(msg => {
    SuccessTips(tips, () => { callback && callback(msg) })
  })
}

// information - 获取资讯列表
const informationGetList = (params, callback) => {
  fetch(apiUrl.informationGetList, params).then(msg => { callback && callback(msg) })
}

// information - 获取资讯详情
const informationGetDetail = (id, callback) => {
  fetch(apiUrl.informationGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送部分 => 广告图片设置 ==== */
// advertisement - 删除广告图片
const advertisementDel = (id, callback) => {
  fetch(apiUrl.advertisementDel, { 'id': id }).then(msg => {
    SuccessTips('图片删除成功', () => { callback && callback(msg) })
  })
}

// advertisement - 新增广告图片
const advertisementAdd = (type, image, url, callback) => {
  fetch(apiUrl.advertisementAdd, { 'type': type, 'image': image, 'url': url }).then(msg => {
    SuccessTips('图片添加成功', () => { callback && callback(msg) })
  })
}

// advertisement - 获取广告图片列表
const advertisementGetList = (page, callback) => {
  fetch(apiUrl.advertisementGetList, { 'page': page }).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送 => 信息公告推送 ==== */
// User_msg - 批量发送消息
const UserMsgSendMsgs = (msgId, uidArr, callback) => {
  if (!msgId) {
    Vue.prototype.$message.warning('请选择模板');
    return;
  }
  if (!uidArr.length) {
    Vue.prototype.$message.warning('请选择要发送的用户');
    return;
  }
  fetch(apiUrl.UserMsgSendMsgs, { 'msg_id': msgId, 'uid': uidArr.join(',') }).then(msg => {
    SuccessTips('发送成功', () => { callback && callback(msg) })
  })
};

// User_msg - 获取信息推送列表
const UserMsgGetMsgList = (page, callback) => {
  fetch(apiUrl.UserMsgGetMsgList, { 'page': page }).then(msg => { callback && callback(msg) });
};

// User_msg - 获取用户列表
const UserMsgGetUserList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['contact', _params.contact, '手机号', 'options|empty|phoneDim']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.UserMsgGetUserList, {
    'page': _params.page,
    'contact': _params.contact,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code
  }).then(msg => {
    callback && callback(msg)
  })
}

/* ==== 告警与推送部分 => 设备报警记录 ==== */
const DeviceWarningGetWarningList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceWarningGetWarningList, params).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送部分 => 滤芯更换提醒 ==== */
// Filter_warning - 批量发送消息
const FilterWarningSendMsgs = (templateId, idArr, callback) => {
  if (!templateId) { Vue.prototype.$message.warning('请选择模板'); return; }
  if (!idArr.length) { Vue.prototype.$message.warning('请选择要发送的用户'); return; }
  fetch(apiUrl.FilterWarningSendMsgs, { 'msg_id': templateId, 'device_id': idArr.join(',') }).then(msg => {
    SuccessTips('发送成功', () => { callback && callback(msg) })
  })
}

// Filter_warning - 获取用户设备列表
const FilterWarningGetUserDevice = (params, callback) => {
  fetch(apiUrl.FilterWarningGetUserDevice, params).then(msg => { callback && callback(msg) })
}

/* ==== 用户管理部分 => 用户画像 ==== */
// User - 用户统计
const UserUserStatistics = (callback) => {
  fetch(apiUrl.UserUserStatistics, {}).then(msg => { callback && callback(msg) });
}

// User - 用户年龄分布
const UserAgeMap = (callback) => {
  fetch(apiUrl.UserAgeMap, {}).then(msg => { callback && callback(msg) });
}

// User - 用户性别分布
const UserSexMap = (callback) => {
  fetch(apiUrl.UserSexMap, {}).then(msg => { callback && callback(msg) });
}

// User - 6.用户地图分布(省份)
const UserUserMap = (callback) => {
  fetch(apiUrl.UserUserMap, {}).then(msg => { callback && callback(msg) });
}

/* ==== 用户管理部分 => 用户列表 ==== */
// User - 用户列表
const UserUsers = (params, callback) => {
  fetch(apiUrl.UserUsers, params).then(msg => { callback && callback(msg) });
}

// User - 用户设备
const UserUserDevices = (uid, callback) => {
  fetch(apiUrl.UserUserDevices, { 'uid': uid }).then(msg => { callback && callback(msg) });
}

// // User - 用户列表导出
const UserRxportUsers = (uidStr, callback) => {
  fetch(apiUrl.UserRxportUsers, { 'uid': uidStr }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
/* ==== 财务部分 => 财务管理部分 ==== */
const financeIndex = (params, callback) => {
  fetch(apiUrl.financeIndex, params).then(msg => { callback && callback(msg) });
}

// 导出财务列表
const financeExportData = (deviceId, callback) => {
  fetch(apiUrl.financeExportData, { 'id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};

/* ==== 系统设置部分 => 参数设置 ==== */
// System - 保存勾选要展示的面板
const SystemSaveBoards = (idsStr, callback) => {
  fetch(apiUrl.SystemSaveBoards, { 'board_ids': idsStr }).then(msg => {
    SuccessTips('保存成功', () => { callback && callback(msg) })
  })
}

// System - 2.获取需要在首页展示的面板
const SystemAccountBoards = (callback) => {
  fetch(apiUrl.SystemAccountBoards, {}).then(msg => { callback && callback(msg) })
}

// System - 3.获取所有面板
const SystemBoards = (callback) => {
  fetch(apiUrl.SystemBoards, {}).then(msg => { callback && callback(msg) })
}

/* ==== 租赁管理部分 => 租赁规则列表 ==== */
// lease - 1.获取租赁规则表
const leaseLeaseList = (params, callback) => {
  fetch(apiUrl.leaseLeaseList, { 'page': params.page }).then(msg => { callback && callback(msg) })
}

// lease - 2.添加租赁规则
const leaseAddLease = (params, callback) => {
  let _params = params;
  let vArr = [
    ['name', _params.name, '租赁规则名称', 'empty'],
    ['scene', _params.scene, '使用场景', 'empty'],
    ['type', _params.type, '租赁模式', 'empty'],
    ['brand_id', _params.brand_id, '品牌', 'empty'],
    ['series_id', _params.series_id, '系列', 'empty'],
    ['model_id', _params.model_id, '型号', 'empty'],
    ['province_code', _params.province_code, '省市区', 'area'],
    ['city_code', _params.scene, '省市区', 'empty'],
    ['district_code', _params.scene, '省市区', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.leaseAddLease, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};

// lease - 3.获取一个租赁规则
const leaseOneLease = (id, callback) => {
  fetch(apiUrl.leaseOneLease, { 'id': id }).then(msg => { callback && callback(msg) })
}

// lease - 删除租赁规则
const leaseDelLease = (id, callback) => {
  fetch(apiUrl.leaseDelLease, { 'id': id }).then(msg => { callback && callback(msg) })
};
// lease - 4.添加套餐
// const leaseAddPackage = (callback) => {
//   fetch(apiUrl.leaseAddPackage, {}).then(msg => { callback && callback(msg) })
// }

/* ==== 租赁管理部分 => 设备规则管理 ==== */
// device_lease - 获取设备规则列表
const deviceLeaseSetList = (params, callback) => {
  fetch(apiUrl.deviceLeaseSetList, params).then(msg => { callback && callback(msg) })
}

/* ==== 滤芯管理部分 => 滤芯防伪管理 ==== */
// Filter - 获取滤芯列表
const FilterGetFilterList = (params, callback) => {
  let _params = params;
  fetch(apiUrl.FilterGetFilterList, { 'page': _params.page, 'state': _params.state, 'id': _params.id }).then(msg => { callback && callback(msg) })
}

// Filter - 上传滤芯
const FilterImportFilter = (fileName, callback) => {
  fetch(apiUrl.FilterImportFilter, { 'myfile': fileName }).then(msg => {
    SuccessTips('导入成功', () => { callback && callback(msg) });
  })
}

/* ==== 升级管理部分 => 版本管理 ==== */
// firmware - 获取固件版本管理列表
const FirmwareLists = (page, callback) => {
  fetch(apiUrl.FirmwareLists, { 'page': page }).then(msg => { callback && callback(msg) })
};
// firmware - 获取固件版本详情
const FirmwareDetail = (id, callback) => {
  fetch(apiUrl.FirmwareDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};
// Oss_upload - 获取OSS表单上传参数
const OssUploadGetPostObjectParams = (callback) => {
  fetch(apiUrl.OssUploadGetPostObjectParams, { 'type': 1 }).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
};
/* ==== 升级管理部分 => 升级记录 ==== */
// upgrade_log - 获取设备升级记录
const UpgradeLogLists = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.UpgradeLogLists, params).then(msg => { callback && callback(msg) })
};
/* ==== 系统日志部分 ==== */
// Account_assign - 获取分配记录
const AccountAssignGetAssignLog = (parmas, callback) => {
  fetch(apiUrl.AccountAssignGetAssignLog, parmas).then(msg => { callback && callback(msg) })
};
// Login_log - 人员登录信息
const LoginLogGetLoginLog = (parmas, callback) => {
  fetch(apiUrl.LoginLogGetLoginLog, parmas).then(msg => { callback && callback(msg) })
};

export default {
  SuccessTips,
  GetApplyId, // 获取apply-id
  accountInitPwd, // 初始化账号密码
  serviceAccountBackInitPwd, // 服务账号初始化账号密码
  accountDel,
  menuGetList,
  accountChangePwd, // account - 修改密码
  accountGetAccountInfo, // account - 获取账号信息
  UploadifyUploadFile, // Uploadify - 上传文件
  UploadifyUploadImage, // Uploadify - 上传图片
  accountLogin,
  accountLogout,
  /* ======  账号管理部分 => 服务账号管理  ======= */
  serviceAccountFrontGetApplyList, // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  serviceAccountFrontGetApplyDetail, // service_account_front - 获取服务账号申请详情(服务人员审核)
  serviceAccountFrontAddApplyHandle, // service_account_front - 新增申请处理记录(服务人员审核)
  serviceAccountFrontGetApplyHandleList, // service_account_front - 获取服务账号申请审核列表(服务人员审核)
  /* ======  账号管理部分 => 服务账号管理  ======= */
  serviceAccountBackGetList, // service_account_back - 获取服务账号[后台创建=>]列表
  serviceAccountBackAdd, // service_account_back - 新增服务账号
  serviceAccountBackEdit, // service_account_back - 编辑服务账号
  serviceAccountBackGetDetail, // 获取服务账号[后台创建]详情
  /* ==== 账号管理部分 => 运营账号管理 ===== */
  accountOperateGetList, // account_operate - 获取运营账号列表
  accountOperateAdd, // account_operate - 新增运营账号
  accountOperateEdit, // account_operate - 编辑运营账号
  accountOperateGetDetail, // 获取服务账号[后台创建]详情
  // 账号管理部分 => 代理商账号管理
  accountAgentGetList, // account_agent - 获取代理商账号列表
  accountAgentGetDetail, // account_agent - 获取代理商账号详情
  accountAgentAdd, // account_agent - 新增代理商账号
  accountAgentEdit, // account_agent - 编辑代理商账号
  /* ==== 设备管理部分 => 产品概述 ==== */
  DeviceActiveGraph, // Device_graph - 1.激活设备统计曲线图
  // 设备管理部分 => 设备管理
  DeviceDeviceList,
  DeviceDeviceWarningLog, // Device - 设备报警日志
  DeviceDeviceOperateLog, // Device - 操作设备日志
  exportDevice, // Device - 导出设备
  DeviceDeviceDetail, // Device - 设备详情
  DeviceOverview, // 设备首页4个统计
  // 设备管理部分 => 设备地图
  DeviceDeviceMapOverview, // Device_graph - 1.激活设备统计曲线图
  DeviceOnlineGraph, // Device_graph - 2.在线设备统计曲线图
  DeviceWaterGraph, // Device_graph - 3.设备制水量统计曲线图
  DeviceLivelyGraph, // Device_graph - 4.活跃设备统计曲线图
  // 设备管理部分 => 非智能设备管理
  DeviceGetNonSmartDeviceList, // Device - 获取非智能设备列表
  DeviceAddNonSmartDevice, //  Device - 添加非智能设备
  DeviceUpdateNonSmartDevice, // Device - 修改非智能设备
  DeviceDeleteNonSmartSevice, // Device - 删除非智能设备
  exportNonSmartDevice, // Device - 导出非智能设备
  // 服务管理部分 => 待处理订单
  FaultRepairGetServiceList, // Fault_repair - 获取待处理订单列表
  FaultRepairServiceCheck, // Fault_repair - 订单审核
  FaultRepairServiceSendOut, // Fault_repair - 后台派单
  FaultRepairGetCheckList, // Fault_repair - 审核记录
  FaultRepairGetDispatchList, // Fault_repair - 派单记录
  FaultRepairGetDetails, // Fault_repair - 获取服务详情
  FaultRepairGetServers, // Fault_repair - 获取服务人员列表
  // 服务管理部分 => 处理中订单
  FaultRepairGetServiceToBeCompleted, // Fault_repair - 获取处理中订单列表
  FaultRepairGetServiceTree, // Fault_repair - 服务流程图
  // 服务管理部分 => 经完成的订单
  FaultRepairGetCompletedList, // Fault_repair - 获取已完成订单列表
  FaultRepairGetEvaluation, // Fault_repair - 获取评价
  // 告警与推送部分 => 用户反馈管理
  FeedbackGetFeedbackList, // Feedback - 获取反馈列表
  FeedbackGetFeedbackLogList, // Feedback - 获取反馈处理记录列表
  FeedbackGetFeedbackDetail, // Feedback - 获取反馈详情
  FeedbackDealFeedback, // Feedback - 处理反馈
  // 告警与推送部分 => 推送模板设置
  msgTemplateGetList, // Msg_template - 获取模版列表
  msgTemplateGetAll, // Msg_template - 获取模版列表
  msgTemplateGetDetail, // Msg_template - 获取模版详情
  msgTemplateAdd, // Msg_template - 添加模版
  msgTemplateEdit, // Msg_template - 编辑模版
  msgTemplateDel, // Msg_template - 删除模版
  /* ==== 告警与推送部分 => 广告图片设置 ==== */
  informationDel, // information - 删除资讯
  informationAdd, // information - 新增资讯
  informationEdit, // information - 编辑资讯
  informationGetList, // information - 获取资讯列表
  informationGetDetail, // information - 获取资讯详情
  /* ==== 告警与推送部分 => 广告图片设置 ==== */
  advertisementDel, // advertisement - 删除广告图片
  advertisementAdd, // advertisement - 新增广告图片
  advertisementGetList, // advertisement - 获取广告图片列表
  /* ==== 告警与推送部分 => 信息公告推送 ==== */
  UserMsgSendMsgs, // User_msg - 批量发送消息
  UserMsgGetMsgList, // User_msg - 批量发送消息
  UserMsgGetUserList, // User_msg - 批量发送消息
  /* ==== 告警与推送部分 => 设备报警记录 ==== */
  DeviceWarningGetWarningList,
  /* ==== 告警与推送部分 => 滤芯更换提醒 ==== */
  FilterWarningSendMsgs, // Filter_warning - 批量发送消息
  FilterWarningGetUserDevice, // Filter_warning - 获取用户设备列表
  /* ==== 用户管理部分 => 用户画像 ==== */
  UserUserStatistics, // User - 用户统计
  UserAgeMap, // User - 用户年龄分布
  UserSexMap, // User - 用户性别分布
  UserUserMap, // User - 6.用户地图分布(省份)
  /* ==== 用户管理部分 => 用户列表 ==== */
  UserUsers, // User - 用户列表
  UserUserDevices, // User - 用户设备
  UserRxportUsers, // User - 用户列表导出
  /* ==== 财务部分 => 财务管理部分 ==== */
  financeIndex, // finance - 财务管理
  financeExportData, // 导出财务列表
  /* ==== 系统设置部分 => 参数设置 ==== */
  SystemSaveBoards, // System - 保存勾选要展示的面板
  SystemAccountBoards, // System - 2.获取需要在首页展示的面板
  SystemBoards, // System - 获取需要在首页展示的面板
  /* ==== 租赁管理部分 => 租赁规则列表 ==== */
  leaseLeaseList, // lease - 1.获取租赁规则表
  leaseAddLease, // lease - 2.添加租赁规则
  leaseOneLease, // lease - 3.获取一个租赁规则
  leaseDelLease, // 删除租赁规则
  // leaseAddPackage, // lease - 4.添加套餐
  /* ==== 租赁管理部分 => 设备规则管理 ==== */
  deviceLeaseSetList, // device_lease - 获取设备规则列表
  /* ==== 滤芯管理部分 => 滤芯防伪管理 ==== */
  FilterGetFilterList, // Filter - 获取滤芯列表
  FilterImportFilter, // Filter - 上传滤芯
  /* ==== 升级管理部分 => 版本管理 ==== */
  FirmwareLists, // firmware - 获取固件版本管理列表
  OssUploadGetPostObjectParams, // Oss_upload - 获取OSS表单上传参数
  FirmwareDetail, // firmware - 获取固件版本详情
  /* ==== 升级管理部分 => 升级记录 ==== */
  UpgradeLogLists, // upgrade_log - 获取设备升级记录
  /* ==== 系统日志部分 ==== */
  AccountAssignGetAssignLog, // Account_assign - 获取分配记录
  LoginLogGetLoginLog // // Login_log - 人员登录信息

}
