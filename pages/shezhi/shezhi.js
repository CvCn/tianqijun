// pages/shezhi/shezhi.js
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
  shouquan: function() {
    wx.openSetting()
  },
  jump: function(ev) {
    wx.navigateTo({
      url: ev.currentTarget.dataset.path,
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
  clear: function() {
    wx.showModal({
      title: '警告！',
      content: '此操作将清除本地所有数据，并将小程序还原到第一次使用的状态，点击确定继续',
      success(res) {
        if (res.confirm) {
          wx.clearStorage({
            success: res => {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        }
      }
    })
  },
  setClipboardData: function(){
    wx.setClipboardData({
      data: 'https://github.com/CvCn/tianqijun',
      success (res) {
        wx.getClipboardData({
          success (res) {
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      color: wx.getStorageSync('color'),
      version: app.globalData.version
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