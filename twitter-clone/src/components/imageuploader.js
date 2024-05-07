import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setImageUrl(base64Image);
      console.log(base64Image); // Log the image URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <button>View Image</button>
        </a>
      )}
    </div>
  );
};

export default ImageUploader;
