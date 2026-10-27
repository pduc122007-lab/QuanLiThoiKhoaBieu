
const courseCount = document.getElementById("courseCount");
const weekCount = document.getElementById("weekCount");
const upcomingCount = document.getElementById("upcomingCount");
const upcomingList = document.getElementById("upcomingList");


function renderHome() {
    let courses = getCourses();
    let schedules = sortSchedules(getSchedules());

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let monday = new Date(today);
    let day = monday.getDay();

    if (day === 0) {
        monday.setDate(monday.getDate() - 6);
    } else {
        monday.setDate(monday.getDate() - day + 1);
    }

    let sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 7);

    let nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    let thisWeek = [];
    let upcoming = [];

    for (let i = 0; i < schedules.length; i++) {
        let date = parseStudyDate(schedules[i].date);

        if (date >= monday && date < sunday) {
            thisWeek.push(schedules[i]);
        }

        if (date >= today && date < nextWeek) {
            upcoming.push(schedules[i]);
        }
    }

    courseCount.textContent = courses.length;
    weekCount.textContent = thisWeek.length;
    upcomingCount.textContent = upcoming.length;

    renderUpcoming(upcoming);
}


function renderUpcoming(schedules) {
    upcomingList.replaceChildren();

    if (schedules.length === 0) {
        let message = document.createElement("p");
        message.className = "empty-state";
        message.textContent = "Chưa có lịch học sắp tới.";
        upcomingList.appendChild(message);
        return;
    }

    let limit = Math.min(schedules.length, 5);

    for (let i = 0; i < limit; i++) {
        let item = schedules[i];
        let date = parseStudyDate(item.date);

        let row = document.createElement("div");
        row.className = "upcoming-item";

        let dateBox = document.createElement("div");
        dateBox.className = "upcoming-date";

        let number = document.createElement("strong");
        number.textContent = date.getDate();

        let month = document.createElement("span");
        month.textContent = "THÁNG " + (date.getMonth() + 1);

        dateBox.append(number, month);

        let info = document.createElement("div");
        info.className = "upcoming-info";

        let name = document.createElement("strong");
        name.textContent = getCourseName(item.courseId);

        let detail = document.createElement("p");
        detail.textContent = getDayName(item.date) + " · " +
            (item.room || "Chưa có phòng");

        info.append(name, detail);

        let time = document.createElement("div");
        time.className = "upcoming-time";
        time.textContent = item.startTime + " - " + item.endTime;

        row.append(dateBox, info, time);
        upcomingList.appendChild(row);
    }
}

renderHome();
