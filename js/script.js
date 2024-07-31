// - Shorten any valid URL
// - See a list of their shortened links, even after refreshing the browser
// - Copy the shortened link to their clipboard in a single click
// - Receive an error message when the `form` is submitted if:
//   - The `input` field is empty
// Notes
// Long URLs should be URL-encoded. You can not include a longUrl in the request that has &, ?, #, or other reserved parameters without first encoding it.
// Long URLs should not contain spaces: any longUrl with spaces will be rejected. All spaces should be either percent encoded %20 or plus encoded +. Note that tabs, newlines and trailing spaces are all indications of errors. Please remember to strip leading and trailing whitespace from any user input before shortening.
const URL = "https://cleanuri.com";
const API_ENDPOINT = "/api/v1/shorten";
let myHeaders = new Headers({
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
});

const dataResponse = await fetch(`${URL}${API_ENDPOINT}`, {
  method: "POST",
  mode: "no-cors",
  body: { url: "https%3A%2F%2Fgoogle.com%2F" },
});
const shortenUrl = await dataResponse.json()["result_url"];

console.log(shortenUrl);
