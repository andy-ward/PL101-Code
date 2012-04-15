var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'par',
         left: { tag: 'note', pitch: 'c3', dur: 250 },
         right: { tag: 'note', pitch: 'g4', dur: 500 } },
      right:
       { tag: 'par',
         left: { tag: 'note', pitch: 'd3', dur: 500 },
         right: { tag: 'note', pitch: 'f4', dur: 250 } } };
var melody_note = [
    { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
    { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
    { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
    { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];
var transform = function(expr, time) {
    return {tag:'note',
            pitch: expr.pitch,
            start: time,
            dur: expr.dur
           };
};
var endTime = function(expr) {
    return expr.start + expr.dur;
};
var maxEndTime = function(exprls) {
    var max_start = 0;
    for (var i = 0; i < exprls.length; ++i) {
        if (endTime(exprls[i]) > max_start) {
            max_start = endTime(exprls[i]);
        }
    }
    return max_start;
};
var compile = function(musexpr, start) {
    var output = [];
    var lcode, rcode, new_start;
    if (musexpr.tag == 'seq') {
        lcode = compile(musexpr.left, start);
        new_start = maxEndTime(lcode);
        rcode = compile(musexpr.right, new_start);
        return output.concat(lcode).concat(rcode);
    }
    else if (musexpr.tag == 'par') {
        lcode = compile(musexpr.left, start);
        rcode = compile(musexpr.right, start);
        return output.concat(lcode).concat(rcode);
    }
    else {
        return [transform(musexpr, start)];
    }
};
var actualmus = compile(melody_mus, 0);
console.log(actualmus == melody_note);
