import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const GlobeApp = () => {
  const globeRef = useRef();

  const markerSvg = `<svg viewBox="-4 0 36 36">
                <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                <circle fill="black" cx="14" cy="14" r="7"></circle>
                </svg>`;

  // Generate random data for markers
  const N = 30;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 7 + Math.random() * 30,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  }));

  useEffect(() => {
    // Start auto-rotate
    const globe = globeRef.current;
    globe.controls().autoRotate = true;   // Enable auto-rotate
    globe.controls().autoRotateSpeed = 0.5;  // Adjust speed of rotation
    globe.controls().enableZoom = true;  // Enable zoom controls
  }, []);

  return (
    <Globe
      ref={globeRef}  // Attach the ref to the globe component
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      htmlElementsData={gData}
      htmlElement={(d) => {
        const el = document.createElement("div");

        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        el.onclick = () => {
          const popup = document.createElement("div");

          // Style the popup element
          popup.style.position = "absolute";
          popup.style.background = "#fff";
          popup.style.padding = "5px 10px";
          popup.style.borderRadius = "5px";
          popup.style.border = "1px solid #ccc";
          popup.style.color = "#333";
          popup.style.zIndex = 10;
          popup.innerHTML = `<p>Location: ${d.lat.toFixed(2)}, ${d.lng.toFixed(2)}</p>`;
          
          // Append popup next to marker
          el.appendChild(popup);

          // Optional: Remove the popup on next click
          setTimeout(() => {
            el.removeChild(popup);
          }, 2000); // Popup will disappear after 2 seconds
        };

        return el;
      }}
    />
  );
};

export default GlobeApp;
