// pages/category/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    // 左侧菜单点击项
    menuType: 0,
    // 右侧滚动条距离顶部的位置
    scrollTop: -1
  },
  catesList: [],
  // 左侧点击菜单
  menuTap(e) {

    this.setData({
      menuType: e.detail.index
    })
    let rightMenuList = this.catesList[this.data.menuType].children
    this.setData({
      rightMenuList,
      scrollTop: -1
    })
    console.log(this.data.scrollTop);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*  
    1.web中的本地存储 和 小程序中的本地存储的区别：
    1、写代码的方式不一样
      web: localStorage.setItem("key","value")  localStorage.getItem("key")
      小程序:wx.setStorageSync('key', data);    wx.getStorageSync('key')
    2.存的时候
      wweb： 无论是什么类型的数据，最终都会调用 toString（）方法，转化成字符串，再进行存储
      小程序：不存在 类型转换的操作，存什么类型的数据，获取时也是什么类型的数据
     // 1.判断 存储中有没有数据
     存储样式 ：
     {time : Date.now(),data:[...]}
      // 2.如果没有，则请求新的数据
      // 3.有，且没有过期，则不用请求新数据
      
      */
    // 1.判断 存储中有没有数据
    const catesList = wx.getStorageSync('catesList')

    if (!catesList) {
      this.getCateList()
    } else {
      // 存在旧数据  定义过期时间 10s
      if (Date.now() - catesList.time > 1000 * 10) {
        // 已过期
        this.getCateList()
      }
      else {
        // 未过期
        this.catesList = catesList.data
        let leftMenuList = this.catesList.map(v => v.cat_name)

        let rightMenuList = this.catesList[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })

      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getCateList() {
    request({ url: '/categories' })
      .then(res => {
        this.catesList = res.data.message
        // 存储数据
        wx.setStorageSync('catesList', { time: Date.now(), data: this.catesList })
        let leftMenuList = this.catesList.map(v => v.cat_name)

        let rightMenuList = this.catesList[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})