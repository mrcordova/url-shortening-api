const URL = "https://tinyurl.com/api-create.php?url=";
const linkInput = document.getElementById("url");
const shortenBtn = document.querySelector(".url-input-container>button");
const errorSpan = document.querySelector(".error-empty");
const links = document.querySelector(".links");

window.addEventListener("load", () => {
  if (localStorage.getItem("links")) {
    const items = JSON.parse(localStorage.getItem("links"));
    for (const item of items) {
      createLi(item.url, item.shortenUrl);
    }
  }
});

function createLi(url, shortenUrl) {
  links.insertAdjacentHTML(
    "beforeend",
    `<li>
              <p>${url}</p>
              <p>${shortenUrl}</p>
              <button>Copy</button>
              </li>`
  );

  links.lastElementChild.lastElementChild.addEventListener("click", copyUrl);
}

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
    createLi(linkInput.value, shortenUrl);
    populateLinks();
    linkInput.value = "";
  }
});

// links.addEventListener("input", populateLinks);
