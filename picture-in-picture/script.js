const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select media stream, pass to video element, then paly
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }

    } catch(error) {
        console.log('oops, error occur: ', error);
    }
}

// button add eventlistener
button.addEventListener('click', () => {
    // disabled button
    button.disabled = true;
    // start picture-in-picture
    videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
})

// on load
selectMediaStream();
