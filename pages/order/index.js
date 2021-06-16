// pages/order/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        values: "全部",
        isActive: true
      },
      {
        id: 1,
        values: "待付款",
        isActive: false
      },
      {
        id: 2,
        values: "待发货",
        isActive: false
      },
      {
        id: 3,
        values: "退款/退货",
        isActive: false
      },
    ],
    orders: {}
  },
  changeTitle(id) {
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  titleTap(e) {
    // console.log(e);
    const id = e.detail.id
    this.changeTitle(id)
    this.getOrders(id + 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/author/index',
      })
      return;
    }
    let pages = getCurrentPages();
    const cuttentPage = pages[pages.length - 1]
    const e = cuttentPage.options
    const { type } = e
    this.changeTitle(type - 1)
    this.getOrders(type)

  },
  getOrders(type) {
    request({ url: '/my/orders/all', data: { type } }).then(res => {
      console.log(res);
      const { orders } = res.data.message
      this.setData({
        orders: orders.map(v => ({ ...v, create_time_cn: new Date(v.create_time * 1000).toLocaleString() }))
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

})