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
		quote : '준비하지 않은 자는 기회가 와도 소용없다.',
		author : '알렉시스 드 토크빌'
	},
	{
		quote : '노력해라 집착하라. 숙명적인 노력을.',
		author : '레오나르도 다 빈치'
	},
	{
		quote : '내일이란 오늘의 다른 이름일 뿐',
		author : '윌리엄 포크너'
	},
	{
		quote : '강인한 의지 없이는 뛰어난 재능도 없다.',
		author : '오노레 드 발자크'
	},
	{
		quote : '나는 날마다 모든 면에서 점점 좋아지고 있다.',
		author : '에밀쿠에'
	},
	{
		quote : '불가능한 일을 해보는 것은 신나는 일이다.',
		author : '월트 디즈니'
	},
	{
		quote : '할 수 있다고 믿는 사람은 결국 그렇게 된다.',
		author : '샤론 드골'
	},
	{
		quote : '당신이 포기할 때, 나는 시작한다.',
		author : '엘론 머스크'
	},
	{
		quote : '나는 이룰 때까지 노력할 것이다.',
		author : '브라이언 트레이시'
	},
	{
		quote : '한번 포기하면 습관이 된다. 절대 포기하지 말아라.',
		author : '마이클 조던'
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