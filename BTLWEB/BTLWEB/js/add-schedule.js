
const scheduleForm = document.getElementById("scheduleForm");
const subject = document.getElementById("subject");
const studyDate = document.getElementById("studyDate");
const room = document.getElementById("room");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const note = document.getElementById("note");
const formMessage = document.getElementById("formMessage");

// Hiển thị thông báo.
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
    formMessage.hidden = false;
}

// Hiển thị các môn trong ô chọn.
function renderSubjects() {
    let courses = getCourses();

    subject.replaceChildren();

    let firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "-- Chọn môn học --";
    subject.appendChild(firstOption);

    for (let i = 0; i < courses.length; i++) {
        let option = document.createElement("option");
        option.value = courses[i].id;
        option.textContent = courses[i].name;
        subject.appendChild(option);
    }
}

// Mặc định ngày học là hôm nay.
function setToday() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");

    studyDate.value = year + "-" + month + "-" + day;
}

// Kiểm tra lịch có bị trùng giờ không.
function checkConflict(date, start, end) {
    let schedules = getSchedules();

    for (let i = 0; i < schedules.length; i++) {
        let item = schedules[i];

        if (item.date === date &&
            start < item.endTime &&
            end > item.startTime) {
            return true;
        }
    }

    return false;
}

// Lưu lịch học mới.
scheduleForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let courseId = subject.value;
    let date = studyDate.value;
    let start = startTime.value;
    let end = endTime.value;

    if (courseId === "" || date === "" ||
        start === "" || end === "") {
        showMessage("Vui lòng điền đầy đủ thông tin bắt buộc.", "error");
        return;
    }

    if (end <= start) {
        showMessage("Giờ kết thúc phải sau giờ bắt đầu.", "error");
        return;
    }

    if (checkConflict(date, start, end)) {
        showMessage("Thời gian này trùng với một lịch học khác.", "error");
        return;
    }

    let schedules = getSchedules();

    schedules.push({
        id: generateId(),
        courseId: courseId,
        date: date,
        startTime: start,
        endTime: end,
        room: room.value.trim(),
        note: note.value.trim()
    });

    saveSchedules(schedules);

    scheduleForm.reset();
    setToday();
    renderSubjects();

    showMessage("Đã lưu lịch học thành công!", "success");
});

// Khởi tạo trang.
renderSubjects();
setToday();
