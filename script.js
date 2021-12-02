
window.addEventListener('DOMContentLoaded', (event) => {
	//Call handlers and APIs
	onThisDay();
});


/*=---------------=*/
/*=               =*/
/*=   FUNCTIONS   =*/
/*=               =*/
/*=---------------=*/

function date() {
	//Return a array with year, month and day. 
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return [year, month, day];
}

function randomInt(min,max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*=-------------=*/
/*=             =*/
/*=  API CALLS  =*/
/*=             =*/
/*=-------------=*/
function callAPI(method, url, body, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(body);
	xhr.onload = callback
}


function onThisDay(){
	callAPI("GET", `https://sv.wikipedia.org/api/rest_v1/feed/onthisday/events/${date()[1]}/${date()[2]}`, null, handleOnThisDayResponse);
}

function handleOnThisDayResponse(){
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		console.log(data);
		let index = randomInt(0, data.events.length - 1);
		document.getElementById("onthisday").appendChild(document.createTextNode(data.events[index].year + ": "));
		document.getElementById("onthisday").appendChild(document.createTextNode(data.events[index].text));


	} else {
		console.log("Error:", this.status, "/", this.responseText);
		alert("Error:", this.status, "/", this.responseText);
	}
}