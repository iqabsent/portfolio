// this is all jQuery
$(document).ready(function(){ // this runs as soon as the page has loaded

  // a utility function to load page content via ajax
  function loadPage(menu_id) {
    var $menu_item = $('#' + menu_id);         // find menu item matching id
    var path = $menu_item.attr('href'); // get it's href
    // change class (CSS) to mark clicked item as active, and others as not
    $menu_item.parent().addClass("active").siblings().removeClass("active");  
    // and load href into page container
    $("#page").load(path, function(response, status){
      // when that's done..
      setHash(menu_id);                  // set hash
      $("#page").css('height','auto');  // adjust page height
      window.scrollTo(0, 0);            // scroll to top
      if(status == "error") {           // load 404 page if there's an error
        $("#page").load("pages/404.html");
      }
    });
  }

  // navigation menu
  $("nav li a").click(function(e){  // a click on <a> inside <li> inside <nav>
    e.preventDefault();             // stop the link from firing
    var target = $(this).attr('id');
    loadPage(target);               // load the page
  });
  
  // hash change listener(s .. for compatibility)
  if (window.addEventListener) {
    window.addEventListener("hashchange", hashChange, false);
  } else if (window.attachEvent) {
    window.attachEvent("onhashchange", hashChange);
  }
  function hashChange(e) {
    if( window.location.hash == "#top") {
      setHash(currentPage()); // if it's a top link, restore correct hash
    } else if(window.location.hash.substr(1) != currentPage()){
      loadPage(window.location.hash.substr(1)); // if not and the page isn't loaded, load it
    }
  }
  
  function setHash(hash) {
    // trick to stop the page from scrolling when setting the hash
    $('html').attr('id', hash);   // set id of <html> to hash
    // without trick, this next line does unwanted srolling
    window.location.hash = hash;  // set on-page/local link (the # bit of url)
    $('html').attr('id', "");     // undo the trick
  }
  
  function currentPage() {
    return $('#page').children(':first-child').attr('id').replace('-page','');
  }
 
  // check for a local hash link (if any) or use "hello"
  var hash = window.location.hash.substr(1) || "hello";  
  loadPage(hash); // load the page
  
  // filtering by tag
  $(document).on('click', ".tag span", function() {
    var filter_class = $(this).attr("class") || "";
    $("article").show();  // show all articles
    // hide the ones which not has tag filtered for
    $("article:not(:has(.tag span."+filter_class+"))").hide();
  });
});