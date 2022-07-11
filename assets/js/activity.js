var ActivityMain = (function () {
  return {
    LaunchActivity: function () {
      this.BindDroppables();
      this.BindDraggables();
      this.NewQuestion();
    },
    ResetExperiment: function(){
      curQtnNo = 1;
      totalQtns = 0;
      correctQtns = 0;
      this.NewQuestion();
    },
    ResetActivity: function () {
    },
    ResetObjToOriginal: function (p_draggable) {
      let orglft = p_draggable.attr('orgLeft');
      let orgtp = p_draggable.attr('orgTop');
      p_draggable.css({
        "left": Number(orglft),
        "top": Number(orgtp)
      });
      if (p_draggable.attr("seq") != undefined && p_draggable.attr("seq") != "") {
        ActivityMain.RemovePathElement(Number(p_draggable.attr("seq")));
      }
      p_draggable.removeAttr("seq")
      p_draggable.removeAttr("anim")
      p_draggable.removeClass("dropped-object").removeClass("complete").removeClass("broken")
    }

  };
})();


$(document).on("click", ".buttonMinus", function (event) {
  ActivityMain.ToggleVoltage(-1);
});
$(document).on("click", ".buttonPlus", function (event) {
  ActivityMain.ToggleVoltage(1);
});

$(document).on("click", "#next_btn", function (event) {
  ActivityMain.NewQuestion();
});

$(document).on("click", "#btn_reset", function (event) {
  ActivityMain.ResetExperiment();
});

$(document).on("click", "#OK_btn", function (event) {
  ActivityMain.SubmitQuestion();
});

$(document).on("click", ".linkactivityTextMore", function () {
  $(".mobiledevice.less").hide();
  $(".mobiledevice.more").slideDown("slow", "linear", function () {

  });
})
$(document).on("click", ".linkactivityTextLess", function () {
  $(".mobiledevice.more").slideUp("slow", "linear", function () {
      $(".mobiledevice.less").fadeIn();
  });
})