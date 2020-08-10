<h1><strong>天气君</strong></h1>

# 关于
## 一些废话
- 天气君集成了天气、日历、疫情等生活模块，此代码仅供交流学习
- 天气君自上线至今已经有一年多（2019-03 至 2019-8），积累了许多的用户，也收到了许多的反馈，产品也在不断完善中
- 数据全部来自第三方免费接口，涉及到一些秘钥，请参考下方数据来源自行申请
## 关于夜间模式
天气君夜间模式在上线的时候，微信官方并未原生支持夜间模式的适配，所以天气君的夜间模式是同时兼容支持微信原生夜间模式的手机和不支持原生夜间模式的手机的

# 数据来源
- 天气数据来自彩云科技，地址<a href="http://www.caiyunapp.com">http://www.caiyunapp.com</a>，文档<a href="https://open.caiyunapp.com/%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94_API_%E4%B8%80%E8%A7%88%E8%A1%A8">https://open.caiyunapp.com/%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94_API_%E4%B8%80%E8%A7%88%E8%A1%A8</a>
- 疫情数据来自天行数据，地址<a href="https://www.tianapi.com/list/3">https://www.tianapi.com/list/3</a>，文档<a href="https://www.tianapi.com/apiview/170">https://www.tianapi.com/apiview/170</a>
- 地图数据使用的小程序原生的腾讯地图，文档<a href="https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview">https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview</a>
- 农历数据来自紫金山天文台的公共数据，详情阅读 `/utils/p.js`
- 图表组件来自百度ECharts小程序版<a href="https://github.com/ecomfe/echarts-for-weixin">https://github.com/ecomfe/echarts-for-weixin</a>