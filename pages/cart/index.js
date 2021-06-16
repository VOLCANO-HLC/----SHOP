// pages/cart/index.js
import { showModal, showToast } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    allChecked: false,
    totalNum: 0,
  },
  chooseGoods: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取地址
  getAddress() {
    console.log('555');
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        const address = result
        wx.setStorageSync("address", address);

      },
    });


  },
  // 获取购物车列表
  getCartList() {
    const cartList = wx.getStorageSync('cart') || []
    const allChecked = cartList.length ? true : false
    this.setData({
      cartList,
      allChecked
    })
  },
  getTotalPrice() {
    this.chooseGoods = this.data.cartList.filter(v => v.checked == true)
    const totalPrice = this.chooseGoods.reduce((pre, v) => pre + v.goods_price * v.num, 0).toFixed(2)
    const totalNum = this.chooseGoods.reduce((pre, v) => pre + v.num, 0)
    this.setData({
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', this.data.cartList)
    wx.setStorageSync('address', this.data.address)
  },
  // 商品按钮功能
  desNum(e) {
    // console.log(e);
    const { goodsid } = e.currentTarget.dataset
    let cartList = this.data.cartList
    const index = cartList.findIndex(v => v.goods_id == goodsid)
    if (cartList[index].num == 1) {
      showModal({ content: '确定要删除改商品吗' }).then(res => {
        if (res.confirm) {
          console.log('用户点击确定')
          cartList.splice(index, 1)
          this.setData({
            cartList,

          })
          this.getTotalPrice()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      })
    } else {
      cartList[index].num -= 1
    }
    cartList = cartList.filter(v => v.num > 0)
    const allChecked = cartList.length ? true : false
    this.setData({
      cartList,
      allChecked
    })
    this.getTotalPrice()
  },
  addNum(e) {
    // console.log(e);
    const { goodsid } = e.currentTarget.dataset
    let cartList = this.data.cartList
    cartList.forEach(v => v.goods_id == goodsid ? v.num += 1 : v)
    this.setData({
      cartList
    })
    this.getTotalPrice()
  },
  // 单个复选框点击变化
  itemChoose(e) {
    const { goodsid } = e.currentTarget.dataset
    let cartList = this.data.cartList
    cartList.forEach(v => v.goods_id == goodsid ? v.checked = !v.checked : v.checked = v.checked)
    const allChecked = !cartList.some(v => v.checked == false)
    this.setData({
      cartList,
      allChecked
    })
    this.getTotalPrice()
  },
  // 底部全选框点击事件
  allChoose(e) {
    const allChecked = !this.data.allChecked
    let cartList = this.data.cartList
    cartList.forEach(v => v.checked = allChecked)
    this.setData({
      cartList,
      allChecked
    })
    this.getTotalPrice()
  },
  toPay() {
    const { address, totalNum } = this.data
    if (!address.userName) {
      showToast({ title: '你还没有添加收货地址哦' })
      return
    }
    if (!totalNum) {
      showToast({ title: '你还没有将商品加入购物车哦' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {

      },

    });

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
    let address = wx.getStorageSync('address') || {}

    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({
      address
    })
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