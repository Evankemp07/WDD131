const character = {
  name: "Swamp Beast Diplomat",
  class: "Diplomat",
  level: 1,
  health: 100,
  image: "images/swamp-beast-diplomat.webp",
  attacked: function () {
    if (this.health > 0) {
      this.health -= 20;
    }
    if (this.health <= 0) {
      this.health = 0;
      document.querySelector("#attackButton").disabled = true;
      alert(`${this.name} has died.`);
    }
    renderCharacter();
  },
  levelUp: function () {
    this.level += 1;
    renderCharacter();
  }
};

function renderCharacter() {
  document.querySelector("#characterName").textContent = character.name;
  document.querySelector("#characterClass").textContent = character.class;
  document.querySelector("#characterLevel").textContent = character.level;
  document.querySelector("#characterHealth").textContent = character.health;
  const image = document.querySelector("#characterImage");
  image.setAttribute("src", character.image);
  image.setAttribute("alt", character.name);
}

document.querySelector("#attackButton").addEventListener("click", function () {
  character.attacked();
});

document.querySelector("#levelButton").addEventListener("click", function () {
  character.levelUp();
});

renderCharacter();
