var auth = firebase.auth()
async function login(email, password) {
  return await auth.signInWithEmailAndPassword(email, password)
}

$(".btnSubmit").click(async (e) => {
  e.preventDefault()  
  console.log("3")
  var email = $("[name='email']").val()
  var password = $("[name='password']").val()
  
  try {
    await login(email, password)
    console.log("va")
  } catch (e) {
    console.log(e)
  }
})