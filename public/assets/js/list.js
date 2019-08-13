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
let cid = getUrlParams('id');
// console.log(cid);
if(cid!=-1){
    $.ajax({
        type: "get",
        url: "/posts/category/"+cid,
        success: function (response) {
            // 拿到分类对应的文章列表
            // console.log(response);
            let html = template('categoryArticleList', {data:response});
            $('.panel').html(html);
        }
    });
}else{
    location.href = '/index.html';
}

