$(document).ready(function(){
  var paper = Raphael($('#shuffle-canvas'),$('#shuffle-canvas').width(), $('#shuffle-canvas').height());
  var sequence_path = ["M26,-6", "L14,-12", "L5,-20", "L11,-28", "L14,-37", "L5,-40"];
  drawpath(paper, 
          sequence_path, 
          3500, 
          { stroke: 'black', 'stroke-width': 2, 'stroke-opacity': 1, fill: 'none', 'fill-opacity': 0 }, 
          function()
          {
              alert("All done");    // trigger whatever you want here
          } );
});


function drawpath( canvas, pathstr, duration, attr, callback )
{
  var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
  var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
  var total_length = guide_path.getTotalLength( guide_path );
  var last_point = guide_path.getPointAtLength( 0 );
  var start_time = new Date().getTime();
  var interval_length = 50;
  var result = path;        

  var interval_id = setInterval( function()
  {
    var elapsed_time = new Date().getTime() - start_time;
    var this_length = elapsed_time / duration * total_length;
    var subpathstr = guide_path.getSubpath( 0, this_length );            
    attr.path = subpathstr;

    path.animate( attr, interval_length );
    if ( elapsed_time >= duration )
    {
      clearInterval( interval_id );
      if ( callback != undefined ) callback();
      guide_path.remove();
    }                                       
  }, interval_length );  
  return result;
}