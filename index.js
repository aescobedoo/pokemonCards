const isNode = typeof module !== 'undefined' && typeof module.exports !== 'undefined';

let documentElements;

if (!isNode) {
  // DOM elements
  documentElements = {
    healthOne: document.getElementById('h1'),
    healthTwo: document.getElementById('h2'),
    imgOne: document.getElementById('im1'),
    imgTwo: document.getElementById('im2'),
    measurementsOne: document.getElementById('m1'),
    measurementsTwo: document.getElementById('m2'),
    abilitiesOne: document.getElementById('a1'),
    abilitiesTwo: document.getElementById('a2'),
    statsOne: document.getElementById('s1'),
    statsTwo: document.getElementById('s2'),
    button: document.getElementById('action'),
  };

  // Event listeners
  documentElements.button.addEventListener('click', comparePokemon);
  document.addEventListener('DOMContentLoaded', () => {
    updateCard('pikachu', documentElements.healthOne, documentElements.imgOne, documentElements.measurementsOne, documentElements.abilitiesOne, documentElements.statsOne);
    updateCard('bulbasaur', documentElements.healthTwo, documentElements.imgTwo, documentElements.measurementsTwo, documentElements.abilitiesTwo, documentElements.statsTwo);
  });
}

// Function to update card with pokemon data
async function updateCard(pokemon, healthEl, imgEl, measurementsEl, abilitiesEl, statsEl) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
      healthEl.innerText = 'naHP';
      imgEl.src = '';
      measurementsEl.innerText = 'height: naft, weight: nalbs';
      abilitiesEl.innerHTML = 'Oops, could not find that one!';
      statsEl.innerHTML = '';
      throw new Error('Could not fetch resource');
    }
    const data = await response.json();
    healthEl.innerText = `${data.stats[0].base_stat}HP`;
    imgEl.src = data.sprites.front_default;
    measurementsEl.innerText = `height: ${data.height}ft, weight: ${data.weight}lbs`;

    abilitiesEl.innerHTML = '';
    statsEl.innerHTML = '';

    data.abilities.forEach(element => {
      const li = document.createElement('li');
      li.innerText = element.ability.name;
      abilitiesEl.appendChild(li);
    });

    const attackLi = document.createElement('li');
    attackLi.innerText = `Attack: ${data.stats[1].base_stat}`;
    statsEl.appendChild(attackLi);

    const defenseLi = document.createElement('li');
    defenseLi.innerText = `Defense: ${data.stats[2].base_stat}`;
    statsEl.appendChild(defenseLi);

    const speedLi = document.createElement('li');
    speedLi.innerText = `Speed: ${data.stats[5].base_stat}`;
    statsEl.appendChild(speedLi);
  } catch (error) {
    console.log(error);
  }
}

function comparePokemon() {
  const pokemon1 = document.getElementById('pokemon1').value.toLowerCase();
  const pokemon2 = document.getElementById('pokemon2').value.toLowerCase();

  updateCard(pokemon1, documentElements.healthOne, documentElements.imgOne, documentElements.measurementsOne, documentElements.abilitiesOne, documentElements.statsOne);
  updateCard(pokemon2, documentElements.healthTwo, documentElements.imgTwo, documentElements.measurementsTwo, documentElements.abilitiesTwo, documentElements.statsTwo);
}

// Export for Node.js
if (isNode) {
  module.exports = {
    updateCard
  };
}
