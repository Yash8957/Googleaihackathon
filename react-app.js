
import React, { useState } from 'react';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          // Add any other headers required by the API
        },
        body: formData,
      });

      const data = await response.json();
      setCaption(data.description); // Adjust according to the API response structure
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Image Recognition App</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {caption && <p>Caption: {caption}</p>}
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          style={{ maxWidth: '500px' }}
        />
      )}
    </div>
  );
};

export default App;
```

To run this code, you'll need to have a React environment set up. You can create a new React app using Create React App by running `npx create-react-app my-app` in your terminal. Then, replace the contents of `App.js` with the code above.

Please note the following:
- Replace `'API_ENDPOINT'` with the actual endpoint URL provided by the image recognition API.
- Replace `'YOUR_API_KEY'` with your actual API key.
- The `fetch` function sends the image to the API endpoint using a POST request. The API should return a JSON object that includes a `description` field containing the caption for the image.
- The `handleUpload` function is called when the user clicks the upload button. It sends the selected image to the API and sets the caption state with the response.
- The `selectedImage` state holds the image file, and `caption` state holds the caption returned by the API.
- The image preview is displayed using `URL.createObjectURL(selectedImage)`.

Make sure to handle errors and responses according to the actual API you're using, as this code assumes a certain JSON response structure. Also, ensure you have the correct CORS configuration on your server to allow requests from your React app's origin.
