function login() {
    let email = document.getElementById('username').value
    let password = document.getElementById('password').value
    let status = false
    for (let key of logins) {
        if (key[0] === email && key[1] === password) {
            localStorage.setItem('login', key[0])
            status = true
            break
        }
    }
    if (!status) {
        document.getElementById('status-login').innerHTML = "Email/Password Salah!"
        setTimeout(function () {
            document.getElementById('status-login').innerHTML = ''
        }, 1000)
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
    setTimeout(function () {
        document.getElementById('status-signup').innerHTML = ''
    }, 1000)
}
checks()