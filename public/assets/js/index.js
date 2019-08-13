// 发送ajax请求  渲染页面中动态的数据
// 请求文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function (response) {
        // console.log(response);
        $('#articleCount').html(`<strong>${response.postCount}</strong>篇文章（<strong>${response.draftCount}</strong>篇草稿）`)
    }
});

// 请求分类的数量
$.ajax({
    type: "get",
    url: "/categories/count",
    success: function (response) {
        $('#categoriesCount').html(`<strong>${response.categoryCount}</strong>个分类`);
    }
});


// 请求评论的数量
$.ajax({
    type: "get",
    url: "/comments/count",
    success: function (response) {
        $('#commentsCount').html(`<strong>${response.commentCount}</strong>条评论`)
    }
});




