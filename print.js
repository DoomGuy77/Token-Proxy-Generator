window.addEventListener('beforeprint', function() {
  rerenderForPrint();
});

window.addEventListener('afterprint', function() {
  rerenderForView();
});


function rerenderForPrint() {
  sortDecklistForPrint();
  for (let i = 0; i < STATE.deckList.length; i++) {
    STATE.deckList[i].needsRerender = true;
  }
  buildSpoiler(STATE.deckList, true);
}

function rerenderForView() {
  sortDecklistForView();
  for (let i = 0; i < STATE.deckList.length; i++) {
    STATE.deckList[i].needsRerender = true;
  }
  buildSpoiler(STATE.deckList, true);
}