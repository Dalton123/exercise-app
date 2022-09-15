import React, { useState, useEffect } from "react";
import Exercise from "././components/exercise";
import "./App.css";

function App() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const localData = () => localStorage.getItem("API_DATA");
      if (localData() === null) {
        const res = await fetch(
          "https://wger.de/api/v2/exerciseinfo/?limit=500"
        );
        const data = await res.json();
        // Filter out any non English results
        const englishData = data.results.filter((d) => d.language.id === 2);
        // Add API data to local storage
        localStorage.setItem("API_DATA", JSON.stringify(englishData));
        setExercises((prev) => JSON.parse(localData()));
      } else {
        setExercises((prev) => JSON.parse(localData()));
      }
    }
    fetchData();
  }, []);

  function handleSearch(event) {
    // Get input value
    const { value } = event.target;
    // Store into search state
    setSearch((prev) => value.toLowerCase());

    // Filter out available exercise based on search state
    const filteredData = exercises.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.category.name.toLowerCase().includes(search)
    );

    setFilteredExercises((prev) => filteredData);
  }

  return (
    <div className="App">
      <div className="todo">
        Todo list
        <ul>
          <li>Feature: Add selected exercises to routine</li>
          <li>Feature: Add loading spinner</li>
        </ul>
      </div>
      <div className="header">
        <h1>Workout Buddy</h1>
        <input
          type="text"
          placeholder="Search for exercise"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="exercises">
        {filteredExercises.map((d) => (
          <Exercise data={d} key={d.id} />
        ))}
      </div>
      <div className="routine">
        <div className="count">8</div>
      </div>
    </div>
  );
}

export default App;
