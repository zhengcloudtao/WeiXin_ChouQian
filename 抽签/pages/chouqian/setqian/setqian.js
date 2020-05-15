// pages/tools/chouqian/setqian/setqian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wid: "",
    items: [],
    rid: "rid",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  viewItem: function (event) {
    console.log(event)
    var rid = event.currentTarget.dataset.rid
    wx.navigateTo({
      url: '../dqian/dqian?rid=' + rid
    })

  },
  chou: function (event) {
    console.log(event)
    var rid = event.currentTarget.dataset.rid
    wx.navigateTo({
      url: '../zroom/zroom?rid=' + rid
    })

  },
  

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    var value = wx.getStorageSync('wid')

    if (!value) {
       var that = this
      
       wx.showModal({
         title: '提示',
         content: '你的登录信息过期了，请重新登录',
       })
   
       //调用登录接口
     } else {
    wx.request({
      url: 'https://ancientcloud.club/wx/sqian',

      data: {
        wid: wx.getStorageSync('wid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data,
        })
      }
    })
  }

  },

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {

  },

})