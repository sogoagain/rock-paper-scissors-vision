import React from 'react';

export default function Spinner({ width, height }) {
  return (
    <div className="mx-auto d-flex justify-content-around align-items-center" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
