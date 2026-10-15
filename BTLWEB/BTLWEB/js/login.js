
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

// Nếu đã đăng nhập thì chuyển thẳng đến trang chủ.
if (sessionStorage.getItem("studytime_logged_in") === "true") {
    window.location.href = "index.html";
}

// Kiểm tra khi người dùng bấm Đăng nhập.
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let user = username.value.trim();
    let pass = password.value;

    if (user === "admin" && pass === "123456") {
        sessionStorage.setItem("studytime_logged_in", "true");

        window.location.href = "index.html";
    } else {
        loginMessage.textContent =
            "Tên đăng nhập hoặc mật khẩu không đúng.";
        loginMessage.hidden = false;
    }
});
