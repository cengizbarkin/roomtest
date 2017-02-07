countdown = 5;

var timer = setInterval(function(callback) {
  countdown--;
  //io.sockets.emit('timer', { countdown: countdown });
  console.log(countdown);
  if(countdown == 0) {
    callback();
  }
}, 1000, (str) => {
  clearInterval(timer);
  console.log('bitti');
});
