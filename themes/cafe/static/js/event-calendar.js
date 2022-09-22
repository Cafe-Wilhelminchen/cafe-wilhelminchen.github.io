const CALENDAR_API_KEY = "AIzaSyDhMuN1rKcFmVVAK4eSGww5vMpyu5MYRj0";
const CALENDAR_ID = "fb8pavce2k8cvbh0uisluh8c04@group.calendar.google.com";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}`);
    const data = await response.json();
    console.log(data);
}
