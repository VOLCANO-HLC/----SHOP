// components/CateLeftMenu/CateLeftMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getActive(e) {
      // console.log(e);
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })

      // console.log(this.data.currentIndex);
      this.triggerEvent("menuTap", e.currentTarget.dataset)
    }
  }
})
