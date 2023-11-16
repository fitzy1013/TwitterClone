import React, { useState } from "react";
import FileBase64 from "react-file-base64";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <FileBase64 multiple={false} onDone={({base64}) => setImageUrl(base64)} />
    </div>
  );
};

export default ImageUploader;
