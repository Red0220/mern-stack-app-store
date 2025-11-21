import React, { useRef, useState, useCallback, useMemo } from "react";

const ZoomImg = ({ src, alt, zoomLevel = 2, className = "" }) => {
    const containerRef = useRef(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

    // Handle mouse movement
    const handleMouseMove = useCallback((e) => {
        if (!isZoomed || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({ x, y });
    }, [isZoomed]);

    // Desktop: hover = zoom, leave = unzoom
    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);

    // Click-to-toggle zoom (desktop + mobile)
    const handleClick = () => setIsZoomed((prev) => !prev);

    // Memoized background style for zoom
    const zoomStyle = useMemo(
        () => ({
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }),
        [src, zoomLevel, zoomPosition]
    );

    return (
        <div className={`max-w-md sm:max-w-6xl  bg-transparent rounded-md shadow-lg shadow-gray-300 p-4 ${className}`}>
            <div
                ref={containerRef}
                className={`relative overflow-hidden rounded-md 
                ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* Base Image */}
                <img
                    src={src}
                    alt={alt}
                    className="w-[700px] h-96 md:h-[500px] object-cover rounded transition-opacity duration-200"
                    style={{ opacity: isZoomed ? 0.6 : 1 }}
                    draggable="false"
                />

                {/* Zoom Layer */}
                {isZoomed && (
                    <div
                        className="absolute inset-0 pointer-events-none rounded"
                        style={zoomStyle}
                    />
                )}

                {/* Zoom Label */}
                {isZoomed && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        Zoom {zoomLevel}x
                    </div>
                )}
            </div>

            {/* Message */}
            <p className="text-xs text-gray-600 mt-2 text-center select-none">
                {isZoomed ? "Click or move mouse away to exit" : "Hover or click to zoom"}
            </p>
        </div>
    );
};

export default ZoomImg;
