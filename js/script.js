// Toggle mobile menu
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  });

  // Load saved theme
  window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeToggle.querySelector('i').className = 'fas fa-sun';
    }
  });
}

// Animate counters when in view
const counters = document.querySelectorAll('.counter');
function activateCounter() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 200;
    const step = target / speed;
    let current = 0;

    const updateCounter = () => {
      if (current < target && isInViewport(counter)) {
        current += step;
        counter.innerText = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    if (isInViewport(counter)) updateCounter();
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
}

window.addEventListener('scroll', activateCounter);
window.addEventListener('load', activateCounter);

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
}

// Update food waste slider display
document.getElementById("foodWaste")?.addEventListener("input", function () {
  document.getElementById("foodWasteValue").textContent = this.value + "%";
});

// Quiz Feedback
function checkAnswer(isTrue) {
  const feedback = document.getElementById("quizFeedback");
  if (!isTrue) {
    feedback.innerHTML = "<p>✅ Correct! Recycling helps, but reducing use is even better.</p>";
  } else {
    feedback.innerHTML = "<p>❌ Not quite. We need to reduce first, recycle second.</p>";
  }
  feedback.style.display = "block";
}

// Impact Calculator
document.getElementById("impactForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const bottles = parseInt(document.getElementById("bottles").value) || 0;
  const foodWaste = parseInt(document.getElementById("foodWaste").value);
  const recycles = document.getElementById("recycles").value;

  let score = 0;
  let tips = [];

  score += (50 - bottles); // Less bottles = better
  score += (50 - foodWaste);
  if (recycles === "yes") score += 30;
  else if (recycles === "sometimes") score += 10;

  if (bottles > 5) tips.push("Try switching to a reusable water bottle.");
  if (foodWaste > 60) tips.push("Plan meals ahead to reduce food waste.");
  if (recycles !== "yes") tips.push("Set up a recycling bin at home.");

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>Your Sustainability Score: ${Math.max(0, Math.min(100, score))}/100</h3>
    <p><strong>Actions you're taking:</strong></p>
    <ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
    <p>Small changes lead to big impacts!</p>
  `;
  resultDiv.style.display = "block";
});

// Contact Form Validation
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !message) {
    status.textContent = "❌ Please fill out all required fields.";
    status.style.color = "red";
    return;
  }

  if (!validateEmail(email)) {
    status.textContent = "❌ Please enter a valid email address.";
    status.style.color = "red";
    return;
  }

  status.textContent = "✅ Thank you! Your message has been sent.";
  status.style.color = "#2e7d32";
  this.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}