
const scheduleRows = document.getElementById("scheduleRows");
const dayFilter = document.getElementById("dayFilter");
const emptyMessage = document.getElementById("emptyMessage");

// Hiển thị lịch học.
function renderTimetable() {
    let schedules = sortSchedules(getSchedules());
    let selectedDay = dayFilter.value;

    scheduleRows.replaceChildren();
    let count = 0;

    for (let i = 0; i < schedules.length; i++) {
        let item = schedules[i];
        let date = parseStudyDate(item.date);

        // Bỏ qua lịch không thuộc thứ được chọn.
        if (selectedDay !== "all" &&
            String(date.getDay()) !== selectedDay) {
            continue;
        }

        let row = document.createElement("tr");
        let values = [
            getCourseName(item.courseId),
            getDayName(item.date) + ", " + formatDate(item.date),
            item.startTime + " - " + item.endTime,
            item.room || "Chưa có",
            item.note || "—"
        ];

        for (let j = 0; j < values.length; j++) {
            let cell = document.createElement("td");
            cell.textContent = values[j];
            row.appendChild(cell);
        }

        let actionCell = document.createElement("td");
        let button = document.createElement("button");

        button.className = "action-button";
        button.textContent = "Xóa";
        button.dataset.id = item.id;

        actionCell.appendChild(button);
        row.appendChild(actionCell);
        scheduleRows.appendChild(row);
        count++;
    }

    emptyMessage.hidden = count > 0;
}

// Lọc lịch khi chọn thứ khác.
dayFilter.addEventListener("change", renderTimetable);

// Xóa lịch học.
scheduleRows.addEventListener("click", function(event) {
    let button = event.target.closest("button[data-id]");

    if (!button) {
        return;
    }

    if (!confirm("Bạn có chắc muốn xóa lịch học này?")) {
        return;
    }

    let schedules = getSchedules();
    let newSchedules = [];

    for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].id !== button.dataset.id) {
            newSchedules.push(schedules[i]);
        }
    }

    saveSchedules(newSchedules);
    renderTimetable();
});

renderTimetable();
