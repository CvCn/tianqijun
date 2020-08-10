// component/default.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navName: { //导航名字
      type: String,
      value: ""
    },
    color: { //按钮颜色
      type: String,
      value: ''
    },
    load: { //加载状态
      type: Boolean,
      value: false
    },
    menuStyle: { //左侧按钮，菜单menu和返回back
      type: String,
      value: 'back'
    },
    shezhi: { //是否显示设置按钮
      type: Boolean,
      value: false
    },
    reqFail: { //加载错误状态
      type: Boolean,
      value: false
    },
    curr: { //是否定位城市
      type: Boolean,
      value: false
    },
    // sunrise:{
    //   type: String,
    //   value: '06:00'
    // },
    // sunset:{
    //   type: String,
    //   value: '23:00'
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    windowHeight: app.globalData.windowHeight,
    winH: 0,
    darkMode: false,
    firstOpen: false,
    timer: []
  },
  created: function () {
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      firstOpen: true
    })
    this.darkModeAction()
    if (wx.onThemeChange) {
      var that = this
      wx.onThemeChange((result) => {
        app.setTheme(result.theme, () => that.darkMode())
      })
    }
  },
  pageLifetimes: {
    show: function () {
      this.darkModeAction()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    menu: function () {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    back: function () {
      wx.navigateBack()
    },
    shezhi: function () {
      wx.navigateTo({
        url: '/pages/shezhi/shezhi',
      })
    },
    darkMode() {
      var that = this
      let timer = this.data.timer
      for (let i in timer) {
        clearTimeout(timer[i])
      }
      if (timer.length > 0) {
        timer = []
      }
      timer.push(setTimeout(() => {
        that.darkModeAction()
      }, 100))
      this.setData({
        timer: timer
      })
    },
    //夜间模式
    darkModeAction() {

      var dark = wx.getStorageSync('dark')

      var isDark = false

      if (dark) {

        var runTime = wx.getStorageSync('runTime') || 0

        // console.log(sunrise)

        switch (parseInt(runTime)) {

          //自定义
          case 0:
            // var s = this.timePar(startTime, endTime)
            // console.log(s)
            var startTime = wx.getStorageSync('startTime') || '23:00'
            var endTime = wx.getStorageSync('endTime') || '06:00'
            isDark = this.timePar(startTime, endTime)
            break;

            //日落日出
          case 1:
            var sunrise = wx.getStorageSync('sunrise') || '06:00'
            var sunset = wx.getStorageSync('sunset') || '18:00'
            isDark = this.timePar(sunset, sunrise)
            break;

            //总是开启
          case 2:
            isDark = true
            break;
        }

      }

      var theme = app.globalData.theme
      if (theme) {
        isDark = theme == 'dark' ? true : false
      }

      // console.log(isDark)
      this.triggerEvent('dark', {
        dark: isDark,
        theme: theme
      })
      this.setData({
        darkMode: isDark
      })
      wx.setStorageSync('darkMode', isDark)


      if (isDark) {
        wx.setNavigationBarColor({
          backgroundColor: "#000000",
          frontColor: '#ffffff'
        })
      } else {
        wx.setNavigationBarColor({
          backgroundColor: "#ffffff",
          frontColor: '#000000'
        })
      }

    },
    timePar(startTime, endTime) {
      var start = startTime.split(':')
      var end = endTime.split(':')

      var s = new Date()
      var e = new Date()
      var n = new Date()

      // n.setHours('0')
      // n.setMinutes('1')

      s.setHours(start[0])
      s.setMinutes(start[1])
      e.setHours(end[0])
      e.setMinutes(end[1])

      var zero = new Date()
      zero.setHours('0')
      zero.setMinutes('0')

      if (s.getTime() - e.getTime() > 0) {
        if (zero.getTime() - n.getTime() <= 0 && e.getTime() - n.getTime() >= 0) {
          s.setDate(s.getDate() - 1)
        } else {
          e.setDate(e.getDate() + 1)
        }
      }

      // console.log(n.getTime() - s.getTime() >= 0 && n.getTime() - e.getTime() <= 0)

      if (n.getTime() - s.getTime() >= 0 && n.getTime() - e.getTime() <= 0) {
        return true
      }
      return false

    },
    //重新加载按钮
    reload: function () {
      var pages = getCurrentPages()
      this.triggerEvent('myload')
      if (pages.length > 0) {
        if (pages.length == 1)
          pages[pages.length - 1].onLoad()
        if (pages.length > 0)
          pages[pages.length - 1].onShow()
      }
    }
  }
})