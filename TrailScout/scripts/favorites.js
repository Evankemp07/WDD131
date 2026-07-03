const filterForm = document.querySelector("#filterForm");
const favoritesGrid = document.querySelector("#favoritesGrid");
const favoritesCount = document.querySelector("#favoritesCount");
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

function getSavedHikes() {
  return getFavoriteIds()
    .map((id) => getHikeById(id))
    .filter(Boolean);
}

function createFavoriteCard(hike) {
  const card = document.createElement("article");
  card.className = "hike-card favorite-card";
  card.dataset.hikeId = String(hike.id);

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
          class="favorite-button is-saved"
          type="button"
          aria-label="Remove ${hike.name} from favorites"
          aria-pressed="true"
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
      <div class="hike-notes">
        <label for="note-${hike.id}">Your Notes</label>
        <textarea
          id="note-${hike.id}"
          class="hike-note-input"
          rows="3"
          placeholder="Add planning notes, gear reminders, or trail tips..."
        >${getNote(hike.id)}</textarea>
        <button
          class="save-note-button"
          type="button"
          data-hike-id="${hike.id}"
        >
          Save Note
        </button>
        <p class="note-status" id="note-status-${hike.id}" aria-live="polite"></p>
      </div>
    </div>
  `;

  return card;
}

function displayFavorites(hikeList) {
  const savedHikes = getSavedHikes();

  favoritesGrid.innerHTML = "";

  if (savedHikes.length === 0) {
    favoritesCount.textContent = "0 Saved";
    favoritesGrid.innerHTML = `
      <p class="favorites-empty">
        You have not saved any hikes yet. Visit the
        <a href="index.html#available-hikes">home page</a>
        and tap the heart icon to add favorites.
      </p>
    `;
    return;
  }

  if (hikeList.length === 0) {
    favoritesCount.textContent = "0 Saved";
    favoritesGrid.innerHTML =
      '<p class="no-results">No hikes match your filters. Try adjusting your search.</p>';
    return;
  }

  favoritesCount.textContent = `${hikeList.length} Saved`;

  hikeList.forEach((hike) => {
    favoritesGrid.appendChild(createFavoriteCard(hike));
  });
}

function filterFavorites() {
  displayFavorites(
    filterAndSortHikes(getSavedHikes(), getFilterOptions(filterControls))
  );
}

function resetFilters() {
  resetHikeFilterControls(filterControls);
  filterFavorites();
}

if (favoritesGrid) {
  if (filterForm) {
    bindHikeFilters(filterControls, filterFavorites);
  }

  favoritesGrid.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".favorite-button");
    if (favoriteButton) {
      const hikeId = Number(favoriteButton.dataset.hikeId);
      removeFavorite(hikeId);
      filterFavorites();
      return;
    }

    const saveButton = event.target.closest(".save-note-button");
    if (!saveButton) {
      return;
    }

    const hikeId = Number(saveButton.dataset.hikeId);
    const noteInput = document.querySelector(`#note-${hikeId}`);
    const status = document.querySelector(`#note-status-${hikeId}`);

    saveNote(hikeId, noteInput.value.trim());
    status.textContent = "Note saved locally.";
  });

  resetFilters();
}
