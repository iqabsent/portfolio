// this is all jQuery
$(document).ready(function(){ // this runs as soon as the page has loaded

  // navigation menu
  $("nav li a").click(function(e){    // a click on <a> inside <li> inside <nav>
    var target = $(this).attr('id');  // get id of item clicked
    // trick to stop setting the hash from scrolling the page
    $('html').attr('id', target);     // set id of <html> to target
    // without trick, this does unwanted srolling
    window.location.hash = target;    // set on-page/local link (the # bit of url)
    $('html').attr('id', "");         // undo the trick
    e.preventDefault();               // stop the link from firing
    // .. because we changed the window.location.hash, the hash change event will
    // fire which we set up a listener for
  });
  
  // hash change listener
  $(window).on('hashchange', function() {
    // check for top links
    if(window.location.hash == "#top") {
      // restore correct hash
      window.location.hash = $('#page').children(':first-child').attr('id');
      return;
    }
    // calls loadPage when the hash change event fires
    loadPage(window.location.hash);
  });
  
  // load page into #page container from href in nav menu item with id matching hash
  function loadPage(hash) {
    // change class (CSS) to mark clicked item as active, and others as not
    $(hash).parent().addClass("active").siblings().removeClass("active");
    // find menu item with id matching hash and load href into page container
    var page = $(hash).attr("href");
    $("#page").load(page, function(response, status){
      // when that's done..
      $("#page").css('height','auto');  // adjust page height
      window.scrollTo(0, 0);  // scroll to top
      if(status == "error") { // load the 404 page if there's an error
        $("#page").load("pages/404.html");
      }
    });
  }
  
  // check for a local hash link (if any) or use "hello"
  var hash = window.location.hash || "#hello";
  loadPage(hash); // load the page
  
  // filtering by tag
  $(document).on('click', "div.tag span", function() {
    var filter_class = $(this).attr("class") || "";
    $("article").show();  // show all articles
    // hide the ones which not has tag filtered for
    $("article:not(:has(.tag span."+filter_class+"))").hide();
  });
});