var ActivityMain = (function () {
  return {
    LaunchActivity: function () {
      $(".exp-container.zoom1").css({ "width": $(".wrapper").width() })
      this.SetBalancerPositions();
      this.SetWeightPositions();
      this.BindDraggables();
      this.BindDroppables();
    },
    DelayLaunch(){
      this.SetBalancerPositions();
      this.SetWeightPositions();
      this.BindDraggables();
      this.BindDroppables();
    },
    ResetExperiment: function () {
    },
    ResetActivity: function () {

    },
    SetWeightPositions: function () {
      var slateWdt = $(".wood-slate").width();
      var moonWrapPos = $(".planet-wrap[planet='moon']").position();
      var moonWrapHt = $(".planet-wrap[planet='moon']").height();
      var actPanalWdt = $(".activity-panel").width();
      var ballHt = $(".weight-ball.ball-1").height();
      var slateLeft = (actPanalWdt - slateWdt) / 2;
      var slateTop = moonWrapPos.top + moonWrapHt + ballHt;
      $(".wood-slate").css({ "top": slateTop, "left": slateLeft })

      var ballWdt = $(".weight-ball.ball-1").width();
      var diskWdt = $(".weight-disk.disk-1").width();
      var diskHt = $(".weight-disk.disk-1").height();
      var totalballwdt = ballWdt * 3;
      var totaldiskwdt = diskWdt * 6;
      var weightSpace = 10 * 8; //8 -> total weights - 1 = 9 -1 = 8, 10 -> hardcode value.
      var ballleft = (slateWdt - (totalballwdt + totaldiskwdt + weightSpace)) / 2;
      var weightLeft = slateLeft + ballleft;
      $(".weight-ball").each(function (index) {
        if(index>0){
          weightLeft += (ballWdt + 10);
        }
        $(".weight-ball.ball-" + (index + 1)).css({ "top": (slateTop - ballHt) + 5, "left":weightLeft });
      })
      $(".weight-disk").each(function (index) {
        if(index<=0){
          weightLeft += (ballWdt + 10);
        }
        else{
          weightLeft += (diskWdt + 10);
        }
        $(".weight-disk.disk-" + (index + 1)).css({ "top": (slateTop - diskHt) + 5, "left":weightLeft });
      })
    },
    SetBalancerPositions: function () {
      debugger;
      var earthContPos = $(".earth-container").get(0).getBoundingClientRect();
      var actPos = $(".activity-panel").get(0).getBoundingClientRect()
      var earthPos = {
        left: earthContPos.left - actPos.left,
        top: earthContPos.top - actPos.top,
        height: earthContPos.height,
        width: earthContPos.width
      }
      var moonContPos = $(".moon-container").get(0).getBoundingClientRect();
      var moonPos = {
        left: moonContPos.left - actPos.left,
        top: moonContPos.top - actPos.top,
        height: moonContPos.height,
        width: moonContPos.width
      }

      $(".spring-balance").css({
        "left": moonPos.left + (moonPos.width - (moonPos.width / 3)),
        "top": moonPos.top + ((moonPos.height - $(".spring-balance").height()) / 2)
      }).attr("planet", "moon");
      $(".pane-balance").css({
        "left": earthPos.left + (earthPos.width - ((earthPos.width / 8) * 4)),
        "top": earthPos.top + ((earthPos.height - $(".spring-balance").height()) / 2)
      }).attr("planet", "earth");
      $(".electric-balance").css({
        "left": earthPos.left + 20,
        "top": earthPos.top + (earthPos.height - $(".electric-balance").height()) - 20
      }).attr("planet", "earth");
    },
    BindDraggables: function () {
      $(".wt-balancer").draggable({
        revert: 'invalid',
        start: function (event, ui) {
        },
        drag: function (event, ui) {
        }
      });
      $(".weight-ball").draggable({
        revert: 'invalid',
        start: function (event, ui) {
          //debugger;
          if ($(this).closest(".electric-balance-droppable").length > 0) {
            console.log("11")
            $(this).detach().appendTo($(".weight-container"));
          }
        },
        drag: function (event, ui) {
        }
      });
      $(".weight-disk").draggable({
        revert: 'invalid',
        helper: 'clone',
        revert: function (event, ui) {
          var clone = $(".weight-disk.ui-draggable-handle.ui-draggable-dragging")
          clone.fadeOut(500, function () {
            clone.remove();
          });
        },
        start: function (event, ui) {
        },
        drag: function (event, ui) {
        }
      });
    },
    BindDroppables: function () {
      $(".planet-drop").droppable({
        accept: ".wt-balancer, .weight-ball, .weight-disk",
        tolerance: "fit",
        greedy: true,
        hoverClass: "ui-state-hover",
        activeClass: "ui-state-default",
        drop: function (event, ui) {
          if ($(".ui-state-hover").length <= 0) {
            console.log("drop planet-drop")
            if ($(event.target).hasClass("planet-drop")) {
              var planetNme = $(event.target).attr("planet");
              ui.draggable.attr("planet", planetNme);
            }
          }
        }
      });
      $(".spring-balance-droppable").droppable({
        accept: ".weight-ball, .weight-disk",
        greedy: true,
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        activeClass: "ui-state-default",
        drop: function (event, ui) {
          console.log("drop spring-droppable")
          console.log($(".ui-state-hover").length)
        },
        out: function (event, ui) {
          console.log("out spring-droppable")
        }
      });
      $(".pane-01-droppable, .pane-02-droppable").droppable({
        accept: ".weight-ball, .weight-disk",
        greedy: true,
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        activeClass: "ui-state-default",
        drop: function (event, ui) {
          console.log("drop pane-droppable")
          console.log($(".ui-state-hover").length)
        },
        out: function (event, ui) {
          console.log("out pane-droppable")
        }
      });
      $(".electric-balance-droppable").droppable({
        accept: ".weight-ball, .weight-disk",
        greedy: true,
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        activeClass: "ui-state-default",
        drop: function (event, ui) {
          console.log("drop electric-droppable")
          console.log($(".ui-state-hover").length);

        },
        out: function (event, ui) {
          console.log("out electric-droppable")
        }
      });
    },
    OnOrientationChange: function () {

    },
  };
})();

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