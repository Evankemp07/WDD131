const FAVORITES_KEY = "trailscout-favorites";
const NOTES_KEY = "trailscout-notes";

function getFavoriteIds() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFavoriteIds(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function isFavorite(hikeId) {
  return getFavoriteIds().includes(hikeId);
}

function addFavorite(hikeId) {
  const favorites = getFavoriteIds();
  if (!favorites.includes(hikeId)) {
    saveFavoriteIds([...favorites, hikeId]);
  }
}

function removeFavorite(hikeId) {
  saveFavoriteIds(getFavoriteIds().filter((id) => id !== hikeId));
  removeNote(hikeId);
}

function toggleFavorite(hikeId) {
  if (isFavorite(hikeId)) {
    removeFavorite(hikeId);
    return false;
  }

  addFavorite(hikeId);
  return true;
}

function getNotes() {
  const stored = localStorage.getItem(NOTES_KEY);
  return stored ? JSON.parse(stored) : {};
}

function getNote(hikeId) {
  return getNotes()[hikeId] || "";
}

function saveNote(hikeId, note) {
  const notes = getNotes();
  notes[hikeId] = note;
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function removeNote(hikeId) {
  const notes = getNotes();
  delete notes[hikeId];
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}
