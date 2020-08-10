// pages/shezhi/about/about.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: wx.getStorageSync('color'),
    darkMode: false,
    windH: wx.getSystemInfoSync().windowHeight,
  },
  zanshang: function(){
    wx.previewImage({
      // current: '', // 当前显示图片的http链接
      urls: ['https://moxiaowei.com/static2/ds2.jpg'] // 需要预览的图片http链接列表
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      color: wx.getStorageSync('color'),
      versionDesc: app.globalData.versionDesc
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
  // onShareAppMessage: function () {

  // }
})