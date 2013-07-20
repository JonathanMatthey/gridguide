

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

  // html row template
  var rowHtml = '<div class="row">'+
  '<label>&nbsp;</label>'+
  '<input class="count" name="count" type="text" value="10"></input>'+
  '<input class="width" name="width" type="text" value="10"></input>'+
  '<input class="gutter" name="gutter" type="text" value="0"></input>'+
  ''+
  '</div>';

  // html settings template
  var settingsHtml = '<style>'+
    'body{'+
      'font-size:14px;'+
    '}'+
    '#settings{'+
      'z-index:9999;'+
      'position:absolute;'+
      'background-color:#000;'+
      'color:white;'+
      'font-style:italic;'+
      'width:100%;'+
      'top:-300px;'+
      'left:0;'+
      'transition:top ease-out 1000ms ;'+
    '}'+
    '#hover_area{'+
      'top:0;'+
      'left:0;'+
      'width:100%;'+
      'height:30px;'+
      'z-index:20;'+
      'background-color:transparent;'+
    '}'+
    '#settings.slide-down{'+
      'transition:top ease-out 500ms ;'+
      'top:0px;'+
    '}'+
    '#form_settings{'+
      'float:left;'+
      'top:0;'+
      'left:0;'+
      'width:100%;'+
    '}'+
    '#form_settings{'+
      'padding:20px;'+
    '}'+
    '#form_settings > div{'+
      'float:left;'+
      'margin-right:40px;'+
    '}'+
    'input{'+
      'background-color:#292929;'+
      'border:none;'+
      'border-radius:2px;'+
      'height:35px;'+
      'width:45px;'+
      'color:white;'+
      'padding:0;'+
      'padding-left:40px;'+
      'margin:0;'+
      'margin-right:5px;'+
      'background-image:url(images/grid_guide_sprite.png);'+
      'background-position: -183px 8px;'+
      'background-repeat: no-repeat;'+
      'transition: background-color 100ms linear;'+
    '}'+
    'input:hover{'+
      'background-color:#343434;'+
    '}'+
    'input.container-width{'+
      'background-image:none;'+
      'width:62px;'+
      'padding-left:10px;'+
    '}'+
    '.container label{'+
      'width:120px;'+
    '}'+
    '.margins .top{'+
      'background-position: -183px 8px;'+
    '}'+
    '.margins .bottom{'+
      'background-position: -273px 8px;'+
    '}'+
    '.margins .left{'+
      'background-position: -183px -32px;'+
    '}'+
    '.margins .right{'+
      'background-position: -273px -32px;'+
    '}'+
    'label{'+
      'width:80px;'+
      'display: block;'+
      'float:left;'+
      'height:35px;'+
      'font-size:14px;'+
      'line-height: 35px;'+
    '}'+
    '.btn-align{'+
      'width:18px;'+
      'height:18px;'+
      'border:1px solid #333;'+
      'display: inline-block;'+
      'display: block;'+
      'float:left;'+
      'margin-top:5px;'+
      'margin-right:5px;'+
    '}'+
    '.btn-align:last-child{'+
      'margin-right:0px;'+
    '}'+
    '.row{'+
      'margin-bottom:5px;'+
      'font-size:0px;'+
      'vertical-align: center;'+
    '}'+
    '.plus{'+
      'font-size:24px;'+
      'font-family: sans-serif;'+
      'font-style: normal;'+
      'margin-left:10px;'+
      'transition: background-color 100ms linear;'+
      'height:30px;'+
      'width:30px;'+
      'border-top:2px solid black;'+
      'display:inline-block;'+
      'text-align: center;'+
      'line-height: 28px;'+
    '}'+
    '.plus:hover{'+
      'background-color:#292929;'+
    '}'+
    '.rows .count{'+
      'background-position: -479px 8px;'+
    '}'+
    '.rows .width{'+
      'background-position: -569px 8px;'+
    '}'+
    '.rows .gutter{'+
      'background-position: -659px 8px;'+
    '}'+
    '.columns .count{'+
      'background-position: -479px -32px;'+
    '}'+
    '.columns .width{'+
      'background-position: -569px -32px;'+
    '}'+
    '.columns .gutter{'+
      'background-position: -659px -32px;'+
    '}'+
  '</style>'+
  '<div id="hover_area"></div>'+
  '<div id="settings">'+
    '<form id="form_settings">'+
      '<div class="container">'+
        '<div class="row">'+
          '<label>Container Width:</label>'+
          '<input class="container-width" value="960px"></input>'+
        '</div>'+
        '<div class="row">'+
          '<label>Alignment:</label>'+
          '<a class="btn-align left"></a>'+
          '<a class="btn-align center"></a>'+
          '<a class="btn-align right"></a>'+
        '</div>'+
      '</div>'+
      '<div class="margins">'+
        '<div class="row">'+
          '<label>Margins:</label>'+
          '<input class="top" name="top" value="20"></input>'+
          '<input class="bottom" name="bottom" value="20"></input>'+
        '</div>'+
        '<div class="row">'+
          '<label>&nbsp</label>'+
          '<input class="left" name="left" value="10"></input>'+
          '<input class="right" name="right" value="10"></input>'+
        '</div>'+
      '</div>'+
      '<div class="rows-columns" style="display:inline-block;">'+
        '<div class="rows">'+
          '<div class="row">'+
            '<label>Rows:</label>'+
            '<input class="count" name="count" type="text" value="10"></input>'+
            '<input class="width" name="width" type="text" value="50"></input>'+
            '<input class="gutter" name="gutter" type="text" value="0"></input>'+
            '<a class="plus">+</a>'+
          '</div>'+
        '</div>'+
        '<div class="columns">'+
          '<div class="row">'+
            '<label>Columns:</label>'+
            '<input class="count" name="count" type="text" value="20"></input>'+
            '<input class="width" name="width" type="text" value="100"></input>'+
            '<input class="gutter" name="gutter" type="text" value="100"></input>'+
            '<a class="plus">+</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</form>'+
  '</div>';

  function initMyBookmarklet() {
    (window.myBookmarklet = function() {

      var $gridGuide = $("<div id='grid_guide' style='display:none;'></div>)")
      .css({'opacity':'1'
        ,'position':'absolute'
        ,'top':'0px'
        ,'left':'0px'
        ,'width':'100%'
        ,'height':'100%'
        ,'z-index':'9'});

      $gridGuide.append(settingsHtml);
      $gridGuide.appendTo('body');

      var $settings = $gridGuide.find("#settings");

      var $form = $gridGuide.find("#form_settings");

      $form.change(function() {
        console.log('Handler for .change() called.');
        gridSettings = getGridSettings($form);
        drawGridGuides(gridSettings);
      });

      $gridGuide.find(".plus").click(function(event){
        event.preventDefault();
        $rowHtml = $(rowHtml);
        $(this).parent().parent().append($rowHtml);
        $(this).appendTo($rowHtml);
      });

      $gridGuide.fadeIn(300,function(){
      });
      $settings.addClass('slide-down');

      $settings.mouseleave(function(){
        $settings.removeClass('slide-down');
      })
      $gridGuide.find("#hover_area").mouseenter(function(){
        $settings.addClass('slide-down');
      });


      gridSettings = getGridSettings($form);
      drawGridGuides(gridSettings);

      // var $btnShowGridGuide = $("<a href='#'></a>")
      // .css({'position':"absolute"
      //   ,'text-align':'center'
      //   ,'top':'0px'
      //   ,'right':'0px'
      //   ,'width':'30px'
      //   ,'height':'30px'
      //   ,'color':'white'
      //   ,'background-color':'black'
      //   ,'z-index':'99'})
      // .html('X');
      // $btnShowGridGuide.appendTo($gridGuide);
      // $btnShowGridGuide.click(function(event){
      //   event.preventDefault();
      //   alert('show');
      // });
    })();

    // read the input fields and extract grid settings

    function getGridSettings($form){
      var gridSettings = {};
      gridSettings.margins = [];
      gridSettings.columns = [];
      gridSettings.rows = [];

      gridSettings.margins = {};
      var $margins = $form.find('.margins ');
      gridSettings.margins.top = parseInt($margins.find('.top').val());
      gridSettings.margins.bottom = parseInt($margins.find('.bottom').val());
      gridSettings.margins.left = parseInt($margins.find('.left').val());
      gridSettings.margins.right = parseInt($margins.find('.right').val());

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

    // add lines to grid guide according to JSON gridSettings

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

        if (gutter == 0){
          width --;
        }

        for(var i = 0; i < count; i++){
          var $row = $("<div class='guide-row'></div>").css({
            'height': width + 'px'
            ,'border-top': '1px solid red'
            ,'width':'100%'
            ,'position':'absolute'
            ,'left':'0px'})
          .css('top',(topOffset + width)+"px");

          if (gutter !== 0){
            $row.css('border-bottom','1px solid red');
          }

          $row.appendTo($gridGuide);
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
            ,'top':'0px'})
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
