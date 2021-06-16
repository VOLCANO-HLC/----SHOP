// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        values: "体验问题",
        isActive: true
      },
      {
        id: 1,
        values: "商品，商家投诉",
        isActive: false
      }
    ],
    chooseImages: [],
    textValue: ''
  },
  upLoadImages: [],
  titleTap(e) {
    // console.log(e);
    const id = e.detail.id
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 点击 + 按钮，加载图片
  handleChooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {

        const chooseImages = res.tempFilePaths
        this.setData({
          chooseImages: [...this.data.chooseImages, ...chooseImages]
        })
      },

    });

  },
  // 点击图片，删除自身
  handleDele(e) {

    const { scr } = e.currentTarget.dataset
    const list = this.data.chooseImages
    const index = list.findIndex(v => v === scr)
    list.splice(index, 1)
    this.setData({
      chooseImages: list
    })
  },
  // 文本框输入值时改变数据
  handleInput(e) {
    const textValue = e.detail.value
    this.setData({
      textValue
    })
  },
  // 点击提交按钮
  handleUpload() {
    // 1、获取图片 文本
    console.log('222');
    const { chooseImages, textValue } = this.data
    if (!textValue.trim()) {
      wx.showToast({
        title: '此处不能为空，请输入文字',
        icon: 'none',
        mask: true,
      });

      return
    }
    wx.showLoading({
      title: "正在上传数据",
      mask: true,
    });
    // 如果有图片，上传图片到外网，获取图片的新地址
    if (chooseImages.length) {

      chooseImages.forEach((v, i) => {
        var upTask = wx.uploadFile({
          url: 'https://img.coolcr.cn/index/api.html ',
          filePath: v,
          name: "image",
          formData: {},
          success: (result) => {
            console.log(result);
            let url = result.data
            this.upLoadImages.push(url)
            if (i === chooseImages.length - 1) {
              wx.hideLoading();

              console.log("提交文件成功");
              this.setData({
                chooseImages: [],
                textValue: ''
              })
              wx.navigateBack({
                delta: 1
              });

            }
          },

        });

      })
    } else {
      // 只有文字，也要上传
      console.log("只提交文字");
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });

    }
  },

})