

(function(){

  // the minimum version of jQuery we want
  var v = "1.9.1";

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
      .css({'opacity':'1'
        ,'position':'absolute'
        ,'top':'0px'
        ,'left':'0px'
        ,'width':'100%'
        ,'height':'100%'
        ,'z-index':'9'});

      var $form = $("#grid_guide_settings");
      var $btnShowGridGuide = $("<a href='#'></a>")
      .css({'position':"absolute"
        ,'text-align':'center'
        ,'top':'0px'
        ,'right':'0px'
        ,'width':'30px'
        ,'height':'30px'
        ,'color':'white'
        ,'background-color':'black'
        ,'z-index':'99'})
      .html('X');

      $gridGuide.appendTo('body');
      $btnShowGridGuide.appendTo($gridGuide);
      $btnShowGridGuide.click(function(event){
        event.preventDefault();
        alert('show');
      });

      $form.change(function() {
        console.log('Handler for .change() called.');
        gridSettings = getGridSettings($form);
        drawGridGuides(gridSettings);
      });

      gridSettings = getGridSettings($form);
      drawGridGuides(gridSettings);

    })();

    function getGridSettings($form){
      var gridSettings = {};
      gridSettings.margins = [];
      gridSettings.columns = [];
      gridSettings.rows = [];

      gridSettings.margins = {};
      var $margins = $form.find('.margins ');
      gridSettings.margins.top = $margins.children('.top').val()
      gridSettings.margins.bottom = $margins.children('.bottom').val()
      gridSettings.margins.left = $margins.children('.left').val()
      gridSettings.margins.right = $margins.children('.right').val()

      $form.find('.columns > .row').each(function(i,obj){
        var arr = [];
        arr.push($(this).children('[name="count"]').val());
        arr.push($(this).children('[name="width"]').val());
        arr.push($(this).children('[name="gutter"]').val());
        gridSettings.columns.push(arr);
      });

      $form.find('.rows > .row').each(function(i,obj){
        var arr = [];
        arr.push($(this).children('[name="count"]').val());
        arr.push($(this).children('[name="width"]').val());
        arr.push($(this).children('[name="gutter"]').val());
        gridSettings.rows.push(arr);
      });
      console.log(gridSettings);

      return gridSettings;

    }

    function drawGridGuides(gridSettings){
      var $gridGuide = $('#grid_guide')
      , leftOffset = parseInt(gridSettings.margins.left)
      , topOffset = parseInt(gridSettings.margins.top);

      $gridGuide.find('.guide-row').remove();
      $gridGuide.find('.guide-col').remove();

      $.each(gridSettings.rows,function(i, obj){
        var count = obj[0];
        var width = parseInt(obj[1]) - 2; // adjust for the two 1px line
        var gutter = parseInt(obj[2]);
        for(var i = 0; i < count; i++){
          $("<div class='guide-row'></div>").css({
            'height': width + 'px'
            ,'border-top': '1px solid red'
            ,'border-bottom': '1px solid red'
            ,'width':'100%'
            ,'position':'absolute'
            ,'left':'0px'})
          .css('top',(topOffset + width)+"px").appendTo($gridGuide);
          topOffset += width + gutter;
        }
      });

      $.each(gridSettings.columns,function(i, obj){
        var count = obj[0];
        var gutter = parseInt(obj[2]);
        var width = parseInt(obj[1]) - 2; // adjust for the two 1px line

        if (gutter == 0){
          width --;
        }

        for(var i = 0; i < count; i++){
          var $col = $("<div class='guide-col'></div>").css({
            'width': width + 'px'
            ,'border-left': '1px solid red'
            ,'height':'100%'
            ,'position':'absolute'
            ,'left':'0px'})
          .css('left',(leftOffset + width)+"px");
          if (gutter !== 0){
            $col.css('border-right','1px solid red');
          }
          $col.appendTo($gridGuide);
          leftOffset += width + gutter;
        }
      });
    }
  }

})();
