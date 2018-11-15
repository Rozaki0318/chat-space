$(function (){
  var search_list = $("#user-search-result")
  var append_list = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.user_name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="
                  ${ user.user_id }" data-user-name="${ user.user_name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(Nousertext) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ Nousertext }</p>`
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      $('#user-search-result').empty();
      if (data.length !== 0) {
        data.forEach(function(data){
          appendUser(data);
        });
      }
      else {
        appendNoUser("一致するユーザーはいませんでした");
      }
    })
    // .fail(function(){
    //   alert('Error');
    // })
  });
});


