const img = document.querySelector('img');

fetch('https://api.weatherapi.com/v1/current.json?key=51bc3cb2122c457390050506241202&q=Hyderabad')
    .then(response => response.json())
    .then(response => {
        console.log(response.current.condition.text)
        img.src = response.current.condition.icon
    });


