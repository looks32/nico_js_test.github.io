// 로그인
const loginWrap = document.querySelector('.login_wrap');
const loginForm = document.querySelector(".login_form");
const loginInput = document.querySelector(".login_form input");
const greeting = document.querySelector(".greeting");

const mainCont = document.querySelector('.main_cont');

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


function onLoginSubmit(event) {
	event.preventDefault();
	mainCont.classList.remove(HIDDEN_CLASSNAME);
	const username = loginInput.value;
	localStorage.setItem(USERNAME_KEY, username);
	paintGreetings(username);
}

function paintGreetings(username) {
	greeting.innerText = `반갑습니다. 뉴진스 광팬 ${username}님`;
	document.title = `반갑습니다. ${username}님`
	loginWrap.classList.add(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
	mainCont.classList.add(HIDDEN_CLASSNAME);
	loginForm.addEventListener("submit", onLoginSubmit);
} else {
	paintGreetings(savedUsername);
}

// 배경 이미지
const images = [
	'0.jpg',
	'1.jpg',
	'2.jpg',
	'3.jpg',
	'4.jpg',
	'5.jpg',
	'6.jpg',
	'7.jpg',
	'8.jpg'
]
let chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url('img/${chosenImage}')`;

// 명언
const quotes = [
	{
		quote : '왜 쳐다봐 강해rrr륀',
		author : '팜하니'
	},
	{
		quote : '돈까쓰요.',
		author : '해린'
	},
	{
		quote : '오늘 나이키 오픈스토어 준비 갈 완료',
		author : '팜하니'
	},
	{
		quote : '준비하셔야되요. 이런거는 뜬겁새로 뜬급',
		author : '팜하니'
	},
	{
		quote : '역시 탄수나물.',
		author : '팜하니'
	},
	{
		quote : '킴민지 또 날 디스해!',
		author : '팜하니'
	}
]

const quotesWrap = document.querySelector('.quotes_wrap')
const quoteP = document.createElement('p');
const authorP = document.createElement('p');

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quotesWrap.appendChild(quoteP)
quotesWrap.appendChild(authorP)

quoteP.innerText = todaysQuote.quote;
authorP.innerText = todaysQuote.author;


// 날씨
const API_KEY = "b72977f80f3c7e0c4820bc268b729de9";

const weatherWrap = document.querySelector('.weather_wrap')
const weatherP = document.createElement('p');
const cityP = document.createElement('p');
const mentP = document.createElement('p');



function onGeoOk(position){
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}6&appid=${API_KEY}&units=metric&lang=kr`
	fetch(url).then(response => response.json()).then(data => {
		
		weatherWrap.appendChild(cityP)
		cityP.innerText = data.name

		weatherWrap.appendChild(weatherP)
		weatherP.innerText = `${data.weather[0].description} / ${data.main.temp}℃`;

		if(data.main.temp <= -1){
			weatherWrap.appendChild(mentP);
			mentP.innerText = '오늘은 많이 추워요. 따뜻하게 입으세요.'
		} else {
			weatherWrap.appendChild(mentP);
			mentP.innerText = '오늘은 따뜻하네요. 좋은 하루 보내세요.'
		}
	})
}

function onGeoError(onGeoError){
	alert('내 위치 확인 권한 허용하지않아 날씨를 알 수 없습니다.');
	weatherWrap.appendChild(weatherP)
	weatherP.innerText = '현재 날씨 알 수 없음'
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);



// 시간
const clock = document.querySelector('.clock');

function clockAuto(){
    const date = new Date();

    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');

    clock.innerText = (`현재 시각은 ${hours}:${minutes}:${seconds} 입니다.`);
}


clockAuto();
setInterval(clockAuto, 1000);



// todo
const toDoForm = document.querySelector(".todo_form");
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector(".todo_list");

const TODOS_KEY = "todos"

let toDos = []

function saveToDos(){
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
	const li = event.target.parentElement;
	li.remove();
	toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
	saveToDos();
	if(toDos.length == 0){
		toDoList.innerHTML = '<li class="not">오늘 할 일이 없습니다.</li>';
	}
}

function paintToDo(newTodo){
	const li = document.createElement('li');
	const span = document.createElement('span');
	const button = document.createElement('button');
	li.id = newTodo.id;
	button.addEventListener('click', deleteToDo);
	toDoList.appendChild(li);
	span.innerText = newTodo.text;
	li.appendChild(span);
	li.appendChild(button);
	
	if(toDos.length == 1){
		const not = document.querySelector('.not');
		not.remove();
	}
	
}

function handleToDoSubmit(event){
	event.preventDefault();
	const newTodo = toDoInput.value;
	toDoInput.value = "";
	const newToDoObj = {
		text:newTodo,
		id:Date.now()
	}
	toDos.push(newToDoObj);
	paintToDo(newToDoObj);
	saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);


if(savedToDos != null){
	const parsedToDos = JSON.parse(savedToDos);
	toDos  = parsedToDos;
	parsedToDos.forEach(paintToDo);
	if(savedToDos == '[]'){
		toDoList.innerHTML = '<li class="not">오늘 할 일이 없습니다.</li>';
	}
}else{
	toDoList.innerHTML = '<li class="not">오늘 할 일이 없습니다.</li>';
}