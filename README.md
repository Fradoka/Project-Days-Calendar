# Project-Days-Calendar

## Project Description
There are some commemorative days which occur annually, but not on a fixed date.

For example, Ada Lovelace Day happens on the second Tuesday every October.

The date that it occurs is different every year. But it has a fixed pattern.

We have been given a JSON file (days.json) which contains descriptions of several of these days.

The goal of this project is to present this data usefully to users by building a calendar application designed to help users track those commemorative dates. It provides a clear, interactive way to view these dates and offers the convenience of generating an iCal file for easy integration with other calendar applications.

Key Features:
> Display special days for a given month and year.
> Calculate dates for recurring events based on ordinal rules (e.g., 'first Monday').
> Generate an iCal (.ics) file to export dates to other calendars.
> Fetch descriptions for events from an external API (if applicable).

## Live Website
You can view the live deployed version of this project here: https://piscine-days-calendar-project.netlify.app/

## How to Run Locally

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps.

### Prerequisites
You need to have Node.js and npm (Node Package Manager) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Fradoka/Project-Days-Calendar
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd Project-Days-Calendar
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```

### Running Tests (Optional)
To run the test suite and ensure everything is working as expected:
```bash
npm test
```
### How to Generate iCal File

This project includes a script to generate an iCal (.ics) file containing the special days.

1.  **Ensure you have run `npm install`** (as per the "How to Run Locally" instructions).
2.  **Execute the generation script:**
    ```bash
    node generate-ical.mjs
    ```
    This command will typically create a file named `calendar.ics` in your project's root directory.

### Team Credits
This project was developed by:

Fatma Arslantas [AFatmaa];
Franklin D Kamela [Fradoka];
Phone Naing [phonenaing].