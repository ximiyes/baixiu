
// 轮播图数据展示
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        $('.swipe-wrapper').html(template('slideTpl', {list:response}));
        $('.cursor').html(template('cursorTpl', {list:response}));
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    }
});

// 最新发布数据展示
$.ajax({
  type: "get",
  url: "/posts/lasted",
  success: function (response) {
    // 拿到最新发布的文章数据
    $('#newTplBox').append(template('newTpl', {data:response}));
  }
});
