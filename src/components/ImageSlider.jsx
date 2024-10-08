import React, { useEffect, useRef } from 'react';

const images = [
  "/images/disney_castle_100_anniversary_png__by_dracoawesomeness_dfuf1q2.png",
  "/images/dreamworks_logo__by_dracoawesomeness_dfuf2bp.png",
  "/images/PngItem_462522-removebg-preview.png",
  "/images/PngItem_264371.png"
];

const LogoSlider = () => {
  const slideRef = useRef(null);

  useEffect(() => {
    const copy = slideRef.current.cloneNode(true);
    slideRef.current.parentNode.appendChild(copy);
  }, []);

  return (
    <div className="logos">
      <div className="logos-slide" ref={slideRef}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`logo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;
