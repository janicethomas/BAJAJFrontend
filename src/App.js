import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "21BPS1037";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsedData = JSON.parse(jsonData);

      const response = await fetch('https://bajajbackend-657h.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' },
  ];

  return (
    <div className="container">
      <h1>21BPS1037</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON data like {"data":["A","C","z"]}'
        />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>

      {responseData && (
        <>
          <Select
            isMulti
            options={options}
            className="select"
            onChange={handleSelectChange}
          />
          <div className="response">
            {selectedOptions.map((option) => (
              <div key={option.value}>
                <h3>{option.label}</h3>
                <p>{JSON.stringify(responseData[option.value])}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
