import React, { useState } from "react";
export default function Exercise({ data }) {
  const [toggled, setToggled] = useState(false)
  return (
    <div className="exercise-details">
      <div className="check">{!toggled ? "➕" : "❌"}</div>
      {data.category.name && <div className="category">{data.category.name}</div>}
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
