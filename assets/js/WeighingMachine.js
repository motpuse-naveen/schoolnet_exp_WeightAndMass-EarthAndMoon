var ElectricMachine = (function () {
    var _WeightInterval = null;
    var _NewtonWeight = {
        from: 0,
        to: 0,
        current: 0,
    }
    var _KgWeight = {
        from: 0,
        to: 0,
        current: 0,
    }
    return {
        DisplayWeight: function (_weightObj, _draggable, _droppable) {
            _KgWeight.from = _weightObj.from
            _KgWeight.to = _weightObj.to
            _KgWeight.current = _weightObj.current
            $(".electric-balance-droppable").attr("dropkg", _KgWeight.to)
            if (_droppable.closest(".wt-balancer").attr("planet") == "moon") {
                _KgWeight.from = Number((_weightObj.from * 1 / 6).toFixed(1));
                _KgWeight.to = Number((_weightObj.to * 1 / 6).toFixed(1));
                _KgWeight.current = Number((_weightObj.current * 1 / 6).toFixed(1));
            }
            _NewtonWeight.from = Number((_KgWeight.from * 9.8).toFixed(0))
            _NewtonWeight.to = Number((_KgWeight.to * 9.8).toFixed(0))
            _NewtonWeight.current = Number((_KgWeight.current * 9.8).toFixed(0))
            if (_KgWeight.from < _KgWeight.to) {
                this.IncreaseWeight();
            }
            else if (_KgWeight.from > _KgWeight.to) {
                this.DecreaseWeight();
            }
        },
        ChangeWeightOnPlanetDrop: function (_planet) {
            var dropKg = Number($(".electric-balance-droppable").attr("dropkg"));
            if (_planet == "moon") {
                _KgWeight.from = dropKg;
                _KgWeight.to = Number((dropKg * 1 / 6).toFixed(1));
                _KgWeight.current = dropKg;
            }
            else if (_planet == "earth") {
                _KgWeight.from = Number((dropKg * 1 / 6).toFixed(1));
                _KgWeight.to = dropKg;
                _KgWeight.current = Number((dropKg * 1 / 6).toFixed(1));
            }
            _NewtonWeight.from = Number((_KgWeight.from * 9.8).toFixed(0))
            _NewtonWeight.to = Number((_KgWeight.to * 9.8).toFixed(0))
            _NewtonWeight.current = Number((_KgWeight.current * 9.8).toFixed(0))
            if (_KgWeight.from < _KgWeight.to) {
                this.IncreaseWeight();
            }
            else if (_KgWeight.from > _KgWeight.to) {
                this.DecreaseWeight();
            }
        },
        IncreaseWeight: function () {
            _WeightInterval = setInterval(function () {
                _KgWeight.current = _KgWeight.current + 1;
                if (_KgWeight.current >= _KgWeight.to) {
                    clearInterval(_WeightInterval);
                    $(".electric-balance .kilogram .value").text(_KgWeight.to + " Kg");
                    $(".electric-balance .newton .value").text(_NewtonWeight.to + " N");
                }
                else {
                    $(".electric-balance .kilogram .value").text(_KgWeight.current + " Kg");
                    $(".electric-balance .newton .value").text(Number((_KgWeight.current * 9.8).toFixed(1)) + " N");
                }
            }, 2);
        },
        DecreaseWeight: function () {
            _WeightInterval = setInterval(function () {
                _KgWeight.current = _KgWeight.current - 1;
                if (_KgWeight.current <= _KgWeight.to) {
                    clearInterval(_WeightInterval);
                    $(".electric-balance .kilogram .value").text(_KgWeight.to + " Kg");
                    $(".electric-balance .newton .value").text(_NewtonWeight.to + " N");
                }
                else {
                    $(".electric-balance .kilogram .value").text(_KgWeight.current + " Kg");
                    $(".electric-balance .newton .value").text(Number((_KgWeight.current * 9.8).toFixed(1)) + " N");
                }
            }, 2);
        },
        ResetBalancer: function () {
            $(".electric-balance .kilogram .value").text("0 Kg");
            $(".electric-balance .newton .value").text("0 N");
        }
    };
})();

var SpringMachine = (function () {
    var g_draggable = null;
    return {
        ShiftPointer: function (_weightObj, _draggable, _droppable) {
            //debugger
            g_draggable = _draggable;
            var springHt = $(".spring-pointer-bar").height();
            var pointer = $(".spring-pointer-bar .spring-pointer");
            var springBase = $(".spring-base-wrap")
            var htPerKg = springHt / 160;
            $(".spring-balance-droppable").attr("dropkg", _weightObj.to)
            if (_droppable.closest(".wt-balancer").attr("planet") == "moon") {
                _weightObj.from = Number((_weightObj.from * 1 / 6).toFixed(1));
                _weightObj.to = Number((_weightObj.to * 1 / 6).toFixed(1));
            }
            var shiftDifference = _weightObj.to - _weightObj.from;
            if (_weightObj.to > 160 && _weightObj.from > 160) {
                shiftDifference = 0;
                $(".spring-balance .overload-weight").show();
            }
            else if (_weightObj.to > 160) {
                shiftDifference = 160 - _weightObj.from
                $(".spring-balance .overload-weight").show();
            }
            else if (_weightObj.from > 160) {
                shiftDifference = _weightObj.to - 160;
                $(".spring-balance .overload-weight").hide();
            }
            else {
                $(".spring-balance .overload-weight").hide();
            }
            var shiftPixels = shiftDifference * htPerKg;
            pointer.css({ top: pointer.position().top + shiftPixels });
            /*pointer.animate({ top: pointer.position().top + shiftPixels }, 0, function () {
                //callback
            });*/
            springBase.css({ top: springBase.position().top + shiftPixels });
            /*springBase.animate({ top: springBase.position().top + shiftPixels }, 0, function () {
                //callback
            });*/
            $(".weight[machine='spring']").each(function () {
                $(this).css({ top: $(this).position().top + shiftPixels });
                /*$(this).animate({ top: $(this).position().top + shiftPixels }, 0, function () {
                    //callback - below code is shifted to dragstart event.
                    var draggHtToRemove = g_draggable.height();
                    var dragSeq = g_draggable.attr("dragseq");
                    if (Number($(this).attr("dragseq")) > Number(dragSeq)) {
                        $(this).css({ "top": $(this).position().top + draggHtToRemove });
                        $(this).attr("dragseq", Number($(this).attr("dragseq")) - 1);   
                    }
                });
                */
            });

            setTimeout(function () {
                SpringMachine.ShiftIfOutOfContainer();
            }, 100);
        },
        ShiftPointerOnPlanetDrop: function (_planet) {
            var dropKg = Number($(".spring-balance-droppable").attr("dropkg"));
            var springHt = $(".spring-pointer-bar").height();
            var pointer = $(".spring-pointer-bar .spring-pointer");
            var springBase = $(".spring-base-wrap")
            var htPerKg = springHt / 160;
            var _weightObj = {
                from: 0,
                to: 0,
                current: 0
            }
            if (_planet == "moon") {
                _weightObj.from = dropKg;
                _weightObj.to = Number((dropKg * 1 / 6).toFixed(1));
                _weightObj.current = dropKg;
            }
            else if (_planet == "earth") {
                _weightObj.from = Number((dropKg * 1 / 6).toFixed(1));
                _weightObj.to = dropKg;
                _weightObj.current = Number((dropKg * 1 / 6).toFixed(1));
            }
            var shiftDifference = _weightObj.to - _weightObj.from;
            if (_weightObj.to > 160 && _weightObj.from > 160) {
                shiftDifference = 0;
                $(".spring-balance .overload-weight").show();
            }
            else if (_weightObj.to > 160) {
                shiftDifference = 160 - _weightObj.from
                $(".spring-balance .overload-weight").show();
            }
            else if (_weightObj.from > 160) {
                shiftDifference = _weightObj.to - 160;
                $(".spring-balance .overload-weight").hide();
            }
            else {
                $(".spring-balance .overload-weight").hide();
            }
            var shiftPixels = shiftDifference * htPerKg;
            pointer.css({ top: pointer.position().top + shiftPixels });
            /*pointer.animate({ top: pointer.position().top + shiftPixels }, 0, function () {
                //callback
            });*/
            //console.log("springBase.position().top", springBase.position().top, shiftPixels)
            springBase.css({ top: springBase.position().top + shiftPixels });
            /*springBase.animate({ top: springBase.position().top + shiftPixels }, 0, function () {
                //callback
            });*/
            $(".weight[machine='spring']").each(function () {
                $(this).css({ top: $(this).position().top + shiftPixels });
                /*$(this).animate({ top: $(this).position().top + shiftPixels }, 0, function () {
                    //callback
                });*/
            });
            setTimeout(function () {
                SpringMachine.ShiftIfOutOfContainer();
            }, 300);
        },
        ShiftIfOutOfContainer: function () {
            var springPos = $(".spring-balance").position();
            var basePos = $(".spring-base-wrap").position();
            var baseHt = $(".spring-base-wrap").height();
            var contHt = $(".exp-container.zoom1").height();
            var margin_element = $(".activity-panel").get(0);
            var style = margin_element.currentStyle || window.getComputedStyle(margin_element);
            var margintop = Number((style.marginTop.replace("px", "")))
            if ((margintop + springPos.top + basePos.top + baseHt) > contHt) {
                //debugger;
                var diff = (margintop + springPos.top + basePos.top + baseHt) - contHt;
                $(".spring-balance").css({ "top": springPos.top - diff });
                $(".weight[machine='spring']").each(function () {
                    $(this).css({
                        "top": $(this).position().top - diff
                    });
                });
            }
        },
        ResetSpring: function () {
            var shifttop = $(".spring-pointer").position().top;
            $(".spring-pointer").css({ top: 0 })
            $(".spring-base-wrap").css({ top: $(".spring-base-wrap").position().top - shifttop })
        }
    };
})();

var PaneMachine = (function () {
    return {
        getAngle: function () {
            return 8;
        },
        getShiftValue: function () {
            if (ActivityShell.DeviceType() == "mobile") {
                return 8;
            }
            else {
                if(ActivityShell.IsSmallTablet()){
                    return 8;
                }
                else{
                    return 11;
                }
            }
        },
        getLeftShift: function(){
            if (ActivityShell.DeviceType() == "mobile") {
                return 4;
            }
            else {
                if(ActivityShell.IsSmallTablet()){
                    return 4;
                }
                else{
                    return 4;
                }
            }
        },
        getFixShift: function(){
            if (ActivityShell.DeviceType() == "mobile") {
                return 1;
            }
            else {
                if(ActivityShell.IsSmallTablet()){
                    return 1;
                }
                else{
                    return 6;
                }
            }
        },
        BalancePane: function (prevpane1Weight, prevpane2Weight, pane1Weight, pane2Weight) {
            var ret_deviation = 0;
            var l_angle = this.getAngle();
            var leftDeviation = 0;
            var deviation = 0;
            var wts_bal1 = $(".weight[machine='balancer1'][dragseq]");
            var wts_bal2 = $(".weight[machine='balancer2'][dragseq]");
            var applyChanges = false;
            var paneBalance = $(".pane-balance");
            if (pane1Weight > pane2Weight) {
                $(".pane-bar").css({ "transform": "rotate(" + (-1 * l_angle) + "deg)", "transform-origin": "bottom" });
                $(".pane-bar .pane").css({ "transform": "rotate(" + (l_angle) + "deg)", "transform-origin": "bottom" });
                
                if (prevpane1Weight == prevpane2Weight) {
                    deviation = this.getShiftValue();
                    ret_deviation = this.getShiftValue();
                    applyChanges = true;
                }
                else if (prevpane2Weight > prevpane1Weight) {
                    deviation = this.getShiftValue() * 2;
                    ret_deviation = this.getShiftValue();
                    applyChanges = true;
                }
                else if (prevpane2Weight < prevpane1Weight) {
                    applyChanges = false;
                    ret_deviation = -this.getShiftValue();
                }
                if( applyChanges){
                    for (var i = 0; i < wts_bal1.length; i++) {
                        var $wt = $(wts_bal1[i])
                        var wt_top = $wt.position().top + deviation;
                        var wtleft = paneBalance.position().left - $wt.width()/2 - this.getLeftShift();
                        //$wt1.css({ "top": wttop, "left": wtleft })
                        $wt.css({ "top": wt_top , "left": wtleft})
                    }
                    for (var i = 0; i < wts_bal2.length; i++) {
                        var $wt = $(wts_bal2[i]);
                        var wt_top = $wt.position().top - deviation;
                        var wtleft = paneBalance.position().left + paneBalance.width() - $wt.width()/2 - (this.getLeftShift() + this.getFixShift());
                        $wt.css({ "top": wt_top , "left": wtleft});
                    }
                }
            }
            else if (pane1Weight < pane2Weight) {
                $(".pane-bar").css({ "transform": "rotate(" + (l_angle) + "deg)", "transform-origin": "bottom" });
                $(".pane-bar .pane").css({ "transform": "rotate(" + (-1 * l_angle) + "deg)", "transform-origin": "bottom" });
                if (prevpane1Weight == prevpane2Weight) {
                    deviation = this.getShiftValue();
                    ret_deviation = this.getShiftValue();
                    applyChanges = true;
                }
                else if (prevpane1Weight > prevpane2Weight) {
                    deviation = this.getShiftValue() * 2;
                    ret_deviation = this.getShiftValue();
                    applyChanges = true;
                }
                else if (prevpane1Weight < prevpane2Weight) {
                    applyChanges = false;
                    ret_deviation = -this.getShiftValue();
                }
                if(applyChanges){
                    for (var i = 0; i < wts_bal1.length; i++) {
                        var $wt = $(wts_bal1[i])
                        var wt_top = $wt.position().top - deviation;
                        var wtleft = paneBalance.position().left - $wt.width()/2 + this.getLeftShift() + 4;
                        $wt.css({ "top": wt_top, "left": wtleft })
                    }
                    for (var i = 0; i < wts_bal2.length; i++) {
                        var $wt = $(wts_bal2[i]);
                        var wt_top = $wt.position().top + deviation;
                        var wtleft = paneBalance.position().left + paneBalance.width() - $wt.width()/2 + this.getLeftShift() - this.getFixShift();
                        $wt.css({ "top": wt_top, "left": wtleft });
                    }
                }
            }
            else if (pane1Weight == pane2Weight) {
                $(".pane-bar").css({ "transform": "rotate(0deg)", "transform-origin": "bottom" });
                $(".pane-bar .pane").css({ "transform": "rotate(0deg)", "transform-origin": "bottom" });
                if (prevpane1Weight > prevpane2Weight) {
                    deviation = this.getShiftValue();
                    ret_deviation = 0
                    for (var i = 0; i < wts_bal1.length; i++) {
                        var $wt = $(wts_bal1[i])
                        var wt_top = $wt.position().top - deviation;
                        var wtleft = paneBalance.position().left - $wt.width()/2 - this.getLeftShift() + 4;
                        $wt.css({ "top": wt_top , "left": wtleft })
                    }
                    for (var i = 0; i < wts_bal2.length; i++) {
                        var $wt = $(wts_bal2[i]);
                        var wt_top = $wt.position().top + deviation;
                        var wtleft = paneBalance.position().left + paneBalance.width() - $wt.width()/2 - this.getLeftShift();
                        $wt.css({ "top": wt_top , "left": wtleft });
                    }
                }
                else if (prevpane1Weight < prevpane2Weight) {
                    deviation = this.getShiftValue();
                    ret_deviation = 0
                    for (var i = 0; i < wts_bal1.length; i++) {
                        var $wt = $(wts_bal1[i])
                        var wt_top = $wt.position().top + deviation;
                        var wtleft = paneBalance.position().left - $wt.width()/2 - this.getLeftShift() + 4;
                        $wt.css({ "top": wt_top , "left": wtleft })
                    }
                    for (var i = 0; i < wts_bal2.length; i++) {
                        var $wt = $(wts_bal2[i]);
                        var wt_top = $wt.position().top - deviation;
                        var wtleft = paneBalance.position().left + paneBalance.width() - $wt.width()/2 - this.getLeftShift();
                        $wt.css({ "top": wt_top , "left": wtleft });
                    }
                }
            }
            //return {deviation: deviation};
            return {TopShift: ret_deviation, LeftShift: leftDeviation}
        },
        BalancePane_New2: function (_weightObj, _draggable, _droppable) {
            //console.log("funct BalancePane")
            var prevWeight = Number(_droppable.attr("dropkg"));
            var prevpane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
            var prevpane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
            _droppable.attr("dropkg", _weightObj.to);
            var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
            var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
            var l_angle = this.getAngle();
            var deviceType = ActivityShell.DeviceType();
            var panPos = $(".pane-balance").position();
            var panwdt = $(".pane-balance").width();

            var pan1wdt = $(".pane.p01").width();
            var pan2wdt = $(".pane.p02").width();
            var wts_bal1 = $(".weight[machine='balancer1']");
            var wts_bal2 = $(".weight[machine='balancer2']");
            if (pane1Weight > pane2Weight) {
                //var shiftTop = 
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (l_angle) + "deg)",
                    "transform-origin": "bottom"
                });

                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt = $(wts_bal1[i])
                    var shiftTop = $wt.attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top + (l_angle + (l_angle / 2)) + shiftTop;
                    $wt.attr("shift_top", -(l_angle + (l_angle / 2)))
                    //var wt_top = $wt.position().top + (l_angle * 2) + shiftTop;
                    var wt_x = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt.width()) / 2) - ((l_angle / 2))
                    $wt.css({ "top": wt_top, "left": wt_x })
                }
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt = $(wts_bal2[i]);
                    var shiftTop = $wt.attr("shift_top");
                    //var shiftTop = (l_angle + (l_angle / 2));
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                        shiftTop = (l_angle + (l_angle / 2))
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top - (l_angle + (l_angle / 2)) + shiftTop;
                    $wt.attr("shift_top", (l_angle + (l_angle / 2)));
                    //var wt_top = $wt.position().top - ((l_angle / 2)) + shiftTop;
                    var wt_x = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt.width()) / 2) - ((l_angle));
                    $wt.css({ "top": wt_top, "left": wt_x });
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight < pane2Weight) {
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt = $(wts_bal1[i])
                    var shiftTop = $wt.attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top - (l_angle + (l_angle / 2)) + shiftTop;
                    var wt_x = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt.width()) / 2) + ((l_angle / 2))
                    $wt.css({ "top": wt_top, "left": wt_x })
                    $wt.attr("shift_top", (l_angle + (l_angle / 2)));
                }
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt = $(wts_bal2[i]);
                    var shiftTop = $wt.attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top + (l_angle + (l_angle / 2)) + shiftTop;
                    var wt_x = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt.width()) / 2) + ((l_angle / 2) / 2)
                    $wt.css({ "top": wt_top, "left": wt_x })
                    $wt.attr("shift_top", -(l_angle + (l_angle / 2)));
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight == pane2Weight) {
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (0) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * 0) + "deg)",
                    "transform-origin": "bottom"
                });
                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt = $(wts_bal1[i])
                    var shiftTop = $wt.attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top + shiftTop;
                    var wt_x = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt.width()) / 2)
                    $wt.css({ "top": wt_top, "left": wt_x })
                    $wt.attr("shift_top", 0);
                }
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt = $(wts_bal2[i]);
                    var shiftTop = $wt.attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    var wt_top = $wt.position().top + shiftTop;
                    var wt_x = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt.width()) / 2) - ((l_angle / 2))
                    $wt.css({ "top": wt_top, "left": wt_x })
                    $wt.attr("shift_top", 0);
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
        },
        BalancePane_New: function (_weightObj, _draggable, _droppable) {
            _droppable.attr("dropkg", _weightObj.to);
            var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
            var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
            var l_angle = this.getAngle();
            var deviceType = ActivityShell.DeviceType();
            var wts_bal1 = $(".weight[machine='balancer1']");
            var wts_bal2 = $(".weight[machine='balancer2']");
            var panPos = $(".pane-balance").position();
            var panwdt = $(".pane-balance").width();

            var pan1wdt = $(".pane.p01").width();
            var pan2wdt = $(".pane.p02").width();
            var wt1Ht = 0;
            var wt2Ht = 0;
            if (pane1Weight > pane2Weight) {
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                wt1Ht = 0;
                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt1 = $(wts_bal1[i]);
                    wt1Ht = wt1Ht + $wt1.height();
                    var wttop = (panPos.top - wt1Ht) + (l_angle * 2);
                    var lfactor = ($(".pane-01-droppable").width() - $wt1.width()) / 2;
                    var wtleft = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt1.width()) / 2) - lfactor;
                    $wt1.css({ "top": wttop, "left": wtleft })
                }
                wt2Ht = 0
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt2 = $(wts_bal2[i]);
                    wt2Ht = wt2Ht + $wt2.height();
                    var wttop = (panPos.top - wt2Ht) - (l_angle);
                    var lfactor = ($(".pane-02-droppable").width() - $wt2.width()) / 2;
                    var wtleft = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt2.width()) / 2) - (lfactor * 2);
                    $wt2.css({ "top": wttop, "left": wtleft })
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight < pane2Weight) {
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)",
                    "transform-origin": "bottom"
                });
                wt1Ht = 0;
                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt1 = $(wts_bal1[i]);
                    wt1Ht = wt1Ht + $wt1.height();
                    var wttop = (panPos.top - wt1Ht) - (l_angle);
                    var lfactor = ($(".pane-01-droppable").width() - $wt1.width()) / 2;
                    var wtleft = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt1.width()) / 2) + lfactor;
                    $wt1.css({ "top": wttop, "left": wtleft })
                }
                wt2Ht = 0;
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt2 = $(wts_bal2[i]);
                    wt2Ht = wt2Ht + $wt2.height();
                    var wttop = (panPos.top - wt2Ht) + (l_angle * 2);
                    var lfactor = ($(".pane-02-droppable").width() - $wt2.width()) / 2;
                    var wtleft = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt2.width()) / 2);
                    $wt2.css({ "top": wttop, "left": wtleft })
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight == pane2Weight) {
                $(".pane-bar").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (0) + "deg)",
                    "transform-origin": "bottom"
                });
                $(".pane-bar .pane").css({
                    //transition: "transform 0.1s",
                    transform: "rotate(" + (-1 * 0) + "deg)",
                    "transform-origin": "bottom"
                });
                wt1Ht = 0;
                for (var i = 0; i < wts_bal1.length; i++) {
                    var $wt1 = $(wts_bal1[i]);
                    wt1Ht = wt1Ht + $wt1.height();
                    var wttop = (panPos.top - wt1Ht) + (l_angle / 2);
                    var lfactor = ($(".pane-01-droppable").width() - $wt1.width()) / 2;
                    var wtleft = (panPos.left - (pan1wdt / 2)) + ((pan1wdt - $wt1.width()) / 2);
                    $wt1.css({ "top": wttop, "left": wtleft })
                }
                wt2Ht = 0;
                for (var i = 0; i < wts_bal2.length; i++) {
                    var $wt2 = $(wts_bal2[i]);
                    wt2Ht = wt2Ht + $wt2.height();
                    var wttop = (panPos.top - wt2Ht) + (l_angle / 2);
                    var lfactor = ($(".pane-02-droppable").width() - $wt2.width()) / 2;
                    var wtleft = ((panPos.left + panwdt) - (pan2wdt / 2)) + ((pan2wdt - $wt2.width()) / 2) - lfactor;
                    $wt2.css({ "top": wttop, "left": wtleft })
                }
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
        },
        ResetPan: function () {
            $(".pane-bar").css({
                transform: "rotate(" + (0) + "deg)"
            });
            $(".pane-bar .pane").css({
                transform: "rotate(0deg)"
            });
            $(".weight[machine='balancer1']").each(function () {
                $(this).attr("shift_top", 0);
            });
            $(".weight[machine='balancer2']").each(function () {
                $(this).attr("shift_top", 0);
            });
        }
    };
})();


var g_PaneRotationInterval = null;

function StartPaneRotation() {

}


