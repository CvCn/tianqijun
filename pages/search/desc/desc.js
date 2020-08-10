// pages/search/desc/desc.js
var app = getApp()

var TweenMax = require("../../../static/js/TweenMax.min.js")

var QQMapWX = require('../../../static/lib/qqmap-wx-jssdk.min.js');
const {
  formatTime
} = require("../../../utils/util.js");
var qqMap = new QQMapWX({
  key: 'M26BZ-J263J-RJ6FY-KK3GJ-H7WLS-Q6FCL' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 0,
    color: '#8b8b8b',
    city: [], //所有城市数据
    result: [], //查找的结果
    inp: '', //输入的值
    scroll: 0,
    load: false,
    history: [],
    reqFail: false,
    btop: [],
    topHeight: 100,
    // inpL: 150,
    hot: [
      '北京市', '上海市', '广州市', '深圳市',
      '西安市', '杭州市', '天津市', '重庆市',
      '武汉市', '海口市', '高雄市', '台北市',
    ], //热门城市'
    darkMode: false,
    windH: 0,
    fontColor: "black"
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
      this.setData({
        fontColor: "white"
      })
    } else {
      wx.setBackgroundColor({
        backgroundColor: '#f9f9f9',
      })
      this.setData({
        fontColor: 'black'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // var darkMode = wx.getStorageSync('darkMode')
    // console.log(darkMode)

    this.setData({
      color: wx.getStorageSync('color'),
      history: wx.getStorageSync('history') || [],
      // darkMode: darkMode
    })

    wx.setKeepScreenOn({
      keepScreenOn: wx.getStorageSync("alwaysBright") || false,
    })

  },
  openMap: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: function () {
              wx.chooseLocation({
                success: function (data) {
                  qqMap.reverseGeocoder({
                    location: {
                      latitude: data.latitude,
                      longitude: data.longitude
                    },
                    success: function (resp) {
                      let sheng = resp.result.ad_info.province
                      let shi = resp.result.ad_info.city
                      let quxian = resp.result.ad_info.district
                      var allName = (sheng == shi ? shi : sheng + shi) + quxian
                      that.init(city => {
                        let id = -1
                        var name = ''
                        for (var i = 0; i < city.length; i++) {
                          var item = city[i]
                          if (item.allName == allName) {
                            id = item.id
                            name = item.allName
                            break
                          }
                        }
                        that.setData({
                          inp: quxian
                        })
                        that.onCity({
                          currentTarget: {
                            dataset: {
                              id: id
                            }
                          }
                        }, name)
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })

  },
  //格式化数据
  //将7个直辖市或特别行政区、所有城市、区县按照省市区的格式排列好
  init: function (callback) {
    var localCityProTime = wx.getStorageSync('localCityProTime')
    if (this.data.city.length > 0 && new Date().getTime() - localCityProTime < 1000 * 60 * 60 * 24 * 60) {
      if (callback)
        callback(this.data.city)
    } else {
      var that = this
      this.getCityList(list => {
        var sheng = list[0]
        var shi = list[1]
        var quxian = list[2]
        //直辖市和特别行政区
        var city = [sheng[0], sheng[1], sheng[8], sheng[21], sheng[31], sheng[32], sheng[33]]
        city.map((item, index) => {
          item.isCity = true
        })
        sheng.map((item, index) => {
          item.allName = item.fullname
          if (item.cidx) {
            shi.slice(item.cidx[0], item.cidx[1] + 1).map((item2, index2) => {
              //全部城市
              item2.allName = item.fullname + item2.fullname
              item2.isCity = true
              city.push(item2)
              if (item2.cidx) {
                quxian.slice(item2.cidx[0], item2.cidx[1] + 1).map((item3, index3) => {
                  //全部区县
                  item3.allName = item.fullname + item2.fullname + item3.fullname
                  city.push(item3)
                })
              }
            })
          } else {
            city.push(item)
          }
        })
        that.setData({
          city: city
        })
        wx.setStorage({
          key: 'city',
          data: city,
        })
        if (callback)
          callback(city)
      })
    }

  },
  //初始化地理数据源
  getCityList: function (callback) {
    var _this = this;
    var that = this
    this.setData({
      load: true,
    })
    //调用获取城市列表接口
    wx.request({
      url: 'https://apis.map.qq.com/ws/district/v1/list?output=json&key=M26BZ-J263J-RJ6FY-KK3GJ-H7WLS-Q6FCL',
      success: function (res) { //成功后的回调
        // console.log(res.data);
        // console.log('省份数据：', res.result[0]); //打印省份数据
        // console.log('城市数据：', res.result[1]); //打印城市数据

        if (res.data.status == 0) {
          if (callback) {
            callback(res.data.result)
          }
          that.setData({
            reqFail: false,
            load: false
          })
        } else {
          that.setData({
            reqFail: true,
            load: false
          })
        }
        // console.log('区县数据：', res.result[2]); //打印区县数据

        wx.setStorage({
          data: new Date().getTime(),
          key: 'localCityProTime',
        })
      },
      fail: function (error) {
        console.error(error);
        that.setData({
          reqFail: true,
          load: false
        })
      },
      complete: function (res) {
        // console.log(res);
      }
    });

  },
  //根据输入查找匹配的城市或区县
  matchCity: function () {
    if (this.data.inp == '')
      return
    var that = this
    this.init(city => {
      var str = that.data.inp
      var result = []
      city.map((item, index) => {
        if (item.allName.indexOf(str) != -1) {
          result.push(item)
        }
      })


      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      // console.log(result)
      if (result.length <= 0) {
        wx.showToast({
          title: '没有找到该地区',
          icon: 'none'
        })
        // that.setData({
        //   btop: [],
        //   topHeight: 50
        // })
        that.em()
        return
      } else {
        that.setData({
          result: result,
        })
      }

      var btop = []
      var btopz = []
      for (var i in result) {
        btop.push((parseInt(i)) * 100 + 210)
        btopz.push(0)
      }


      TweenMax.data = {
        btop: btopz,
        topHeight: that.data.topHeight
      }

      TweenMax.to(TweenMax.data, 0.4, {
        btop: btop,
        topHeight: btop.length * 100 + 100,
        ease: TweenMax.Power2.easeInOut,
        onUpdateParams: [TweenMax.data],
        onUpdate: res => {
          var moveTop = res.btop
          if (typeof (moveTop) == 'string') {
            moveTop = moveTop.split(',')
          }
          if (typeof (moveTop) == 'number') {
            moveTop = [parseInt(moveTop)]
          }
          // console.log(res.topHeight)
          that.setData({
            btop: moveTop,
            topHeight: res.topHeight
          })

        }
      })


    })
  },
  input: function (ev) {
    if (ev.detail.value.length <= 0) {
      this.em()
    }
    this.setData({
      inp: ev.detail.value
    })
  },
  bclear: function () {
    this.em()
    this.setData({
      inp: ''
    })
  },
  em: function (callback) {
    var that = this
    var btopz = []
    for (var i in this.data.result) {
      btopz.push(0)
    }
    TweenMax.data = {
      topHeight: this.data.topHeight,
      btop: this.data.btop
    }
    TweenMax.to(TweenMax.data, 0.4, {
      btop: btopz,
      topHeight: 100,
      ease: TweenMax.Power2.easeInOut,
      onUpdateParams: [TweenMax.data],
      onUpdate: res => {
        var moveTop = res.btop
        if (typeof (moveTop) == 'string') {
          moveTop = moveTop.split(',')
        }
        if (typeof (moveTop) == 'number') {
          moveTop = [parseInt(moveTop)]
        }
        // console.log(res.topHeight)
        that.setData({
          btop: moveTop,
          topHeight: res.topHeight
        })
      },
      onComplete() {
        that.setData({
          result: [],
          // btop: [],
          topHeight: 100
        })
      }
    })
  },
  clear: function () {
    var that = this
    wx.showModal({
      title: '',
      content: '是否清空历史记录？',
      success: res => {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.removeStorage({
            key: 'history',
            success: function (res) {},
          })
        }
      }
    })

  },
  label: function (ev) {
    this.setData({
      inp: ev.currentTarget.dataset.item
    })

    this.matchCity()
  },
  onCity: function (ev, name) {
    var id = ev.currentTarget.dataset.id
    var weatherList = wx.getStorageSync('weatherList') || []
    if (weatherList.indexOf(id) == -1) {
      weatherList.push(id)
      wx.setStorage({
        key: 'weatherList',
        data: weatherList,
      })

      //添加历史记录
      var str = this.data.inp
      var history = this.data.history
      if (str != '' && history.indexOf(str) == -1) {
        history.unshift(str)
      }
      this.setData({
        history: history
      })
      wx.setStorage({
        key: 'history',
        data: history,
      })

      wx.navigateBack()
    } else {
      wx.showToast({
        title: name + '已存在',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    // TweenMax.data = {
    //   inpL: 150
    // }

    // TweenMax.to(TweenMax.data, 0.2, {
    //   inpL: 0,
    //   ease: TweenMax.Power0.easeNone,
    //   onUpdateParams: [TweenMax.data],
    //   onUpdate: res => {
    //     that.setData({
    //       inpL: res.inpL
    //     })
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var sysInfo = wx.getSystemInfoSync()
    //city数据较大，放在onLoad里加载会出现卡顿，影响夜间模式的效果
    that.setData({
      city: wx.getStorageSync('city') || [],
      history: wx.getStorageSync('history') || [],
      color: wx.getStorageSync('color'),
      windH: sysInfo.windowHeight,
      navHeight: app.globalData.navHeight / (sysInfo.windowWidth / 750),

    })
    this.init(res => {
      that.setData({
        load: false
      })
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

  // },

  onPageScroll: function (e) { // 获取滚动条当前位置
    // console.log(e)
    this.setData({
      scroll: e.scrollTop
    })
  },
})