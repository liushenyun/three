import Vue from 'vue';

/**
 * 角色类型过滤器
 * 1-专职安装/维修、2-兼职安装/维修
 */
Vue.filter('FilterRoleType', function(type) {
  if (type === undefined || type === '') {
    return '---';
  };
  let _num = Number(type);
  let _typeArr = ['专职安装/维修', '兼职安装/维修'];
  return _typeArr[_num - 1];
})

/**
 * 职务角色类型过滤器
 *  1-管理员 2-高管 3-文员 4-财务
 */
Vue.filter('FilterPositionRoleType', function(type) {
  if (type === undefined || type === '') {
    return '---';
  };
  let _num = Number(type);
  let _typeArr = ['管理员', '高管', '文员', '财务'];
  return _typeArr[_num - 1];
})

/**
 * 使用状态 1-正常 2-禁用
 */
Vue.filter('FilterUseStatus', function(type) {
  if (type === undefined || type === '') {
    return '---';
  };
  let _num = Number(type);
  let _typeArr = ['正常', '禁用'];
  return _typeArr[_num - 1];
})

/**
 * 处理状态过滤器（账号申请
 * 0-未审核、1-审核中、2-已拒绝、3-已通过
 */
Vue.filter('FilterAccountHandleStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['未审核', '审核中', '已拒绝', '已通过'];
  return _typeArr[_num];
})

/**
 * 时间过滤器
 * @example
 * {{1565687545*1000|dateFormat('yyyy-MM-dd hh:mm:ss')}}
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
Vue.filter("DateFormat", function(date, fmt) {
  if (!date) {
    return '---';
  }
  let _date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
})

/**
 * 服务订单状态过滤器
 * 状态判定(1待审核，2待派单)
 */
Vue.filter('FilterServiceOrderStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['待审核', '待派单'];
  return _typeArr[_num - 1];
})

/**
 * 服务类型过滤器
 * 服务类型(1安装,2售后)
 */
Vue.filter('FilterServiceType', function(type) {
  let _num = Number(type);
  let _typeArr = ['安装', '售后'];
  return _typeArr[_num - 1];
})

/**
 * 反馈管理 处理处理状态
 * 处理状态(0待处理1处理中2已处理3已转服务管理)
 */
Vue.filter('FilterFeedbackHandleStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['待处理', '处理中', '已处理', '已转服务管理'];
  return _typeArr[_num];
})

/**
 * 反馈管理 反馈类型
 * 反馈类型(1净水器问题，2网络问题，3使用问题，4其他问题)
 */
Vue.filter('FilterFeedbackType', function(type) {
  let _num = Number(type);
  let _typeArr = ['净水器问题', '网络问题', '使用问题', '其他问题'];
  return _typeArr[_num - 1];
})

/**
 * 服务管理 问题分类
 * 问题分类(1净水器问题，2网络问题，3使用问题，4其他问题)
 */
Vue.filter('FilterQuestionCategory', function(type) {
  let _num = Number(type);
  let _typeArr = ['净水器问题', '网络问题', '使用问题', '其他问题', '安装'];
  return _typeArr[_num - 1];
})

/**
 * 推送模板 信息类型
 * 消息模版类型(1滤芯提醒2优惠信息3升级提醒4系统公告5活动信息6广告信息7其他提醒8设备报警)
 */
Vue.filter('FilterMsgTemplateType', function(type) {
  let _num = Number(type);
  let _typeArr = ['滤芯提醒', '优惠信息', '升级提醒', '系统公告', '活动信息', '广告信息', '其他提醒', '设备报警'];
  return _typeArr[_num - 1];
})

/**
 * 滤芯状态(1全部2正常3需更换0滤芯不存在)
 */
Vue.filter('FilterFilterStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['--', '', '正常', '需更换'];
  return _typeArr[_num];
})

/**
 * 滤芯通知状态(1全部2已通知3未通知)
 */
Vue.filter('FilterFilterNoticeStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['', '', '已通知', '未通知'];
  return _typeArr[_num];
})

/**
 * 设备报警类型(123) 漏水、逆止阀故障、UV灯
 */
Vue.filter('FilterDeviceAlarmType', function(type) {
  let _num = Number(type);
  let _typeArr = ['漏水', '逆止阀故障', '', '', '', '', 'UV灯'];
  return _typeArr[_num - 1];
});

/**
 * 故障报警类型(12345678) ['缺水', '制水', '水满', '冲洗', '检修', '关机', '漏水', 'UV灯故障']
 */
Vue.filter('FilterFaultAlarmType', function(type) {
  let _num = Number(type);
  let _typeArr = ['缺水', '制水', '水满', '冲洗', '检修', '关机', '漏水', 'UV灯故障'];
  return _typeArr[_num - 1];
});

/**
 * 网络状态(0离线、1在线、2故障)
 */
Vue.filter('FilterNetworkStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['离线', '在线', '故障'];
  return _typeArr[_num];
})

/**
 * 设备状态(0离线、1在线、2故障)
 */
Vue.filter('FilterDeviceStatus', function(type) {
  let _num = Number(type);
  let _typeArr = ['正常', '非正常'];
  return _typeArr[_num];
})

/**
 * 设备状态: 0 正常 1 锁定 2 停机 3待激活
 */
Vue.filter('FilterDevice1Status', function(type) {
  let _num = Number(type);
  let _typeArr = ['正常', '锁定', '停机', '待激活'];
  return _typeArr[_num];
})

/**
 * 账号类型（1服务账号，2代理商账号，3运营账号）
 */
Vue.filter('FilterAccountType', function(type) {
  let _num = Number(type);
  let _typeArr = ['服务账号', '代理商账号', '运营账号'];
  return _typeArr[_num - 1];
})

/**
 * 账号类型（1服务账号，2代理商账号，3运营账号）
 */
Vue.filter('FilterAgentLevelType', function(type) {
  let _num = Number(type);
  let _typeArr = ['大区', '省代', '市代', '区代', '分销商'];
  return _typeArr[_num - 1];
})

/**
 * 服务人员类型（1服务账号，2代理商账号，3运营账号）
 */
Vue.filter('FilterServicerType', function(type) {
  let _num = Number(type);
  let _typeArr = ['专职安装/维修', '兼职安装/维修'];
  return _typeArr[_num - 1];
})

/**
 * 派单三种状态（订单状态(0未接单1已接单2已拒绝)
 */
Vue.filter('FilterOrderReceiveState', function(type) {
  let _num = Number(type);
  let _typeArr = ['未接单', '已接单', '已拒绝'];
  return _typeArr[_num];
})

/**
 * 审核三种状态（(0未通过，1已通过)
 */
Vue.filter('FilterCheckState', function(type) {
  let _num = Number(type);
  let _typeArr = ['未通过', '已通过'];
  return _typeArr[_num];
})

/**
 * 广告类型类型 1、启动页面，2、首页banner，3、滤芯1说明，4、
 * 滤芯2说明，5、滤芯3说明，6、滤芯4说明，7、滤芯5说明，8、滤芯6说明，9、滤芯7说明
 */
Vue.filter('advertisementType', function(type) {
  let _num = Number(type) - 1;
  let _typeArr = ['启动页面', '首页banner', '滤芯1说明', '滤芯2说明', '滤芯3说明', '滤芯4说明', '滤芯5说明', '滤芯6说明', '滤芯7说明'];
  return _typeArr[_num];
})
