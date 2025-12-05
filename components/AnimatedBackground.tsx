import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="lava-lamp">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      {/* Overlay to darken for text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
    </div>
  );
};

export default AnimatedBackground;