function playMP3(trackNumber,$play=true){const trackToPlay=getCurrentTrackElement(trackNumber);const trackToPlayURL=trackToPlay.getAttribute("data-episodeurl");player.source={type:'audio',download:trackToPlayURL,sources:[{src:trackToPlayURL,type:'audio/mp3',},],};if($play)
{var playPromise=player.play();if(playPromise!==undefined)
{playPromise.then(_=>{}).catch(error=>{});}}
clearNowPlaying();trackToPlay.classList.add("now-playing");updateNowPlaying(trackNumber);updateEpisodePostLink(trackNumber);updateSocialMediaSharing(trackNumber);}
function clearNowPlaying(){const nowPlaying=document.getElementsByClassName("now-playing");if(nowPlaying.length!=0)
{trackNumber=nowPlaying[0].id;const elementCurrentTrack=getCurrentTrackElement(trackNumber);elementCurrentTrack.classList.remove("now-playing");}}
function updateNowPlaying(trackNumber){const elementCurrentTrack=getCurrentTrackElement(trackNumber);const currentTrackPostTitle=elementCurrentTrack.querySelectorAll('span')[0].innerText;const audioNowPlayingSpan=document.getElementById("playingNowDisplay");audioNowPlayingSpan.innerText=currentTrackPostTitle;}
function updateEpisodePostLink(trackNumber){const elementCurrentTrack=getCurrentTrackElement(trackNumber);const episodePostLink=document.getElementById("episodePostLink");episodePostLink.href=elementCurrentTrack.getAttribute("data-postLink");}
function updateSocialMediaSharing(trackNumber){const elementCurrentTrack=getCurrentTrackElement(trackNumber);const postLink=elementCurrentTrack.getAttribute("data-postLink");const postTitle=elementCurrentTrack.innerText;const shareLink=document.getElementById('socialMediaSharingEpisode');shareLink.setAttribute('data-post-url',postLink);shareLink.setAttribute('data-post-title',postTitle);}
function audioEnded(move=""){player.pause();const nowPlaying=document.getElementsByClassName("now-playing");trackNumber=nowPlaying[0].id;let trackToPlay=trackNumber;if(move=="previous")
{if(trackNumber!=1)
{trackToPlay=parseInt(trackNumber)-1;}else
{return;}}
else if(move=="next")
{const totalTracks=document.getElementById("audio-episodes").rows.length;if(totalTracks==trackNumber)
{trackToPlay=1;}
else
{trackToPlay=parseInt(trackNumber)+1;}}
else
{const totalTracks=document.getElementById("audio-episodes").rows.length;if(totalTracks==trackNumber)
{return;}
else
{trackToPlay=parseInt(trackNumber)+1;}}
playMP3(trackToPlay);}
function getCurrentTrackElement($trackNumber){return document.getElementById($trackNumber);}
function socialMediaSharingEpisode(){const shareButton=document.getElementById("socialMediaSharingEpisode")
if(shareButton!=null)
{shareButton.addEventListener("click",event=>{const episodeTitle=shareButton.getAttribute("data-post-title");const episodePostLink=shareButton.getAttribute("data-post-url");if(navigator.share)
{navigator.share({title:episodeTitle,url:episodePostLink}).then(()=>{}).catch(error=>{});}
else
{var share_uri=`https://www.addtoany.com/share#url=${ encodeURI(episodePostLink)}&title=${ encodeURI(episodeTitle)}`;var wo=window.open('about:blank',null,'height=500,width=500');wo.opener=null;wo.location=share_uri;}});}}
window.onload=()=>{socialMediaSharingEpisode();player.on('ended',event=>{const instance=event.detail.plyr;audioEnded();});}