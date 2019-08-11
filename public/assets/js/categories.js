// 展示分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        categoriesArr = response;
        render(categoriesArr);
    }
});

// 添加分类功能
let categoriesArr = [];
$('#add').on('click', function () {
    // console.log($('#categoriesForm').serialize());
    $.ajax({
        type: "post",
        url: "/categories",
        data: $('#categoriesForm').serialize(),
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert('添加用户失败')
        }
    });

});

// 渲染页面函数
function render(arr) {
    let str = template('categoriesTpl', {
        list: arr
    });
    $('tbody').html(str);
};

// 分类编辑操作
// 编辑的话 首先要拿到当前编辑的id 根据id 去拿到当前的对象 把当前的对象的title className写入到左边的表单中  编辑是动态生成的 所以要用到事件委托  把点击事件注册到编辑按钮的父元素身上
let editId;
$('tbody').on('click', '.btn-info', function () {
    // 修改标题
    $('h2').text('编辑分类');
    // 隐藏添加  显示编辑
    $('#add').hide();
    $('#edit').show();
    // 拿到当前点击编辑的id
    editId = $(this).parent().attr('data-id');
    // alert(editId);
    $.ajax({
        type: "get",
        url: "/categories/" + editId,
        success: function (response) {
            // 拿到药修改的那个数据了 把当前的数据写入到左边的表单中
            // console.log(response);
            $('#categoryName').val(response.title);
            $('#icon').val(response.className);

        }
    });
});

// 修改分类操作
$('#edit').on('click', function () {
    $.ajax({
        type: "put",
        url: "/categories/" + editId,
        data: $('#categoriesForm').serialize(),
        success: function (response) {
            // 拿到当前要修改的那条数据  在数组中找到这条数据的下标 将这条数组替换掉数组里面的那一条数据
            // console.log(editId);
            // console.log(response);
            let index = categoriesArr.findIndex(item => item._id == editId);
            // console.log(index);
            categoriesArr[index] = response;
            render(categoriesArr);
            // 将表单里面的数据清空
            $('#categoryName').val('');
            $('#icon').val('');
            $('h2').text('添加分类');
            // 隐藏添加  显示编辑
            $('#add').show();
            $('#edit').hide();


        }
    });
})