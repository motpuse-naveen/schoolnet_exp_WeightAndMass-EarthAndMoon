var ActivityMain = (function () {
  var _eb = { width: 0, height: 0, width_new: 0, height_new: 0 };
  var _pb = { width: 0, height: 0, width_new: 0, height_new: 0 };
  var _sb = { width: 0, height: 0, width_new: 0, height_new: 0 };
  var _disk = { width: 0, height: 0, width_new: 0, height_new: 0 };
  var _ball = { width: 0, height: 0, width_new: 0, height_new: 0 };
  return {
    SetObjectData: function () {
      /*
      _eb.width = $(".electric-balance").width();
      _eb.height = $(".electric-balance").height();
      _pb.width = $(".pane-balance").width();
      _pb.height = $(".pane-balance").height();
      _sb.width = $(".spring-balance").width();
      _sb.height = $(".spring-balance").height();
      _ball.width = $(".weight.weight-ball:first").width();
      _ball.height = $(".weight.weight-ball:first").height();
      _disk.width = $(".weight.weight-disk:first").width();
      _disk.height = $(".weight.weight-disk:first").height();
      */
    },
    SetObjectNewData: function () {
      /*
      _eb.width_new = $(".electric-balance").width();
      _eb.height_new = $(".electric-balance").height();
      _pb.width_new = $(".pane-balance").width();
      _pb.height_new = $(".pane-balance").height();
      _sb.width_new = $(".spring-balance").width();
      _sb.height_new = $(".spring-balance").height();
      _ball.width_new = $(".weight.weight-ball:first").width();
      _ball.height_new = $(".weight.weight-ball:first").height();
      _disk.width_new = $(".weight.weight-disk:first").width();
      _disk.height_new = $(".weight.weight-disk:first").height();
      */
    },
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
    SetWeightPositions_OnOrientationChange: function () {
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
        var balltop = (slateTop - ballHt) + 5;
        var ballleft = weightLeft;
        if ($(".weight-ball.ball-" + (index + 1)).attr("machine") && $(".weight-ball.ball-" + (index + 1)).attr("machine") != "") {
          $(".weight-ball.ball-" + (index + 1)).attr("orgTop", balltop).attr("orgLeft", ballleft);
        }
        else {
          $(".weight-ball.ball-" + (index + 1)).css({ "top": balltop, "left": ballleft });
          $(".weight-ball.ball-" + (index + 1)).attr("orgTop", balltop).attr("orgLeft", ballleft);
        }
      })
      $(".weight-disk:not([machine])").each(function (index) {
        if (index <= 0) {
          weightLeft += (ballWdt + 10);
        }
        else {
          weightLeft += (diskWdt + 10);
        }
        var distTop = (slateTop - diskHt) + 5;
        $(".weight-disk.disk-" + (index + 1) + ":not([machine])").css({ "top": distTop, "left": weightLeft });
        $(".weight-disk.disk-" + (index + 1)).attr("orgTop", distTop).attr("orgLeft", weightLeft);
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

      var springleft = moonPos.left + (moonPos.width - (moonPos.width / 3));
      var springtop = moonPos.top + ((moonPos.height - $(".spring-balance .spring-base-wrap").height()) / 2)
      ActivityMain.PositionWeightOnBalancerDrag({ top: springtop, left: springleft }, $(".spring-balance"));
      $(".spring-balance").css({
        "left": springleft,
        "top": springtop
      }).attr("planet", "moon");


      var paneleft = earthPos.left + (earthPos.width - ((earthPos.width / 8) * 4));
      var panetop = earthPos.top + ((earthPos.height - $(".pane-balance").height()) / 4);
      ActivityMain.PositionWeightOnBalancerDrag({ top: panetop, left: paneleft }, $(".pane-balance"));
      $(".pane-balance").css({
        "left": paneleft,
        "top": panetop
      }).attr("planet", "earth");


      var electricleft = earthPos.left + 20;
      var electrictop = earthPos.top + (earthPos.height - $(".electric-balance").height()) - 20;
      ActivityMain.PositionWeightOnBalancerDrag({ top: electrictop, left: electricleft }, $(".electric-balance"));
      $(".electric-balance").css({
        "left": electricleft,
        "top": electrictop
      }).attr("planet", "earth");
    },
    SetBalancerPIP: function (_balancer) {
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
      var balPos = _balancer.position();
      if (_balancer.attr("planet") == "moon") {
        _balancer.attr("pip-left", balPos.left - moonPos.left);
        _balancer.attr("pip-top", balPos.top - moonPos.top);
      }
      else if (_balancer.attr("planet") == "earth") {
        _balancer.attr("pip-left", balPos.left - earthPos.left);
        _balancer.attr("pip-top", balPos.top - earthPos.top);
      }
    },
    SetBalancerPositions_OnOrientationChange: function () {
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

      var springleft = moonPos.left + (moonPos.width - (moonPos.width / 3));
      var springtop = moonPos.top + ((moonPos.height - $(".spring-balance .spring-base-wrap").height()) / 2)
      if ($(".spring-balance").attr("pip-left") != undefined && $(".spring-balance").attr("pip-left") != "") {
        if ($(".spring-balance").attr("planet") == "earth") {
          springleft = earthPos.left + Number($(".spring-balance").attr("pip-left"));
          springtop = earthPos.top + Number($(".spring-balance").attr("pip-top"));
          if ((springleft + $(".spring-balance").width()) > (earthPos.left + earthPos.width)) {
            springleft = (earthPos.left + earthPos.width) - $(".spring-balance").width() - 10;
          }
          if ((springtop + $(".spring-balance").height()) > (earthPos.top + earthPos.height)) {
            springtop = (earthPos.top + earthPos.height) - $(".spring-balance").height() - 10;
          }
        }
        else if ($(".spring-balance").attr("planet") == "moon") {
          springleft = moonPos.left + Number($(".spring-balance").attr("pip-left"));
          springtop = moonPos.top + Number($(".spring-balance").attr("pip-top"));
          if ((springleft + $(".spring-balance").width()) > (moonPos.left + moonPos.width)) {
            springleft = (moonPos.left + moonPos.width) - $(".spring-balance").width() - 10;
          }
          if ((springtop + $(".spring-balance").height()) > (moonPos.top + moonPos.height)) {
            springtop = (moonPos.top + moonPos.height) - $(".spring-balance").height() - 10;
          }
        }
      }

      ActivityMain.PositionWeightOnBalancerDrag({ top: springtop, left: springleft }, $(".spring-balance"));
      $(".spring-balance").css({
        "left": springleft,
        "top": springtop
      }).attr('orgTop', springtop).attr('orgLeft', springleft);

      var paneleft = earthPos.left + (earthPos.width - ((earthPos.width / 8) * 4));
      var panetop = earthPos.top + ((earthPos.height - $(".pane-balance").height()) / 4);
      if ($(".pane-balance").attr("pip-left") != undefined && $(".pane-balance").attr("pip-left") != "") {
        if ($(".pane-balance").attr("planet") == "moon") {
          paneleft = moonPos.left + Number($(".pane-balance").attr("pip-left"));
          panetop = moonPos.top + Number($(".pane-balance").attr("pip-top"));
          if ((paneleft + $(".pane-balance").width() + $(".pane-balance .pane-bar .pane.p01").width()) > (moonPos.left + moonPos.width)) {
            paneleft = (moonPos.left + moonPos.width) - ($(".pane-balance").width() + $(".pane-balance .pane-bar .pane.p01").width() + 10);
          }
          if ((panetop + $(".pane-balance").height()) > (moonPos.top + moonPos.height)) {
            panetop = (moonPos.top + moonPos.height) - $(".pane-balance").height() - 10;
          }
        }
        else if ($(".pane-balance").attr("planet") == "earth") {
          paneleft = earthPos.left + Number($(".pane-balance").attr("pip-left"));
          panetop = earthPos.top + Number($(".pane-balance").attr("pip-top"));
          if ((paneleft + $(".pane-balance").width() + $(".pane-balance .pane-bar .pane.p01").width()) > (earthPos.left + earthPos.width)) {
            paneleft = (earthPos.left + earthPos.width) - ($(".pane-balance").width() + $(".pane-balance .pane-bar .pane.p01").width() + 10);
          }
          if ((panetop + $(".pane-balance").height()) > (earthPos.top + earthPos.height)) {
            panetop = (earthPos.top + earthPos.height) - ($(".pane-balance").height() + 10);
          }
        }
      }
      ActivityMain.PositionWeightOnBalancerDrag({ top: panetop, left: paneleft }, $(".pane-balance"));
      $(".pane-balance").css({
        "left": paneleft,
        "top": panetop
      }).attr('orgTop', panetop).attr('orgLeft', paneleft);


      var electricleft = earthPos.left + 20;
      var electrictop = earthPos.top + (earthPos.height - $(".electric-balance").height()) - 20;
      if ($(".electric-balance").attr("pip-left") != undefined && $(".electric-balance").attr("pip-left") != "") {
        if ($(".electric-balance").attr("planet") == "moon") {
          electricleft = moonPos.left + Number($(".electric-balance").attr("pip-left"));
          electrictop = moonPos.top + Number($(".electric-balance").attr("pip-top"));
          if ((electricleft + $(".electric-balance").width()) > (moonPos.left + moonPos.width)) {
            electricleft = (moonPos.left + moonPos.width) - $(".electric-balance").width() - 10;
          }
          if ((electrictop + $(".electric-balance").height()) > (moonPos.top + moonPos.height)) {
            electrictop = (moonPos.top + moonPos.height) - $(".electric-balance").height() - 10;
          }
        }
        else {
          electricleft = earthPos.left + Number($(".electric-balance").attr("pip-left"));
          electrictop = earthPos.top + Number($(".electric-balance").attr("pip-top"));
          if ((electricleft + $(".electric-balance").width()) > (earthPos.left + earthPos.width)) {
            electricleft = (earthPos.left + earthPos.width) - $(".electric-balance").width() - 10;
          }
          if ((electrictop + $(".electric-balance").height()) > (earthPos.top + earthPos.height)) {
            electrictop = (earthPos.top + earthPos.height) - $(".electric-balance").height() - 10;
          }
        }
      }
      ActivityMain.PositionWeightOnBalancerDrag({ top: electrictop, left: electricleft }, $(".electric-balance"));
      $(".electric-balance").css({
        "left": electricleft,
        "top": electrictop
      }).attr('orgTop', electrictop).attr('orgLeft', electricleft);
      /*
      ActivityMain.SetObjectNewData();
      console.log(_eb)
      console.log(_pb)
      console.log(_sb)
      console.log(_disk)
      console.log(_ball)
      if (_eb.width != _eb.width_new && _eb.height != _eb.height_new) {
        var loc_leftdiff = (_eb.width - _eb.width_new)/2;
        var loc_topdiff = (_eb.height - _eb.height_new)/2;
        var result = $(".weight[machine='electric']").sort(function (a, b) {
          var contentA = parseInt($(a).attr('dragseq'));
          var contentB = parseInt($(b).attr('dragseq'));
          return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        });
        //debugger;
        var totHt = 0
        for (var i = 0; i < result.length; i++) {
          //debugger;
          if ($(result[i]).hasClass("weight-ball")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - (loc_leftdiff - (_ball.width - _ball.width_new)),
              "top": $(result[i]).position().top + totHt + (_ball.height - _ball.height_new)
            })
            totHt = totHt + (_ball.height - _ball.height_new)
          }
          else if ($(result[i]).hasClass("weight-disk")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - (loc_leftdiff - (_disk.width - _disk.width_new)),
              "top": $(result[i]).position().top + totHt + (_disk.height - _disk.height_new)
            })
            totHt = totHt + (_disk.height - _disk.height_new)
            $(".electric-balance-droppable").css({
              "height": $(".electric-balance-droppable").height() - totHt,
              "top": -$(".electric-balance-droppable").height() - totHt,
            }) 
          }
        }
      }
      if (_pb.width != _pb.width_new && _pb.height != _pb.height_new) {
        var loc_leftdiff = (_pb.width - _pb.width_new)/2;
        var loc_topdiff = (_pb.height - _pb.height_new)/2;
        var result = $(".weight[machine='balancer1']").sort(function (a, b) {
          var contentA = parseInt($(a).attr('dragseq'));
          var contentB = parseInt($(b).attr('dragseq'));
          return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        });
        var totHt = 0
        for (var i = 0; i < result.length; i++) {
          //debugger;
          if ($(result[i]).hasClass("weight-ball")) {
            $(result[i]).css({
              "left": $(result[i]).position().left + (_ball.width - _ball.width_new)/2,
              "top": $(result[i]).position().top + totHt + (_ball.height - _ball.height_new)
            })
            totHt = totHt + (_ball.height - _ball.height_new)
          }
          else if ($(result[i]).hasClass("weight-disk")) {
            $(result[i]).css({
              "left": $(result[i]).position().left + (_disk.width - _disk.width_new)/2,
              "top": $(result[i]).position().top + totHt + (_disk.height - _disk.height_new)
            })
            totHt = totHt + (_disk.height - _disk.height_new)
            $(".pane-01-droppable").css({
              "height": $(".pane-01-droppable").height() - totHt,
              "top": -$(".pane-01-droppable").height() - totHt,
            }) 
          }
        }
        result = $(".weight[machine='balancer2']").sort(function (a, b) {
          var contentA = parseInt($(a).attr('dragseq'));
          var contentB = parseInt($(b).attr('dragseq'));
          return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        });
        totHt = 0
        for (var i = 0; i < result.length; i++) {
          //debugger;
          if ($(result[i]).hasClass("weight-ball")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - loc_leftdiff - ((_ball.width - _ball.width_new)/2) - (_ball.width - _ball.width_new)*2,
              "top": $(result[i]).position().top + totHt + (_ball.height - _ball.height_new)
            })
            totHt = totHt + (_ball.height - _ball.height_new)
          }
          else if ($(result[i]).hasClass("weight-disk")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - loc_leftdiff - ((_ball.width - _ball.width_new)/2) - (_ball.width - _ball.width_new)*2,
              "top": $(result[i]).position().top + totHt + (_disk.height - _disk.height_new)
            })
            totHt = totHt + (_disk.height - _disk.height_new)
            $(".pane-02-droppable").css({
              "height": $(".pane-02-droppable").height() - totHt,
              "top": -$(".pane-02-droppable").height() - totHt,
            }) 
          }
        }
      }
      
      
      if (_sb.width != _sb.width_new && _sb.height != _sb.height_new) {
        var loc_leftdiff = (_sb.width - _sb.width_new)/2;
        var loc_topdiff = (_sb.height - _sb.height_new)/2;
        var result = $(".weight[machine='spring']").sort(function (a, b) {
          var contentA = parseInt($(a).attr('dragseq'));
          var contentB = parseInt($(b).attr('dragseq'));
          return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        });
        //debugger;
        var totHt = 0
        for (var i = 0; i < result.length; i++) {
          //debugger;
          if ($(result[i]).hasClass("weight-ball")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - (loc_leftdiff - (_ball.width - _ball.width_new)),
              "top": $(result[i]).position().top - loc_topdiff + totHt + (_ball.height - _ball.height_new)
            })
            totHt = totHt + (_ball.height - _ball.height_new)
          }
          else if ($(result[i]).hasClass("weight-disk")) {
            $(result[i]).css({
              "left": $(result[i]).position().left - (loc_leftdiff - (_disk.width - _disk.width_new)),
              "top": $(result[i]).position().top - loc_topdiff + totHt + (_disk.height - _disk.height_new)
            })
            totHt = totHt + (_disk.height - _disk.height_new)
            $(".spring-balance-droppable").css({
              "height": $(".spring-balance-droppable").height() - totHt,
              "top": -$(".spring-balance-droppable").height() - totHt,
            }) 
          }
        }
      }
      
      _eb.width =  _eb.width_new;
      _eb.height = _eb.height_new;
      _pb.width = _pb.width_new;
      _pb.height = _pb.height_new;
      _sb.width = _sb.width_new;
      _sb.height = _sb.height_new;
      _ball.width = _ball.width_new;
      _ball.height = _ball.height_new;
      _disk.width = _disk.width_new;
      _disk.height =_disk.height_new;
      */
    },
    SetBalancerPositions_OnOrientationChange_Mobile: function () {
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

      var springleft = moonPos.left + (moonPos.width - (moonPos.width / 3));
      var springtop = moonPos.top + ((moonPos.height - $(".spring-balance .spring-base-wrap").height()) / 2)
      if ($(".spring-balance").attr("planet") == "earth") {
        springleft = earthPos.left + (earthPos.width - (earthPos.width / 3));
        springtop = earthPos.top + ((earthPos.height - $(".spring-balance .spring-base-wrap").height()) / 2)
      }
      ActivityMain.PositionWeightOnBalancerDrag({ top: springtop, left: springleft }, $(".spring-balance"));
      $(".spring-balance").css({
        "left": springleft,
        "top": springtop
      }).attr('orgTop', springtop).attr('orgLeft', springleft);

      var paneleft = earthPos.left + ((earthPos.width / 8) * 1);
      var panetop = earthPos.top + ((earthPos.height - $(".pane-balance").height()) / 4);
      if ($(".pane-balance").attr("planet") == "moon") {
        paneleft = moonPos.left + ((moonPos.width / 8) * 1);
        panetop = moonPos.top + ((moonPos.height - $(".pane-balance").height()) / 4);
      }
      ActivityMain.PositionWeightOnBalancerDrag({ top: panetop, left: paneleft }, $(".pane-balance"));
      $(".pane-balance").css({
        "left": paneleft,
        "top": panetop
      }).attr('orgTop', panetop).attr('orgLeft', paneleft);


      var electricleft = earthPos.left + 20;
      var electrictop = earthPos.top + (earthPos.height - $(".electric-balance").height()) - 20;
      if ($(".electric-balance").attr("planet") == "moon") {
        electricleft = moonPos.left + 20;
        electrictop = moonPos.top + (moonPos.height - $(".electric-balance").height()) - 20;
      }
      ActivityMain.PositionWeightOnBalancerDrag({ top: electrictop, left: electricleft }, $(".electric-balance"));
      $(".electric-balance").css({
        "left": electricleft,
        "top": electrictop
      }).attr('orgTop', electrictop).attr('orgLeft', electricleft);
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
                ActivityMain.SetBalancerPIP(ui.draggable);
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
              let orglft = ui.draggable.attr('orgLeft');
              let orgtp = ui.draggable.attr('orgTop');
              ui.draggable.css({
                "left": Number(orglft),
                "top": Number(orgtp)
              });
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
      console.log("start OnWeightDrop")
      if (_draggable.attr("machine") == undefined || _draggable.attr("machine") == "") {
        if (_draggable.hasClass("weight-disk-draggable")) {
          //if(!_draggable.attr("alreadydrop")){
            var clone = $(_draggable).clone().removeClass("weight-disk-draggable").addClass("weight-disk-dropped");
            $(".activity-panel").append(clone)
            this.SetPositionOnDrop(clone, _droppable);
            this.InitWeightDrag(clone, "disk");
            //_draggable.attr("alreadydrop","true")
            $(".weight-disk-draggable.ui-draggable-dragging").remove();
          //}
        }
        else {
          ActivityMain.SetPositionOnDrop(_draggable, _droppable);
        }
      }
      console.log("end OnWeightDrop")
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
          var dragSeq = 0;
          dragSeq = $(".weight[machine='" + dropmachine + "']").length;
          var lastWeight = $(".weight[machine='" + dropmachine + "'][dragseq='" + (Number(dragSeq) - 1) + "']")
          var wt_top = 0;
          var wt_left = 0;
          if (lastWeight.length == 0) {
            //First Weight 
            wt_top = (pos1.top - _droppable.height()) + dropOrgHt;
          }
          else {
            //Second Weights onwards
            wt_top = lastWeight.position().top - (_draggable.height());
          }
          wt_left = ((pos1.left + pos2.left) + (_droppable.width() / 2 - _draggable.width() / 2));
          _draggable.css({ "top": wt_top });
          _draggable.css({ "left":  wt_left});
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
              wt_left = paneBalance.position().left - _draggable.width() / 2 - PaneMachine.getLeftShift() + 4;
            }
            else if (dropmachine == "balancer2") {
              wt_left = paneBalance.position().left + paneBalance.width() - _draggable.width() / 2 - PaneMachine.getLeftShift();
            }
          }

          _draggable.css({ "top": wt_top, "left": wt_left });
          _draggable.attr("dragseq", dragSeq);
        }
        else if (dropmachine == "spring") {
          //debugger;
          pos2 = _droppable.closest(".spring-balance-drop-container").position();
          var springBase = $(".spring-base-wrap")
          if (navigator.platform != undefined && navigator.platform.toLowerCase() == "iphone") {
            _draggable.css({ "top": (((pos1.top + pos2.top + 10) + springBase.position().top) - _droppable.height()) + dropOrgHt });
          }
          else {
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
      //this.ResetActivity();
      $(".exp-container.zoom1").css({ "width": $(".wrapper").width() })

      this.SetBalancerPositions_OnOrientationChange();
      this.SetWeightPositions_OnOrientationChange()
      //this.SetWeightPositions_OnOrientationChange();
      //$(".ui-droppable[dropkg]").attr("dropkg", 0);
      //ElectricMachine.ResetBalancer();
      //PaneMachine.ResetPan();
      //SpringMachine.ResetSpring();
      //this.BindDraggables();
      //this.BindDroppables();
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


