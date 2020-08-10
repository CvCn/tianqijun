// pages/index/rain/rain.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImg: '',
    width: 7600,
    height: 300,//600 100
    navHeight: app.globalData.navHeight,
    color: wx.getStorageSync('color'),
  },
  change: function(ev) {
    console.log(ev.detail.value)

    var pi = this.data.width/this.data.height
    
    this.setData({
      height: ev.detail.value*10,
      width: pi * ev.detail.value * 10
    })
  },
  back: function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      color: wx.getStorageSync('color'),
      tempImg: options.tempImg,
      width: options.width,
      height: options.height
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  // onShareAppMessage: function() {

  // }
})