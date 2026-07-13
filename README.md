# Weekly Church Email Script

A Google Apps Script that sends an automated weekly logistics email to a set list of addresses. It dynamically calculates the date of the upcoming Sunday and conditionally adds reminders for "First Sunday" events (like Communion).

## Features
* **Dynamic Date Calculation:** Determines the date of the upcoming Sunday regardless of what day of the week the script is triggered.
* **First Sunday Detection:** Automatically detects if the upcoming Sunday is the first of the month and appends special instructions. Can be changed to the last Sunday.
* **Centralized Configuration:** Easy-to-edit variables at the top of the script keep personal information out of the main logic block.
* **Modern Formatting:** Uses ES6 Template Literals for safe and readable HTML string construction.

## Prerequisites
* A Google Account
* Access to [Google Apps Script](https://script.google.com/)

## Installation & Setup
1. Go to [Google Apps Script](https://script.google.com/) and create a **New Project**.
2. Name your project (e.g., "Weekly Service Email").
3. Delete any code in the default `Code.gs` file and paste the contents of `weeklyChurchEmail.js` into the editor.
4. Update the `CONFIG` object at the top of the file with your organization's emails, timezone, and Google document links.
5. Click the **Save** icon.

## Automating the Email (Setting a Trigger)
To make this run automatically every week:
1. On the left-hand sidebar of the Apps Script editor, click the **Triggers** icon (alarm clock).
2. Click **+ Add Trigger** in the bottom right corner.
3. Configure the trigger:
   * **Choose which function to run:** `weeklyServiceEmail`
   * **Select event source:** `Time-driven`
   * **Select type of time based trigger:** `Week timer`
   * **Select day of week:** Choose the day you want the email to go out.
   * **Select time of day:** Choose your preferred time window.
4. Click **Save**. *(Google will prompt you to authorize the script to send emails on your behalf).*
