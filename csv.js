const dropZone = document.querySelector('.js-queryList');

// Prevent default browser behavior
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
});

// Visual feedback
dropZone.addEventListener('dragenter', function() {
  $(dropZone).addClass('drag-over');
});
dropZone.addEventListener('dragleave', function() {
  $(dropZone).removeClass('drag-over');
});

// Processing on file drop
dropZone.addEventListener('drop', function(e) {
  $(dropZone).removeClass('drag-over');
  
  const file = e.dataTransfer.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const fileContent = event.target.result;
    
    if (file.name.endsWith('.csv')) {
      Papa.parse(fileContent, {
        header: true,
        complete: function(results) {
          const codes = results.data
            .filter(row => row["Set"] && row["Collector Number"])
            .map(row => row["Set"] + "/" + row["Collector Number"] + " -cd");
          $(".js-queryList").val(codes.join("\n"));
        }
      });
    } else {
      $(".js-queryList").val(fileContent);
    }
  };
  reader.readAsText(file);
});