import React from "react";

export default function Main() {
  return (
    <div className="w-full h-auto">
      <video autoPlay muted loop playsInline className="w-full h-auto">
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag :(
      </video>
      <img></img>
    </div>
  );
}
