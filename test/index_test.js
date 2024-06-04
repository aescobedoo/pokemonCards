// index_test.js
const { JSDOM } = require('jsdom');
const { updateCard } = require('../index');
const assert = require('assert');

describe('updateCard', function() {
  let dom;
  let document;
  let healthEl, imgEl, measurementsEl, abilitiesEl, statsEl;

  beforeEach(() => {
    //simulating a DOM
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="h1"></div><div id="im1"></div><div id="m1"></div><div id="a1"></div><div id="s1"></div></body></html>');
    document = dom.window.document;
    
    healthEl = document.getElementById('h1');
    imgEl = document.getElementById('im1');
    measurementsEl = document.getElementById('m1');
    abilitiesEl = document.getElementById('a1');
    statsEl = document.getElementById('s1');
  });

  it('should update the card with correct data', async function() {
    //Setup
    const expected = '35HP';
    const pokemon = 'pikachu';
    let result;

    //Exercise
    await updateCard(pokemon, healthEl, imgEl, measurementsEl, abilitiesEl, statsEl);
    result = healthEl.innerText;

    //Verify
    assert.strictEqual(result, expected);
  });

  it('should tell the user when the pokemon was not found', async function() {
    //Setup
    const expected = 'naHP';
    const pokemon = 'spiderman';
    let result;

    //Exercise
    await updateCard(pokemon, healthEl, imgEl, measurementsEl, abilitiesEl, statsEl);
    result = healthEl.innerText;

    //Verify
    assert.strictEqual(result, expected);
  });
});
