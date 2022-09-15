import React, { useState } from "react";
export default function Exercise({ data, routine, setRoutine }) {
  const [toggled, setToggled] = useState(false);

  function toggle() {
    const alreadyExists = routine.includes(data);
    setToggled((prev) => !toggled);

    if (!alreadyExists) {
      setRoutine((prev) => [...prev, data]);
    } else {
      setRoutine(prev => routine.filter((d) => d.name !== data.name))
    }
  }
  return (
    <div className="exercise-details">
      <div onClick={toggle} className={`check ${toggled ? "yes" : "no"}`}></div>
      {data.category.name && (
        <div className="category">{data.category.name}</div>
      )}
      <h3>{data.name}</h3>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      {data.images.length > 0 && (
        <div className="exercise-details--image">
          {data.images.length > 0 &&
            data.images.map((el, index) => (
              <img src={el.image} alt={el.image} key={index} />
            ))}
        </div>
      )}
    </div>
  );
}
