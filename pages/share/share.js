// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareImg: '',
    address: '',
    color: wx.getStorageSync('color'),
    darkMode: false,
  },
  saveImg: function() {
    var that = this
    wx.showLoading()
    wx.getSetting({
      success(res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function() {
              that.saveImgE()
            },
            fail: function() {
              wx.hideLoading()
              wx.showModal({
                title: '请授权天气君允许保存图片到相册',
                content: '点击确定打开授权页面',
                success(res){
                  if(res.confirm){
                    wx.openSetting()
                  }
                }
              })
            }
          })
      }
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
  saveImgE: function(){
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImg,
      success(res) {
        wx.hideLoading()
        wx.showToast({
          title: '保存成功'
        })
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.shareImg)
    this.setData({
      shareImg: options.shareImg,
      address: options.address
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
    this.setData({
      color: wx.getStorageSync('color'),
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
    return {
      title: '来自' + this.data.address.replace(' ', '') + '的实时天气，点击查看我的天气',
      path: '/pages/index/index',
      imageUrl: this.data.shareImg,
    }
  }
})