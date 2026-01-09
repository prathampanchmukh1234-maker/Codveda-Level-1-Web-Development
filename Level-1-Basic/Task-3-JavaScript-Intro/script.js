function showName() {
    let name = document.getElementById("name").value;
    if(name === ""){
        alert("Please enter your name");
    } else {
        document.getElementById("output").innerHTML = "Hello " + name;
    }
}
