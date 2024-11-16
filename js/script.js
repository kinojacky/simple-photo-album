// Global variables
let photoData = []; // Will store the photo data loaded from JSON
const photosPerPage = 28; // Number of photos to display per page
let currentPage = 1; // Current page number, starting at 1
let enableDownload = true; // Set this to true to enable downloads
let languageData = {}; // Will store all language data
let currentLanguage = "en"; // Default language

// Available languages
const availableLanguages = ["en", "iba", "zh-tw", "zh-cn", "ja"];

// Language symbols
const languageSymbols = {
  "en": "Eng",
  "iba": "Iban",
  "zh-tw": "繁",
  "zh-cn": "简",
  "ja": "日",
};

// Function to load all language data
async function loadLanguageData() {
  try {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Construct the appropriate path
    const basePath = isGitHubPages ? "/simple-photo-album" : "";
    const jsonUrl = `${basePath}/json/languages.json`;

    // console.log("Attempting to fetch from:", jsonUrl); // For debugging

    const response = await fetch(jsonUrl);
    languageData = await response.json();
    updatePageLanguage();
  } catch (error) {
    console.error("Error loading language data:", error);
  }
}

// Function to update page language
function updatePageLanguage() {
  const currentLangData = languageData[currentLanguage];
  document.getElementById("simple-photo-album").textContent =
    currentLangData.title;
  document.querySelector(".masthead .col-12 p").innerHTML =
    currentLangData.subtitle;
  document.querySelector(".alert.alert-secondary").innerHTML = `
    ${currentLangData.usage} ${currentLangData.viewInstructions}
    <span id="download-instructions">${currentLangData.downloadInstructions}</span>
    ${currentLangData.navigationInstructions} ${currentLangData.closeInstructions}
  `;
  document.querySelector("footer .container p").innerHTML =
    currentLangData.footer;
  updateUsageInstructions();
}

// Function to change language
function changeLanguage(lang) {
  if (lang && availableLanguages.includes(lang)) {
    currentLanguage = lang;
    updatePageLanguage();
    document.getElementById("languageSymbol").innerHTML = languageSymbols[lang];
  }
}

// Update the existing updateUsageInstructions function
function updateUsageInstructions() {
  const downloadInstructionsElement = document.getElementById(
    "download-instructions"
  );

  if (enableDownload) {
    downloadInstructionsElement.innerHTML =
      languageData[currentLanguage].downloadInstructions;
    downloadInstructionsElement.style.display = "inline";
  } else {
    downloadInstructionsElement.style.display = "none";
  }
}

// Function to toggle the download functionality dynamically
function toggleDownloadFunctionality(enable) {
  enableDownload = enable;
  updateUsageInstructions();
  if (document.getElementById("lightbox").style.display === "block") {
    const currentIndex = parseInt(
      document.getElementById("lightbox-img").dataset.index
    );
    showLightbox(currentIndex);
  }
}

// Function to load photo data from JSON file
async function loadPhotoData() {
  try {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Construct the appropriate path
    const basePath = isGitHubPages ? "/simple-photo-album" : "";
    const jsonUrl = `${basePath}/json/sample.json`;

    // console.log("Attempting to fetch from:", jsonUrl); // For debugging

    const response = await fetch(jsonUrl);
    const data = await response.json();
    photoData = data.photos;
    renderPhotos(currentPage); // Initial render after data is loaded
  } catch (error) {
    console.error("Error loading photo data:", error);
  }
}

function getBasePath() {
  const isGitHubPages = window.location.hostname.includes("github.io");
  return isGitHubPages ? "/simple-photo-album" : "";
}

// Function to render photos for a specific page
function renderPhotos(page) {
  const photoGrid = document.getElementById("photo-grid");
  photoGrid.innerHTML = "";

  const start = (page - 1) * photosPerPage;
  const end = start + photosPerPage;
  const pagePhotos = photoData.slice(start, end);

  const basePath = getBasePath();

  pagePhotos.forEach((photo, index) => {
    const photoItem = document.createElement("div");
    photoItem.className = "col-md-3 col-6 photo-item";
    photoItem.innerHTML = `<img src="${basePath}${photo.thumbnail}" alt="${
      photo.filename
    }" class="img-fluid" data-index="${start + index}">`;
    photoGrid.appendChild(photoItem);
  });

  renderPagination();
}

// Function to adjust lightbox image orientation
function adjustLightboxOrientation(img) {
  img.onload = function () {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio > 1.2) {
      img.style.width = "100%";
      img.style.height = "auto";
    } else if (ratio < 0.8) {
      img.style.width = "auto";
      img.style.height = "100%";
    } else {
      img.style.width = "auto";
      img.style.height = "auto";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
    }
  };
}

// Function to render pagination controls
function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Clear existing pagination

  const totalPages = Math.ceil(photoData.length / photosPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
    pagination.appendChild(li);
  }
}

// Function to handle keyboard shortcuts in the lightbox
function handleLightboxKeyPress(event) {
  if (document.getElementById("lightbox").style.display === "block") {
    const currentIndex = parseInt(
      document.getElementById("lightbox-img").dataset.index
    );
    switch (event.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        if (currentIndex > 0) showLightbox(currentIndex - 1);
        break;
      case "ArrowRight":
        if (currentIndex < photoData.length - 1) showLightbox(currentIndex + 1);
        break;
      case "d":
      case "D":
        if (enableDownload) {
          document.querySelector(".download").click();
        }
        break;
    }
  }
}

// Function to close the lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Function to display the lightbox for a selected photo
function showLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const filename = document.querySelector(".filename");
  const downloadLink = document.querySelector(".download");
  const basePath = getBasePath();

  lightboxImg.src = `${basePath}${photoData[index].original}`;
  lightboxImg.dataset.index = index;
  filename.textContent = photoData[index].filename;

  if (enableDownload) {
    downloadLink.href = `${basePath}${photoData[index].original}`;
    downloadLink.download = photoData[index].filename;
    downloadLink.style.display = "block";
  } else {
    downloadLink.removeAttribute("href");
    downloadLink.removeAttribute("download");
    downloadLink.style.display = "none";
  }

  lightbox.style.display = "block";
  adjustLightboxOrientation(lightboxImg);
  updateLightboxNavigation(index);
}

// Function to update lightbox navigation arrows
function updateLightboxNavigation(index) {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  prev.style.display = index > 0 ? "block" : "none";
  next.style.display = index < photoData.length - 1 ? "block" : "none";

  prev.onclick = () => showLightbox(index - 1);
  next.onclick = () => showLightbox(index + 1);
}

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([loadLanguageData(), loadPhotoData()]).then(() => {
    updatePageLanguage();
    // Keep the translate icon on initial load
    document.getElementById("languageSymbol").innerHTML =
      '<i class="bi bi-translate"></i>';
    updateUsageInstructions();
  });

  // Add event listeners for language change
  document.querySelector(".dropdown-toggle").addEventListener("click", (e) => {
    // Prevent changing language when clicking the dropdown toggle
    e.preventDefault();
  });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLang = e.target.getAttribute("data-lang");
      if (selectedLang) {
        changeLanguage(selectedLang);
      }
    });
  });

  // Event delegation for photo grid clicks
  document.getElementById("photo-grid").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      showLightbox(parseInt(e.target.dataset.index));
    }
  });

  // Event listener for closing the lightbox
  document.querySelector(".close").addEventListener("click", closeLightbox);

  // Event delegation for pagination clicks
  document.getElementById("pagination").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "A") {
      currentPage = parseInt(e.target.dataset.page);
      renderPhotos(currentPage);
    }
  });

  // Add keyboard event listener
  document.addEventListener("keydown", handleLightboxKeyPress);
});

console.log(`
  ,-~~-.___.
 / |  '     \\     我想變成妳的冬天
(  )         0    無論妳是否在等待
\\_/-, ,----'      我還是會來到妳的面前....
    ====           //                     
   /  \\-'~;    /~~~(O)
  /  __/~|   /       |     
=(  _____| (_________|   JK
`);
