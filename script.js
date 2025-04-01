
     window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");

    // Try autoplay (some browsers allow muted autoplay)
    audio.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction...");

      // Unmute & play after user clicks anywhere
      document.body.addEventListener("click", () => {
        audio.muted = false; // Unmute
        audio.volume = 1.0; // Set volume to max
        audio.play();
      }, { once: true }); // Run only once
    });
  });
    const correctWord = "LOVELANGUAGE"; // Change this to the correct answer
const selectors = document.querySelectorAll(".letter-selector");

// Populate letter selectors with draggable scrolling
selectors.forEach((selector, index) => {
    let letters = "♡ADEFGKLMNOPTQUVXZ".split(""); // Alphabet
    let position = 0; // Start at first letter
    selector.textContent = letters[position];

    let startY = 0;
    let isDragging = false;

    // Handle touch/mouse drag start
    selector.addEventListener("mousedown", (e) => startDrag(e));
    selector.addEventListener("touchstart", (e) => startDrag(e.touches[0]));

    function startDrag(event) {
        isDragging = true;
        startY = event.clientY || event.pageY;
    }

    // Handle dragging motion
    document.addEventListener("mousemove", (e) => moveDrag(e));
    document.addEventListener("touchmove", (e) => moveDrag(e.touches[0]));

    function moveDrag(event) {
        if (!isDragging) return;

        let deltaY = startY - (event.clientY || event.pageY);

        if (Math.abs(deltaY) > 10) { // Sensitivity threshold
            position = (position + (deltaY > 0 ? 1 : -1) + letters.length) % letters.length;
            selector.textContent = letters[position];
            startY = event.clientY || event.pageY;
        }
    }

    // Stop dragging when user releases
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("touchend", () => isDragging = false);
});

// Confirm button logic
document.getElementById("confirm-btn").addEventListener("click", () => {
    let enteredWord = Array.from(selectors).map(el => el.textContent).join("");
    let popup = document.getElementById("popup");
    let popupText = document.getElementById("popup-text");
    let closePopupBtn = document.getElementById("close-popup");


    if (enteredWord === correctWord) {
        popupText.textContent = "₊˚⊹♡ Unlocking Love♡⊹˚₊";
        closePopupBtn.textContent = "Continue?";  // Change button text to "Play More"
        document.body.classList.remove("grayscale"); // Remove greyscale if correct answer
    } else {
         // Clear previous text to avoid duplication
        popupText.innerHTML = '';
        const firstLine = document.createElement("div");
        firstLine.textContent = "404"; 
        firstLine.style.marginTop = "5px"; // Apply 5px margin to the top of the "404" text
        const secondLine = document.createElement("div");
        secondLine.textContent = "Love Not Found.ᐟ"; // This is the second line.
        popupText.appendChild(secondLine); // Adds the second line.
        // popupText.style.marginTop = "5px";
        closePopupBtn.textContent = "Try Again";  // Keep button text as "Try Again"
        document.body.classList.add("grayscale"); // Apply greyscale if wrong answer
        popup.classList.remove('error-popup'); // Remove error class if any
    }

    popup.style.display = "block";
});

// Close popup and reset greyscale effect
document.getElementById("close-popup").addEventListener("click", function() {
    let closePopupBtn = document.getElementById("close-popup"); // Define the button inside the function

    if (closePopupBtn.textContent === "Continue?") {
        window.location.href = "https://ibighit.com/txt/kor/discography/"; // Redirects when unlocked
    } else {
        document.getElementById("popup").style.display = "none";
        document.body.classList.remove("grayscale"); // Reset greyscale after closing the popup
    }
})

</style>
</html>
