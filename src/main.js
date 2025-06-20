import { getSpecialDaysForMonth } from './special-days.js';
import { fetchDescription } from './api.js';

// DOM elements
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');
const goBtn = document.getElementById('go-btn');
const calendarGrid = document.getElementById('calendar-grid');
const descriptionModal = document.getElementById('description-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModalBtn = document.getElementById('close-modal-btn');

let currentDate = new Date();
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Renders the calendar for a given month and year
async function renderCalendar(year, month) {
  calendarGrid.innerHTML = '';
  
  // Update the dropdowns to show the current date
  monthSelect.value = month;
  yearSelect.value = year;

  // Get the list of special days for the current month
  const specialDays = await getSpecialDaysForMonth(year, month);

  // Get date information for the current month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Adjust so Monday is the first day of the week (1) and Sunday is the last (7)
  let firstDayOfWeek = firstDayOfMonth.getDay();
  if (firstDayOfWeek === 0) {
    firstDayOfWeek = 7;
  }
  
  // Draw days from the previous month
  const daysFromPrevMonth = firstDayOfWeek - 1;
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('other-month');
    const day = new Date(year, month, 0).getDate() - daysFromPrevMonth + i + 1;
    dayElement.textContent = day;
    calendarGrid.appendChild(dayElement);
  }

  // Draw days for the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElement = document.createElement('div');

    dayElement.textContent = i;

    // Check if the current day 'i' is a special day
    const specialDay = specialDays.find(day => day.date.getDate() === i);
    if (specialDay) {
      dayElement.classList.add('special-day');

      // Store the special day's data directly on the element
      dayElement.dataset.name = specialDay.name;
      dayElement.dataset.descriptionURL = specialDay.descriptionURL;

      // Create and append the tooltip element
      const tooltip = document.createElement('span');
      tooltip.classList.add('tooltip');
      tooltip.textContent = specialDay.name;
      dayElement.appendChild(tooltip);
    }

    calendarGrid.appendChild(dayElement);
  }

  // Draw days from the next month
  const totalCells = daysFromPrevMonth + lastDayOfMonth.getDate();
  const daysFromNextMonth = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('other-month');
    dayElement.textContent = i;
    calendarGrid.appendChild(dayElement);
  }
}

// Fills the dropdowns with month and year options
function populateSelectors() {
  monthNames.forEach((name, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = name;
    monthSelect.appendChild(option);
  });

  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

goBtn.addEventListener('click', () => {
  const selectedYear = parseInt(yearSelect.value, 10);
  const selectedMonth = parseInt(monthSelect.value, 10);
  currentDate = new Date(selectedYear, selectedMonth, 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// A single listener on the grid to handle clicks on special days
calendarGrid.addEventListener('click', async (event) => {
  // Check if the clicked element is a special day
  const clickedDay = event.target.closest('.special-day');

  if (clickedDay) {
    // Retrieve the data we stored on the element
    const name = clickedDay.dataset.name;
    const url = clickedDay.dataset.descriptionURL;

    // Show a loading state in the modal
    modalTitle.textContent = name;
    modalDescription.textContent = "Loading...";
    descriptionModal.classList.remove('hidden');

    // Fetch the real description
    const description = await fetchDescription(url);

    // Update the modal with the fetched content
    modalDescription.textContent = description;
  }
});

// Event listeners to close the modal
function closeModal() {
  descriptionModal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);

descriptionModal.addEventListener('click', (event) => {
  // If the click is on the dark overlay itself, close the modal
  if (event.target === descriptionModal) {
    closeModal();
  }
});

// Close modal with the 'Escape' key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !descriptionModal.classList.contains('hidden')) {
    closeModal();
  }
});

function init() {
  populateSelectors();
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

init();