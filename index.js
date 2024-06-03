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

//Function for pokemons
async function cardOne(pokemon) {
 try {
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if (!response.ok) {
     healthOne.innerText = `naHP`;
     imgOne.src = '';
     measurementsOne.innerText = `height: naft, weight: nalbs`;
     abilitiesOne.innerHTML = 'Oops, could not find that one!';
     statsOne.innerHTML = '';


     throw new Error('Could not fetch resource');
   }
   const data = await response.json();
   healthOne.innerText = `${data.stats[0].base_stat}HP`;
   imgOne.src = data.sprites.front_default;
   measurementsOne.innerText = `height: ${data.height}ft, weight: ${data.weight}lbs`;
  
   // Clear previous abilities and stats
   abilitiesOne.innerHTML = '';
   statsOne.innerHTML = '';


   data.abilities.forEach(element => {
     const li = document.createElement('li');
     li.innerText = element.ability.name;
     abilitiesOne.appendChild(li);
   });


   const attackLi = document.createElement('li');
   attackLi.innerText = `Attack: ${data.stats[1].base_stat}`;
   statsOne.appendChild(attackLi);


   const defenseLi = document.createElement('li');
   defenseLi.innerText = `Defense: ${data.stats[2].base_stat}`;
   statsOne.appendChild(defenseLi);


   const speedLi = document.createElement('li');
   speedLi.innerText = `Speed: ${data.stats[5].base_stat}`;
   statsOne.appendChild(speedLi);
 } catch (error) {
   console.log(error);
 }
}


async function cardTwo(pokemon) {
 try {
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if (!response.ok) {
     healthTwo.innerText = `naHP`;
     imgTwo.src = '';
     measurementsTwo.innerText = `height: naft, weight: nalbs`;
     abilitiesTwo.innerHTML = 'Oops, could not find that one!';
     statsTwo.innerHTML = '';


     throw new Error('Could not fetch resource');
   }
   const data = await response.json();
   healthTwo.innerText = `${data.stats[0].base_stat}HP`;
   imgTwo.src = data.sprites.front_default;
   measurementsTwo.innerText = `height: ${data.height}ft, weight: ${data.weight}lbs`;
  
   // Clear previous abilities and stats
   abilitiesTwo.innerHTML = '';
   statsTwo.innerHTML = '';


   data.abilities.forEach(element => {
     const li = document.createElement('li');
     li.innerText = element.ability.name;
     abilitiesTwo.appendChild(li);
   });


   const attackLi = document.createElement('li');
   attackLi.innerText = `Attack: ${data.stats[1].base_stat}`;
   statsTwo.appendChild(attackLi);


   const defenseLi = document.createElement('li');
   defenseLi.innerText = `Defense: ${data.stats[2].base_stat}`;
   statsTwo.appendChild(defenseLi);


   const speedLi = document.createElement('li');
   speedLi.innerText = `Speed: ${data.stats[5].base_stat}`;
   statsTwo.appendChild(speedLi);
 } catch (error) {
   console.log(error);
 }
}


function comparePokemon() {
 const pokemon1 = document.getElementById('pokemon1').value.toLowerCase();
 const pokemon2 = document.getElementById('pokemon2').value.toLowerCase();


 cardOne(pokemon1);
 cardTwo(pokemon2);
}

//Event listeners
button.addEventListener('click', comparePokemon);
document.addEventListener('DOMContentLoaded', () => {
 cardOne('pikachu');
 cardTwo('bulbasaur');
});