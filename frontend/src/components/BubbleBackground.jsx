
import { useEffect, useState } from "react";

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const array = [];
    const bubbleCount = 120; // Increased number of bubbles for full coverage

    for (let i = 0; i < bubbleCount; i++) {
      array.push({
        size: Math.random() * 80 + 20, // Size between 20px and 100px
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 15 + 10, // Animation speed
        delay: Math.random() * 5, // Start delay
        sway: Math.random() * 20 - 10, // Random sway offset
        swaySpeed: Math.random() * 5 + 5, // Sway speed
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        directionX: Math.random() > 0.5 ? 1 : -1,
        directionY: Math.random() > 0.5 ? 1 : -1
      });
    }

    setBubbles(array);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}vw`,
            top: `${bubble.top}vh`,
            backgroundColor: bubble.color,
            animation: `bubble-move ${bubble.duration}s ease-in-out infinite alternate`,
            animationDelay: `${bubble.delay}s`,
            "--sway": `${bubble.sway}px`,
            "--swaySpeed": `${bubble.swaySpeed}s`,
            zIndex: -1
          }}
        ></div>
      ))}

      <style>
        {`
          @keyframes bubble-move {
            0% {
              transform: translate(0px, 0px) scale(1) rotate(0deg) translateX(var(--sway));
              opacity: 0.2;
            }
            25% {
              transform: translate(15px, -10px) scale(1.05) rotate(15deg) translateX(calc(var(--sway) * 0.5));
              opacity: 0.6;
            }
            50% {
              transform: translate(-20px, 20px) scale(1.1) rotate(30deg) translateX(calc(var(--sway) * -1));
              opacity: 0.8;
            }
            75% {
              transform: translate(10px, -15px) scale(1.05) rotate(45deg) translateX(calc(var(--sway) * 0.7));
              opacity: 0.6;
            }
            100% {
              transform: translate(0px, 0px) scale(1) rotate(0deg) translateX(var(--sway));
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
  );
}
