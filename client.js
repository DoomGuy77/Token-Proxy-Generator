function getDataFromScryFall(card, callback) {

  if(card.queryEndpoint === 'code') {
    $.get(SCRYFALL_SEARCH_URL + card.query,
      callback
    ).fail(function() {
      callback({name: card.query})
    })
  } else if (card.queryEndpoint == 'uri') {
    $.get(card.query,
      callback
    ).fail(function() {
      callback({name: card.query})
    })
  } else {
    $.getJSON(SCRYFALL_SEARCH_URL + card.queryEndpoint,
      { fuzzy: card.query },
      callback
    ).fail(function () {
      callback({ name: card.query });
    })
  }
}

function processScryfallData(data, queryList, i) {
  const card = {};

  card.name = data.name;
  card.set = data.set_name;
  card.displayOrder = i;
  card.alternateImages = null;
  card.editMode = false;
  card.printsUri = data.prints_search_uri;
  card.layout = queryList[i].layout;
  card.allParts = data.all_parts;

  //update card images:
  if (data.layout == 'transform' || data.layout == 'modal_dfc') {
    card.cardImage = (data.card_faces[0].image_uris) ? data.card_faces[0].image_uris.border_crop : "";
    card.cardImage2 = (data.card_faces[1].image_uris) ? data.card_faces[1].image_uris.border_crop : "";
  } else {
    if(card.layout === 'checklist') {
      card.layout = 'normal';
      $(".js-results").prepend(`<div class="alert alert-danger alert-dismissible fade show col-12" role="alert">
      "${card.name}" cannot be made into a checklist card. Generating standard card instead.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`);
    }
    card.cardImage = (data.image_uris) ? data.image_uris.border_crop : "";
  }

  card.needsRerender = true;
  return card;
}