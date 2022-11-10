// !PROGRESS BAR & Back-TO-Top STARTS FROM HERE
const progressBar = document.getElementById("Progress-bar")
const BackTop = document.querySelector(".Back-to-top")
console.log(progressBar)
// percentage Calculation;
document.addEventListener("scroll", updateWidth)

// updateWidth function
function updateWidth(){
    // console.dir(document.documentElement)
    const {scrollTop, scrollHeight} = document.documentElement;
    const widthPercent = `${(scrollTop /(scrollHeight - window.innerHeight)) * 100}%`
    // console.log(widthPercent)
    progressBar.style.setProperty("--progress", widthPercent)

    // ? back-to-top button starts from here
    if(scrollTop > 1800){
        BackTop.classList.add("Show-Back-to-top")
    }else{
        BackTop.classList.remove("Show-Back-to-top")
    }
}
// !PROGRESS BAR & Back-TO-Top ENDS FROM HERE

// !DATE SEETINGS STARTS FROM HERE
const EnglishDate = document.querySelector(".Date-in-English")

const TIME_AGO = document.getElementById("time-Ago")
  
let currentDate = new Date()
let format = {weekday: "long", month: "short", day : "numeric", year: "numeric"}
EnglishDate.innerHTML = currentDate.toLocaleDateString("en-US", format)

//  time Ago;
const MONTHS_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']

function getFormatted(date, preformattedDate = false, hideYear = false){
    const day = date.getDate();
    const month = MONTHS_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(preformattedDate){
        return `${preformattedDate} at ${hours}:${minutes}`
    }
    if(hideYear){
        return `${day}. ${month} ${year} at ${hours}: ${minutes}`
    }
}

// main function;
function timeAgo(dateParameter){
    if(!dateParameter){
        return null;
    }

    const date = typeof dateParameter === 'object' ? dateParameter : new Date(dateParameter);
    const Day_in_Ms = 24 * 60 * 60 * 1000;
    const today = new Date();
    const yesterday = new Date(today - Day_in_Ms);
    const seconds  = Math.round(today - date / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if(seconds < 5) {
        return 'now';
    }else if(seconds < 60){
        return `${seconds} seconds ago`;
    }else if(seconds < 90){
        return 'about a minute ago'
    }else if(minutes < 60){
        return `${minutes} minutes ago`;
    }
    else if(isToday){
        return getFormatted(date, 'Today')
    }else if(isYesterday){
        return getFormatted(date, 'Yesterday')
    }else if(isThisYear){
        return getFormatted(date, false, true)
    }
    return getFormatted(date)
}
let updatedTime = new Date(1663367352808)
TIME_AGO.innerHTML = timeAgo(updatedTime)
// !DATE SEETINGS ENDS FROM HERE

