// Functions
function scroll(hash) {
  var topPos = 0

  var value = hash === "#" ? "" : hash

  if (value) {
    topPos = document.querySelector(value).getBoundingClientRect().top + window.pageYOffset
  }

  window.scrollTo({
    top: topPos,
    behavior: 'smooth'
  })
}

function styleNavbarForMobile(isOpen) {

  var toggle = isOpen ? 'add' : 'remove';

  document.querySelector("nav").classList[toggle]("bg-dark", "navbar-border-dark")
  document.querySelector("#nav-mobile").classList[toggle]("fixed-top")
  document.querySelector("#nav-mobile > ul").classList[toggle]("list-group")
  document.querySelectorAll("#nav-mobile > ul > li").forEach(i => i.classList[toggle]("bg-dark", "list-group-item"))

  toggleNavbarOpacityIfIsOnTop()
}

function toggleNavbarOpacityIfIsOnTop() {
  var isOpen = document.getElementById("nav-mobile").classList.contains("d-block")

  if (isOpen) return

  if (window.scrollY === 0) {
    document.querySelector("nav").classList.add("border-bottom", "navbar-border-white")
    document.querySelector("nav").classList.remove("bg-dark", "navbar-border-dark")
    return
  }
  document.querySelector("nav").classList.remove("border-bottom")
  document.querySelector("nav").classList.add("bg-dark", "navbar-border-dark")
}

// Navbar button toggle
document.getElementById("nav-btn").addEventListener("click", () => {
  var isOpen = document.getElementById("nav-mobile").classList.toggle("d-block")

  styleNavbarForMobile(isOpen)
})

// Close navbar on click outside (mobile)
document.addEventListener('click', function(e) {
  var isClickInside = document.querySelector(".navbar").contains(e.target)

  if (!isClickInside) {
    document.getElementById("nav-mobile").classList.remove("d-block")
  }
})

// Scrolling (links)
document.querySelectorAll("[href^='#']").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault()
    scroll(e.target.attributes.href.value)
    document.getElementById("nav-mobile").classList.remove("d-block")
  })
})

// Scrolling change styles on top
document.addEventListener('scroll', function() {
  toggleNavbarOpacityIfIsOnTop()
})

//  Resize event for curious people
window.addEventListener('resize', function(e) {
  styleNavbarForMobile(e.target.innerWidth < 768)
})


// Input Validators

function nameValidation(name = null) {
  if (!name) {
    name = document.querySelector("[name='name']")
  }
  if (name.value.length >= 3) {
    document.querySelector("[name='err-name']").classList.add("d-none")
    return true
  }
  document.querySelector("[name='err-name']").classList.remove("d-none")
  return false
}

function dataValidation(data = null) {
  data = document.querySelector("[name='data']")
  var emailRegex = /\S+@\S+\.\S+/;
  var isEmail = emailRegex.test(data.value)
  
  var phoneRegex = /^[0-9]+$/;
  var isPhone = phoneRegex.test(data.value) && data.value.length >= 9
  
  if (isEmail || isPhone) {
    document.querySelector("[name='err-data']").classList.add("d-none")
    return true
  }
  document.querySelector("[name='err-data']").classList.remove("d-none")
  return false
}

function messageValidation(message = null) {
  message = document.querySelector("[name='message']")
  if (message.value.length >= 3) {
    document.querySelector("[name='err-message']").classList.add("d-none")
    return true
  }
  document.querySelector("[name='err-message']").classList.remove("d-none")
  return false
}


// Send form
document.getElementById("send-form").addEventListener("click", function(e) {
  e.preventDefault()
  
  var someError = false
  
  if (!nameValidation()) {
    document.querySelector("[name='name']").addEventListener("keyup", function(e) {
      nameValidation(e.target)
    })
    someError = true
  }
  
  if (!dataValidation()) {
    document.querySelector("[name='data']").addEventListener("keyup", function(e) {
      dataValidation(e.target)
    })
    someError = true
  }
  
  if (!messageValidation()) {
    document.querySelector("[name='message']").addEventListener("keyup", function(e) {
      messageValidation(e.target)
    })
    someError = true
  }

  if (someError) return
  
  setTimeout(() => {
    e.target.blur()
  
    // TODO:
    // Send message
    // Show success or error msg
  
  
    document.getElementById("form").classList.add("d-none")
  
    document.getElementById("msg-error").classList.remove("d-none")
    document.getElementById("msg-error").classList.add("d-block")
  
  }, 500)
})

document.getElementById("katana-wrapper").addEventListener("click", function(e) {
  e.preventDefault()
  document.getElementById("katana").classList.toggle("rotate")
})





// // google maps
// function initMap() {
//   const uluru = {
//     lat: 41.61529177652071,
//     lng: 2.6612764388289047
//   };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 6,
//     center: uluru,
//   });
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// } 