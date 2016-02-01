function video_init(video_id, cardboard_id) {
  peer = new Peer({host: 'withoutroots.com', port: 9000, secure: true, debug: 2});
  peer.on('open', function(id) {
    $('div.cardboard-id').html(id);
  });
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  video = document.getElementById( video_id );
  video.autoplay = true;
  var option = {
    video: { mandatory:{ minWidth: 1280 } },
    audio: true
  }

  peer.on('call', function(call) {
    call.answer();
    call.on('stream', function(stream) {
      video.src = window.URL.createObjectURL(stream);
    });
    cardboard_view();
  });

  if(cardboard_id) {
    navigator.getUserMedia(option,
      function(stream) {
        video.src = window.URL.createObjectURL(stream);
        var call = peer.call(cardboard_id, stream);
      },
      function(err) {
        console.log('Failed to set local stream or complete call' ,err);
      }
    );
    theta_view();
  }
}
