
const DEFAULT_COURSES = [
    { id: "1", name: "Kiến trúc và tổ chức máy tính", code: "KTMT" },
    { id: "2", name: "Lập trình hướng đối tượng", code: "OOP" },
    { id: "3", name: "Thiết kế Web", code: "WEB" },
    { id: "4", name: "Toán rời rạc", code: "TRR" },
    { id: "5", name: "Cấu trúc dữ liệu và giải thuật", code: "CTDL" }
];

// Lấy danh sách môn học.
function getCourses() {
    let data = localStorage.getItem("studytime_courses");

    if (data === null) {
        saveCourses(DEFAULT_COURSES);
        return DEFAULT_COURSES;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Lưu danh sách môn học.
function saveCourses(courses) {
    localStorage.setItem("studytime_courses", JSON.stringify(courses));
}

// Lấy danh sách lịch học.
function getSchedules() {
    let data = localStorage.getItem("studytime_schedules");

    if (data === null) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Lưu danh sách lịch học.
function saveSchedules(schedules) {
    localStorage.setItem("studytime_schedules", JSON.stringify(schedules));
}

// Tạo mã riêng cho dữ liệu.
function generateId() {
    return Date.now().toString();
}

// Tìm tên môn theo mã môn.
function getCourseName(courseId) {
    let courses = getCourses();

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
            return courses[i].name;
        }
    }

    return "Môn học đã bị xóa";
}

// Chuyển chuỗi ngày thành Date.
function parseStudyDate(value) {
    let parts = value.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

// Hiển thị ngày theo dạng ngày/tháng/năm.
function formatDate(value) {
    let date = parseStudyDate(value);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");

    return day + "/" + month + "/" + date.getFullYear();
}

// Lấy tên thứ.
function getDayName(value) {
    let day = parseStudyDate(value).getDay();

    if (day === 0) {
        return "Chủ nhật";
    }

    return "Thứ " + (day + 1);
}

// Sắp xếp lịch theo ngày và giờ.
function sortSchedules(schedules) {
    schedules.sort(function(a, b) {
        if (a.date !== b.date) {
            return a.date.localeCompare(b.date);
        }

        return a.startTime.localeCompare(b.startTime);
    });

    return schedules;
}

// Khởi tạo danh sách môn học khi mở trang.
getCourses();
