// components/CardList.js
"use client";

import React from "react";
import Card from "./Card";

const CardList = () => {
  const cardData = [
    { title: "Task 1", description: "Description for task 1" },
    { title: "Task 2", description: "Description for task 2" },
    { title: "Task 3", description: "Description for task 3" },
    { title: "Task 4", description: "Description for task 4" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
