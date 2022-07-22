function login() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    for (let key of logins) {
        if (key[0] === email && key[1] === password) {
            localStorage.setItem('login', key[0])
            break
        } else {
            document.getElementById('status-login').innerHTML = "Email/Password Salah!"
        }
    }
    checks()
}
function checks() {
    if (localStorage.getItem('login')) {
        window.location.href = "index.html"
    }
}
function signup() {
    let user = document.getElementById('user').value
    let pwd = document.getElementById('pwd').value
    logins.push([user,pwd])
    document.getElementById('status-signup').innerHTML = "Register Berhasil!"
}
checks()