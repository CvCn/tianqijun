//index.js

//echarts
import * as echarts from '../../static/ec-canvas/echarts'
var A = require("../../utils/p.js");
//获取应用实例
const app = getApp()
var QQMapWX = require('../../static/lib/qqmap-wx-jssdk.min.js');
var qqMap = new QQMapWX({
  key: '' // 必填
});

var utils = require("../../utils/util.js")

//气温面积图配置
function setOption(chart, te, color) {
  // var te = info.result.daily.temperature
  var max = 0
  var min = 10000
  //遍历出最高与最低
  te.map((item, index) => {
    if (item.max >= max) {
      max = item.max
    }
    if (item.min <= min) {
      min = item.min
    }
  })
  var option = {
    // title: {
    //   text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    color: [color, color],
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      top: "0",
      left: "-35rpx",
      right: "-40rpx",
      bottom: "0"
    },
    // tooltip: {
    //   show: true,
    //   trigger: 'axis'
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [te[0].date, te[0].date, te[1].date, te[2].date, te[3].date, te[4].date, te[5].date, te[6].date, te[7].date, te[8].date, te[9].date, te[10].date, te[11].date, te[12].date, te[13].date, te[14].date, te[14].date],
      show: false,
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        },
        show: false
      },
      show: false,
      max: max + 10,
      min: min - 10
    },

    series: [{
      name: '最高',
      type: 'line',
      smooth: true,
      // animation: false,
      animationDuration: 0.01,
      symbolSize: 0.0000000001,
      data: [te[0].max, te[0].max, te[1].max, te[2].max, te[3].max, te[4].max, te[5].max, te[6].max, te[7].max, te[8].max, te[9].max, te[10].max, te[11].max, te[12].max, te[13].max, te[14].max, te[14].max].map(Math.round),
      areaStyle: {
        color: color,
        opacity: 0.2,
        origin: 'start'
      },
      lineStyle: {
        opacity: 0
      },
      label: {
        show: true,
        color: color,
        opacity: 1,
        formatter: '{c}°'
      },
    }, {
      name: '最低',
      type: 'line',
      smooth: true,
      symbolSize: 0.00001,
      animationDuration: 0.01,
      // animation: false,
      symbolOffset: [0, '25px'],
      data: [te[0].min, te[0].min, te[1].min, te[2].min, te[3].min, te[4].min, te[5].min, te[6].min, te[7].min, te[8].min, te[9].min, te[10].min, te[11].min, te[12].min, te[13].min, te[14].min, te[14].min].map(Math.round),
      areaStyle: {
        color: color,
        opacity: 0.2,
        origin: 'start'
      },
      lineStyle: {
        opacity: 0
      },
      label: {
        show: true,
        color: color,
        opacity: 1,
        formatter: '{c}°'
      },

    }]
  };

  chart.setOption(option);
}

//降雨强度表配置
function setOptionYu(chart, ft, color) {
  var time = []
  //将要显示的降水强度数据格式化
  var formatQ = []
  ft.map((item, index) => {
    time.push(index + 1)
    formatQ.push([index, item * 100])

  })
  var kedu = []

  for (var i = 0; i <= 55; i++) {
    kedu.push(i / 100)

  }
  // console.log(kedu)
  var option = {
    // title: {
    //   text: '未来2小时降水强度',
    //   left: 'center'
    // },
    color: [color, color],
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      top: "10px",
      left: "15px",
      right: "10px",
      bottom: "20px"
    },
    // tooltip: {
    //   show: true,
    //   trigger: 'axis'
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: time,
      axisTick: {
        // show: false,
        interval: timeBiao,
        inside: true
      },
      axisLine: {
        lineStyle: {
          color: '#8c8c8c'
        }
      },
      axisLabel: {
        // show: false
        interval: timeBiao,
        formatter: (value, index) => {
          var now = new Date();
          switch (parseInt(value)) {
            case 1:
              var h1 = new Date(now.getTime() + 1000 * 60)
              return utils.addZero(h1.getHours()) + ":" + utils.addZero(h1.getMinutes())
            case 30:
              var h1 = new Date(now.getTime() + 1000 * 60 * 30)
              return utils.addZero(h1.getHours()) + ":" + utils.addZero(h1.getMinutes())
            case 60:
              var h1 = new Date(now.getTime() + 1000 * 60 * 60)
              return utils.addZero(h1.getHours()) + ":" + utils.addZero(h1.getMinutes())
            case 90:
              var h1 = new Date(now.getTime() + 1000 * 60 * 60 * 1.5)
              return utils.addZero(h1.getHours()) + ":" + utils.addZero(h1.getMinutes())
            case 120:
              var h1 = new Date(now.getTime() + 1000 * 60 * 60 * 2)
              return utils.addZero(h1.getHours()) + ":" + utils.addZero(h1.getMinutes())
          }
        },
        fontSize: 8,
        margin: 5
      },
      // show: false,

    },
    yAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
        interval: biao,
        inside: true
      },
      axisLine: {
        lineStyle: {
          color: '#8c8c8c'
        }
      },
      // splitNumber: 100,
      axisLabel: {
        // show: false
        interval: biao,
        formatter: (value, index) => {
          var re = ''
          if (value == 0.03) {
            re = '小'
          } else if (value == 0.25) {
            re = '中'
          } else if (value == 0.35) {
            re = '大'
          } else if (value == 0.48) {
            re = '暴'
          }
          return re
        },
        fontSize: 8,
        margin: 5
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          // color: 'red'
        },
        interval: biao,
        show: true
      },
      data: kedu
      // show: false,

    },

    series: [{
      name: '降雨强度',
      type: 'line',
      smooth: false,
      symbolSize: 0.0000000001,
      data: formatQ,
      sampling: 'average',
      animationDuration: 0.01,
      // animation: false,
      areaStyle: {
        color: color,
        opacity: 0.2,
        origin: 'start'
      },
      lineStyle: {
        opacity: 0
      },
      // itemStyle: {
      //   normal: {
      //     label: {
      //       show: true,
      //       color: color,
      //       opacity: 0.4
      //     }
      //   },
      // },
    }]
  };

  chart.setOption(option);
}

function biao(index, value) {
  if (value == 0.03 || value == 0.25 || value == 0.35 || value == 0.48) {
    return true
  }
  return false
}

function timeBiao(index, value) {
  if (value == 1 || value == 30 || value == 60 || value == 90 || value == 120) {
    return true
  }
}




Page({
  data: {
    sw: 0, //天气状况标记
    address: '', //地址
    alert: [], //预警
    info: '', //天气数据
    weatherDesc: '', //天气状况描述
    preTime: 0, //上次请求的时间
    nowCity: '', //现在的城市
    speed: 1, //风速
    color: '#8b8b8b', //主题颜色
    canvUrl: '', //气温面积图转成图片的地址
    yuUrl: '', //降水面积图的图片地址
    // yuWidth: 7260,
    isRain: true, //是否有降水
    load: false, //数据加载状态
    weatherIndex: -1, //选中的天气城市列表的下标,-1为当前定位的位置
    shareImg: '', //分享的图片地址
    ec: { //气温图
      lazyLoad: true
    },
    ec2: { //降水图
      lazyLoad: true
    },
    reqFail: false, //是否加载错误
    windH: 0,
    innerSrc: '', //语音文件的地址
    audioStatus: 0, //播放状态
    audioLoad: false, //加载状态
    tishi: false, //语音播报提示
    chanName: '', //当前选择的城市名字
    err: false, //广告组件错误状态
    darkMode: false, //夜间模式
    ad: false, //是否关闭广告
    icon: true, //显示小图标
    sunrise: '06:00', //日出
    sunset: '18:00', //日落
    battery: false, //电量提示
    batteryIcon: false, //电量是否见底
    batteryTime: 4, //电量提示倒计时
    cardShow: false, // 逐时天气详情显示
    openIndex: 0, // 逐时天气详情显示下标
    isClose: false, // 逐时天气详情显示关闭
    fu: false, // 逐天天气详情
    ADate: '',
    videoAd: false,
    yiqing: '', //疫情数据
    yi: '',
    shi: '',
    ydyi: '',
    ty: 0,
    newMoon: 30, //朔望月
  },
  claseItem() {
    var that = this
    that.setData({
      isClose: true
    })
    if (that.detailTimer == undefined) {
      that.detailTimer = -1
    }
    if (that.detailTimer > -2) {
      that.detailTimer = -3
      setTimeout(() => {
        that.setData({
          cardShow: false,
          fu: false,
          isClose: true
        })
        that.detailTimer = -1
      }, 150)
    }


  },
  openItem(ev) {
    var that = this
    // console.log()
    this.setData({
      cardShow: true,
      openIndex: ev.currentTarget.dataset.index,
      fu: ev.currentTarget.dataset.type || false,
      isClose: false
    })
  },
  onReady: function () {
    // console.log(wx.getStorageSync('darkMode'))
    // if (wx.getStorageSync('darkMode')) {
    //   // console.log(123)
    //   wx.setBackgroundColor({
    //     backgroundColor: '#434343',
    //   })
    // } else {
    //   wx.setBackgroundColor({
    //     backgroundColor: '#8c8c8c',
    //   })
    // }
  },
  onLoad: function () {
    this.initWietherIndex()
    var that = this
    // this.init((info, color) => {

    // })
    this.setData({
      tishi: wx.getStorageSync('tishi') === false ? false : true,
      windH: wx.getSystemInfoSync().windowHeight
    })
    wx.setKeepScreenOn({
      keepScreenOn: wx.getStorageSync("alwaysBright") || false,
    })

    //截屏后转发提示
    wx.onUserCaptureScreen(function (res) {
      wx.showModal({
        title: '小提示',
        content: '点击右上角 ••• 可以直接转发分享小程序哦~',
        showCancel: false,
        success(res) {}
      })
    })

    //手机电池电量提示
    // wx.getBatteryInfo({
    //   success(res) {
    //     var battery = false;
    //     var batteryIcon = false;
    //     if (res.level <= 10 && !res.isCharging) {
    //       battery = true
    //       batteryIcon = true
    //     } else if (res.level <= 20 && !res.isCharging) {
    //       battery = true
    //       batteryIcon = false
    //     } else {
    //       battery = false
    //       batteryIcon = false
    //     }
    //     that.setData({
    //       battery: battery,
    //       batteryIcon: batteryIcon
    //     })
    //   }
    // })
    // console.log(this.data.ADate)

  },
  onShow: function () {
    this.initWietherIndex()
    var that = this

    var icon = wx.getStorageSync('icon')

    if (typeof icon !== 'boolean') {
      wx.setStorageSync('icon', true)
      icon = true
    }
    var cal = A()

    // 计算月相
    var lunarDate = cal.lunarDate
    if (lunarDate > 10 && lunarDate < 15) {
      lunarDate = 10
    }
    if (lunarDate > 15 && lunarDate < 20) {
      lunarDate = 20
    }
    var dif = lunarDate - 15
    if (lunarDate < 15)
      dif = 15 - lunarDate

    this.setData({
      ad: wx.getStorageSync('ad'),
      icon: icon,
      ADate: cal,
      newMoon: 170 - 130 / 15 * dif
    })


    // that.batteryTimer = setInterval(() => {
    //   var batteryTime = that.data.batteryTime
    //   batteryTime--
    //   that.setData({
    //     batteryTime: batteryTime
    //   })
    //   if (batteryTime == 0) {
    //     clearInterval(that.batteryTimer)
    //     that.setData({
    //       battery: false,
    //       batteryTime: 0
    //     })
    //   }
    // }, 1000)

    this.init(() => {
      that.setData({
        preTime: new Date().getTime(),
        nowCity: that.data.address
      })
    })

  },
  adErr: function (ev) {
    // console.log(ev)
    this.setData({
      err: true
    })
  },
  adSuccess() {

  },
  onDark(ev) {
    this.setData({
      darkMode: ev.detail.dark
    })
    // console.log(ev.detail.dark)
    if (ev.detail.dark) {
      wx.setBackgroundColor({
        backgroundColor: '#131313'
      })
    } else {
      wx.setBackgroundColor({
        backgroundColor: '#f9f9f9',
      })
    }
  },
  myLoad: function () {
    this.setData({
      preTime: new Date().getTime() - 1000 * 60 * 5
    })

  },
  //绘制未来几天的图表，
  drawzuijin: function (te, color) {
    var that = this
    that.ecComponent = that.selectComponent('#mychart-dom-line');
    that.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, te, color);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      that.chart = chart;

      //图表绘制完的回调
      chart.on('finished', function () {
        //一定要有延迟
        setTimeout(() => {
          //将绘制完的图标转为图片，避免层级过高的问题
          const ecComponent = that.selectComponent('#mychart-dom-line');
          ecComponent.canvasToTempFilePath({
            success: res => {
              that.urlTobase64(res.tempFilePath, base64 => {
                that.setData({
                  canvUrl: base64
                })
              })

            },
            fail: res => console.log(res)
          });
        }, 10)

      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  urlTobase64: function (url, callBack) {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        if (callBack)
          callBack('data:image/png;base64,' + res.data)
      }
    })
  },
  backHome: function (ev) {
    wx.setStorage({
      key: 'weatherIndex',
      data: -1,
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  //绘制降雨图表
  drawyu: function (ft, color) {
    var that = this

    that.ecComponent2 = that.selectComponent('#mychart-dom-line2');
    that.ecComponent2.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOptionYu(chart, ft, color);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      that.chart = chart;

      //图表绘制完的回调
      chart.on('finished', function () {

        //一定要有延迟
        setTimeout(() => {
          //将绘制完的图标转为图片，避免层级过高的问题
          const ecComponent = that.selectComponent('#mychart-dom-line2');
          ecComponent.canvasToTempFilePath({
            success: res => {
              that.urlTobase64(res.tempFilePath, base64=>{
                that.setData({
                  yuUrl: base64
                })
              })
            },
            fail: res => console.log(res)
          });
        })

      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  //初始化当前选中的城市
  initWietherIndex: function () {
    var weatherIndex = wx.getStorageSync("weatherIndex")
    if (!weatherIndex && weatherIndex !== 0) {
      weatherIndex = -1
    }
    this.setData({
      weatherIndex: weatherIndex
    })
    wx.setStorageSync(
      'weatherIndex',
      weatherIndex,
    )
  },
  initYiQing: function (yiqing, sheng, shi) {
    this.setData({
      yiqing: yiqing,
      shi: shi
    })
    var zhixiashi = ['北京市', '天津市', '上海市', '重庆市', '香港', '澳门', '台湾']

    switch (sheng) {
      case '台湾省':
        sheng = '台湾';
        break;
      case '香港特别行政区':
        sheng = '香港';
        break;
      case '澳门特别行政区':
        sheng = '澳门';
        break;
    }

    for (var i in yiqing.newslist) {
      var se = yiqing.newslist[i]
      if (se.provinceName == sheng) {

        if (zhixiashi.indexOf(se.provinceName) != -1) {
          return se
        }

        for (var j in se.cities) {
          var si = se.cities[j]
          if (si.cityName + '市' == shi) {
            return si
          }
        }
      }
    }
  },
  getYiqing: function (sheng, shi, callback) {
    var yiqing = wx.getStorageSync('yiqing')
    var that = this
    var now = new Date()
    if (yiqing == '' || now.getTime() - yiqing.time > 1000 * 60 * 30) {
      wx.request({
        url: 'https://api.tianapi.com/txapi/ncovcity/index?key=',
        method: 'GET',
        success: function (res) {
          if (res.data.code == 200) {
            res.data.time = now.getTime()
            wx.setStorage({
              data: res.data,
              key: 'yiqing',
            })
            if (callback) {
              var a = that.initYiQing(res.data, sheng, shi)
              if (a != undefined) {
                var g = new Date(res.data.time)
                a.time = [g.getFullYear(), g.getMonth() + 1, g.getDate()].map(utils.addZero).join(".") + " " + [g.getHours(), g.getMinutes()].map(utils.addZero).join(":")
                callback(a)
              }
            }
          }
        }
      })
    } else {
      if (callback) {
        var a = that.initYiQing(yiqing, sheng, shi)
        if (a != undefined) {
          var g = new Date(yiqing.time)
          a.time = [g.getFullYear(), g.getMonth() + 1, g.getDate()].map(utils.addZero).join(".") + " " + [g.getHours(), g.getMinutes()].map(utils.addZero).join(":")
          callback(a)
        }
      }
    }

  },
  getYestodayYiQing: function (sheng, shi, callback) {
    var ydyiqing = wx.getStorageSync('ydyiqing')
    var that = this
    var now = new Date()
    var yesa = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    var yes = new Date(yesa.getFullYear(), yesa.getMonth(), yesa.getDate(), 23, 59, 59)
    var yesDay = [yes.getFullYear(), yes.getMonth() + 1, yes.getDate()].map(utils.addZero).join("-")
    if (ydyiqing == '' || yesDay != ydyiqing.yesDay) {
      wx.request({
        url: 'https://api.tianapi.com/txapi/ncovcity/index?key=&date=' + yesDay,
        method: 'GET',
        success: function (res) {
          if (res.data.code == 200) {
            res.data.yesDay = yesDay
            wx.setStorage({
              data: res.data,
              key: 'ydyiqing',
            })
            if (callback) {
              var a = that.initYiQing(res.data, sheng, shi)
              callback(a)
            }
          }
        }
      })
    } else {
      if (callback) {
        var a = that.initYiQing(ydyiqing, sheng, shi)
        callback(a)
      }
    }
  },

  //初始化：
  //  定位
  //  获取天气数据
  //  绘制图表
  //  下载分享图片
  //  指定语音文件地址
  init: function (callback) {
    wx.hideShareMenu()
    var that = this

    // app.request({
    //   uri: 'ping',
    //   fail() {
    //     wx.stopPullDownRefresh()
    //     that.setData({
    //       load: false,
    //       reqFail: true,
    //       preTime: new Date().getTime() - 1000 * 60 * 5,
    //     })
    //   }
    // })


    //显示顶部加载动画
    this.setData({
      load: true
    })
    //定位
    wx.getLocation({
      type: 'wgs84',
      fail(req) {
        //如果定位失败
        if (req.errMsg.indexOf('getLocation:fail auth deny') == -1) {
          wx.stopPullDownRefresh()
          that.setData({
            load: false,
            reqFail: true,
            preTime: new Date().getTime() - 1000 * 60 * 5,
          })
        }
      },
      complete(res2) {
        // console.log(res2)
        //没有定位权限，给一个默认值
        if (res2.errMsg != 'getLocation:ok') {
          res2.latitude = 30.27415
          res2.longitude = 120.15515

          // res2.latitude = 22.630576
          // res2.longitude = 120.306839
        }
        // console.log(that.data.weatherIndex)
        //选择的城市

        if (that.data.weatherIndex != -1) {
          var weatherList = wx.getStorageSync('weatherList') || [] //添加的城市id列表

          var city = wx.getStorageSync('city') || [] //所有城市
          // var cityArray = []
          city.map((item, index) => {
            if (item.id == weatherList[that.data.weatherIndex]) {
              res2.latitude = item.location.lat
              res2.longitude = item.location.lng
              that.setData({
                chanName: item.fullname
              })
            }
          })
        } else {
          that.setData({
            chanName: ''
          })
        }
        wx.setStorage({
          key: 'here',
          data: {
            latitude: res2.latitude,
            longitude: res2.longitude
          }
        })
        // 经纬度转地名
        qqMap.reverseGeocoder({
          location: {
            latitude: res2.latitude,
            longitude: res2.longitude
          },
          fail: function () {
            wx.stopPullDownRefresh()
            that.setData({
              load: false,
              reqFail: true,
              preTime: new Date().getTime() - 1000 * 60 * 5,
            })
          },
          complete: function (res) {
            if (res.message.indexOf('request:fail') != -1) {
              wx.stopPullDownRefresh()
              that.setData({
                load: false,
                reqFail: true,
                preTime: new Date().getTime() - 1000 * 60 * 5,
              })
            }
          },
          success: function (res) {
            // console.log(res)
            that.setData({
              address: res.result.ad_info.district
              // address: res.result.ad_info.district
            })
            var date = new Date()
            var time = date.getTime()
            // console.log(time - that.data.preTime)
            // console.log(that.data.nowCity)

            var sheng = res.result.ad_info.province
            var shi = res.result.ad_info.city
            if (sheng == '台湾省') {
              shi = '台湾省'
            }

            that.getYiqing(sheng, shi, (res) => {
              that.setData({
                yi: res
              })
            });

            that.getYestodayYiQing(sheng, shi, (res) => {
              that.setData({
                ydyi: res
              })
            });

            //避免频繁刷新
            if (time - that.data.preTime < 1000 * 60 * 2 && that.data.nowCity == that.data.address) {
              // wx.showToast({
              //   title: '稍等一会',
              //   icon: 'none'
              // })
              wx.stopPullDownRefresh()
              setTimeout(() => {
                that.setData({
                  load: false
                })

              }, 400)
              return;
            }


            // wx.showLoading()

            //请求天气数据
            wx.request({
              url: 'https://api.caiyunapp.com/v2/key/' + res2.longitude + ',' + res2.latitude + '/weather.json?alert=true&dailysteps=15&hourlysteps=360',
              method: "GET",
              data: {
                // long: res2.longitude,
                // dime: res2.latitude,
                // city: res.result.ad_info.city.replace('市', '')
              },
              success(res) {
                // console.log(res)
                // res.info.result.realtime.wind.speed = 2
                res.info = res.data
                that.setData({
                  info: res.info,
                  reqFail: false,
                  // sunrise: res.info.result.daily.astro[0].sunrise.time,
                  // sunset: res.info.result.daily.astro[0].sunset.time
                })

                //调用组件的方法
                // that.selectComponent('#default').darkMode()

                //保存部分天气数据，在生活指数页面使用
                wx.setStorage({
                  key: 'realtime',
                  data: res.info.result.realtime,
                })
                wx.setStorage({
                  key: 'daily',
                  data: res.info.result.daily,
                })



                //自定义转发的图片功能暂时禁用
                //转发的图片
                // wx.downloadFile({
                //   url: 'https://moxiaowei.com/xiaoxiaotianqijun2/' + utils.round(res.info.result.realtime.temperature) + '.' + res.info.result.realtime.skycon + '.' + utils.windDir(res.info.result.realtime.wind.direction) + '.' + utils.windJi(res.info.result.realtime.wind.speed) + '.' + utils.aqiSwitch(res.info.result.realtime.aqi) + '.' + utils.round(res.info.result.daily.temperature[0].min) + '.' + utils.round(res.info.result.daily.temperature[0].max) + '.' + that.data.address.replace(' ', '·') + '.800.1000.' + new Date().getTime() + '.png',
                //   success(res) {
                //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                //     if (res.statusCode === 200) {
                //       // console.log(res)
                //       that.setData({
                //         shareImg: res.tempFilePath
                //       })
                //     }
                //   }
                // })

                // res.info.result.alert = {
                //   "status": "ok",
                //   "content": [{
                //     "province": "辽宁省",
                //     "status": "预警中",
                //     "code": "0501",
                //     "description": "预计20日夜间到21日白天，渤海、渤海海峡、黄海北部西北风6级阵风7到8级21日上午转偏西风6级阵风7到8级，陆地西北风5到6级阵风7级21日上午转偏西风5到6级阵风7级，请注意防范。",
                //     "alertId": "21020041600000_20190120151503",
                //     "city": "大连市",
                //     "adcode": "210200",
                //     "pubtimestamp": 1547968578,
                //     "latlon": [
                //       38.914003,
                //       121.614682
                //     ],
                //     "county": "无",
                //     "source": "国家预警信息发布中心",
                //     "request_status": "ok",
                //     "location": "辽宁省大连市",
                //     "title": "大连市气象局发布大风蓝色预警[IV级/一般]",
                //     "regionId": "unknown"
                //   }, {
                //       "province": "辽宁省",
                //       "status": "预警中",
                //       "code": "0501",
                //       "description": "预计20日夜间到21日白天，渤海、渤海海峡、黄海北部西北风6级阵风7到8级21日上午转偏西风6级阵风7到8级，陆地西北风5到6级阵风7级21日上午转偏西风5到6级阵风7级，请注意防范。",
                //       "alertId": "21020041600000_20190120151503",
                //       "city": "大连市",
                //       "adcode": "210200",
                //       "pubtimestamp": 1547968578,
                //       "latlon": [
                //         38.914003,
                //         121.614682
                //       ],
                //       "county": "无",
                //       "source": "国家预警信息发布中心",
                //       "request_status": "ok",
                //       "location": "辽宁省大连市",
                //       "title": "大连市气象局发布大风蓝色预警[IV级/一般]",
                //       "regionId": "unknown"
                //     }]
                // }
                if (res.info.result.alert.content.length > 0) {
                  var alert = []
                  res.info.result.alert.content.map((item, index) => {
                    var title = item.title
                    var jibie = 0
                    if (title.indexOf('红色') != -1) {
                      jibie = 'red'
                    } else if (title.indexOf('橙色') != -1) {
                      jibie = 'orange'
                    }
                    if (title.indexOf('黄色') != -1) {
                      jibie = 'yellow'
                    }
                    if (title.indexOf('蓝色') != -1) {
                      jibie = 'blue'
                    }
                    var dengji = item.title.match(/.*(\[.*\]).*/)
                    dengji = dengji && dengji.length > 0 ? dengji[1] : ''
                    dengji = dengji.replace(/[\[ | \]]/g, "").split("/").filter(item => item ? item != "" : false)

                    title = title.substr(title.indexOf('发布') + 2).replace(/\[.*\]/, '')
                    alert.push({
                      title: title,
                      description: item.description,
                      jibie: jibie,
                      source: item.source,
                      dengji: dengji,
                      value: [title, ...dengji].join(" ")
                    })
                  })


                  that.setData({
                    alert: alert,
                  })
                  wx.setStorage({
                    key: 'alert',
                    data: alert,
                  })
                } else {
                  that.setData({
                    alert: []
                  })
                }

                // res.info.result.realtime.skycon = 'SNOW'


                var sw = ['CLEAR_DAY', 'CLEAR_NIGHT', 'PARTLY_CLOUDY_DAY', 'PARTLY_CLOUDY_NIGHT', 'CLOUDY', 'WIND', 'HAZE', 'RAIN', 'SNOW'].indexOf(res.info.result.realtime.skycon) + 1
                var weatherDesc = utils.weatherName(res.info.result.realtime.skycon)
                var color = utils.colorSwitch(res.info.result.realtime.skycon, res.info.result.realtime.temperature)
                // var color = utils.colorSwitch(res.info.result.realtime.skycon, 40)

                // that.setData({
                //   address: ad
                // })

                // switch (res.info.result.realtime.skycon) {
                //   case 'CLEAR_DAY':
                //     sw = 1;
                //     weatherDesc = '晴';
                //     color = '#ff9900';
                //     break;
                //   case 'CLEAR_NIGHT':
                //     sw = 2;
                //     weatherDesc = '晴';
                //     color = '#6b6b8b';
                //     break;
                //   case 'PARTLY_CLOUDY_DAY':
                //     sw = 3;
                //     weatherDesc = '多云';
                //     color = '#6b6b8b';
                //     break;
                //   case :
                //     sw = 4;
                //     weatherDesc = '多云';
                //     color = '#6b6b8b';
                //     break;
                //   case 'CLOUDY':
                //     sw = 5;
                //     weatherDesc = '阴';
                //     color = '#6b6b8b';
                //     break;
                //   case 'WIND':
                //     sw = 6;
                //     weatherDesc = '风';
                //     color = '#537a47';
                //     break;
                //   case 'HAZE':
                //     sw = 7;
                //     weatherDesc = '雾霾';
                //     color = '#5b5b5b';
                //     break;
                //   case 'RAIN':
                //     sw = 8;
                //     weatherDesc = '雨';
                //     color = '#5ab4db';
                //     break;
                //   case 'SNOW':
                //     sw = 9;
                //     weatherDesc = '雪';
                //     color = '#69a9dd';
                //     break;
                // }

                //
                //
                // 手动画图表，目前已经用echarts代替
                //
                //
                //
                // console.log(res.info.result.daily.temperature)

                // that.setData({
                //   canvUrl: ''
                // })

                var te = res.info.result.daily.temperature

                // var avg = 0;
                // var max = 0;
                // var min = 0
                // te.map((item, index) => {
                //   avg += item.avg
                //   if (item.max >= max)
                //     max = item.max
                //   if (item.min <= min)
                //     min = item.min
                // })

                // var mot = Math.abs(max - min);


                // avg = avg / te.length
                // var doi = 300 / 2


                // // 使用 wx.createContext 获取绘图上下文 context
                // const context = wx.createCanvasContext('secondCanvas')

                // var poi = wx.getSystemInfoSync().screenWidth / 720

                // // context.setStrokeStyle('#000000')
                // // context.setLineWidth(1)
                // // context.rect(0, 0, 605 * poi, 300 * poi)
                // // context.stroke()

                // context.beginPath()
                // context.moveTo(0, 300 * poi)
                // var i = 0;
                // context.setFillStyle(color)
                // context.setGlobalAlpha(0.2)
                // te.map((item, index) => {
                //   context.lineTo(i * (605 / (te.length - 1)) * poi, (140 - (item.max - avg) * (100 / mot)) * poi)
                //   i++
                // })
                // context.lineTo(605 * poi, 300 * poi)
                // context.closePath()
                // context.fill()

                // context.setFillStyle(color)
                // context.setGlobalAlpha(0.2)
                // context.beginPath()
                // context.moveTo(0, 300 * poi)
                // var j = 0;
                // te.map((item, index) => {
                //   context.lineTo(j * (605 / (te.length - 1)) * poi, (140 - (item.min - avg) * (100 / mot)) * poi)
                //   j++
                // })
                // context.lineTo(605 * poi, 300 * poi)
                // context.closePath()
                // context.fill()

                // context.setFillStyle(color)
                // context.setGlobalAlpha(1)
                // context.setFontSize(13)
                // var f = 0;
                // te.map((item, index) => {
                //   context.fillText(Math.round(item.max) + '°', f * (605 / (te.length - 0.65)) * poi, (140 - (item.max - avg) * (100 / mot) - 15) * poi)
                //   context.fillText(Math.round(item.min) + '°', f * (605 / (te.length - 0.65)) * poi, (140 - (item.min - avg) * (100 / mot) + 30) * poi)
                //   f++
                // })

                // // context.setFontSize(20)
                // // context.fillText('Hello', 20, 20)
                // // context.fillText('MINA', 100, 100)


                // // //清空本地临时文件
                // // wx.getSavedFileList({
                // //   success(res) {
                // //     if (res.fileList.length > 0) {
                // //       wx.removeSavedFile({
                // //         filePath: res.fileList[0].filePath,
                // //         complete(res) {
                // //           console.log(res)
                // //         }
                // //       })
                // //     }
                // //   }
                // // })



                // context.draw(false, () => {
                //   wx.canvasToTempFilePath({
                //     canvasId: 'secondCanvas',
                //     success(res) {
                //       context.clearRect(0, 0, 690 * poi, 300 * poi)
                //       context.draw()
                //       that.setData({
                //         canvUrl: res.tempFilePath
                //       })
                //     }
                //   }, this)
                // })

                //用echarts画未来几天气温图表
                that.setData({
                  canvUrl: '',
                })
                setTimeout(() => {
                  that.drawzuijin(te, color)
                }, 10);


                //短频降水
                // that.setData({
                //   yuUrl: '',
                // })

                var ft = res.info.result.minutely.precipitation_2h
                // var ft = [0.1, 0.2, 0.0211, 0.0104, 0.0033, 0.0, 0.0, 0.0, 0.0, 0.0, 0.001, 0.0016, 0.0018, 0.0016, 0.001, 0.0, 0.0, 0.0, 0.0, 0.0027, 0.0096, 0.0208,
                //   0.0369, 0.0559, 0.0755, 0.0934, 0.1072, 0.1146, 0.1139, 0.1068, 0.0958, 0.0831, 0.0712, 0.0625, 0.0587, 0.0588, 0.061, 0.0635, 0.0646, 0.0625,
                //   0.056, 0.0461, 0.034, 0.0214, 0.0096, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.48, 0.0188, 0.0279, 0.0388, 0.0521, 0.0676, 0.084, 0.0996,
                //   0.1128, 0.1218, 0.125, 0.1213, 0.1121, 0.0995, 0.0857, 0.0726, 0.0625, 0.0568, 0.0549, 0.0557, 0.058, 0.0606, 0.0625, 0.0627, 0.0615, 0.0593,
                //   0.0567, 0.0541, 0.0521, 0.0509, 0.0502, 0.0494, 0.0481, 0.0457, 0.0417, 0.0357, 0.0283, 0.0202, 0.0123, 0.0053, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                //   0.0, 0.0008, 0.0011, 0.001, 0.0007, 0.0003, 0.0, 0.0, 0.0, 0.0, 0.0001, 0.0002, 0.0, 0.0, 0.0, 0.0001, 0.0018, 0.0051, 0.0104, 0.0181, 0.5
                // ]
                // var avg = 0;
                // var max = 0;
                // var min = 0
                // ft.map((item, index) => {
                //   avg += item
                //   if (item >= max)
                //     max = item
                //   if (item <= min)
                //     min = item
                // })
                // if (avg <= 0) {
                //   that.setData({
                //     isRain: false
                //   })
                // } else {

                //   var mot = Math.abs(max - min);
                //   // console.log(Math.abs(max - min))

                //   avg = avg / ft.length
                //   // console.log(avg)
                //   var doi = 300 / 2
                //   // 使用 wx.createContext 获取绘图上下文 context
                //   const ctx = wx.createCanvasContext('yu')

                //   // var poi = wx.getSystemInfoSync().screenWidth / 720

                //   // context.setStrokeStyle('#000000')
                //   // context.setLineWidth(1)
                //   // context.rect(0, 0, 605 * poi, 300 * poi)
                //   // context.stroke()
                //   that.setData({
                //     yuWidth: 7260
                //   })

                //   ctx.beginPath()
                //   ctx.moveTo(0, 300 * poi)
                //   var i = 0;
                //   ctx.setFillStyle(color)
                //   ctx.setGlobalAlpha(0.2)

                //   ft.map((item, index) => {
                //     // console.log(i * (7260 / (ft.length - 1)) * poi, (200 - (item - avg) * (530 / 1)) * poi)
                //     if (item <= 0) {
                //       ctx.lineTo(i * (7260 / (ft.length - 1)) * poi, 300 * poi)
                //     } else {
                //       ctx.lineTo(i * (7260 / (ft.length - 1)) * poi, (262 - (item) * (530 / 1)) * poi)
                //       // ctx.fillText(item, i * (7260 / (ft.length - 1)) * poi, (250 - (item - avg) * (530 / 1)) * poi)
                //     }
                //     i++
                //   })
                //   ctx.lineTo(7260 * poi, 300 * poi)
                //   ctx.closePath()
                //   ctx.fill()

                //   ctx.setFillStyle('#8c8c8c')
                //   ctx.setGlobalAlpha(1)
                //   ctx.setFontSize(10)

                //   // ctx.fillText('0h', 0, 285 * poi)

                //   // ctx.fillText('1h', 7260 * poi / 2, 285 * poi)

                //   // ctx.fillText('2h', (7260-30) * poi, 285 * poi)

                //   // ctx.fillText('2h', (7260 - 30) * poi, 285 * poi)

                //   // ctx.beginPath()
                //   // ctx.setLineWidth(1 * poi)
                //   // ctx.moveTo(0, 265*poi)
                //   // ctx.lineTo(7260 * poi, 265 * poi)
                //   // ctx.closePath()
                //   // ctx.stroke()


                //   ctx.beginPath()
                //   ctx.setLineWidth(0.1 * poi)
                //   ctx.moveTo(0, 265 * (1 - 0.07) * poi)
                //   ctx.lineTo(7260 * poi, 265 * (1 - 0.07) * poi)
                //   ctx.closePath()
                //   ctx.stroke()

                //   ctx.beginPath()
                //   ctx.setLineWidth(0.3 * poi)
                //   ctx.moveTo(0, 265 * (1 - 0.5) * poi)
                //   ctx.lineTo(7260 * poi, 265 * (1 - 0.5) * poi)
                //   ctx.closePath()
                //   ctx.stroke()

                //   ctx.beginPath()
                //   ctx.setLineWidth(0.5 * poi)
                //   ctx.moveTo(0, 265 * (1 - 0.7) * poi)
                //   ctx.lineTo(7260 * poi, 265 * (1 - 0.7) * poi)
                //   ctx.closePath()
                //   ctx.stroke()

                //   ctx.beginPath()
                //   ctx.setLineWidth(0.9 * poi)
                //   ctx.moveTo(0, 265 * (1 - 0.94) * poi)
                //   ctx.lineTo(7260 * poi, 265 * (1 - 0.94) * poi)
                //   ctx.closePath()
                //   ctx.stroke()

                //   ctx.setFontSize(8)
                //   var f = 0;
                //   ft.map((item, index) => {
                //     if (f + 1 == 1) {
                //       ctx.fillText(f + 1 + "分钟后", f * (7260 / (ft.length - 1)) * poi, 285 * poi)
                //     } else {
                //       ctx.fillText(f + 1 + "'", f * (7260 / (ft.length - 1)) * poi, 285 * poi)
                //     }
                //     f++
                //   })

                //   setTimeout(() => {
                //     ctx.draw(false, () => {
                //       wx.canvasToTempFilePath({
                //         canvasId: 'yu',
                //         success(res) {
                //           // console.log(res.tempFilePath)
                //           // wx.navigateTo({
                //           //   url: '/pages/index/rain/rain?tempImg=' + res.tempFilePath,
                //           // })
                //           that.setData({
                //             yuUrl: res.tempFilePath
                //           })
                //         },
                //       }, this)
                //     })
                //   }, 200)


                // }

                var isRain = 0
                ft.map((item, index) => {
                  if (item > 0) {
                    isRain = item
                  }
                })

                if (isRain > 0) {
                  that.setData({
                    yuUrl: ''
                  })
                  setTimeout(() => {
                    that.drawyu(ft, color)
                  }, 10);
                } else {
                  that.setData({
                    isRain: false
                  })
                }





                var speed = res.info.result.realtime.wind.speed
                // var speed = s == 0 ? 1 : s

                var alert = ''

                for (var i in res.info.result.alert.content) {
                  alert += res.info.result.alert.content[i].description
                }

                // var innerAudio = app.globalData.innerAudio

                // innerAudio.onPlay(() => {
                //   // console.log('play')
                //   that.setData({
                //     audioStatus: 1,
                //     audioLoad: false
                //   })
                // })

                // innerAudio.onStop(() => {
                //   // console.log('stop')
                //   that.setData({
                //     audioStatus: 0,
                //     audioLoad: false
                //   })
                // })
                // innerAudio.onEnded(() => {
                //   // console.log('stop')
                //   that.setData({
                //     audioStatus: 0,
                //     audioLoad: false
                //   })
                // })

                // innerAudio.onError((res) => {
                //   console.log(res)
                //   that.setData({
                //     audioStatus: 0,
                //     audioLoad: false
                //   })
                // })

                // var wuyinurl = "yuyin.mp3?text=" +
                //   encodeURI((that.data.chanName == '' ? that.data.address : that.data.chanName) + '，当前温度，' + (utils.round(res.info.result.realtime.temperature) + '°').replace('-', '零下') + '，' + weatherDesc + '，' +
                //     // "最高温度" +
                //     // (utils.round(res.info.result.daily.temperature[0].max) + '°').replace('-', '零下') +
                //     // '最低温度' +
                //     // (utils.round(res.info.result.daily.temperature[0].min) + '°').replace('-', '零下') +
                //     // ',' + 
                //     utils.windDir(res.info.result.realtime.wind.direction) + utils.windJi(res.info.result.realtime.wind.speed) + '，空气质量' + utils.aqiSwitch(res.info.result.realtime.aqi) +
                //     '。' + alert)

                // app.request({
                //   uri: wuyinurl
                // })

                that.setData({
                  sw: sw,
                  weatherDesc: weatherDesc,
                  speed: speed,
                  color: color,
                  load: false,
                  // innerAudio: innerAudio,
                  // innerSrc: "https://moxiaowei.com/xiaoxiaotianqijun2/" + wuyinurl
                })

                wx.setStorage({
                  key: 'color',
                  data: color,
                })
                if (that.data.weatherIndex == -1) {
                  wx.setStorage({
                    key: 'default',
                    data: {
                      address: that.data.address,
                      weatherDesc: weatherDesc,
                      weather: res.info.result.realtime.skycon,
                      wendu: res.info.result.realtime.temperature,
                      fengName: res.info.result.realtime.wind.direction,
                      fengji: res.info.result.realtime.wind.speed,
                      kongqi: res.info.result.realtime.aqi,
                      color: color
                    },
                  })
                  wx.setStorage({
                    key: 'localDe',
                    data: {
                      fullname: that.data.address.replace(' ', ''),
                      allName: that.data.address.replace(' ', ''),
                      id: '-1',
                      location: {
                        lat: '' + res2.latitude,
                        lng: '' + res2.longitude
                      }
                    },
                  })
                  wx.setStorageSync('sunrise', res.info.result.daily.astro[0].sunrise.time)
                  wx.setStorageSync('sunset', res.info.result.daily.astro[0].sunset.time)
                }

                if (callback) {
                  callback(res.info, color)
                }

                wx.stopPullDownRefresh()
                // wx.hideLoading()
                wx.showShareMenu()

              },
              fail() {
                that.setData({
                  load: false,
                  reqFail: true,
                  preTime: new Date().getTime() - 1000 * 60 * 5,
                })
              }
            })
          }
        });
      }
    })
  },
  //播放/停止，语音文件
  // play: function () {
  //   var innerAudio = this.getAudio()
  //   // console.log(this.data.audioStatus)
  //   if (this.data.audioStatus == 0) {
  //     innerAudio.play()
  //     this.setData({
  //       audioLoad: true
  //     })
  //     wx.setStorage({
  //       key: 'tishi',
  //       data: false,
  //     })
  //     this.close()
  //   } else if (this.data.audioStatus == 1) {
  //     innerAudio.stop()
  //   } else if (this.data.audioStatus == 2) {
  //     innerAudio.play()
  //   }
  // },
  //获取全局audio实例，并且设置url，避免重复的url设置
  // getAudio: function () {
  //   var innerAudio = app.globalData.innerAudio
  //   // console.log(innerAudio.src != this.data.innerSrc)
  //   if (innerAudio.src != this.data.innerSrc) {
  //     innerAudio.src = this.data.innerSrc
  //   }
  //   return innerAudio
  // },
  jump: function (ev) {
    wx.navigateTo({
      url: ev.currentTarget.dataset.path,
    })
  },
  close: function () {
    this.setData({
      tishi: false
    })
  },
  topbind() {
    this.setData({
      battery: false
    })
  },
  openRili() {
    // wx.showLoading()
    wx.navigateToMiniProgram({
      appId: 'wxa3c23ab733382323',
      extraData: {
        color: this.data.color,
        darkMode: this.data.darkMode
      },
      envVersion: 'develop',
      complete() {
        // wx.hideLoading()
      }
    })
  },

  adLoad() {
    this.setData({
      videoAd: true
    })
  },
  adError(err) {
    this.setData({
      videoAd: false
    })
  },
  adClose() {
    this.setData({
      videoAd: false
    })
  },

  onPullDownRefresh: function () {
    //下拉振动反馈
    wx.vibrateShort()
    var that = this
    this.init(() => {
      that.setData({
        preTime: new Date().getTime(),
        nowCity: that.data.address,
      })
    })

  },
  onShareAppMessage: function () {
    return {
      title: '来自' + this.data.address.replace(' ', '') + '的实时天气。',
      path: '/pages/index/index',
      // imageUrl: this.data.shareImg,
    }
  },
  onPageScroll: function (op) {
    // console.log(op.scrollTop)
  }
})