import React from 'react';

const CardFunction = ({ name, path, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 p-4 rounded-lg shadow-md transition"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm mt-2">Ver detalles</p>
    </div>
  );
};

export default CardFunction;
