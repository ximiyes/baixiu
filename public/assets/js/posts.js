// 渲染所有文章数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response);
        let html = template('articleTpl', response);
        // 将数据写入到tbody中
        $('tbody').html(html);
    }
});

// 事件格式化函数
function formateDate(date){
    // 将日期时间字符串转化为日期对象
    date = new Date(date);
    // padStart 不够就补位 用于补0
    return date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2,0) + '-' + date.getDate().toString().padStart(2,0);
}

// 获取所有分类的数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // response 拿到的数据是数组 
        console.log(response);
        let html = template('categoriesTpl', {list:response});
        // 将数据插入到分类的下拉栏中
        $('#categorieSelect').html(html);
    }
});














