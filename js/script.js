// - Shorten any valid URL done
// - See a list of their shortened links, even after refreshing the browser
// - Copy the shortened link to their clipboard in a single click done
// - Receive an error message when the `form` is submitted if: done
//   - The `input` field is empty
// Notes
// Long URLs should be URL-encoded. You can not include a longUrl in the request that has &, ?, #, or other reserved parameters without first encoding it.
// Long URLs should not contain spaces: any longUrl with spaces will be rejected. All spaces should be either percent encoded %20 or plus encoded +. Note that tabs, newlines and trailing spaces are all indications of errors. Please remember to strip leading and trailing whitespace from any user input before shortening.
const URL = "https://tinyurl.com/api-create.php?url=";
// const API_ENDPOINT = "https%3A%2F%2Fgoogle.com%2F";
const linkInput = document.getElementById("url");
const shortenBtn = document.querySelector(".url-input-container>button");
const errorSpan = document.querySelector(".error-empty");
const links = document.querySelector(".links");

window.addEventListener("load", () => {
  if (localStorage.getItem("links")) {
    const items = JSON.parse(localStorage.getItem("links"));
    for (const item of items) {
      links.insertAdjacentHTML(
        "beforeend",
        `<li>
              <p>${item.url}</p>
              <p>${item.shortenUrl}</p>
              <button>Copy</button>
              </li>`
      );

      links.lastElementChild.lastElementChild.addEventListener(
        "click",
        copyUrl
      );
    }
  }
});

function populateLinks() {
  if (!localStorage.getItem("links")) {
    localStorage.setItem("links", JSON.stringify([]));
  }
  let items = JSON.parse(localStorage.getItem("links"));
  items.push({
    url: links.lastElementChild.children[0].textContent,
    shortenUrl: links.lastElementChild.children[1].textContent,
  });
  localStorage.setItem("links", JSON.stringify(items));
}
async function getUrl(url) {
  const dataResponse = await fetch(`${URL}${url}`);
  const shortenUrl = await dataResponse.text();
  return shortenUrl;
}
async function copyUrl(e) {
  await navigator.clipboard.writeText(
    e.target.previousElementSibling.textContent
  );

  e.target.classList.add("copied");
  e.target.textContent = "Copied!";
}
shortenBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  errorSpan.classList.toggle("hide", linkInput.checkValidity());
  linkInput.classList.toggle(
    "error-border",
    !errorSpan.classList.contains("hide")
  );
  if (linkInput.checkValidity()) {
    const shortenUrl = await getUrl(linkInput.value);
    links.insertAdjacentHTML(
      "beforeend",
      `<li>
        <p>${linkInput.value}</p>
        <p>${shortenUrl}</p>
        <button>Copy</button>
        </li>`
    );

    links.lastElementChild.lastElementChild.addEventListener("click", copyUrl);
    populateLinks();
  }
});

// links.addEventListener("input", populateLinks);
