$(function (){
  function buildHTML(message){
    var html =
      `<div class="message">${message.content}</div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
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
