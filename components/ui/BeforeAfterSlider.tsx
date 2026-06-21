import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [position, setPosition] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) getPosition(e.clientX); };
  const onTouchStart = () => { dragging.current = true; };
  const onTouchEnd = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { getPosition(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="ba-container relative w-full aspect-[4/3] select-none"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {/* Before layer */}
      <img
        src={beforeImage}
        alt="Original garment"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* After layer — clipped to right of handle */}
      <div
        className="ba-after overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="Transformed creation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-5 right-5 bg-white/90 px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium">
          {afterLabel}
        </div>
      </div>

      {/* Before label */}
      <div className="absolute bottom-5 left-5 bg-white/90 px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium"
        style={{ visibility: position > 10 ? 'visible' : 'hidden' }}>
        {beforeLabel}
      </div>

      {/* Divider handle */}
      <div
        className="ba-handle"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="ba-handle-btn">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M7 11H3M7 11L5 9M7 11L5 13" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 11H19M15 11L17 9M15 11L17 13" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Instruction hint */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full tracking-wider pointer-events-none opacity-70">
        Drag to compare
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
