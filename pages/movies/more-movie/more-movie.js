var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    totalCount:0,
    requestUrl:"",
    isEmpty:true,
    navigateTitle:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle= category
    var dataUrl = ""
    switch(category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
        break
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"
        break
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break
    }
    this.data.requestUrl=dataUrl
    util.http(dataUrl,this.processDoubanData)

  },
  
  processDoubanData:function (moviesDouban) {
    var movies = util.movies(moviesDouban);
    
    var totalMovies = {}
    //  //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false
    }
    this.setData({
      movies:totalMovies
    })
    this.data.totalCount+=20
    wx.hideNavigationBarLoading()//隐藏导航条加载动画。
    wx.stopPullDownRefresh()//停止当前页面下拉刷新。
  },

  onMovieTap:function (e) {
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    // var nextUrl = this.data.requestUrl +
    //   "?start=" + this.data.totalCount + "&count=20";
    // util.http(nextUrl, this.processDoubanData)
    // wx.showNavigationBarLoading()//在当前页面显示导航条加载动画。
    util.nextUrl(this.data.requestUrl, this.data.totalCount, this.processDoubanData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title:this.data.navigateTitle,
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})