import React from 'react';

export default function Header({ text }) {
  return (
    <header className="container">
      <div
        className="row bg-light py-2 mb-3 rounded"
        role="button"
        tabIndex="0"
      >
        <div className="col-md-12">
          <h3 className="text-center">{text}</h3>
        </div>
      </div>
    </header>
  );
}
