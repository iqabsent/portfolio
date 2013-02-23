$(document).ready(function(){

  $("#page").load("pages/hello.html");

  $("nav li a").click(function(e){
    //if($(this).parent().is("li:first-child")) return;
    e.preventDefault();
    $(this).parent().addClass("active").siblings().removeClass("active");
    $("#page").load($(this).attr("href"), function(response, status){
      $("#page").css('height','auto');
      if(status == "error") {
        $("#page").load("pages/404.html");
      }
    });
  });
});