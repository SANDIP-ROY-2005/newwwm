const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = ()=>{
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
const apiKey='api_key=48a5eed5c9e9c34a29e8ed115e1bd076';
   
   
  const baseURL='https://api.themoviedb.org/3 ';
 // const apiURL=baseURL+'/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+apiKey ;
  const img_path = 'https://image.tmdb.org/t/p/w500';
  const input= document.querySelector(".bar input");
  const btn = document.querySelector(".bar button");
  const mainGridTitle= document.querySelector(" .movie-container h1");
  const mainGrid= document.querySelector(".movie-container .movie-grid");
  const genre = document.querySelectorAll(".category");

  const linkTwo=  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200.desc&api_key=48a5eed5c9e9c34a29e8ed115e1bd076' ;
  popularMovies(linkTwo)
   async function popularMovies(URLtwo){
     
     let response= await fetch (URLtwo);
     let data = await response.json();
     console.log(data.results);
     trendingMovies(data.results);
    
   }
   async function trendingMovies(_results){
    console.log(_results);
    mainGridTitle.innerText = "TRENDING";
    mainGrid.innerHTML =  _results.map((_e)=>{
       console.log(_e.title);
       return `
       <div class=" card" id=" ">
      <div class="img">
         <img src="${img_path+_e.poster_path } " alt="">
      </div>
      <div class="info">
          <h2> ${_e.title}</h2>
          <div class="single-info">
              <span>Rate:</span>
              <span>${_e.vote_average}/10</span>
 
          </div>
       </div>
          <div class="info">
          
             <div class="single-info">
                <span> Release Date  :</span>
                <span>${_e.release_date} </span>
                
             </div>
              
          </div>
        
     </div>
  `;
    })
 }
 genre.forEach(movieType=>{
    movieType.addEventListener("click", ()=>{
       const selectedGenreId = movieType.getAttribute('data-genre-id');
        searchMoviesByGenre(selectedGenreId);
 
    });
  });
 
  async function searchMoviesByGenre(genreId){
    let  URL = `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${genreId}}`;
    //  let responseTwo = await fetch(URL);
    //  let receive =  await responseTwo.json();
     fetch(URL)
      .then(response=>
       response.json())
       .then(data=>{
           let   answer = data.results;
            answer.forEach(movie=>{
             console.log(movie.title)
             return `
             <div class=" card" id=" ">
            <div class="img">
               <img src="${img_path+e.poster_path } " alt="">
            </div>
            <div class="info">
                <h2> ${movie.title}</h2>
                <div class="single-info">
                    <span>Rate:</span>
                    <span>${movie.vote_average}/10</span>
       
                </div>
             </div>
                <div class="info">
                
                   <div class="single-info">
                      <span> Release Date  :</span>
                      <span>${movie.release_date} </span>
                      
                   </div>
                    
                </div>
            
               
           </div>
           
               `;
              
            })
          
       })
  }
 

  async function movieInput(inputValue){
 
    let  URL = `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${inputValue}`;
  
 let response= await fetch( URL);
 let data = await response.json();
  console.log(data.results);
 return data.results;

  }
  btn.addEventListener("click",searchMovies);
  async function searchMovies(){
    const inputValue = input.value;
    if (inputValue === "") {
        alert("Please enter the name of MOVIE");
        return;
    }
    const dataTwo = await   movieInput(input.value);
    console.log(dataTwo);
   mainGridTitle.innerText = " RESULTS...";
   mainGrid.innerHTML = dataTwo.map(e => {
      console.log(e.title);
     return `
      <div class=" card" id=" ">
     <div class="img">
        <img src="${img_path+e.poster_path } " alt="">
     </div>
     <div class="info">
         <h2> ${e.title}</h2>
         <div class="single-info">
             <span>Rate:</span>
             <span>${e.vote_average}/10</span>

         </div>
      </div>
         <div class="info">
         
            <div class="single-info">
               <span> Release Date  :</span>
               <span>${e.release_date} </span>
               
            </div>
             
         </div>
      
    </div>
    
        `;
      
     
   }) 
   

 
}