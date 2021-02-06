// Functions
function scroll(hash) {
  var topPos = 0
  
  var value = hash === "#" ? "" : hash
  
  if (value) {
    topPos = document.querySelector(value).getBoundingClientRect().top + window.pageYOffset
  }
  
  window.scrollTo({ top: topPos, behavior: 'smooth' })
}

function toggleNavbarOpacityIfIsOnTop() {
  var isOpen = document.getElementById("nav-mobile").classList.contains("d-block")
  
  if (isOpen) return
  
  if (window.scrollY === 0) {
    document.querySelector("nav").classList.add("border-bottom")
    document.querySelector("nav").classList.remove("bg-dark")
    document.querySelector("nav").classList.remove("navbar-border-dark")
    document.querySelector("nav").classList.add("navbar-border-white")
    return
  }
  document.querySelector("nav").classList.remove("border-bottom")
  document.querySelector("nav").classList.add("bg-dark")
  document.querySelector("nav").classList.add("navbar-border-dark")
}

// Navbar button toggle
document.getElementById("nav-btn").addEventListener("click", () => {
  var isOpen = document.getElementById("nav-mobile").classList.toggle("d-block")
  if (isOpen) {
    document.querySelector("nav").classList.add("bg-dark")
    document.querySelector("nav").classList.add("navbar-border-dark")
    return
  }
  toggleNavbarOpacityIfIsOnTop()
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

