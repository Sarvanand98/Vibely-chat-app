import { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 80 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}</span>;
};

const IntroAnimation = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 3;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden perspective-1000"
      style={{
        background:
          "linear-gradient(-45deg, #0f172a, #1e293b, #334155, #1e293b)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 8s ease infinite",
      }}
    >
      {/* Morphing background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="morph-shape shape1"></div>
        <div className="morph-shape shape2"></div>
        <div className="morph-shape shape3"></div>
      </div>

      {/* Particle flow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              "--size": `${10 + Math.random() * 18}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--duration": `${5 + Math.random() * 10}s`,
              "--delay": `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Premium Card */}
      <div
        className="transform-3d hover:rotate3d relative z-10"
        style={{ perspective: "1500px" }}
      >
        <div
          className="flex flex-col items-center justify-center px-14 py-14 rounded-3xl relative shadow-premium"
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            backdropFilter: "blur(22px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transform: "translateZ(20px)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Subtle card highlight */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, transparent 100%)",
              }}
            ></div>
          </div>

          {/* Floating Logo with advanced effects */}
          <div className="relative mb-8 animate-float-advanced">
            <div className="absolute inset-0 rounded-full pulse-ring"></div>
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4ac.svg"
              alt="Chat Logo"
              className="h-28 w-28 relative z-10 drop-shadow-xl"
              style={{
                filter: "drop-shadow(0 0 60px #7c3aed)",
                animation: "logoGlowAdvanced 2s infinite alternate",
              }}
            />
          </div>

          {/* Title with advanced gradient */}
          <h1
            className="text-6xl font-black mb-2 tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #a78bfa, #7c3aed, #4f46e5, #8b5cf6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 10px 30px rgba(124,58,237,0.5)",
              animation: "gradientText 4s ease infinite",
            }}
          >
            Vibely
          </h1>

          {/* Sophisticated subtitle */}
          <p className="text-2xl font-light text-white/90 mb-10 tracking-wide">
            <Typewriter text="Connect. Chat. Learn." speed={60} />
          </p>

          {/* Custom progress bar */}
          <div className="w-56 h-2.5 bg-white/10 rounded-full overflow-hidden mb-1 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full relative"
              style={{ width: `${loadingProgress}%` }}
            >
              <div className="absolute inset-0 rounded-full shine-effect"></div>
            </div>
          </div>
          <div className="text-xs text-white/50">{loadingProgress}%</div>
        </div>
      </div>

      {/* Advanced Animations */}
      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .shadow-premium {
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5),
            0 0 30px 0px rgba(124, 58, 237, 0.2);
        }

        .hover\:rotate3d:hover {
          transform: rotateX(2deg) rotateY(2deg);
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-3d {
          transform-style: preserve-3d;
        }

        .morph-shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.15);
          filter: blur(120px);
        }

        .shape1 {
          top: 20%;
          left: 20%;
          width: 400px;
          height: 400px;
          animation: morphMove1 15s ease-in-out infinite alternate;
        }

        .shape2 {
          bottom: 10%;
          right: 20%;
          width: 500px;
          height: 500px;
          background: rgba(79, 70, 229, 0.15);
          animation: morphMove2 20s ease-in-out infinite alternate;
        }

        .shape3 {
          top: 50%;
          left: 50%;
          width: 350px;
          height: 350px;
          transform: translate(-50%, -50%);
          animation: morphMove3 18s ease-in-out infinite alternate;
        }

        @keyframes morphMove1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(100px, 50px) scale(1.4);
          }
        }

        @keyframes morphMove2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(-80px, -40px) scale(1.3);
          }
        }

        @keyframes morphMove3 {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-40%, -60%) scale(1.5);
          }
        }

        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(124, 58, 237, 0.4);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4);
          }
          70% {
            box-shadow: 0 0 0 25px rgba(124, 58, 237, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
          }
        }

        .shine-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shine 1.5s infinite linear;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          top: var(--y);
          left: var(--x);
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.15);
          filter: blur(3px);
          animation: particleFlow var(--duration) var(--delay) infinite alternate;
        }

        @keyframes particleFlow {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-80px) scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-150px) scale(0.8);
            opacity: 0.2;
          }
        }

        .animate-float-advanced {
          animation: floatAdvanced 3s infinite ease-in-out;
        }

        @keyframes floatAdvanced {
          0% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
          100% {
            transform: translateY(0) rotate(0);
          }
        }

        @keyframes logoGlowAdvanced {
          0% {
            filter: drop-shadow(0 0 40px #7c3aed);
          }
          100% {
            filter: drop-shadow(0 0 90px #4f46e5);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;