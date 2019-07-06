
let Flr = function(number) {return Math.floor(number)}
let Cl = function(number) {return Math.ceil(number)}
let Sqrt = function(number) {return Math.sqrt(number)}
let Sq = function(number) {return number * number}

/* Math */
let rng = (chance,max) => {
	let result = Math.random() * max + 1 || 0
	return result < chance
}
let rngmm = (min, max) => {
	min = min || 0
	max = max || 1
	return Math.random() * (max - min) + min
}
let log10 = (val) => {return Math.log(val) / Math.LN10;}
let isN = (val, binary=false) => {if (binary) {return val < 0 ? 1 : 0} else {return val < 0 ? true : false}}
let notZ = (val, binary=false) => {if (binary) {return val !== 0 ? 1 : 0} else {return val !== 0 ? true : false}}

/* formatting */
let capFirst = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
let percent = (number, decimal) => {
	number = number || 0
	decimal = decimal || 0
	if (number === 0) { return 0 }
	return toDecimal(Math.floor(number * 100 * Math.pow(10, decimal)) / Math.pow(10, decimal),decimal)
}
let toDecimal = (number, decimal) => {
	number = number || 0
	decimal = decimal || 0
	var dec = Math.pow(10,decimal)
	if (number === 0) { return 0 }
	return Math.round(number * dec) / dec
}

/* array */

let unique = (array) => {
	function onlyUnique(value, index, self) { 
	    return self.indexOf(value) === index
	}
	return array.filter( onlyUnique )
}

/**********************************\
 * DOM METHODS
\**********************************/
let newEleFromModel = (element) => {
	return element.cloneNode(true)
}

let eleByID = (id) => {
	return document.getElementById(id)
}

let rmByID = (id) => {
	let thisElement = document.getElementById(id)
	thisElement.parentNode.removeChild(thisElement)
}

let eleByClass = (classname) => {
	return document.getElementsByClassName(classname)
}

let eleBySelector = (selector) => {
	return document.querySelector(selector)
}

let getAttributeValueByID = (elementID, attribute) => {
	let thisElement = document.getElementById(elementID)
	return thisElement.getAttribute(attribute)
}

let updateTextByID = (elementID, text) => {
	text = text || ""
	let thisElement = document.getElementById(elementID)
	if (thisElement.innerHTML !== text.toString()) {
		thisElement.innerHTML = text.toString()
	}
}

let updateTextBySelector = (elementSelector, text) => {
	text = text || ""
	let thisElement = document.querySelector(elementSelector)
	if (thisElement.innerHTML !== text.toString()) {
		thisElement.innerHTML = text.toString()
	}
}

let updateAttributeByID = (elementID, attribute, value) => {
	let thisElement = document.getElementById(elementID)
	if (thisElement.getAttribute(attribute) !== value.toString()) {
		thisElement.setAttribute(attribute, value.toString())
	}
}

let updateAttributeBySelector = (elementSelector, attribute, value) => {
	let thisElement = document.querySelector(elementSelector)
	if (thisElement.getAttribute(attribute) !== value.toString()) {
		thisElement.setAttribute(attribute, value.toString())
	}
}

/* Variables */

var data = {
	battery: {
		free: 700,
		idle: {d: 60, w: 0, max: 140, default: 60},
		purchase: {n: 100, c: 0, max: 2000, default: 100},
		packages: {
			p1: {b:1000, n:0, l:4, c:100},
			p2: {b:700, n:0, l:4, c:70},
			p3: {b:300, n:0, l:4, c:30},
			p4: {b:100, n:0, l:5, c:10}
		},
		total: 0,
		cost: {gems:0, dalla:0}
	},
	gamestatus: 0,
	/* 0=stopped, 1=started*/
	game: {
		battery: 0,
		points: 0,
		datachip: 0,
		redeemchipbase: 10,
		play: {
			batteryspent: 0,
			totalbatteryspent: 0,
			redeem: 0,
			avgbattery: 0,
			failcount: 0,
			blackjackcount: 0,
		}
	},
	autoplay: 0,
	apstrategy: {
		pt10: 1, /* can't redeem */
		pt11: 1, /* can't redeem */
		pt12: 1,
		pt13: 1,
		pt14: 1,
		pt15: 1,
		pt16: 1,
		pt17: 1,
		pt18: 1,
		pt19: 1,
		pt20: 1,
	},
	strategyname: "",
	continuous: false,
	replay: 0,
	perfmode: false,
	devmode: 0, /* becareful if you switch this to 1, will use a lot of process */
	devresult: "" 
}

eleByID("buy-p1").onclick = function() {
	if (data.battery.packages.p1.n < data.battery.packages.p1.l){
		data.battery.packages.p1.n++
		if (data.gamestatus === 1) {data.game.battery += data.battery.packages.p1.b}
	}
}
eleByID("buy-p2").onclick = function() {
	if (data.battery.packages.p2.n < data.battery.packages.p2.l){
		data.battery.packages.p2.n++
		if (data.gamestatus === 1) {data.game.battery += data.battery.packages.p2.b}
	}
}
eleByID("buy-p3").onclick = function() {
	if (data.battery.packages.p3.n < data.battery.packages.p3.l){
		data.battery.packages.p3.n++
		if (data.gamestatus === 1) {data.game.battery += data.battery.packages.p3.b}
	}
}
eleByID("buy-p4").onclick = function() {
	if (data.battery.packages.p4.n < data.battery.packages.p4.l){
		data.battery.packages.p4.n++
		if (data.gamestatus === 1) {data.game.battery += data.battery.packages.p4.b}
	}
}

eleByID("startgame").onclick = function() {
	data.game.battery = data.battery.total
	data.gamestatus = 1
}

eleByID("resetgame").onclick = function() {
	data.battery.idle.d = data.battery.idle.default
	data.battery.purchase.n = data.battery.purchase.default
	data.battery.packages.p1.n = 0
	data.battery.packages.p2.n = 0
	data.battery.packages.p3.n = 0
	data.battery.packages.p4.n = 0

	data.game.battery = 0
	data.game.points = 0
	data.game.datachip = 0
	data.game.play.batteryspent = 0
	data.game.play.totalbatteryspent = 0
	data.game.play.redeem = 0
	data.game.play.avgbattery = 0
	data.game.play.failcount = 0
	data.game.play.blackjackcount = 0

	data.gamestatus = 0
	updateTextByID("avgbattery", data.game.play.avgbattery.toString())
}

let roll = (min, max, cost) => {
	if (cost > data.game.battery) {
		return false
	}
	if (data.game.points <= 20) {
		let rolled = Flr(rngmm(min,max+1))
		data.game.battery -= cost
		data.game.points += Math.min(rolled, 22)
		data.game.play.batteryspent += cost
		data.game.play.totalbatteryspent += cost

		if (data.game.points > 21) {
			data.game.points = 0

			textlog(2, 'You rolled '+rolled+' for '+cost+'<i class="battery"></i>. Exceed 21 pts. Reset to 0.')
			data.game.play.failcount++
			data.game.play.batteryspent = 0
		} else {
			textlog(1, 'You rolled '+rolled+' for '+cost+'<i class="battery"></i>. You reached '+data.game.points+' pts.')
		}
	}
	if (data.game.battery === 0) {redeem()}
} 
let redeem = () => {
	if (data.game.points >= 12 && data.game.points <= 20) {
		let redeemratio = getRedeemRatio()
		
		let redeemchip = redeemratio * data.game.redeemchipbase
		let currentpoints = data.game.points
		data.game.datachip += redeemchip
		data.game.points = 0
		let batteryspent = data.game.play.batteryspent
		let worth = toDecimal(batteryspent/redeemchip,2)
		data.game.play.batteryspent = 0

		textlog(3, redeemchip+'<i class="datachip"></i> for '+currentpoints+' pts ('+batteryspent+'<i class="battery"></i> spent, '+worth+'<i class="battery"></i>/<i class="datachip"></i>). You now have '+data.game.datachip+'<i class="datachip"></i>')
	}
}
let getRedeemRatio = () => {
	if (data.game.points >= 12 && data.game.points <= 14) {return 1}
	else if (data.game.points >= 15 && data.game.points <= 16) {return 1.2}
	else if (data.game.points >= 17 && data.game.points <= 18) {return 1.8}
	else if (data.game.points >= 19 && data.game.points <= 20) {return 3.2}
	else {return 0}
}
/* type
	1 = roll
	2 = roll exceed 21
	3 = redeem
	4 = redeeem at perfect roll

*/
let textlog = (type, message) => {
	if (data.devmode === 1) {return false}
	let classtype = ""
	let madiv = eleByID("logtext")
	if (data.continuous === false && type < 10) {
		if (type === 1) {
			classtype = "roll"
		} else if (type === 2) {
			classtype = "fail"
		} else if (type === 3) {
			classtype = "redeem"
		} else if (type === 4) {
			classtype = "blackjack"
		}
		madiv.innerHTML += '<p class="'+classtype+'">'+message+'</p>'
		madiv.scrollTop = madiv.scrollHeight;
	} else if (data.continuous && type === 10) {
		madiv.innerHTML += '<p class="autoplayresult">'+message+'</p>'
		madiv.scrollTop = madiv.scrollHeight;
	}
}
let resultlog = (values) => {
	if (data.devmode === 1) {
		data.devresult += values+'\n'
	} else {
		let resultcontainer = eleByID("logresult")
		resultcontainer.value += values+'\n'
	}
}

eleByID("roll1").onclick = function() {roll(1,9,10)}
eleByID("roll2").onclick = function() {roll(1,6,20)}
eleByID("roll3").onclick = function() {roll(1,3,40)}
eleByID("redeem").onclick = function() {redeem()}

/* autoplay strategy */
eleByID("aps10-1").onclick = function() {data.apstrategy.pt10 = 1}
eleByID("aps10-2").onclick = function() {data.apstrategy.pt10 = 2}
eleByID("aps10-3").onclick = function() {data.apstrategy.pt10 = 3}
eleByID("aps11-1").onclick = function() {data.apstrategy.pt11 = 1}
eleByID("aps11-2").onclick = function() {data.apstrategy.pt11 = 2}
eleByID("aps11-3").onclick = function() {data.apstrategy.pt11 = 3}

eleByID("aps12-1").onclick = function() {data.apstrategy.pt12 = 1}
eleByID("aps12-2").onclick = function() {data.apstrategy.pt12 = 2}
eleByID("aps12-3").onclick = function() {data.apstrategy.pt12 = 3}
eleByID("aps12-4").onclick = function() {data.apstrategy.pt12 = 4}
eleByID("aps13-1").onclick = function() {data.apstrategy.pt13 = 1}
eleByID("aps13-2").onclick = function() {data.apstrategy.pt13 = 2}
eleByID("aps13-3").onclick = function() {data.apstrategy.pt13 = 3}
eleByID("aps13-4").onclick = function() {data.apstrategy.pt13 = 4}
eleByID("aps14-1").onclick = function() {data.apstrategy.pt14 = 1}
eleByID("aps14-2").onclick = function() {data.apstrategy.pt14 = 2}
eleByID("aps14-3").onclick = function() {data.apstrategy.pt14 = 3}
eleByID("aps14-4").onclick = function() {data.apstrategy.pt14 = 4}

eleByID("aps15-1").onclick = function() {data.apstrategy.pt15 = 1}
eleByID("aps15-2").onclick = function() {data.apstrategy.pt15 = 2}
eleByID("aps15-3").onclick = function() {data.apstrategy.pt15 = 3}
eleByID("aps15-4").onclick = function() {data.apstrategy.pt15 = 4}
eleByID("aps16-1").onclick = function() {data.apstrategy.pt16 = 1}
eleByID("aps16-2").onclick = function() {data.apstrategy.pt16 = 2}
eleByID("aps16-3").onclick = function() {data.apstrategy.pt16 = 3}
eleByID("aps16-4").onclick = function() {data.apstrategy.pt16 = 4}

eleByID("aps17-1").onclick = function() {data.apstrategy.pt17 = 1}
eleByID("aps17-2").onclick = function() {data.apstrategy.pt17 = 2}
eleByID("aps17-3").onclick = function() {data.apstrategy.pt17 = 3}
eleByID("aps17-4").onclick = function() {data.apstrategy.pt17 = 4}
eleByID("aps18-1").onclick = function() {data.apstrategy.pt18 = 1}
eleByID("aps18-2").onclick = function() {data.apstrategy.pt18 = 2}
eleByID("aps18-3").onclick = function() {data.apstrategy.pt18 = 3}
eleByID("aps18-4").onclick = function() {data.apstrategy.pt18 = 4}

eleByID("aps19-1").onclick = function() {data.apstrategy.pt19 = 1}
eleByID("aps19-2").onclick = function() {data.apstrategy.pt19 = 2}
eleByID("aps19-3").onclick = function() {data.apstrategy.pt19 = 3}
eleByID("aps19-4").onclick = function() {data.apstrategy.pt19 = 4}
eleByID("aps20-1").onclick = function() {data.apstrategy.pt20 = 1}
eleByID("aps20-2").onclick = function() {data.apstrategy.pt20 = 2}
eleByID("aps20-3").onclick = function() {data.apstrategy.pt20 = 3}
eleByID("aps20-4").onclick = function() {data.apstrategy.pt20 = 4}

eleByID("continuous").onclick = function() {data.continuous = !data.continuous}
eleByID("perfmode").onclick = function() {data.perfmode = !data.perfmode}
eleByID("startautoplay").onclick = function() {data.autoplay=1}
eleByID("stopautoplay").onclick = function() {
	data.continuous = false;
	data.autoplay=0
	if (data.devmode === 1) {
		let resultcontainer = eleByID("logresult")
		resultcontainer.value = data.devresult
	}
}

function autoplay() {
	let currentpts = data.game.points
	let currentbtr = data.game.battery
	if (currentbtr < 10) {
		if (!data.continuous) {
			data.autoplay = 0
		}
		if (currentbtr > 0) {
			textlog(10,"Not enough batteries to roll.")
		}
		//return false
	} else if (data.autoplay > 0) {
		if (currentpts <= 9) {
			roll(1,9,10)
		} else if (data.apstrategy['pt'+currentpts] === 1) { /* roll 1-9 */
			roll(1,9,10)
		} else if (data.apstrategy['pt'+currentpts] === 2) { /* roll 1-6 */
			if (currentbtr < 20) {
				textlog(1,"Not enough batteries to roll 1-6, will roll 1-9.")
				roll(1,9,10)
			} else {
				roll(1,6,20)
			}
		} else if (data.apstrategy['pt'+currentpts] === 3) { /* roll 1-3 */
			if (currentbtr < 20) {
				textlog(1,"Not enough batteries to roll 1-3, will roll 1-9.")
				roll(1,9,10)
			} else if (currentbtr < 40) {
				textlog(1,"Not enough batteries to roll 1-3, will roll 1-6.")
				roll(1,6,20)
			} else {
				roll(1,3,40)
			}
		} else if (data.apstrategy['pt'+currentpts] === 4) { /* claim*/
			redeem()
		}
	}
	if (currentbtr < 10 && data.continuous) {
		autoreplay()
	}
}

function autoreplay() {
	let avg = toDecimal(data.game.play.totalbatteryspent/data.game.datachip,3)
	let milestone = 0
	if (data.game.datachip >= 2600) {milestone = 2600}
	else if (data.game.datachip >= 2400) {milestone = 2400}
	else if (data.game.datachip >= 2200) {milestone = 2200}
	else if (data.game.datachip >= 2000) {milestone = 2000}
	else if (data.game.datachip >= 1800) {milestone = 1800}
	else if (data.game.datachip >= 1600) {milestone = 1600}
	else if (data.game.datachip >= 1400) {milestone = 1400}
	else if (data.game.datachip >= 1200) {milestone = 1200}
	else if (data.game.datachip >= 1000) {milestone = 1000}
	else if (data.game.datachip >= 800) {milestone = 800}
	else if (data.game.datachip >= 600) {milestone = 600}
	else if (data.game.datachip >= 400) {milestone = 400}
	else {milestone = 0}
	let text = 'Strategy'+data.strategyname+': <span class="milestone'+milestone+'">'+data.game.datachip+'</span><i class="datachip"></i>. '+
		data.game.play.totalbatteryspent+'<i class="battery"></i> used. Avg '+
		avg+'<i class="battery"></i>/<i class="datachip"></i> | Fail:'+
		data.game.play.failcount+' | BJ:'+data.game.play.blackjackcount
	textlog(10,text)
	resultlog(data.game.datachip.toString()+','+data.game.play.failcount+','+data.game.play.blackjackcount.toString())
	data.game.battery = 0
	data.game.points = 0
	data.game.datachip = 0
	data.game.play.batteryspent = 0
	data.game.play.totalbatteryspent = 0
	data.game.play.redeem = 0
	data.game.play.avgbattery = 0
	data.game.play.failcount = 0
	data.game.play.blackjackcount = 0
	data.replay++
	data.game.battery = data.battery.total

	if (data.replay % 10 === 0) {
		let logcontainer = eleByID("logtext")
		if (logcontainer.childElementCount >= 100) {
			for (var i = 10 - 1; i >= 0; i--) {
				logcontainer.removeChild(logcontainer.getElementsByTagName('p')[i])
			}
		}
		if (data.devmode === 1) {
			document.title = "TTHBJ DEVMODE : ID:"+data.autoplay+" n°"+data.replay
		}
	}
	if (data.replay % 10000 === 0) {
		data.continuous = false;
		data.autoplay=0
		if (data.devmode === 1) {
			let resultcontainer = eleByID("logresult")
			resultcontainer.value = data.devresult
		}
	}
}

function dbLoop() {
	updateAttributeByID("definebattery", "data-status", data.gamestatus)
	let btr = data.battery
	if (data.gamestatus === 0) {
		/* check */
		/* idle */
		if (parseInt(eleByID("idb-idle").value) <= data.battery.idle.max) {
			data.battery.idle.d = parseInt(eleByID("idb-idle").value)
		} else {
			eleByID("idb-idle").value = data.battery.idle.max
			data.battery.idle.d = data.battery.idle.max
		}
		data.battery.idle.w = data.battery.idle.d * 7
		/* purchase */
		if (parseInt(eleByID("idb-purchase").value) <= data.battery.purchase.max) {
			data.battery.purchase.n = parseInt(eleByID("idb-purchase").value)
		} else {
			eleByID("idb-purchase").value = data.battery.purchase.max
			data.battery.purchase.n = data.battery.purchase.max
		}
		data.battery.purchase.c = data.battery.purchase.n * 2

		/* update text */
		updateTextByID("db-idle-week-value", btr.idle.w.toString())
		updateTextByID("db-purchase-cost-value", btr.purchase.c.toString())
	}
	
	// packages
	updateTextByID("db-package1-value", (btr.packages.p1.n * btr.packages.p1.b).toString() )
	updateTextByID("db-package1-cost-value", (btr.packages.p1.n * btr.packages.p1.c).toString())
	updateTextByID("db-package1-cost-n", btr.packages.p1.n.toString())

	updateTextByID("db-package2-value", (btr.packages.p2.n * btr.packages.p2.b).toString() )
	updateTextByID("db-package2-cost-value", (btr.packages.p2.n * btr.packages.p2.c).toString())
	updateTextByID("db-package2-cost-n", btr.packages.p2.n.toString())

	updateTextByID("db-package3-value", (btr.packages.p3.n * btr.packages.p3.b).toString() )
	updateTextByID("db-package3-cost-value", (btr.packages.p3.n * btr.packages.p3.c).toString())
	updateTextByID("db-package3-cost-n", btr.packages.p3.n.toString())

	updateTextByID("db-package4-value", (btr.packages.p4.n * btr.packages.p4.b).toString() )
	updateTextByID("db-package4-cost-value", (btr.packages.p4.n * btr.packages.p4.c).toString())
	updateTextByID("db-package4-cost-n", btr.packages.p4.n.toString())
	
	data.battery.total = btr.free + btr.idle.w + btr.purchase.n + 
		btr.packages.p1.b * btr.packages.p1.n +
		btr.packages.p2.b * btr.packages.p2.n +
		btr.packages.p3.b * btr.packages.p3.n +
		btr.packages.p4.b * btr.packages.p4.n

	data.battery.cost.gems = btr.purchase.c
	data.battery.cost.dalla = btr.packages.p1.c * btr.packages.p1.n +
		btr.packages.p2.c * btr.packages.p2.n +
		btr.packages.p3.c * btr.packages.p3.n +
		btr.packages.p4.c * btr.packages.p4.n

	updateTextByID("db-total-battery", data.battery.total.toString())
	updateTextByID("db-total-gem", data.battery.cost.gems.toString())
	updateTextByID("db-total-dalla", data.battery.cost.dalla.toString())

	let strategyname = data.apstrategy.pt10+''+data.apstrategy.pt11+','+
		data.apstrategy.pt12+''+data.apstrategy.pt13+''+data.apstrategy.pt14+','+
		data.apstrategy.pt15+''+data.apstrategy.pt16+','+
		data.apstrategy.pt17+''+data.apstrategy.pt18+','+
		data.apstrategy.pt19+''+data.apstrategy.pt20

	data.strategyname = strategyname
}

function gLoop() {
	updateAttributeByID("game", "data-status", data.gamestatus)

	/* strategy name */
	updateTextByID("strategyname", data.battery.total+'b_'+data.strategyname)

	if (!data.continuous) {
		updateTextByID("game-points", data.game.points.toString())
		updateTextByID("game-battery", data.game.battery.toString())
		updateTextByID("game-datachip", data.game.datachip.toString())
		updateTextByID("game-points-fromperfect", (21 - data.game.points).toString())

		let redeemfor = getRedeemRatio() * data.game.redeemchipbase
		updateTextByID("game-redeem-dc", redeemfor.toString())
	}

	updateAttributeByID("aps10", "data-v", data.apstrategy.pt10.toString())
	updateAttributeByID("aps11", "data-v", data.apstrategy.pt11.toString())
	updateAttributeByID("aps12", "data-v", data.apstrategy.pt12.toString())
	updateAttributeByID("aps13", "data-v", data.apstrategy.pt13.toString())
	updateAttributeByID("aps14", "data-v", data.apstrategy.pt14.toString())
	updateAttributeByID("aps15", "data-v", data.apstrategy.pt15.toString())
	updateAttributeByID("aps16", "data-v", data.apstrategy.pt16.toString())
	updateAttributeByID("aps17", "data-v", data.apstrategy.pt17.toString())
	updateAttributeByID("aps18", "data-v", data.apstrategy.pt18.toString())
	updateAttributeByID("aps19", "data-v", data.apstrategy.pt19.toString())
	updateAttributeByID("aps20", "data-v", data.apstrategy.pt20.toString())

	updateAttributeByID("continuous", "data-activated", data.continuous.toString())
	updateAttributeByID("perfmode", "data-activated", data.perfmode.toString())

	if (data.autoplay !== 0) {
		autoplay()
	}

	if (!data.continuous && data.game.datachip > 0) {
		data.game.play.avgbattery = toDecimal(data.game.play.totalbatteryspent/data.game.datachip,3)
		updateTextByID("avgbattery", data.game.play.avgbattery.toString())
	}
	
	if (data.gamestatus === 0) {
		return false
	}

	if (!data.continuous) {
		/* update gauge bar */
		let gaugelength = 20 * data.game.points
		let theGaugeBar = eleByID("gauge")
		if (theGaugeBar.style.width !== gaugelength+"px") {
			theGaugeBar.style.width = gaugelength+"px"
		}

		/* gray out buttons that can't be used */
		
		if (data.game.points >= 12 && data.game.points <= 20) {
			if (data.game.points >= 12) {
				updateAttributeByID("redeem", "data-canredeem", "1")
			}
		} else {
			updateAttributeByID("redeem", "data-canredeem", "0")
		}
	}

	/* auto redeem if 21 */
	if (data.game.points === 21) {
		let redeemchip = 6 * data.game.redeemchipbase
		let batteryspent = data.game.play.batteryspent
		let worth = toDecimal(batteryspent/redeemchip,2)
		
		data.game.datachip += redeemchip
		textlog(4, 'BLACKJACK! '+redeemchip+'<i class="datachip"></i> for '+data.game.points+' pts  ('+batteryspent+'<i class="battery"></i> spent, '+worth+'<i class="battery"></i>/<i class="datachip"></i>). You now have '+data.game.datachip+'<i class="datachip"></i>')
		data.game.points = 0
		data.game.play.blackjackcount++
	}

	if (data.autoplay !== 0) {
		if (data.devmode === 1 && data.replay % 30 !== 0) {
			return false
		}
		updateTextByID("replay", data.replay.toString())
	}
}


/* Loops */
let gameFps = 400
if (data.devmode === 1) {
	gameFps = 1000
}

let defineBattery = function () { 
	dbLoop()
	window.setTimeout(defineBattery, 1000 / 20)
}
let game = function () { 
	gLoop()
	if (data.perfmode) {
		window.setTimeout(game, 1)
	} else {
		window.setTimeout(game, 1000 / gameFps)
	}
}
let _defineBatteryLoop = defineBattery()
let _gameLoop = game()