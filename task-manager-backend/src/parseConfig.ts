
import Parse from 'parse/node';

const PARSE_APP_ID = 'vXOoclqegdWckntamsu8O85Npfrfw8Ppj0U6Z38S';
const PARSE_JAVASCRIPT_KEY = 'RpOxvr6PXbQzFH3SonD0fTNOdgrDj9jzXOL97G9s';
const PARSE_MASTER_KEY = 'gSgCNvoeJAM0tZAQlXUq7H4yG0MSSgjKeOdUiNff';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;


Parse.serverURL && console.log(`Connected to Parse server at ${Parse.serverURL}`);

export default Parse;
