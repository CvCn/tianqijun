// components/detailsCard/detailsCard.js
Component({
  externalClasses: ['tiptop'],
  /**
   * 组件的属性列表
   */
  properties: {
    date: String,
    time: String,
    weatherIcon: String,
    weatherText: String,
    temp: String,
    windDir: String,
    windJi: String,
    windName: String,
    aqi: String,
    intensity: String,
    intensityName: String,
    hum: String,
    visibility: String,
    close: {
      type: String,
      value: false
    },
    isdaily: {
      type: Boolean,
      value: false
    },
    weather2: String,
    weatherIcon2: String,
    weatherText2: String,
    temp2: String,
    intensity2: String,
    intensityName2: String,
    aqiValue: Number,
    darkMode: {
      type: Boolean,
      value: false
    },
    comfortValue: Number,
    comfortName: String,
    ultravioletValue: Number,
    ultravioletName: String,
    color: {
      type: String,
      value: '#8c8c8c79'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windH: 0,
    icon: true,
    // color: '8b8b8b',
  },

  lifetimes: {
    ready() {
      var that = this
      wx.getSystemInfo({
        success: (result) => {
          that.setData({
            windH: result.windowHeight
          })
        },
      })
    }
  },
  pageLifetimes: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.properties.close = true
    },
    cos() {

    }
  },

})