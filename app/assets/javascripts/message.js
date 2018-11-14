$(function (){
  function buildHTML(message){
     var html =
      `<div class="chat-main__body">
        <div class="chat-main__body--messages-list">
          <div class="chat-main__message clearfix" data-id="2096">
            <div class="chat-main__message-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-time">
              ${message.created_at}
            </div>
            <div class="chat-main__message-body">
              <p class="chat-main__message__content">
                ${message.content}
              </p>
              <div class="chat-main__message__image">
                ${message.img}
              </div>
            </div>
          </div>
        </div>
      </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log("jsjsjs")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.content').append(html)
      $('.image').val('')
    })

    .fail(function(){
      alert('error');
    })
  })
})
