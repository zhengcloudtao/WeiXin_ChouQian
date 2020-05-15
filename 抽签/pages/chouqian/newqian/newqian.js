// pages/tools/chouqian/newqian/newqian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    lists: [{}, {}],
    qname: '',
    rid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  addList: function () {
    var lists = this.data.lists;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })
  },
  delList: function () {
    var lists = this.data.lists;
    lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      lists: lists,
    })
  },

  //小决定的名称
  checkQuestion(e) {
    var that = this,
      val = e.detail.value
    console.log(val)
    that.setData({
      qname: val,

    })
  },
  bindKeyInput(e) {
    var that = this,
      val = e.detail.value,
      index = e.currentTarget.dataset.index,
      lists = that.data.lists

    for (let i in lists) {
      if (index == i) {
        lists[i].name = val
      }
    }

    that.setData({
      lists: lists,


    })
    console.log(lists)
    // console.log(lists[2])
  },

  ochou: function (e) {
    var that = this,
      lists = that.data.lists
    var that = this,
      qname = that.data.qname
    var wid = wx.getStorageSync('wid')
    console.log('名称' + qname)
    console.log(lists)
    console.log(wid)
    var value = wx.getStorageSync('wid')

    if (!value) {
       var that = this
      
       wx.showModal({
         title: '提示',
         content: '你的登录信息过期了，请重新登录',
       })
   
       //调用登录接口
     } else {
    if (qname.length > 0 && lists.length > 0 ) {
       if( lists.length >1){
    wx.request({
      url: 'https://ancientcloud.club/wx/newqian',
      method: 'GET',
      data: {
        lists: lists,
        qname: qname,
        wid: wx.getStorageSync('wid'),
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        //wx.setStorageSync('rid', rid);
        that.setData({

          rid: res.data,
        })



        //var rid = wx.getStorageSync('rid'); 
        wx.navigateTo({
          url: '/pages/chouqian/zroom/zroom?rid=' + res.data.rid
        });


      },
      fail: function (e) {
        wx.showToast({
          title: '服务器错误',
          duration: 2000
        });

      }
    })

  }
  else{
    wx.showModal({
      title: '提示',
      content: '一个选择的转盘，转不出另一个选择。',
    })
  }
    }else{
      wx.showModal({
        title: '提示',
        content: '内容和选项不能为空!',
      })
    }
  }





  },
 
  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {}
})