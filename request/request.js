let ajaxCount = 0
export const request = (params) => {
  let header = { ...params.header }
  if (params.url.includes("/my/")) {
    const token = wx.getStorageSync('token')
    header["Authorization"] = token
  }
  ajaxCount++
  // 显示加载中的图标
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    // 公共部分
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxCount--
        if (ajaxCount === 0) {
          wx.hideLoading({
            complete: (res) => { },
          })
        }
      }
    });

  })
}
export const showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      ...params,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...params,
      duration: 1500,
      mask: true,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const login = (params) => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (res) => {
        resolve(res)
      },

    });

  })
}

