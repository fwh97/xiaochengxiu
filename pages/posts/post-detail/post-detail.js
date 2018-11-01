var postsData = require('../../../data/data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
    postData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    this.data.currentPostId= postId
    var postData = postsData.postList[postId];
    this.setData({
      postData:postData
    })

    wx.clearStorageSync('posts_collected')
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected){
      var postCollected = postsCollected[postId]
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }else{
      var postsCollected = {}
      postsCollected[postId] = false;

      wx.setStorageSync('posts_collected', postsCollected)
    }

    // if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
    //     console.log(app.globalData.g_currentMusicPostId);
    //     this.setData({
    //         isPlayingMusic: true
    //     })
    // }
    this.setMusicMonitor()
  },

  setMusicMonitor:function () {
    var that=this
    wx.onBackgroundAudioPlay(function () {
        that.setData({
            isPlayingMusic: true
        })
    })

    wx.onBackgroundAudioPause(function () {
        that.setData({
            isPlayingMusic: false
        })
    })

    wx.onBackgroundAudioStop(function () {
        that.setData({
            isPlayingMusic: false
        })
    })
  },

  onCollectionTap:function(){
    this.getPostsCollectedAsy()
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        console.log(res);
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        
        that.showToast(postsCollected, postCollected);
      }
    })
  },

  showToast: function (postsCollected, postCollected){
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
    //提示信息框
    wx.showToast({
      title: postCollected ? '收藏成功' :'取消成功',
      duration:1000,
      icon:'success'
    })
  },
  onShareTap:function () {
    var itemList = [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
    ];
    // 操作菜单
    wx.showActionSheet({
        itemList:itemList,
        itemColor: "#405f80",
        success:function (res) {
            //确认提示框
            wx.showModal({
                title: "用户 " + itemList[res.tapIndex],
                content: "用户是否取消？现在无法实现分享功能，什么时候能支持呢"
            })
        }
    })
  },
  onMusicTap:function(){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    if (this.data.isPlayingMusic) {
        wx.pauseBackgroundAudio()
        this.setData({
            isPlayingMusic: false
        })

    }else{
        wx.playBackgroundAudio({
            dataUrl:postData.music.url,
            title:postData.music.title,
            coverImgUrl:postData.music.coverImg,
        })
        this.setData({
            isPlayingMusic: true
        })
    }
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