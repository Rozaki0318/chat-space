$(function (){
  function buildHTML(message) {
    if (message.content && message.image.url) {
      var html =
      '<div class="chat__message">' +
        '<div class="chat__message-user">' +
          message.user_name +
        '</div>' +
        '<div class="chat__message-date">' +
          message.created_at +
        '</div>' +
        '<div class="chat__message-text">' +
          '<p class="chat__message-text-content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="chat__message-image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      var html =
      '<div class="chat__message">' +
        '<div class="chat__message-user">' +
          message.user_name +
        '</div>' +
        '<div class="chat__message-date">' +
          message.created_at +
        '</div>' +
        '<div class="chat__message-text">' +
          '<p class="chat__message-text-content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      var html =
      '<div class="chat__message">' +
        '<div class="chat__message-user">' +
          message.user_name +
        '</div>' +
        '<div class="chat__message-date">' +
          message.created_at +
        '</div>' +
        '<div class="chat__message-text">' +
          '<img src="' + message.image.url + '" class="chat__message-image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var latestmsg = buildHTML(data);
      $('.chat__messages').append(latestmsg);
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'slow' );
      $('#new_message')[0].reset();
      $('.footer-form__send-btn').prop('disabled', false);
    })

    .fail(function() {
      alert('error');
    })
  })
})
