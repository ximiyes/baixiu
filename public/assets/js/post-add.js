// 获取所属分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        let html = template('categoryTpl', {
            list: response
        });
        $('#category').html(html);

    }
});

// 图片预览功能
// 给文件上传控件绑定change事件
$('#feature').on('change', function () {
    let file = this.files[0];
    // console.log(file);
    // 创建formData对象 实现二进制文件上传功能
    let formData = new FormData();
    // 将选择的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面的上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // 拿到的是数组 里面是路径对象
            // cover: "\uploads\upload_d73335ed6d6bf6870c2bfdbc24046b94.png"
            // console.log(response);
            // 将图片的路径保存到隐藏域中
            $('#thumbnail').val(response[0].cover);
            // console.log(response[0].cover);
            // 预览图片
            $('.thumbnail').attr('src', response[0].cover);
            $('.thumbnail').on('load', function () {
                $(this).show();
            });
        }
    });
});

// 给保存按钮添加单击事件  文章添加功能
$('.btn-primary').on('click', function () {
    // console.log($('#articleForm').serialize());
    // console.log($('#thumbnail').val());
    // return;
    // $.ajax({
    //     type: "post",
    //     url: "/posts",
    //     data: $('#articleForm').serialize(),
    //     success: function (response) {
    //         console.log(response)
    //         // 文章添加成功 跳转到文章列表页面
    //         location.href = '/admin/posts.html';
    //     },
    //     error: function(){
    //         alert('文章添加失败');
    //     }
    // });
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $('#articleForm').serialize(),
        success: function () {
            // 需要跳转到展示文章的列表页
            location.href = "/admin/posts.html";
        },
        error: function (err) {
            console.log(err);
        }

    });

});


// 文章编辑功能
// 添加文章和编辑文章公用一个页面 所以要判断一下是添加还是修改 url地址栏有id参数就是修改 url栏没有id参数就是添加

// 定义一个函数 获取到文章的id  
// id=5d4fa541dd2b893fc46eab35  这种形式 传入 'id' 可以拿到 id的值
function getUrlParams(name) {
    let paramsArr = location.search.substr(1).split('&');
    // ["id=5d4fa541dd2b893fc46eab35"]
    // console.log(paramsArr);
    //循环数组
    let len = paramsArr.length;
    for (let i = 0; i < len; i++) {
        let temp = paramsArr[i].split('=');
        // console.log(temp);
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;

};

// console.log(getUrlParams('id'));
// 5d4fa541dd2b893fc46eab35

// 获取浏览器地址栏的id参数
let id = getUrlParams('id');
// console.log(id);
// 如果id的值不等于-1 就说明是在进行修改操作
if (id != -1) {
    // 根据id 拿到文章的详细信息 
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {

            // console.log(response);
            // 拿到文章详细信息后   还有拿到文章所属分类
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    // 渲染模板  分类信息封装到文章详细信息的对象中  这样我们就能在模板中拿到分类的信息了
                    // console.log(categories);
                    // 给response添加一个属性categories 属性值是categories
                    response.categories = categories;
                    // console.log(response);
                    let html = template('modifyArticle', response);
                    $('.container-fluid').html(html);



                }
            });
        }
    });
};



// 事件格式化函数
// function formateDate(date) {
//     // 将日期时间字符串转化为日期对象
//     // date = new Date(date);
//     date = new Date(date);
//     // padStart 不够就补位 用于补0
//     return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)+'-'+date.getMinutes().toString().padStart(2, 0)+':'+date.getSeconds().toString().padStart(2, 0);
// };
// console.log(formateDate("2019-08-22T03:11:00.000Z"));


// 给修改按钮绑定单击事件
// 由于修改按钮是动态生成的  所以要将单击事件绑定在修改按钮的父元素上
$('.container-fluid').on('click', '#modifyButton', function () {
    // 拿到表单提交的数据   
    // alert('11');
    // console.log($('#modifyArticleForm'));
    let formData = $('#modifyArticleForm').serialize();
    // console.log($('#modifyArticleForm').serialize());
    // 拿到当前提交数据的id
    let id = $('#modifyArticleForm').attr('data-id');
    // console.log(id);

    // 发送ajax请求 拿到当前id 的文章数据  调用接口修改
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html';
        }
    });





});