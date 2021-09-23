const shareEpisodeButton=document.getElementById("socialSharePage")
if(shareEpisodeButton!=null)
{shareEpisodeButton.addEventListener("click",event=>{const pageTitle=document.title;const pageLink=document.location;if(navigator.share)
{navigator.share({title:pageTitle,url:pageLink}).then(()=>{console.log("Shared successfully.");}).catch(error=>{console.log("There was an error sharing:",error);});}
else
{console.log("The Web Share API is not supported in your browser.");var share_uri=`https://www.addtoany.com/share#url=${ encodeURI(pageLink)}&title=${ encodeURI(pageTitle)}`;var wo=window.open('about:blank',null,'height=500,width=500');wo.opener=null;wo.location=share_uri;}});}