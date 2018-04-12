const {authorize, google} = require('./config');
const fs = require('fs');

// Change it with your id.
const spreadsheetId = "1zfT1hwYHaFIBlwpSNJqvbDzFS9oQfKXk-bnEmggZvVY";

const append = (range, values) => {
	fs.readFile('client_secret.json', (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Sheets API.
		authorize(JSON.parse(content), (auth) => {
			const sheets = google.sheets({ version: 'v4', auth });
			const valueInputOption = 'USER_ENTERED';
			const resource = {values};
			sheets.spreadsheets.values.append({
                spreadsheetId, range, valueInputOption, resource
            }, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Success!");
				}
			});
		});
	});
}

module.exports = {
    append
};