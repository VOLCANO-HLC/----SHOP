//app.js
//Page Object
import { request } from '../../request/request.js'
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  // 页面首次渲染前调用  一般在这里请求异步数据
  onLoad: function (options) {
    // wx.request({
    //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

    //     success: (res) => {
    //       console.log(res);
    //       this.setData({
    //         swiperList: res.data.message
    //       })
    //     }
    //   });
    // 请求第一个轮播图的数据
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList()

  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        })
      })
  },
  getCatesList() {
    request({ url: '/home/catitems' })
      .then(res => {
        this.setData({
          catesList: res.data.message
        })
      })
  },
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(res => {
        const floorList = res.data.message
        floorList.forEach(v =>
          v.product_list.forEach(it => {
            it.navigator_url = it.navigator_url.replace('/goods_list', '/goods_list/index')
            // console.log(it.navigator_url);
          })

        )
        this.setData({
          floorList
        })
      })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
