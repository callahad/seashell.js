// Thanks to:
// - http://noisehack.com/generate-noise-web-audio-api/
// - https://medium.com/web-audio/you-dont-need-that-scriptprocessor-61a836e28b42#.te1de1xc6

var ctx = new AudioContext();
var buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
var data = buffer.getChannelData(0);

var last = 0;
for (var i = 0; i < ctx.sampleRate; i++) {
  last = (last + (0.02 * (Math.random() * 2 - 1))) / 1.02;
  data[i] = last * 3.5;
}

var node = ctx.createBufferSource();
node.buffer = buffer;
node.loop = true;
node.start();

window.addEventListener('userproximity', function(event) {
  event.near ? node.connect(ctx.destination) : node.disconnect(ctx.destination);
});
