const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//小于10补0
var addZero = function (value) {
  if (value < 10) {
    return '0' + value
  }
  return value
}
//时间格式化，到秒
var timeFormat = function (se) {
  var date = getDate()
  date.setTime(se + '000')
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()

  return [year, month, day].map(addZero).join('-') + ' ' + [hour, minutes, seconds].map(addZero).join(':')
}
//自舍五入
var round = function (number) {
  return Math.round(number)
}
//风力转风级
var windJi = function (speed) {
  var ji = ''
  if (speed < 1) {
    ji = 0
  } else if (speed < 5) {
    ji = 1
  } else if (speed < 11) {
    ji = 2
  } else if (speed < 19) {
    ji = 3
  } else if (speed < 28) {
    ji = 4
  } else if (speed < 38) {
    ji = 5
  } else if (speed < 49) {
    ji = 6
  } else if (speed < 61) {
    ji = 7
  } else if (speed < 74) {
    ji = 8
  } else if (speed < 88) {
    ji = 9
  } else if (speed < 102) {
    ji = 10
  } else if (speed < 117) {
    ji = 11
  } else if (speed < 134) {
    ji = 12
  } else if (speed < 149) {
    ji = 13
  } else if (speed < 166) {
    ji = 14
  } else if (speed < 183) {
    ji = 15
  } else if (speed < 201) {
    ji = 16
  } else if (speed < 220) {
    ji = 17
  } else if (speed < 250) {
    ji = 18
  } else if (speed >= 250) {
    ji = 19
  }
  return ji + '级'
}
//风力转风名称
var windName = function (speed) {
  var ji = ''
  if (speed < 1) {
    ji = '无风'
  } else if (speed < 5) {
    ji = '软风'
  } else if (speed < 11) {
    ji = '轻风'
  } else if (speed < 19) {
    ji = '微风'
  } else if (speed < 28) {
    ji = '和风'
  } else if (speed < 38) {
    ji = '清风'
  } else if (speed < 49) {
    ji = '强风'
  } else if (speed < 61) {
    ji = '疾风'
  } else if (speed < 74) {
    ji = '大风'
  } else if (speed < 88) {
    ji = '烈风'
  } else if (speed < 102) {
    ji = '狂风'
  } else if (speed < 117) {
    ji = '暴风'
  } else if (speed < 134) {
    ji = '一级飓风'
  } else if (speed < 149) {
    ji = '一级飓风'
  } else if (speed < 166) {
    ji = '二级飓风'
  } else if (speed < 183) {
    ji = '三级飓风'
  } else if (speed < 201) {
    ji = '三级飓风'
  } else if (speed < 220) {
    ji = '四级飓风'
  } else if (speed < 250) {
    ji = '四级飓风'
  } else if (speed >= 250) {
    ji = '五级飓风'
  }
  return ji
}
//风向转换
var windDir = function (angle) {
  var dir = ''
  if (angle > 337.5 || angle <= 22.5) {
    dir = '北风'
  } else if (angle > 22.5 && angle <= 67.5) {
    dir = '东北风'
  } else if (angle > 67.5 && angle <= 112.5) {
    dir = '东风'
  } else if (angle > 112.5 && angle <= 157.5) {
    dir = '东南风'
  } else if (angle > 157.5 && angle <= 202.5) {
    dir = '南风'
  } else if (angle > 202.5 && angle <= 247.5) {
    dir = '西南风'
  } else if (angle > 247.5 && angle <= 292.5) {
    dir = '西风'
  } else if (angle > 292.5 && angle <= 337.5) {
    dir = '西北风'
  }


  return dir
}
//日期转换
var dateSwitch = function (date) {
  var now = getDate()
  var year = now.getFullYear()
  return date.replace(year + '-', '').replace(year + 1 + '-', '').replace(year - 1 + '-', '')
}
//日期转星期
var dateToDay = function (date) {
  var split = date.split('-')
  var now = getDate()
  now.setFullYear(split[0])
  now.setMonth(split[1] - 1)
  now.setDate(split[2])
  var day = ''
  switch (now.getDay()) {
    case 0:
      day = '周日';
      break;
    case 1:
      day = '周一';
      break;
    case 2:
      day = '周二';
      break;
    case 3:
      day = '周三';
      break;
    case 4:
      day = '周四';
      break;
    case 5:
      day = '周五';
      break;
    case 6:
      day = '周六';
      break;
  }
  return day
}
//天气现象转换icon
var weatherIcon = function (sk) {
  var icon = ''
  switch (sk) {
    case 'CLEAR_DAY':
      icon = 'icon-qing';
      break;
    case 'CLEAR_NIGHT':
      icon = 'icon-yueliang';
      break;
    case 'PARTLY_CLOUDY_DAY':
      icon = 'icon-duoyun';
      break;
    case 'PARTLY_CLOUDY_NIGHT':
      icon = 'icon-duoyunye';
      break;
    case 'CLOUDY':
      icon = 'icon-yin';
      break;
    case 'WIND':
      icon = 'icon-icon--';
      break;
    case 'HAZE':
      icon = 'icon-dehaze';
      break;
    case 'RAIN':
      icon = 'icon-yu';
      break;
    case 'SNOW':
      icon = 'icon-xue';
      break;
  }
  return icon
}
//转天气名称
var weatherName = function (sk) {
  var name = ''
  switch (sk) {
    case 'CLEAR_DAY':
      name = '晴';
      break;
    case 'CLEAR_NIGHT':
      name = '晴';
      break;
    case 'PARTLY_CLOUDY_DAY':
      name = '多云';
      break;
    case 'PARTLY_CLOUDY_NIGHT':
      name = '多云';
      break;
    case 'CLOUDY':
      name = '阴';
      break;
    case 'WIND':
      name = '风';
      break;
    case 'HAZE':
      name = '雾霾';
      break;
    case 'RAIN':
      name = '雨';
      break;
    case 'SNOW':
      name = '雪';
      break;
  }
  return name
}

//时间转换
var timeSwitch = function (date) {
  var now = getDate()

  var yes = getDate()
  yes.setTime(now.getTime() - 1000 * 60 * 60 * 24)

  var tom = getDate()
  tom.setTime(now.getTime() + 1000 * 60 * 60 * 24)

  var after = getDate()
  after.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 2)

  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  return date
  .replace([year, month, day].map(addZero).join('-'), '今天')
  .replace([tom.getFullYear(), tom.getMonth() + 1, tom.getDate()].map(addZero).join('-'), '明天')
  .replace([after.getFullYear(), after.getMonth() + 1, after.getDate()].map(addZero).join('-'), '后天')
  .replace([yes.getFullYear(), yes.getMonth() + 1, yes.getDate()].map(addZero).join('-'), '昨天')
  .replace(year + "-", "")
  .replace((year - 1) + "-", "")
  .replace((year + 1) + "-", "")
}

//空气质量换算
var aqiSwitch = function (val) {
  var desc = ''
  if (val <= 50) {
    desc = '优'
  } else if (val <= 100) {
    desc = '良'
  } else if (val <= 150) {
    desc = '轻度污染'
  } else if (val <= 200) {
    desc = '中度污染'
  } else if (val <= 300) {
    desc = '重度污染'
  } else if (val > 300) {
    desc = '严重污染'
  }
  return desc
}

var cloudColorTos = function (scale){
  var min = 83,
    max = 126,
    scaleMin = 0,
    scaleMax = 40,
    diff = (max - min) / (scaleMax - scaleMin),
    result;

  if (scale > scaleMax) {
    result = min
  } else if (scale < scaleMin) {
    result = max
  } else {
    result = Math.floor(max - (scale - scaleMin) * diff)
  }
  var color = '#' + result.toString(16) + result.toString(16) + (result + 32).toString(16);
  // console.log(color)
  return color
}
//气象颜色
var colorSwitch = function (sk, scale /* 气象强度， 控制主题颜色 */) {
  var color;
  var scale = scale ? scale : 0
  switch (sk) {
    case 'CLEAR_DAY':
      var min = 110,
      max = 150,
      scaleMin = 0,
      scaleMax = 40, 
      diff = (max - min) / (scaleMax - scaleMin),
      result;
      
      if(scale > scaleMax){
        result = min
      }else if(scale < scaleMin){
        result = max
      }else{
        result = Math.floor(max - (scale - scaleMin) * diff)
      }
      color = '#ff' + result.toString(16) + '00';
      break;
    case 'CLEAR_NIGHT':
      color = cloudColorTos(scale);
      break;
    case 'PARTLY_CLOUDY_DAY':
      color = cloudColorTos(scale);
      break;
    case 'PARTLY_CLOUDY_NIGHT':
      color = cloudColorTos(scale);
      break;
    case 'CLOUDY':
      color = cloudColorTos(scale);
      break;
    case 'WIND':
      color = '#537a47';
      break;
    case 'HAZE':
      color = '#5b5b5b';
      break;
    case 'RAIN':
      color = '#5ab4db';
      break;
    case 'SNOW':
      color = '#69a9dd';
      break;
    default:
      color = '#8b8b8b';
      break;
  }
  return color
}
module.exports = {
  formatTime: formatTime,
  timeFormat: timeFormat,
  round: round,
  windJi: windJi,
  windName: windName,
  windDir: windDir,
  dateSwitch: dateSwitch,
  dateToDay: dateToDay,
  weatherIcon: weatherIcon,
  timeSwitch: timeSwitch,
  aqiSwitch: aqiSwitch,
  weatherName: weatherName,
  colorSwitch: colorSwitch,
  addZero: addZero
}
