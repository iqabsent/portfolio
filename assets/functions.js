// this is all jQuery
$(document).ready(function(){ // this runs as soon as the page has loaded

  // load the hello page into the page container (the div with id=page)
  $("#page").load("pages/hello.html");

  // navigation menu stuff
  $("nav li a").click(function(e){  // a click on <a> inside <li> inside <nav>
    e.preventDefault(); // stop the link from firing
    // change class (CSS) to mark clicked item as active
    $(this).parent().addClass("active").siblings().removeClass("active");
    // load via an Ajax call .load(), into the element (a <div>) with id set to
    // "page", the URL (href) of $(this), this being the link which was clicked
    $("#page").load($(this).attr("href"), function(response, status){
      $("#page").css('height','auto');  // adjust page height
      window.scrollTo(0, 0);  // scroll to top
      if(status == "error") { // load the 404 page if there's an error
        $("#page").load("pages/404.html");
      }
    });
  });
  
  $(document).on('click', "div.tech span", function() {
    var filter_class = $(this).attr("class") || "";
    $("article:not(:has(.tech span."+filter_class+"))").hide();
  });
});