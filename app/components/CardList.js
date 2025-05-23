"use client";

import React from "react";
import TaskCard from "./TaskCard"; // ✅ Correct import

const CardList = () => {
  const cardData = [
    {
      title: "Task 1",
      subtitle: "UI Design",
      tagsList: ["Design", "UI", "Figma"],
      description: "Create a landing page design",
    },
    {
      title: "Task 2",
      subtitle: "API Integration",
      tagsList: ["React", "API", "Axios"],
      description: "Connect frontend with backend services",
    },
    {
      title: "Task 3",
      subtitle: "Testing",
      tagsList: ["Jest", "React Testing Library"],
      description: "Write unit tests for components",
    },
    {
      title: "Task 4",
      subtitle: "Deployment",
      tagsList: ["Vercel", "CI/CD"],
      description: "Deploy the app to Vercel using GitHub Actions",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">
      {cardData.map((card, index) => (
        <TaskCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          tagsList={card.tagsList}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
