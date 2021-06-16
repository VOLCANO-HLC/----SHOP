// pages/cart/index.js
import { request, showModal, showToast } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取购物车列表,收货地址信息
  getCartList() {
    let cartList = wx.getStorageSync('cart') || []
    cartList = cartList.filter(v => v.checked)
    const address = wx.getStorageSync('address') || {}
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({
      cartList,
      address
    })
  },
  getTotalPrice() {

    const totalPrice = this.data.cartList.reduce((pre, v) => pre + v.goods_price * v.num, 0).toFixed(2)
    const totalNum = this.data.cartList.reduce((pre, v) => pre + v.num, 0)
    this.setData({
      totalPrice,
      totalNum
    })

  },
  //支付按钮功能
  toPay() {
    // 请求token
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({ url: '/pages/author/index', });
      return
    }

    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address.all
    let goods = []
    const cartList = this.data.cartList
    cartList.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderParams = { order_price, consignee_addr, goods }
    // 发送订单
    request({ url: "/my/orders/create", method: "POST", data: orderParams })
      .then(res => {

        const { order_number } = res.data.message
        let newCart = wx.getStorageSync('cart')
        newCart = newCart.filter(v => !v.checked)
        wx.setStorageSync('cart', newCart)

        // 发送支付请求
        request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } })
          .then(res => {
            const { pay } = res.data.message

            //  调用微信支付功能
            wx.requestPayment({
              ...pay,
              success: (result) => {
                console.log(result);
                request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } })
                  .then(res => {

                  })
              },
              fail: (err) => {
                console.log(err);
                // 查看订单情况
                request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } })
                  .then(res => {

                    wx.navigateTo({
                      url: '/pages/order/index',
                      success: (result) => {

                      },
                      fail: () => { },
                      complete: () => { }
                    });

                  })
              }
            });

          })


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

    this.getCartList()
    this.getTotalPrice()
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