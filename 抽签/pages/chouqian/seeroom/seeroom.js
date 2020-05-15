var app = getApp(),
  timer = null;

Page({
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染   
   */
  data: {
    animationData: {}, // 转盘动画
    zhuanflg: false, // 转盘是否可以点击切换的标志位
    fastTime: 7600, // 转盘快速转动的时间
    block1: 'block', // 转盘中心的图片标志位，用来显示隐藏
    block2: 'none',
    block3: 'none',
    block4: 'none',
    result: '?',
    //设置定时器
    loanTime: '',
    //设置定时器
    loanTime1: ''
  },


  // 组件生命周期函数，在组件实例进入页面节点树时执行
  onLoad: function (options) {

    //将全局变量Index保存在that中，里面函数调用 
    var that = this
    //获取系统信息 
    var value = wx.getStorageSync('wid')
    if (!value) {
      var that = this
      wx.switchTab({
        url: '/pages/user/index/index',
      })
      wx.showModal({
        title: '提示',
        content: '你的登录信息过期了，请重新登录',
      })
      //调用登录接口
    } else {

      this.setData({
        canvaswidth: that.width,
        canvasheight: that.height,
        pageWidth: that.width,
        pageHeight: that.height,
        rid: options.rid,
      })
      var rid = options.rid;
      wx.setStorageSync('rid', rid);
      this.data.currentRid = rid;
      wx.request({
          url: 'https://ancientcloud.club/wx/cqian',
          method: 'GET',
          data: {
            rid: options.rid,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("res" + res)
            console.log("res.data" + res.data)
            that.setData({

              l: res.data,

            })
            wx.setStorageSync('lists', res.data);
            console.log("lists2" + res.data)
            that.initAdards();
          },
          fail: function (e) {
            wx.showToast({
              title: '服务器错误',
              duration: 2000
            });

          }
        }),
        wx.request({
          url: 'https://ancientcloud.club/wx/cqqian',
          method: 'GET',
          data: {

            rid: options.rid,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            console.log(res.data)

            that.setData({

              qname: res.data,
            })


          },
          fail: function (e) {
            wx.showToast({
              title: '服务器错误',
              duration: 2000
            });

          }
        })
      var lists = wx.getStorageSync('lists');
      console.log("lists" + lists)


      that.data.loanTime = setInterval(function () {
        //循环执行代码

        var wid = wx.getStorageSync('wid');
        wx.request({
          url: 'https://ancientcloud.club/wx/room',
          method: 'GET',
          data: {
            rid: options.rid,
            wid: wid,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            that.setData({

              list: res.data,

            })




          },
          fail: function (e) {
            wx.showToast({
              title: '服务器错误',
              duration: 2000
            });

          },
        });
      }, 3000) //循环时间 这里是1秒 


      var number1 = -1
      that.data.loanTime1 = setInterval(function () {
        //循环执行代码
        //请求结果
        wx.request({
          url: 'https://ancientcloud.club/wx/kroom',
          method: 'GET',
          data: {
            rid: options.rid,

          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {

            that.setData({



            })
            var result = res.data.result
            var number = res.data.number
            console.log("result" + result)
            if (result == '?') {

              that.reset();
            } else {

              if (number != number1) {
                number1 = number;
                wx.setStorageSync('result', result);
                that.reset();
                that._zhuan();
              }

            }
          },
          fail: function (e) {
            wx.showToast({
              title: '服务器错误',
              duration: 2000
            });

          },
        })

      }, 3000) //循环时间 这里是1秒 




      //  this.initAdards();
    }
  },
  onUnload: function () {
    console.log("-------page-----onUnload------------");
    clearInterval(this.data.loanTime)
    clearInterval(this.data.loanTime1)
    wx.request({
      url: 'https://ancientcloud.club/wx/droom',
      method: 'GET',
      data: {
        wid :wx.getStorageSync('wid'),
        rid: wx.getStorageSync('rid'),
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)




      },
      fail: function (e) {
        wx.showToast({
          title: '服务器错误',
          duration: 2000
        });

      }
    })




  },

  /*
   
    * 公有方法
    */
  //判断值是否为空
  isNull(str) {
    if (str == null || str == undefined || str == '') {
      return true;
    } else {
      return false;
    }
  },

  //初始化数据
  initAdards() {

    var that = this,
      awardsConfig = wx.getStorageSync('lists');
    var t = awardsConfig.length; // 选项长度
    console.log("初始化" + awardsConfig)
    console.log("初始化" + t)
    var e = 1 / t,
      i = 360 / t,
      r = i - 90;

    for (var g = 0; g < t; g++) {
      awardsConfig[g].item2Deg = g * i + 90 - i / 2 + "deg"; //当前下标 * 360/长度 + 90 - 360/长度/2
      awardsConfig[g].afterDeg = r + "deg";
    }
    console.log("初始化中" + awardsConfig)
    that.setData({
      turnNum: e, // 页面的单位是turn
      awardsConfig: awardsConfig,
    })

    that._change(); //向父组件传出当前转盘的初始数据
  },

  //重置转盘
  reset() {
    var rid = this.data.currentRid;
    var lists = wx.getStorageSync('lists');

    var that = this,
      awardsConfig = that.data.awardsConfig;
    console.log("重置" + awardsConfig);
    var animation = wx.createAnimation({
      duration: 1,
      timingFunction: "linear"
    });
    that.animation = animation;
    animation.rotate(0).step(), app.runDegs = 0;

    that.setData({
      animationData: animation.export(),

      result: '?'
    })

    for (let x in awardsConfig) {
      awardsConfig[x].opacity = '1';
    }



    setTimeout(function () {
      that.setData({
        block1: 'block',
        block2: 'none',
        block3: 'none',
        block4: 'none',
        awardsConfig: awardsConfig,
      })

      that._myAwards(true);
    }, 300)
  },



  // GO转盘开始转动
  _zhuan() {
    var rid = this.data.currentRid;
    var lists = wx.getStorageSync('lists');
    var result = wx.getStorageSync('result');
    var that = this;
    var awardsConfig = that.data.awardsConfig;
    console.log("go" + awardsConfig)

    //>>> 是无符号移位运算符
    //var r = Math.random() * awardsConfig.length >>> 0,
    var r = result;
    //  runNum = 8;
    console.log('当前答案选项的下标==', r);

    setTimeout(function () {


      //要转多少度deg
      app.runDegs = app.runDegs || 0, app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (2160 - r * (360 / awardsConfig.length));

      var animation = wx.createAnimation({
        duration: that.data.fastJuedin ? that.data.slowTime : that.data.fastTime,
        timingFunction: "ease"
      });
      that.animation = animation;

      //这动画执行的是差值 
      //如果第一次写rotate（360） 那么第二次再写rotate（360）将不起效果
      animation.rotate(app.runDegs).step(), 0 == r && (app.runDegs = 0);

      that.setData({
        animationData: animation.export(),
        block1: 'none',
        block2: 'block',
        block3: 'none',
        zhuanflg: true,
      })

      that._setatZhuan(true);
    }, 100);

    timer = setTimeout(function () {
      for (let x in awardsConfig) {
        if (x != r) {
          awardsConfig[x].opacity = '0.3';
        } else {
          awardsConfig[x].opacity = '1';
        }
      }



      that.setData({
        animationData: {},
        s_awards: awardsConfig[r].name, //最终选中的结果
        awardsConfig: awardsConfig,
        block1: 'none',
        block2: 'none',
        block3: 'block',
        zhuanflg: false,
        result: awardsConfig[r].name,
      })

      that._myAwards(false);
      that._setatZhuan(false);
    }, that.data.fastJuedin ? that.data.slowTime : that.data.fastTime);
  },





  //初始化数据时向外传的参
  _change() {
    this.triggerEvent('myData', this.data.awardsConfig); // 向父组件传出当前决定的数组数据
  },

  //当前转盘的结果   e:转盘什么时候能点击的标志位
  _myAwards(e) {
    this.triggerEvent('myAwards', {
      s_awards: this.data.s_awards,
      end: e
    });
  },

  //转盘开始转动或者结速转动后的要传的值
  _setatZhuan(e) {
    this.triggerEvent('startZhuan', e); // 向父组件传出当前决定的数组数据
  },
  onShareAppMessage: function () {
    var rid = this.data.currentRid;
    console.log(rid)

    return {
      title: "邀请你一起抽签",
      path: 'pages/tools/chouqian/kroom/kroom?rid=' + rid
    }
  }

})