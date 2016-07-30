var rocky = _rocky;

var health = {
  sumAveraged: function(metric, time_start, time_end, scope) {
    return 0;
  },
  sumToday: function(metric) {
    return 0;
  }
}

var strider = {
  getStepGoal: function() {
    var time_start = new Date();
    time_start.setHours(0,0,0,0);

    var time_end = new Date();
    time_end.setHours(23,59,59,999);

    /* return health.sumAveraged('HealthMetricStepCount', time_start, time_end, 
      'HealthServiceTimeScopeDaily');*/
    return 9000;
  },
  getStepCount: function() {
    //return health.sumToday('HealthMetricStepCount');
    return 1200;
  },
  getStepAverage: function() {
    var time_start = new Date();
    time_start.setHours(0,0,0,0);

    var time_end = new Date();

    /*return health.sumAveraged('HealthMetricStepCount', time_start, time_end, 
      'HealthServiceTimeScopeDaily');*/
    return 4000;
  },
  drawDots: function(ctx) {
    var points = 12;
    var radius = 66;
    var centerX = 70;
    var centerY = 84;
    for(var index = 0; index < points; index++) {
      var x = centerX + radius * Math.cos(2 * Math.PI * index / points);
      var y = centerY + radius * Math.sin(2 * Math.PI * index / points);   
      ctx.fillStyle = 'darkgray';

      // TODO: Can't draw circles
      ctx.fillRect(x, y, 4, 4);
      //ctx.fillRadial(x, y, 4, 0, 0, Math.PI);
    }
  }
}

// DRAW
rocky.on('draw', function(drawEvent) {
  var ctx = drawEvent.context;
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var obstruction_h = ctx.canvas.clientHeight - ctx.canvas.unobstructedHeight;
  var d = new Date();
  var is_round = false;

  // Sorry Heiko
  if (ctx.canvas.clientWidth == 180) { // TODO: WatchInfo.model.name == ??
    // CHALK
    is_round = true;
  }

  // BLANK CANVAS
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // DOTS
  strider.drawDots(ctx);

  // TIME
  var clockTime = leftpad(d.getHours(), 2, 0) + ':' + leftpad(d.getMinutes(), 2, 0); // TODO: Detect 24h
  ctx.font = '30px bolder Bitham';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFF';
  ctx.fillText(clockTime, w / 2, ((is_round) ? 82 : 78));

  // STEPS
  var stepCount = strider.getStepCount();
  var stepAverage = strider.getStepAverage();

  if (stepCount >= stepAverage) {
    ctx.fillStyle = 'jaegergreen';
  } else {
    ctx.fillStyle = 'pictonblue';
  }
  ctx.font = '24px bold Gothic';

  // STEP COUNT
  var shoeWidth = 33;
  var center = w / 2;
  var stepWidth = ctx.measureText(numberWithCommas(stepCount)).width;
  var combinedWidth = stepWidth + shoeWidth;

  ctx.textAlign = 'left';
  ctx.fillText(numberWithCommas(stepCount), center - (combinedWidth / 2), ((is_round) ? 58 : 54));

  // SHOE
  shoe.d(ctx, ctx.fillStyle, (center - (combinedWidth / 2)) + (stepWidth - 6), 45);

  drawReason = {};
});

// TICK
rocky.on('minutechange', function() {
  rocky.requestDraw();
});


// HELPERS
function numberWithCommas(n) {
  var parts=n.toString().split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
};

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
};

// Heiko's magic shoe
var shoe = {"w":0,"h":0,"d":function($, color, x, y){
$.save();
$.strokeStyle = "#000000";
$.font = "10px sans-serif";
$.save();
$.font = "10px sans-serif";
$.save();
$.fillStyle = color;
$.font = "10px sans-serif";
$.beginPath();
$.moveTo(16.7+x,26.4+y);
$.lineTo(17.7+x,27.6+y);
$.lineTo(38.3+x,27.6+y);
$.lineTo(36.1+x,24.7+y);
$.lineTo(28.9+x,24.7+y);
$.lineTo(27+x,23.1+y);
$.lineTo(23.6+x,26.5+y);
$.lineTo(22.2+x,25.1+y);
$.lineTo(25.4+x,21.8+y);
$.lineTo(23.8+x,20.5+y);
$.lineTo(20.6+x,23.8+y);
$.lineTo(19.2+x,22.3+y);
$.lineTo(22.3+x,19.2+y);
$.lineTo(20.6+x,17.8+y);
$.lineTo(15.9+x,22.3+y);
$.lineTo(10.9+x,18.4+y);
$.lineTo(10.9+x,26.4+y);
$.lineTo(16.7+x,26.4+y);
$.closePath();
$.fill();
$.stroke();
$.restore();
$.save();
$.fillStyle = color;
$.font = "10px sans-serif";
$.beginPath();
$.moveTo(19.3+x,29.6+y);
$.lineTo(21.1+x,31.9+y);
$.lineTo(39.1+x,32.2+y);
$.lineTo(39.1+x,29.6+y);
$.lineTo(19.3+x,29.6+y);
$.closePath();
$.fill();
$.stroke();
$.restore();
$.save();
$.fillStyle = color;
$.font = "10px sans-serif";
$.beginPath();
$.moveTo(15.8+x,28.4+y);
$.lineTo(10.9+x,28.4+y);
$.lineTo(10.9+x,32.2+y);
$.lineTo(18.8+x,32.2+y);
$.lineTo(15.8+x,28.4+y);
$.closePath();
$.fill();
$.stroke();
$.restore();
$.restore();
$.restore();
},"i":{}};
