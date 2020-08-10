// components/detailsCard/detailsCard.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    close: {
      type: Boolean,
      value: false
    },
    darkMode: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: '#8c8c8c79'
    },
    model: {
      type: String,
      value: 'default'
    },
    value: {
      type: Array,
      value: []
    },
    index: {
      type: Array,
      value: [1]
    },
    mode: {
      type: String,
      value: 'default'
    },
    start: {
      type: String,
      value: '12:00'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windH: wx.getSystemInfoSync().windowHeight,
    icon: true,
    anclose: false,
    changeDetail: {
      value: null
    }
    // color: '8b8b8b',
  },

  lifetimes: {
    attached() {
      // this.data.icon = wx.getStorageSync('icon')
      // this.setData({
      //   icon: wx.getStorageSync('icon'),
      //   color: wx.getStorageSync('color'),
      // })


    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      
    },
    hide: function() {},
    resize: function() {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      setTimeout(() => {
        this.setData({
          close: false
        })
      }, 150)
      this.setData({
        anclose: false
      })
    },
    open() {
      this.setData({
        close: true,
        anclose: true
      })

      if (this.properties.mode == 'time') {
        var hour = []
        for (var i = 0; i < 24; i++) {
          hour.push(this.addZero(i))
        }
        var min = []
        for (var i = 0; i < 59; i++) {
          min.push(this.addZero(i))
        }

        var sp = this.properties.start.split(":")
        this.setData({
          value: [hour, min],
          index: [parseInt(sp[0]), parseInt(sp[1])]
        })
      }

      this.setData({
        changeDetail: {
          value: this.properties.index
        }
      })

    },
    cos() {

    },
    bindChange(ev) {
      this.setData({
        changeDetail: ev.detail
      })
    },
    ok() {
      this.close()
      var detail = this.data.changeDetail
      if (detail == null || detail.value == this.data.index) {
        return
      }

      switch (this.properties.mode) {
        case 'time':
          detail = {
            value: this.data.changeDetail.value.map(this.addZero).join(":")
          }
          break
        default:
          if (detail.value == null) {
            detail = {
              value: this.data.index
            }
          }
      }

      this.triggerEvent('change', detail)
    },
    addZero(v) {
      if (v < 10) {
        return '0' + v
      }
      return v
    }
  },

})