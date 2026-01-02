const path = require("path");
const { GoogleAuth } = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

async function getAccessToken() {
  const keyPath = path.join(__dirname, "../../../../google-service-credential.json"); 
  // __dirname is the folder of this file
  //console.log("Service Account Path:", keyPath);

  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}     

module.exports = getAccessToken;
