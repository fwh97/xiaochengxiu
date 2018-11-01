const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarsArray =function (stars, average) {
    var num = stars.toString().substring(0, 1);
    // var num2 = average.toString().substring(1, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= num) {
        array.push(1);
      }
      else {
        array.push(0);
      }
    }
    console.log(array);
    return array;
  }

const http=function (url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

const movies=function (moviesDouban) {
  var movies = [];
  for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    return movies
}

const nextUrl =function (requestUrl, totalCount, callback) {
  var url=requestUrl +
    "?start=" + totalCount + "&count=20";
  http(url, callback)
  wx.showNavigationBarLoading()//在当前页面显示导航条加载动画。
} 

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray:convertToStarsArray,
  http:http,
  nextUrl:nextUrl,
  movies:movies,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos
}
