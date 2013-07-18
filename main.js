

  (function(){

  // the minimum version of jQuery we want
  var v = "1.3.2";

  // check prior inclusion and version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }

  function initMyBookmarklet() {
    (window.myBookmarklet = function() {

      var $gridGuide = $("<div id='grid_guide'></div>)")
      .css({'opacity':'1','position':'absolute','top':'0px','left':'0px','width':'100%','height':'100%','z-index':'9'});
      $gridGuide.appendTo('body');

      var $btnShowGridGuide = $("<a href='#'></a>").
      css({'position':"absolute",'text-align':'center','top':'0px','right':'0px','width':'30px','height':'30px','color':'white','background-color':'black','z-index':'99'})
      .html('X');
      $btnShowGridGuide.appendTo('body');
      $btnShowGridGuide.click(function(event){
        event.preventDefault();
        alert('show');
      });

      var gridSettings = {
        'hori':[["5","20px"],["5","100px"],["10","10px"]],
        'vert':[["20","100px"]]
      }

      drawGridGuides(gridSettings);

    })();

    function drawGridGuides(gridSettings){
      var $gridGuide = $('#grid_guide');
      var topOffset = 0;
      $.each(gridSettings.hori,function(i, obj){
        var lineCount = obj[0];
        var lineSpacingInt = parseInt(obj[1]);
        for(var i = 0; i < lineCount; i++){
          $("<div class='line'></div>").css({'height':'1px','background-color':'red','width':'100%','position':'absolute','left':'0px'})
          .css('top',(topOffset + lineSpacingInt)+"px").appendTo($gridGuide);
          topOffset += lineSpacingInt;
        }
      });

      var leftOffset = 0;
      $.each(gridSettings.vert,function(i, obj){
        var lineCount = obj[0];
        var lineSpacingInt = parseInt(obj[1]);
        for(var i = 0; i < lineCount; i++){
          $("<div class='line'></div>").css({'height':'100%','background-color':'red','width':'1px','position':'absolute','top':'0px'})
          .css('left',(leftOffset + lineSpacingInt)+"px").appendTo($gridGuide);
          leftOffset += lineSpacingInt;
        }
      });
    }
  }

})();
