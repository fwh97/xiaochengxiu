var postData = require('../../data/data.js')

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imgUrls:[],
    postList:[]
  },
  onLoad:function(){
    this.setData({
      imgUrls: postData.imgUrls,
      postList:postData.postList
    })
  },
  onSwiperTap: function (e){
    var postId = e.target.dataset.postid;
    console.log(postId)
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    console.log("on post id is" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },


})