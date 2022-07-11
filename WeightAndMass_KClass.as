import flash.display.BitmapData;

stop();
var myCur_mc:MovieClip = this;

var myVoyager_mc:clsVoyager3 = this._parent._parent
boundary_mc._visible = false


myVoyager_mc.activeButtonsString = "OQ"
loadQuiz() 
instructionPpt_mc.execInstructionPpt("weightMass_EarthMoon_InstrBook", boundary_mc)
//myVoyager_mc.demoLibSymbol = "vernierAttachBody_demo"
myVoyager_mc.objectivesLibSymbol =  "weightMass_EarthMoon_objectives"
myVoyager_mc.initVoyager()






this.initExperiment()
var myCur_mc:MovieClip = this;

var leftgValue:Number = 1
var rightgValue:Number = 1/6

var rightBitmap:BitmapData
var leftBitmap:BitmapData 

var leftPlanet:clsPlanet = new clsPlanet("Earth")
var rightPlanet:clsPlanet = new clsPlanet("Moon")
var mPlanet:clsPlanet=null

attachLeftPlanet(leftPlanet)
attachRightPlanet(rightPlanet)
leftPane_mc._visible = false
rightPane_mc._visible = false

//>>>>>>>>> NIKHIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



eWeigh_mc.eWeighUnits_mc.eWeighUnits_txt.text = "kg";
eWeigh_mc.eWeigh2Units_mc.eWeighUnits_txt.text = "N";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

shopBalance_mc.initShopBalance()
//shopBalance_mc.colorArray = [50,0,0,0,0,0,100,0]
shopBalance_mc.rotatingPartColorArray = [55,0,50,-60,50,-60,100,0]
shopBalance_mc.fixedPartColorArray = [70,0,80,0,100,0,100,0]
shopBalance_mc.addDragDropFunctionality(boundary_mc)

springBalance_mc.unitsInEnglish= "kg"
springBalance_mc.numberDelta= 10;
springBalance_mc.weightPerPixel = 1;
springBalance_mc.addDragDropFunctionality(boundary_mc)
springBalance_mc.relativegValue = rightgValue
springBalance_mc.colorArray = [40,0,50,0,70,30,100,0]

//eWeigh_mc.unitsInEnglish= "kg" //commented by NIKHIL
eWeigh_mc.addDragDropFunctionality(boundary_mc)
eWeigh_mc.relativegValue = leftgValue
//eWeigh_mc.colorArray = [100, 0, 50, 0, 50, 0, 100, 0];
eWeigh_mc.basePartColorArray = [84,-51,84,-51,84,5,100,0]
eWeigh_mc.movingPartColorArray = [74,20,40,-68,76,-68,100,0]


redWeight_mc.colorArray = [100,0,0,0,0,0,100,0]
redWeight_mc.legend = "90 kg"
redWeight_mc.legendColor =0xFFFFFF
redWeight_mc.boundary = boundary_mc
redWeight_mc.takeInitSnapShot()
redWeight_mc.tag = "X"
redWeight_mc.locationString = "X"
redWeight_mc.mass = 90
redWeight_mc.librarySymbol = "beadBodyX_bd"
setDragDropBehaviour(redWeight_mc)


greenWeight_mc.colorArray = [0,0,100,0,0,0,100,0]
greenWeight_mc.legend = "60 kg"
greenWeight_mc.legendColor =0xFFFFFF
greenWeight_mc.boundary = boundary_mc
greenWeight_mc.takeInitSnapShot()
greenWeight_mc.tag = "X"
greenWeight_mc.locationString = "X"
greenWeight_mc.mass = 60
greenWeight_mc.librarySymbol = "beadBodyX_bd"
setDragDropBehaviour(greenWeight_mc)



blueWeight_mc.colorArray = [50,0,75,0,100,0,100,0]
blueWeight_mc.legend = "75 kg"
blueWeight_mc.legendColor =0xFFFFFF
blueWeight_mc.boundary = boundary_mc
blueWeight_mc.takeInitSnapShot()
blueWeight_mc.tag = "X"
blueWeight_mc.locationString = "X"
blueWeight_mc.mass = 75
blueWeight_mc.librarySymbol = "beadBodyX_bd"
setDragDropBehaviour(blueWeight_mc)



//   *******************  WEIGHT STACKS  ******************************************

var weightStackArray:Array = new Array(7)
var weightValueArray:Array = new Array(7)
var weightPileArray:Array = new Array(7)


weightStackArray[1] = new clsBodyStack("1",320,590,100)
weightValueArray[1] = 1
weightPileArray[1] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[1][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std1kg" + i, 52, [100,0,0,0,0,0,100,0], "1 kg", 0xFFFFFF)
	weightPileArray[1][i].depth = 1;
	initializeWeight(weightPileArray[1][i], 1)
}


weightStackArray[2] = new clsBodyStack("2",385,590,100)
weightValueArray[2] = 2
weightPileArray[2] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[2][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std2kg" + i, 52, [0,0,100,0,0,0,100,0], "2 kg", 0xFFFFFF)
	weightPileArray[2][i].depth = 1;
	initializeWeight(weightPileArray[2][i], 2)
}



weightStackArray[3] = new clsBodyStack("3",450,590,100)
weightValueArray[3] = 5
weightPileArray[3] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[3][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std5kg" + i, 52, [0,0,0,0,100,0,100,0], "5 kg", 0xFFFFFF)
	weightPileArray[3][i].depth = 1;
	initializeWeight(weightPileArray[3][i], 3)
}


weightStackArray[4] = new clsBodyStack("4",520,590,100)
weightValueArray[4] = 10
weightPileArray[4] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[4][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std10kg" + i, 60, [100,0,100,0,0,0,100,0], "10 kg", 0xFFFFFF)
	weightPileArray[4][i].depth = 2;
	initializeWeight(weightPileArray[4][i], 4)
}


weightStackArray[5] = new clsBodyStack("5",595,590,100)
weightValueArray[5] = 20
weightPileArray[5] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[5][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std20kg" + i, 60, [100,0,0,0,100,0,100,0], "20 kg", 0xFFFFFF)
	weightPileArray[5][i].depth = 2;
	initializeWeight(weightPileArray[5][i], 5)
}


weightStackArray[6] = new clsBodyStack("6",675,590,100)
weightValueArray[6] = 50
weightPileArray[6] = new Array(6)
for (var i:Number = 1; i<=5; i++) {
	weightPileArray[6][i] = clsSimpleBodyX.createSimpleBody("wtCylinderX_bd", myCur_mc, "std50kg" + i, 60, [0,0,100,0,100,0,100,0], "50 kg", 0xFFFFFF)
	weightPileArray[6][i].depth = 2;
	initializeWeight(weightPileArray[6][i], 6)
}




function initializeWeight(myBody:clsSimpleBodyX, stackNo:Number) {
	myBody.boundary = boundary_mc
	myBody.mass = weightValueArray[stackNo]
	myBody.librarySymbol = "wtCylinderX_bd"
	myBody.tag = "" + stackNo
	myBody.locationString = "" + stackNo
	weightStackArray[stackNo].pushBodyOnStack(myBody)	
	setDragDropBehaviour(myBody)
}

//**************************************************************
function setDragDropBehaviour(myBody:clsBodyX) {
	
	myBody.afterDragDropEnds = function() {
		var thisBody:clsBodyX = this
		if (!springBalance_mc.interactWithBodyAfterDragDrop(thisBody)) {
			if (!shopBalance_mc.interactWithBodyAfterDragDrop(thisBody)) {
				if (!eWeigh_mc.interactWithBodyAfterDragDrop(thisBody)) {
					if ( (thisBody.hitTest(leftPane_mc)==true) && (thisBody.hitTest(rightPane_mc)==false) ) {
						thisBody.fallUnderGravity(leftgValue, boundary_mc._y + 575)
					}
																											   
					else if ( (thisBody.hitTest(leftPane_mc)==false) && (thisBody.hitTest(rightPane_mc)==true) ) {
						thisBody.fallUnderGravity(rightgValue, boundary_mc._y + 575)
					}					
					else {
						if (thisBody.tag == "X") {
							thisBody.snapToInitPosition()
						}
						else {
							weightStackArray[Number(thisBody.tag)].pushBodyOnStack(thisBody)
						}
					}
				}


			}
		}
	}

	
	
	myBody.beforeDragDropStarts = function() {
		var thisBody:clsBodyX = this

		
		springBalance_mc.interactWithBodyBeforeDragDrop(thisBody)
		shopBalance_mc.interactWithBodyBeforeDragDrop(thisBody)
		eWeigh_mc.interactWithBodyBeforeDragDrop(thisBody)
		if (thisBody.locationString == thisBody.tag) {
			weightStackArray[Number(thisBody.tag)].popBodyFromStack()
		}
	
	}

	myBody.afterFallHasEnded = function() {
		if (this.tag == "X") {
			this.snapToInitPosition()	
		}
		else {
			weightStackArray[Number(this.tag)].pushBodyOnStack(this)
		}
	}
}

//**************************************************************
/* // DISABLED by NIKHIL
instrBook_mc = this.attachMovie("instructionBookX_instr", "instrBook_mc", this.getNextHighestDepth())
instrBook_mc._x = 600
instrBook_mc._y = 0
instrBook_mc.colorArray = [75,0,75,0,100,0,100,0]
instrBook_mc.isMinimizable = true
instrBook_mc.isMinimized = true
instrBook_mc.execInstructionBook("weightMass_EarthMoon_InstrBook")
*/
//**************************************************************
eWeigh_mc.afterDragDropEnds = function() {
	if ( this.hitTest(leftPane_mc) && this.hitTest(rightPane_mc) ) {
		if (leftPane_mc._x + leftPane_mc._width  > this._x + this._width/2) {
			this._x = leftPane_mc._x + leftPane_mc._width  - this._width - 2
		}
		else {
			this._x = rightPane_mc._x + 2
		}
		this.displayWeightStack()
	}
	if (this._x > rightPane_mc._x) {
		this.relativegValue = rightgValue
	}
	else {
		this.relativegValue = leftgValue
	}

	this.recalculateWeights()
	this.startSeekingEquilibrium();
}


springBalance_mc.afterDragDropEnds = function() {
	if ( this.hitTest(leftPane_mc) && this.hitTest(rightPane_mc) ) {
		if (leftPane_mc._x + leftPane_mc._width  > this._x + this._width/2) {
			this._x = leftPane_mc._x + leftPane_mc._width  - this._width - 2
		}
		else {
			this._x = rightPane_mc._x + 2
		}
		this.displayWeightStack()

	}

	if (this._x > rightPane_mc._x) {
		this.relativegValue = rightgValue
	}
	else {
		this.relativegValue = leftgValue
	}
	
	this.recalculateWeights()
	this.startSeekingEquilibrium();
	
}


shopBalance_mc.afterDragDropEnds = function() {
	if ( this.hitTest(leftPane_mc) && this.hitTest(rightPane_mc) ) {
		if (leftPane_mc._x + leftPane_mc._width  > this._x + this._width/2) {
			this._x = leftPane_mc._x + leftPane_mc._width  - this._width - 2
		}
		else {
			this._x = rightPane_mc._x + 2
		}
		this.displayWeightStacks()

	}
}


rightPaneSolarIcon_mc.onPress = function() {
	var sol_mc:MovieClip;
	mName = "sol" + int(Math.random() * 1000) + int(Math.random() * 1000) + int(Math.random() * 1000) 
	sol_mc = myCur_mc.attachMovie("solarSystemX_sym", mName, myCur_mc.getNextHighestDepth())
	sol_mc.legend = "Select a heavenly body"
	
	sol_mc.onAstrobodySelectedDo = function() {
		mPlanet = null
		mPlanet = new clsPlanet(this.selectedAstrobody)
		this.removeMovieClip()
		attachRightPlanet(mPlanet)		
		if (eWeigh_mc.hitTest(rightPane_mc) ) {
			eWeigh_mc.relativegValue = rightgValue
			eWeigh_mc.recalculateWeights()
			eWeigh_mc.startSeekingEquilibrium()
		}
		if (springBalance_mc.hitTest(rightPane_mc) ) {
			springBalance_mc.relativegValue = rightgValue
			springBalance_mc.recalculateWeights()
			springBalance_mc.startSeekingEquilibrium()
			
		}


	}



	sol_mc.onCloseSelectedDo = function() {
		mPlanet=null
		mPlanet = new clsPlanet(this.selectedAstrobody)
		this.removeMovieClip()
		attachRightPlanet(mPlanet)		

		if (eWeigh_mc.hitTest(rightPane_mc) ) {
			eWeigh_mc.relativegValue = rightgValue
			eWeigh_mc.recalculateWeights()
			eWeigh_mc.startSeekingEquilibrium()
		}
		if (springBalance_mc.hitTest(rightPane_mc) ) {
			springBalance_mc.relativegValue = rightgValue
			springBalance_mc.recalculateWeights()

			springBalance_mc.startSeekingEquilibrium()
			
		}
		
	}
	
	
}


function attachLeftPlanet(mPlanet:clsPlanet) {
	if (leftBackground_mc.getInstanceAtDepth(0) != null) {
		leftBackground_mc.setMask(null)
		leftBackground_mc.getInstanceAtDepth(0).removeMovieClip()
	}
	leftBitmap.dispose()
	//leftBitmap = BitmapData.loadBitmap(mPlanet.planetName + "Surface")
	//leftBackground_mc.attachBitmap(leftBitmap, 0)
	leftBackground_mc.setMask(leftPane_mc)
	leftPane_txt.text = mPlanet.planetName

	leftgValue = mPlanet.planetRelativegValue
	
}


function attachRightPlanet(mPlanet:clsPlanet) {
	if (rightBackground_mc.getInstanceAtDepth(0) != null) {
		rightBackground_mc.setMask(null)
		rightBackground_mc.getInstanceAtDepth(0).removeMovieClip()
	}
	rightBitmap.dispose()
	//rightBitmap = BitmapData.loadBitmap(mPlanet.planetName + "Surface")

	//rightBackground_mc.attachBitmap(rightBitmap, 0)
	rightBackground_mc.setMask(rightPane_mc)
	rightPane_txt.text = mPlanet.planetName
	rightgValue = mPlanet.planetRelativegValue

}


this.instructionPpt_mc.swapDepths(1000); //NIKHIL



function loadQuiz() {

	myVoyager_mc.quiz_mc.addQuestion("Which of the following statements is true?", "O", ["In a Pan Balance, the measurement on earth and moon is unchanged","In a Spring Scale, the measurement on earth and moon is unchanged","In an Electronic Scale, the measurement on earth and moon is unchanged"], [true, false, false] )
	myVoyager_mc.quiz_mc.addQuestion("An object falls down slowly on moon as compared to its fall on earth because ___________.", "O", ["The gravity on the moon is lesser than that on the earth", "There is no air on moon, and hence no air resistance", "The moon is smaller than earth in size", "The moon is smaller than earth in mass."], [true, false, false, false] )
	myVoyager_mc.quiz_mc.addQuestion("A spring scale gives a correct reading ONLY on earth, and not on moon on other planets/satellites. Earth is special because _______________.", "O",["It is on earth that the spring scale is calliberated", "Earth is the only planet which has life on it", "Earth has air which the moon does not."], [true, false, false] )
	
	myVoyager_mc.quiz_mc.qtnCount = 3
	myVoyager_mc.quiz_mc.execQuiz()


}



