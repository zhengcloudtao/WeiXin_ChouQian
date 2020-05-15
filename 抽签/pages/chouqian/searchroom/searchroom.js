// pages/tools/chouqian/croom/croom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    rid: '',
  },

 
  onLoad: function (options) { },


  onReady: function () {},


  onShow: function () {},


  onHide: function () {},

  
  onUnload: function () {},


  onPullDownRefresh: function () {},

  
  onReachBottom: function () {},


  onShareAppMessage: function () {},
  croom: function (e) {
    var that = this;
    var rid = e.detail.value.rid;
    wx.setStorageSync('rid', rid)
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
      url: 'https://ancientcloud.club/wx/croom',
      method: 'GET',
      data: {

        rid: rid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)

        that.setData({

          errors: res.data,
        })
        if (res.data == 1) {
          wx.navigateTo({
            url: '../kroom/kroom?rid=' + rid
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '活动不存在',
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器错误',
          duration: 2000
        });

      }
    })
  }
  }


})