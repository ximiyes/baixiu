// 热门推荐数据
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function (response) {
        // console.log(response);
        let recommendTpl = 
        `
        {{each data}}
        <li>
        <a href="javascript:;">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
        </li>
        {{/each}}
      `;

      let html = template.render(recommendTpl, {data:response});
        $('#recommendBox').html(html);


    }
});
