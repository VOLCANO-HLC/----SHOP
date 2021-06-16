import { request } from '../../request/request.js'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodObj: {},
    isCollected: false
  },
  GoodInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    // console.log(goods_id);
    this.getGoodDetail(goods_id)
  },
  onShow: function () {
    let pages = getCurrentPages();
    const currentPage = pages[pages.length - 1]
    const { goods_id } = currentPage.options
    this.getGoodDetail(goods_id)

  },
  getGoodDetail(goods_id) {
    request({ url: '/goods/detail', data: { goods_id } }).then(res => {
      // console.log(res);
      this.GoodInfo = res.data.message
      const collectedList = wx.getStorageSync('collectedList') || []
      let isCollected = collectedList.some(v => v.goods_id === this.GoodInfo.goods_id)
      console.log(isCollected);
      this.setData({
        // goodObj: res.data.message
        goodObj: {
          pics: res.data.message.pics,
          goods_price: res.data.message.goods_price,
          goods_name: res.data.message.goods_name,
          goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg')

        },
        isCollected
      })
    })
  },
  // 点击图片放大
  handlePreviewImage(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset
    const urls = this.GoodInfo.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[index],
      urls
    });
  },

  /* 
  加入购物车 思路：
    1、获取缓存的购物车数据 数组
    2、判断当前商品是否存在购物车数组中
    3、已存在，则修改商品信息，num++
    4、不存在，则给当前商品加属性num，并赋值为1，加入购物车数组
    5、弹出提示浮窗
  */
  addToCart() {
    // console.log('55');
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
    // console.log(index);
    if (index === -1) {
      // 不存在，给商品加属性num，插入数组
      this.GoodInfo.num = 1
      this.GoodInfo.checked = true
      cart.push(this.GoodInfo)
    } else {
      // 存在，给数组中的商品属性num+1
      cart[index].num++
    }
    // 重新存入缓存
    wx.setStorageSync('cart', cart)
    // 弹出浮窗
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      // 防止用户短时间重复操作
      mask: true,

    });

  },
  // 点击收藏按钮
  handleCollected() {
    this.setData({
      isCollected: !this.data.isCollected
    })
    const collectedList = wx.getStorageSync('collectedList') || []
    let isCollected = collectedList.some(v => v.goods_id === this.GoodInfo.goods_id)
    if (this.data.isCollected && !isCollected) {
      collectedList.push(this.GoodInfo)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });


    }
    if (!this.data.isCollected && isCollected) {
      const index = collectedList.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
      collectedList.splice(index, 1)
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
    }
    wx.setStorageSync('collectedList', collectedList)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */




})