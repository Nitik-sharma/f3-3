//AIzaSyBdt4RAMzQVbC4ZaGY8Wbfj_ePKBuUJK8Y
const baseUrl="https://www.googleapis.com/youtube/v3";
const APIKey="AIzaSyDkajtlDp-AYBRqr44PoluxMiBMeF2B_6U";

const container=document.getElementById("video-container")

async function getVideos(q){
    const url=`${baseUrl}/search?key=${APIKey}&q=${q}&type=videos&maxResults=20`;
    const response= await fetch(url,{
        method:"get",
    });
    const data = await response.json();
    console.log(data);
    const videos=data.items;
    getVideoData(videos);
   // console.log(videos); 
}
async function getVideoData(videos){
    let videoData=[];
    for(let i=0;i<videos.length;i++){
        const video=videos[i];
        const videoId=video.id.videoId;
        videoData.push(await getVideosDetail(videoId));  
    }
console.log(videoData);  
renderData(videoData);
}
async function getVideosDetail(videoId){
    const url=`${baseUrl}/videos?key=${APIKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
    
    const response= await fetch(url,{
        method:"get",
    });
    const data = await response.json();
    return data.items[0];
    //console.log(data);
}


function renderData(videos){
    container.innerHTML=``;
 for(let i=0;i<videos.length;i++){
    const video=videos[i];
    container.innerHTML+=`
   <div class="video-info" onclick="openVideoDeatils('${video.id}')">
                <div class="video-img">
                    <img src="${video.snippet.thumbnails.high.url}" alt="video title">
                </div>
                <div class="video-desc">
                    <div class="channel-avtar">
                        <img src="assets/img/channel.png" alt="channelavtar">
                    </div>
                    <div class="channel-desc">
                    <div class="video-title">${video.snippet.localized.title}</div>
                        <div class="channel-name">${video.snippet.channelTitle}</div>
                       <div class="viewndtime"> <span>${video.statistics.viewCount} views</span>
                        <span>1 week ago</span>
                    </div></div>
                </div>
               </div>`
 }
}

function openVideoDeatils(videoId){
    localStorage.setItem("videoId",videoId);
    window.open("videoDetails.html");
    
}


function searchstring(){
    const searchstring=document.getElementById("searchitem").value;
    getVideos(searchstring);        
}
getVideos("");
//getVideosDetail("Za_MG36rOgk");