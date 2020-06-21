import React from 'react';

export default function MutedText({ text }) {
  return (
    <p className="text-center my-0">
      <small className="text-muted">{text}</small>
    </p>
  );
}
