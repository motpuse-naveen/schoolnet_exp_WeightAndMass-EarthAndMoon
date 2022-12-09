const POPUP_WIDTH = 286;
var zoom1 = null;
var zoom2 = null;
var zoom3 = null;
var zoom4 = null;
var zoomhtml = null;
var zoombody = null;

var ActivityShell = (function () {
  
  return {
    Init: function () {
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
      var deviceType = ActivityShell.DeviceType();
      //alert("dt: " + deviceType + ", wdt: " + window.screen.width + ", ht: " + window.screen.height)
      $(".wrapper").attr("device", deviceType);
      if (this.IsIOSDevice()) {
        $("body").attr("platform", "ios")
      }
      else {
        if (deviceType == "desktop") {
          $(".wrapper").addClass("center-screen");
        }
      }
      if (deviceType == "mobile") {
        if (window.matchMedia("(orientation: portrait)").matches) {
          $("#bestviewed_popup_msg").show();
        }
        else {
          $("#bestviewed_popup_msg").hide();
        }
      }
      this.InitToolTip();
      this.AdjustSmallTablet();
    },
    SetScrollPosition: function () {
      element = $(".exp-container.zoom1").get(0)
      element.scrollTop = element.scrollHeight - element.clientHeight;
    },
    LaunchActivity: function () {
      $(".wrapper").addClass("activity");
      $(".container-so.launch").hide();
      $(".container-so.main").show();
      var deviceType = ActivityShell.DeviceTypeFullscreen();
      var Android = /(android)/i.test(navigator.userAgent);
      if (deviceType == "mobile" && Android) {
        openFullscreen()
        generatePreloader();
        setTimeout(function () {
          $(".preloader").remove();
          ActivityShell.AdjustContainerHeight();
          ActivityMain.LaunchActivity();
          if (zoom1 == null) {
            //hammerItScrollableContent(document.querySelector(".zoom1"));
            zoom1 = "zoom1";
          }
          /*
          if (zoom2 == null) {
            hammerItScrollableContent(document.querySelector(".zoom2"));
            zoom2 = "zoom2";
          }
          */
          setTimeout(function () {
            GuidedTour.Init();
            ActivityMain.SetObjectData();
            ActivityShell.SetScrollPosition();
          }, 0);
        }, 500)
      }
      else {
        generatePreloader();
        setTimeout(function () {
          $(".preloader").remove();
          ActivityShell.AdjustContainerHeight();
          ActivityMain.LaunchActivity();

          if (zoom1 == null) {
            //hammerItScrollableContent(document.querySelector(".zoom1"));
            zoom1 = "zoom1";
          }
          /*
          if (zoom2 == null) {
            hammerItScrollableContent(document.querySelector(".zoom2"));
            zoom2 = "zoom2";
          }
          */
          setTimeout(function () {
            GuidedTour.Init();
            ActivityMain.SetObjectData();
            ActivityShell.SetScrollPosition();
          }, 0);
        }, 500);
      }
    },
    AdjustContainerHeight: function () {
      //debugger;
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "mobile") {
        $(".wrapper").css({
          //"height": window.screen.height + "px"
          "height": window.innerHeight + "px"
        });
      }
      else {
        $(".wrapper").css({
          "height": window.innerHeight + "px"
        });
      }
      if ($(".container-so.main").is(":visible")) {
        var headerHt = $(".container-so.main .exp_header").outerHeight();
        var footerHt = $(".container-so.main .exp_footer").outerHeight();
        $(".exp_body_header").css({ "height": headerHt + "px" });
        $(".exp_body_footer").css({ "height": footerHt + "px" });
        var mainHt = $(".container-so.main").height();
        if (deviceType != "mobile") {
        }
        else {
          $(".wrapper").attr("device", "mobile");
          headerHt = 0;
          //mainHt =  window.screen.height; 
        }
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) });
      }
    },
    AdjustSmallTablet: function () {
      $(".wrapper").removeClass("small-height-landscape").removeClass("extra-small-height-landscape")
      var bodyHt = $("body").height()
      bodyHt = Number(bodyHt)
      //alert(bodyHt);
      if (bodyHt < 440) {
        if (bodyHt < 290) {
          $(".wrapper").addClass("extra-small-height-landscape")
        }
        else {
          $(".wrapper").addClass("small-height-landscape")
        }
      }
    },
    HideHeaderSmallTablet: function(){
      if (window.screen.availHeight < 602) {
        //return "mobile";
        $(".exp_header").hide();
        $(".exp_body_header").hide();
      }
      else{
        $(".exp_header").show();
        $(".exp_body_header").show();
      }
    },
    DeviceType: function () {
      /* This function needs changes in device detection logic 
      below code is not working for ipad it returns desktop */
      const ua = navigator.userAgent;
      //alert(navigator.userAgent)
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        if (window.screen.availWidth < 530 || window.screen.availHeight < 530) {
          return "mobile";
        }
        else {
          if (window.screen.availHeight < 602) {
            //return "mobile";
            $(".exp_header").hide();
            $(".exp_body_header").hide();

          }
          /*else {
            return "tablet";
          }*/
          return "tablet";
        }
      }
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
      }
      else {
        if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
          if (window.screen.availWidth < 1024 || window.screen.availHeight < 1024) {
            return "tablet"
          }
        }
      }
      return "desktop";
    },
    DeviceTypeFullscreen: function () {
      /* This function needs changes in device detection logic 
      below code is not working for ipad it returns desktop */
      const ua = navigator.userAgent;
      //alert(navigator.userAgent)
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        if (window.screen.availWidth < 530 || window.screen.availHeight < 530) {
          return "mobile";
        }
        else {
          return "tablet";
        }
      }
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
      }
      else {
        if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
          if (window.screen.availWidth < 1024 || window.screen.availHeight < 1024) {
            return "tablet"
          }
        }
      }
      return "desktop";
    },
    AdjustSplitPanelsOnOpenPopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      var settingPanelHt = 0;
      if (deviceType != "mobile") {
        if ($("#split-main").length > 0) {
          var spltWdt = $(".wrapper").width();
          //$("#split-main").css({ "width": spltWdt - POPUP_WIDTH })
          settingPanelHt = $(".cust-popup.settings").outerHeight();
          $popup.css({ "padding-bottom": settingPanelHt + 10 })
        }
        $popup.addClass("right_align_popup")
      }
    },
    AdjustSplitPanelsOnClosePopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType != "mobile") {
        //$("#split-main").css({ "width": $(".wrapper").width() });
      }
    },
    AdjustSplitPanelsOnCloseCustomPopup: function () {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "mobile") {
        $("#split-main").css({ "height": "100%" });
      }
    },
    TogglePopup: function ($popup, $button) {
      //debugger;
      if (!$popup.is(":visible")) {
        $(".popup").hide();
        $(".active").removeClass("active")
        var deviceType = ActivityShell.DeviceType();
        if (deviceType == "mobile") {
          if ($(".cust-popup").is(":visible")) {
            $(".cust-popup").hide();
            $(".calculationsCol").hide();
            $(".settingsCol").hide();
            ActivityShell.AdjustSplitPanelsOnCloseCustomPopup()
          }
        }
        $popup.fadeIn();
        $button.addClass("active")
        ActivityShell.AdjustSplitPanelsOnOpenPopup($popup)
      }
      else {
        $popup.hide();
        $button.removeClass("active")
        ActivityShell.AdjustSplitPanelsOnClosePopup()
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"));
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"));
    },
    OnOrientationChange: function () {
      this.AdjustContainerHeight();
      //ScreenSplitter.InitSplitter();
      if ($(".popup").is(":visible")) {
        this.AdjustSplitPanelsOnOpenPopup($(".popup:visible"));
      }
      /* Scale Spring to fit */
      //ScreenSplitter.ScaleToFit($("#split-0"));
      /* Scale Graph to fit */
      //ScreenSplitter.ScaleToFit($("#split-1"));
      var deviceType = ActivityShell.DeviceType();
      $(".wrapper").attr("device", deviceType);
      this.HideHeaderSmallTablet();
      //update Activity view OnOrientationChange
      ActivityMain.OnOrientationChange();

      if (deviceType == "mobile") {
        if (window.matchMedia("(orientation: portrait)").matches) {
          $("#bestviewed_popup_msg").show();
        }
        else {
          $("#bestviewed_popup_msg").hide();
        }
      }
      GuidedTour.OnResize();
      this.AdjustSmallTablet();
    },
    IsIOSDevice: function () {
      if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
      } else {
        return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform);
      }
    },
    OnWindowResize: function () {
      var deviceType = this.DeviceType();
      if (deviceType == "desktop") {
        this.AdjustContainerHeight();
        //ScreenSplitter.InitSplitter(null, true);
        if ($(".popup").is(":visible")) {
          this.AdjustSplitPanelsOnOpenPopup($(".popup:visible"));
        }
        /* Scale Spring to fit */
        //ScreenSplitter.ScaleToFit($("#split-0"));
        /* Scale Graph to fit */
        //ScreenSplitter.ScaleToFit($("#split-1"));
      }
      GuidedTour.OnResize();
    },
    InitToolTip: function () {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "desktop") {
        if (!this.IsIOSDevice()) {
          $("button[data-toggle='tooltip']").tooltip({ boundary: 'window', container: $(".wrapper"), trigger: "hover", delay: { show: 500, hide: 100 } })
        }
      }
    }
  };
})();

$(document).ready(function () {
  //This function is moved to preloader complete.
  //ActivityShell.Init();
  /*
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });
  if (zoomhtml == null) {
    hammerIt(document.querySelector("html"), 1);
    zoomhtml = "zoomhtml";
  }
  if (zoombody == null) {
    hammerIt(document.querySelector("body"), 1);
    zoombody = "zoombody";
  }
  */
  var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;
  if (isSafari) {
    $(".wrapper").attr("browser", "safari");
  }
});
/*
document.ontouchmove = function (event) {
  try {
    event.preventDefault();
  }
  catch (err) { }
}
*/

$(window).bind('orientationchange', function () {
  this.setTimeout(function () {
    ActivityShell.OnOrientationChange();
  }, 200);
});

$(window).resize(function () {
  ActivityShell.OnWindowResize();
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  ActivityShell.TogglePopup($(".popup.worksheet"), $(this));
});
$(document).on("click", "#btn_info", function (event) {
  ActivityShell.TogglePopup($(".popup.info"), $(this));
});
$(document).on("click", "#btn_aim", function (event) {
  ActivityShell.TogglePopup($(".popup.aim"), $(this));
});

$(document).on("click", ".btn-close-popup", function (event) {
  $(this).closest(".popup").hide();
  $(".active").removeClass("active")
  ActivityShell.AdjustSplitPanelsOnClosePopup();
  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"));
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"));

  $("#OK_btn, #btn_reset, #explain_btn, #next_btn").removeAttr("disabled");

});
$(document).on("click", ".btn-close-explain-popup", function (event) {
  $(this).closest(".popup_mc").hide();
  //$(".active").removeClass("active")
  //ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"));
  /* Scale Spring to fit */
  //ScreenSplitter.ScaleToFit($("#split-0"));
  /* Scale Graph to fit */
  //ScreenSplitter.ScaleToFit($("#split-1"));

  $("#OK_btn, #btn_reset, #explain_btn, #next_btn, #btn_info").removeAttr("disabled");

});
/*End Common Popup Script */

var elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

$(document).on('shown.bs.tooltip', function (e) {
  setTimeout(function () {
    $(e.target).tooltip('hide');
  }, 1500);
});