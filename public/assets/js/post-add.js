// 获取所属分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response);
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
    console.log($('#articleForm').serialize());
    console.log($('#thumbnail').val());
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

    })

})