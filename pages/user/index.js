// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum: 0,
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo') || {}
    // console.log(userInfo);
    const collectedList = wx.getStorageSync('collectedList') || []

    this.setData({ userInfo, collectNum: collectedList.length })
  },


})