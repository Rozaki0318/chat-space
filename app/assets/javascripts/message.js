$(function (){
  function buildHTML(message) {
    let imagehtml = (message.image) ? `<img class="chat__message-image" src="${message.image}">` : "";
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
    $('.chat__messages').append(html);
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

  var interval = setInterval(function() {
    var LastMsgId = $('.chat__message').last().attr('message-id');

    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: window.location.href,
        type: "GET",
        data: { id: LastMsgId },
        dataType: "json"
      })

      .done(function(data){
        data.forEach(function(message){
          buildHTML(message);
        })
        $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'slow' );
      })

      .fail(function(){
        alert("Automatically update is failed")
      })

    } else {
      clearInterval(interval);
    }
  }, 5000 );
});
