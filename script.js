const currentMonth = document.querySelector(".current-month");
const calendarDays = document.querySelector(".calendar-days");
const buttons = document.querySelectorAll(".btn");
let date = new Date();

currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
renderCalendar();

function renderCalendar(){
    const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    const totalMonthDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const startWeekDay = new Date(date.getFullYear(),date.getMonth(),1).getDay();
    
    calendarDays.innerHTML = "";

    let totalCalendarDay = 6 * 7;
    for (let i = 0; i < totalCalendarDay; i++) {
        let day = i-startWeekDay;

        if(i <= startWeekDay){
            calendarDays.innerHTML += `<div class='padding-day'>${prevLastDay-i}</div>`;    // adding previous month days
        }else if(i <= startWeekDay+totalMonthDay){
            date.setDate(day);
            date.setHours(0,0,0,0);
            let dayClass = date.getTime()===new Date().setHours(0,0,0,0) ? 'current-day' : 'month-day'; 
            calendarDays.innerHTML += `<div class='${dayClass}'>${day}</div>`;              // adding this month days
        }else{
            calendarDays.innerHTML += `<div class='padding-day'>${day-totalMonthDay}</div>`;// adding next month days
        }
    }
}

buttons.forEach((btn) => btn.addEventListener("click", (e) => {
    let btnClass = String(e.target.classList);
    date = new Date(currentMonth.textContent);
    if(btnClass.includes("today")){
        date = new Date();
    }else if(btnClass.includes("-year")){
        date = new Date(date.getFullYear() + (btnClass.includes("prev") ? -1 : 1), 0, 1);
    }else if(btnClass.includes("-month")){
        date.setMonth(date.getMonth() + (btnClass.includes("prev") ? -1 : 1));
    }
    currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
    renderCalendar();
}));