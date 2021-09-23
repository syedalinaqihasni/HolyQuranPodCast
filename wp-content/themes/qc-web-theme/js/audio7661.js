
// Takes the track number, gets the URL and plays
// Gets called when user plays a track
function playMP3(trackNumber, $play = true) {


	// Current Track Element and update CSS
	const trackToPlay = getCurrentTrackElement(trackNumber);
	// console.log(trackToPlay);

	const trackToPlayURL = trackToPlay.getAttribute("data-episodeurl");

	// Update URl to Play
	player.source = {
		type: 'audio',
		download: trackToPlayURL,
		sources: [
			{
				src: trackToPlayURL,
				type: 'audio/mp3',
			},
		],
	};

	// You cannot automatically play without a user interaction
	if ($play)
	{
		var playPromise = player.play();

		if (playPromise !== undefined)
		{
			playPromise.then(_ => {
				// Automatic playback started!
				// Show playing UI.
			})
				.catch(error => {
					// Auto-play was prevented
					// Show paused UI.
				});
		}

	}

	// 1. Clear Now Playing
	clearNowPlaying();
	trackToPlay.classList.add("now-playing");

	// 2. Update Now Playing
	updateNowPlaying(trackNumber);

	// 3. Update Post Link [Notes]
	updateEpisodePostLink(trackNumber);

	// 4. Update Current Track - Data Attributes
	updateSocialMediaSharing(trackNumber);
}


/*
		1: Clears now-playing class from the current track element
 */
function clearNowPlaying() {
	// Determine which track is playing
	const nowPlaying = document.getElementsByClassName("now-playing");

	// If the user presses next/previous and no audio is loaded it will return 0 as nothing is playing
	if (nowPlaying.length != 0)
	{
		// get track number
		trackNumber = nowPlaying[0].id;

		// Remove "nowPlaying" Class of the track
		const elementCurrentTrack = getCurrentTrackElement(trackNumber);
		elementCurrentTrack.classList.remove("now-playing");
	}
}


/*
		 2: Update the Now Playing
*/
function updateNowPlaying(trackNumber) {

	// GET
	const elementCurrentTrack = getCurrentTrackElement(trackNumber);
	const currentTrackPostTitle = elementCurrentTrack.querySelectorAll('span')[0].innerText;

	// SET
	const audioNowPlayingSpan = document.getElementById("playingNowDisplay");
	audioNowPlayingSpan.innerText = currentTrackPostTitle;
}



/*
		3: Enables user to Open the Post
*/
function updateEpisodePostLink(trackNumber) {

	// GET
	const elementCurrentTrack = getCurrentTrackElement(trackNumber);

	// SET
	const episodePostLink = document.getElementById("episodePostLink");
	episodePostLink.href = elementCurrentTrack.getAttribute("data-postLink");
}


/*
	 4. Enables user to Share the Current Episode
*/
function updateSocialMediaSharing(trackNumber) {

	// GET
	const elementCurrentTrack = getCurrentTrackElement(trackNumber);
	const postLink = elementCurrentTrack.getAttribute("data-postLink");
	const postTitle = elementCurrentTrack.innerText;

	// SET
	// Update Post Title and Link
	const shareLink = document.getElementById('socialMediaSharingEpisode');
	shareLink.setAttribute('data-post-url', postLink);
	shareLink.setAttribute('data-post-title', postTitle);
	// console.log(shareLink.dataset);
}


// Triggers
// 1. User Presses NEXT
// 2. User Presses PREVIOUS
// 3. Audio Ends
function audioEnded(move = "") {

	//console.log("audioEnded");

	// Pause playback.
	player.pause();

	// Determine which track is playing
	const nowPlaying = document.getElementsByClassName("now-playing");
	trackNumber = nowPlaying[0].id;

	// Determine which track to play next
	let trackToPlay = trackNumber;

	// User pressed PREVIOUS button we need to DECRMENT the track number
	if (move == "previous")
	{
		// if we on track one we do nothing
		if (trackNumber != 1)
		{
			trackToPlay = parseInt(trackNumber) - 1;
		} else
		{
			return;
		}
	}

	// User pressed NEXT button		
	else if (move == "next")
	{

		const totalTracks = document.getElementById("audio-episodes").rows.length;

		// if trackNumber and total tracks is the same, we must go to the 1st track.
		// const totalTracks = clusterize.getRowsAmount();

		if (totalTracks == trackNumber)
		{
			trackToPlay = 1;
		}

		// otherwise we simply increment track number
		else
		{
			trackToPlay = parseInt(trackNumber) + 1;
		}

	}

	// Audio ENDED
	else
	{


		// if trackNumber and total tracks is the same, we do nothing
		// maybe later can we make a repeat button optional
		const totalTracks = document.getElementById("audio-episodes").rows.length;
		// const totalTracks = clusterize.getRowsAmount();

		if (totalTracks == trackNumber)
		{
			return;
		}
		// otherwise simply increment track number
		else
		{
			trackToPlay = parseInt(trackNumber) + 1;
		}

	}


	// Pass track number to playMP3 function
	playMP3(trackToPlay);
}


/*
		Many Functions need to get the Current Track
		In case I change  the ID I only need to update it here
*/
function getCurrentTrackElement($trackNumber) {
	return document.getElementById($trackNumber);
}



// 
// https://www.ctrl.blog/entry/addtoany-web-share.html
function socialMediaSharingEpisode() {

	// Share Episode Button - Event Listener
	const shareButton = document.getElementById("socialMediaSharingEpisode")

	// On the Single Page we don't need this JS
	if (shareButton != null)
	{

		shareButton.addEventListener("click", event => {

			// Get Post Title
			const episodeTitle = shareButton.getAttribute("data-post-title");

			// Get Post URL
			const episodePostLink = shareButton.getAttribute("data-post-url");

			if (navigator.share)
			{
				navigator
					.share({
						title: episodeTitle,
						url: episodePostLink
					})
					.then(() => {
						// console.log("Shared successfully.");
					})
					.catch(error => {
						// console.log("There was an error sharing:", error);
					});
			}

			/*
							Use AddToAny as a FallBack
			*/
			else
			{
				// console.log("The Web Share API is not supported in your browser.");

				var share_uri = `https://www.addtoany.com/share#url=${ encodeURI(episodePostLink) }&title=${ encodeURI(episodeTitle) }`;

				var wo = window.open(
					'about:blank',
					null,
					'height=500,width=500'
				);
				wo.opener = null;
				wo.location = share_uri;
			}
		});
	}
}



// Events after Page Loads
window.onload = () => {

	// Social Media Share - Audio (Event Listener)
	socialMediaSharingEpisode();

	player.on('ended', event => {
		const instance = event.detail.plyr;
		audioEnded();
		// console.log("audio ended");
	});
}
