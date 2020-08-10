// pages/search/search.js

const app = getApp()
var QQMapWX = require('../../static/lib/qqmap-wx-jssdk.min.js');
var qqMap = new QQMapWX({
  key: 'M26BZ-J263J-RJ6FY-KK3GJ-H7WLS-Q6FCL' // 必填
});

const TweenMax = require('../../static/js/TweenMax.min.js')

var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    load: false,
    // here: wx.getStorageSync('here'),
    // color: wx.getStorageSync('color'), //主题颜色
    // moveX: [],
    index: -1, //删除的时候当前选择的对象
    moveDis: 0, //删除动画的定点位置
    start: 0, //删除的时候，start事件的x坐标
    startY: 0, //y坐标
    poi: wx.getSystemInfoSync().windowWidth / 750,
    // timer: -1,
    // timer2: -1,
    isRe: false, //是否处于删除状态
    def: wx.getStorageSync('default'), //当前位置的天气信息
    cityList: [], //城市列表
    delHeight: 240, //删除时的小时动画，高度
    delLeft: 0, //删除时候的小时动画，左移距离
    delIndex: -2, //删除时候选择的对象
    delBottom: 35, //删除时候的消失动画，bottom距离
    delOpacity: 1, //删除时候的消失动画，透明度
    moveTop: [], //移动时候的动画参数，数组，储存的当前列表每个项目的top距离
    isMove: false, //是否开启移动状态
    moveIndex: -2, //当前移动的对象
    moveing: false, //谁都处于移动状态
    moveDir: -1, //移动的方向，0上，1下
    reqFail: false, //加载错误的状态
    scopeLoca: '当前位置',
    darkMode: false,
    windH: wx.getSystemInfoSync().windowHeight,

    // delWidth: 83 //px
  },
  back: function (ev) { //返回的主页面，路由实质为重定向
    // console.log(this.data.moveDis)

    //处于删除中和移动中的时候，禁用返回
    if (this.data.isMove) {
      this.setData({
        isMove: false
      })
      return
    }
    if (this.data.moveDis < 0) {
      return;
    }
    // console.log(ev.currentTarget.dataset.id)
    wx.setStorage({
      key: 'weatherIndex',
      data: ev.currentTarget.dataset.id,
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })

  },
  move: function (ev) {
    var that = this

    if (Math.abs(this.data.start - ev.changedTouches[0].clientX) < Math.abs(this.data.startY - ev.changedTouches[0].clientY)) {
      return
    }
    // var moveX = this.data.moveX
    // moveX.push(ev.changedTouches[0].clientX)
    // // console.log(moveX)
    // var max = 0;
    // var min = 100000;
    // this.data.moveX.map((item, index)=>{
    //   if(item >= max)
    //     max = item
    //   if(item <= min)
    //     min = item
    // })
    // var diff = max - min
    // console.log(ev)
    if (this.data.isMove) {
      return
    }
    if (this.data.isRe || this.data.moveDis <= -80) {
      // this.setData({
      //   start: ev.changedTouches[0].clientX
      // })
      return
    }
    this.setData({
      index: ev.currentTarget.dataset.id,
    })
    var curr = ev.changedTouches[0].clientX
    var diff = curr - this.data.start
    // console.log(diff, this.data.timer2)
    if (diff > 0) {
      // diff = 0
      // console.log(diff)
      // diff = this.data.moveDis
      // if (diff >= 0) {
      diff = 0
    }
    //  else {
    //     var j = 1;
    //     var timer2 = setInterval(() => {
    //       if (diff >= 0) {
    //         diff = 0
    //         clearInterval(timer2)
    //         this.setData({
    //           timer2: -1
    //         })
    //       }
    //       if (diff < 0)
    //         diff += j++

    //         this.setData({
    //           moveDis: diff,
    //         })
    //     }, 5)
    //     this.setData({
    //       timer2: timer2
    //     })
    // }

    // this.setData({
    //   moveDis: diff,
    //   index: ev.currentTarget.dataset.id,
    // })
    // } else {
    if (diff <= -80) {
      diff = -80
      this.setData({
        isRe: true,
      })
    }
    this.setData({
      moveDis: diff,
      // moveX: moveX
    })
    // }


  },
  start: function (ev) {
    // console.log(ev.changedTouches[0].clientX)
    // if(this.data.moveDis <0){
    //   this.setData({
    //     moveDis: 0
    //   })
    // }

    if (this.data.isMove) {
      return
    }

    if (this.data.moveDis < 0) {
      if (this.data.index != ev.currentTarget.dataset.id) {
        this.setData({
          isRe: false,
          moveDis: 0
        })
      } else {
        this.goBack()
      }
    }

    this.setData({
      start: ev.changedTouches[0].clientX,
      startY: ev.changedTouches[0].clientY
    })
  },
  end: function (ev) {

    if (this.data.isMove) {
      return
    }


    var curr = ev.changedTouches[0].clientX
    var diff = curr - this.data.start


    if (diff < -35) {
      this.ant(-80)
      this.setData({
        isRe: true
      })
    } else {
      this.goBack()
      this.setData({
        // moveX: [],
        // index: -1,
        start: 0,
      })
    }

    this.setData({
      isMove: false,
      moveIndex: -2
    })

  },
  //封装的移动动画，动画到指定的位置
  ant: function (left) {
    var that = this
    var a = {
      diff: this.data.moveDis
    }
    TweenMax.to(a, 0.1, {
      diff: left,
      onUpdateParams: [a, "diff"],
      onUpdate: res => {
        // console.log(res)
        that.setData({
          moveDis: res.diff
        })
      },
      onComplete: () => {
        wx.vibrateShort()
      }
    })
  },
  //左滑动的时候，返回的正常状态
  goBack: function () {
    var that = this
    var a = {
      diff: this.data.moveDis
    }
    TweenMax.to(a, 0.15, {
      diff: 0,
      onUpdateParams: [a, "diff"],
      onUpdate: res => {
        // console.log(res)
        that.setData({
          moveDis: res.diff,
        })
      },
      onComplete: () => {
        that.setData({
          isRe: false
        })
      }
    })

    // this.setData({
    //   isRe: false,
    //   moveDis: 0
    // })
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/search/desc/desc',
    })
  },
  shezhi: function () {
    wx.navigateTo({
      url: '/pages/shezhi/shezhi',
    })
  },
  del: function (ev) {

    var that = this

    var index = ev.currentTarget.dataset.index
    this.setData({
      delIndex: index
    })

    TweenMax.data = {
      delHeight: 240,
      delLeft: 0,
      delBottom: 35,
      delOpacity: 1
    }
    TweenMax.to(TweenMax.data, 0.4, {
      delHeight: 0,
      delLeft: -800,
      delBottom: 0,
      delOpacity: 0,
      // ease: TweenMax.Power0.easeNone,
      onUpdateParams: [TweenMax.data],
      onUpdate: res => {
        // console.log(res)
        that.setData({
          delHeight: res.delHeight,
          delLeft: res.delLeft,
          delBottom: res.delBottom,
          delOpacity: res.delOpacity
        })
      },
      onComplete: () => {


        // console.log(index)
        var weatherList = wx.getStorageSync('weatherList') || [] //添加的城市列表
        weatherList.splice(index, 1)

        var cityList = that.data.cityList
        cityList.splice(index, 1)
        that.setData({
          cityList: cityList,
          index: -1
        })
        that.setData({
          moveDis: 0,
          isRe: false,
          delHeight: 240,
          delLeft: 0,
          delBottom: 35,
          delOpacity: 1
        })
        wx.setStorage({
          key: 'weatherList',
          data: weatherList,
        })
        var weatherIndex = wx.getStorageSync('weatherIndex')
        if (weatherIndex >= index) {
          wx.setStorage({
            key: 'weatherIndex',
            data: -1,
          })
        }
      }
    })


  },
  longt: function (ev) {
    // console.log(ev)
    var that = this
    this.setData({
      isMove: !that.data.isMove,
      moveDis: 0,
      isRe: false
      // moveIndex : ev.currentTarget.dataset.id
    })
  },
  //向上移动
  shang: function (ev) {
    // console.log('shang')
    this.moveSwitch(0, ev.currentTarget.dataset.id)
    // this.opUp()
  },
  //向下移动
  xia: function (ev) {
    this.moveSwitch(1, ev.currentTarget.dataset.id)
    // this.opDown()
  },
  //上下交换位置
  moveSwitch: function (dir, index2) {
    // console.log(index2)
    if (this.data.moveing) {
      return
    }
    this.setData({
      moveDir: -1
    })
    this.setData({
      moveing: true,
      moveDir: dir == 0 ? 1 : 2
    })
    var that = this
    // console.log(dir, index2)
    var moveTop = this.data.moveTop

    var to = (dir == 0 ? -270 : 270)

    // console.log(moveTop)

    var movet = []
    movet.push(...moveTop)

    TweenMax.data = {
      moveTop: movet
    }

    for (var i in moveTop) {
      if (i == index2) {
        if (i - 1 >= 0 && to < 0) {
          // console.log(i + 1)
          moveTop[i - 1] = moveTop[i - 1] - to
        }
        moveTop[i] = moveTop[i] + to
        if (parseInt(i) + 1 < moveTop.length && to > 0) {
          // console.log(to)
          moveTop[parseInt(i) + 1] = moveTop[parseInt(i) + 1] - to
        }
      }
    }

    TweenMax.to(TweenMax.data, 0.4, {
      moveTop: moveTop,
      // ease: TweenMax.Power2.easeOut,
      onUpdateParams: [TweenMax.data],
      onUpdate: res => {
        var movee = res.moveTop
        if (typeof (movee) == 'string') {
          movee = movee.split(",")
        }
        that.setData({
          moveTop: movee,
          // cityList: cityList
        })
        // console.log(that.data.moveTop)
      },
      onComplete: () => {
        var cityList = that.data.cityList
        var weatherList = wx.getStorageSync('weatherList') || []

        var weatherIndex = wx.getStorageSync("weatherIndex")

        if (to < 0) {
          var temp = cityList[index2]
          cityList[index2] = cityList[index2 - 1]
          cityList[index2 - 1] = temp

          var temp = weatherList[index2]
          weatherList[index2] = weatherList[index2 - 1]
          weatherList[index2 - 1] = temp


          if (weatherIndex === index2) {
            weatherIndex--
          } else if (weatherIndex === index2 - 1) {
            weatherIndex++
          }
        }
        if (to > 0) {
          var temp = cityList[index2]
          cityList[index2] = cityList[index2 + 1]
          cityList[index2 + 1] = temp

          var temp = weatherList[index2]
          weatherList[index2] = weatherList[index2 + 1]
          weatherList[index2 + 1] = temp

          if (weatherIndex === index2) {
            weatherIndex++
          } else if (weatherIndex === index2 + 1) {
            weatherIndex--
          }
        }


        // console.log(moveTop)
        var movett = []
        for (var i in that.data.cityList) {
          movett.push(0)
        }
        that.setData({
          moveTop: movett,
          cityList: cityList,
          moveing: false
        })
        wx.setStorage({
          key: 'weatherList',
          data: weatherList,
        })
        wx.setStorage({
          key: 'weatherIndex',
          data: weatherIndex,
        })
      }
    })



  },

  // opUp: function(){
  //   var that = this
  //   TweenMax.data={
  //     op: 0.1
  //   }
  //   TweenMax.to(TweenMax.data, 0.4, {
  //     op: 1,
  //     onUpdateParams: [TweenMax.data],
  //     onUpdate: res=>{
  //       that.setData({
  //         moveOpUp: res.op
  //       })
  //     }
  //   })
  // },
  // opDown: function () {
  //   var that = this
  //   TweenMax.data = {
  //     op: 1
  //   }
  //   TweenMax.to(TweenMax.data, 0.4, {
  //     op: 0.1,
  //     onUpdateParams: [TweenMax.data],
  //     onUpdate: res => {
  //       that.setData({
  //         moveOpUp: res.op
  //       })
  //     }
  //   })
  // },

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      // color: wx.getStorageSync('color'),
      // here: wx.getStorageSync('here'),
      def: wx.getStorageSync('default'),
    })
    // console.log(this.data.def)


    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          that.setData({
            scopeLoca: '没有定位权限'
          })
        } else {
          that.setData({
            scopeLoca: '当前位置'
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var weatherList = wx.getStorageSync('weatherList') || [] //添加的城市id列表
    // if (weatherList.length <= 0) {
    //   return
    // }
    var city = wx.getStorageSync('city') || [] //所有城市
    var cityArray = []
    cityArray.push(wx.getStorageSync('localDe'))
    var that = this
    weatherList.map((item, index) => {
      city.map((item2, index2) => {
        if (item2.id == item) {
          cityArray.push(item2)
        }
      })
    })

    this.setData({
      load: true
    })
    // console.log(cityArray)
    // app.request({
    //   uri: 'cityArray',
    //   method: 'POST',
    //   data: {
    //     array: cityArray
    //   },
    //   success: res => {
    //     // console.log(res)

    //     var def = res[0]

    //     var deff = wx.getStorageSync('default')
    //     // console.log(def)
    //     deff.weatherDesc = utils.weatherName(def.json.result.skycon)
    //     deff.weather = def.json.result.skycon
    //     deff.wendu = def.json.result.temperature
    //     deff.fengName = def.json.result.wind.direction
    //     deff.fengji = def.json.result.wind.speed
    //     deff.kongqi = def.json.result.aqi
    //     deff.color = utils.colorSwitch(def.json.result.skycon, def.json.result.temperature)

    //     // console.log(deff)



    //     res.splice(0, 1)
    //     var moveTop = []
    //     for (var i in res) {
    //       moveTop.push(0)
    //     }
    //     // console.log(moveTop)
    //     // wx.setStorage({
    //     //   key: 'default',
    //     //   data: deff,
    //     // })
    //     // console.log(res)

    //     that.setData({
    //       cityList: res,
    //       load: false,
    //       moveTop: moveTop,
    //       reqFail: false,
    //       def: deff
    //     })

    //   },
    //   fail() {
    //     that.setData({
    //       reqFail: true,
    //       load: false
    //     })
    //   }
    // })

    this.requestArray(cityArray, 0, res => {
      var def = res[0]

      var deff = wx.getStorageSync('default')
      // console.log(def)
      deff.weatherDesc = utils.weatherName(def.json.result.skycon)
      deff.weather = def.json.result.skycon
      deff.wendu = def.json.result.temperature
      deff.fengName = def.json.result.wind.direction
      deff.fengji = def.json.result.wind.speed
      deff.kongqi = def.json.result.aqi
      deff.color = utils.colorSwitch(def.json.result.skycon, def.json.result.temperature)

      // console.log(deff)



      res.splice(0, 1)
      var moveTop = []
      for (var i in res) {
        moveTop.push(0)
      }
      // console.log(moveTop)
      // wx.setStorage({
      //   key: 'default',
      //   data: deff,
      // })
      // console.log(res)

      that.setData({
        cityList: res,
        load: false,
        moveTop: moveTop,
        reqFail: false,
        def: deff
      })
      // console.log(res)
    })


  },

  requestArray: function (cityArray, index, callBack) {
    var item = cityArray[index]
    var that = this
    wx.request({
      url: 'https://api.caiyunapp.com/v2/ulDhbo1arxuEBc7y/' + item.location.lng + ',' + item.location.lat + '/realtime.json',
      method: 'GET',
      success(res) {
        item.json = res.data
        item.city = item.fullname
        index++
        if (index == cityArray.length) {
          if (callBack) {
            callBack(cityArray)
          }
        } else {
          that.requestArray(cityArray, index, callBack)
        }
      },
      fail() {
        that.setData({
          reqFail: true,
          load: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})