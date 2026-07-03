function matchesDistance(hike, maxDistance) {
  if (!maxDistance) {
    return true;
  }

  if (maxDistance === "10+") {
    return hike.distance > 10;
  }

  return hike.distance <= Number(maxDistance);
}

function matchesSearch(hike, query) {
  if (!query) {
    return true;
  }

  const searchText = query.trim().toLowerCase();
  const searchableText = [
    hike.name,
    hike.location,
    hike.description,
    hike.difficulty,
    hike.type,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(searchText);
}

function sortHikes(hikeList, sortValue) {
  const sorted = [...hikeList];

  sorted.sort((a, b) => {
    switch (sortValue) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "distance-asc":
        return a.distance - b.distance;
      case "distance-desc":
        return b.distance - a.distance;
      case "difficulty-asc":
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case "difficulty-desc":
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      case "name-asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return sorted;
}

function filterAndSortHikes(hikeList, options) {
  const {
    difficulty = "",
    distance = "",
    trailType = "",
    searchQuery = "",
    sort = "name-asc",
  } = options;

  const filteredHikes = hikeList.filter((hike) => {
    const difficultyMatch = !difficulty || hike.difficulty === difficulty;
    const typeMatch = !trailType || hike.type === trailType;
    const distanceMatch = matchesDistance(hike, distance);
    const searchMatch = matchesSearch(hike, searchQuery);

    return difficultyMatch && typeMatch && distanceMatch && searchMatch;
  });

  return sortHikes(filteredHikes, sort);
}

function getFilterOptions(controls) {
  return {
    difficulty: controls.difficultySelect.value,
    distance: controls.distanceSelect.value,
    trailType: controls.trailTypeSelect.value,
    searchQuery: controls.searchInput ? controls.searchInput.value : "",
    sort: controls.sortSelect.value,
  };
}

function bindHikeFilters(controls, onChange) {
  if (controls.filterForm) {
    controls.filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    controls.filterForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        resetHikeFilterControls(controls);
        onChange();
      }, 0);
    });
  }

  [
    controls.difficultySelect,
    controls.distanceSelect,
    controls.trailTypeSelect,
    controls.sortSelect,
  ].forEach((control) => {
    control.addEventListener("change", onChange);
  });

  if (controls.searchInput) {
    controls.searchInput.addEventListener("input", onChange);
  }
}

function resetHikeFilterControls(controls) {
  controls.sortSelect.value = "name-asc";
  if (controls.searchInput) {
    controls.searchInput.value = "";
  }
}
