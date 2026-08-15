import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CourseModal from "./components/CourseModal";
import MyAccount from "./components/MyAccount";
import LegalPage from "./components/LegalPage";
import Preloader from "./components/Preloader";
import { initialCourses, initialActiveModules, initialHistoryItems, initialCertificates, initialAnnouncements, initialTopics } from "./data";
import { Course, Message, ActiveModule, Certificate } from "./types";
import { 
  Play, 
  Lock, 
  Unlock, 
  Sparkles, 
  Award, 
  Send, 
  Flame, 
  TrendingUp, 
  Globe2, 
  Download, 
  Share2, 
  Compass, 
  Search, 
  CheckCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Eye,
  EyeOff
} from "lucide-react";

export const DEFAULT_PLACEHOLDER_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><rect width='100' height='100' fill='%231b202e'/><circle cx='50' cy='36' r='14' stroke='white' stroke-width='4.5'/><path d='M26 76 C26 58, 74 58, 74 76' stroke='white' stroke-width='4.5' stroke-linecap='round'/></svg>";

// Route map: activeTab <-> URL path
// vitrine uses "/" as the homepage (no /vitrine in URL)
const ROUTES: Record<string, string> = {
  "vitrine": "/",
  "continuar": "/continuar",
  "comunidade": "/comunidade",
  "historia": "/historia",
  "certificados": "/certificados",
  "minha-conta": "/minha-conta",
  "termos": "/termos",
  "politica": "/politica"
};
const PATH_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTES).map(([tab, path]) => [path, tab])
);

// Read the initial active tab from the current URL
function getInitialActiveTab(): string {
  const path = window.location.pathname;
  return PATH_TO_TAB[path] || "vitrine";
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(getInitialActiveTab);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  
  // Real-time dynamic states matching user accomplishments
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("prisma_userName") || "";
  });
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return localStorage.getItem("prisma_userAvatar") || DEFAULT_PLACEHOLDER_AVATAR;
  });
  
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeModules, setActiveModules] = useState<ActiveModule[]>(initialActiveModules);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [historyItems, setHistoryItems] = useState(initialHistoryItems);

  // Chat community conversation stream
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "Alex Lima",
      timestamp: "14:20",
      text: "Guys, I'm struggling with 'Prepositions' of time. Quando eu uso 'at' vs 'on' para horários e datas específicas? Sinto que meu progresso travou aqui.",
      isMe: false
    },
    {
      id: "msg-2",
      sender: "Você",
      timestamp: "14:22",
      text: "Eu tive essa dúvida ontem! O segredo é o triângulo invertido da especificidade. Perguntei no grupo e o pessoal explicou super bem.",
      isMe: true
    },
    {
      id: "msg-3",
      sender: "Sarah_English",
      timestamp: "14:23",
      text: "Manda sim! E aproveitando, alguém sabe explicar o uso da crase em português nas traduções? Às vezes me confundo no material bilingue.",
      isMe: false
    }
  ]);
  const [typedMessage, setTypedMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Active modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModalCourse, setActiveModalCourse] = useState<{
    title: string;
    instructor: string;
    img: string;
  } | null>(null);

  // Notifications flow
  const [notifications, setNotifications] = useState<string[]>([
    "Dica do Dia: 'Loop in' refere-se a manter pessoas informadas.",
    "Alex Lima curtiu sua última dúvida na comunidade."
  ]);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  // Settings popup overlay
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("prisma_isLoggedIn") === "true";
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<"login" | "register">("login");
  const [loginNameInput, setLoginNameInput] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem("prisma_userEmail") || "";
  });
  const [loginEmailInput, setLoginEmailInput] = useState<string>("");
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // Clear error on modal status, mode or inputs change
  useEffect(() => {
    setLoginError("");
  }, [isLoginModalOpen, loginModalMode, loginNameInput, loginEmailInput, loginPasswordInput]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("prisma_isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("prisma_userName", userName);
    } else {
      localStorage.removeItem("prisma_userName");
    }
  }, [userName]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("prisma_userEmail", userEmail);
    } else {
      localStorage.removeItem("prisma_userEmail");
    }
  }, [userEmail]);

  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem("prisma_userAvatar", userAvatar);
    } else {
      localStorage.removeItem("prisma_userAvatar");
    }
  }, [userAvatar]);

  // Sync back to registered users catalog
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      const emailKey = userEmail.toLowerCase();
      const savedUsersJSON = localStorage.getItem("prisma_registered_users");
      if (savedUsersJSON) {
        try {
          const registeredUsers = JSON.parse(savedUsersJSON);
          let changed = false;
          const updatedUsers = registeredUsers.map((u: any) => {
            if (u.email && u.email.toLowerCase() === emailKey) {
              if (u.name !== userName || u.avatar !== userAvatar) {
                changed = true;
                return {
                  ...u,
                  name: userName,
                  avatar: userAvatar
                };
              }
            }
            return u;
          });
          if (changed) {
            localStorage.setItem("prisma_registered_users", JSON.stringify(updatedUsers));
          }
        } catch (err) {
          console.error("Error updating registered users catalog", err);
        }
      }
    }
  }, [userName, userAvatar, isLoggedIn, userEmail]);

  // Sync URL with activeTab: update browser URL when tab changes
  useEffect(() => {
    const targetPath = ROUTES[activeTab] || "/";
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: activeTab }, "", targetPath);
    }
  }, [activeTab]);

  // Listen to browser back/forward (popstate) to update the active tab
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      const tab = PATH_TO_TAB[path] || "vitrine";
      setActiveTab(tab);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Auto scroll chat to bottom
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeTab === "comunidade") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab, isBotTyping]);

  // Handle course completion and claim certificate
  const handleCourseCompletion = (completedCourseTitle: string) => {
    // 1. Mark corresponding course as completed & unlock next one in list
    setCourses((prevCourses) => 
      prevCourses.map((c) => {
        if (c.title === completedCourseTitle) {
          return { ...c, progress: 100, locked: false };
        }
        return c;
      })
    );

    // Update active module state
    setActiveModules((prevModules) =>
      prevModules.map((m) => {
        if (m.title === completedCourseTitle) {
          return { ...m, progress: 100, timeLeft: "Finalizado" };
        }
        return m;
      })
    );

    // 2. Grant a new Certificate dynamically
    const exists = certificates.some(cert => cert.title.includes(completedCourseTitle));
    if (!exists) {
      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        title: `${completedCourseTitle}: Fluency Upgrade`,
        date: `Concluído em ${new Date().toLocaleDateString("pt-BR", { day: 'numeric', month: 'short', year: 'numeric' })}`,
        verified: true,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4QoNe6gBzwFpZmuKYtixr05h1RBTq1NRWoxvkj0Qtkev9sQABsj_wNZl9NlCRjvLJkxgbbPgOFnEJy4vKCpXrEm1FqTNSzOF0b0kD5n5cV7J_oxyQj0uM0GbJy7pSk01eBa4qe4V0qyWsmjcsDJ1hp7GjCr5Kz3zaDA9IbbaH3OMsmvudF0XqWZICETUMlmxfxwjOY5m5joKfFb2qtYmKZj2c2ScExCNfkTcmqpiXXhzBhaO7C0I810mdnDk6cA5ias9uXfqp5ZQ"
      };
      setCertificates((prev) => [newCert, ...prev]);

      // Add to recently finished list
      const newHist = {
        id: `hist-${Date.now()}`,
        title: completedCourseTitle,
        timestamp: "Concluído agora mesmo",
        award: "Expert Upgrade",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqdjvc3jwaI9pIFTYYlnp7rcVsGlTKA1ZNZg6tsS0rhW-SypnhaDvL3K8rrdb5Zod0ghBR527a4rpXvxJ-3lh59ZwT8DPVFNRowzHWQm-MOQ_4owp84fmzTngH9B22nC89MThJ2Hyyv3PaLg-NPtO4FWMKM84Hu5B4V20n2QEpTuI3osPP82D4ciCBIMUqR5dWstCUO4r6_FeIyDVvPWlcbWUoSKBPguS90jjFIZ5VCsdCZokx_87Ks4jSZU0ngEId65AHl1tJD18"
      };
      setHistoryItems(prev => [newHist, ...prev]);
    }
  };

  // Launch course dynamic modal to let user watch and answer quiz
  const playCourse = (title: string, instructor: string, img: string) => {
    if (!isLoggedIn) {
      setLoginModalMode("login");
      setIsLoginModalOpen(true);
      return;
    }
    setActiveModalCourse({ title, instructor, img });
    setModalOpen(true);
  };

  // Handle active community chat submission
  const handleSendMessage = async () => {
    if (!typedMessage.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "Você",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: typedMessage,
      isMe: true
    };

    setMessages((prev) => [...prev, userMsg]);
    setTypedMessage("");
    setIsBotTyping(true);

    // Simulate community classmates or mentor replying after a short natural delay
    setTimeout(() => {
      const lowerText = userMsg.text.toLowerCase();
      let replyText = "";
      let replySender = "Sarah_English";

      if (lowerText.includes("preposition") || lowerText.includes("in") || lowerText.includes("on") || lowerText.includes("at")) {
        replyText = "Excelente ponto! Eu também tinha muita dificuldade entre 'in', 'on' e 'at' para tempo. Mas me ajudou pensar que 'at' é para horas exatas (at 5 PM) e 'on' para dias específicos (on Monday). 'In' fica para o mais genérico (in June, in 2026)! Let's practice more!";
        replySender = "Sarah_English";
      } else if (lowerText.includes("crase") || lowerText.includes("português")) {
        replyText = "Ah! A questão da crase nas traduções é clássica! Eu costumo usar aquele truque de substituir a palavra feminina por uma masculina. Se der 'ao', vai crase! Por exemplo: 'Fui à reunião' vira 'Fui ao encontro'. Funciona super bem.";
        replySender = "Alex Lima";
      } else if (lowerText.includes("business") || lowerText.includes("corporativo") || lowerText.includes("vaga") || lowerText.includes("trabalho") || lowerText.includes("inglês")) {
        replyText = "No ambiente corporativo global, vocabulário é tudo. Expressões como 'keep me posted' (me mantenha informado) e 'touch base' (entrar em contato para atualizar) são usadas a todo momento em reuniões internacionais!";
        replySender = "Professor Marcos";
      } else if (lowerText.includes("olá") || lowerText.includes("oi") || lowerText.includes("hello") || lowerText.includes("hi")) {
        replyText = "Hey there! Welcome to our daily practice chat room. O pessoal aqui costuma postar dúvidas de inglês profissional ou compartilhar links dos módulos concluídos. What's on your mind today?";
        replySender = "Sarah_English";
      } else {
        const standardReplies = [
          "Muito bom! Essa comunidade vive ativa e discutir esses tópicos de tecnologia e inglês bilingue ajuda demais a fixar o conteúdo.",
          "Legal! Eu estava revisando exatamente esse conceito na trilha de arquitetura bilingue. Se quiser treinar conversação, só mandar!",
          "Great point! O mercado internacional cobra justamente essa agilidade de se comunicar em inglês técnico sem rodeios. Vamos em frente!",
          "Exatamente! Concordo plenamente. Inclusive, recomendo muito o módulo de Pitch Corporativo caso não tenha feito ainda."
        ];
        const randomReply = standardReplies[Math.floor(Math.random() * standardReplies.length)];
        const senders = ["Sarah_English", "Alex Lima", "Professor Marcos"];
        replySender = senders[Math.floor(Math.random() * senders.length)];
        replyText = randomReply;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `peer-${Date.now()}`,
          sender: replySender,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText,
          isMe: false,
          isIa: false
        }
      ]);
      setIsBotTyping(false);
    }, 1200);
  };

  // Categorize or filter courses according to query
  const filteredCourses = courses.filter((course) => {
    const term = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
    );
  });

  return (
    <>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <div className="flex bg-[#121414] text-[#e2e2e2] h-full w-full overflow-hidden font-sans">
      
      {/* Mobile Sidebar overlay backdrop */}
      {isMobileSidebarOpen && (
        <div 
          id="mobile-sidebar-backdrop"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar Component (Responsive Drawer Wrapper) */}
      <div 
        id="sidebar-container"
        className={`fixed inset-y-0 left-0 transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out z-50 shrink-0 h-full ${
          isMobileSidebarOpen ? "w-[78vw] sm:w-auto" : ""
        }`}
      >
        <Sidebar 
          activeTab={activeTab} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((v) => !v)}
          setActiveTab={(tab) => {
            if (!isLoggedIn && tab !== "vitrine" && tab !== "historia") {
              setLoginModalMode("login");
              setIsLoginModalOpen(true);
              return;
            }
            setActiveTab(tab);
            setSearchQuery(""); // Reset search on transition
            setIsMobileSidebarOpen(false); // Close mobile drawer
          }}
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onClose={() => setIsMobileSidebarOpen(false)}
          onLogout={() => {
            setIsLoggedIn(false);
            setUserName("");
            setUserEmail("");
            setUserAvatar(DEFAULT_PLACEHOLDER_AVATAR);
            setActiveTab("vitrine");
            setIsMobileSidebarOpen(false);
            localStorage.removeItem("prisma_isLoggedIn");
            localStorage.removeItem("prisma_userName");
            localStorage.removeItem("prisma_userEmail");
            localStorage.removeItem("prisma_userAvatar");
            setNotifications((prev) => [
              "Você saiu do sistema com sucesso. Clique em FAZER LOGIN para retornar.",
              ...prev
            ]);
          }}
          onLogin={() => {
            setLoginModalMode("login");
            setIsLoginModalOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          onOpenSettings={() => {
            if (!isLoggedIn) {
              setLoginModalMode("login");
              setIsLoginModalOpen(true);
              return;
            }
            setSettingsOpen(true);
            setIsMobileSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Panel Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Dynamic Header Component */}
        <Header 
          onMenuToggle={() => setIsMobileSidebarOpen(true)}
          pageTitle={
            activeTab === "vitrine" ? "Vitrine de Cursos" :
            activeTab === "comunidade" ? "Comunidade Global" :
            activeTab === "continuar" ? "Continuar Assistindo" :
            activeTab === "historia" ? "Nossa História" :
            activeTab === "certificados" ? "Meus Certificados" :
            activeTab === "termos" ? "Termos de Uso" :
            activeTab === "politica" ? "Política de Privacidade" :
            "Configurações da Conta"
          }
          searchPlaceholder={
            activeTab === "vitrine" ? "Pesquisar cursos, mentorias..." :
            activeTab === "comunidade" ? "Buscar discussões ou mensagens..." :
            activeTab === "continuar" ? "Buscar no sistema..." :
            activeTab === "certificados" ? "Pesquisar certificados..." :
            activeTab === "termos" || activeTab === "politica" ? "" :
            activeTab === "minha-conta" ? "" :
            "Procurar no sistema..."
          }
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userName={isLoggedIn ? userName : "Visitante"}
          userAvatar={isLoggedIn ? userAvatar : DEFAULT_PLACEHOLDER_AVATAR}
          notificationCount={notifications.length}
          onNotificationsClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
          isLoggedIn={isLoggedIn}
          onLoginClick={(mode) => {
            setLoginModalMode(mode);
            setIsLoginModalOpen(true);
          }}
          onProfileClick={() => {
            if (isLoggedIn) {
              setActiveTab("minha-conta");
            } else {
              setLoginModalMode("login");
              setIsLoginModalOpen(true);
            }
          }}
        />

        {/* Notifications Popup Dropdown Overlay */}
        {showNotificationsMenu && (
          <div className="absolute right-4 sm:right-24 top-16 sm:top-20 bg-[#1e2020] border border-[#444934] rounded-xl py-4 px-5 w-[calc(100vw-2rem)] max-w-xs sm:w-80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-40">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#c2f425] uppercase tracking-wider">Avisos Recentes</span>
              <button 
                onClick={() => setNotifications([])} 
                className="text-[10px] text-[#c4c9ae] hover:text-[#ffb4ab] transition-colors"
              >
                Limpar tudo
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="text-[11px] text-[#c4c9ae]/60 text-center py-4">Nenhuma notificação pendente.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {notifications.map((notif, idx) => (
                  <div key={idx} className="bg-[#1a1c1c] p-2.5 rounded text-[11px] text-[#e2e2e2] border-l-2 border-[#c2f425]">
                    {notif}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Display Canvas View */}
        <main className={`flex-1 min-h-0 custom-scrollbar scroll-smooth bg-[#121414] ${
          activeTab === "comunidade" 
            ? "overflow-hidden flex flex-col w-full" 
            : "overflow-y-auto flex flex-col w-full"
        }`}>
          
          {/* VIEW 1: VITRINE (Courses Showcase) */}
          {activeTab === "vitrine" && (
            <div className="animate-fade-in">
              
              {/* Premium Hero Banner */}
              <section className="relative w-full min-h-[340px] xs:min-h-[380px] sm:min-h-0 sm:aspect-[22/8] overflow-hidden border-b border-[#444934]/20 select-none flex items-center">
                <img 
                  alt="Mestre do Business English Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoLa5-a1AomMfZy9JmHDtWkoRoJjQsSLeBOLEZvgsSmhdegT4pwe_lp1CW_VwFajujK3VIShd-T9prHkSpWpuBmA3_x9Gci3CwiVXbiPulrenDtNMkIaZuVMdKcOvxpKvFo2Ym_ZIZJZJvpLveAuTI4BMPURhGASF_8CtSX0iua289oJnyJJNagZDPuAXFrAmm4PMD1oQErNe4kqLMzVplZpLvumXzvmJh97Fp_-TpFwAKflABOhYtL4mVtD6hndl-kqnJhhc2zN0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 sm:via-black/55 to-transparent"></div>
                
                {!isLoggedIn && (
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c2f425]/40 flex items-center gap-1.5 text-[#c2f425] font-mono text-[10px] xs:text-[10.5px] font-bold z-10">
                    <Lock className="w-3.5 h-3.5 text-[#c2f425]" /> CONTEÚDO RESTRITO
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-center px-4 sm:px-12 max-w-2xl gap-3 py-8 sm:py-0">
                  <span className="bg-[#c2f425] text-[#161f00] font-mono text-[9px] xs:text-[10px] font-bold px-3 py-1 uppercase tracking-widest inline-block w-fit rounded-sm">
                    COURSE OF THE WEEK
                  </span>
                  <h2 className="font-headline text-[22px] xs:text-[24px] sm:text-[28px] md:text-[38px] font-bold text-white leading-tight">
                    Mestre do Business English
                  </h2>
                  <p className="text-[12px] sm:text-[13px] md:text-[14.5px] text-[#e2e2e2]/80 leading-relaxed max-w-lg mt-1">
                    Como conduzir calls, redigir feedbacks e destravar contratos corporativos globais com as técnicas de fluência mais modernas das Big Techs.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                    <button 
                      onClick={() => playCourse("Mestre do Business English", "Prof. Marcos", "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLa5-a1AomMfZy9JmHDtWkoRoJjQsSLeBOLEZvgsSmhdegT4pwe_lp1CW_VwFajujK3VIShd-T9prHkSpWpuBmA3_x9Gci3CwiVXbiPulrenDtNMkIaZuVMdKcOvxpKvFo2Ym_ZIZJZJvpLveAuTI4BMPURhGASF_8CtSX0iua289oJnyJJNagZDPuAXFrAmm4PMD1oQErNe4kqLMzVplZpLvumXzvmJh97Fp_-TpFwAKflABOhYtL4mVtD6hndl-kqnJhhc2zN0")}
                      className="bg-[#c2f425] text-[#161f00] text-[11px] sm:text-[12px] font-bold py-2.5 px-4 sm:py-3 sm:px-6 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(194,244,37,0.2)]"


                    >
                      {!isLoggedIn ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      {!isLoggedIn ? <span className="truncate">Fazer Login para Assistir</span> : "Começar Agora"}
                    </button>
                    <button 
                      onClick={() => playCourse("Mestre do Business English", "Prof. Marcos", "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLa5-a1AomMfZy9JmHDtWkoRoJjQsSLeBOLEZvgsSmhdegT4pwe_lp1CW_VwFajujK3VIShd-T9prHkSpWpuBmA3_x9Gci3CwiVXbiPulrenDtNMkIaZuVMdKcOvxpKvFo2Ym_ZIZJZJvpLveAuTI4BMPURhGASF_8CtSX0iua289oJnyJJNagZDPuAXFrAmm4PMD1oQErNe4kqLMzVplZpLvumXzvmJh97Fp_-TpFwAKflABOhYtL4mVtD6hndl-kqnJhhc2zN0")}
                      className="border border-[#c2f425] text-[#c2f425] text-[11px] sm:text-[12px] font-bold py-2.5 px-4 sm:py-3 sm:px-6 rounded-full hover:bg-[#c2f425]/10 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"


                    >
                      {!isLoggedIn && <Lock className="w-3.5 h-3.5" />} Ver Detalhes
                    </button>
                  </div>
                </div>
              </section>

              {/* Rows of categories */}
              <div className="py-6 sm:py-8 px-4 sm:px-8 flex flex-col gap-8 sm:gap-12">
                
                {/* Inglês para Iniciantes */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-end border-l-4 border-[#c2f425] pl-4">
                    <h3 className="font-headline text-[16px] sm:text-[18px] font-semibold text-white">
                      Inglês para Iniciantes
                    </h3>
                    <span className="text-[11px] text-[#c2f425] hover:underline cursor-pointer select-none">
                      Ver todos
                    </span>
                  </div>
                  
                  {/* Cards Grid scrollable */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredCourses
                      .filter((c) => c.category === "iniciantes")
                      .map((course, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (!isLoggedIn) {
                              playCourse(course.title, course.instructor, course.img);
                              return;
                            }
                            if (!course.locked) {
                              playCourse(course.title, course.instructor, course.img);
                            } else {
                              alert("Ops! Esta aula encontra-se trancada. Conclua as etapas anteriores para desbloquear automaticamente.");
                            }
                          }}
                          className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl overflow-hidden group cursor-pointer hover:border-[#c2f425] hover:shadow-[0_0_15px_rgba(194,244,37,0.1)] transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="relative aspect-video">
                            <img alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.img} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                            
                            {/* Locked badge top right */}
                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                              {(!isLoggedIn || course.locked) ? (
                                <Lock className="w-4 h-4 text-[#c4c9ae]" />
                              ) : (
                                <Unlock className="w-4 h-4 text-[#c2f425]" />
                              )}
                            </div>

                            {/* Author label bottom left */}
                            <div className="absolute bottom-3 left-4">
                              <span className="text-[#c2f425] text-[10px] font-bold uppercase tracking-wider">
                                {course.instructor}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 flex-grow flex flex-col justify-between">
                            <h4 className="font-headline text-[14px] font-bold text-white group-hover:text-[#c2f425] transition-colors leading-tight line-clamp-2 font-semibold">
                              {course.title}
                            </h4>
                            
                            {/* Progress bar info for unblocked courses */}
                            {(isLoggedIn && !course.locked) && (
                              <div className="mt-3">
                                <div className="flex justify-between items-center text-[10px] text-[#c4c9ae] mb-1">
                                  <span>Progresso</span>
                                  <span>{course.progress || 0}%</span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
                                  <div 
                                    className="h-full bg-[#c2f425]" 
                                    style={{ width: `${course.progress || 0}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Business English Premium Grid Row */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-end border-l-4 border-[#c2f425] pl-4">
                    <h3 className="font-headline text-[16px] sm:text-[18px] font-semibold text-white">
                      Business English
                    </h3>
                    <span className="text-[11px] text-[#c2f425] hover:underline cursor-pointer select-none">
                      Ver todos
                    </span>
                  </div>

                  {/* Exact layout match: One massive promo block on the left and 2 stacked stacked ones on the right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-[340px] sm:min-h-[380px]">
                    <div 
                      onClick={() => playCourse("Negociações Internacionais High-Stakes", "Alex River", "https://lh3.googleusercontent.com/aida-public/AB6AXuAOLzpqtD5dpOv4O0qZBWaLy5o2AiXxWiQxdBAI056w-m3_Mg7aR8dRxxP8zaokCJWycel2Mg4NXfhAvs3b8ioHUCByDPcGstKufGf11RgLoYIPLxjeSr91FfbhBpp8j1CvpwpAwRbP5vpg5yXxtn0ySXRDY3e6LGdX9p5253xdjTvE9-TNuzT8kqfocWQHLzuIiSTwmVJSYCEPL2qYiQtfkJuenFMmszue6DrTB3N_BkOa73bN3OHL88OpNcx3sxBVcSBYoVookEs")}
                      className="lg:col-span-8 bg-[#1a1c1c] border border-[#444934]/30 relative group overflow-hidden cursor-pointer hover:border-[#c2f425] hover:shadow-[0_0_20px_rgba(194,244,37,0.15)] transition-all duration-300 rounded-xl"
                    >
                      <img 
                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOLzpqtD5dpOv4O0qZBWaLy5o2AiXxWiQxdBAI056w-m3_Mg7aR8dRxxP8zaokCJWycel2Mg4NXfhAvs3b8ioHUCByDPcGstKufGf11RgLoYIPLxjeSr91FfbhBpp8j1CvpwpAwRbP5vpg5yXxtn0ySXRDY3e6LGdX9p5253xdjTvE9-TNuzT8kqfocWQHLzuIiSTwmVJSYCEPL2qYiQtfkJuenFMmszue6DrTB3N_BkOa73bN3OHL88OpNcx3sxBVcSBYoVookEs"
                        alt="Promo card"
                      />
                      
                      {!isLoggedIn && (
                        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-[#c4c9ae] font-mono text-[10.5px] font-bold z-10">
                          <Lock className="w-3.5 h-3.5 text-[#c2f425]" /> CONTEÚDO RESTRITO
                        </div>
                      )}

                      <div className="absolute inset-0 p-5 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/45 to-transparent gap-2">
                        <span className="text-[#c2f425] font-mono text-[9px] xs:text-[10px] font-bold uppercase tracking-wider mb-1">
                          MASTERCLASS EXCLUSIVA
                        </span>
                        <h4 className="font-headline text-[18px] xs:text-[22px] md:text-[26px] font-bold text-white">
                          Negociações Internacionais High-Stakes
                        </h4>
                        <p className="text-[#c4c9ae] max-w-lg mt-2 text-[11px] xs:text-[12.5px] leading-relaxed">
                          Aprenda a psicologia, técnicas de persuasão e o vocabulário estratégico sofisticado por trás dos maiores acordos do Vale do Silício.
                        </p>
                        <button className="mt-4 w-fit bg-[#c2f425] text-black font-semibold text-[11px] xs:text-[11.5px] py-2.5 px-6 rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
                          {!isLoggedIn ? <Lock className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          {!isLoggedIn ? <span className="truncate">Fazer Login para Desbloquear</span> : "Iniciar Masterclass"}
                        </button>
                      </div>
                    </div>

                    {/* Stacked smaller cards at right */}
                    <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
                      <div 
                        onClick={() => playCourse("Pitching para Startups", "Erika Mendes", "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLa5-a1AomMfZy9JmHDtWkoRoJjQsSLeBOLEZvgsSmhdegT4pwe_lp1CW_VwFajujK3VIShd-T9prHkSpWpuBmA3_x9Gci3CwiVXbiPulrenDtNMkIaZuVMdKcOvxpKvFo2Ym_ZIZJZJvpLveAuTI4BMPURhGASF_8CtSX0iua289oJnyJJNagZDPuAXFrAmm4PMD1oQErNe4kqLMzVplZpLvumXzvmJh97Fp_-TpFwAKflABOhYtL4mVtD6hndl-kqnJhhc2zN0")}
                        className="flex-grow bg-[#1a1c1c] border border-[#444934]/30 p-4 sm:p-6 flex flex-col justify-between group cursor-pointer hover:border-[#c2f425] transition-all rounded-xl"
                      >
                        <div className="flex flex-col gap-1.5">
                          <h5 className="text-white font-headline text-[14px] sm:text-[15px] font-semibold group-hover:text-[#c2f425] transition-colors">
                            Pitching para Startups
                          </h5>
                          <p className="text-[#c4c9ae] text-[11px] sm:text-[12px] leading-relaxed">
                            Apresente sua visão, capture investidores e venda sua tecnologia com clareza absoluta.
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-[#c2f425] text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
                            #FUNDAMENTALS
                          </span>
                          <Lock className="w-4 h-4 text-[#c4c9ae]" />
                        </div>
                      </div>

                      <div 
                        onClick={() => playCourse("Escrita Corporativa", "Dr. Lilian", "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLa5-a1AomMfZy9JmHDtWkoRoJjQsSLeBOLEZvgsSmhdegT4pwe_lp1CW_VwFajujK3VIShd-T9prHkSpWpuBmA3_x9Gci3CwiVXbiPulrenDtNMkIaZuVMdKcOvxpKvFo2Ym_ZIZJZJvpLveAuTI4BMPURhGASF_8CtSX0iua289oJnyJJNagZDPuAXFrAmm4PMD1oQErNe4kqLMzVplZpLvumXzvmJh97Fp_-TpFwAKflABOhYtL4mVtD6hndl-kqnJhhc2zN0")}
                        className="flex-grow bg-[#1a1c1c] border border-[#444934]/30 p-4 sm:p-6 flex flex-col justify-between group cursor-pointer hover:border-[#c2f425] transition-all rounded-xl"
                      >
                        <div className="flex flex-col gap-1.5">
                          <h5 className="text-white font-headline text-[14px] sm:text-[15px] font-semibold group-hover:text-[#c2f425] transition-colors">
                            Escrita Corporativa
                          </h5>
                          <p className="text-[#c4c9ae] text-[11px] sm:text-[12px] leading-relaxed">
                            Domine e-mails de negociação de contratos e alinhamentos urgentes no Slack.
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-[#c2f425] text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
                            #CONNECTED_WRITING
                          </span>
                          <Lock className="w-4 h-4 text-[#c4c9ae]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Português Avançado */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-end border-l-4 border-[#c2f425] pl-4">
                    <h3 className="font-headline text-[16px] sm:text-[18px] font-semibold text-white">
                      Português Avançado
                    </h3>
                    <span className="text-[11px] text-[#c2f425] hover:underline cursor-pointer select-none">
                      Ver todos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCourses
                      .filter((c) => c.category === "portugues")
                      .map((course, idx) => (
                        <div 
                          key={idx}
                          onClick={() => alert("Ops! Conclua Inglês Zero One first para destravar a trilha de Português Avançado.")}
                          className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl overflow-hidden group cursor-pointer hover:border-[#c2f425]/40 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="relative aspect-video">
                            <img alt={course.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" src={course.img} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                            <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full border border-white/10">
                              <Lock className="w-4 h-4 text-[#c4c9ae]" />
                            </div>
                            <div className="absolute bottom-3 left-4">
                              <span className="text-[#c2f425] text-[10px] font-bold uppercase tracking-wider">
                                {course.instructor}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex-grow">
                            <h4 className="font-headline text-[14px] font-bold text-white group-hover:text-[#c2f425] transition-colors leading-tight">
                              {course.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Gramática Prática */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-end border-l-4 border-[#c2f425] pl-4">
                    <h3 className="font-headline text-[16px] sm:text-[18px] font-semibold text-white">
                      Gramática Prática
                    </h3>
                    <span className="text-[11px] text-[#c2f425] hover:underline cursor-pointer select-none">
                      Ver todos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCourses
                      .filter((c) => c.category === "gramatica")
                      .map((course, idx) => (
                        <div 
                          key={idx}
                          onClick={() => alert("Módulo bloqueado na sua trilha de upgrading atual.")}
                          className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl overflow-hidden group cursor-pointer hover:border-[#c2f425]/40 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="relative aspect-video">
                            <img alt={course.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 transition-all duration-500" src={course.img} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                            <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full border border-white/10">
                              <Lock className="w-4 h-4 text-[#c4c9ae]" />
                            </div>
                            <div className="absolute bottom-3 left-4">
                              <span className="text-[#c2f425] text-[10px] font-bold uppercase tracking-wider">
                                {course.instructor}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex-grow">
                            <h4 className="font-headline text-[14px] font-bold text-white group-hover:text-[#c2f425] transition-colors leading-tight">
                              {course.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 2: COMUNIDADE (Community with Live Active AI Mentora) */}
          {activeTab === "comunidade" && (
            <div className="p-3 sm:p-4 md:p-8 h-full min-h-0 overflow-hidden flex-1 flex flex-col max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 animate-fade-in min-h-0 h-full overflow-hidden bg-[#1a1c1c] rounded-2xl border border-[#444934]/30 shadow-2xl flex-1">
              
              {/* Left Column: Announcements and Hot Trends */}
              <div className="flex lg:flex lg:col-span-4 flex-col gap-6 lg:overflow-y-auto custom-scrollbar lg:h-full max-h-[40vh] lg:max-h-full p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#444934]/20 bg-[#121414]/30 shrink-0 overflow-y-auto">
                
                {/* Platform Announcements */}
                <section className="flex flex-col gap-4">
                  <h3 className="font-headline text-[18px] font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#c2f425]" /> Avisos da Plataforma
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-xl bg-[#1e2020] border-l-4 border-[#c2f425] border-y border-r border-[#444934]/30 hover:bg-[#282a2b]/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-[#c2f425] text-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          NOVO
                        </span>
                        <span className="text-[10px] text-[#c4c9ae]">Há 2 horas</span>
                      </div>
                      <h4 className="font-headline text-[13.5px] font-semibold text-white mb-1.5">
                        Live: Dicas de Pronúncia com Nativos
                      </h4>
                      <p className="text-[12px] text-[#c4c9ae] leading-relaxed">
                        Participe do nosso alinhamento de pronúncia corporativa hoje às 19h no canal exclusivo no Zoom.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-[#1e2020] border-l-4 border-[#c4c9ae] border-y border-r border-[#444934]/30 hover:bg-[#282a2b]/30">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-[#444934] text-[#e2e2e2] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          GERAL
                        </span>
                        <span className="text-[10px] text-[#c4c9ae]">Há 1 dia</span>
                      </div>
                      <h4 className="font-headline text-[13.5px] font-semibold text-white mb-1.5">
                        Novos Certificados Disponíveis
                      </h4>
                      <p className="text-[12px] text-[#c4c9ae] leading-relaxed">
                        Incorpore o novo selo e e-badge B2 de fluência linguística nos seus perfis internacionais.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Hot Topics tag filter */}
                <section className="flex flex-col gap-4">
                  <h3 className="font-headline text-[18px] font-bold text-white">
                    Tópicos em Destaque
                  </h3>
                  
                  <div className="flex flex-col gap-2.5">
                    <button className="flex items-center justify-between p-3.5 rounded-lg bg-[#c2f425]/5 text-[#c2f425] border border-[#c2f425]/20 text-left cursor-pointer hover:bg-[#c2f425]/10">
                      <span className="font-bold text-[12.5px]">#DicasDeGramatica</span>
                      <span className="text-[10px] bg-[#c2f425] text-black font-extrabold px-2 py-1 rounded-full">
                        42 ativos
                      </span>
                    </button>

                    <button 
                      onClick={() => setTypedMessage("#BusinessEnglish ")}
                      className="flex items-center justify-between p-3.5 rounded-lg bg-[#1a1c1c] text-[#c4c9ae] border border-[#444934]/30 hover:border-[#c2f425] text-left cursor-pointer hover:text-white transition-all"
                    >
                      <span className="text-[12.5px] font-medium">#BusinessEnglish</span>
                      <span className="text-[10px] text-[#c4c9ae]/60">18 ativos</span>
                    </button>

                    <button 
                      onClick={() => setTypedMessage("#RedacaoNota10 ")}
                      className="flex items-center justify-between p-3.5 rounded-lg bg-[#1a1c1c] text-[#c4c9ae] border border-[#444934]/30 hover:border-[#c2f425] text-left cursor-pointer hover:text-white transition-all"
                    >
                      <span className="text-[12.5px] font-medium">#RedacaoNota10</span>
                      <span className="text-[10px] text-[#c4c9ae]/60">28 ativos</span>
                    </button>

                    <button 
                      onClick={() => setTypedMessage("#SlangsAndIdioms ")}
                      className="flex items-center justify-between p-3.5 rounded-lg bg-[#1a1c1c] text-[#c4c9ae] border border-[#444934]/30 hover:border-[#c2f425] text-left cursor-pointer hover:text-white transition-all"
                    >
                      <span className="text-[12.5px] font-medium">#SlangsAndIdioms</span>
                      <span className="text-[10px] text-[#c4c9ae]/60">55 ativos</span>
                    </button>
                  </div>
                </section>

              </div>

              {/* Right Column: Dynamic Interactive Student Chat wrapper */}
              <div className="col-span-12 lg:col-span-8 flex flex-col h-full bg-[#1a1c1c] overflow-hidden min-h-0 flex-1">
                
                {/* Chat Header */}
                <div className="p-3 sm:p-5 border-b border-[#444934]/30 bg-[#121414]/50 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-headline font-bold text-white text-[13px] sm:text-[15px] truncate">
                      #PraticaDeIngles
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] text-[#c2f425] flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c2f425] animate-pulse shrink-0" />
                      <span className="truncate">312 alunos online agora</span>
                    </p>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#c4c9ae]/60 uppercase font-mono tracking-wider shrink-0 hidden sm:block">
                    Sala de Prática Ativa
                  </div>
                </div>

                {/* Message display river */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 custom-scrollbar bg-[#121414]/30">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-3.5 max-w-[85%] ${
                        msg.isMe ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      {/* Avatar container */}
                      <div className={`w-8.5 h-8.5 rounded-full flex-shrink-0 flex items-center justify-center border text-[11px] font-bold uppercase select-none ${
                        msg.isMe 
                          ? "bg-[#c2f425]/10 text-[#c2f425] border-[#c2f425]/30" 
                          : msg.isIa
                            ? "bg-[#c2f425] text-black border-[#c2f425] shadow-[0_0_10px_rgba(194,244,37,0.3)] font-black"
                            : "bg-[#282a2b] text-[#c4c9ae] border-[#444934]/50"
                      }`}>
                        {msg.isIa ? "AI" : msg.sender.slice(0, 2)}
                      </div>

                      <div className={`flex flex-col gap-1.5 ${msg.isMe ? "items-end" : "items-start"}`}>
                        <span className="text-[11px] text-[#c4c9ae] font-semibold">
                          {msg.sender}{" "}
                          <span className="font-normal opacity-50 ml-1.5">
                            {msg.timestamp}
                          </span>
                        </span>
                        
                        {/* Bubble styling */}
                        <div className={`p-4 rounded-xl text-[12.5px] leading-relaxed ${
                          msg.isMe
                            ? "bg-[#1e2020] text-white border border-[#c2f425]/30 shadow-[0_0_12px_rgba(194,244,37,0.03)]"
                            : msg.isIa
                              ? "bg-[#c2f425]/5 text-[#e2e2e2] border border-[#c2f425]/40"
                              : "bg-[#1e2020] text-[#c4c9ae] border border-[#444934]/20"
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Peer simulated typing state indicator */}
                  {isBotTyping && (
                    <div className="flex gap-3.5 self-start max-w-[80%] items-center animate-pulse">
                      <div className="w-8.5 h-8.5 rounded-full flex-shrink-0 bg-[#282a2b] border border-[#444934]/50 text-[#c4c9ae] flex items-center justify-center font-bold text-[11px]">
                        💬
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-[#c2f425] font-bold">
                          Alguém do grupo está digitando...
                        </span>
                        <div className="bg-[#1e2020] border border-[#444934]/30 p-3 rounded-lg flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-[#c2f425] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-[#c2f425] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-[#c2f425] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input text box control bar */}
                <div className="p-3 sm:p-4 pb-5 sm:pb-5 lg:pb-5 bg-[#121414] border-t border-[#444934]/30">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2 sm:gap-3"
                  >
                    <input
                      type="text"
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      placeholder="Envie sua mensagem ou dúvida de inglês..."
                      className="flex-1 min-w-0 bg-[#1a1c1c] border border-[#444934]/50 rounded-xl px-3 sm:px-5 py-3 text-[12px] sm:text-[12.5px] text-[#e2e2e2] placeholder-[#c4c9ae]/45 focus:outline-none focus:ring-1 focus:ring-[#c2f425] focus:border-[#c2f425] transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!typedMessage.trim() || isBotTyping}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c2f425] text-[#161f00] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:bg-[#c2f425]/20 disabled:text-neutral-500 transition-all cursor-pointer shadow-[0_0_15px_rgba(194,244,37,0.2)] shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
          )}

          {/* VIEW 3: CONTINUAR ASSISTINDO (In Progress) */}
          {activeTab === "continuar" && (
            <div className="p-3 sm:p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-12 animate-fade-in">
              
              {/* Progresso atual row */}
              <section className="flex flex-col gap-6">
                <div>
                  <h2 className="font-headline text-[22px] sm:text-[26px] md:text-[32px] font-bold text-white leading-tight">
                    Seu Progresso Atual
                  </h2>
                  <p className="text-[12px] sm:text-[13px] md:text-[14.5px] text-[#c4c9ae] mt-1">
                    Você tem {activeModules.filter(m => m.progress < 100).length} módulos em andamento. Volte de onde parou.
                  </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {activeModules.map((module) => (
                    <div 
                      key={module.id} 
                      className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl overflow-hidden flex flex-col group hover:border-[#c2f425] transition-all duration-300"
                    >
                      <div className="relative aspect-video">
                        <img alt={module.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-300" src={module.img} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        
                        {/* Progress meter tracking overlay */}
                        <div className="absolute bottom-3 left-4 right-4">
                          <div className="flex justify-between items-center text-[10px] text-white font-semibold mb-1">
                            <span className="bg-[#c2f425]/20 text-[#c2f425] border border-[#c2f425]/30 px-1.5 py-0.5 rounded text-[8.5px] font-bold tracking-wider uppercase">
                              {module.moduleNum}
                            </span>
                            <span>{module.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#c2f425] shadow-[0_0_8px_#c2f425]" 
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Decriptive lower layout block */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-white font-headline font-bold text-[15.5px] group-hover:text-[#c2f425] transition-colors leading-snug">
                            {module.title}
                          </h4>
                          <p className="text-[12px] text-[#c4c9ae] leading-relaxed line-clamp-2">
                            {module.description}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#444934]/10">
                          <span className="text-[10px] uppercase font-bold text-[#c4c9ae] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {module.timeLeft}
                          </span>
                          
                          {module.progress < 100 ? (
                            <button
                              onClick={() => playCourse(module.title, "Prisma Instructor", module.img)}
                              className="bg-[#c2f425] text-black font-semibold text-[11.5px] py-1.5 px-4 rounded-full hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" /> Retomar
                            </button>
                          ) : (
                            <span className="text-[11.5px] bg-[#c4c9ae]/10 text-[#c2f425] py-1 px-3 rounded font-bold uppercase tracking-wider">
                              Concluído
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recently Finished stream list */}
              <section className="flex flex-col gap-5 mt-4">
                <div className="flex justify-between items-end border-l-4 border-[#c2f425] pl-4">
                  <h3 className="font-headline text-[18px] font-bold text-white">
                    Finalizados Recentemente
                  </h3>
                  <button 
                    onClick={() => setActiveTab("certificados")}
                    className="text-[11px] text-[#c2f425] hover:underline"
                  >
                    Ver Histórico Completo
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {historyItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-3 sm:gap-5 p-3 sm:p-3.5 bg-[#1a1c1c] border border-[#444934]/30 rounded-xl hover:border-[#c2f425]/40 transition-colors"
                    >
                      <div className="h-12 w-16 sm:h-14 sm:w-20 bg-black/45 rounded overflow-hidden shrink-0 border border-[#444934]/10">
                        <img alt={item.title} className="w-full h-full object-cover" src={item.img} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] sm:text-[13.5px] font-bold text-white font-headline truncate">{item.title}</h4>
                        <div className="flex items-center gap-2 sm:gap-2.5 mt-1">
                          <span className="text-[9px] sm:text-[10px] text-[#c4c9ae] uppercase tracking-wider font-semibold">
                            {item.timestamp}
                          </span>
                          <span className="w-1 h-1 bg-[#444934] rounded-full" />
                          <span className="text-[9px] sm:text-[10px] text-[#c2f425] uppercase tracking-wider font-bold">
                            {item.award}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <CheckCircle className="w-5 h-5 text-[#c2f425]" />
                        <button 
                          onClick={() => playCourse(item.title, "Prisma Mentor", item.img)}
                          className="text-[10px] text-[#c4c9ae] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Rever Aula
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* VIEW 4: NOSSA HISTÓRIA (About & Timeline) */}
          {activeTab === "historia" && (
            <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 md:gap-12 animate-fade-in">
              
              {/* Bento view layout - image stacks above text on mobile */}
              <section className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
                
                {/* Interactive globe visual graphics panel - FIRST on mobile */}
                <div className="lg:col-span-5 h-[200px] sm:h-[280px] md:h-[340px] relative rounded-xl overflow-hidden group border border-[#444934]/30 order-1 lg:order-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                  <img 
                    alt="Conexão Global Network illustration" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP-D4LfWok-NfxeoZy4H1KEsnkDv5NXSWKCo9dRlkzeyCV_GNCkuYrFkxj4LQBdAJ7NdP0bXTzHLBwAk5TIeBklgJIBi3taUOmlnHw9Dc059Gu9FwER5541hobnfyW4VBkVb-nrKsewoW81B4tePODOMled3KYTg20itEBZvlPSa7-q4Q3NAwDWKKYJWPbhrvGFapDmZES9ZrhcfumbVtxshERQ067Fh-Y0Z3eeQVGJ2jca8tgTsQ6UMO8W5P7ocLCGBJlegbpKHM"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[#c2f425] border border-[#c2f425]/20 flex items-center gap-1.5">
                      <Globe2 className="w-3 h-3 animate-spin" /> Conexão Global Ativada
                    </span>
                  </div>
                </div>

                {/* Visual narrative text - SECOND on mobile, below the image */}
                <div className="lg:col-span-7 bg-[#1a1c1c] border-l-4 border-[#c2f425] border-y border-r border-[#444934]/30 p-5 sm:p-6 md:p-8 rounded-xl flex flex-col justify-center order-2 lg:order-1">
                  <h3 className="font-headline text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#c2f425] mb-4">
                    A Visão do Sistema
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#c4c9ae] mb-4">
                    Nascemos da visão de transformar o aprendizado de idiomas através da tecnologia de precisão. Na Prisma, acreditamos que a fluência profissional não é apenas sobre vocabulários desconexos, mas sim sobre conexão global de impacto e progressos contínuos.
                  </p>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#c4c9ae]">
                    Nossa jornada iniciou-se com o objetivo de democratizar o acesso às discussões técnicas de big techs e ambientes ágeis, tratando linguagens humanas como sistemas operacionais que merecem refatorações e upgrades diários. Através de algoritmos avançados e métodos de performance linguística, construímos pontes sólidas entre carreiras brasileiras e vagas globais.
                  </p>
                </div>
              </section>

              {/* Three philosophy bento items */}
              <section className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                <div className="bg-[#1a1c1c] border border-[#444934]/30 hover:border-[#c2f425]/50 p-5 sm:p-6 rounded-xl transition-all hover:bg-[#1e2020]">
                  <div className="w-10 h-10 bg-[#c2f425]/10 rounded-lg flex items-center justify-center mb-4 border border-[#c2f425]/20 text-[#c2f425]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-[15px] sm:text-[16px] font-headline font-bold mb-2">Engenharia de Ensino</h4>
                  <p className="text-[12px] sm:text-[13px] text-[#c4c9ae] leading-relaxed">
                    Aceleração da curva de fluência de escuta e fala em reuniões em até 300% com metodologias ágeis e ativas.
                  </p>
                </div>

                <div className="bg-[#1a1c1c] border border-[#444934]/30 hover:border-[#c2f425]/50 p-5 sm:p-6 rounded-xl transition-all hover:bg-[#1e2020]">
                  <div className="w-10 h-10 bg-[#c2f425]/10 rounded-lg flex items-center justify-center mb-4 border border-[#c2f425]/20 text-[#c2f425]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-[15px] sm:text-[16px] font-headline font-bold mb-2">ADN Globalizado</h4>
                  <p className="text-[12px] sm:text-[13px] text-[#c4c9ae] leading-relaxed">
                    Conexões robustas com mais de 45 países, ultrapassando barreiras geográficas sem perdas cognitivas.
                  </p>
                </div>

                <div className="bg-[#1a1c1c] border border-[#444934]/30 hover:border-[#c2f425]/50 p-5 sm:p-6 rounded-xl transition-all hover:bg-[#1e2020] sm:col-span-2 md:col-span-1">
                  <div className="w-10 h-10 bg-[#c2f425]/10 rounded-lg flex items-center justify-center mb-4 border border-[#c2f425]/20 text-[#c2f425]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-[15px] sm:text-[16px] font-headline font-bold mb-2">Evolução Constante</h4>
                  <p className="text-[12px] sm:text-[13px] text-[#c4c9ae] leading-relaxed">
                    Ementa e conteúdo reestruturados em tempo real de acordo com as tendências técnicas internacionais.
                  </p>
                </div>
              </section>

              {/* Milestones horizontal timeline */}
              <section className="flex flex-col gap-5 sm:gap-6">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline text-[18px] sm:text-[20px] font-bold text-white shrink-0">Line da Jornada</h3>
                  <div className="flex-grow h-px bg-[#444934]/30"></div>
                </div>

                <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 custom-scrollbar -mx-1 px-1">
                  
                  <div className="flex-shrink-0 w-[220px] sm:w-[250px] bg-[#1a1c1c] border border-[#444934]/30 p-5 sm:p-6 rounded-xl relative overflow-hidden group hover:border-[#c2f425]">
                    <span className="text-[30px] sm:text-[34px] font-extrabold text-[#c2f425]/10 absolute -right-1 -top-1">2021</span>
                    <h5 className="text-[#c2f425] font-bold font-headline text-[13px] sm:text-[14px] uppercase mb-2">Fundação</h5>
                    <p className="text-[11px] sm:text-[12px] text-[#c4c9ae] leading-relaxed">
                      Surgimento da Prisma em uma garagem tech com a missão de redefinir o ensino tradicional com foco ágil.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-[220px] sm:w-[250px] bg-[#1a1c1c] border border-[#444934]/30 p-5 sm:p-6 rounded-xl relative overflow-hidden group hover:border-[#c2f425]">
                    <span className="text-[30px] sm:text-[34px] font-extrabold text-[#c2f425]/10 absolute -right-1 -top-1">2022</span>
                    <h5 className="text-[#c2f425] font-bold font-headline text-[13px] sm:text-[14px] uppercase mb-2">Expansão Beta</h5>
                    <p className="text-[11px] sm:text-[12px] text-[#c4c9ae] leading-relaxed">
                      Lançamento da plataforma para os primeiros 10 mil usuários, validando o upgrade linguístico.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-[220px] sm:w-[250px] bg-[#1a1c1c] border border-[#444934]/30 p-5 sm:p-6 rounded-xl relative overflow-hidden group hover:border-[#c2f425]">
                    <span className="text-[30px] sm:text-[34px] font-extrabold text-[#c2f425]/10 absolute -right-1 -top-1">2023</span>
                    <h5 className="text-[#c2f425] font-bold font-headline text-[13px] sm:text-[14px] uppercase mb-2">IA Incorporada</h5>
                    <p className="text-[11px] sm:text-[12px] text-[#c4c9ae] leading-relaxed">
                      Integração da Mentora Virtual e avaliações inteligentes usando modelos de linguagem generativos à plataforma.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-[220px] sm:w-[250px] bg-[#1a1c1c] border-2 border-[#c2f425] p-5 sm:p-6 rounded-xl relative overflow-hidden bg-[#c2f425]/5">
                    <span className="text-[30px] sm:text-[34px] font-extrabold text-[#c2f425]/30 absolute -right-1 -top-1">2024</span>
                    <h5 className="text-[#c2f425] font-extrabold font-headline text-[13px] sm:text-[14px] uppercase mb-2">Rede Global</h5>
                    <p className="text-[11px] sm:text-[12px] text-[#e2e2e2] leading-relaxed">
                      Expansão multiversal atingindo a marca de 1 milhão de matrículas técnicas ao redor do planeta.
                    </p>
                  </div>

                </div>
              </section>

              {/* CTA Upgrade footer call to action banner */}
              <section className="bg-[#1a1c1c] p-5 sm:p-6 md:p-8 border border-[#444934]/30 rounded-2xl flex flex-col items-center gap-5 sm:gap-6 text-center">
                <div>
                  <h4 className="font-headline text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#c2f425]">
                    Pronto para acelerar seu upgrade profissional?
                  </h4>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#c4c9ae] mt-2 max-w-lg mx-auto">
                    Inscreva-se hoje para liberar todas as trilhas e a Mentora de IA completa de forma ilimitada.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Assinatura Processada com Sucesso (Simulado): Bem-vindo ao Plano Premium Prisma.")}
                  className="bg-[#c2f425] text-black font-extrabold font-headline text-[12px] sm:text-[13px] py-3.5 sm:py-4 px-8 sm:px-10 rounded-full hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(194,244,37,0.3)] transition-all uppercase tracking-wide cursor-pointer w-full sm:w-auto max-w-xs"
                >
                  Assinar Agora
                </button>
              </section>

            </div>
          )}

          {/* VIEW 5: CERTIFICADOS (Achievements & Certs) */}
          {activeTab === "certificados" && (
            <div className="p-3 sm:p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 animate-fade-in min-h-[calc(100vh-152px)]">
              
              {/* Header metadata */}
              <section>
                <h2 className="font-headline text-[22px] sm:text-[26px] md:text-[32px] font-bold text-[#c2f425]">
                  Meus Certificados
                </h2>
                <p className="text-[12px] sm:text-[13px] md:text-[14.5px] text-[#c4c9ae] mt-1 max-w-2xl">
                  Cada certificado representa um novo upgrade de proficiência internacional. Mostre ao mercado sua competência e impulsione suas aplicações para vagas internacionais.
                </p>
              </section>

              {/* Bento Row Metrics Stats */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                
                <div className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-24 sm:h-32">
                  <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-[#c4c9ae] tracking-wider font-mono">
                    Total Concluído
                  </span>
                  <span className="text-[24px] sm:text-[34px] font-bold text-[#c2f425] leading-none shrink-0 font-headline mb-1">
                    {certificates.length < 10 ? `0${certificates.length}` : certificates.length}
                  </span>
                </div>

                <div className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-24 sm:h-32">
                  <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-[#c4c9ae] tracking-wider font-mono">
                    Horas de Estudo
                  </span>
                  <span className="text-[24px] sm:text-[34px] font-bold text-[#c2f425] leading-none shrink-0 font-headline mb-1">
                    124h
                  </span>
                </div>

                <div className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl p-4 sm:p-5 col-span-2 md:col-span-2 flex items-center justify-between h-24 sm:h-32">
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-[#c4c9ae] tracking-wider font-mono">
                      Próximo Nível
                    </span>
                    <h4 className="text-white font-headline font-bold text-[13px] sm:text-[15.5px] mt-2 truncate">
                      Fluente Intermediário
                    </h4>
                  </div>
                  
                  {/* Radial ProgressBar representation */}
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-[#c2f425]/20 flex items-center justify-center font-bold font-headline text-[11px] sm:text-[13.5px] text-[#c2f425] shrink-0">
                    75%
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#c2f425] border-transparent animate-pulse" />
                  </div>
                </div>

              </section>

              {/* Achievements Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {certificates.map((cert) => (
                  <div 
                    key={cert.id}
                    className="bg-[#1a1c1c] border border-[#444934]/30 hover:border-[#c2f425]/60 hover:shadow-[0_0_15px_rgba(194,244,37,0.06)] rounded-xl overflow-hidden flex flex-col transition-all duration-300 group"
                  >
                    {/* Rendered image of certificate */}
                    <div className="relative aspect-[16/10] bg-black overflow-hidden border-b border-[#444934]/20 shrink-0">
                      <img 
                        alt={cert.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                        src={cert.img} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      
                      {/* Verified badge placeholder */}
                      <div className="absolute top-3 right-3 bg-[#c2f425] text-black font-extrabold text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-black fill-current" /> Verificado
                      </div>
                    </div>

                    {/* Metadata cert */}
                    <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-headline font-bold text-[13px] sm:text-[14px] leading-snug group-hover:text-[#c2f425] transition-colors line-clamp-1 mb-1">
                          {cert.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-[#c4c9ae]">
                          {cert.date}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-4 sm:mt-6">
                        <button 
                          onClick={() => alert(`Baixando certificado '${cert.title}' no formato PDF de alta resolução...`)}
                          className="flex-1 bg-[#c2f425] text-black font-bold text-[11px] py-2 px-3 rounded-full hover:bg-[#c2f425]/90 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-black" /> PDF
                        </button>
                        <button 
                          onClick={() => alert(`Link de compartilhamento dinâmico copiado para a área de transferência!`)}
                          className="bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] text-[#c4c9ae] hover:text-[#c2f425] p-2 rounded transition-colors"
                          title="Compartilhar Certificado"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Extra milestones summary panel */}
              <section className="text-center py-8 sm:py-10 border-2 border-dashed border-[#444934]/30 rounded-xl bg-[#1a1c1c]/30 px-4">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-[#c4c9ae]/30 mx-auto mb-3" />
                <h4 className="text-white font-headline font-bold text-[14px] sm:text-[15px] mb-1">
                  Novas Conquistas à Vista
                </h4>
                <p className="text-[11px] sm:text-[12px] text-[#c4c9ae] max-w-sm mx-auto mb-4">
                  Você está a apenas uma aula de concluir <span className="font-bold text-[#c2f425]">English Zero One</span> e ganhar seu certificado!
                </p>
                <button 
                  onClick={() => {
                    setActiveTab("vitrine");
                    setSearchQuery("Zero One");
                  }}
                  className="text-[#c2f425] text-[12px] font-bold underline hover:text-[#c2f425]/80"
                >
                  Ver aula agora →
                </button>
              </section>

            </div>
          )}

          {/* VIEW 6: MINHA CONTA */}
          {activeTab === "minha-conta" && (
            <MyAccount 
              userName={userName}
              setUserName={setUserName}
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              userEmail={userEmail}
              onBackToDashboard={() => setActiveTab("vitrine")}
              onOpenTermos={() => setActiveTab("termos")}
            />
          )}

          {/* VIEW 7: TERMOS DE USO */}
          {activeTab === "termos" && (
            <LegalPage
              type="termos"
              onBack={() => setActiveTab("vitrine")}
            />
          )}

          {/* VIEW 8: POLÍTICA DE PRIVACIDADE */}
          {activeTab === "politica" && (
            <LegalPage
              type="politica"
              onBack={() => setActiveTab("vitrine")}
            />
          )}

        </main>

        {/* Small custom footer bar requested by user - globally positioned at the bottom of the right panel */}
        <div className="flex justify-center items-center gap-4 sm:gap-10 pt-2.5 pb-4 sm:pt-3 sm:pb-5 text-[9px] sm:text-[11px] font-mono tracking-widest font-extrabold text-[#c2f425] uppercase select-none shrink-0 border-t border-[#444934]/15 w-full bg-[#121414] z-10 px-2">
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("termos"); }} className="hover:underline hover:opacity-100 opacity-90 transition-all">Termos de Uso</a>
          <span className="opacity-30">•</span>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("politica"); }} className="hover:underline hover:opacity-100 opacity-90 transition-all">Política de Privacidade</a>
        </div>
      </div>

      {/* Dynamic interactive lesson overlay slide-up layer */}
      {modalOpen && activeModalCourse && (
        <CourseModal 
          isOpen={modalOpen}
          courseTitle={activeModalCourse.title}
          courseInstructor={activeModalCourse.instructor}
          courseImg={activeModalCourse.img}
          onClose={() => setModalOpen(false)}
          onComplete={(title) => handleCourseCompletion(title)}
        />
      )}

      {/* Settings Dialog popup */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#1e2020] border border-[#444934] rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-headline text-[16px] sm:text-[18px] font-bold text-[#c2f425] mb-4 uppercase tracking-wider">
              Configurações do Sistema
            </h3>
            
            <div className="flex flex-col gap-4 text-[12px]">
              <div>
                <label className="text-[#c4c9ae] font-semibold block mb-1">E-mail do Usuário</label>
                <input 
                  type="text" 
                  disabled
                  value={userEmail || "Visitante / Nenhum e-mail"} 
                  className="w-full bg-[#1a1c1c] border border-[#444934]/50 rounded p-2.5 text-neutral-400 font-mono" 
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSettingsOpen(false)}
                className="bg-[#c2f425] text-black font-bold text-[12px] px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Interactive Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#181a20] border border-[#c2f425]/40 rounded-2xl w-full max-w-md p-5 sm:p-8 shadow-[0_0_50px_rgba(194,244,37,0.15)] relative max-h-[95vh] overflow-y-auto custom-scrollbar">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-[#c2f425]/10 flex items-center justify-center border border-[#c2f425]/30">
                  <img
                    alt="Prisma Icon Logo"
                    className="h-9 w-auto object-contain cursor-pointer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCozAWHCV-m6qH2nsaVf7y8wN4DVkYSyG_92bFJYIBxDHILa2ECAyFb9V9PASlNZuHlb8Ibk5_R9CcdnkKclFHx_FL7e72-rT24vkSw3hjMBy3qZaXScPFUhW2W61uFcxIYQZpxdtrYU5oKRypxrhrFd2xLoVHD0LGWtqT20EwoFHacY_XF-IJe1CcHoc-qZDmxtZ_Q0D5tWXcHUvPMKRdNwBJisATR00RhqaQ-R3N9uopH9EvcH7eCYf3M1kmpqnrOpsajm0QGL3A"
                  />
                </div>
              </div>
              <h3 className="font-headline text-[20px] font-bold text-white tracking-tight">
                {loginModalMode === "login" ? "Entrar na Prisma Pro" : "Criar sua Conta Prisma"}
              </h3>
              <p className="text-[12px] text-[#c4c9ae]/70 mt-1 max-w-[290px] mx-auto leading-relaxed">
                {loginModalMode === "login"
                  ? "Acesse sua trilha de estudos bilingue de tecnologia e pratique com a comunidade."
                  : "Cadastre-se para acompanhar progresso, obter certificados e interagir na comunidade."}
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex border-b border-[#343745]/60 mb-5 text-[13px]">
              <button
                onClick={() => {
                  setLoginModalMode("login");
                  setLoginPasswordInput("");
                }}
                className={`flex-1 pb-2.5 text-center font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  loginModalMode === "login"
                    ? "text-[#c2f425] border-b-2 border-[#c2f425]"
                    : "text-[#c4c9ae]/50 hover:text-[#c4c9ae]"
                }`}
              >
                Fazer Login
              </button>
              <button
                onClick={() => {
                  setLoginModalMode("register");
                  setLoginPasswordInput("");
                }}
                className={`flex-1 pb-2.5 text-center font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  loginModalMode === "register"
                    ? "text-[#c2f425] border-b-2 border-[#c2f425]"
                    : "text-[#c4c9ae]/50 hover:text-[#c4c9ae]"
                }`}
              >
                Cadastrar-se
              </button>
            </div>

            {/* Error banner inside the form */}
            {loginError && (
              <div 
                id="login-error-display"
                className="bg-red-500/15 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-[12.5px] mb-4 font-semibold flex items-center gap-2 justify-center animate-pulse"
              >
                <span>⚠</span>
                <span>{loginError}</span>
              </div>
            )}

            {/* Form fields */}
            <div className="flex flex-col gap-3.5 text-[12px] mb-5">
              {loginModalMode === "register" && (
                <div>
                  <label className="text-[#c4c9ae] font-semibold block mb-1">Seu Nome</label>
                  <input 
                    type="text" 
                    value={loginNameInput} 
                    onChange={(e) => setLoginNameInput(e.target.value)}
                    placeholder="Digite seu nome" 
                    className="w-full bg-[#111216] border border-[#343745] hover:border-[#c2f425]/40 focus:border-[#c2f425] rounded-lg p-2.5 text-white focus:outline-none transition-all font-sans text-[13px]" 
                  />
                </div>
              )}

              <div>
                <label className="text-[#c4c9ae] font-semibold block mb-1">Endereço de E-mail</label>
                <input 
                  type="email" 
                  value={loginEmailInput} 
                  onChange={(e) => setLoginEmailInput(e.target.value)}
                  placeholder="exemplo@dominio.com" 
                  className="w-full bg-[#111216] border border-[#343745] hover:border-[#c2f425]/40 focus:border-[#c2f425] rounded-lg p-2.5 text-white focus:outline-none transition-all font-mono text-[13px]" 
                />
              </div>

              <div>
                <label className="text-[#c4c9ae] font-semibold block mb-1">Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={loginPasswordInput} 
                    onChange={(e) => setLoginPasswordInput(e.target.value)}
                    placeholder="Digite sua senha..." 
                    className="w-full bg-[#111216] border border-[#343745] hover:border-[#c2f425]/40 focus:border-[#c2f425] rounded-lg p-2.5 pr-10 text-white focus:outline-none transition-all font-mono text-[13px]" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4c9ae]/60 hover:text-[#c2f425] transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password strength indicator for registration mode */}
              {loginModalMode === "register" && loginPasswordInput && (
                <div className="bg-[#1c1d24] p-3 rounded-lg border border-[#343745]/50 mt-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] text-[#c4c9ae]/70">Força da Senha</span>
                    <span className={`text-[10px] font-bold font-mono ${
                      loginPasswordInput.length < 6 ? "text-red-400" :
                      ((/[A-Z]/.test(loginPasswordInput) ? 1 : 0) + 
                       (/[a-z]/.test(loginPasswordInput) ? 1 : 0) + 
                       (/\d/.test(loginPasswordInput) ? 1 : 0) + 
                       (/\W/.test(loginPasswordInput) ? 1 : 0)) <= 2 ? "text-yellow-400" :
                      ((/[A-Z]/.test(loginPasswordInput) ? 1 : 0) + 
                       (/[a-z]/.test(loginPasswordInput) ? 1 : 0) + 
                       (/\d/.test(loginPasswordInput) ? 1 : 0) + 
                       (/\W/.test(loginPasswordInput) ? 1 : 0)) === 3 ? "text-green-400" : "text-[#c2f425]"
                    }`}>
                      {(() => {
                        if (loginPasswordInput.length < 6) return "Fraca 🔴 (min. 6 caracteres)";
                        let score = 0;
                        if (/[A-Z]/.test(loginPasswordInput)) score++;
                        if (/[a-z]/.test(loginPasswordInput)) score++;
                        if (/\d/.test(loginPasswordInput)) score++;
                        if (/\W/.test(loginPasswordInput)) score++;
                        if (score <= 2) return "Razoável 🟡 (Dica: use símbolos/números)";
                        if (score === 3) return "Forte 🟢 (Otimizada para sua segurança)";
                        return "Excelente ✨ (Altamente segura!)";
                      })()}
                    </span>
                  </div>
                  {/* Progress bars segment */}
                  <div className="w-full h-1 bg-[#111216] rounded-full overflow-hidden flex gap-0.5">
                    {(() => {
                      const len = loginPasswordInput.length;
                      let score = 0;
                      if (/[A-Z]/.test(loginPasswordInput)) score++;
                      if (/[a-z]/.test(loginPasswordInput)) score++;
                      if (/\d/.test(loginPasswordInput)) score++;
                      if (/\W/.test(loginPasswordInput)) score++;
                      
                      let barCount = 0;
                      let colorClass = "bg-red-500";
                      
                      if (len > 0) {
                        if (len < 6) {
                          barCount = 1;
                          colorClass = "bg-red-500";
                        } else if (score <= 2) {
                          barCount = 2;
                          colorClass = "bg-yellow-500";
                        } else if (score === 3) {
                          barCount = 3;
                          colorClass = "bg-green-500";
                        } else {
                          barCount = 4;
                          colorClass = "bg-[#c2f425]";
                        }
                      }
                      
                      return Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 transition-all duration-300 rounded-sm ${
                            i < barCount ? colorClass : "bg-[#282a2b]/40"
                          }`}
                        />
                      ));
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  const savedUsersJSON = localStorage.getItem("prisma_registered_users");
                  let registeredUsers = [];
                  try {
                    registeredUsers = savedUsersJSON ? JSON.parse(savedUsersJSON) : [];
                  } catch (e) {
                    registeredUsers = [];
                  }

                  // Default seeding if list is empty to make testing easy
                  if (registeredUsers.length === 0) {
                    registeredUsers = [
                      {
                        name: "Romeu Carvalho",
                        email: "trapporomeu@gmail.com",
                        password: "123456",
                        avatar: DEFAULT_PLACEHOLDER_AVATAR
                      }
                    ];
                    localStorage.setItem("prisma_registered_users", JSON.stringify(registeredUsers));
                  }

                  const targetEmail = loginEmailInput.trim().toLowerCase();

                  // Validations based on Mode
                  if (loginModalMode === "register") {
                    if (!loginNameInput.trim()) {
                      setLoginError("Por favor, digite seu nome completo.");
                      return;
                    }
                    if (!targetEmail) {
                      setLoginError("Por favor, digite seu endereço de e-mail.");
                      return;
                    }
                    if (!loginPasswordInput) {
                      setLoginError("Por favor, digite uma senha.");
                      return;
                    }
                    if (loginPasswordInput.length < 6) {
                      setLoginError("Sua senha deve ter no mínimo 6 caracteres.");
                      return;
                    }

                    // Check if email already registered
                    const emailExists = registeredUsers.some((u: any) => u.email === targetEmail);
                    if (emailExists) {
                      setLoginError("Este e-mail já está cadastrado! Por favor, faça login.");
                      setLoginModalMode("login");
                      return;
                    }

                    // Save new user
                    const newUser = {
                      name: loginNameInput.trim(),
                      email: targetEmail,
                      password: loginPasswordInput,
                      avatar: DEFAULT_PLACEHOLDER_AVATAR
                    };
                    registeredUsers.push(newUser);
                    localStorage.setItem("prisma_registered_users", JSON.stringify(registeredUsers));

                    setUserName(newUser.name);
                    setUserEmail(newUser.email);
                    setUserAvatar(newUser.avatar);
                    setIsLoggedIn(true);
                    setIsLoginModalOpen(false);
                    setNotifications((prev) => [
                      `Seja muito bem-vindo à nossa plataforma, ${newUser.name}! Sua conta foi criada e você está conectado.`,
                      ...prev
                    ]);
                  } else {
                    // Login Mode verification
                    if (!targetEmail) {
                      setLoginError("Por favor, digite seu endereço de e-mail.");
                      return;
                    }
                    if (!loginPasswordInput) {
                      setLoginError("Por favor, digite sua senha de acesso.");
                      return;
                    }

                    // Find registered user
                    const matchedUser = registeredUsers.find((u: any) => u.email === targetEmail);
                    if (!matchedUser) {
                      setLoginError("A conta não existe");
                      return;
                    }

                    if (matchedUser.password !== loginPasswordInput) {
                      setLoginError("Senha incorreta");
                      return;
                    }

                    // Log in
                    setUserName(matchedUser.name);
                    setUserEmail(matchedUser.email);
                    setUserAvatar(matchedUser.avatar || DEFAULT_PLACEHOLDER_AVATAR);
                    setIsLoggedIn(true);
                    setIsLoginModalOpen(false);
                    setNotifications((prev) => [
                      `Olá ${matchedUser.name}, login realizado com sucesso. Bem-vindo de volta!`,
                      ...prev
                    ]);
                  }
                }}
                className="w-full bg-[#c2f425] text-black font-bold text-[13px] py-3.5 rounded-lg hover:bg-[#d6ff45] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer text-center uppercase tracking-wider font-semibold shadow-[0_0_15px_rgba(194,244,37,0.15)]"
              >
                {loginModalMode === "login" ? "Entrar / Acessar" : "Criar Minha Conta"}
              </button>

              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="w-full text-[#c4c9ae]/60 hover:text-white text-[12px] py-2 transition-colors cursor-pointer text-center font-medium"
              >
                Continuar navegando como Visitante
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
    </>
  );
}
