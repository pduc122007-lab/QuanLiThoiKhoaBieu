
const courseForm = document.getElementById("courseForm");
const courseName = document.getElementById("courseName");
const courseCode = document.getElementById("courseCode");
const courseSearch = document.getElementById("courseSearch");
const courseRows = document.getElementById("courseRows");
const courseSummary = document.getElementById("courseSummary");
const courseEmpty = document.getElementById("courseEmpty");

// Hiển thị danh sách môn học.
function renderCourses() {
    let courses = getCourses();
    let schedules = getSchedules();
    let keyword = courseSearch.value.trim().toLowerCase();

    courseRows.replaceChildren();
    courseSummary.textContent = "Hiện có " + courses.length + " môn học.";

    let countShown = 0;

    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];

        if (
            !course.name.toLowerCase().includes(keyword) &&
            !course.code.toLowerCase().includes(keyword)
        ) {
            continue;
        }

        let count = 0;

        for (let j = 0; j < schedules.length; j++) {
            if (schedules[j].courseId === course.id) {
                count++;
            }
        }

        let row = document.createElement("tr");
        row.innerHTML =
            "<td>" + (countShown + 1) + "</td>" +
            "<td></td><td></td><td>" + count + "</td>" +
            '<td><button class="action-button" data-id="' +
            course.id + '">Xóa</button></td>';

        // Đưa tên và mã vào bằng textContent.
        row.children[1].textContent = course.name;
        row.children[2].textContent = course.code || "—";

        courseRows.appendChild(row);
        countShown++;
    }

    courseEmpty.hidden = countShown > 0;
}

// Thêm môn học.
courseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = courseName.value.trim();
    let code = courseCode.value.trim();
    let courses = getCourses();

    if (name === "") {
        alert("Vui lòng nhập tên môn học.");
        return;
    }

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase() === name.toLowerCase()) {
            alert("Môn học này đã tồn tại.");
            return;
        }

        if (code !== "" &&
            courses[i].code.toLowerCase() === code.toLowerCase()) {
            alert("Mã môn học đã được sử dụng.");
            return;
        }
    }

    courses.push({
        id: generateId(),
        name: name,
        code: code
    });

    saveCourses(courses);
    courseForm.reset();
    renderCourses();
});

// Tìm kiếm khi nhập.
courseSearch.addEventListener("input", renderCourses);

// Xóa môn học và các lịch liên quan.
courseRows.addEventListener("click", function(event) {
    let button = event.target.closest("button[data-id]");

    if (!button) {
        return;
    }

    if (!confirm("Xóa môn học này và các lịch liên quan?")) {
        return;
    }

    let id = button.dataset.id;
    let courses = getCourses();
    let schedules = getSchedules();

    let newCourses = [];
    let newSchedules = [];

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id !== id) {
            newCourses.push(courses[i]);
        }
    }

    for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].courseId !== id) {
            newSchedules.push(schedules[i]);
        }
    }

    saveCourses(newCourses);
    saveSchedules(newSchedules);
    renderCourses();
});

renderCourses();
