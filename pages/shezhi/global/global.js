// pages/shezhi/global/global.js

var TweenMax = require("../../../static/js/TweenMax.min.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: wx.getStorageSync('color'),
    index: 0,
    array: [[
      '自定义', '日落日出', '总是开启']
    ],
    sw: wx.getStorageSync('dark') || false,
    oneTop: -105,
    oneShow: false,
    startTime: '23:00',
    endTime: '06:00',
    twoTop: -210,
    twoShow: false,
    darkMode: false,
    windH: wx.getSystemInfoSync().windowHeight,
    ad: false,//是否关闭广告
    icon: true, //现实小图标
    alwaysBright: false, //显示器常亮
    theme: undefined //系统是否支持黑暗模式
  },
  //夜间模式
  darkMode() {
    //调用组件的方法
    this.selectComponent('#default').darkMode()
  },
  onDark(ev) {
    this.setData({
      darkMode: ev.detail.dark,
      theme: ev.detail.theme
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
  change(ev) {
    wx.setStorageSync('dark', ev.detail.value)
    
    this.setData({
      sw: ev.detail.value
    })
    this.turn()
    this.darkMode()
  },
  brightChange(ev){
    wx.setStorageSync('alwaysBright', ev.detail.value)
    this.setData({
      alwaysBright: ev.detail.value
    })
    wx.setKeepScreenOn({
      keepScreenOn: ev.detail.value,
      // success(){
      //   console.log("success")
      // }
    })
  },
  adChange(ev){
    // wx.setStorage({
    //   key: 'ad',
    //   data: ev.detail.sw,
    // })
    wx.setStorageSync('ad', ev.detail.value)
    this.setData({
      ad: ev.detail.value
    })
  },
  iconChange(ev){
    // wx.setStorage({
    //   key: 'icon',
    //   data: ev.detail.sw,
    // })
    wx.setStorageSync('icon', ev.detail.value)
    this.setData({
      icon: ev.detail.value
    })
  },
  bindStartTimeChange(ev) {
    this.setData({
      startTime: ev.detail.value
    })
    wx.setStorageSync('startTime', ev.detail.value)
    this.darkMode()
  },
  bindEndTimeChange(ev) {
    this.setData({
      endTime: ev.detail.value
    })
    wx.setStorageSync('endTime', ev.detail.value)
    this.darkMode()
  },
  turn() {
    this.setData({
      oneShow: true
    })
    var _this = this
    var top = !this.data.sw ? 0 : (this.data.index == 0 ? - 315 : -105)
    var toT = top == 0 ? (this.data.index == 0 ? - 315 : -105) : 0
    TweenMax.data = {
      top: top
    }
    TweenMax.to(TweenMax.data, 0.3, {
      top: toT,
      onUpdateParams: [TweenMax.data],
      onUpdate: res => {
        // console.log(res)
        _this.setData({
          oneTop: res.top
        })
      },
      onComplete: () => {
        if (!_this.data.sw) {
          _this.setData({
            oneShow: false
          })
        }
      }
    })
  },
  turnTwo() {
    this.setData({
      twoShow: true
    })
    
    var _this = this
    var top = this.data.index != 0 ? 0 : -210
    var toT = top == 0 ? -210 : 0
    TweenMax.data = {
      top: top
    }
    TweenMax.to(TweenMax.data, 0.3, {
      top: toT,
      onUpdateParams: [TweenMax.data],
      onUpdate: res => {
        // console.log(res)
        _this.setData({
          twoTop: res.top
        })
      },
      onComplete: () => {
        if (_this.data.index != 0) {
          _this.setData({
            twoShow: false
          })
        }
      }
    })
  },
  bindPickerChange(e) {
    if(this.data.index == e.detail.value[0])
      return

    var index = this.data.index

    this.setData({
      index: e.detail.value
    })
    if ((index == 1 && e.detail.value == 2) || (index == 2 && e.detail.value == 1) ) {

    } else {
      this.turnTwo()
    }
    
    wx.setStorageSync('runTime', e.detail.value)
    this.darkMode()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sunset = wx.getStorageSync('sunset') || '06:00'
    var sunrise = wx.getStorageSync('sunrise') || '18:00'

    var icon = wx.getStorageSync('icon')

    if (typeof icon !== 'boolean') {
      wx.setStorageSync('icon', true)
      icon = true
    }

    this.setData({
      color: wx.getStorageSync('color'),
      index: wx.getStorageSync('runTime') || 0,
      startTime: wx.getStorageSync('startTime') || '23:00',
      endTime: wx.getStorageSync('endTime') || '06:00',
      ad: wx.getStorageSync('ad'),
      icon: icon,
      alwaysBright: wx.getStorageSync('alwaysBright'),
      array: [[
        '自定义', '日落日出（' + sunset + '~' + sunrise + '）', '总是开启']
      ],
      sw: wx.getStorageSync('dark') || false,
    })
    // console.log(this.data.icon)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.darkMode()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      oneTop: this.data.sw ? 0 : -105,
      oneShow: this.data.sw ? true : false,
      twoTop: this.data.index == 0 ? 0 : -210,
      twoShow: this.data.index == 0 ? true : false,
      theme: wx.getSystemInfoSync().theme
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})