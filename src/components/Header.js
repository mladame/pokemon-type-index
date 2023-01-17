import React from "react";

export default function Header() {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="header jumbotron jumbotron-fluid text-center text-white">
      
      <h1 className="display-4 custom-h1" onClick={refreshPage}>Pokemon Type Stats</h1>
    </div>
  );
}
