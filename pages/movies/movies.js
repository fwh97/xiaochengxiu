var movieData = require('../../data/movie-data.js')
var util= require('../../utils/util.js')//公共js方法

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchPanelShow:false,
    containerShow:true,
    searchResult:{},
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //    inTheaters:movieData.inTheaters
    // });
    
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   "Content-Type": "json"
      // },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = util.movies(moviesDouban);
    
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  onMoreTap:function (e) {
    var category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url:'more-movie/more-movie?category='+category
    })
  },
  onMovieTap:function (e) {
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },
  onBindFocus:function () {//光标点入搜索
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onCancelImgTap:function () {  //点击X关闭
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  },
  onBindConfirm:function (e) {//搜索电影
    var text =e.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})