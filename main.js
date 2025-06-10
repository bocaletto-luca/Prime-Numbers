 "use strict";
    // --- TAB NAVIGATION ---
    function openTab(evt, tabName) {
      const tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++){
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();
    
    // --- UTILITY FUNCTION: Check if a number is prime ---
    function isPrime(num) {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }
    
    // --- CHECKER TAB ---
    function checkPrime() {
      const value = parseInt(document.getElementById("checkerInput").value);
      const resultDiv = document.getElementById("checkerResult");
      if (isNaN(value) || value < 1) {
        resultDiv.innerHTML = "<p>Please enter a valid positive integer.</p>";
        return;
      }
      if (isPrime(value)) {
        resultDiv.innerHTML = `<p>${value} is a prime number.</p>`;
      } else {
        resultDiv.innerHTML = `<p>${value} is not a prime number.</p>`;
      }
    }
    
    // --- LIST TAB ---
    function listPrimes() {
      const maxValue = parseInt(document.getElementById("listMax").value);
      const resultDiv = document.getElementById("listResult");
      if (isNaN(maxValue) || maxValue < 2) {
        resultDiv.innerHTML = "<p>Please enter a valid number (≥ 2).</p>";
        return;
      }
      let primes = [];
      for (let i = 2; i <= maxValue; i++) {
        if (isPrime(i)) primes.push(i);
      }
      resultDiv.innerHTML = `<p>Prime numbers between 2 and ${maxValue}:</p><p>${primes.join(", ")}</p>`;
    }
    
    // --- QUIZ TAB ---
    let quizNumber;  // random number for quiz
    function newQuiz() {
      quizNumber = Math.floor(Math.random() * 100) + 2; // number between 2 and 101
      document.getElementById("quizQuestion").innerHTML = `<p>Is ${quizNumber} a prime number? (Yes/No)</p>`;
      document.getElementById("quizFeedback").innerHTML = "";
      document.getElementById("quizAnswer").value = "";
    }
    function checkQuiz() {
      const answer = document.getElementById("quizAnswer").value.trim().toLowerCase();
      const feedbackDiv = document.getElementById("quizFeedback");
      if (answer !== "yes" && answer !== "no") {
        feedbackDiv.innerHTML = "<p>Please answer with 'Yes' or 'No'.</p>";
        return;
      }
      const primeStatus = isPrime(quizNumber);
      if ((primeStatus && answer === "yes") || (!primeStatus && answer === "no")) {
        feedbackDiv.innerHTML = "<p style='color:green;'>Correct!</p>";
      } else {
        feedbackDiv.innerHTML = `<p style='color:red;'>Incorrect! ${quizNumber} is ${primeStatus ? "" : "not "}a prime number.</p>`;
      }
    }
    
    // --- VISUALIZER TAB ---
    function visualizePrimes() {
      const maxVal = parseInt(document.getElementById("visMax").value);
      const visResult = document.getElementById("visResult");
      if (isNaN(maxVal) || maxVal < 2) {
        visResult.innerHTML = "<p>Please enter a valid number (≥2) for visualization.</p>";
        return;
      }
      
      // Generate list of primes up to maxVal
      let primes = [];
      for (let i = 2; i <= maxVal; i++) {
        if (isPrime(i)) {
          primes.push(i);
        }
      }
      
      visResult.innerHTML = `<p>Found ${primes.length} prime numbers between 2 and ${maxVal}.</p>`;
      const canvas = document.getElementById("primeCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Plot each prime as a small circle along a horizontal axis.
      // Horizontal scaling: from 2 to maxVal maps to canvas.width - 40 (margin 20 each side)
      const margin = 20;
      const availableWidth = canvas.width - 2 * margin;
      const xScale = availableWidth / (maxVal - 2);
      // Vertical center
      const centerY = canvas.height / 2;
      
      ctx.fillStyle = "#007BFF";
      for (let p of primes) {
        const x = margin + (p - 2) * xScale;
        ctx.beginPath();
        ctx.arc(x, centerY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw horizontal axis
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, centerY);
      ctx.lineTo(canvas.width - margin, centerY);
      ctx.stroke();
    }
