import React from 'react';

export default function Footer() {
  return (
    <footer
      className="mt-3 bg-light fixed-bottom"
    >
      <div className="container py-0 text-center rounded">
        <p className="text-muted my-0 text-truncate">
          Developed and designed by
          <a className="badge badge-light" href="https://github.com/sogoagain/">sogoagain</a>
          .
        </p>
        <p className="text-muted my-0 text-truncate">
          Powered by
          <a className="badge badge-light" href="https://teachablemachine.withgoogle.com/">teachablemachine</a>
          ,
          <a className="badge badge-light" href="https://getbootstrap.com/">bootstrap</a>
          ,
          <a className="badge badge-light" href="https://reactjs.org/">React</a>
          .
        </p>
      </div>
    </footer>
  );
}
