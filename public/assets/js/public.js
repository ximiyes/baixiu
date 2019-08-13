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

// 随机推荐数据展示
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        // 拿到随机推荐的文章的数据
        let randerTpl =
            `
        {{each data}}
        <li>
            <a href="javascript:;">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `
        let html = template.render(randerTpl, {
            data: response
        });
        $('#randerTplBox').append(html);

    }
});

// 阿里百秀logo下面的分类数据展示
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        let categoryTpl = `
        {{each data}}
        <li>
            <a href="list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a>
        </li>
        {{/each}}
        `;

        let html = template.render(categoryTpl, {
            data: response
        });
        $('#categoryBox').html(html);
        $('#categoryBoxTop').html(html);
    }
});

// 给搜索submit按钮添加点击事件
$('.search form').on('submit', function () {

    // 获取用户在搜索框内输入的内容
    let keys = $(this).find('.keys').val();
    if (keys.trim().length == 0) {
        alert('请输入搜索内容');
        return;
    }
    // location.href = '/search.html?key=' + keys;
    // console.log(`/search.html?key=${keys}`)
    location.href = `/search.html?key=${keys}`;
    return false;

    

})