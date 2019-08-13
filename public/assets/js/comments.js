// 请求接口  获取所有的评论的数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        $('#commentsBox').html(template('commentsTpl',response))
    }
});
