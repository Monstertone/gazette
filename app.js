var containerPush = document.getElementById('newsContainer')
var customActive = false;
var formText = document.forms[1];


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

//SEARCH RETURNS 20 LATEST TOP-HEADLINE STORIES TO APPEAR ON LOAD

let latestNews = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6560880c487746438fe80efea6edbe2d'
getNews(latestNews)

};

// FUNCION TO PASS SEARCH STRING TO API AND PRINT RESULTS TO MAIN PAGE

 function getNews(apiSearch){axios.get(apiSearch).then(function(response){
    let storiesArray = response.data.articles;
    let storyCount = storiesArray.length;

     // console.log(response.data.articles[9]['source']['name']);
     // console.log(response.data.articles);

    for (let i=0; i < storyCount; i++) {

       let getTitle = response.data.articles[i]['title'];
       let getDescription = response.data.articles[i]['description'];
       let getAuthor = response.data.articles[i]['author'];
           if (!getAuthor){
             getAuthor= "Author not provided";
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
      let PublishDate = response.data.articles[i]['publishedAt'];
      let getPublishDate = PublishDate.slice(0,10);

      // console.log(getPublishDate);

       let newTitle = document.querySelector('.storyTitle')
       let newDescription = document.querySelector('.storyDescription')
       let newAuthor = document.querySelector('.storyAuthor')
       let newUrl = document.querySelector('.storyBtn')
       let newImg = document.querySelector('.storyImg')
           newTitle.innerHTML = getTitle;
           newDescription.innerHTML = getDescription;
           newUrl.setAttribute("href", getUrl)
           newImg.setAttribute("src", getImg);

           newAuthor.innerHTML = (`Author:&#160&#160${getAuthor}&#160&#160&#160&#160&#160 Source:&#160&#160${getSource}&#160&#160&#160&#160&#160Publish Date:${getPublishDate}`)

       // let containerPush = document.getElementById('newsContainer')
       let storyPush = document.querySelector('.storyDiv');
       let newPush = storyPush.cloneNode(true);

           containerPush.appendChild(newPush);

     };

   });

}
     // FUNCTION TO PASS CUSTOM SEARCH TO API

            let searchNews = document.getElementById('searchBtn');
            let searchTopic = document.getElementById('searchInput');
            // let searchVal = searchTopic.value;
            searchNews.addEventListener('click', function(e){
              e.preventDefault();

              // let formText = document.forms[1];
              if (customActive) {
                var sourcesString = "";
                for (let z=0; z<formText.length; z++){
                  if (formText[z].checked){
                    sourcesString = sourcesString + formText[z]['value']+ "," ;

                  }

                }
                let newsSelect  = document.getElementById('headlinesOrAll').value;
                let newsQuantity = document.getElementById('quantity').value;
                let newsSort = document.getElementById('sort-selector').value;
                let searchVal = searchTopic.value;


                let customSearch = `https://newsapi.org/v2/${newsSelect}?q=${searchVal}&sources=${sourcesString}&pageSize=${newsQuantity}&sortBy=${newsSort}&apiKey=6560880c487746438fe80efea6edbe2d`


                   containerPush.innerHTML = "";
                   getNews(customSearch);

                 console.log(sourcesString);
                 console.log(customSearch)
                  console.log(newsSelect);
                  console.log(newsQuantity);
                  console.log(newsSort);

                 // console.log(selected);


              } else {

                console.log(customActive);
              let searchVal = searchTopic.value;
              let keyWordSearch = `https://newsapi.org/v2/everything?q=${searchVal}&apiKey=6560880c487746438fe80efea6edbe2d`

               if (searchVal) {
                 containerPush.innerHTML = "";
                 getNews(keyWordSearch);
               }

             }

           });










    // FUNCTION TO ENABLE CLEAR BUTTON TO CLEAR SEARCH FIELD AND CUSTOM SEARCH DIV

           let clearSearch = document.getElementById('clearBtn');
           clearSearch.addEventListener('click', function(e){
             e.preventDefault();
             searchTopic.value = "";

             if (customActive) {
               let divGrow = document.getElementById('customSearchDiv');
               divGrow.style.height = "0px";
               let putForm = document.getElementById('sources');
               putForm.style.display = "none";
               for (let z=0; z<formText.length; z++){
                 if (formText[z].checked){
                   formText[z].checked = false;
                 }
               }
                let selectionBox = document.getElementById('sortBy')
                selectionBox.style.display = "none";


             }




           });

           // FUNCTION TO ANIMATE AND POPULATE THE CUSTOM SEARCH DIV

          let customSrc = document.getElementById('customBtn');
          customSrc.addEventListener('click', function(e){
            e.preventDefault();
            customActive = true;
            let height = 0;
            let divGrow = document.getElementById('customSearchDiv');
            let animateGrow = divGrow.style.height
            var timer = setInterval(grow, 1);
              function grow(){
                 if(height == 360){
                   clearInterval(timer);
                 } else {
                   height = height +30;
                   divGrow.style.height = height + "px";

                 }
               }
               let putForm = document.getElementById('sources');
               putForm.style.display = "block";
               let putSortBy = document.getElementById('sortBy')
               putSortBy.style.display = "block";

               // debugger;




                // CHECKS TO SEE IF HEADLINES OR ALL NEWS IS SELECTED AND DISABLES
                // SORT OPTIONS IF HEADLINES

                    let checkSort = document.getElementById('headlinesOrAll');
                checkSort.onchange= function(e){
                 // console.dir(checkSort.options[checkSort.selectedIndex].value);
                   let optionSelected = document.getElementById('headlinesOrAll').value;
                   let sortStatus = document.getElementById('sort-selector');
                   let sortLabel = document.getElementById('sort-label');



                if (optionSelected === "top-headlines") {

                  sortStatus.disabled = true;
                  sortLabel.style.color = "gray";

                } else if (optionSelected === "everything"){

                  sortStatus.disabled = false;
                  sortLabel.style.color = "black";
                }

              }




          })
