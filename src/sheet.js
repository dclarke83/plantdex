import config from "./config";

export function load(callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: 'Sheet1!A1:Q'
      })
      .then(
        response => {
          const data = response.result.values;
          const plants = data.map(plant => ({
            purchaseDate: plant[0],
            latinName: plant[1],
            commonName: plant[2],
            type: plant[3],
            foliage: plant[4],
            habit: plant[5],
            sunlight: plant[6],
            hardiness: plant[7],
            exposure: plant[8],
            soil: plant[9],
            moisture: plant[10],
            pH: plant[11],
            height: plant[12],
            spread: plant[13],
            ageToMaxHeight: plant[14],
            notes: plant[15],
            urls: plant[16]
          })) || [];
          callback({
            plants
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

export default load;