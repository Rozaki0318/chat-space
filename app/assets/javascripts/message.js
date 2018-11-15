$(function (){
  function buildHTML(message) {
    let imagehtml = (message.image.url) ? `<img class="chat__message-image" src="${message.image.url}">` : "";
      let html =
        `<div class="chat__message">
          <div class="chat__message-user">
            ${message.user_name}
          </div>
          <div class="chat__message-date">
            ${message.created_at}
          </div>
          <div class="chat__message-text">
            <p class="chat__message-text-content">
              ${message.content}
            </p>
            ${imagehtml}
          </div>
        </div>`
    return html;
  }

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
      console.log(data);
      var latestmsg = buildHTML(data);
      $('.chat__messages').append(latestmsg);
      console.log(latestmsg);
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'slow' );
      $('#new_message')[0].reset();
      $('.footer-form__send-btn').prop('disabled', false);
    })

    .fail(function() {
      alert('error');
    })
  })
})
