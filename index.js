//DOM elements
const healthOne = document.getElementById('h1');
const healthTwo = document.getElementById('h2');
const imgOne = document.getElementById('im1');
const imgTwo = document.getElementById('im2');
const measurementsOne = document.getElementById('m1');
const measurementsTwo = document.getElementById('m2');
const abilitiesOne = document.getElementById('a1');
const abilitiesTwo = document.getElementById('a2');
const statsOne = document.getElementById('s1');
const statsTwo = document.getElementById('s2');
const button = document.getElementById('action');

//Function to update card with pokemon data
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

    // Clear previous abilities and stats
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

// Function to compare Pokemon
function comparePokemon() {
  const pokemon1 = document.getElementById('pokemon1').value.toLowerCase();
  const pokemon2 = document.getElementById('pokemon2').value.toLowerCase();

  updateCard(pokemon1, healthOne, imgOne, measurementsOne, abilitiesOne, statsOne);
  updateCard(pokemon2, healthTwo, imgTwo, measurementsTwo, abilitiesTwo, statsTwo);
}

// Event listeners
button.addEventListener('click', comparePokemon);
document.addEventListener('DOMContentLoaded', () => {
  updateCard('pikachu', healthOne, imgOne, measurementsOne, abilitiesOne, statsOne);
  updateCard('bulbasaur', healthTwo, imgTwo, measurementsTwo, abilitiesTwo, statsTwo);
});
