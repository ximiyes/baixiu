// 存储文章数据的数组
let articleArr = [];

// 渲染所有文章数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response);
        // let html = template('articleTpl', response);
        // // 将数据写入到tbody中
        // $('tbody').html(html);
        articleArr = response.records;
        render(articleArr);

        // 渲染分页模板
        let html = template('pagenationTpl', response);
        $('.pagination').html(html);
    }
});

// 渲染文章列表
function render(arr) {
    let html = template('articleTpl', {
        data: arr
    });
    $('tbody').html(html);
}


// 事件格式化函数
function formateDate(dates) {
    // 将日期时间字符串转化为日期对象
    date = new Date(dates);
    // padStart 不够就补位 用于补0
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);
}

// 获取所有分类的数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // response 拿到的数据是数组 
        // console.log(response);
        let html = template('categoriesTpl', {
            list: response
        });
        // 将数据插入到分类的下拉栏中
        $('#categorieSelect').html(html);
    }
});

// 删除文章
// 根据文章id 删除文章 删除文章以后 重新渲染页面
// 给删除按钮绑定点击事件  由于删除按钮是动态生成的  所以要把事件绑定在删除按钮的父元素身上
$('tbody').on('click', '#del', function () {
    // 拿到点击删除的那条数据的id
    if (confirm('确定要删除吗')) {
        let id = $(this).parent().attr('data-id');
        // alert(id);
        // 根据这条id 给服务器发送ajax请求
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function (response) {
                // 拿到的是点击删除的那一条数据
                // console.log(response);
                // 根据这条数据 去数组里面拿到这条数据的索引 然后将这条数据删除 最后重新渲染页面
                let index = articleArr.findIndex(item => item._id == id);
                // alert(index);
                articleArr.splice(index, 1);
                render(articleArr);
            }
        });
    }
});


// 文章编辑功能
// 点击文章编辑  页面跳转到 文章添加页面  并且将点击编辑的那条文章的内容填写到 文章添加页面  修改文章后 调用接口 将这条数据更新到数组里面 最后渲染出来
// 因为文章编辑也是动态生成的 所以编辑的点击事件绑定在文章编辑的父元素上面



// 筛选功能
// 给筛选按钮绑定点击事件 点击筛选按钮 拿到筛选的条件 
// 向服务器发送ajax请求 拿到数据后 将数据渲染出来
$('#selectItem').on('click', function () {
    // 拿到筛选表单里面的数据
    let selectItemData = $('#filterForm').serialize();
    // console.log(selectItemData);
    $.ajax({
        type: "get",
        url: "/posts",
        data: selectItemData,
        success: function (response) {
            // 返回的是筛选的数据  返回的是对象  与分页的那种对象类似
            // console.log(response);
            // 取出
            render(response.records);
        }
    });
});

// 文章分页功能
// 定义一个函数  形参就是传入的页码 函数拿到传入的页码后 拿到这个页码发送ajax请求 拿到数据 渲染页码模板
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            let html = template('pagenationTpl', response);
            // 将数据写入到页码中
            $('.pagination').html(html);
            // 拿到当前页的article 将数据渲染到页面中
            // let htmlArticle = template('articleTpl', {data:response.records});
            // $('tbody').html(htmlArticle);
            render(response.records);
            
        }
    });
};


// 获取地址栏id  该id就是当前修改的那条数据的id  根据id 拿到当前的页码 渲染页面展示 


