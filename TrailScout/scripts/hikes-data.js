const hikes = [
  {
    id: 1,
    name: "Pine Ridge Trail",
    location: "Big Sur State Park",
    difficulty: "Moderate",
    distance: 10.5,
    distanceDisplay: "10.5 miles",
    time: "5-6 hours",
    type: "Loop",
    description:
      "A coastal hike with ocean views and redwood groves. Moderate elevation gain.",
  },
  {
    id: 2,
    name: "Coastal View Path",
    location: "Pacifica Coast",
    difficulty: "Easy",
    distance: 3.2,
    distanceDisplay: "3.2 miles",
    time: "1.5 hours",
    type: "Out & Back",
    description:
      "A flat, paved trail perfect for beginners and families. Great for sunsets.",
  },
  {
    id: 3,
    name: "Summit Peak",
    location: "High Sierras",
    difficulty: "Hard",
    distance: 14,
    distanceDisplay: "14.0 miles",
    time: "8-10 hours",
    type: "Point to Point",
    description:
      "Challenging steep ascent meant for experienced hikers. Rewarding views.",
  },
  {
    id: 4,
    name: "Valley Stream Trail",
    location: "Local County Park",
    difficulty: "Easy",
    distance: 2.5,
    distanceDisplay: "2.5 miles",
    time: "1 hour",
    type: "Loop",
    description:
      "Quiet wooded path following a gentle stream. Great for a quick walk.",
  },
  {
    id: 5,
    name: "Eagle Rock Loop",
    location: "Topanga State Park",
    difficulty: "Moderate",
    distance: 6.8,
    distanceDisplay: "6.8 miles",
    time: "3-4 hours",
    type: "Loop",
    description:
      "Rolling hills and sandstone formations with panoramic views of the Santa Monica Mountains.",
  },
  {
    id: 6,
    name: "Meadowbrook Walk",
    location: "Grant Ranch Park",
    difficulty: "Easy",
    distance: 1.8,
    distanceDisplay: "1.8 miles",
    time: "45 minutes",
    type: "Loop",
    description:
      "Short grassland loop with wildflowers in spring and plenty of shade for casual hikers.",
  },
  {
    id: 7,
    name: "Granite Pass Route",
    location: "Yosemite Valley",
    difficulty: "Hard",
    distance: 11.2,
    distanceDisplay: "11.2 miles",
    time: "6-7 hours",
    type: "Point to Point",
    description:
      "Long alpine route with steep switchbacks, rocky terrain, and dramatic granite overlooks.",
  },
  {
    id: 8,
    name: "Red Canyon Trail",
    location: "Snow Canyon State Park",
    difficulty: "Moderate",
    distance: 4.5,
    distanceDisplay: "4.5 miles",
    time: "2-3 hours",
    type: "Out & Back",
    description:
      "Wind through red rock cliffs and desert washes on this scenic canyon trail.",
  },
  {
    id: 9,
    name: "Lakeside Shoreline",
    location: "Emerald Lake Reserve",
    difficulty: "Easy",
    distance: 4.0,
    distanceDisplay: "4.0 miles",
    time: "1.5-2 hours",
    type: "Loop",
    description:
      "Mostly flat lakeside path with benches, bird watching, and easy access from the parking area.",
  },
  {
    id: 10,
    name: "Thunder Ridge Ascent",
    location: "Mount Hood Wilderness",
    difficulty: "Hard",
    distance: 9.6,
    distanceDisplay: "9.6 miles",
    time: "5-6 hours",
    type: "Out & Back",
    description:
      "Demanding climb to a windy ridge with alpine meadows and distant mountain views.",
  },
  {
    id: 11,
    name: "Old Forest Trail",
    location: "Hoh Rain Forest",
    difficulty: "Easy",
    distance: 2.2,
    distanceDisplay: "2.2 miles",
    time: "1 hour",
    type: "Out & Back",
    description:
      "Boardwalk and soft forest floor beneath moss-covered trees in a lush temperate rainforest.",
  },
  {
    id: 12,
    name: "Cedar Bluff Circuit",
    location: "Shenandoah National Park",
    difficulty: "Moderate",
    distance: 7.3,
    distanceDisplay: "7.3 miles",
    time: "3.5-4 hours",
    type: "Loop",
    description:
      "Forest loop with a steady climb, rocky outcrops, and fall color that peaks in October.",
  },
  {
    id: 13,
    name: "Desert Vista Trail",
    location: "Joshua Tree National Park",
    difficulty: "Moderate",
    distance: 5.1,
    distanceDisplay: "5.1 miles",
    time: "2.5 hours",
    type: "Loop",
    description:
      "Open desert scenery with Joshua trees, sandy washes, and wide-open sunset views.",
  },
  {
    id: 14,
    name: "North Ridge Traverse",
    location: "Glacier National Park",
    difficulty: "Hard",
    distance: 13.4,
    distanceDisplay: "13.4 miles",
    time: "7-9 hours",
    type: "Point to Point",
    description:
      "Exposed ridge travel with significant elevation change and unforgettable mountain vistas.",
  },
  {
    id: 15,
    name: "River Bend Path",
    location: "Columbia River Gorge",
    difficulty: "Easy",
    distance: 3.6,
    distanceDisplay: "3.6 miles",
    time: "1.5 hours",
    type: "Loop",
    description:
      "Gentle riverside trail with bridges, ferns, and several small waterfall viewpoints.",
  },
  {
    id: 16,
    name: "Aspen Grove Loop",
    location: "Rocky Mountain National Park",
    difficulty: "Moderate",
    distance: 8.0,
    distanceDisplay: "8.0 miles",
    time: "4 hours",
    type: "Loop",
    description:
      "Popular mountain loop through aspen groves and open meadows with moderate climbs.",
  },
  {
    id: 17,
    name: "Sunset Cliffs Walk",
    location: "Point Lobos Reserve",
    difficulty: "Easy",
    distance: 1.5,
    distanceDisplay: "1.5 miles",
    time: "40 minutes",
    type: "Loop",
    description:
      "Short coastal walk above cliffs and tide pools, ideal for photography and wildlife spotting.",
  },
  {
    id: 18,
    name: "Bear Lake Connector",
    location: "Uinta-Wasatch-Cache NF",
    difficulty: "Moderate",
    distance: 6.2,
    distanceDisplay: "6.2 miles",
    time: "3 hours",
    type: "Point to Point",
    description:
      "Links two alpine lakes through pine forest with moderate elevation and clear trail markers.",
  },
  {
    id: 19,
    name: "Wildflower Ridge",
    location: "Mount Rainier NP",
    difficulty: "Hard",
    distance: 10.8,
    distanceDisplay: "10.8 miles",
    time: "6-8 hours",
    type: "Out & Back",
    description:
      "Seasonal wildflower displays near the ridge, but snowfields can linger into early summer.",
  },
  {
    id: 20,
    name: "Prairie Creek Trail",
    location: "Tallgrass Prairie Preserve",
    difficulty: "Easy",
    distance: 4.8,
    distanceDisplay: "4.8 miles",
    time: "2 hours",
    type: "Loop",
    description:
      "Open prairie trail with long horizons, tall grasses, and excellent conditions for birding.",
  },
  {
    id: 21,
    name: "Hidden Falls Route",
    location: "Zion National Park",
    difficulty: "Moderate",
    distance: 5.7,
    distanceDisplay: "5.7 miles",
    time: "3 hours",
    type: "Out & Back",
    description:
      "Canyon trail leading to a seasonal waterfall surrounded by towering sandstone walls.",
  },
  {
    id: 22,
    name: "Blue Mesa Circuit",
    location: "Petrified Forest NP",
    difficulty: "Easy",
    distance: 3.0,
    distanceDisplay: "3.0 miles",
    time: "1.25 hours",
    type: "Loop",
    description:
      "Colorful badlands loop with interpretive signs and little shade, best hiked in cooler hours.",
  },
  {
    id: 23,
    name: "Cathedral Spires Loop",
    location: "Custer State Park",
    difficulty: "Hard",
    distance: 12.1,
    distanceDisplay: "12.1 miles",
    time: "6-7 hours",
    type: "Loop",
    description:
      "Rocky loop beneath granite spires with long climbs and rewarding high-country scenery.",
  },
  {
    id: 24,
    name: "Harbor Bluff Trail",
    location: "Acadia National Park",
    difficulty: "Moderate",
    distance: 4.2,
    distanceDisplay: "4.2 miles",
    time: "2 hours",
    type: "Out & Back",
    description:
      "Coastal forest trail opening to rocky bluffs with views of the harbor and nearby islands.",
  },
];

hikes.forEach((hike) => {
  hike.image = `images/hikes/${hike.id}.jpg`;
  hike.imageWebp = `images/hikes/${hike.id}-400w.webp`;
});

const difficultyOrder = {
  Easy: 1,
  Moderate: 2,
  Hard: 3,
};

const heartIcon = `
  <svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  </svg>
`;

function getHikeById(hikeId) {
  return hikes.find((hike) => hike.id === hikeId);
}

function hikeImageMarkup(hike) {
  return `
    <picture>
      <source type="image/webp" srcset="${hike.imageWebp}">
      <img
        class="hike-image"
        src="${hike.image}"
        alt="${hike.name} trail scenery"
        width="400"
        height="250"
        loading="lazy"
        decoding="async"
      >
    </picture>
  `;
}
