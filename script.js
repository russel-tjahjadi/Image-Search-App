const accessKey = "7LzVqNqOPZJyNskqcILldi4cmCcmrf4H-lWFQob6aMc";

//ADD THE ACCESS KEY HERE!
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search_input");
const searchResults = document.querySelector(".search_results");
const showMore = document.getElementById("show_more_button");

let inputData = ""; //user input data
let page = 1; // when user clicks "Search", page will increase, having to handle the "Show More" button logic to be handled

async function searchImages() {
  inputData = inputEl.value;

  // the url variable will fetch all the data to be showed in the web page
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // data now should be in the response variable
  const response = await fetch(url);

  // converts data to json format
  const data = await response.json();

  // a lot of images and a lot of data stored here
  const results = data.results;

  if (page == 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    // pushing the result to a container/box in this case the div
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search_result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    //change the property (from the css) button from "none" to "block"
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
