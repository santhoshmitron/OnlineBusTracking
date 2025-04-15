"use client";

import { useEffect, useRef } from "react";

interface MapViewProps {
  latitude: number;
  longitude: number;
}

export function MapView({ latitude, longitude }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an iframe with Google Maps embed
    if (mapRef.current) {
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "400";
      iframe.style.border = "0";
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=12`;
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";

      // Clear previous content and append the iframe
      mapRef.current.innerHTML = "";
      mapRef.current.appendChild(iframe);
    }
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="w-full h-full bg-gray-100">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
        </div>
      </div>
    </div>
  );
}
