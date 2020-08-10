//app.js
var key = require('/utils/md5.js')
var timer
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // wx.setInnerAudioOption({
    //   mixWithOther: false,
    //   obeyMuteSwitch: false
    // })

    if (typeof wx.getStorageSync('dark') !== 'boolean') {
      wx.setStorageSync('dark', false)
    }

    if (typeof wx.getStorageSync('icon') !== 'boolean') {
      wx.setStorageSync('icon', true)
    }


    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '新版来袭',
        content: '点击确定应用新版。查看新版本更新内容请点击左上角菜单 > 设置 > 关于',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    var info = wx.getSystemInfoSync()
    this.globalData.navHeight = info.statusBarHeight
    this.globalData.windowHeight = info.windowHeight
    this.globalData.theme = info.theme

    wx.getStorage({
      key: 'localCityProTime', //全部城市数据上次加载时间
      // success: function(res){
      //   if(new Date().getTime() - res.data >= 1000 * 60 * 60 * 24 * 60){
      //     wx.removeStorage({
      //       key: 'localCityProTime',
      //     })
      //   }
      // },
      fail: function (res) {
        wx.setStorage({
          data: new Date().getTime(),
          key: 'localCityProTime',
        })
      }
    })
  },
  setTheme: function (theme, callBack) {
    var that = this
    // clearTimeout(timer)
    // timer = setTimeout(() => {
      that.globalData.theme = theme
      if (callBack)
        callBack()
    // }, 100)
  },
  request: function (params) {
    function objKeySort(obj) { //排序的函数
      var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
      var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
      }
      return newObj; //返回排好序的新对象
    }
    var p = []
    if (!params.data) {
      params.data = {}
    }
    params.data.timeStamp = new Date().getTime()

    params.data.nonce = parseInt(Math.random() * 1000, 10)

    //排序
    var sortParams = objKeySort(params.data)

    //拼接
    Object.keys(sortParams).forEach(key => {
      if (sortParams[key] != undefined && ('' + sortParams[key]).length > 0) {
        p.push(key + '=' + JSON.stringify(sortParams[key]))
      }
    })

    p.push('key=')
    //md5加密转大写
    params.data.sign = key.md5(p.join('&')).toUpperCase()
    // console.log(p.join('&'))
    wx.request({
      url: this.globalData.baseUrl + params.uri,
      method: params.method || 'GET',
      data: params.data,
      success: res => {
        if (params && params.success) {
          params.success(res.data)
        }
      },
      fail: res => {
        if (params && params.fail) {
          params.fail(res)
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    navHeight: 0,
    windowHeight: 0,
    version: '1.2.7.4',
    versionDesc: '1. 未来天气添加到15天，2. 加入月相 3.逐时天气拓展到360小时',
    // innerAudio: wx.createInnerAudioContext(),
    baseUrl: 'https://moxiaowei.com/xiaoxiaotianqijun2/',
    // baseUrl: 'http://192.168.10.162:8080/xiaoxiaotianqijun2/',
    theme: undefined,
  }
})