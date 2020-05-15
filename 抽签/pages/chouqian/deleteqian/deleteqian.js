// pages/tools/chouqian/dqian/dqian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rid: '',
    xz: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rid: options.rid,
      wid: wx.getStorageSync('wid'),

    })
    var rid = options.rid
    wx.setStorageSync('rid', rid)
    console.log(rid)
  },


  dact: function (e) {

    var that = this;
    var wid = wx.getStorageSync('wid')
    var rid = wx.getStorageSync('rid')
    wx.request({
      url: 'https://ancientcloud.club/wx/sdqian',

      data: {
        rid: wx.getStorageSync('rid'),
        wid: wx.getStorageSync('wid'),
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          errors: res.data,
        })
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
    
      }
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