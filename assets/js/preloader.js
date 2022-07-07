/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array(
  "assets/images/check-icn.svg",
  "assets/images/drag-btn-horizontal.svg",
  "assets/images/drag-btn-vertical.svg",
  "assets/images/logo.svg",
  "assets/images/next-arrow.svg",
  "assets/images/phone-landscape-pngrepo-com.png",
  "assets/images/phone-portrait-pngrepo-com.png",
  "assets/images/texture.svg",
  "assets/images/theme-icon-outline-left.svg",
  "assets/images/theme-icon-outline-right.svg",
  "assets/images/watermark-2.png",
  "assets/images/volt-increase.svg",
  "assets/images/volt-decrease.svg",
  "assets/images/connectors.svg",
  "assets/images/drag_ameter.svg",
  "assets/images/ameter-01.svg",
  "assets/images/ameter-02.svg",
  "assets/images/wire-01.svg",
  "assets/images/wire-02.svg",
  "assets/images/wire-03.svg",
  "assets/images/wire-04.svg",
  "assets/images/instr1.svg",
  "assets/images/instr2.svg",
  "assets/images/correct-mark.svg",
  "assets/images/wrong-mark.svg",
);

/*--Audio--*/
var audioPreloadArray = [];
$(document).ready(function () { });
//Html is bydefault added to html
//generatePreloader();
setTimeout(function () {
  preloadImages();
}, 50);

function generatePreloader() {
  var preloaderhtml = `<div class="preloader">
  <div class="preloadpanel">
     <div class="preloadingInstr">
         <div class="progress"></div>
         <div class="progress-text">
             Loading ... 100%
         </div>
     </div>
 </div> 
</div>`;
  $("body").append(preloaderhtml);
}

var animCount = 46 + 61 + 31 + 61 + 31 + 131 + 81 + 91;

function preloadImages() {
  imagePreCount = 0;
  for (var pId = 0; pId < imgPreloadArray.length; pId++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = imgPreloadArray[pId];
  }
  for (var v1 = 0; v1 < 46; v1++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/boat/broken/" + v1 + ".png";
  }
  for (var v2 = 0; v2 < 61; v2++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/boat/moving/" + v2 + ".png";
  }
  for (var v3 = 0; v3 < 61; v3++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/bulb/broken/" + v3 + ".png";
  }
  for (var v4 = 0; v4 < 61; v4++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/bulb/glow/" + v4 + ".png";
  }
  for (var v5 = 0; v5 < 31; v5++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/horse/broken/" + v5 + ".png";
  }
  for (var v6 = 0; v6 < 131; v6++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/horse/moving/" + v6 + ".png";
  }
  for (var v7 = 0; v7 < 81; v7++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/robot/broken/" + v7 + ".png";
  }
  for (var v8 = 0; v8 < 91; v8++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = "assets/images/robot/moving/" + v8 + ".png";
  }
}



function imagePreloaded() {
  imagePreCount++;
  var percentageload = Number(
    ((imagePreCount / (imgPreloadArray.length +  animCount)) * 100).toFixed(0)
  );
  $(".preloader .progress-text").text("Loading..." + percentageload + "%");
  if (imagePreCount == (imgPreloadArray.length + animCount)) {
    setTimeout(function () {
      $(".preloader").remove();
      $(".container-so.launch").show();
      ActivityShell.Init();
    }, 50);
  }
}
