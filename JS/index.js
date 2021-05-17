/* Validation Form */
var form = document.getElementById('register-form');
var username = document.getElementById('username');
var password = document.getElementById('password');
var email = document.getElementById('email');
var age = document.getElementById('age');

function clearMsg(id) {
    document.getElementById(id).innerHTML = "";
}

function setErrorFor(input, message) {
  var formControl = input.parentElement;
  var para = formControl.querySelector("p");

  para.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  var formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkInputs() {

    var usernameValue = username.value.trim();
    var emailValue = email.value.trim();
    var passwordValue = password.value.trim();
    var ageValue = age.value.trim();
    var reg1 = /[0-9]/;
    var reg2 = /[a-z]/;
    var at_position = emailValue.indexOf("@");
    var dot_position = emailValue.lastIndexOf(".");

    // Username
    if (usernameValue == "")
    {
      setErrorFor(username, "username must be filled in");
      username.focus();
      return false;
    }
    else
    {
      setSuccessFor(username);
    }

    // Email
    if (emailValue == "")
    {
      setErrorFor(email, "email must be filled in")
      email.focus();
      return false;
    }
    else if (at_position < 1 || (dot_position - at_position < 2))
    {
      setErrorFor(email, "enter correct email");
      email.focus();
      return false;
    }
    else
    {
      setSuccessFor(email);
    }

    // Password
    if (passwordValue == "")
    {
      setErrorFor(password, "password must be filled in");
      password.focus();
      return false;
    }
    else if (!reg1.test(passwordValue) || !reg2.test(passwordValue))
    {
      setErrorFor(password,"password must contain at least 1 number and 1 character");
      email.focus();
      return false;
    }
    else
    {
      setSuccessFor(password)
    }

    // Age
    if (ageValue == "")
    {
      setErrorFor(age, "age must be filled in");
      age.focus();
      return false;
    }

    else if (!reg1.test(ageValue))
    {
      setErrorFor(age, "age must be an number")
      age.focus();
      return false;
    }
    else
    {
      setSuccessFor(age)
    }
}

/* Navigation */
var header = document.querySelector("header");
var navChange = document.querySelector(".content");

var navChangeOptions = {
  rootMargin: "-150px 0px 0px 0px"
};

var navChangeObserver = new IntersectionObserver(function(
  entries,
  navChangeObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting)
    {
      header.classList.add("nav-scrolled");
    }
    else
    {
      header.classList.remove("nav-scrolled");
    }
  });
},
navChangeOptions);

navChangeObserver.observe(navChange);

/* Slider */
var slides = document.querySelector(".inner-slider-container").children;
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var index = 0;

function autoPlay() {
  nextSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  }
  else {
    index ++;
  }
  changeSlide();
}

function changeSlide() {
  for(i=0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
}

timer = setInterval(autoPlay, 5000);

function prevSlide() {
  if (index == 0) {
    index = slides.length - 1;
  }
  else {
    index --;
  }
  changeSlide();
}

prev.addEventListener("click", function() {
  prevSlide();
  resetTimer();
});

next.addEventListener("click", function() {
  nextSlide();
  resetTimer();
});

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoPlay, 5000);
}
