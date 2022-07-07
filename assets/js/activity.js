
const _path1 = [1, 2, 3, 4, 5, 6, 7, 11, 12];
const _path2 = [1, 2, 3, 4, 8, 9, 10, 11, 12];
const _path1subset = [5, 6, 7];
const _path2subset = [8, 9, 10];
const _path3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var ispath1complete = false;
var ispath2complete = false;

var ActivityMain = (function () {
  var _voltage = 1;
  var _current = 0;
  var _currentpath1 = [];
  var _currentpath2 = [];
  var curQtnNo = 1;
  var totalQtns = 0;
  var correctQtns = 0;
  var ratingArray = [0, 0, 0, 0];
  var isRatingCorrectArray = [true, true, true, true];
  var _deviceDetails = {
    "bulb": {
      "ratings": 0,
      "max_current": 0,
      "resistance": 0
    },
    "robot": {
      "ratings": 0,
      "max_current": 0,
      "resistance": 0
    },
    "boat": {
      "ratings": 0,
      "max_current": 0,
      "resistance": 0
    },
    "horse": {
      "ratings": 0,
      "max_current": 0,
      "resistance": 0
    }
  }
  return {
    Data: function () {
      return {
        "_currentpath1": _currentpath1,
        "_currentpath2": _currentpath2
      }
    },
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
      _voltage = 1;
      _current = 0;
      _currentpath1 = [];
      _currentpath2 = [];
      ispath1complete = false;
      ispath2complete = false;
      _deviceDetails = {
        "bulb": {
          "ratings": 0,
          "max_current": 0,
          "resistance": 0
        },
        "robot": {
          "ratings": 0,
          "max_current": 0,
          "resistance": 0
        },
        "boat": {
          "ratings": 0,
          "max_current": 0,
          "resistance": 0
        },
        "horse": {
          "ratings": 0,
          "max_current": 0,
          "resistance": 0
        }
      }
      $(".dropped-wire[object='wire']").remove();
      $(".dropped-object").each(function(){
        ActivityMain.ResetObjToOriginal($(this));
      });
      $(".dropwire").removeClass("complete").removeClass("broken")
      $(".dragObject").removeClass("complete").removeClass("broken")
      $(".dragObject[object='bulb'] img.objimg").attr("src", "assets/images/bulb/glow/0.png");
      $(".dragObject[object='boat'] img.objimg").attr("src", "assets/images/boat/moving/0.png");
      $(".dragObject[object='robot'] img.objimg").attr("src", "assets/images/robot/moving/0.png")
      $(".dragObject[object='horse'] img.objimg").attr("src", "assets/images/horse/moving/0.png")

      ActivityAnimation.ResetIntervals();
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
    },
    NewQuestion: function () {
      $(".ques-txt .ques-no").text("Q" + curQtnNo + ":")
      $(".score_txt").text("" + correctQtns + "/" + totalQtns);
      
      $("#OK_btn").show();
      $(".correct-mark").remove();
      $(".wrong-mark").remove();
      this.ResetActivity();
      this.InitDeviceValues();
      $(".volt-wrap .voltage").html(_voltage)
      $("input[type='checkbox'][name='device']").prop('checked', false);
    },
    InitDeviceValues: function () {
      $(".dragObjectClone[object='wire']").attr("resistance", 0.0001);
      $(".dragObject[object='ammeter']").attr("resistance", 0);
      _deviceDetails.bulb.resistance = 1 + Math.floor(Number(Math.random() * 4));
      _deviceDetails.robot.resistance = 1 + Math.floor(Number(Math.random() * 4));
      _deviceDetails.boat.resistance = 1 + Math.floor(Number(Math.random() * 4));
      _deviceDetails.horse.resistance = 1 + Math.floor(Number(Math.random() * 4));

      for (var i = 0; i <= 3; i++) {
        ratingArray[i] = Math.floor(Number((Math.random() * 5) + 5))
        isRatingCorrectArray[i] = (Math.random() > 0.5)
      }
      _deviceDetails.bulb.max_current = Number(ratingArray[0] + 0.1 + Math.floor(Number(Math.random() * 1000)) / 1000 - (isRatingCorrectArray[0] ? 0 : 2)).toFixed(2);
      _deviceDetails.robot.max_current = Number(ratingArray[1] + 0.1 + Math.floor(Number(Math.random() * 1000)) / 1000 - (isRatingCorrectArray[1] ? 0 : 2)).toFixed(2);
      _deviceDetails.boat.max_current = Number(ratingArray[2] + 0.1 + Math.floor(Number(Math.random() * 1000)) / 1000 - (isRatingCorrectArray[2] ? 0 : 2)).toFixed(2);
      _deviceDetails.horse.max_current = Number(ratingArray[3] + 0.1 + Math.floor(Number(Math.random() * 1000)) / 1000 - (isRatingCorrectArray[3] ? 0 : 2)).toFixed(2);

      _deviceDetails.bulb.ratings = ratingArray[0];
      _deviceDetails.robot.ratings = ratingArray[1];
      _deviceDetails.boat.ratings = ratingArray[2];
      _deviceDetails.horse.ratings = ratingArray[3];

      _deviceDetails.bulb.correct = isRatingCorrectArray[0];
      _deviceDetails.robot.correct = isRatingCorrectArray[1];
      _deviceDetails.boat.correct = isRatingCorrectArray[2];
      _deviceDetails.horse.correct = isRatingCorrectArray[3];

      $(".dragObject[object='bulb']").attr("resistance", _deviceDetails.bulb.resistance);
      $(".dragObject[object='robot']").attr("resistance", _deviceDetails.robot.resistance);
      $(".dragObject[object='boat']").attr("resistance", _deviceDetails.boat.resistance);
      $(".dragObject[object='horse']").attr("resistance", _deviceDetails.horse.resistance);

      $(".dragObject[object='bulb']").attr("maxCurrent", _deviceDetails.bulb.max_current)
      $(".dragObject[object='robot']").attr("maxCurrent", _deviceDetails.robot.max_current)
      $(".dragObject[object='boat']").attr("maxCurrent", _deviceDetails.boat.max_current)
      $(".dragObject[object='horse']").attr("maxCurrent", _deviceDetails.horse.max_current)

      $(".dragObject[object='bulb']").attr("ratings", _deviceDetails.bulb.ratings)
      $(".dragObject[object='robot']").attr("ratings", _deviceDetails.robot.ratings)
      $(".dragObject[object='boat']").attr("ratings", _deviceDetails.boat.ratings)
      $(".dragObject[object='horse']").attr("ratings", _deviceDetails.horse.ratings)

      $(".dragObject[object='bulb'] .dragText").text(_deviceDetails.bulb.ratings + " Amp Rating")
      $(".dragObject[object='robot'] .dragText").text(_deviceDetails.robot.ratings + " Amp Rating")
      $(".dragObject[object='boat'] .dragText").text(_deviceDetails.boat.ratings + " Amp Rating")
      $(".dragObject[object='horse'] .dragText").text(_deviceDetails.horse.ratings + " Amp Rating")
    },
    OnOrientationChange: function () {

    },
    ToggleVoltage: function (togVal) {
      if (togVal == 1) {
        _voltage++;
      }
      else {
        if (_voltage > 1) {
          _voltage--;
        }
      }
      $(".volt-wrap .voltage").html(_voltage)
      this.DisplayCurrent();
      this.UpdateDeviceStatus();
    },
    RemovePathElement: function (pathno) {
      for (var i = 0; i < _currentpath1.length; i++) {
        if (_currentpath1[i] === pathno) {
          _currentpath1.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < _currentpath2.length; i++) {
        if (_currentpath2[i] === pathno) {
          _currentpath2.splice(i, 1);
          i--;
        }
      }
    },
    AddPathElement: function (pathno) {
      if (Number(pathno) == 8 || Number(pathno) == 9 || Number(pathno) == 10) {
        _currentpath2.push(Number(pathno));
      }
      else if (Number(pathno) == 5 || Number(pathno) == 6 || Number(pathno) == 7) {
        _currentpath1.push(Number(pathno));
      }
      else {
        _currentpath2.push(Number(pathno));
        _currentpath1.push(Number(pathno));
      }
    },
    SortPathElement: function (p_path) {
      p_path.sort(function (a, b) { return a - b });
      return p_path;
    },
    IsPathExist: function (p_path, pathno) {
      var isexist = false;
      for (var i = 0; i < p_path.length; i++) {
        if (p_path[i] === pathno) {
          isexist = true;
          break;
        }
      }
      return isexist;
    },
    IsPathEqual: function (a, b) {
      return a.join() == b.join();
    },
    OnCircuitComplete: function () {
      ispath1complete = false;
      ispath2complete = false;
      var ispath3complete = false;
      _currentpath1 = this.SortPathElement(_currentpath1);
      _currentpath2 = this.SortPathElement(_currentpath2);
      ispath1complete = this.IsPathEqual(_currentpath1, _path1);
      ispath2complete = this.IsPathEqual(_currentpath2, _path2);
      //ispath3complete = this.IsPathEqual(_path, _path3);
      if (ispath1complete || ispath2complete) {
        if (ispath1complete) {
          for (var i = 0; i < _path1.length; i++) {
            //console.log(_path1[i] + "--" + $(".dropped-wire[seq='" + _path1[i] + "']").length)
            $(".dropped-wire[seq='" + _path1[i] + "']").addClass("complete");
            $(".dropped-object[seq='" + _path1[i] + "']").addClass("complete");
          }
          $(".dropwire.ver").addClass("complete");
          $(".dropwire.ver[path='2']").removeClass("complete")
        }
        else {
          for (var i = 0; i < _path1subset.length; i++) {
            //console.log(_path1subset[i] + "--" + $(".dropped-wire[seq='" + _path1subset[i] + "']").length)
            $(".dropped-wire[seq='" + _path1subset[i] + "']").removeClass("complete");
            $(".dropped-object[seq='" + _path1subset[i] + "']").removeClass("complete");
          }
        }
        if (ispath2complete) {
          for (var i = 0; i < _path2.length; i++) {
            $(".dropped-wire[seq='" + _path2[i] + "']").addClass("complete");
            $(".dropped-object[seq='" + _path2[i] + "']").addClass("complete");
          }
          $(".dropwire.ver").addClass("complete");
        }
        else {
          for (var i = 0; i < _path2subset.length; i++) {
            //console.log(_path2subset[i] + "--" + $(".dropped-wire[seq='" + _path2subset[i] + "']").length)
            $(".dropped-wire[seq='" + _path2subset[i] + "']").removeClass("complete");
            $(".dropped-object[seq='" + _path2subset[i] + "']").removeClass("complete");
          }
        }
        this.DisplayCurrent();
        this.UpdateDeviceStatus();
      }
      else {
        for (var i = 0; i < _path1.length; i++) {
          //console.log(_path1[i] + "--" + $(".dropped-wire[seq='" + _path1[i] + "']").length)
          $(".dropped-wire[seq='" + _path1[i] + "']").removeClass("complete");
          $(".dropped-object[seq='" + _path1[i] + "']").removeClass("complete");
        }
        for (var i = 0; i < _path2.length; i++) {
          $(".dropped-wire[seq='" + _path2[i] + "']").removeClass("complete");
          $(".dropped-object[seq='" + _path2[i] + "']").removeClass("complete");
        }
        $(".dropwire.ver").removeClass("complete");
      }
    },
    GetLinearCurrent: function () {
      var ameterSeq = $(".dropped-object[object='ammeter']").attr("seq");
      if (ameterSeq != undefined) {
        ameterSeq = Number(ameterSeq);
      }
      var R_tot_resistance = 0;
      var I_current = 0;

      $(".dropped-wire[object='wire']").each(function () {
        var wire_resistance = Number($(this).attr("resistance"));
        R_tot_resistance += wire_resistance;
      })
      $(".dropped-object").each(function () {
        var device_resistance = Number($(this).attr("resistance"));
        R_tot_resistance += device_resistance;
      })
      var V_voltage = Number($(".volt-wrap .value .voltage").text());
      var R_Obj = this.GetR5ToR10_Resistance();
      var R_resistance = 0;
      if (ispath1complete) {
        R_resistance = R_tot_resistance - (R_Obj.R8 + R_Obj.R9 + R_Obj.R10);
        if (ameterSeq == 5 || ameterSeq == 6 || ameterSeq == 7 || ameterSeq == 8 || ameterSeq == 9 || ameterSeq == 10) {
          if (ameterSeq == 5 || ameterSeq == 6 || ameterSeq == 7) {
            I_current = V_voltage / R_resistance;
          }
        }
        else {
          I_current = V_voltage / R_resistance;
        }
      }
      if (ispath2complete) {
        R_resistance = R_tot_resistance - (R_Obj.R6 + R_Obj.R7 + R_Obj.R8);
        if (ameterSeq == 5 || ameterSeq == 6 || ameterSeq == 7 || ameterSeq == 8 || ameterSeq == 9 || ameterSeq == 10) {
          if (ameterSeq == 8 || ameterSeq == 9 || ameterSeq == 10) {
            I_current = V_voltage / R_resistance;
          }
        }
        else {
          I_current = V_voltage / R_resistance;
        }
      }
      return I_current;
    },
    GetParallerCurrent: function () {
      var R_tot_resistance = 0;
      $(".dropped-wire[object='wire']").each(function () {
        var wire_resistance = Number($(this).attr("resistance"));
        R_tot_resistance += wire_resistance;
      })
      $(".dropped-object").each(function () {
        var device_resistance = Number($(this).attr("resistance"));
        R_tot_resistance += device_resistance;
      })

      var R_Obj = this.GetR5ToR10_Resistance();

      var R_5_8 = 1 / (1 / R_Obj.R5 + 1 / R_Obj.R8);
      var R_6_9 = 1 / (1 / R_Obj.R6 + 1 / R_Obj.R9);
      var R_7_10 = 1 / (1 / R_Obj.R7 + 1 / R_Obj.R10);

      R_tot_Parallel_resistance = R_Obj.R5 + R_Obj.R6 + R_Obj.R7 + R_Obj.R8 + R_Obj.R9 + R_Obj.R10;
      var R_tot_Linear_resistance = R_tot_resistance - R_tot_Parallel_resistance;

      var R_paraller_resistance = R_5_8 + R_6_9 + R_7_10;
      var R_resistance = R_tot_Linear_resistance + R_paraller_resistance;
      var V_voltage = Number($(".volt-wrap .value .voltage").text());

      var I_current = V_voltage / R_resistance;
      return I_current;
    },
    GetR5ToR10_Resistance: function () {
      var R5 = 0;
      var R6 = 0;
      var R7 = 0;
      var R8 = 0;
      var R9 = 0;
      var R10 = 0;
      if ($(".dropped-wire[object='wire'][seq='5']").length > 0) {
        R5 = Number($(".dropped-wire[object='wire'][seq='5']").attr("resistance"));
      }
      if ($(".dropped-object[seq='5']").length > 0) {
        R5 = Number($(".dropped-object[seq='5']").attr("resistance"));
      }
      if ($(".dropped-wire[object='wire'][seq='6']").length > 0) {
        R6 = Number($(".dropped-wire[object='wire'][seq='6']").attr("resistance"));
      }
      if ($(".dropped-object[seq='6']").length > 0) {
        R6 = Number($(".dropped-object[seq='6']").attr("resistance"));
      }
      if ($(".dropped-wire[object='wire'][seq='7']").length > 0) {
        R7 = Number($(".dropped-wire[object='wire'][seq='7']").attr("resistance"));
      }
      if ($(".dropped-object[seq='7']").length > 0) {
        R7 = Number($(".dropped-object[seq='7']").attr("resistance"));
      }
      if ($(".dropped-wire[object='wire'][seq='8']").length > 0) {
        R8 = Number($(".dropped-wire[object='wire'][seq='8']").attr("resistance"));
      }
      if ($(".dropped-object[seq='8']").length > 0) {
        R8 = Number($(".dropped-object[seq='8']").attr("resistance"));
      }
      if ($(".dropped-wire[object='wire'][seq='9']").length > 0) {
        R9 = Number($(".dropped-wire[object='wire'][seq='9']").attr("resistance"));
      }
      if ($(".dropped-object[seq='9']").length > 0) {
        R9 = Number($(".dropped-object[seq='9']").attr("resistance"));
      }
      if ($(".dropped-wire[object='wire'][seq='10']").length > 0) {
        R10 = Number($(".dropped-wire[object='wire'][seq='10']").attr("resistance"));
      }
      if ($(".dropped-object[seq='10']").length > 0) {
        R10 = Number($(".dropped-object[seq='10']").attr("resistance"));
      }
      return {
        "R5": R5,
        "R6": R6,
        "R7": R7,
        "R8": R8,
        "R9": R9,
        "R10": R10
      }
    },
    CalculateCurrent: function () {
      //debugger;
      var I_Circuit_Current = 0
      var ameterSeq = $(".dropped-object[object='ammeter']").attr("seq");
      if (ameterSeq != undefined) {
        ameterSeq = Number(ameterSeq);
      }
      else {
        ameterSeq = 0;
      }
      if (ispath1complete || ispath2complete) {
        if (ispath1complete && ispath2complete) {
          if (ameterSeq == 5 || ameterSeq == 6 || ameterSeq == 7 || ameterSeq == 8 || ameterSeq == 9 || ameterSeq == 10) {
            I_Circuit_Current = this.GetLinearCurrent();
          }
          else {
            //Calculate parallel resistance 
            I_Circuit_Current = this.GetParallerCurrent();
          }
        }
        else {
          I_Circuit_Current = this.GetLinearCurrent();
        }
      }
      return I_Circuit_Current;
    },
    DisplayCurrent: function () {
      var i_current = this.CalculateCurrent();
      _current = Number(i_current.toFixed(3));
      $(".dropped-object[object='ammeter']").find(".ammeter-text").text(_current + " A")
    },
    UpdateDeviceStatus: function () {
      var _data = ActivityMain.GetCircuitValues();
      var isDeviceBreak = false;
      if (ispath1complete || ispath2complete) {
        this.CheckAndStartAnimation();
        //Ratings<MaxCurrent - Device is defected.
        //Check MaxCurrent against broken 
        if (ispath1complete && ispath2complete) {
          if (_data.Current > _data.Devices.bulb.max_current) {
            ActivityAnimation.StartBulbBrokenAnimation();
          }
          if (_data.Current > _data.Devices.robot.max_current) {
            ActivityAnimation.StartRobotBrokenAnimation();
          }
          if (_data.Current > _data.Devices.boat.max_current) {
            ActivityAnimation.StartBoatBrokenAnimation();
          }
          if (_data.Current > _data.Devices.horse.max_current) {
            ActivityAnimation.StartHorseBrokenAnimation();
          }
        }
        else if (ispath1complete) {
          $(".dropped-object.complete:not(.broken, .ammeter)").each(function () {
            var seq = Number($(this).attr("seq"))
            var object = $(this).attr("object");
            if (ActivityMain.IsPathExist(_path1, seq)) {
              if (object == "bulb") {
                if (_data.Current > _data.Devices.bulb.max_current) {
                  ActivityAnimation.StartBulbBrokenAnimation();
                }
              }
              if (object == "robot") {
                if (_data.Current > _data.Devices.robot.max_current) {
                  ActivityAnimation.StartRobotBrokenAnimation();
                }
              }
              if (object == "boat") {
                if (_data.Current > _data.Devices.boat.max_current) {
                  ActivityAnimation.StartBoatBrokenAnimation();
                }
              }
              if (object == "horse") {
                if (_data.Current > _data.Devices.horse.max_current) {
                  ActivityAnimation.StartHorseBrokenAnimation();
                }
              }
            }
          });
        }
        else if (ispath2complete) {
          $(".dropped-object.complete:not(.broken, .ammeter)").each(function () {
            var seq = Number($(this).attr("seq"))
            var object = $(this).attr("object");
            if (ActivityMain.IsPathExist(_path2, seq)) {
              if (object == "bulb") {
                if (_data.Current > _data.Devices.bulb.max_current) {
                  ActivityAnimation.StartBulbBrokenAnimation();
                }
              }
              if (object == "robot") {
                if (_data.Current > _data.Devices.robot.max_current) {
                  ActivityAnimation.StartRobotBrokenAnimation();
                }
              }
              if (object == "boat") {
                if (_data.Current > _data.Devices.boat.max_current) {
                  ActivityAnimation.StartBoatBrokenAnimation();
                }
              }
              if (object == "horse") {
                if (_data.Current > _data.Devices.horse.max_current) {
                  ActivityAnimation.StartHorseBrokenAnimation();
                }
              }
            }
          });
        }
      }
    },
    CheckAndStartAnimation: function (path) {
      if (ispath1complete || ispath2complete) {
        ActivityAnimation.UpdateBulbGlow();
        ActivityAnimation.StartRobotMovingAnimation();
        ActivityAnimation.StartBoatMovingAnimation();
        ActivityAnimation.StartHorseMovingAnimation();
      }
    },
    BindDraggables: function () {
      //Bind Draggable
      $(".dragObject").draggable({
        container: ".circuit-diagram",
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
          if (ui.helper.attr("seq")) {
            ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")))
            ui.helper.removeAttr("seq")
            ui.helper.removeAttr("anim")
            ActivityMain.OnCircuitComplete();
          }
          var objType = ui.helper.attr("object");
          ui.helper.removeClass("dropped-object");
          if (!ui.helper.hasClass("broken")) {
            if (objType == "bulb") {
              ui.helper.find("img.objimg").attr("src", "assets/images/bulb/glow/0.png");
            }
            else if (objType == "robot") {
              ui.helper.find("img.objimg").attr("src", "assets/images/robot/moving/0.png");
            }
            else if (objType == "boat") {
              ui.helper.find("img.objimg").attr("src", "assets/images/boat/moving/0.png");
            }
            else if (objType == "horse") {
              ui.helper.find("img.objimg").attr("src", "assets/images/horse/moving/0.png");
            }
            else if (objType == "ammeter") {
              ui.helper.find("img.ameter").attr("src", "assets/images/drag_ameter.svg");
            }
          }
        },
        drag: function (event, ui) {
        }
      }).each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).attr('orgTop', top);
        $(this).attr('orgLeft', left);
      });
      $(".dragObjectClone").draggable({
        container: ".circuit-diagram",
        helper: 'clone',
        revert: function (event, ui) {
          var clone = $(".dragObjectClone.ui-draggable-handle.ui-draggable-dragging")
          clone.fadeOut(500, function () {
            clone.remove();
          });
        },
        start: function (event, ui) {
          //debugger;
          if (ui.helper.attr("seq")) {
            ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")))
            ui.helper.removeAttr("seq")
            ui.helper.removeAttr("anim")
            ActivityMain.OnCircuitComplete();
          }
        },
        drag: function (event, ui) {
        }
      })
    },
    BindDroppables: function () {
      //Bind Droppable
      $(".d-wire-object").droppable({
        accept: ".dragObject",
        tolerance: "touch",
        drop: function (event, ui) {
          //ph - placeholder for wire droppable.
          if (!ui.draggable.hasClass("broken")) {
            console.log("seq-" + ui.draggable.attr("seq"))
            if (!ui.draggable.attr("seq")) {
              if ($(this).closest(".d-wire").find(".dropped-wire").length <= 0) {
                var sequence = $(this).closest(".d-wire").attr("seq");
                var anim = $(this).closest(".d-wire").attr("anim");
                if ($(".dropped-object[seq='" + sequence + "']").length <= 0) {
                  var phPos = $(this).closest(".d-wire").position();
                  var objType = ui.draggable.attr("object")
                  ui.draggable.addClass("dropped-object").css({
                    "left": phPos.left + 20,
                    "top": phPos.top - 46
                  })
                  if (objType == "bulb") {
                    ui.draggable.find("img.objimg").attr("src", "assets/images/bulb/glow/0.png")
                  }
                  else if (objType == "robot") {
                    ui.draggable.find("img.objimg").attr("src", "assets/images/robot/moving/0.png")
                  }
                  else if (objType == "boat") {
                    ui.draggable.find("img.objimg").attr("src", "assets/images/boat/moving/0.png")
                  }
                  else if (objType == "horse") {
                    ui.draggable.find("img.objimg").attr("src", "assets/images/horse/moving/0.png")
                  }
                  else if (objType == "ammeter") {
                    ui.draggable.find("img.ameter").attr("src", "assets/images/ameter-02.svg")
                    ui.draggable.addClass("dropped-object").css({
                      "left": phPos.left + 20,
                      "top": phPos.top - 44
                    })
                  }
                  ActivityMain.AddPathElement(sequence);
                  ui.draggable.attr("seq", sequence);
                  ui.draggable.attr("anim", anim);
                  ActivityMain.OnCircuitComplete();
                }
                else {
                  console.log("reverse 1")
                  ActivityMain.ResetObjToOriginal(ui.draggable);
                }
              }
              else {
                console.log("reverse 2")
                ActivityMain.ResetObjToOriginal(ui.draggable);
              }
            }
            else {
              //NM: do nothing if already dropped.
              //console.log("reverse 3")
              //ActivityMain.ResetObjToOriginal(ui.draggable);
            }
          }
          else {
            console.log("reverse 4")
            ActivityMain.ResetObjToOriginal(ui.draggable);
          }
        },
        out: function (event, ui) { }
      });

      $(".d-wire").droppable({
        accept: ".dragObjectClone, .dropped-wire",
        tolerance: "intersect",
        drop: function (event, ui) {
          if (!ui.draggable.attr("seq")) {
            if ($(this).find(".dropped-wire").length <= 0) {
              var sequence = $(this).attr("seq")
              var anim = $(this).attr("anim");
              if ($(".dropped-object[seq='" + sequence + "']").length <= 0) {
                var clone = $(ui.draggable).clone();
                if (ui.draggable.hasClass("dragObjectClone")) {
                  clone.addClass("dropped-wire").removeClass("dragObjectClone")
                  $(this).append(clone.css({
                    "left": 0,
                    "top": 0
                  }));
                  clone.find("img.wire").attr("src", "assets/images/wire-01.svg").addClass("h-wire-img")
                  clone.draggable({
                    container: ".circuit-diagram",
                    revert: function (event, ui) {
                      $(this).fadeOut(500, function () {
                        $(this).remove();
                      });
                    },
                    start: function (event, ui) {
                      if (ui.helper.attr("seq")) {
                        ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")));
                        ui.helper.removeAttr("seq");
                        ui.helper.removeAttr("anim");
                        ActivityMain.OnCircuitComplete();
                      }
                      ui.helper.find("img.wire").attr("src", "assets/images/drag_wire.svg").removeClass("h-wire-img")
                    },
                    drag: function (event, ui) {
                    }
                  })
                }
                else if (ui.draggable.hasClass("dropped-wire")) {
                  $(this).append(clone.css({
                    "left": 0,
                    "top": 0
                  }));
                  $(ui.draggable).remove();
                  clone.find("img.wire").attr("src", "assets/images/wire-01.svg").addClass("h-wire-img")
                  clone.draggable({
                    container: ".circuit-diagram",
                    revert: function (event, ui) {
                      $(this).fadeOut(500, function () {
                        $(this).remove();
                      });
                    },
                    start: function (event, ui) {
                      if (ui.helper.attr("seq")) {
                        ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")));
                        ui.helper.removeAttr("seq");
                        ui.helper.removeAttr("anim");
                        ActivityMain.OnCircuitComplete();
                      }
                      ui.helper.find("img.wire").attr("src", "assets/images/drag_wire.svg").removeClass("h-wire-img")
                    },
                    drag: function (event, ui) {
                    }
                  })
                }
                ActivityMain.AddPathElement(sequence)
                clone.attr("seq", sequence);
                clone.attr("anim", anim);
                ActivityMain.OnCircuitComplete();
              }
            }
            else {
              ui.helper.fadeOut(500, function () {
                ui.helper.remove();
              });
            }
          }
        },
        out: function (event, ui) { }
      });
    },
    SubmitQuestion: function () {
      if (isRatingCorrectArray[0] == $('input[type="checkbox"][value="bulb"]').prop('checked')) {
        $('input[type="checkbox"][value="bulb"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="bulb"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[1] == $('input[type="checkbox"][value="robot"]').prop('checked')) {
        $('input[type="checkbox"][value="robot"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="robot"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[2] == $('input[type="checkbox"][value="boat"]').prop('checked')) {
        $('input[type="checkbox"][value="boat"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="boat"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[3] == $('input[type="checkbox"][value="horse"]').prop('checked')) {
        $('input[type="checkbox"][value="horse"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="horse"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      curQtnNo++
      $(".score_txt").text("" + correctQtns + "/" + totalQtns);
      $("#OK_btn").hide()
      $("#next_btn").show()
    },
    GetCircuitValues: function () {
      return {
        "Voltage": _voltage,
        "Current": _current,
        "Devices": _deviceDetails,
        "Path1": ispath1complete,
        "Path2": ispath2complete
      };
    },
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