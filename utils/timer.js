var timer = (countdown, io, socketName, room, callback) => {
  var startTimer = setInterval(function(internalCallback) {
    countdown--;
    io.to(room).emit(socketName, { countdown: countdown });
    console.log(countdown);
    if(countdown == 0) {
      internalCallback();
    }
  }, 1000, (internalCallback) => {
    clearInterval(startTimer);
    callback();
  });
}

module.exports = {
  timer
}
