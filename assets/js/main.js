// Fixes...
window.scrollTo({top:0})

if (window.innerWidth < 294) {
  document.querySelector(".header-overlay").style.height =  document.getElementById("ninja-developer").clientHeight + "px"
}



// Functions
function scroll(hash) {
  var topPos = 0
  
  var value = hash === "#" ? "" : hash
  
  if (value) {
    topPos = document.querySelector(value).getBoundingClientRect().top + window.pageYOffset
  }
  
  window.scrollTo({ top: topPos, behavior: 'smooth' })
}

// Navbar
document.getElementById("nav-btn").addEventListener("click", () => {
  document.getElementById("nav-mobile").classList.toggle("d-block")
})

// Scrolling (links)
document.querySelectorAll("[href^='#']").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault()
    scroll(e.target.attributes.href.value)
    document.getElementById("nav-mobile").classList.toggle("d-block")
  })
})

// Scrolling
document.addEventListener('scroll', function() {
  if (window.scrollY === 0) {
    document.querySelector("nav").classList.add("border-0")
    document.querySelector("nav").classList.remove("bg-dark")
    return
  }
  document.querySelector("nav").classList.remove("border-0")
  document.querySelector("nav").classList.add("bg-dark")
})