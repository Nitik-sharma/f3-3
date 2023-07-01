const baseUrl1="https://www.googleapis.com/youtube/v3";
const APIKey1="AIzaSyBdt4RAMzQVbC4ZaGY8Wbfj_ePKBuUJK8Y";


const videoContainer=document.getElementById("ytvideo");
const videoId=localStorage.getItem("videoId");
videoContainer.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`

const commentsContainer=document.getElementById("comments");

async function getComments(){
   
        const url=`${baseUrl1}/commentThreads?key=${APIKey1}&videoId=${videoId}&maxResults=80&&order=time&part=snippet`;
        const response= await fetch(url,{
            method:"get",
        });
        const data = await response.json();
        const comments=data.items;
        console.log(comments);
        renderComments(comments);
}

function renderComments(comments){
commentsContainer.innerHTML="";
comments.forEach((comments)=>{
commentsContainer.innerHTML+=`
<p>${comments.snippet.topLevelComment.snippet.textDisplay}</p>`
})
}

getComments();