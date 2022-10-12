var ActivityMain = (function () {
  return {
    LaunchActivity: function () {
      $(".exp-container.zoom1").css({ "width": $(".wrapper").width() })
      this.SetBalancerPositions();
      this.SetWeightPositions();
      this.BindDraggables();
      this.BindDroppables();
    },
    DelayLaunch() {
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
        if (index > 0) {
          weightLeft += (ballWdt + 10);
        }
        $(".weight-ball.ball-" + (index + 1)).css({ "top": (slateTop - ballHt) + 5, "left": weightLeft });
      })
      $(".weight-disk").each(function (index) {
        if (index <= 0) {
          weightLeft += (ballWdt + 10);
        }
        else {
          weightLeft += (diskWdt + 10);
        }
        $(".weight-disk.disk-" + (index + 1)).css({ "top": (slateTop - diskHt) + 5, "left": weightLeft });
      })
    },
    SetBalancerPositions: function () {
      //debugger;
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
        "top": moonPos.top + ((moonPos.height - $(".spring-balance .spring-base-wrap").height()) / 2)
      }).attr("planet", "moon");
      $(".pane-balance").css({
        "left": earthPos.left + (earthPos.width - ((earthPos.width / 8) * 4)),
        "top": earthPos.top + ((earthPos.height - $(".pane-balance").height()) / 4)
      }).attr("planet", "earth");
      $(".electric-balance").css({
        "left": earthPos.left + 20,
        "top": earthPos.top + (earthPos.height - $(".electric-balance").height()) - 20
      }).attr("planet", "earth");
    },
    InitBalancerDrag: function () {
    $(".wt-balancer").draggable({
        containment: ".exp_body_content",
        revertDuration: 0,
        revert: function (event, ui) {
          
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
          if (!event) {
            //revert logic
            
            $(this).removeClass("dropped-object")
          }
          //debugger;
          ActivityMain.PositionWeightOnBalancerDrag({
            top: $(this).attr("orgTop"), 
            left: $(this).attr("orgLeft") }, $(this))
          return !event;
        },
        start: function (event, ui) {
          
        },
        drag: function (event, ui) {
          //debugger;
          ActivityMain.PositionWeightOnBalancerDrag({top: ui.position.top ,left: ui.position.left }, $(this))
        }
      }).each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).attr('orgTop', top);
        $(this).attr('orgLeft', left);
      });
      
    },
    PositionWeightOnBalancerDrag: function (_ui_position, _this) {
      var verticalDistance = _ui_position.top - _this.position().top //- ui.originalPosition.top;
      var horizontalDistance = _ui_position.left - _this.position().left //- ui.originalPosition.left;
      //console.log(horizontalDistance + " : " + verticalDistance)

      if (_this.hasClass("electric-balance")) {
        $(".weight[machine='electric']").each(function () {
          $(this).css({
            "left": $(this).position().left + horizontalDistance,
            "top": $(this).position().top + verticalDistance
          })
          
        })
      }
      else if (_this.hasClass("pane-balance")) {
        $(".weight[machine='balancer1']").each(function () {
          $(this).css({
            "left": $(this).position().left + horizontalDistance,
            "top": $(this).position().top + verticalDistance
          })
        })
        $(".weight[machine='balancer2']").each(function () {
          $(this).css({
            "left": $(this).position().left + horizontalDistance,
            "top": $(this).position().top + verticalDistance
          })
        })
      }
      else if (_this.hasClass("spring-balance")) {
        $(".weight[machine='spring']").each(function () {
          console.log($(this).position().top + verticalDistance)
          $(this).css({
            "left": $(this).position().left + horizontalDistance,
            "top": $(this).position().top + verticalDistance
          })
        })
      }
    },
    InitWeightDrag: function (_htmlElements, weightType) {
      if (weightType == "disk") {
        _htmlElements.draggable({
          containment: ".exp_body_content",
          revert: function (event, ui) {
            $(this).data("uiDraggable").originalPosition = {
              top: $(this).attr("orgTop"),
              left: $(this).attr("orgLeft")
            };
            if (!event) {
              //revert logic
              $(this).removeClass("dropped-object")
              console.log("pppppp")
            }
            return !event;
          },
          start: function (event, ui) {
            //debugger;
            ActivityMain.ResetPositionsOnDragStart(ui.helper);
          },
          drag: function (event, ui) {
          }
        })
      }
      else {
        _htmlElements.draggable({
          containment: ".exp_body_content",
          revert: function (event, ui) {
            $(this).data("uiDraggable").originalPosition = {
              top: $(this).attr("orgTop"),
              left: $(this).attr("orgLeft")
            };
            if (!event) {
              //revert logic
              $(this).removeClass("dropped-object")
            }
            return !event;
          },
          start: function (event, ui) {
            //debugger;
            ActivityMain.ResetPositionsOnDragStart(ui.helper);
          },
          drag: function (event, ui) {
          }
        }).each(function () {
          var top = $(this).position().top;
          var left = $(this).position().left;
          $(this).attr('orgTop', top);
          $(this).attr('orgLeft', left);
        });
      }

    },
    InitWeightDragClone: function (_htmlElements) {
      _htmlElements.draggable({
        revert: 'invalid',
        helper: 'clone',
        containment: ".exp_body_content",
       
        revert: function (event, ui) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
          if (!event) {
            //revert logic
            $(this).removeClass("dropped-object")
          }
          console.log("ccccccc")
          return !event;
        },
        start: function (event, ui) {

        },
        drag: function (event, ui) {
        }
      }).each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).attr('orgTop', top);
        $(this).attr('orgLeft', left);
      });
    },
    BindDraggables: function () {
      this.InitBalancerDrag();
      this.InitWeightDrag($(".weight-ball"));
      this.InitWeightDragClone($(".weight-disk"))
    },
    InitPlanetDrop: function () {
      $(".planet-drop").droppable({
        accept: ".wt-balancer, .weight-ball, .weight-disk",
        tolerance: "fit",
        hoverClass: "ui-state-hover",
       
        //greedy: true,
        //activeClass: "ui-state-default",
        drop: function (event, ui) {
          //debugger;
          if ($(".ui-state-hover").length <= 0) {
            console.log("drop planet-drop")
            if ($(event.target).hasClass("planet-drop")) {
              var planetNme = $(event.target).attr("planet");
              var prevPlanetNme = ui.draggable.attr("planet")
              ui.draggable.attr("planet", planetNme);
              if (!ui.draggable.hasClass("wt-balancer")) {
                if (ui.helper.hasClass("weight-disk-draggable")) {
                  var clone = $(ui.helper).clone().removeClass("weight-disk-draggable").addClass("weight-disk-dropped");
                  $(".activity-panel").append(clone)
                  ActivityMain.AnimateOnPlanetDrop(planetNme, clone, $(this))
                }
                else {
                  ActivityMain.AnimateOnPlanetDrop(planetNme, ui.draggable, $(this))
                }
              }
              else {
                ui.draggable.each(function () {
                  var top = $(this).position().top;
                  var left = $(this).position().left;
                  $(this).attr('orgTop', top);
                  $(this).attr('orgLeft', left);
                });
                if (planetNme != prevPlanetNme) {
                  if (ui.draggable.hasClass("electric-balance")) {
                    ElectricMachine.ChangeWeightOnPlanetDrop(planetNme);
                  }
                  else if (ui.draggable.hasClass("pane-balance")) {
                  }
                  else if (ui.draggable.hasClass("spring-balance")) {
                    SpringMachine.ShiftPointerOnPlanetDrop(planetNme);
                  }
                }
              }
            }
          }
          else {
            if (ui.draggable.hasClass("weight-disk-dropped")) {
              //ui.draggable.remove();
              $(".ui-state-hover").removeClass("ui-state-hover");
            }
            if (ui.draggable.hasClass("weight-ball")) {
              ui.draggable.css({
                top: Number(ui.draggable.attr("orgTop")),
                left: Number(ui.draggable.attr("orgLeft"))
              });
              $(".ui-state-hover").removeClass("ui-state-hover");
            }
          }
        }
      });
    },
    AnimateOnPlanetDrop: function (_planet, _weightElm, _container) {
      var dropend = _container.position().top + _container.height() - _weightElm.height();
      var diff = dropend - _weightElm.position().top;
      if (_planet == "earth") {
        _weightElm.animate({ top: dropend + "px" }, 10 * 1 / 6 * diff, 'linear', function () {
          ActivityMain.OnPlanetDropAnimComplete($(this))
        });
      }
      else if (_planet == "moon") {
        //Moon, gravitational force is only 1/6
        _weightElm.animate({ top: dropend + "px" }, 10 * diff, 'linear', function () {
          ActivityMain.OnPlanetDropAnimComplete($(this))
        });
      }
    },
    OnPlanetDropAnimComplete: function (p_draggable) {
      if (p_draggable.hasClass("weight-ball")) {
        let orglft = p_draggable.attr('orgLeft');
        let orgtp = p_draggable.attr('orgTop');
        p_draggable.css({
          "left": Number(orglft),
          "top": Number(orgtp)
        });
      }
      else {
        p_draggable.remove();
      }
    },
    InitBalancerDrop: function () {
      $(".spring-balance-droppable").droppable({
        accept: ".weight-ball, .weight-disk-draggable, .weight-disk-dropped",
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        
        //greedy: true,
        //activeClass: "ui-state-default",
        drop: function (event, ui) {
          ActivityMain.OnWeightDrop(ui.draggable, $(this));
        },
        out: function (event, ui) {
          $(this).removeClass("ui-state-hover")
        }
      }).each(function () {
        $(this).attr("orig-ht", $(this).height())
      });
      $(".pane-01-droppable, .pane-02-droppable").droppable({
        accept: ".weight-ball, .weight-disk-draggable, .weight-disk-dropped",
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        //greedy: true,
        //activeClass: "ui-state-default",
        drop: function (event, ui) {
          ActivityMain.OnWeightDrop(ui.draggable, $(this));
        },
        out: function (event, ui) {
          $(this).removeClass("ui-state-hover")
        }
      }).each(function () {
        $(this).attr("orig-ht", $(this).height())
      });
      $(".electric-balance-droppable").droppable({
        accept: ".weight-ball, .weight-disk-draggable, .weight-disk-dropped",
        tolerance: "touch",
        hoverClass: "ui-state-hover",
        //greedy: true,
        //activeClass: "ui-state-default",
        drop: function (event, ui) {
          ActivityMain.OnWeightDrop(ui.draggable, $(this));
        },
        out: function (event, ui) {
          $(this).removeClass("ui-state-hover")
        }
      }).each(function () {
        $(this).attr("orig-ht", $(this).height())
      });
    },
    BindDroppables: function () {
      this.InitPlanetDrop();
      this.InitBalancerDrop();
    },
    OnWeightDrop: function (_draggable, _droppable) {
      if (_draggable.hasClass("weight-disk-draggable")) {
        var clone = $(_draggable).clone().removeClass("weight-disk-draggable").addClass("weight-disk-dropped");
        $(".activity-panel").append(clone)
        this.SetPositionOnDrop(clone, _droppable);
        this.InitWeightDrag(clone, "disk");
      }
      else {
        ActivityMain.SetPositionOnDrop(_draggable, _droppable);
      }
    },
    ResetPositionsOnDragStart: function (_draggable) {
      var dragmachine = _draggable.attr("machine")
      $(".ui-state-hover").removeClass("ui-state-hover");
      _draggable.removeAttr("shift_top");
      if (dragmachine != undefined && dragmachine != "") {
        var _droppable = $("div[dropmachine='" + dragmachine + "']")
        var dropNewHt = _droppable.height() - _draggable.height();
        _droppable.css({ "height": dropNewHt, "top": -dropNewHt });
        _draggable.removeAttr("machine")
        if (dragmachine == "electric") {
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) - Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          ElectricMachine.DisplayWeight(WeightObj, _draggable, _droppable);

        }
        else if (dragmachine == "balancer1" || dragmachine == "balancer2") {
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) - Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          PaneMachine.BalancePane(WeightObj, _draggable, _droppable);
        }
        else if (dragmachine == "spring") {
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) - Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          SpringMachine.ShiftPointer(WeightObj, _draggable, _droppable);
        }
      }
    },
    SetPositionOnDrop: function (_draggable, _droppable) {
      var dropmachine = _droppable.attr("dropmachine")
      var dragmachine = _draggable.attr("machine")
      var Bind=_draggable.attr("bind");
      if (dropmachine != dragmachine) {
        _draggable.attr("machine", dropmachine);
        _draggable.attr("Bind", true);
        var pos1 = _droppable.closest(".wt-balancer").position();
        var pos2 = _droppable.position();
        var dropOrgHt = Number(_droppable.attr("orig-ht"))
        var dropNewHt = _droppable.height() + _draggable.height()
        _droppable.css({ "height": dropNewHt, "top": -dropNewHt });
        console.log("activitter");
        if (dropmachine == "electric") {
          _draggable.css({ "top": (pos1.top - _droppable.height()) + dropOrgHt });
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          ElectricMachine.DisplayWeight(WeightObj, _draggable, _droppable);
          
          console.log("activitter11111");
        }
        else if (dropmachine == "balancer1" || dropmachine == "balancer2") {
          var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          pos2 = _droppable.closest(".pane").position();
          var dropbalancer = _droppable.attr("dropmachine");
          var topFactor = 0
          console.log("activitter33333");
          //debugger;
          if (pane1Weight > pane2Weight) {
            if (dropbalancer == "balancer1") {
              topFactor = PaneMachine.getAngle() + (PaneMachine.getAngle() / 2);
            }
          }
          else if (pane1Weight < pane2Weight) {
            if (dropbalancer == "balancer2") {
              topFactor = PaneMachine.getAngle() + (PaneMachine.getAngle() / 2);
            }
          }
          _draggable.css({ "top": ((pos1.top - pos2.top - 5) - _droppable.height()) + dropOrgHt + (topFactor * 2) });
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          PaneMachine.BalancePane(WeightObj, _draggable, _droppable);
        }
        else if (dropmachine == "spring") {
          pos2 = _droppable.closest(".spring-balance-drop-container").position();
          var springBase = $(".spring-base-wrap")
          _draggable.css({ "top": (((pos1.top + pos2.top + 5) + springBase.position().top) - _droppable.height()) + dropOrgHt });
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          SpringMachine.ShiftPointer(WeightObj, _draggable, _droppable);
          console.log("dropOrgHt", WeightObj, _draggable, _droppable)
        }
      }
    },
    OnOrientationChange: function () {
      $(".exp-container.zoom1").css({ "width": $(".wrapper").width() })
      this.SetBalancerPositions();
      this.SetWeightPositions();
      $(".ui-droppable[dropkg]").attr("dropkg",0);
      ElectricMachine.ResetBalancer();
      PaneMachine.ResetPan();
      SpringMachine.ResetSpring();
    }
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

$(document).on("dblclick", ".weight-ball[machine]", function () {
  //alert(1);
  ActivityMain.ResetPositionsOnDragStart($(this));
  debugger;
  $(this).data("uiDraggable").originalPosition = {
    top: $(this).attr("orgTop"),
    left: $(this).attr("orgLeft")
  };
  $(this).animate({ top: $(this).attr("orgTop"),  left: $(this).attr("orgLeft")}, 800, function () {
    
  });
})

$(document).on("dblclick", ".weight-disk-dropped", function () {
  //alert(1);
  ActivityMain.ResetPositionsOnDragStart($(this));
  debugger;
  $(this).data("uiDraggable").originalPosition = {
    top: $(this).attr("orgTop"),
    left: $(this).attr("orgLeft")
  };
  $(this).animate({ top: $(this).attr("orgTop"),  left: $(this).attr("orgLeft")}, 800, function () {
    $(this).remove();
  });
})


