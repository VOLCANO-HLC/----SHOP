// pages/search/index.js
/* 
  1、获取输入框的值
  2、合法性判断
  3、检测通过，发送值到后台
  4、获取后台返回的数据，展示
*/

import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    isFocus: false,
    inputValue: ""
  },
  timer: -1,
  // 输入框发送请求获取数据
  handleInput(e) {
    console.log(e);
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        searchList: [],
        isFocus: false,
      })
      return
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getSearch(value)
    }, 1000);

  },
  getSearch(query) {
    request({ url: "/goods/qsearch", data: { query } }).then(res => {
      console.log(res);
      const searchList = res.data.message
      this.setData({
        searchList,
        isFocus: true,

      })
    })
  },
  // 取消按钮，清空数据
  handleCancle() {
    this.setData({
      searchList: [],
      isFocus: false,
      inputValue: ""
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})