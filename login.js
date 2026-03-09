
function login(){
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    const username = usernameInput.value
    const password = passwordInput.value

    if(username ==="" || password === "" ){
        alert("Please Enter your username and Password")
        return ;
    }
    if(username === "admin" && password === "admin123") {
        alert("Login successful")
        window.location.href = "main-page.html"
    }
    else{
        alert("Invalid Username or Password")
        usernameInput.value = ""
        passwordInput.value = ""
    }
}
