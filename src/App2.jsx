import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const GlobeApp = () => {
  const globeRef = useRef();
  const [gData, setGData] = useState([]);

  const markerSvg = `<svg viewBox="-4 0 36 36">
                <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                <circle fill="black" cx="14" cy="14" r="7"></circle>
                </svg>`;

  // Function to generate random data for markers
  const generateMarkers = (numMarkers) => {
    return [...Array(numMarkers).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: 7 + Math.random() * 30,
      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    }));
  };

  useEffect(() => {
    // Initialize with a smaller set of markers
    setGData(generateMarkers(30));

    const globe = globeRef.current;

    if (globe) {
      // Start auto-rotate
      globe.controls().autoRotate = true;   // Enable auto-rotate
      globe.controls().autoRotateSpeed = 0.5;  // Adjust speed of rotation

      // Handle zoom events
      const handleZoom = () => {
        const zoomLevel = globe.camera().position.length();

        // Add more markers as the user zooms in
        if (zoomLevel < 200) {
          setGData(generateMarkers(100)); // More markers when zoomed in
        } else {
          setGData(generateMarkers(30)); // Fewer markers when zoomed out
        }
      };

      // Add event listener for zoom changes
      globe.controls().addEventListener("change", handleZoom);

      return () => {
        // Clean up event listener
        globe.controls().removeEventListener("change", handleZoom);
      };
    }
  }, []);

  return (
    <Globe
      ref={globeRef}  // Attach the ref to the globe component
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      htmlElementsData={gData}
      htmlElement={(d) => {
        const el = document.createElement("div");

        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        el.onclick = () => {
          el.innerHTML = "<p>Popup</p>";
          console.info(el);
        };

        return el;
      }}
    />
  );
};

export default GlobeApp;
