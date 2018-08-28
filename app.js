window.onload = function(e) {

// THIS AREA IS TO GENERATE AND INSERT CURRENT DATE

let Currentdate = new Date();
let year = Currentdate.getFullYear();
let month = Currentdate.getMonth();
let day = Currentdate.getDay();
let date =Currentdate.getDate();
let currentMonth = ["JANUARY","FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
let currentDay = ["SUNDAY","MONDAY","TUESDAY", "WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
let newsDate = currentDay[day] + " " + currentMonth[month]+ " " + date + ", " + year;

let insertDate = document.querySelector('.datebar');
insertDate.innerHTML = newsDate;

 axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=6560880c487746438fe80efea6edbe2d').then(function(response){

  response.data.articles.forEach(function(myData){

    // console.log(myData['author']);
    console.log(myData);

    // let newsDiv = document.createElement('div')
    // newsDiv.setAttribute("class=" , storyDiv);
    // newsDiv.innerHTML='myData'
    // document.getElementById('newsContainer')


    // newsDiv.
  })

   // console.log(response.data.articles[0]);
 });

}
