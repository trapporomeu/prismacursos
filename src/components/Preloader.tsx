import { useEffect, useMemo, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 137.5 + 13) % 100}%`,
        top: `${(i * 61.8 + 7) % 100}%`,
        size: 2 + (i % 3) * 2,
        delay: `${(i % 8) * 0.4}s`,
        duration: `${3.5 + (i % 5)}s`,
      })),
    []
  );

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setIsExiting(true), 250);
        setTimeout(() => onComplete(), 700);
      } else {
        setProgress(current);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 32%, #171a1a 0%, #0d0f0f 55%, #090b0b 100%)",
      }}
    >
      {/* Aurora glow superior */}
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(194,244,37,0.13) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      {/* Aurora glow inferior */}
      <div
        className="absolute -bottom-44 -right-28 w-[520px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125,187,0,0.11) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Grade de fundo sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#c2f425 1px, transparent 1px), linear-gradient(90deg, #c2f425 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Partículas cintilantes */}
      {particles.map((pt) => (
        <span
          key={pt.id}
          className="absolute rounded-full bg-[#c2f425] pointer-events-none animate-pulse"
          style={{
            left: pt.left,
            top: pt.top,
            width: pt.size,
            height: pt.size,
            opacity: 0.16,
            animationDelay: pt.delay,
            animationDuration: pt.duration,
          }}
        />
      ))}

      {/* Conteúdo central */}
      <div className="relative flex flex-col items-center gap-8 mb-12">
        {/* Logo com anéis */}
        <div className="relative">
          {/* Radar ping externo */}
          <div
            className="absolute -inset-6 rounded-full border border-[#c2f425]/15 animate-ping pointer-events-none"
            style={{ animationDuration: "2.6s" }}
          />
          {/* Glow pulsante */}
          <div className="absolute inset-0 rounded-3xl blur-2xl bg-[#c2f425]/20 animate-pulse" />
          {/* Chip logo */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#1a1c1c] to-[#0e1010] border border-[#c2f425]/30 flex items-center justify-center shadow-[0_0_45px_rgba(194,244,37,0.28)]">
            {/* Arco giratório */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin"
              style={{ animationDuration: "1.2s" }}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#c2f425"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="70 220"
              />
            </svg>
            {/* Prisma */}
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#c2f425]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            >
              <path d="M12 2 L21 18 L3 18 Z" />
              <path d="M12 2 L12 18" opacity="0.5" />
              <path d="M7 18 L12 18 L12 8 Z" fill="#c2f425" opacity="0.14" />
            </svg>
          </div>
        </div>

        {/* Marca */}
        <div className="text-center">
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            PRISMA<span className="text-[#c2f425]">.</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-8 sm:w-10 bg-gradient-to-r from-transparent to-[#c2f425]/60" />
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#c2f425] font-bold">
              Escola de Fluência
            </p>
            <span className="h-px w-8 sm:w-10 bg-gradient-to-l from-transparent to-[#c2f425]/60" />
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="w-56 sm:w-64">
        <div className="relative h-[20px] bg-[#282a2b] rounded-full overflow-hidden">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#a8d700] to-[#c2f425] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(194,244,37,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[10px] text-[#c2f425] tabular-nums">
            {Math.floor(progress)}%
          </span>
          <span className="font-mono text-[10px] text-[#c4c9ae]/60 uppercase tracking-wider">
            {progress < 30
              ? "Inicializando"
              : progress < 60
              ? "Carregando módulos"
              : progress < 100
              ? "Sincronizando"
              : "Pronto"}
          </span>
        </div>
      </div>
    </div>
  );
}