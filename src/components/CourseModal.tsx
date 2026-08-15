import React, { useState, useEffect } from "react";
import { 
  X, Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Sparkles, 
  ChevronLeft, ChevronDown, ChevronUp, Heart, Star, Maximize2, SkipBack, SkipForward, 
  Smile, Image as ImageIcon, Send, MessageSquare, ThumbsUp, Trash2, Edit2
} from "lucide-react";

interface CourseModalProps {
  courseTitle: string;
  courseInstructor: string;
  courseImg: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (title: string) => void;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  likes: number;
  isLikedByUser?: boolean;
  userEmail?: string;
}

export default function CourseModal({
  courseTitle,
  courseInstructor,
  courseImg,
  isOpen,
  onClose,
  onComplete
}: CourseModalProps) {
  // Retrieve user email to display customized watermark & store custom states per user
  const loggedEmail = localStorage.getItem("prisma_userEmail") || "trapporomeu@gmail.com";
  const normalizedEmail = loggedEmail.toLowerCase().trim();
  // Extract name prefix for presentation
  const loggedName = loggedEmail.split("@")[0].toUpperCase();
  const userNameDisplay = localStorage.getItem("prisma_userName") || "Romeu Carvalho Domingues"; // As pictured in the design
  const userAvatarDisplay = localStorage.getItem("prisma_userAvatar") || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";

  // Video and playing simulation states
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 100% as in the image default, unique per user and course
  const [progress, setProgress] = useState<number>(() => {
    const saved = localStorage.getItem(`prisma_progress_${normalizedEmail}_${courseTitle}`);
    return saved ? parseInt(saved, 10) : 100;
  });
  
  const [activeModuleIndex, setActiveModuleIndex] = useState(4); // Default to "Bônus" active as in the image
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(["bonus"]); // Default to Bônus open only (keeps grade compact)
  const [activeLessonId, setActiveLessonId] = useState<string>("l5_1"); // Default to the first lesson of Bonus module
  
  // Custom states matching the image actions, persistent per user and course
  const [isFavorited, setIsFavorited] = useState<boolean>(() => {
    return localStorage.getItem(`prisma_favorited_${normalizedEmail}_${courseTitle}`) === "true";
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    return localStorage.getItem(`prisma_completed_${normalizedEmail}_${courseTitle}`) !== "false";
  });
  
  const [showRatingMenu, setShowRatingMenu] = useState(false);
  const [rating, setRating] = useState<number>(() => {
    const saved = localStorage.getItem(`prisma_rating_${normalizedEmail}_${courseTitle}`);
    return saved ? parseInt(saved, 10) : 5;
  });
  
  const [activeBottomTab, setActiveBottomTab] = useState<"info" | "comments">("info");
  
  // Notes state with user and course-specific persistent storage
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem(`prisma_notes_${normalizedEmail}_${courseTitle}`) || "";
  });
  
  // Quiz evaluation overlay states
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Expanded certificate state
  const [certificateEmitted, setCertificateEmitted] = useState(false);
  
  // Comments feed state with some nice default classmate questions/interaction
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`prisma_comments_${courseTitle}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "c1",
        user: "Sarah English Officer",
        text: "Simplesmente sensacional esse hub de conteúdo! As aplicações práticas de IA e prompts me pouparam pelo menos 6 horas de trabalho manual essa semana.",
        timestamp: "Há 2 horas",
        likes: 12
      },
      {
        id: "c2",
        user: "Rodrigo Almeida",
        text: "Alguém conseguiu conectar a API do Deepseek com os prompts do módulo de copywriting? Rodou liso aqui!",
        timestamp: "Há 4 horas",
        likes: 5
      }
    ];
  });
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(null);

  // Subscribed Liked comments tracking
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`prisma_liked_comments_${normalizedEmail}_${courseTitle}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Automatically sync core states to localStorage based on the active user identity
  useEffect(() => {
    localStorage.setItem(`prisma_progress_${normalizedEmail}_${courseTitle}`, progress.toString());
  }, [progress, normalizedEmail, courseTitle]);

  useEffect(() => {
    localStorage.setItem(`prisma_favorited_${normalizedEmail}_${courseTitle}`, isFavorited ? "true" : "false");
  }, [isFavorited, normalizedEmail, courseTitle]);

  useEffect(() => {
    localStorage.setItem(`prisma_completed_${normalizedEmail}_${courseTitle}`, isCompleted ? "true" : "false");
  }, [isCompleted, normalizedEmail, courseTitle]);

  useEffect(() => {
    localStorage.setItem(`prisma_rating_${normalizedEmail}_${courseTitle}`, rating.toString());
  }, [rating, normalizedEmail, courseTitle]);

  useEffect(() => {
    localStorage.setItem(`prisma_comments_${courseTitle}`, JSON.stringify(comments));
  }, [comments, courseTitle]);

  useEffect(() => {
    localStorage.setItem(`prisma_liked_comments_${normalizedEmail}_${courseTitle}`, JSON.stringify(likedCommentIds));
  }, [likedCommentIds, normalizedEmail, courseTitle]);

  // List of modules customizable to course experience
  const modulesList = [
    { 
      id: "mod1", 
      name: "Módulo 1", 
      title: "Introdução & Alinhamento de Expectativas", 
      duration: "12 min",
      lessons: [
        { id: "l1_1", title: "Boas-vindas ao Prisma Pro!", duration: "3 min" },
        { id: "l1_2", title: "Alinhamento de Expectativas", duration: "4 min" },
        { id: "l1_3", title: "Como aproveitar a nossa Comunidade", duration: "5 min" },
      ]
    },
    { 
      id: "mod2", 
      name: "Módulo 2", 
      title: "Fundamentos Tecnológicos da Inteligência Artificial", 
      duration: "25 min",
      lessons: [
        { id: "l2_1", title: "O que é Inteligência Artificial de fato", duration: "8 min" },
        { id: "l2_2", title: "Como funcionam os LLMs & Modelos", duration: "10 min" },
        { id: "l2_3", title: "Segurança de Dados e Nuvens Privadas", duration: "7 min" },
      ]
    },
    { 
      id: "mod3", 
      name: "Módulo 3", 
      title: "Criação de Prompts & Conversação Estruturada", 
      duration: "40 min",
      lessons: [
        { id: "l3_1", title: "Acesse AQUIP GRUPO PROMPTs DO LANG", duration: "5 min" },
        { id: "l3_2", title: "Princípios Básicos da Engenharia de Prompts", duration: "12 min" },
        { id: "l3_3", title: "Técnicas Avançadas Few-shot e Zero-shot", duration: "13 min" },
        { id: "l3_4", title: "Estruturação de Prompts Corporativos", duration: "10 min" },
      ]
    },
    { 
      id: "mod4", 
      name: "Módulo 4", 
      title: "Aplicações de Negócios & Automações", 
      duration: "35 min",
      lessons: [
        { id: "l4_1", title: "Mapeando Gargalos que IA Pode Resolver", duration: "10 min" },
        { id: "l4_2", title: "Configurando Automações com APIs", duration: "15 min" },
        { id: "l4_3", title: "Estudos de Caso Reais do Mercado", duration: "10 min" },
      ]
    },
    { 
      id: "bonus", 
      name: "Bônus", 
      title: "HUB - Criação de conteúdo & Estratégias", 
      duration: "18 min",
      lessons: [
        { id: "l5_1", title: "Geração de Conteúdo em Lote com IA", duration: "6 min" },
        { id: "l5_2", title: "Do Rascunho à Distribuição Automatizada", duration: "6 min" },
        { id: "l5_3", title: "Copywriting de Alta Conversão com IA", duration: "6 min" },
      ]
    }
  ];

  const currentModule = modulesList[activeModuleIndex] || modulesList[4];
  const allLessons = modulesList.flatMap((m) => m.lessons);
  const activeLesson = allLessons.find((les) => les.id === activeLessonId) || allLessons[allLessons.length - 3] || allLessons[0];

  // Auto-play progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  // Handle saving notes
  const handleSaveNotes = () => {
    localStorage.setItem(`prisma_notes_${normalizedEmail}_${courseTitle}`, notes);
    alert(`Prisma Pro: Suas anotações para o curso "${courseTitle}" foram salvas com sucesso para o usuário ${loggedEmail}!`);
  };

  // Handle adding comments
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const added: Comment = {
      id: `comm-${Date.now()}`,
      user: userNameDisplay,
      text: newCommentText,
      timestamp: "Agora mesmo",
      likes: 0,
      userEmail: normalizedEmail
    };
    setComments((prev) => [added, ...prev]);
    setNewCommentText("");
  };

  // Handle saving edited comment
  const handleSaveEditedComment = (id: string) => {
    if (!editingCommentText.trim()) return;
    setComments((prev) => 
      prev.map((c) => (c.id === id ? { ...c, text: editingCommentText } : c))
    );
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  // Handle deleting a comment
  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLikeComment = (id: string) => {
    const isAlreadyLiked = likedCommentIds.includes(id);
    let newLikedIds: string[];
    if (isAlreadyLiked) {
      newLikedIds = likedCommentIds.filter((cid) => cid !== id);
    } else {
      newLikedIds = [...likedCommentIds, id];
    }
    setLikedCommentIds(newLikedIds);

    setComments((prev) => 
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            likes: isAlreadyLiked ? Math.max(0, c.likes - 1) : c.likes + 1
          };
        }
        return c;
      })
    );
  };

  // Toggle module completion status
  const toggleCompletion = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (newState) {
      onComplete(courseTitle);
    }
  };

  // Trigger certificate popup
  const handleEmitCertificate = () => {
    setCertificateEmitted(true);
    onComplete(courseTitle);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#121414] text-[#e2e2e2] z-50 flex flex-col overflow-y-auto custom-scrollbar font-sans select-text">
      
      {/* 1. HIGH FIDELITY TOP NAV HEADER */}
      <header className="w-full bg-[#121414]/90 backdrop-blur-md border-b border-[#444934]/30 px-3 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-between sticky top-0 z-40 gap-3">
        {/* Left Area: Sleek Back Arrow & Official Logo Image */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <button 
            type="button"
            id="course-close-btn"
            onClick={onClose}
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-[#1a1c1c] border border-[#444934]/50 text-[#c4c9ae] hover:text-[#c2f425] hover:border-[#c2f425] transition-all flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer shrink-0"
            title="Voltar para a Vitrine"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          
          <img
            alt="Escola de IA Logo"
            className="h-6 sm:h-8 md:h-9 w-auto object-contain min-w-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCozAWHCV-m6qH2nsaVf7y8wN4DVkYSyG_92bFJYIBxDHILa2ECAyFb9V9PASlNZuHlb8Ibk5_R9CcdnkKclFHx_FL7e72-rT24vkSw3hjMBy3qZaXScPFUhW2W61uFcxIYQZpxdtrYU5oKRypxrhrFd2xLoVHD0LGWtqT20EwoFHacY_XF-IJe1CcHoc-qZDmxtZ_Q0D5tWXcHUvPMKRdNwBJisATR00RhqaQ-R3N9uopH9EvcH7eCYf3M1kmpqnrOpsajm0QGL3A"
          />
        </div>

        {/* Right Area: User Welcome message & portrait profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Estudante Ativo</p>
            <p className="text-[13px] font-bold text-white transition-all leading-none mt-0.5 max-w-[160px] truncate">
              {userNameDisplay}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#c2f425] to-[#7dbb00] p-0.5 overflow-hidden ring-2 ring-[#c2f425]/20 select-none shrink-0">
            <img 
              src={userAvatarDisplay} 
              alt="Avatar de Usuário" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* 2. CORE DEREGISTURED PREMIUM HERO HEADING (AS SEEN IN ATTACHMENT) */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-14 mt-4 sm:mt-6 lg:mt-8 mb-4 sm:mb-6 flex flex-col items-center justify-center text-center">
        <h1 className="font-headline text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white tracking-wide leading-tight max-w-4xl px-2">
          {courseTitle}
        </h1>
        
        {/* Spacious Interactive Progress line */}
        <div className="w-full max-w-[550px] flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5">
          <div 
            className="flex-1 h-2 bg-white/10 rounded-full relative overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.round((clickX / rect.width) * 100);
              setProgress(percentage);
            }}
            title="Clique para ajustar o progresso"
          >
            <div 
              className="h-full bg-[#c2f425] rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[13px] font-mono font-bold text-[#c2f425] shrink-0">
            {progress}%
          </span>
        </div>

        {/* Certificate buttons with elegant borders */}
        {progress === 100 ? (
          <button
            type="button"
            id="emit-certificate-header-btn"
            onClick={handleEmitCertificate}
            className="bg-[#c2f425] text-black font-extrabold font-headline text-[12px] py-3.5 px-8 rounded-full hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(194,244,37,0.3)] transition-all uppercase tracking-wide cursor-pointer text-center mt-5"
          >
            Emitir certificado
          </button>
        ) : (
          <div className="mt-5 p-3 px-4 sm:px-6 rounded-full bg-[#1a1c1c] border border-[#444934]/30 text-[11px] sm:text-xs text-[#c4c9ae] flex items-center gap-2 select-none max-w-full">
            <AlertCircle className="w-3.5 h-3.5 text-[#c2f425] shrink-0" />
            <span>Complete <strong className="text-[#c2f425]">100%</strong> do progresso do curso para liberar o botão de Emitir Certificado.</span>
          </div>
        )}
      </section>

      {/* 3. CORE SYSTEM SPLIT - TWO-ROW COMPREHENSIVE VIEWPORT */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-14 pb-12 sm:pb-20 flex flex-col gap-6 sm:gap-10">
        
        {/* ROW 1: PREMIER MOUNTED PLAYBACK & LESSON INDEX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* COLUMN Left (Col Span 9) - Video Player & Media controls */}
          <div className="lg:col-span-9 flex flex-col bg-[#1a1c1c] rounded-2xl border border-[#444934]/30 p-3 sm:p-5 justify-between">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/5 relative group shadow-2xl">
              
              {/* Main Simulated Video Screen area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                <img
                  src={courseImg}
                  alt="Lesson Thumbnail Stream"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                    isPlaying ? "opacity-15 blur-[2px] scale-105" : "opacity-35"
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* THE HIGH-FIDELITY WATERMARK (AS SEEN IN ATTACHMENT) */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-20 overflow-hidden px-4">
                  <div className="rotate-[-12deg] bg-black/40 backdrop-blur-xs px-4 sm:px-5 py-2 rounded-lg border border-white/5 text-center shadow-lg max-w-full">
                    <p className="text-[10px] sm:text-[12px] font-mono tracking-widest text-[#c2f425]/50 font-bold truncate max-w-[60vw] sm:max-w-none">
                      {loggedEmail}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/30 uppercase mt-0.5">
                      SINC: 07628153453 PRO
                    </p>
                  </div>
                </div>

                {/* Micro Animated state indicators */}
                {isPlaying ? (
                  <div className="z-10 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-4 border-[#c2f425]/30 border-t-[#c2f425] animate-spin flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#c2f425] animate-pulse" />
                    </div>
                    <span className="text-[10px] text-[#c2f425] font-mono tracking-widest uppercase animate-pulse bg-black/60 px-3 py-1 rounded">
                      Transmitindo Vídeo HD...
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="z-10 w-16 h-16 rounded-full bg-[#c2f425] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(194,244,37,0.4)] cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                )}

                {/* Floating technical HUD layers */}
                <div className="absolute top-3 left-3 font-mono text-[8px] sm:text-[9px] text-[#c2f425]/40 flex flex-col gap-0.5 select-none pointer-events-none bg-black/40 p-1.5 sm:p-2 rounded">
                  <span>RESOLUÇÃO: 1080P PRO</span>
                  <span className="hidden xs:inline">FEED: CDN LATAM-EAST</span>
                </div>
                
                <div className="absolute bottom-4 right-4 font-mono text-[8px] sm:text-[9px] text-[#c2f425]/40 select-none pointer-events-none bg-black/40 px-2 py-1 rounded">
                  PRISMA WATCH v2.4
                </div>

                {/* Floating Timeline Time duration marker (as seen in attachment) */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-white/80 border border-white/5">
                  10:41
                </div>
              </div>
            </div>

            {/* Video Controls Action Row underneath screen */}
            <div className="mt-3 sm:mt-4 pt-3 border-t border-[#444934]/20 flex flex-wrap items-center justify-between gap-3">
              {/* Media controls (as seen in image) */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold cursor-pointer hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" /> <span className="hidden xs:inline">PAUSAR</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> <span className="hidden xs:inline">REPRODUZIR</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    const prevIdx = activeModuleIndex > 0 ? activeModuleIndex - 1 : 4;
                    setActiveModuleIndex(prevIdx);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                  title="Módulo Anterior"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = activeModuleIndex < 4 ? activeModuleIndex + 1 : 0;
                    setActiveModuleIndex(nextIdx);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                  title="Próximo Módulo"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setProgress(0)}
                  className="p-2 sm:p-2.5 rounded-full bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                  title="Reiniciar Aula"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress track background feedback */}
              <div className="hidden md:flex flex-col text-right">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Módulos Concluídos</span>
                <span className="text-[12px] font-bold text-[#c2f425]">{activeModuleIndex}/5 concluídos</span>
              </div>

              {/* Fullscreen icon controls (as seen on the right bottom of the image) */}
              <button
                type="button"
                onClick={() => {
                  alert("Modo teatro maximizado ativado na viewport!");
                }}
                className="p-2 sm:p-2.5 rounded-full bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                title="Expandir Tela"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COLUMN Right (Col Span 3) - Modules list (As seen in the attachment) */}
            <div className="lg:col-span-3 flex flex-col gap-3.5 min-w-0 min-h-0 max-h-[calc(100vh-260px)]">
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#c2f425] px-1 flex items-center gap-1.5 font-mono shrink-0">
                <Sparkles className="w-3.5 h-3.5 shrink-0" /> GRADE DO CURSO
              </h3>
              
<div 
              className="flex flex-col gap-3 grade-scrollbar pr-1 flex-1 min-h-0 overflow-y-auto"
            >
              {modulesList.map((mod, idx) => {
                const isExpanded = expandedModuleIds.includes(mod.id);
                const isModuleActive = activeModuleIndex === idx;

                const toggleModule = (moduleId: string) => {
                  setExpandedModuleIds(prev => 
                    prev.includes(moduleId) 
                      ? prev.filter(id => id !== moduleId) 
                      : [...prev, moduleId]
                  );
                };

                return (
                  <div key={mod.id} className="flex flex-col rounded-xl overflow-hidden bg-[#161818] border border-[#444934]/20 mb-2">
                    {/* Header Button (Folder bar) */}
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full text-left p-3.5 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isExpanded 
                          ? "bg-[#1f2121] border-b border-[#444934]/30" 
                          : "bg-[#1a1c1c] border-b border-transparent hover:bg-[#1e2020]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                          idx <= activeModuleIndex 
                            ? "bg-[#c2f425] border-[#c2f425] text-black" 
                            : "border-white/15 text-white/20"
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        
                        <div className="min-w-0">
                          <p className={`text-[11px] font-bold font-mono tracking-wide truncate ${isModuleActive ? "text-[#c2f425]" : "text-white/40"}`}>
                            {mod.name}
                          </p>
                          <p className="text-[13px] font-bold tracking-tight text-white mt-0.5 leading-snug line-clamp-2">
                            {mod.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                          {mod.duration}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#c2f425]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/50" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Lessons list with perfect timeline styling */}
                    {isExpanded && (
                      <div className="relative pl-8 pr-3 py-3 bg-[#121414] flex flex-col gap-3">
                        {/* The continuous green vertical timeline line */}
                        <div className="absolute top-0 bottom-0 left-[34px] w-[2px] bg-[#c2f425]/30 pointer-events-none" />

                        {mod.lessons.map((les) => {
                          const isLessonActive = activeLessonId === les.id;
                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => {
                                setActiveLessonId(les.id);
                                setActiveModuleIndex(idx);
                                setIsPlaying(true);
                                setProgress(Math.floor(Math.random() * 40) + 30);
                              }}
                              className="relative flex items-start gap-3.5 text-left group w-full transition-all cursor-pointer"
                            >
                              {/* Connector Dot */}
                              <div className="relative z-10 shrink-0 flex items-center justify-center w-[20px] h-[20px] mt-0.5">
                                <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isLessonActive
                                    ? "bg-[#c2f425] border-[#c2f425] text-black shadow-[0_0_12px_rgba(194,244,37,0.6)]"
                                    : "bg-black border-[#444934]/60 text-white/20 hover:border-[#c2f425]"
                                }`}>
                                  <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>

                              {/* Lesson Title & Duration */}
                              <div className="flex-1 min-w-0 flex flex-col">
                                <span className={`text-[12px] sm:text-[13px] font-bold leading-snug tracking-normal line-clamp-2 transition-all ${
                                  isLessonActive
                                    ? "text-[#c2f425]"
                                    : "text-white/70 group-hover:text-white"
                                }`}>
                                  {les.title}
                                </span>
                                <span className="text-[10px] font-mono text-white/30 mt-0.5">
                                  {les.duration}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ROW 2: ACTIVE HUB DISCUSSION, RATINGS AND PERSISTENT NOTES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          
          {/* Left Block (Col Span 7) - HUB, information, action tabs and feed comments */}
          <div className="lg:col-span-7 flex flex-col bg-[#1a1c1c] rounded-2xl border border-[#444934]/30 p-4 sm:p-6 justify-between gap-4 sm:gap-6 shadow-xl">
            
            {/* Upper Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#444934]/20 pb-3 sm:pb-4">
              <div className="min-w-0">
                <h2 className="text-[16px] sm:text-[18px] lg:text-[20px] font-extrabold text-[#ffffff] font-headline tracking-wide">
                  {currentModule.name}: {activeLesson.title}
                </h2>
                <p className="text-[10px] sm:text-xs text-[#c4c9ae]/60 mt-1">
                  Transmissão ativa • Comentários integrados com a comunidade
                </p>
              </div>

              {/* Action Buttons styled like the landing pages of our webapp */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap select-none shrink-0">
                <button
                  type="button"
                  onClick={toggleCompletion}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                    isCompleted 
                      ? "bg-[#c2f425] border border-[#c2f425] text-[#161f00] shadow-[0_0_20px_rgba(194,244,37,0.35)]" 
                      : "bg-[#1a1c1c] border border-[#444934]/50 text-[#c4c9ae] hover:border-[#c2f425] hover:text-[#c2f425] hover:bg-[#c2f425]/5"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  {isCompleted ? "Concluído" : "Concluir"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                    isFavorited 
                      ? "bg-rose-500/10 border border-rose-500/40 text-rose-400 font-extrabold" 
                      : "bg-[#1a1c1c] border border-[#444934]/50 text-[#c4c9ae] hover:border-[#c2f425] hover:text-[#c2f425] hover:bg-[#c2f425]/5"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current text-rose-500" : ""}`} />
                  {isFavorited ? "Favoritado" : "Favoritar"}
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowRatingMenu(!showRatingMenu)}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#444934]/50 bg-[#1a1c1c] text-[#c4c9ae] hover:border-[#c2f425] hover:text-[#c2f425] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-105 active:scale-95 hover:bg-[#c2f425]/5"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    Avaliar {rating ? `(${rating}★)` : ""}
                  </button>

                  {showRatingMenu && (
                    <div className="absolute top-10 right-0 z-30 bg-[#1a1c1c] border border-[#444934]/50 p-3.5 rounded-xl shadow-2xl flex flex-col gap-2 min-w-[200px]">
                      <p className="text-[11px] uppercase font-mono tracking-wider text-white/50 mb-1">Qualifique esta Aula:</p>
                      <div className="flex gap-1.5 justify-center">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              setRating(num);
                              setShowRatingMenu(false);
                            }}
                            className={`p-1.5 rounded ${rating >= num ? "text-amber-400" : "text-white/20"} hover:scale-125 transition-transform`}
                          >
                            <Star className="w-5 h-5 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inner bottom navigation tabs (Informações, Comentários) */}
            <div>
              <div className="flex gap-6 border-b border-[#444934]/20 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveBottomTab("info")}
                  className={`pb-2.5 text-sm font-bold transition-all relative ${
                    activeBottomTab === "info" 
                      ? "text-[#c2f425]" 
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Informações
                  {activeBottomTab === "info" && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c2f425]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBottomTab("comments")}
                  className={`pb-2.5 text-sm font-bold transition-all relative flex items-center gap-2 ${
                    activeBottomTab === "comments" 
                      ? "text-[#c2f425]" 
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Comentários
                  <span className="text-[11px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/70">
                    {comments.length}
                  </span>
                  {activeBottomTab === "comments" && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c2f425]" />
                  )}
                </button>
              </div>

              {/* Dynamic Panel content for Tab selection */}
              {activeBottomTab === "info" ? (
                <div className="flex flex-col gap-3 py-1">
                  <p className="text-[13.5px] text-white/80 leading-relaxed font-sans">
                    Neste módulo avançado você passará a compreender como otimizar ferramentas generativas integradas a canais de conteúdo produtivos de alto calibre. Vamos entender o "Hub de Agentes".
                  </p>
                  
                  {/* The highlight link exactly as written in the user image mockup! */}
                  <div className="mt-2.5 p-3 rounded-lg bg-[#c2f425]/5 border border-[#c2f425]/25 inline-block w-fit max-w-full">
                    <p className="text-[12px] sm:text-[13px] font-bold text-white/90 flex flex-wrap items-center gap-x-1.5">
                      Hub de Agentes: {" "}
                      <a 
                        href="https://agent-hub.prisma.me" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[#c2f425] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1.5"
                      >
                        clique aqui para conhecer
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 py-1">
                  {/* Comment submit form */}
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Deixe suas impressões ou dúvidas..."
                      className="flex-1 min-w-0 bg-[#121414]/90 text-white placeholder-[#c4c9ae]/50 rounded-full border border-[#444934]/40 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#c2f425] focus:border-[#c2f425] transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#c2f425] text-black font-extrabold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(194,244,37,0.2)] shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Comments lists */}
                  <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto custom-scrollbar">
                    {comments.map((comm) => {
                      const isMyComment = comm.userEmail === normalizedEmail || comm.user === userNameDisplay;
                      const isEditing = editingCommentId === comm.id;

                      return (
                        <div key={comm.id} className="p-3 bg-[#121414]/30 border border-[#444934]/20 rounded-xl flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[11.5px] font-bold text-[#c2f425]">{comm.user}</span>
                              {isMyComment && (
                                <span className="text-[8px] bg-[#c2f425]/10 text-[#c2f425] border border-[#c2f425]/40 px-1.5 py-0.5 rounded font-extrabold font-mono">VOCÊ</span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#c4c9ae]/50 font-mono">{comm.timestamp}</span>
                          </div>

                          {isEditing ? (
                            <div className="flex flex-col gap-2 mt-1">
                              <input
                                type="text"
                                value={editingCommentText}
                                onChange={(e) => setEditingCommentText(e.target.value)}
                                className="w-full bg-[#121414] text-xs text-white border border-[#444934]/50 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#c2f425]"
                                autoFocus
                              />
                              <div className="flex justify-end gap-2 text-[10px] font-bold">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCommentId(null);
                                    setEditingCommentText("");
                                  }}
                                  className="px-2.5 py-1 text-[#c4c9ae]/60 hover:text-white cursor-pointer"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditedComment(comm.id)}
                                  className="px-3 py-1 rounded-full bg-[#c2f425] text-black hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                                >
                                  Salvar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-[12px] text-[#e2e2e2]/90 leading-snug">{comm.text}</p>
                          )}
                          
                          <div className="flex items-center justify-between mt-1 border-t border-[#444934]/15 pt-1.5">
                            <button
                              type="button"
                              onClick={() => handleLikeComment(comm.id)}
                              className={`text-[10px] flex items-center gap-1 font-mono hover:text-[#c2f425] cursor-pointer ${
                                likedCommentIds.includes(comm.id) ? "text-[#c2f425]" : "text-[#c4c9ae]/45"
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" /> {comm.likes} {comm.likes === 1 ? 'curtida' : 'curtidas'}
                            </button>

                            {isMyComment && !isEditing && (
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCommentId(comm.id);
                                    setEditingCommentText(comm.text);
                                    setCommentToDeleteId(null);
                                  }}
                                  className="text-[10px] text-[#c4c9ae]/60 hover:text-[#c2f425] flex items-center gap-1 font-mono cursor-pointer transition-colors"
                                  title="Editar comentário"
                                >
                                  <Edit2 className="w-2.5 h-2.5" /> Editar
                                </button>
                                {commentToDeleteId === comm.id ? (
                                  <div className="flex items-center gap-1.5 bg-[#121414] py-1 px-2 rounded border border-rose-500/20 select-none">
                                    <span className="text-[9px] text-rose-400 font-bold font-mono">Deseja apagar?</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteComment(comm.id);
                                        setCommentToDeleteId(null);
                                      }}
                                      className="text-[9px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                    >
                                      Sim
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setCommentToDeleteId(null)}
                                      className="text-[9px] bg-white/5 hover:bg-white/10 text-white font-extrabold px-1.5 py-0.5 rounded-full cursor-pointer transition-all"
                                    >
                                      Não
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setCommentToDeleteId(comm.id)}
                                    className="text-[10px] text-[#c4c9ae]/60 hover:text-rose-400 flex items-center gap-1 font-mono cursor-pointer transition-colors"
                                    title="Excluir comentário"
                                  >
                                    <Trash2 className="w-2.5 h-2.5" /> Excluir
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Block (Col Span 5) - "Anotações" notebook area (As seen in the attachment) */}
          <div className="lg:col-span-5 flex flex-col bg-[#1a1c1c] rounded-2xl border border-[#444934]/30 p-4 sm:p-5 justify-between gap-3 sm:gap-4 shadow-xl">
            
            {/* Notepad Header */}
            <div className="flex justify-between items-center border-b border-[#444934]/30 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm font-extrabold tracking-wide text-white">
                  Anotações
                </span>
                <span className="text-[9px] sm:text-[10px] bg-[#c2f425]/10 text-[#c2f425] px-1.5 py-0.5 rounded font-mono hidden sm:inline">
                  Sincronizado
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert("Caderno de anotações expandido para modo tela cheia!");
                }}
                className="text-[#c4c9ae] hover:text-[#c2f425] bg-[#121414] border border-[#444934]/50 hover:border-[#c2f425] transition-all cursor-pointer p-1.5 rounded-full"
                title="Expandir"
              >
                {/* ↖↗ ↙↘ Expand icon representation */}
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Custom Notes text-area container box */}
            <div className="flex-1 flex flex-col bg-[#121414]/90 border border-[#444934]/30 focus-within:border-[#c2f425]/40 rounded-xl p-3.5 transition-all">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escreva suas anotações aqui..."
                className="w-full flex-1 bg-transparent text-sm text-white/90 placeholder-[#c4c9ae]/30 border-0 outline-none resize-none focus:ring-0 custom-scrollbar min-h-[160px] sm:min-h-[200px] lg:min-h-[180px] leading-relaxed font-sans"
              />
            </div>

            {/* Rich input bottom bar */}
            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              {/* Shortcut Tools Left (Aa, Smile, Image) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNotes(prev => prev + " **Texto em Negrito**")}
                  className="p-1.5 px-2.5 rounded-full bg-[#1a1c1c] border border-[#444934]/40 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all font-serif text-xs font-bold cursor-pointer shrink-0"
                  title="Formatar em Negrito"
                >
                  Aa
                </button>
                <button
                  type="button"
                  onClick={() => setNotes(prev => prev + " 😊")}
                  className="p-2 rounded-full bg-[#1a1c1c] border border-[#444934]/40 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all cursor-pointer shrink-0"
                  title="Inserir Emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const promptImg = prompt("Insira a URL de uma imagem para anexar:");
                    if (promptImg) {
                      setNotes(prev => prev + `\n![imagem de suporte](${promptImg})`);
                    }
                  }}
                  className="p-2 rounded-full bg-[#1a1c1c] border border-[#444934]/40 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] transition-all cursor-pointer shrink-0"
                  title="Anexar Imagem"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Save Notes button right */}
              <button
                type="button"
                onClick={handleSaveNotes}
                className="bg-[#c2f425] text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(194,244,37,0.2)]"
              >
                Salvar
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* 3. CERTIFICATE SUCCESS POPUP / EMBEDDED MODAL VIEW */}
      {certificateEmitted && (
        <div className="fixed inset-0 bg-[#121414]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c1c] border border-[#c2f425]/40 rounded-2xl w-full max-w-2xl p-6 sm:p-8 relative shadow-[0_0_50px_rgba(194,244,37,0.15)] text-center">
            
            {/* Close */}
            <button
              onClick={() => setCertificateEmitted(false)}
              className="absolute top-4 right-4 text-[#c4c9ae] hover:text-[#c2f425] bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#c2f425]/10 border border-[#c2f425]/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-[#c2f425]" />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-bold text-[#c2f425] bg-[#c2f425]/10 px-3 py-1 rounded font-mono">
              CERTIFICADO DIPLOMÁTICO EMITIDO
            </span>

            <h3 className="font-headline text-[22px] sm:text-[26px] font-extrabold text-[#ffffff] mt-3 tracking-wide leading-none">
              Parabéns, {userNameDisplay}!
            </h3>
            
            <p className="text-[13px] text-[#c4c9ae]/80 max-w-md mx-auto mt-2.5">
              Você concluiu com sucesso todos os requisitos de estudo e fixações do curso inovador <span className="text-white font-bold">"{courseTitle}"</span>.
            </p>

            {/* Simulated certificate document viewer mock */}
            <div className="mt-6 border-2 border-dashed border-[#c2f425]/30 p-5 rounded-xl bg-black/40 relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#c2f425] text-black text-[9px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded">
                VALIDADO PRISMA CO.
              </div>

              <span className="text-[9px] font-mono uppercase text-[#c2f425] tracking-widest">CERTIFICADO DE FLUÊNCIA & USO</span>
              <h4 className="text-[16px] font-extrabold text-white mt-1 uppercase tracking-wider">{courseTitle}</h4>
              <p className="text-[11px] text-[#c4c9ae]/50 mt-1 font-medium">Concedido a {userNameDisplay} em {new Date().toLocaleDateString("pt-BR")}</p>
              
              <div className="mt-4 flex justify-between items-center border-t border-[#444934]/20 pt-3">
                <span className="text-[10px] text-[#c4c9ae]/40 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                <span className="text-[10.5px] font-bold text-[#c2f425] underline cursor-pointer hover:text-white">Baixar PDF Completo</span>
              </div>
            </div>

            <button
              onClick={() => setCertificateEmitted(false)}
              className="mt-6 bg-[#c2f425] text-black font-extrabold uppercase text-xs tracking-wider px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(194,244,37,0.3)] cursor-pointer text-center"
            >
              Retornar às Aulas
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
