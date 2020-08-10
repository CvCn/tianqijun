// components/switchButton/switchButton.js

const TweenMax = require('../../static/js/TweenMax.min.js')


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type: String,
      value: '#fff'
    },
    init:{
      type: Boolean,
      value: false
    },
    darkMode:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sw: false,
    left: 0,
    width: 0,
    height: 0
  },
  ready(){
    this.setData({
      sw: this.properties.init,
      left: this.properties.init ? 50 : 0,
      width: this.properties.init ? 100 : 0,
      height: this.properties.init ? 50 : 0
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swit(){
      wx.vibrateShort()
      this.setData({
        sw: !this.data.sw
      })
      this.triggerEvent('change', {
        sw: this.data.sw
      })
      this.turn()
    },

    turn(){
      var _this = this
      var left = this.data.left
      var width = this.data.width
      var height = this.data.height

      TweenMax.data={
        left: left,
        width: width,
        height: height
      }
      var todo = left == 0 ? 50 : 0
      var toW = width == 0 ? 100 : 0
      var toH = height == 0 ? 50 : 0
      TweenMax.to(TweenMax.data, 0.2, {
        left: todo,
        width: toW,
        height: toH,
        onUpdateParams: [TweenMax.data],
        onUpdate: res => {
          // console.log(res)
          _this.setData({
            left: res.left,
            width: res.width,
            height: res.height
          })
        }
      })
    }
  }
})
