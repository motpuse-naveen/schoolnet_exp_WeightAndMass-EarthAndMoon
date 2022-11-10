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
            pointer.animate({ top: pointer.position().top + shiftPixels }, 800, function () {
                //callback
            });
            springBase.animate({ top: springBase.position().top + shiftPixels }, 800, function () {
                //callback
            });
            $(".weight[machine='spring']").each(function () {
                $(this).animate({ top: $(this).position().top + shiftPixels }, 800, function () {
                    //callback
                    var draggHtToRemove = g_draggable.height();
                    var dragSeq = g_draggable.attr("dragseq");
                    if (Number($(this).attr("dragseq")) > Number(dragSeq)) {
                        $(this).css({ "top": $(this).position().top + draggHtToRemove });
                        $(this).attr("dragseq", Number($(this).attr("dragseq")) - 1);   
                    }
                });
            });
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
            pointer.animate({ top: pointer.position().top + shiftPixels }, 800, function () {
                //callback
            });
            console.log("springBase.position().top", springBase.position().top, shiftPixels)
            springBase.animate({ top: springBase.position().top + shiftPixels }, 800, function () {
                //callback
            });
            $(".weight[machine='spring']").each(function () {
                $(this).animate({ top: $(this).position().top + shiftPixels }, 800, function () {
                    //callback
                });
            });
        },
        ResetSpring: function () {
            var shifttop = $(".spring-pointer").position().top;
            $(".spring-pointer").css({ top: 0 })
            $(".spring-base-wrap").css({ top: $(".spring-base-wrap").position().top - shifttop })
        }
    };
})();

var PaneMachine = (function () {
    angle = 8;
    return {
        getAngle: function () {
            if(window.innerHeight<600){
                angle = 6;
            }
            return angle;
        },
        BalancePane: function (_weightObj, _draggable, _droppable) {
            var prevWeight = Number(_droppable.attr("dropkg"));
            _droppable.attr("dropkg", _weightObj.to);
            var pane1Weight = Number($(".pane-01-droppable").attr("dropkg"));
            var pane2Weight = Number($(".pane-02-droppable").attr("dropkg"));
            var l_angle = this.getAngle();
            if (pane1Weight > pane2Weight) {
                $(".pane-bar").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)"
                });
                $(".pane-bar .pane").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (l_angle) + "deg)"
                });

                $(".weight[machine='balancer1']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top + (l_angle + (l_angle / 2)) + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top + (angle + (angle / 2)) + shiftTop
                    });*/
                    $(this).attr("shift_top", -(l_angle + (l_angle / 2)))
                });
                $(".weight[machine='balancer2']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top - (l_angle + (l_angle / 2)) + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top - (angle + (angle / 2)) + shiftTop
                    });*/
                    $(this).attr("shift_top", (l_angle + (l_angle / 2)))
                });
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight < pane2Weight) {
                $(".pane-bar").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (l_angle) + "deg)"
                });
                $(".pane-bar .pane").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (-1 * l_angle) + "deg)"
                });

                $(".weight[machine='balancer1']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top - (l_angle + (l_angle / 2)) + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top - (angle + (angle / 2)) + shiftTop
                    });*/
                    $(this).attr("shift_top", (l_angle + (l_angle / 2)));
                });
                $(".weight[machine='balancer2']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top + (l_angle + (l_angle / 2)) + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top + (angle + (angle / 2)) + shiftTop 
                    });*/
                    $(this).attr("shift_top", -(l_angle + (l_angle / 2)));
                });
                $(".ui-state-hover").removeClass("ui-state-hover");
            }
            else if (pane1Weight == pane2Weight) {
                $(".pane-bar").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (0) + "deg)"
                });
                $(".pane-bar .pane").css({
                    transition: "transform 0.5s",
                    transform: "rotate(" + (-1 * 0) + "deg)"
                });
                $(".weight[machine='balancer1']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top + shiftTop 
                    });*/
                    $(this).attr("shift_top", 0);
                });
                $(".weight[machine='balancer2']").each(function () {
                    var shiftTop = $(this).attr("shift_top");
                    if (shiftTop == undefined || shiftTop == "") {
                        shiftTop = 0
                    }
                    else {
                        shiftTop = Number(shiftTop);
                    }
                    $(this).css({ "top": $(this).position().top + shiftTop })
                    /*$(this).css({
                        transition: "top 0.5s",
                        top: $(this).position().top + shiftTop 
                    });*/
                    $(this).attr("shift_top", 0);
                });
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


