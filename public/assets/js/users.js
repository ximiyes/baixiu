 
let userArr = [];
// 将用户列表展示出来
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // console.log(response);
        userArr=response;
        render(userArr);
    }
});

// 渲染页面
function render(arr){
    let str = template('userTpl', {
        list: arr
    });
    $('tbody').html(str);
};

// 添加用户功能
$('#userAdd').on('click', function(){
    $.ajax({
        type: "post",
        url: "/users",
        data: $('#formData').serialize(),
        success: function (response) {
            
        },
        error: function(){
            alert('用户添加失败');
        }
    });
});

// 用户头像上传功能
// 当用户选择文件的时候 选择文件上传控件
$('#modifyBox').on('change', '#avatar', function(){
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    // console.log(this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            // console.log(response);
            // 实现预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});


let userId;
// 用户编辑功能
// 给用户编辑按钮绑定点击事件  当点击编辑按钮的时候给它的父元素添加属性
$('tbody').on('click', '.edit', function(){
    // 保存当前被修改的用户的id
    userId = $(this).parent().attr('data-id');
    $('h2').text('修改用户');
    // 获取当前被点击的这个元素的祖先
    let trObj = $(this).parents('tr');
    // 将对应的内容写入到左边的表单中
    let imgSrc = trObj.children().eq(1).children().attr('src');
    // 如果有上传用户的图片, 就将该路径写入到src属性中 如果没有 就给该图片一个默认的src
    if(imgSrc){
        $('#preview').attr('src', imgSrc);
    }else{
        $('#preview').attr('src',"../assets/img/default.png");
    }

    // 将当前图片的src给隐藏域
    $('hiddenAvatar').val(imgSrc);
    // 将email写入到左边表单中
    $('#email').val(trObj.children().eq(2).text());
    // 将用户呢城学入到左边表单中
    $('#nickName').val(trObj.children().eq(3).text());

    let status = trObj.children().eq(4).text();
    let role = trObj.children().eq(5).text();

    if(status=='激活'){
        $('#jh').prop('checked', true);
    }else{
        $('#wjh').prop('checked', true);
    }

    if(role=='超级管理员'){
        $('#admin').prop('checked', true);
    }else{
        $('#normal').prop('checked', true);
    }

    $('#userAdd').hide();
    $('#userEdit').show();
    
});

// 用户修改功能
// 我们生成模板的时候 可以将用户的id赋值给某一个标签的自定义属性 绑定id到添加和删除的父元素上 删除的时候也比较好找到删除按钮
// 点击编辑用户, 给标签添加自定义属性 data-id 可以拿到当前点击的用户的id 根据这个id 拿到这个对象 最后将修改的数据赋值给当前的用户即可
$('#userEdit').on('click', function(){
    console.log($('#formData').serialize());
    $.ajax({
        type: "put",
        url: "/users/"+userId,
        data: $('#formData').serialize(),
        success: function (response) {
            // console.log(response);
            // response 返回的是修改的那个元素对象
            let index = userArr.findIndex(item=>item._id==userId);
            userArr[index]= response;
            render(userArr);
        }
    });
})



