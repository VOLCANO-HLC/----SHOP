// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        values: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        values: "品牌收藏",
        isActive: false
      },
      {
        id: 2,
        values: "店铺收藏",
        isActive: false
      },
      {
        id: 3,
        values: "浏览足迹",
        isActive: false
      },
    ],
    collectedList: []
  },
  titleTap(e) {
    // console.log(e);
    const id = e.detail.id
    this.changeTitle(id)
    // this.getOrders(id + 1)
  },
  changeTitle(id) {
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collectedList = wx.getStorageSync('collectedList') || []
    this.setData({
      collectedList
    })

  },


})