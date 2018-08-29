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

// THIS AREA PRODUCES THE INITIAL GRAB OF 20 LATEST STORIES AND PLACES THEM ON THE FRONT PAGE

 axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=6560880c487746438fe80efea6edbe2d').then(function(response){
    let storiesArray = response.data.articles;
    let storyCount = storiesArray.length;

     // console.log(response.data.articles[9]['source']['name']);
     console.log(response.data.articles);

    for (let i=0; i < storyCount; i++) {

       let getTitle = response.data.articles[i]['title'];
       let getDescription = response.data.articles[i]['description'];
       let getAuthor = response.data.articles[i]['author'];
           if (!getAuthor){
             getAuthor= "Author not provided    ";
           }
       let getSource = response.data.articles[i]['source']['name'];
           if (!getSource) {
             getSource= "No source provided";
           }
       let getUrl = response.data.articles[i]['url'];
       let getImg = response.data.articles[i]['urlToImage'];
           if (!getImg) {
             getImg = "images/news-placeholder.jpg";
           }


       let newTitle = document.querySelector('.storyTitle')
       let newDescription = document.querySelector('.storyDescription')
       let newAuthor = document.querySelector('.storyAuthor')
       let newUrl = document.querySelector('.storyBtn')
       let newImg = document.querySelector('.storyImg')
           newTitle.innerHTML = getTitle;
           newDescription.innerHTML = getDescription;
           newUrl.setAttribute("href", getUrl)
           newImg.setAttribute("src", getImg);

           newAuthor.innerHTML = (`Author:&#160&#160${getAuthor}&#160&#160&#160&#160&#160 Source:${getSource}`)

       let containerPush = document.getElementById('newsContainer')
       let storyPush = document.querySelector('.storyDiv');
       let newPush = storyPush.cloneNode(true);

           containerPush.appendChild(newPush);

     };

   });

            let searchNews = document.getElementById('searchBtn');
            let searchTopic = document.getElementById('searchInput');

            searchNews.addEventListener('click', function(e){
              e.preventDefault();
              console.log("click confirmed")
      })
}
