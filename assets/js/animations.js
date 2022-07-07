
var _bulbBrokenInterval = 0;
var _bulbGlowSlides = 30;
var _bulbBrokenSlides = 60;
var _bulbBrokenSlidesNo = 0;
//var _bulbGlowInterval = 0;
var _bulbGlowSlidesNo = 0;

var _robotMovingInterval = 0;
var _robotMovingSlides = 90;
var _robotMovingSlidesNo = 0;
var _robotBrokenInterval = 0;
var _robotBrokenSlides = 80;
var _robotBrokenSlidesNo = 0;

var _boatMovingInterval = 0;
var _boatMovingSlides = 60;
var _boatMovingSlidesNo = 0;
var _boatBrokenInterval = 0;
var _boatBrokenSlides = 45;
var _boatBrokenSlidesNo = 0;

var _horseMovingInterval = 0;
var _horseMovingSlides = 130;
var _horseMovingSlidesNo = 0;
var _horseBrokenInterval = 0;
var _horseBrokenSlides = 30;
var _horseBrokenSlidesNo = 0;

var ActivityAnimation = (function () {
    return {
        UpdateBulbGlow: function () {
            if ($(".dropped-object[object='bulb'].complete:not(.broken)").length > 0) {
                var _data = ActivityMain.GetCircuitValues();
                var bulbNo = 0
                if (_data.Current > 0) {
                    var fraction = _bulbGlowSlides / _data.Devices.bulb.max_current;
                    var currentPerSlide = 1 / fraction;
                    bulbNo = _data.Current / currentPerSlide;
                    bulbNo = Number(bulbNo.toFixed(0))
                    if (bulbNo > 59) {
                        bulbNo = 60;
                    }
                }
                $(".dropped-object[object='bulb'].complete").find("img.objimg").attr("src", "assets/images/bulb/glow/" + bulbNo + ".png")
            }
        },
        StartBulbBrokenAnimation: function () {
            if ($(".dropped-object[object='bulb']").length > 0) {
                $("button.buttonPlus").attr("disabled", "disabled");
                $("button.buttonMinus").attr("disabled", "disabled");
                this.OnBrokeAnnimation("bulb");
                _bulbBrokenSlidesNo = 0;
                _bulbBrokenInterval = setInterval(function () {
                    if (_bulbBrokenSlidesNo < _bulbBrokenSlides) {
                        $(".dropped-object[object='bulb']").find("img.objimg").attr("src", "assets/images/bulb/broken/" + _bulbBrokenSlidesNo + ".png")
                        _bulbBrokenSlidesNo++
                    }
                    else {
                        //_bulbBrokenSlidesNo = 0;
                        clearInterval(_bulbBrokenInterval);
                        ActivityAnimation.AfterStopAnimation("bulb", _bulbBrokenSlides);
                    }
                }, 20);
            }
        },
        StopBulbBrokenAnimation: function () {
            //_bulbBrokenSlidesNo = 0;
            clearInterval(_bulbBrokenInterval);
            _bulbBrokenInterval = 0;
            this.AfterStopAnimation("bulb", _bulbBrokenSlides);
        },
        StartRobotMovingAnimation: function () {
            if (_robotMovingInterval == 0 || _robotMovingInterval == null || _robotMovingInterval == undefined) {
                if ($(".dropped-object[object='robot'].complete:not(.broken)").length > 0) {
                    _robotMovingSlidesNo = 0;
                    _robotMovingInterval = setInterval(function () {
                        if (_robotMovingSlidesNo < _robotMovingSlides) {
                            _robotMovingSlidesNo++
                        }
                        else {
                            _robotMovingSlidesNo = 0;
                        }
                        $(".dropped-object[object='robot']").find("img.objimg").attr("src", "assets/images/robot/moving/" + _robotMovingSlidesNo + ".png")
                    }, 50);
                }
            }
        },
        StopRobotMovingAnimation: function () {
            //_robotMovingSlidesNo = 0;
            clearInterval(_robotMovingInterval);
            _robotMovingInterval = 0;
        },
        StartRobotBrokenAnimation: function () {
            if ($(".dropped-object[object='horse']").length > 0) {
                this.StopRobotMovingAnimation()
                $("button.buttonPlus").removeAttr("disabled");
                $("button.buttonMinus").removeAttr("disabled");
                this.OnBrokeAnnimation("robot");
                _robotBrokenSlidesNo = 0;
                _robotBrokenInterval = setInterval(function () {
                    if (_robotBrokenSlidesNo < _robotBrokenSlides) {
                        $(".dropped-object[object='robot']").find("img.objimg").attr("src", "assets/images/robot/broken/" + _robotBrokenSlidesNo + ".png")
                        _robotBrokenSlidesNo++
                    }
                    else {
                        //_robotBrokenSlidesNo = 0;
                        clearInterval(_robotBrokenInterval);
                        ActivityAnimation.AfterStopAnimation("robot", _robotBrokenSlides);
                    }
                }, 20);
            }
        },
        StopRobotBrokenAnimation: function () {
            //_robotBrokenSlidesNo = 0;
            clearInterval(_robotBrokenInterval);
            _robotBrokenInterval = 0;
            this.AfterStopAnimation("robot", _robotBrokenSlides);
        },
        StartBoatMovingAnimation: function () {
            if (_boatMovingInterval == 0 || _boatMovingInterval == null || _boatMovingInterval == undefined) {
                if ($(".dropped-object[object='boat'].complete:not(.broken)").length > 0) {
                    _boatMovingSlidesNo = 0;
                    _boatMovingInterval = setInterval(function () {
                        if (_boatMovingSlidesNo < _boatMovingSlides) {
                            _boatMovingSlidesNo++
                        }
                        else {
                            _boatMovingSlidesNo = 0;
                        }
                        $(".dropped-object[object='boat']").find("img.objimg").attr("src", "assets/images/boat/moving/" + _boatMovingSlidesNo + ".png")
                    }, 50);
                }
            }
        },
        StopBoatMovingAnimation: function () {
            //_robotMovingSlidesNo = 0;
            clearInterval(_boatMovingInterval);
            _boatMovingInterval = 0;
        },
        StartBoatBrokenAnimation: function () {
            if ($(".dropped-object[object='boat']").length > 0) {
                this.StopBoatMovingAnimation();
                $("button.buttonPlus").attr("disabled", "disabled");
                $("button.buttonMinus").attr("disabled", "disabled");
                this.OnBrokeAnnimation("boat");
                _boatBrokenSlidesNo = 0;
                _boatBrokenInterval = setInterval(function () {
                    if (_boatBrokenSlidesNo < _boatBrokenSlides) {
                        $(".dropped-object[object='boat']").find("img.objimg").attr("src", "assets/images/boat/broken/" + _boatBrokenSlidesNo + ".png")
                        _boatBrokenSlidesNo++
                    }
                    else {
                        //_robotBrokenSlidesNo = 0;
                        clearInterval(_boatBrokenInterval);
                        ActivityAnimation.AfterStopAnimation("boat", _boatBrokenSlides);
                    }
                }, 20);
            }
        },
        StopBoatBrokenAnimation: function () {
            //_robotBrokenSlidesNo = 0;
            clearInterval(_boatBrokenInterval);
            _boatBrokenInterval = 0;
            this.AfterStopAnimation("boat", _boatBrokenSlides);
        },
        StartHorseMovingAnimation: function () {
            if (_horseMovingInterval == 0 || _horseMovingInterval == null || _horseMovingInterval == undefined) {
                if ($(".dropped-object[object='horse'].complete:not(.broken)").length > 0) {
                    _horseMovingSlidesNo = 0;
                    _horseMovingInterval = setInterval(function () {
                        if (_horseMovingSlidesNo < _horseMovingSlides) {
                            _horseMovingSlidesNo++
                        }
                        else {
                            _horseMovingSlidesNo = 0;
                        }
                        $(".dropped-object[object='horse']").find("img.objimg").attr("src", "assets/images/horse/moving/" + _horseMovingSlidesNo + ".png")
                    }, 50);
                }
            }
        },
        StopHorseMovingAnimation: function () {
            //_robotMovingSlidesNo = 0;
            clearInterval(_horseMovingInterval);
            _horseMovingInterval = 0;
        },
        StartHorseBrokenAnimation: function () {
            if ($(".dropped-object[object='horse']").length > 0) {
                this.StopHorseMovingAnimation();
                $("button.buttonPlus").attr("disabled", "disabled");
                $("button.buttonMinus").attr("disabled", "disabled");
                this.OnBrokeAnnimation("horse");
                _horseBrokenSlidesNo = 0;
                _horseBrokenInterval = setInterval(function () {
                    if (_horseBrokenSlidesNo < _horseBrokenSlides) {
                        $(".dropped-object[object='horse']").find("img.objimg").attr("src", "assets/images/horse/broken/" + _horseBrokenSlidesNo + ".png")
                        _horseBrokenSlidesNo++
                    }
                    else {
                        //_robotBrokenSlidesNo = 0;
                        clearInterval(_horseBrokenInterval);
                        ActivityAnimation.AfterStopAnimation("horse", _horseBrokenSlides);
                    }
                }, 30);
            }
        },
        StopHorseBrokenAnimation: function () {
            //_robotBrokenSlidesNo = 0;
            clearInterval(_horseBrokenInterval);
            _horseBrokenInterval = 0;
            this.AfterStopAnimation("horse", _horseBrokenSlides);
        },
        OnBrokeAnnimation: function (objType, lastSlideNo) {
            /*
            $("button.buttonPlus").removeAttr("disabled", "disabled");
            $("button.buttonMinus").removeAttr("disabled", "disabled");
            var deviceObj = $(".dropped-object[object='" + objType + "']");
            deviceObj.find("img.objimg").attr("src", "assets/images/" + objType + "/broken/" + lastSlideNo + ".png");
            */
        },
        AfterStopAnimation: function (objType, lastSlideNo) {
            $("button.buttonPlus").removeAttr("disabled");
            $("button.buttonMinus").removeAttr("disabled");
            var deviceObj = $(".dropped-object[object='" + objType + "']");
            if (deviceObj.length > 0) {
                var seq = Number(deviceObj.attr("seq"));
                ActivityMain.RemovePathElement(seq);
                deviceObj.removeAttr("seq");
                deviceObj.removeAttr("anim");
                deviceObj.addClass("broken");
                deviceObj.find("img.objimg").attr("src", "assets/images/" + objType + "/broken/" + lastSlideNo + ".png");
                if (ispath1complete && ispath2complete) {
                    if (ActivityMain.IsPathExist(_path1subset, seq)) {
                        if ($(".dropped-object[seq='5']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='5']"))
                        }
                        if ($(".dropped-object[seq='6']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='6']"))
                        }
                        if ($(".dropped-object[seq='7']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='7']"))
                        }
                    }
                    else if (ActivityMain.IsPathExist(_path2subset, seq)) {
                        if ($(".dropped-object[seq='8']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='8']"))
                        }
                        if ($(".dropped-object[seq='9']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='9']"))
                        }
                        if ($(".dropped-object[seq='10']:not(.broken)").length > 0) {
                            this.ResetObjAnimation($(".dropped-object[seq='10']"))
                        }
                    }
                    else {
                        $(".dropped-object:not(.broken)").each(function () {
                            ActivityAnimation.ResetObjAnimation($(this));
                        })
                    }
                }
                else {
                    $(".dropped-object:not(.broken)").each(function () {
                        ActivityAnimation.ResetObjAnimation($(this));
                    })
                }
                //Check and start other device 
                ActivityMain.OnCircuitComplete();
            }
        },
        ResetObjAnimation: function (subsetObj) {
            var objType = subsetObj.attr("object");
            if (objType == "bulb") {
                subsetObj.find("img.objimg").attr("src", "assets/images/bulb/glow/0.png");
            }
            else if (objType == "robot") {
                clearInterval(_robotMovingInterval);
                _robotMovingInterval = 0;
                subsetObj.find("img.objimg").attr("src", "assets/images/robot/moving/0.png");
            }
            else if (objType == "boat") {
                clearInterval(_boatMovingInterval);
                _boatMovingInterval = 0;
                subsetObj.find("img.objimg").attr("src", "assets/images/boat/moving/0.png");
            }
            else if (objType == "horse") {
                clearInterval(_horseMovingInterval);
                _horseMovingInterval = 0;
                subsetObj.find("img.objimg").attr("src", "assets/images/horse/moving/0.png");
            }
        },
        ResetIntervals: function () {
            clearInterval(_bulbBrokenInterval);
            _bulbBrokenInterval = 0;
            clearInterval(_robotMovingInterval);
            _robotMovingInterval = 0;
            clearInterval(_robotBrokenInterval);
            _robotBrokenInterval = 0;
            clearInterval(_boatMovingInterval);
            _boatMovingInterval = 0;
            clearInterval(_boatBrokenInterval);
            _boatBrokenInterval = 0;
            clearInterval(_horseMovingInterval);
            _horseMovingInterval = 0;
            clearInterval(_horseBrokenInterval);
            _horseBrokenInterval = 0;

            _bulbBrokenSlidesNo = 0;
            _bulbGlowSlidesNo = 0;
            _robotMovingSlidesNo = 0;
            _robotBrokenSlidesNo = 0;
            _boatMovingSlidesNo = 0;
            _boatBrokenSlidesNo = 0;
            _horseMovingSlidesNo = 0;
            _horseBrokenSlidesNo = 0;
        }
    }
})();