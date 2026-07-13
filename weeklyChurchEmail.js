// OG Source: https://mccarthydanielle.medium.com/trigger-email-reminders-based-on-dates-in-google-sheets-9aa2060d7aa2#6361
// Reference: https://developers.google.com/apps-script/reference/mail/mail-app

/**
 * CONFIGURATION
 * Update the values below with your organization's specific details.
 */
const CONFIG = {
  timeZone: 'GMT-08', // e.g., 'GMT-08' or 'America/Los_Angeles'
  adminEmail: 'your_email@example.com',
  senderName: 'Sunday Service Team',
  subjectPrefix: ':: Sunday Service',
  toAddresses: 'worship@example.com, projection@example.com, welcome@example.com',
  ccAddresses: 'deacons@example.com',
  slideshowLink: 'https://docs.google.com/presentation/d/YOUR_LINK_HERE/edit',
  newsletterLink: 'https://docs.google.com/document/d/YOUR_LINK_HERE/edit'
};

function weeklyServiceEmail() {
  const today = new Date();

  // Calculate the next Sunday dynamically
  const addDaysToSunday = 7 - today.getDay();
  const nextSunday = new Date(); 
  nextSunday.setDate(today.getDate() + addDaysToSunday);
  
  // Format dates for the subject line and email body
  const nextSundayYYYYMMDD = Utilities.formatDate(nextSunday, CONFIG.timeZone, 'yyyy-MM-dd');
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const nextSundayMMDD = nextSunday.toLocaleString('en-US', options);

  // Determine if it's the first Sunday of the month
  const nextSundayMonth = nextSunday.getMonth();
  const lastSunday = new Date();
  lastSunday.setDate(nextSunday.getDate() - 7);
  const lastSundayMonth = lastSunday.getMonth();
  const isFirstSunday = nextSundayMonth !== lastSundayMonth;

  // Construct the HTML Email using Template Literals for safer, cleaner formatting
  const emailMessage = `
    <p>Hi everyone!</p>
    <p>Here is the weekly thread for upcoming <b>${nextSundayMMDD}</b>. Please REPLY-ALL and add anyone missing to the email chain (worship & AV teams, guest speakers, etc). Use this thread to communicate all information about Sunday service, so everyone is kept up to date (e.g. special announcements, etc).</p>
    
    <u>To Dos (remember to REPLY-ALL)</u>:<br />
    &emsp;1. [WORSHIP LEADER] Add worship team & send song list<br />
    &emsp;2. [PASTOR/SPEAKER] Add speaker(s) & send schedule<br />
    &emsp;3. [MODERATOR] Review and confirm <a href="${CONFIG.slideshowLink}">Sunday announcement slideshow</a> (<a href="${CONFIG.newsletterLink}">Newsletter</a>)
    ${isFirstSunday ? '<br />&emsp;4. Add communion for the first Sunday schedule' : ''}
    
    <br /><br /><br /><hr />
    <p style="font-size:.75em;">Note: This is an automated weekly email. If you have any questions/feedback or want to be removed, please email ${CONFIG.adminEmail}</p>
  `;

  // Send email
  MailApp.sendEmail({
    to: CONFIG.toAddresses,
    cc: CONFIG.ccAddresses,
    name: CONFIG.senderName,
    subject: `${nextSundayYYYYMMDD} ${CONFIG.subjectPrefix}`,
    htmlBody: emailMessage,
  }); 

  Logger.log(`Remaining daily emails: ${MailApp.getRemainingDailyQuota()}`);
}
