// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD5DMJ9B3jvN_mMduKkIc-3DXJRGBG32ic",
  authDomain: "ninja-developer-services.firebaseapp.com",
  projectId: "ninja-developer-services",
  storageBucket: "ninja-developer-services.appspot.com",
  messagingSenderId: "828524410767",
  appId: "1:828524410767:web:035d7e09f072d417287dfa",
  measurementId: "G-MNJWNHKJV4"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

var firestore = firebase.firestore()
var db = firestore.collection("messages")

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
document.getElementById("send-form").addEventListener("click", (e) => {
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

  setTimeout(async () => {
    e.target.blur()

    var name = document.querySelector("[name='name']").value
    var data = document.querySelector("[name='data']").value
    var message = document.querySelector("[name='message']").value

    var formData = { name, data, message }
    
    var result = ""
    try {
      await db.doc().set(formData)
      result = "success"
    } catch (e) {
      result = "error"
    } finally {
      document.getElementById("form").classList.add("d-none")
      document.getElementById("msg-" + result).classList.remove("d-none")
      document.getElementById("msg-" + result).classList.add("d-block")
    }
  }, 500)
})

document.getElementById("katana-wrapper").addEventListener("click", function(e) {
  e.preventDefault()
  document.getElementById("katana").classList.toggle("rotate")
})