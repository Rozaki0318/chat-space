$(function (){
  var search_list = $("#user-search-result")
  var append_list = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.user_name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.user_id }" data-user-name="${ user.user_name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(Nousertext) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ Nousertext }</p>`
    search_list.append(html);
  }

   function appendMember(add_user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-22'>
                  <input name='group[user_ids][]' type='hidden' value="${ add_user.userId}">
                  <p class='chat-group-user__name'>${ add_user.userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    append_list.append(html);
   }

  $(search_list).on('click', '.chat-group-user__btn--add', function() {
    var user = $(this).data();
    appendMember(user);
    $(this).parent().remove();
  });

  $(append_list).on("click",".chat-group-user__btn--remove ",function(){
    $(this).parent().remove();
  });

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
        $('#user-search-field').prop('disabled', false);
      }
      else {
        appendNoUser("一致するユーザーはいませんでした");
      }
    })

    .fail(function(){
      alert('Ajax通信 Error');
    })
  });
});


