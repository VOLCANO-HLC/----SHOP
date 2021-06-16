// pages/author/index.js
import { request, login } from '../../request/request.js'
Page({
  async getuserinfo(e) {
    // console.log(e);
    const { encryptedData, iv, rawData, signature } = e.detail
    const { code } = await login()
    console.log(code);
    const loginParams = { encryptedData, iv, rawData, signature, code }
    request({ url: "/users/wxlogin", data: loginParams, method: "post" }).then(res => {
      console.log(res);
    })
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta: 1
    });

  }
})