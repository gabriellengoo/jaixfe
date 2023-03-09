  // ----------------------------------- follow ----------------------------------------------------

  $(document).mousemove(function(e){
    $("#image").css({left:e.pageX, top:e.pageY});
});
$( document ).on( "mousemove", function( event ) {
  $( "#log" ).text( "pageX: " + event.pageX - ", pageY: " + event.pageY );
  $( "#tooltip" ).css({ "left" : event.pageX - 50, "top" : event.pageY - 50});
  $( "#tooltip2" ).css({ "left" : event.pageX - 50, "top" : event.pageY - 50});
  $( "#image" ).css({ "left" : event.pageX - 50, "top" : event.pageY - 50});
});