import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { toPng } from 'html-to-image';
import './TShirtDesigner.css';

const TshirtDesigner = () => {
  const [file, setFile] = useState(null);
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [name, setName] = useState('Your Name');
  const [fontSize, setFontSize] = useState(20); 
  const tshirtRef = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)); 
  };

  const downloadImage = () => {
    if (tshirtRef.current) {
      toPng(tshirtRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'tshirt-design.png';
          link.click();
        })
        .catch((err) => {
          console.error('Could not download image', err);
        });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>T-Shirt Designer</h1>

      <input type="file" onChange={handleFileUpload} />
      <br />

      <label>Choose T-shirt Color: </label>
      <input 
        type="color" 
        value={tshirtColor} 
        onChange={(e) => setTshirtColor(e.target.value)} 
      />
      <br />

      <div 
        ref={tshirtRef}
        style={{
          backgroundColor: tshirtColor,
          width: '300px',
          height: '400px',
          margin: '20px auto',
          position: 'relative',
        }}
      >
        {file && (
          <Draggable>
            <img
              src={file}
              alt="T-shirt design"
              style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
              }}
            />
          </Draggable>
        )}

        <Draggable>
          <div
            style={{
              position: 'absolute',
              top: '350px',
              left: '50px',
              fontSize: `${fontSize}px`, 
              fontWeight: 'bold',
            }}
          >
            {name}
          </div>
        </Draggable>
      </div>

      <input 
        type="text" 
        value={name} 
        onChange={handleNameChange} 
        placeholder="Enter your name" 
      />
      <br />

      <div style={{ marginTop: '10px' }}>
        <button onClick={decreaseFontSize} style={{ marginRight: '10px' }}>Decrease Font Size</button>
        <button onClick={increaseFontSize}>Increase Font Size</button>
      </div>

      <button onClick={downloadImage} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Download
      </button>
    </div>
  );
};

export default TshirtDesigner;
