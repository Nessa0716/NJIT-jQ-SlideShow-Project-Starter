let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 10000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').slideToggle() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer()
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90').toggleClass('rot270');
    $('.details').slideToggle(); // Toggle visibility of .details on click
  });
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', function () {
    showNextPhoto()
  })
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', function () {
    showPrevPhoto()
  })
  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  // Use $.ajax here to request the JSON data from mUrl
  $.ajax({
    type: 'GET',
    url: mUrl,
    success: function (data) {
      mImages = data.images
      swapPhoto()
    }
  });
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurrentIndex] to update the image source and details
  // Update the #photo element's src attribute with the current image's path
  // Update the .location, .description, and .date elements with the current image's details
  startTimer()
  let imgInfo = mImages[mCurrentIndex]
  $('#photo, .name, .description, .date').fadeOut(510);
  setTimeout(() => {
    $('#photo').attr('src', imgInfo.imgPath)
    $('.date').text(`Date: ${imgInfo.ship}`)
    $('.name').text(`Name: ${imgInfo.pilot}`)
    $('.description').text(`Description: ${imgInfo.description}`)
    $('#photo, .name, .description, .date').fadeIn(500);
  }, 500);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex > mImages.length - 1) {
    mCurrentIndex = 0
  }
  swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

let timerInterval;
let countdownInterval
// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  timerInterval = setInterval(() => showNextPhoto(), mWaitTime)
  seconds = 11
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  displayTimer()
  countdownInterval = setInterval(() => displayTimer(), 1000)
}

let seconds = 11
function displayTimer() {
  seconds -= 1
  if (seconds < 0) {
    seconds = 11
  }
  $('#timer').text(`Time Before Automatically Moving to the Next: ${seconds}`)
}