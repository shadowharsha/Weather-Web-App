// const tempNow = document.querySelectorAll(".current-img");

// fetch('https://api.weatherapi.com/v1/current.json?key=51bc3cb2122c457390050506241202&q=Hyderabad')
//     .then(response => response.json())
//     .then(response => {
//         console.log(response.current.condition.text)
//         tempNow.forEach(element => element.src = response.current.condition.icon)
//         console.log(tempNow.src);
//     });

const timeText = document.querySelector('.time');
const cityText = document.querySelector('.city');
const cityInput = document.querySelector('#input-city input');
setInterval(() => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const modifiedCurrentTime = currentTime.split(':');
    timeText.innerHTML = modifiedCurrentTime[0] + ":" + modifiedCurrentTime[1]+",";
}, 1000);

cityInput.addEventListener("input", () => cityText.innerHTML = "  "+cityInput.value);



