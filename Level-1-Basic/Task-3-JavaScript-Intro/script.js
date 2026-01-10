document.getElementById("myForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let course = document.getElementById("course").value;

  if(name==="" || email==="" || course===""){
    showModal("Please fill all fields.");
  }
  else{
    showModal("Form Submitted Successfully!");
  }
});

function showModal(message){
  document.getElementById("msg").innerText = message;
  document.getElementById("modal").style.display="flex";
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}
