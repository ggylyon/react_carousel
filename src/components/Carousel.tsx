import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  defaultStep?: number;
  defaultFrameSize?: number;
  defaultItemWidth?: number;
  defaultAnimationDuration?: number;
  infinite?: false;
}

const Carousel: React.FC<Props> = ({
  images,
  defaultStep = 3,
  defaultFrameSize = 3,
  defaultItemWidth = 130,
  defaultAnimationDuration = 1000,
  infinite = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState(defaultStep);
  const [frameSize, setFrameSize] = useState(defaultFrameSize);
  const [itemWidth, setItemWidth] = useState(defaultItemWidth);
  const [animationDuration, setAnimationDuration] = useState(
    defaultAnimationDuration,
  );

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {images.map((image: string, index: number) => {
          return (
            <li
              key={image}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img src={image} alt={String(index + 1)} width={`${itemWidth}`} />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (currentSlide === 0 && infinite) {
            setCurrentSlide(images.length - frameSize);

            return;
          }

          if (currentSlide - step < 0) {
            setCurrentSlide(0);

            return;
          }

          setCurrentSlide(currentSlide - step);
        }}
        data-cy="prev"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          if (currentSlide >= images.length - frameSize && infinite) {
            setCurrentSlide(0);

            return;
          }

          if (currentSlide + frameSize + step >= images.length) {
            setCurrentSlide(images.length - frameSize);

            return;
          }

          setCurrentSlide(currentSlide + step);
        }}
        data-cy="next"
      >
        Next
      </button>

      <label htmlFor="stepId">Step: {step}</label>
      <input
        type="text"
        name="step"
        onChange={e => setStep(Number(e.target.value))}
        placeholder="Step"
        id="stepId"
      />

      <label htmlFor="frameId">Frame Size: {frameSize}</label>
      <input
        type="text"
        name="frameSize"
        onChange={e => setFrameSize(Number(e.target.value))}
        placeholder="Frame size"
        id="frameId"
      />

      <label htmlFor="itemId">Item Width: {itemWidth}px</label>
      <input
        type="text"
        name="itemWidth"
        onChange={e => setItemWidth(Number(e.target.value))}
        placeholder="Item width"
        id="itemId"
      />

      <label htmlFor="animationDurationId">
        Animation Duration: {animationDuration}ms
      </label>

      <input
        type="text"
        name="animationDuration"
        onChange={e => setAnimationDuration(Number(e.target.value))}
        placeholder="Animation Duration"
        id="animationDurationId"
      />
    </div>
  );
};

export default Carousel;
