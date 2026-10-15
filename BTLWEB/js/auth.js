
 // Kiểm tra trạng thái đăng nhập.
if (sessionStorage.getItem("studytime_logged_in") !== "true") {
    window.location.href = "login.html";
}

// Xử lý khi bấm nút Đăng xuất.
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        sessionStorage.removeItem("studytime_logged_in");
        window.location.href = "login.html";
    });
}
