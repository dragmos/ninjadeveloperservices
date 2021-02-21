$(document).ready(function(){
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
  
  var auth = firebase.auth()
  var firestore = firebase.firestore()
  var db = firestore.collection("messages")
  
  function noMessagesWarning() {
    $("#messages").html("<h4 class='mx-auto'>No hay mensajes todavía</h4>")
  }
  
  async function deleteMessage(id, name) {
    if (confirm("Seguro que quieres eliminar el mensaje de " + name)) {
      await db.doc(id).delete()
      $(`[data-card-id='${id}']`).remove()
      if ($(".card").length === 0) {
        noMessagesWarning()
      }
    }
  }
  
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      $("app").load("panel.html")

      try {
        var querySnapshot = await db.get()
        
        if (querySnapshot.docs.length === 0) {
          noMessagesWarning()
          return
        }
        
        querySnapshot.forEach(function(doc) {
          var { message, data, date, name } = doc.data()

          $("#messages").append(`
            <div class="col-12 col-md-6" data-card-id="${doc.id}">
            <div class="card border-dark mb-3 shadow">
            <div class="card-header">${name}
            <img class="icon float-right delete" src="assets/icons/delete.svg" alt="Aplications icon" data-id="${doc.id}" data-name="${name}">
            </div>
            
            <div class="card-body text-dark">
            <p class="card-text">${message}</p>
            <p class="card-text">Información de contacto: ${data}</p>
            </div>
            <div class="card-footer">Fecha: ${date}</div>
            </div>
            </div>
            `)
        })
        
        
        $(".delete").click(async (e) => {
          try {
            deleteMessage(e.target.dataset.id, e.target.dataset.name)
          } catch (e) {
            console.error("Error removing document: ", error)
          }
        })
      } catch (e) {
        console.log("no se pueden recuperar los mensajes")
      } finally {
        $(".logout").click(async () => {
          if (confirm("Quieres salir del panel de control?")) {
            await firebase.auth().signOut()
          }
        })
      }
    } else {
      $("app").load("login.html")
    }
  })

})