document.addEventListener("DOMContentLoaded", init);

async function init() {
    const response = await fetch(`https://cafe.students-htw.de/calendar-api/`);
    const data = await response.json();
    console.log(data);
}
