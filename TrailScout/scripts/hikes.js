const filterForm = document.querySelector("#filterForm");
const hikeGrid = document.querySelector("#hikeGrid");
const resultsCount = document.querySelector("#resultsCount");
const sortSelect = document.querySelector("#sortBy");
const difficultySelect = document.querySelector("#difficulty");
const distanceSelect = document.querySelector("#distance");
const trailTypeSelect = document.querySelector("#trailType");
const searchInput = document.querySelector("#hikeSearch");

const filterControls = {
  filterForm,
  sortSelect,
  difficultySelect,
  distanceSelect,
  trailTypeSelect,
  searchInput,
};

function createHikeCard(hike) {
  const card = document.createElement("article");
  card.className = "hike-card";
  card.dataset.hikeId = String(hike.id);

  const saved = isFavorite(hike.id);

  card.innerHTML = `
    <img
      class="hike-image"
      src="${hike.image}"
      alt="${hike.name} trail scenery"
      loading="lazy"
    >
    <div class="hike-body">
      <div class="hike-title-row">
        <div>
          <h4>${hike.name}</h4>
          <p class="hike-location">${hike.location}</p>
        </div>
        <button
          class="favorite-button${saved ? " is-saved" : ""}"
          type="button"
          aria-label="Save ${hike.name}"
          aria-pressed="${saved}"
          data-hike-id="${hike.id}"
        >
          ${heartIcon}
        </button>
      </div>
      <dl class="hike-stats">
        <div><dt>Difficulty</dt><dd>${hike.difficulty}</dd></div>
        <div><dt>Distance</dt><dd>${hike.distanceDisplay}</dd></div>
        <div><dt>Est. Time</dt><dd>${hike.time}</dd></div>
        <div><dt>Type</dt><dd>${hike.type}</dd></div>
      </dl>
      <p class="hike-description">${hike.description}</p>
    </div>
  `;

  return card;
}

function displayHikes(hikeList) {
  hikeGrid.innerHTML = "";

  if (hikeList.length === 0) {
    resultsCount.textContent = "0 Results";
    hikeGrid.innerHTML =
      '<p class="no-results">No hikes match your filters. Try adjusting your search.</p>';
    return;
  }

  resultsCount.textContent = `${hikeList.length} Result${hikeList.length === 1 ? "" : "s"}`;

  hikeList.forEach((hike) => {
    hikeGrid.appendChild(createHikeCard(hike));
  });
}

function filterHikes() {
  displayHikes(filterAndSortHikes(hikes, getFilterOptions(filterControls)));
}

function resetFilters() {
  resetHikeFilterControls(filterControls);
  filterHikes();
}

if (filterForm && hikeGrid) {
  bindHikeFilters(filterControls, filterHikes);

  hikeGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-button");
    if (!button) {
      return;
    }

    const hikeId = Number(button.dataset.hikeId);
    const saved = toggleFavorite(hikeId);

    button.classList.toggle("is-saved", saved);
    button.setAttribute("aria-pressed", String(saved));

    if (saved) {
      const hike = getHikeById(hikeId);
      if (hike && typeof showFavoriteToast === "function") {
        showFavoriteToast(hike.name);
      }
    }
  });

  resetFilters();
}
