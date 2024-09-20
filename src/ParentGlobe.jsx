import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const markerSvg = `<svg viewBox="-4 0 36 36">
                              <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                              <circle fill="black" cx="14" cy="14" r="7"></circle>
                          </svg>`;

import EarthImg from "./assets/earth-blue-marble.jpg";

const GlobeApp = () => {
  const globeRef = useRef();
  const [gData, setGData] = useState([
    { lat: 20.59, lng: 78.96, size: 40, color: "red", masterLevel: "India" },
    { lat: 12.87, lng: 121.77, size: 40, color: "blue", masterLevel: "Philippines" },
    { lat: 4.21, lng: 101.97, size: 40, color: "green", masterLevel: "Malaysia" },
  ]);

  const detailedData = [
    { lat: 12.9716, lng: 77.5946, size: 30, color: "red", masterLevel: "Bangalore" },
    { lat: 22.5744, lng: 88.3629, size: 30, color: "red", masterLevel: "Kolkata" },
    { lat: 17.4065, lng: 78.4772, size: 30, color: "red", masterLevel: "Hyderabad" },
    { lat: 14.5995, lng: 120.9842, size: 30, color: "blue", masterLevel: "Manila" },
    { lat: 3.139, lng: 101.6869, size: 30, color: "green", masterLevel: "Kuala Lumpur" },
  ];

  useEffect(() => {
    const globe = globeRef.current;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.2;
    globe.controls().enableZoom = true;

    const handleZoom = () => {
      const zoomLevel = globe.camera().position.length();
      if (zoomLevel < 300) {
        setGData(detailedData);
      } else {
        setGData([
          { lat: 20.59, lng: 78.96, size: 40, color: "red", masterLevel: "India" },
          { lat: 12.87, lng: 121.77, size: 40, color: "blue", masterLevel: "Philippines" },
          { lat: 4.21, lng: 101.97, size: 40, color: "green", masterLevel: "Malaysia" },
        ]);
      }
    };

    globe.controls().addEventListener("change", handleZoom);
    return () => globe.controls().removeEventListener("change", handleZoom);
  }, []);

  const zoomIn = () => {
    const globe = globeRef.current;
    const zoomLevel = globe.camera().position.length();
    globe.camera().position.setLength(zoomLevel * 0.8);
  };

  const zoomOut = () => {
    const globe = globeRef.current;
    const zoomLevel = globe.camera().position.length();
    globe.camera().position.setLength(zoomLevel * 1.2);
  };

  return (
    <div style={{ position: "relative" }}>
      <Globe
        ref={globeRef}
        globeImageUrl={EarthImg}
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
            popup.style.zIndex = 9999;
            popup.style.fontFamily = "Arial";
            popup.style.width = "300px";
            popup.style.opacity = "0.8";
            popup.innerHTML = `<p> AC Location: ${d.masterLevel}</p>`;

            // Append popup next to marker
            el.appendChild(popup);

            setTimeout(() => {
              el.removeChild(popup);
            }, 2000);
          };

          return el;
        }}
      />
      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column" }}>
        <button onClick={zoomIn} style={zoomButtonStyle}>
          Zoom In
        </button>
        <button onClick={zoomOut} style={zoomButtonStyle}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

const zoomButtonStyle = {
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  padding: "10px",
  margin: "5px",
  cursor: "pointer",
  fontSize: "16px",
  opacity: "0.8",
  fontFamily: "Arial",
};

export default GlobeApp;
