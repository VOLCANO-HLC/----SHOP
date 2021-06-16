// pages/goods_list/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        values: "综合",
        isActive: true
      },
      {
        id: 1,
        values: "销量",
        isActive: false
      },
      {
        id: 2,
        values: "价格",
        isActive: false
      },
    ],
    goodsList: []
  },
  titleTap(e) {
    // console.log(e);
    const id = e.detail.id
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 20
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query || ""
    this.getGoodsList()
    // console.log(this.QueryParams.cid);
  },
  getGoodsList() {
    request({ url: '/goods/search', data: this.QueryParams }).then(res => {
      // console.log(res);
      const total = res.data.message.total
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
      // console.log(this.totalPages);
      this.setData({
        goodsList: [...this.data.goodsList, ...res.data.message.goods]
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('555');
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: '到底啦~' });
    } else {
      this.QueryParams.pagenum += 1
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})