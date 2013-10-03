;(function($) {
  "use strict";
  $.fn.getAvailableFonts = function(options) {
    var availableFonts = [];
    var settings = $.extend({
      debug:false,
      id:"checkAvailableFonts",
      fonts: ["Arial", "Courier", "XYZ"]
    }, options);
    
    var init = function() {
      $("body").append($("<div/>", {"id":settings.id}));
      $("div#" + settings.id).append($("<span/>", {"id":"a"})).append($("<span/>", {"id":"b"}));
      $("div#" + settings.id + " > span").text("i");
      if(!settings.debug) {
        $("div#" + settings.id).css({visibility:"hidden"});
      }
      $("div#" + settings.id + " > span#a").css({display:"inline !important", width:"auto !important", font:"normal 10px/1 sans-serif !important"});
      $("div#" + settings.id + " > span#b").css({display:"inline !important", width:"auto !important", font:"normal 20px/1 monospace !important"});
    };
    
    var checkFont = function(fontName) {
      $("div#" + settings.id + " > span#a").css({"font-family":'"' + fontName + '", sans-serif'});
      $("div#" + settings.id + " > span#b").css({"font-family":'"' + fontName + '", monospace'});
      var isAvailable = $("div#" + settings.id + " > span#a").innerWidth() === $("div#" + settings.id + " > span#b").innerWidth();
      if(settings.debug && isAvailable) {
        console.log(fontName + ": " + isAvailable);
      }
      return isAvailable;
    };
    
    var check = function() {
      $.each(settings.fonts, function(i) {
        if(checkFont(settings.fonts[i])) {
          availableFonts.push(settings.fonts[i]);
        }
      });
      return availableFonts;
    };
    
    var destructor = function() {
      $("div#" + settings.id).remove();
    };
    
    if(availableFonts.length === 0) {
      init();
      check();
      destructor();
    }
    
    return availableFonts;
  };
})(jQuery);
