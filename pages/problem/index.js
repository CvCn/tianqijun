// pages/problem/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: wx.getStorageSync('color'),
    // windH: wx.getSystemInfoSync().windowHeight,
    darkMode: false,
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
    this.setData({
      color: wx.getStorageSync('color')
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
  onShareAppMessage: function () {

  }
})