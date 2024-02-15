"use strict";

const cityInput = document.querySelector('#input-city input');

// DATE

setInterval(() => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const modifiedCurrentTime = currentTime.split(':');
    const timeText = document.querySelector('.time');
    timeText.innerHTML = modifiedCurrentTime[0] + ":" + modifiedCurrentTime[1] + ",";
}, 1000);

// FOR STRING REVERSE

function dateNormalFormat(str) {
    let dateObject = new Date(str);
    let formattedDate = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return formattedDate;
}

cityInput.addEventListener("keypress", async(event) => {
    if (event.key === 'Enter') {
        const cityText = document.querySelector('.city');
        cityText.innerHTML = cityInput.value;

        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=51bc3cb2122c457390050506241202&q=${cityInput.value}&days=3&aqi=no&alerts=no`);
        if (response.ok) {
            let json = await response.json();
            const tempNow = document.querySelectorAll(".current-temp");
            const tempNowImg = document.querySelectorAll(".current-img");
            const currentCondition = document.querySelector(".condition");
            tempNow.forEach(element => element.innerHTML = json.current.temp_c + '°c');
            tempNowImg.forEach(element => element.src = json.current.condition.icon);
            currentCondition.innerHTML = json.current.condition.text;

            // FOR DAY FORECAST
            const forecastDayTemp = document.querySelectorAll(".tday-temp");
            const forecastdayImg = document.querySelectorAll(".tday img");
            const forecastdayDate = document.querySelectorAll(".tday p");
            for (let i = 1; i < 3; i++) {
                forecastDayTemp[i - 1].innerHTML = json.forecast.forecastday[i].day.avgtemp_c + '°c';
                forecastdayImg[i - 1].src = json.forecast.forecastday[i].day.condition.icon;
                forecastdayDate[i - 1].innerHTML = dateNormalFormat(json.forecast.forecastday[i].date);
            }

            // FOR HOUR FORECAST
            const forecasthourTemp = document.querySelectorAll(".thour-temp");
            const forecasthourImg = document.querySelectorAll(".thour img");
            const forecasthourDate = document.querySelectorAll(".thour p");

            for (let i = 1; i < 4; i++) {
                let iForNextFirstHour = new Date().getHours() + i;
                let forecastIForFirstHour = 0;

                if (iForNextFirstHour > 23) {
                    iForNextFirstHour -= 24;
                    forecastIForFirstHour = 1;
                }
                forecasthourTemp[i - 1].innerHTML = json.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].temp_c + '°c';
                forecasthourImg[i - 1].src = json.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].condition.icon;
                forecasthourDate[i - 1].innerHTML = (json.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].time).split(" ")[1];
            }
        } else {
            alert("HTTP-Error: " + response.status);
        }
    }
})

        // fetch(`https://api.weatherapi.com/v1/forecast.json?key=51bc3cb2122c457390050506241202&q=${cityInput.value}&days=3&aqi=no&alerts=no`)
        //     .then(response => response.json())
        //     .then(response => {
        //         const tempNow = document.querySelectorAll(".current-temp");
        //         const tempNowImg = document.querySelectorAll(".current-img");
        //         const currentCondition = document.querySelector(".condition");
        //         tempNow.forEach(element => element.innerHTML = response.current.temp_c + '°c');
        //         tempNowImg.forEach(element => element.src = response.current.condition.icon);
        //         currentCondition.innerHTML = response.current.condition.text;

        //         // FOR DAY FORECAST
        //         const forecastDayTemp = document.querySelectorAll(".tday-temp");
        //         const forecastdayImg = document.querySelectorAll(".tday img");
        //         const forecastdayDate = document.querySelectorAll(".tday p");
        //         for (let i = 1; i < 3; i++) {
        //             forecastDayTemp[i-1].innerHTML = response.forecast.forecastday[i].day.avgtemp_c + '°c';
        //             forecastdayImg[i-1].src = response.forecast.forecastday[i].day.condition.icon;
        //             forecastdayDate[i-1].innerHTML = dateNormalFormat(response.forecast.forecastday[i].date);
        //         }

        //         // FOR HOUR FORECAST
        //         const forecasthourTemp = document.querySelectorAll(".thour-temp");
        //         const forecasthourImg = document.querySelectorAll(".thour img");
        //         const forecasthourDate = document.querySelectorAll(".thour p");

        //         for (let i = 1; i < 4; i++) {
        //             let iForNextFirstHour = new Date().getHours() + i;
        //             let forecastIForFirstHour = 0;

        //             if (iForNextFirstHour > 23) {
        //                 iForNextFirstHour -= 24;
        //                 forecastIForFirstHour = 1;
        //             }
        //             forecasthourTemp[i-1].innerHTML = response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].temp_c + '°c';
        //             forecasthourImg[i-1].src = response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].condition.icon;
        //             forecasthourDate[i-1].innerHTML = (response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].time).split(" ")[1];
        //         }

        //         // DAY FORECAST FOR TOMORROW
        //         // const tomorrowImg = document.querySelector(".card-day-two img");
        //         // const tomorrowTemp = document.querySelector(".next-day-one");
        //         // const tomorrowDate = document.querySelector(".card-day-two p");
        //         // tomorrowTemp.innerHTML = response.forecast.forecastday[1].day.avgtemp_c + '°c';
        //         // tomorrowImg.src = response.forecast.forecastday[1].day.condition.icon;
        //         // tomorrowDate.innerHTML = dateNormalFormat(response.forecast.forecastday[1].date);

        //         // DAY FORECAST FOR AFTER TOMORROW
        //         // const afTomorrowImg = document.querySelector(".card-day-three img");
        //         // const afTomorrowTemp = document.querySelector(".next-day-two");
        //         // const afTomorrowDate = document.querySelector(".card-day-three p");
        //         // afTomorrowTemp.innerHTML = response.forecast.forecastday[2].day.avgtemp_c + '°c';
        //         // afTomorrowImg.src = response.forecast.forecastday[2].day.condition.icon;
        //         // afTomorrowDate.innerHTML = dateNormalFormat(response.forecast.forecastday[2].date);

        //         // DAY FORECAST FOR NEXT HOUR
        //         // let iForNextFirstHour = new Date().getHours() + 1;
        //         // let forecastIForFirstHour = 0;

        //         // if (iForNextFirstHour > 23) {
        //         //     iForNextFirstHour -= 24;
        //         //     forecastIForFirstHour = 1;
        //         // }

        //         // const nextFirstHourTemp = document.querySelector(".next-hr-one");
        //         // const nextFirstHourImg = document.querySelector(".card-two img");
        //         // const nextFirstHourTime = document.querySelector(".card-two p");
        //         // nextFirstHourTemp.innerHTML = response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].temp_c + '°c';
        //         // nextFirstHourImg.src = response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].condition.icon;
        //         // nextFirstHourTime.innerHTML = (response.forecast.forecastday[forecastIForFirstHour].hour[iForNextFirstHour].time).split(" ")[1];

        //         // DAY FORECAST FOR NEXT SECOND HOUR
        //         // let iForNextSecondHour = new Date().getHours() + 2;
        //         // let forecastIForSecondHour = 0;

        //         // if (iForNextSecondHour > 23) {
        //         //     iForNextSecondHour -= 24;
        //         //     forecastIForSecondHour = 1;
        //         // }

        //         // const nextSecondHourTemp = document.querySelector(".next-hr-two");
        //         // const nextSecondHourImg = document.querySelector(".card-three img");
        //         // const nextSecondHourTime = document.querySelector(".card-three p");
        //         // nextSecondHourTemp.innerHTML = response.forecast.forecastday[forecastIForSecondHour].hour[iForNextSecondHour].temp_c + '°c';
        //         // nextSecondHourImg.src = response.forecast.forecastday[forecastIForSecondHour].hour[iForNextSecondHour].condition.icon;
        //         // nextSecondHourTime.innerHTML = (response.forecast.forecastday[forecastIForSecondHour].hour[iForNextSecondHour].time).split(" ")[1];

        //         // DAY FORECAST FOR NEXT THIRD HOUR
        //     //     let iForNextThirdHour = new Date().getHours() + 3;
        //     //     let forecastIForThirdHour = 0;

        //     //     if (iForNextThirdHour > 23) {
        //     //         iForNextThirdHour -= 24;
        //     //         forecastIForThirdHour = 1;
        //     //     }

        //     //     const nextThirdHourTemp = document.querySelector(".next-hr-three");
        //     //     const nextThirdHourImg = document.querySelector(".card-four img");
        //     //     const nextThirdHourTime = document.querySelector(".card-four p");
        //     //     nextThirdHourTemp.innerHTML = response.forecast.forecastday[forecastIForThirdHour].hour[iForNextThirdHour].temp_c + '°c';
        //     //     nextThirdHourImg.src = response.forecast.forecastday[forecastIForThirdHour].hour[iForNextThirdHour].condition.icon;
        //     //     nextThirdHourTime.innerHTML = (response.forecast.forecastday[forecastIForThirdHour].hour[iForNextThirdHour].time).split(" ")[1];
        //     });



