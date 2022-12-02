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
          if ($(this).data("uiDraggable") != undefined) {
            $(this).data("uiDraggable").originalPosition = {
              top: $(this).attr("orgTop"),
              left: $(this).attr("orgLeft")
            };
          }
          if (!event) {
            //revert logic

            $(this).removeClass("dropped-object")
          }
          //debugger;
          ActivityMain.PositionWeightOnBalancerDrag({
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          }, $(this))
          return !event;
        },
        start: function (event, ui) {

        },
        drag: function (event, ui) {
          //debugger;
          ActivityMain.PositionWeightOnBalancerDrag({ top: ui.position.top, left: ui.position.left }, $(this))
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
          //console.log($(this).position().top + verticalDistance)
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
            if ($(this).data("uiDraggable") != undefined) {
              $(this).data("uiDraggable").originalPosition = {
                top: $(this).attr("orgTop"),
                left: $(this).attr("orgLeft")
              };
            }

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
        })
      }
      else {
        _htmlElements.draggable({
          containment: ".exp_body_content",
          revert: function (event, ui) {
            if ($(this).data("uiDraggable") != undefined) {
              $(this).data("uiDraggable").originalPosition = {
                top: $(this).attr("orgTop"),
                left: $(this).attr("orgLeft")
              };
            }
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
      //debugger;
      if (_htmlElements.hasClass("ui-draggable")) {
        _htmlElements.draggable("destroy");
      }
      _htmlElements.draggable({
        revert: 'invalid',
        helper: 'clone',
        containment: ".exp_body_content",
        revert: function (event, ui) {
          if ($(this).data("uiDraggable") != undefined) {
            $(this).data("uiDraggable").originalPosition = {
              top: $(this).attr("orgTop"),
              left: $(this).attr("orgLeft")
            };
          }
          if (!event) {
            //revert logic
            $(this).removeClass("dropped-object")
          }
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
        //tolerance: "pointer",
        tolerance: "fit",
        hoverClass: "ui-state-hover-planet",

        //greedy: true,
        //activeClass: "ui-state-default",
        drop: function (event, ui) {
          //debugger;
          if ($(".ui-state-hover").length <= 0) {
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
      var planetPos = $(".planet-wrap[planet='" + _planet + "']").position();
      var dropend = planetPos.top + _container.position().top + _container.height() - _weightElm.height();
      //var dropend = _container.position().top + _container.height() - _weightElm.height();
      /*var margin_element = _container.find(".planet-bg-wrap").get(0);
      var style = margin_element.currentStyle || window.getComputedStyle(margin_element); 
      dropend = dropend - Number((style.marginBottom.replace("px","")));*/
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
          if (!$(".spring-balance.wt-balancer .overload-weight").is(":visible")) {
            ActivityMain.OnWeightDrop(ui.draggable, $(this));
          }
          else {
            if (ui.draggable.hasClass("weight-ball")) {
              let orglft = ui.draggable.attr('orgLeft');
              let orgtp = ui.draggable.attr('orgTop');
              ui.draggable.css({
                "left": Number(orglft),
                "top": Number(orgtp)
              });
            }
            else {
              //ui.draggable.remove();
              //console.log("ondrop2")
            }
          }
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
          //console.log("pane-01-droppable pane-02-droppable")
          ActivityMain.OnWeightDrop(ui.draggable, $(this));
        },
        out: function (event, ui) {
          //console.log("pane-01-droppable pane-02-droppable out")
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
      //console.log("OnWeightDrop")
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
      //console.log("on drag start");
      if (dragmachine != undefined && dragmachine != "") {
        var _droppable = $("div[dropmachine='" + dragmachine + "']")
        var dropNewHt = _droppable.height() - _draggable.height();
        _droppable.css({ "height": dropNewHt, "top": -dropNewHt });
        _draggable.removeAttr("machine")
        //_draggable.removeAttr("dragseq")
        if (dragmachine == "electric") {
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) - Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          ElectricMachine.DisplayWeight(WeightObj, _draggable, _droppable);

          var draggHtToRemove = _draggable.height();
          var dragSeq = _draggable.attr("dragseq");
          _draggable.removeAttr("dragseq");
          var weights = $(".weight[machine='electric']");
          for (var i = 0; i < weights.length; i++) {
            var wtObj = $(weights[i])
            if (Number(wtObj.attr("dragseq")) > Number(dragSeq)) {
              wtObj.css({ "top": wtObj.position().top + draggHtToRemove });
              wtObj.attr("dragseq", Number(wtObj.attr("dragseq")) - 1);
            }
          }
        }
        else if (dragmachine == "balancer1" || dragmachine == "balancer2") {
          var draggHtToRemove = _draggable.height();
          var dragSeq = _draggable.attr("dragseq");
          _draggable.removeAttr("dragseq");
          var newWeight = 0;
          var prev_pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var prev_pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          if (dragmachine == "balancer1") {
            newWeight = (Number($(".pane-01-droppable").attr("dropkg")) - Number(_draggable.attr("kg")));
            $(".pane-01-droppable").attr("dropkg", newWeight);
          }
          else if (dragmachine == "balancer2") {
            newWeight = (Number($(".pane-02-droppable").attr("dropkg")) - Number(_draggable.attr("kg")));
            $(".pane-02-droppable").attr("dropkg", newWeight);
          }
          var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          var balancerTopFrac = 5;
          var draggableTopfact = 2;
          if (ActivityShell.DeviceType() == "mobile") {
            balancerTopFrac = 7;
            draggableTopfact = 2;
          }
          var weights = $(".weight[machine='" + dragmachine + "']");
          for (var i = 0; i < weights.length; i++) {
            var wtObj = $(weights[i])
            if (Number(wtObj.attr("dragseq")) > Number(dragSeq)) {
              wtObj.css({ "top": wtObj.position().top + (draggHtToRemove - draggableTopfact) });
              wtObj.attr("dragseq", Number(wtObj.attr("dragseq")) - 1);
            }
          }
          var deviation = PaneMachine.BalancePane(prev_pane1Weight, prev_pane2Weight, pane1Weight, pane2Weight);
        }
        else if (dragmachine == "spring") {
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) - Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          SpringMachine.ShiftPointer(WeightObj, _draggable, _droppable);
          var draggHtToRemove = _draggable.height();
          var dragSeq = _draggable.attr("dragseq");
          _draggable.removeAttr("dragseq");
          var weights = $(".weight[machine='spring']");
          for (var i = 0; i < weights.length; i++) {
            var wtObj = $(weights[i])
            if (Number(wtObj.attr("dragseq")) > Number(dragSeq)) {
              wtObj.css({ "top": wtObj.position().top + draggHtToRemove });
              wtObj.attr("dragseq", Number(wtObj.attr("dragseq")) - 1);
            }
          }
        }
      }
    },
    SetPositionOnDrop: function (_draggable, _droppable) {
      //console.log("funct SetPositionOnDrop")
      var dropmachine = _droppable.attr("dropmachine")
      var dragmachine = _draggable.attr("machine")
      var Bind = _draggable.attr("bind");
      if (dropmachine != dragmachine) {
        _draggable.attr("machine", dropmachine);
        _draggable.attr("Bind", true);
        var pos1 = _droppable.closest(".wt-balancer").position();
        var pos2 = _droppable.position();
        var dropOrgHt = Number(_droppable.attr("orig-ht"))
        var dropNewHt = _droppable.height() + _draggable.height()
        _droppable.css({ "height": dropNewHt, "top": -dropNewHt });

        if (dropmachine == "electric") {
          _draggable.css({ "top": (pos1.top - _droppable.height()) + dropOrgHt });
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          ElectricMachine.DisplayWeight(WeightObj, _draggable, _droppable);
          _draggable.attr("dragseq", $(".weight[machine='electric']").length);
        }
        else if (dropmachine == "balancer1" || dropmachine == "balancer2") {
          var prev_pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var prev_pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          var newWeight = (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg")))
          _droppable.attr("dropkg", newWeight);
          var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          pos2 = _droppable.closest(".pane").position();

          var dropbalancer = _droppable.attr("dropmachine");
          var topFactor = 0
          var dragSeq = 0;
          var balancerTopFrac = 5;
          var draggableTopfact = 2;
          if (ActivityShell.DeviceType() == "mobile") {
            balancerTopFrac = 7;
            draggableTopfact = 2;
          }
          var deviation = PaneMachine.BalancePane(prev_pane1Weight, prev_pane2Weight, pane1Weight, pane2Weight);

          dragSeq = $(".weight[machine='" + dropmachine + "']").length;
          var lastWeight = $(".weight[machine='" + dropmachine + "'][dragseq='" + (Number(dragSeq) - 1) + "']")
          var wt_top = 0;
          var wt_left = 0;
          if (lastWeight.length == 0) {
            //First Weight 
            wt_top = pos1.top + balancerTopFrac - (_draggable.height() - draggableTopfact) + deviation.TopShift;
          }
          else {
            //Second Weights onwards
            wt_top = lastWeight.position().top - (_draggable.height() - draggableTopfact);
          }
          var paneBalance = $(".pane-balance");
          if (pane1Weight > pane2Weight) {
            if (dropmachine == "balancer1") {
              wt_left = paneBalance.position().left - _draggable.width() / 2 - PaneMachine.getLeftShift();
            }
            else if (dropmachine == "balancer2") {
              wt_left = paneBalance.position().left + paneBalance.width() - _draggable.width() / 2 - (PaneMachine.getLeftShift() + PaneMachine.getFixShift());
            }
          }
          else if (pane1Weight < pane2Weight) {
            if (dropmachine == "balancer1") {
              wt_left = paneBalance.position().left - _draggable.width() / 2 + PaneMachine.getLeftShift() + 4;
            }
            else if (dropmachine == "balancer2") {
              wt_left = paneBalance.position().left + paneBalance.width() - _draggable.width() / 2 + PaneMachine.getLeftShift() - PaneMachine.getFixShift();
            }
          }
          else if (pane1Weight = pane2Weight) {
            if (dropmachine == "balancer1") {
               wt_left = paneBalance.position().left - _draggable.width()/2 - PaneMachine.getLeftShift() + 4;
            }
            else if (dropmachine == "balancer2") {
               wt_left = paneBalance.position().left + paneBalance.width() - _draggable.width()/2 - PaneMachine.getLeftShift();
            }
          }

          _draggable.css({ "top": wt_top, "left": wt_left });
          _draggable.attr("dragseq", dragSeq);
        }
        else if (dropmachine == "spring") {
          //debugger;
          pos2 = _droppable.closest(".spring-balance-drop-container").position();
          var springBase = $(".spring-base-wrap")
          if(navigator.platform.toLowerCase() == "iphone"){
            _draggable.css({ "top": (((pos1.top + pos2.top + 9) + springBase.position().top) - _droppable.height()) + dropOrgHt });
          }
          else{
            _draggable.css({ "top": (((pos1.top + pos2.top + 5) + springBase.position().top) - _droppable.height()) + dropOrgHt });
          }
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          SpringMachine.ShiftPointer(WeightObj, _draggable, _droppable);
          _draggable.attr("dragseq", $(".weight[machine='spring']").length);
        }
      }
    },
    SetPositionOnDrop_Old: function (_draggable, _droppable) {
      //console.log("funct SetPositionOnDrop")
      var dropmachine = _droppable.attr("dropmachine")
      var dragmachine = _draggable.attr("machine")
      var Bind = _draggable.attr("bind");
      if (dropmachine != dragmachine) {
        _draggable.attr("machine", dropmachine);
        _draggable.attr("Bind", true);
        var pos1 = _droppable.closest(".wt-balancer").position();
        var pos2 = _droppable.position();
        var dropOrgHt = Number(_droppable.attr("orig-ht"))
        var dropNewHt = _droppable.height() + _draggable.height()
        _droppable.css({ "height": dropNewHt, "top": -dropNewHt });

        if (dropmachine == "electric") {
          _draggable.css({ "top": (pos1.top - _droppable.height()) + dropOrgHt });
          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          ElectricMachine.DisplayWeight(WeightObj, _draggable, _droppable);
          _draggable.attr("dragseq", $(".weight[machine='electric']").length);
        }
        else if (dropmachine == "balancer1" || dropmachine == "balancer2") {
          var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
          var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
          pos2 = _droppable.closest(".pane").position();
          var dropbalancer = _droppable.attr("dropmachine");
          var topFactor = 0
          var dragSeq = 0;
          if (pane1Weight > pane2Weight) {
            if (dropbalancer == "balancer1") {
              topFactor = PaneMachine.getAngle() + (PaneMachine.getAngle() / 2);
            }
            else {
              topFactor = -PaneMachine.getAngle() / 2;
            }
          }
          else if (pane1Weight < pane2Weight) {
            if (dropbalancer == "balancer2") {
              topFactor = PaneMachine.getAngle() + (PaneMachine.getAngle() / 2);
            }
            else {
              //topFactor = PaneMachine.getAngle()/2;
            }
          }
          if (dropmachine == "balancer1") {
            dragSeq = $(".weight[machine='balancer1']").length;
          }
          else if (dropmachine == "balancer2") {
            dragSeq = $(".weight[machine='balancer2']").length;
          }
          var deviceType = ActivityShell.DeviceType();
          /*if(deviceType == "mobile"){
            _draggable.css({ "top": ((pos1.top - pos2.top - 2) - _droppable.height()) + dropOrgHt + topFactor * 2 });
          }
          else{
            _draggable.css({ "top": ((pos1.top - pos2.top - (PaneMachine.getAngle()-2)) - _droppable.height()) + dropOrgHt + (topFactor * 2) });
          }*/
          console.log("topfactor: " + topFactor)
          _draggable.css({ "top": ((pos1.top - pos2.top - (PaneMachine.getAngle() - 2)) - _droppable.height()) + dropOrgHt + (topFactor * 2) });
          //_draggable.css({ "top": ((pos1.top - pos2.top - (PaneMachine.getAngle()-2)) - _droppable.height()) + dropOrgHt + topFactor });

          _draggable.css({ "left": ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2)) });

          //PaneMachine.BalancePane_New(WeightObj, _draggable, _droppable);
          var WeightObj = {
            from: Number(_droppable.attr("dropkg")),
            to: (Number(_droppable.attr("dropkg")) + Number(_draggable.attr("kg"))),
            current: Number(_droppable.attr("dropkg")),
          }
          PaneMachine.BalancePane(WeightObj, _draggable, _droppable);
          _draggable.attr("dragseq", dragSeq);
        }
        else if (dropmachine == "spring") {
          //debugger;
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
          _draggable.attr("dragseq", $(".weight[machine='spring']").length);
        }
      }
    },
    OnOrientationChange: function () {
      this.ResetActivity();
      $(".exp-container.zoom1").css({ "width": $(".wrapper").width() })
      this.SetBalancerPositions();
      this.SetWeightPositions();
      $(".ui-droppable[dropkg]").attr("dropkg", 0);
      ElectricMachine.ResetBalancer();
      PaneMachine.ResetPan();
      SpringMachine.ResetSpring();
      this.BindDraggables();
      this.BindDroppables();
    },
    ResetActivity: function () {
      $(".weight[machine='electric']").each(function () {
        ActivityMain.ResetPositionsOnDragStart($(this));
        if ($(this).data("uiDraggable") != undefined) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
        }
        $(this).css({
          top: Number($(this).attr("orgTop")),
          left: Number($(this).attr("orgLeft"))
        });
      });
      $(".weight[machine='balancer1']").each(function () {
        ActivityMain.ResetPositionsOnDragStart($(this));
        if ($(this).data("uiDraggable") != undefined) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
        }
        $(this).css({
          top: Number($(this).attr("orgTop")),
          left: Number($(this).attr("orgLeft"))
        });
      });
      $(".weight[machine='balancer2']").each(function () {
        ActivityMain.ResetPositionsOnDragStart($(this));
        if ($(this).data("uiDraggable") != undefined) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
        }
        $(this).css({
          top: Number($(this).attr("orgTop")),
          left: Number($(this).attr("orgLeft"))
        });
      });
      $(".weight[machine='spring']").each(function () {
        //ActivityMain.ResetPositionsOnDragStart($(this));
        if ($(this).data("uiDraggable") != undefined) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };
        }
        $(this).css({
          top: Number($(this).attr("orgTop")),
          left: Number($(this).attr("orgLeft"))
        });
        $(this).removeAttr("shift_top").removeAttr("machine").removeAttr("dragseq").removeAttr("bind");
      });
      $(".spring-base-wrap").css({ top: 0 });
      $(".spring-pointer-bar .spring-pointer").css({ top: 0 });
      $(".ui-state-hover").removeClass("ui-state-hover");
      $(".weight-disk-dropped").remove();
      $(".spring-balance-droppable").css({
        "top": "-" + $(".spring-balance-droppable").attr("orig-ht") + "px",
        "height": $(".spring-balance-droppable").attr("orig-ht") + "px"
      });
      $(".spring-balance-droppable").attr("dropkg", 0);
      $(".overload-weight").hide();
      $(".dropped-object").removeClass("dropped-object")
      $(".pane-bar").removeAttr("style");
      $(".pane-bar .pane").removeAttr("style");
      $(".pane-01-droppable").attr("dropkg", 0);
      $(".pane-02-droppable").attr("dropkg", 0);
      $(".pane-01-droppable").css({
        "top": "-" + $(".pane-01-droppable").attr("orig-ht") + "px",
        "height": $(".pane-01-droppable").attr("orig-ht") + "px"
      });
      $(".pane-02-droppable").css({
        "top": "-" + $(".pane-02-droppable").attr("orig-ht") + "px",
        "height": $(".pane-02-droppable").attr("orig-ht") + "px"
      });
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
  //debugger;
  if ($(this).data("uiDraggable") != undefined) {
    $(this).data("uiDraggable").originalPosition = {
      top: $(this).attr("orgTop"),
      left: $(this).attr("orgLeft")
    };
  }
  $(this).animate({ top: $(this).attr("orgTop"), left: $(this).attr("orgLeft") }, 800, function () {

  });
})

$(document).on("dblclick", ".weight-disk-dropped", function () {
  //alert(1);
  ActivityMain.ResetPositionsOnDragStart($(this));
  //debugger;
  if ($(this).data("uiDraggable") != undefined) {
    $(this).data("uiDraggable").originalPosition = {
      top: $(this).attr("orgTop"),
      left: $(this).attr("orgLeft")
    };
  }
  $(this).animate({ top: $(this).attr("orgTop"), left: $(this).attr("orgLeft") }, 800, function () {
    $(this).remove();
  });
})

$(document).on("click", "#reset_btn", function () {
  ActivityMain.ResetActivity();
});


