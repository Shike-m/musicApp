
const player = document.querySelector("audio");
player.onplaying = function(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var distortion = audioCtx.createWaveShaper();
    var stream = player.getAttribute("src");
    var request = new XMLHttpRequest();
    request.open("GET", "songs/ZGCG.mp3", true);
    request.responseType = "arraybuffer";

    request.onload = function() {
        audioCtx.decodeAudioData(request.response, function(buffer) {
        source = audioCtx.createBufferSource();  
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        // auto play
        source.start(0); // start was previously noteOn
      });
    };

    request.send();
    console.log(stream);
    // var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    source.connect(distortion);
}