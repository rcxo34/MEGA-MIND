import React from 'react';

const words = ['Fundamental Knowledge', 'Skills and Proficiency'];

const RotatingText = () => {
  return (
    <span className="relative overflow-hidden inline-block h-12">
      <span className="absolute top-0 left-0 w-full animate-slide">
        {words.map((word, index) => (
          <span className="block h-12" key={index}>{word}</span>
        ))}
      </span>
    </span>
  );
};

export default RotatingText;
