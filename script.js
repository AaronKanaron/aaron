
window.addEventListener('DOMContentLoaded', () => {
	//Call handlers and APIs
	onThisDay();
});

/*=-------------=*/
/*=             =*/
/*=  VARIABLES  =*/
/*=             =*/
/*=-------------=*/

let articles = [

];


/*=--------------=*/
/*=              =*/
/*=   FRONTEND   =*/
/*=              =*/
/*=--------------=*/

//Toggle modal function
function toggleModal(id, event) {
	var modal = document.getElementById(id);
	modal.classList.toggle("open");
}

/*Check if url is in articles array 
If it is, remove the item from the array.
If it is not, save the url as well as the title to the array.
*/

function saveArticle(url, title){
	let article = {
		title: title,
		url: url
	}
	
	if(articles.find(article => article.url === url)){
		console.log("An existing article is already in array! Index of article: " + articles.findIndex(article => article.url === url));
		articles.splice(articles.findIndex(article => article.url === url), 1);
		console.log("Removed article from array!");
	} else{
		console.log("Article added to array");
		articles.push(article);
		localStorage.setItem("articles", JSON.stringify(articles));
	}

	console.log(articles);
}



// function saveArticle(title, url) {
// 	let article = {
// 		title: title,
// 		url: url
// 	};
// 	articles.push(article);
// 	localStorage.setItem("articles", JSON.stringify(articles));
// }

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

function renderText(element, text) {
	if (typeof (document.getElementById(element)) != undefined && document.getElementById(element) != null) {
		Array.from(document.querySelectorAll("#" + element)).forEach((element) => {
			if (Array.isArray(text)) {
				element.innerHTML = ""
				text.map((map_element, index) => {
					index += 1; //Match with the length of an array
					if (text.length > index) {

						element.innerHTML += map_element.name + ", "
						console.log("Last index")
					} else {
						element.innerHTML += map_element.name;
						console.log("Not last index")

					}
					console.log("array element provided length:", text.length, "- current index of element:", index)

					// text.length == index ? element.innerHTML += map_element.name + ", " : 
					console.log(text.length)
				})
			} else {
				element.innerHTML = text;
			}
		})
	} else {
		console.log("%cNo Element found for: " + element, "color:#FF0000")
	}
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