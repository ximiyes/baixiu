// 首先做图片预览功能
// 给图片上传控件添加change事件
$('#file').on('change', function(){
    let file = this.files[0];
    // console.log(file);
    // console.log(file);
    // 创建formdata对象
    let formData = new FormData();
    // 将文件追加到表单数据里面
    formData.append('logo', file);
    // 发送ajax请求  将图片的路径保存到隐藏域中
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            // console.log(response);
            // 拿到的是数组  数组里面是对象  {logo: "\uploads\upload_217b00826b9935f1dfdf484595cafabe.png"}
            // 将图片路径写入到隐藏域中
            $('#logo').val(response[0].logo);
            // 预览图片
            $('#prev').attr('src', response[0].logo);
            
        }
    });
    
});


// 点击保存设置  先将表单里面的数据提交到服务器  然后再发送请求将数据渲染到页面上
$('#saveSettings').on('click', function(){
    let formData = $('#settingsFormData').serialize();
    console.log(formData);
    // 拿到表单数据后 发送ajax请求
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            console.log(response);
        }
    });

});


// 展示设置







