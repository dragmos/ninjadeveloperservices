// Functions
function scroll(hash) {
  var topPos = 0
  
  var value = hash === "#" ? "" : hash
  
  if (value) {
    topPos = document.querySelector(value).getBoundingClientRect().top + window.pageYOffset
  }
  
  window.scrollTo({
    top: topPos, // scroll so that the element is at the top of the view
    behavior: 'smooth' // smooth scroll
  })
}

// Navbar
document.getElementById("nav-btn").addEventListener("click", () => {
  document.getElementById("nav-mobile").classList.toggle("d-block")
})

// Scrolling
// document.querySelectorAll(".nav-link").forEach(el => {
// })

document.querySelectorAll("[href^='#']").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault()
    scroll(e.target.attributes.href.value)
    document.getElementById("nav-mobile").classList.toggle("d-block")
  })
})