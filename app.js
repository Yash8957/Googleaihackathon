// Add an event listener to the file input for image changes
document.getElementById('imageInput').addEventListener('change', function(event) {
  var image = event.target.files[0];
  var formData = new FormData();
  formData.append('image', image);

  // Replace 'API_ENDPOINT' with the actual endpoint URL
  fetch('API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    var resultsDiv = document.getElementById('results');
    // Assuming the API returns a JSON object with a 'description' field
    resultsDiv.innerHTML = '<p><strong>Caption:</strong> ' + data.description + '</p>';
    resultsDiv.innerHTML += '<img src="' + URL.createObjectURL(image) + '" alt="Uploaded Image" style="max-width: 100%;">';
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
