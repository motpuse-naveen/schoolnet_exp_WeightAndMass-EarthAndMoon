/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array(
  "assets/images/check-icn.svg",
  "assets/images/drag-btn-horizontal.svg",
  "assets/images/drag-btn-vertical.svg",
  "assets/images/exploriment-Logo.svg",
  "assets/images/logo.svg",
  "assets/images/next-arrow.svg",
  "assets/images/Pattern.svg",
  "assets/images/phone-landscape-pngrepo-com.png",
  "assets/images/phone-portrait-pngrepo-com.png",
  "assets/images/texture.svg",
  "assets/images/theme-icon-outline-left.svg",
  "assets/images/theme-icon-outline-right.svg",
  "assets/images/Top_BG.png",
  "assets/images/Top_BG.svg",
  "assets/images/watermark-2.png",
  "assets/images/correct-mark.svg",
  "assets/images/wrong-mark.svg",
  "assets/images/BG_earth.svg",
  "assets/images/BG_moon.svg",
  "assets/images/Earth.svg",
  "assets/images/Moon.svg",
  "assets/images/weighing_machine_01.svg",
  "assets/images/weighing_machine_02.svg",
  "assets/images/weighing_machine_02_new2.svg",
  "assets/images/weighing_pointer.svg",
  "assets/images/weight_ball_01.svg",
  "assets/images/weight_ball_02.svg",
  "assets/images/weight_ball_03.svg",
  "assets/images/weight_disk_01.svg",
  "assets/images/weight_disk_02.svg",
  "assets/images/weight_disk_03.svg",
  "assets/images/weight_disk_04.svg",
  "assets/images/weight_disk_05.svg",
  "assets/images/weight_disk_06.svg",
  "assets/images/Wood_shadow.svg",
  "assets/images/Wood.svg",
  "assets/images/z_instr1.svg",
  "assets/images/z_instr2.svg",
  "assets/images/P_01.svg",
  "assets/images/P_02.svg",
  "assets/images/P_03.svg",
  "assets/images/P_04.svg",
  "assets/images/P_05.svg",
  "assets/images/bg_earth.png",
  "assets/images/bg_moon.png",
  "assets/images/overloaded-img.svg"
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



function preloadImages() {
  imagePreCount = 0;
  for (var pId = 0; pId < imgPreloadArray.length; pId++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = imgPreloadArray[pId];
  }
}
function imagePreloaded() {
  imagePreCount++;
  var percentageload = Number(
    ((imagePreCount / (imgPreloadArray.length)) * 100).toFixed(0)
  );
  $(".preloader .progress-text").text("Loading..." + percentageload + "%");
  if (imagePreCount == (imgPreloadArray.length)) {
    setTimeout(function () {
      $(".preloader").remove();
      $(".container-so.launch").show();
      ActivityShell.Init();
    }, 50);
  }
}
