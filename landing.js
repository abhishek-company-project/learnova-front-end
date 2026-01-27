// UTILITY FUNCTIONS

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentElement.querySelector(".toggle-password");
  const eyeIcon = button.querySelector(".eye-icon");

  if (input.type === "password") {
    input.type = "text";
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  } else {
    input.type = "password";
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  }
}

function showToast(message, type = "success") {
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon =
    type === "success"
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
       </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
       </svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function setLoading(button, isLoading) {
  const btnText = button.querySelector(".btn-text");
  const btnLoader = button.querySelector(".btn-loader");

  if (isLoading) {
    btnText.style.display = "none";
    btnLoader.style.display = "flex";
    button.disabled = true;
  } else {
    btnText.style.display = "inline";
    btnLoader.style.display = "none";
    button.disabled = false;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  const mobileRegex = /^[0-9]{10,15}$/;
  return mobileRegex.test(mobile.replace(/[\s\-]/g, ""));
}

function isValidPassword(password) {
  return password.length >= 8;
}

// LANDING PAGE FUNCTIONS

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    if (!this.classList.contains("toggle-password")) {
      this.style.transform = "translateY(-2px)";
    }
  });

  button.addEventListener("mouseleave", function () {
    if (!this.classList.contains("toggle-password")) {
      this.style.transform = "translateY(0)";
    }
  });
});

const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".feature-icon");
    if (icon) {
      icon.style.color = "#059669";
      icon.style.transform = "scale(1.2) rotate(10deg)";
    }
  });

  card.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".feature-icon");
    if (icon) {
      icon.style.color = "inherit";
      icon.style.transform = "scale(1) rotate(0deg)";
    }
  });
});

const customizationCards = document.querySelectorAll(".customization-card");
customizationCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  setTimeout(() => {
    card.style.transition = "all 0.6s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, index * 100);
});

const integrationCards = document.querySelectorAll(".integration-card");
integrationCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.background = "rgba(5, 150, 105, 0.5)";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-animation 0.6s ease-out";

    this.style.position = "relative";
    this.style.overflow = "hidden";

    const rect = this.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", function () {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const ans = faq.querySelector(".faq-answer");
      ans.style.maxHeight = "0px";
      ans.style.overflow = "hidden";
      ans.style.transition = "max-height 0.3s ease";
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.overflow = "visible";
      answer.style.transition = "max-height 0.3s ease";
    }
  });

  answer.style.maxHeight = "0px";
  answer.style.overflow = "hidden";
  answer.style.transition = "max-height 0.3s ease";
});

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const loginBtn = document.getElementById("loginBtn");

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }

    if (!isValidPassword(password)) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    setLoading(loginBtn, true);

    setTimeout(() => {
      setLoading(loginBtn, false);
      const userData = {
        email: email,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));
      showToast("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }, 1500);
  });
}

// REGISTER FORM
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
    const role = document.getElementById("role").value;
    const terms = document.getElementById("terms").checked;
    const submitBtn = document.getElementById("submitBtn");

    if (username.length < 3) {
      showToast("Username must be at least 3 characters", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }

    if (!isValidPassword(password)) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    if (!isValidMobile(mobile)) {
      showToast("Please enter a valid mobile number", "error");
      return;
    }

    if (!role) {
      showToast("Please select a role", "error");
      return;
    }

    if (!terms) {
      showToast("Please agree to the terms and conditions", "error");
      return;
    }

    setLoading(submitBtn, true);

    setTimeout(() => {
      setLoading(submitBtn, false);
      const userData = {
        username: username,
        email: email,
        mobile: mobile,
        role: role,
        registrationTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }, 1500);
  });
}

// CSS ANIMATIONS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);