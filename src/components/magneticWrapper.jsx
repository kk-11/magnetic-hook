import { useState, useRef, useEffect } from "react";
import gsap, { Power4, Elastic } from "gsap";
import { useMousePosition } from "../hooks/useMousePosition";

const magneticPullX = 0.8;
const magneticPullY = 0.9;
const durationPull = 0.4;
const durationRetract = 0.7;
const springStiffness = 0.5;

const onEnter = (item, x, y) => {
  gsap.to(item, {
    x: x * magneticPullX,
    y: y * magneticPullY,
    ease: Power4.easeOut,
    duration: durationPull,
  });
};

const onLeave = (item) => {
  gsap.to(item, {
    x: 0,
    y: 0,
    ease: Elastic.easeOut.config(1.1, springStiffness),
    duration: durationRetract,
  });
};

export default function MagneticWrapper({ children }) {
  const ref = useRef(null);
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [wrapper, setWrapper] = useState({
    center: { x: 0, y: 0 },
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = ref.current;
    const x = offsetLeft + offsetWidth / 2;
    const y = offsetTop + offsetHeight / 2;
    const width = offsetWidth;
    const height = offsetHeight;

    setWrapper({ center: { x, y }, width, height });
  }, [ref.current]);

  const dx = x - wrapper.center.x;
  const dy = y - wrapper.center.y;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const hoverArea = isHovering ? 1 : 1; //hover area must be larger than not hovering.
  if (distance < wrapper.width * hoverArea) {
    //whichever is larger
    if (!isHovering) {
      setIsHovering(true);
    }
    onEnter(ref.current, dx, dy);
  } else {
    if (isHovering) {
      onLeave(ref.current);
      setIsHovering(false);
    }
  }

  return <div ref={ref}>{children}</div>;
}
