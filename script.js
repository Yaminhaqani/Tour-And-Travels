const scrollToTopBtn = document.getElementById("scrollToTopBtn");
let loader = document.querySelector(".loader");
let nav = document.querySelector(".nav");
let ham = document.querySelector(".ham");
let links = document.querySelector(".links");
let line = document.querySelectorAll(".line");
let currentURL = location.href;



// LOADER STARTS
window.addEventListener("load", () => {
  if (loader) {
    loader.remove();
  }
  nav.style.display = "flex";
});
// LOADER ENDS

// ScrollTop Starts

// Control visibility based on scrolling
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > window.innerHeight ||
    document.documentElement.scrollTop > window.innerHeight
  ) {
    scrollToTopBtn.style.display = "block"; // Show button
  } else {
    scrollToTopBtn.style.display = "none"; // Hide button
  }
});

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

 // When the button is clicked, trigger the scrollToTop function
 scrollToTopBtn.addEventListener("click", scrollToTop);

//ScrollTop Ends



//HAM STARTS
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let click = true;

ham.addEventListener("click", function () {
  if (click) {
    one.style.transform = "rotate(45deg)";
    three.style.transform = "rotate(-45deg)";
    two.style.opacity = "0";
    line.forEach((e) => (e.style.width = "82%"));

    setTimeout(() => {
      links.style.display = "flex";
      links.style.left = "0"; // Slide into view
      links.style.opacity = "1"; // Fade in
    }, 200);

    click = false;
  } else {
    one.style.transform = "rotate(0deg)";
    three.style.transform = "rotate(0deg)";
    two.style.opacity = "1";
    click = true;
    line.forEach((e) => (e.style.width = "100%"));

    setTimeout(() => {
      links.style.left = "-100%"; // Slide out of view
      links.style.opacity = "0"; // Fade out
    }, 200);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    links.style.display = "block"; // Show links on wider screens
    links.style.left = "0"; // Ensure it is visible
    links.style.opacity = "1";
  } else {
    links.style.display = "none";
  }
});
//HAM ENDS

// COUNT UP ANIMATION

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter-cards");

  const countUp = (counter, duration) => {
    const countElement = counter.querySelector("h2");
    const targetCount = parseInt(counter.getAttribute("data-count"));
    const incrementTime = Math.max(duration / targetCount, 10); // Calculate time for each increment, ensure a minimum of 10ms
    let count = 0;

    const updateCount = () => {
      if (count < targetCount) {
        count++;
        // Update only the numeric part of the count while keeping "K" and "+" intact
        countElement.textContent = count + countElement.textContent.slice(-1); // Append K and + from original
        setTimeout(updateCount, incrementTime);
      } else {
        // Ensure the final value is displayed properly
        countElement.textContent =
          targetCount + countElement.textContent.slice(-1); // Final value with K and +
      }
    };

    updateCount();
  };

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class for fading in effect
        entry.target.classList.add("visible");
        countUp(entry.target, 2000); // Start count-up with 2000ms duration for this specific card
        observer.unobserve(entry.target); // Stop observing once counted
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  counters.forEach((counter) => observer.observe(counter));
});

// COUNT UP ENDS

//FORM STARTS
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Create a FormData object to gather form data
  const formData = new FormData(this);

  // Fetch call to Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbwSLwXakxYesWKl47UQAGPEmNy3AphgHj5qnm155UUWHdjWGKPVszWI44IFYQ7FRYkF/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Form submitted successfully! We will contact you shortly.");
      } else {
        alert(
          "Error submitting the form. Please try again later or contact us on +919018312187."
        );
      }
    })
    .catch((error) => {
      alert(
        "Error submitting the form. Please try again later or contact us on +919018312187"
      );
    });
});
//FORM ENDS

//Animation observer starts
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const animatedElements = document.querySelectorAll(".animate__animated");

  // Observer options
  const observerOptions = {
    root: null, // Observe elements relative to the viewport
    threshold: 0.20, // Trigger when 20% of the element is visible
  };

  // Callback for the observer
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the animation class stored in the data-animate attribute
        const animationClass = entry.target.getAttribute("data-animate");

        if (animationClass) {
          // Add the animation class dynamically
          entry.target.classList.add("animate__animated", animationClass);

          // Ensure the element is visible once the animation starts
          entry.target.style.visibility = "visible";
          entry.target.style.opacity = "1"; // Ensure full opacity
        }

        // Stop observing the element after it animates
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Function to start observing the elements after the loader disappears
  function startObservingAfterLoader() {
    if (loader) {
      loader.style.display = "none"; // Hide loader
    }

    // Once loader is hidden, start observing elements
    animatedElements.forEach((element) => {
      element.style.visibility = "hidden"; // Start with hidden visibility
      element.style.opacity = "0"; // Start with zero opacity

      // Start observing elements for animation when loader is gone
      observer.observe(element);
    });
  }

  // Wait until the loader disappears (or after DOM is loaded) to start observing
  window.addEventListener("load", startObservingAfterLoader);
});


//Animation observer ends
