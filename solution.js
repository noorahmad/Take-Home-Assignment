var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

//GET call function
function Get(url) {
	xhr.open('GET', url, false);
	xhr.send(null);
	return xhr.responseText;
}

const url = "http://api.viki.io/v4/videos.json?app=100250a&per_page=10&page=";

var hdTrueTotal = 0;
var hdFalseTotal = 0;
var pageNum = 0;
var more = true;

while (more) {
		
	//restart counter each loop
	var hd_true = 0;
	var hd_false = 0;
	pageNum++;

	//GET request for page
	var jsonObj = JSON.parse(Get(url + pageNum));
	var response = jsonObj.response;
		
	//loop through jsonObj.response and count HD
	for (var i in response) {
		var hd = response[i]["flags"].hd;
		if (hd) {
			hd_true++;
		} else {
			hd_false++;
	}
}	
	//add current page HD's to total
	hdTrueTotal += hd_true;
	hdFalseTotal += hd_false;

	//keep track of number of pages processed
	console.log(pageNum)

	//exit loop when more becomes false
	if (jsonObj.more === false) {
		more = false;
	}
}

console.log("Number of HD = True: " + hdTrueTotal);
console.log("Number of HD = False: " + hdFalseTotal);