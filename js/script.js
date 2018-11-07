// variables in JavaScript

let totalSubmissions = 0;
let dull = 0;
let mbs = 0;
let dull_mb = 0;
let bright_mb = 0;

let bright = 0;
let nmb = 0;
let dull_nmb = 0;
let bright_nmb = 0;

let p = 0;
let chi_square = 0;

let dmr = 0;
let dnr = 0;
let bmr = 0;
let bnr = 0;

let n = 0;
let cop = "";
let mop = "";

let xy = [];
let x2 = [];
let y2 = [];
let sum_x = 0;
let sum_y = 0;
let sum_xy = 0;
let sum_x2 = 0;
let sum_y2 = 0;

let step1;
let step2;
let step3;
let step4;

let answer;

// components in HTML

const cl_output = document.getElementsByName("color");
const mbs_output = document.getElementsByName("membership");

const p1 = document.getElementById('page1');
const p2 = document.getElementById('page2');
const tt_sms = document.getElementById('tt_sms');
const statistics = document.getElementById('statistics');

const bar1 = document.getElementById('stt_dull_mb');
const bar2 = document.getElementById('stt_dull_nmb');
const bar3 = document.getElementById('stt_bright_mb');
const bar4 = document.getElementById('stt_bright_nmb');

const info = document.getElementById('info');

function back() {
	p2.style.display = "none";
	p1.style.display = "block";
}

function clearAll() {
	totalSubmissions = 0;

	dull = 0;
	mbs = 0;
	dull_mb = 0;
	bright_mb = 0;

	bar1.style.width = "25%";
	bar2.style.width = "25%";
	bar3.style.width = "25%";
	bar4.style.width = "25%";

	xy = [];
	x2 = [];
	y2 = [];
	sum_x = 0;
	sum_y = 0;
	sum_xy = 0;
	sum_x2 = 0;
	sum_y2 = 0;

	tt_sms.innerHTML = "Total submissions: 0";
	statistics.innerHTML = "";
}

function infoOn() {
	info.style.display = "block";
	console.log (event.srcElement.id);

	if (event.srcElement.id == "stt_dull_mb") {
		n = dull_mb;
		cop = "";
		mop = "";
	} else if (event.srcElement.id == "stt_dull_nmb") {
		n = dull_nmb;
		cop = "";
		mop = "non-";
	} else if (event.srcElement.id == "stt_bright_mb") {
		n = bright_mb;
		cop = "don't";
		mop = "";
	} else {
		n = bright_nmb;
		cop = "don't";
		mop = "non-";
	}

	info.innerHTML = "<br>" + n / totalSubmissions * 100 + "% customers are " + mop + "members and " + cop + " wear glasses."

}

function infoOff() {
	info.style.display = "none";
}

function infoMove() {

	let x = event.clientX - 100 + "px";
	let y = event.clientY - 100 + "px";
	console.log (event.clientX);
	info.style.left = x;
	info.style.top = y;

}

function manageSubmission() {
	p1.style.display = "none";
	p2.style.display = "block";

}

function submitThis() {

	totalSubmissions ++;

	if (cl_output[0].checked == true) {
		dull ++;
		if (mbs_output[0].checked == true) {
			dull_mb ++;
			mbs ++;
		}
	} else {
		if (mbs_output[0].checked == true) {
			bright_mb ++;
			mbs ++;
		}
	}

	bright = totalSubmissions - dull;
	nmb = totalSubmissions - mbs;
	dull_nmb = dull - dull_mb;
	bright_nmb = bright - bright_mb;

	dmr = dull_mb / totalSubmissions * 94 + 1.5 + "%";
	dnr = dull_nmb / totalSubmissions * 94 + 1.5 + "%";
	bmr = bright_mb / totalSubmissions * 94 + 1.5 + "%";
	bnr = bright_nmb / totalSubmissions * 94 + 1.5 + "%";

	bar1.style.width = dmr;
	bar2.style.width = dnr;
	bar3.style.width = bmr;
	bar4.style.width = bnr;

	tt_sms.innerHTML = "Total submissions: " + totalSubmissions;

	if (cl_output[0].checked == true) {
		sum_x += 1;
		if (mbs_output[0].checked == true) {
			sum_y += 1;
			xy.push (1);
			x2.push (1);
			y2.push (1);
		} else {
			xy.push (0);
			x2.push (1);
			y2.push (0);
		}
	} else {
		if (mbs_output[0].checked == true) {
			sum_y += 1;
			xy.push (0);
			x2.push (0);
			y2.push (1);
		} else {
			xy.push (0);
			x2.push (0);
			y2.push (0);
		}
	}
  
	for (i = 0; i < totalSubmissions; i++) {
		sum_xy += xy[i];
		sum_x2 += x2[i];
		sum_y2 += y2[i];
	}

	step1 = (totalSubmissions * sum_xy) - (sum_x * sum_y);
	step2 = (totalSubmissions * sum_x2) - (sum_x * sum_x);
	step3 = (totalSubmissions * sum_y2) - (sum_y * sum_y);
	step4 = Math.sqrt(step2 * step3);
	answer = step1 / step4;

	statistics.innerHTML = `The correlation coefficient is ${answer}.`


}