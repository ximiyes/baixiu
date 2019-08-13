let slidesImages = [];

// 给文件上传控件标签绑定change事件
$('#file').on('change', function () {
    // 获取文件对象
    let file = this.files[0];
    // console.log(file);
    // 创建FormData对象
    let formData = new FormData();
    // 将选择的文件添加到formData里面
    formData.append('image', file);
    // 向服务器发送ajax请求
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉ajax方法，不要处理formdata参数的格式
        processData: false,
        //告诉ajax不设置文件类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#image').val(response[0].image);
            $('.thumbnail').attr('src', response[0].image).show();

        }
    });
});

// 展示所有的轮播图片
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        // console.log(response);
        slidesImages = response
        $('tbody').html(template('slideTpl', {
            list: slidesImages
        }));

    }
});




// 给添加按钮绑定单击事件 渲染图片
$('.btn-primary').on('click', function () {
    // 拿到表单提交的数据
    let formData = $('#slidesForm').serialize();
    // console.log(formData);
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            // console.log(response);
            // $('tbody').html(template('slideTpl', response));
            $('.thumbnail').hide();
            $('#text').val('');
            $('#link').val('');
            slidesImages.push(response);
            $('tbody').html(template('slideTpl', {
                list: slidesImages
            }));
        }
    })
});


// 轮播图删除功能   删除按钮是动态生成的
// 给删除按钮的父元素注册点击事件
$('tbody').on('click', '#del', function () {
    // 拿到点击删除的那条数据的id
    let id = $(this).attr('data-id');
    // console.log(slidesImages);
    // return;
    $.ajax({
        type: "delete",
        url: "/slides/" + id,
        success: function () {
            // 拿到id后 去数组里面删除这条id 的数据  最后渲染数据
            let index = slidesImages.findIndex(item => item._id == id);
            // console.log(index);
            // console.log(index);
            slidesImages.splice(index, 1);
            $('tbody').html(template('slideTpl', {
                list: slidesImages
            }));
        }
    });
    

    

});