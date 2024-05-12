import React, { useState, useEffect, useRef } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [fullTextIndex, setFullTextIndex] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const toggleFullText = (index, item) => {
    setFullTextIndex(fullTextIndex === index ? null : index);
    setSelectedText(fullTextIndex === index ? null : item);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        const { scrollWidth, clientWidth } = inputRef.current;
        if (scrollWidth > clientWidth) {
          setFullTextIndex(null);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  return (
    <div className="container">
      <label htmlFor="text">
        <input
          ref={inputRef}
          type="text"
          id="text"
          value={inputValue}
          placeholder="Please enter a value"
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          style={{ border: "solid 1px black"}}
        />
      </label>
      <ul>
        {items.map((item, index) => (
          <li key={index}
           onClick={() => toggleFullText(index, item)}
           style={{cursor : "pointer", backgroundColor: selectedText === item ? "black" : "transparent", color: selectedText === item ? "white" : "inherit"}}>
            {fullTextIndex === index || item.length <= 10 ? item : `${item.slice(0, 10)}...`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;