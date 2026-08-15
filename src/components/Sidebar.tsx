import { useState } from "react";
import { Grid2X2, PlayCircle, Users, BookOpen, Award, Settings, LogOut, User, Lock, X, PanelLeftClose, PanelLeftOpen, Info } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userEmail?: string;
  onLogout?: () => void;
  onOpenSettings?: () => void;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  userEmail,
  onLogout,
  onOpenSettings,
  isLoggedIn = true,
  onLogin,
  onClose,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const menuItems = [
    { id: "vitrine", label: "Vitrine", icon: Grid2X2 },
    { id: "continuar", label: "Continuar Assistindo", icon: PlayCircle },
    { id: "comunidade", label: "Comunidade", icon: Users },
    { id: "historia", label: "Nossa História", icon: BookOpen },
    { id: "certificados", label: "Certificados", icon: Award }
  ];

  return (
    <aside
      className={`h-full bg-[#121414] border-r border-[#444934]/30 flex flex-col justify-between shrink-0 font-sans z-50 overflow-y-auto custom-scrollbar transition-all duration-300 ${
        isCollapsed
          ? "w-[76px] min-w-[76px] max-w-[76px] p-3"
          : "w-fit max-w-[280px] min-w-[220px] sm:w-[260px] md:w-[280px] p-4 sm:p-6"
      }`}
    >
      <div>
        {/* Logo centered + Close button (mobile only, absolutely positioned so logo stays centered) */}
        <div className="relative flex items-center py-4 sm:py-6 mb-4 sm:mb-6">
          {!isCollapsed && (
            <>
              <img
                alt="Prisma Logo"
                className="h-12 sm:h-16 w-auto object-contain cursor-pointer transition-transform hover:scale-105 duration-300 mx-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCozAWHCV-m6qH2nsaVf7y8wN4DVkYSyG_92bFJYIBxDHILa2ECAyFb9V9PASlNZuHlb8Ibk5_R9CcdnkKclFHx_FL7e72-rT24vkSw3hjMBy3qZaXScPFUhW2W61uFcxIYQZpxdtrYU5oKRypxrhrFd2xLoVHD0LGWtqT20EwoFHacY_XF-IJe1CcHoc-qZDmxtZ_Q0D5tWXcHUvPMKRdNwBJisATR00RhqaQ-R3N9uopH9EvcH7eCYf3M1kmpqnrOpsajm0QGL3A"
                onClick={() => setActiveTab("vitrine")}
              />
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  aria-label="Minimizar menu lateral"
                  title="Minimizar menu lateral"
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 shrink-0 p-1.5 rounded-lg text-[#c4c9ae] hover:text-[#c2f425] hover:bg-[#282a2b]/40 transition-colors cursor-pointer items-center"
                >
                  <PanelLeftClose className="w-5 h-5 shrink-0" />
                </button>
              )}
            </>
          )}
          {isCollapsed && (
            <img
              alt="Prisma Logo"
              className="h-6 sm:h-7 w-auto object-contain cursor-pointer opacity-80 transition-all hover:scale-105 hover:opacity-100 duration-300 mx-auto"
              src="/logo.svg"
              onClick={() => setActiveTab("vitrine")}
            />
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              title="Fechar menu"
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#c4c9ae] hover:text-[#c2f425] hover:bg-[#282a2b]/60 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Toggle expand button (desktop only, collapsed state) */}
        {isCollapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expandir menu lateral"
            title="Expandir menu lateral"
            className="hidden lg:flex w-full items-center justify-center mb-3 p-2 rounded-lg text-[#c4c9ae] hover:text-[#c2f425] hover:bg-[#282a2b]/40 transition-colors cursor-pointer"
          >
            <PanelLeftOpen className="w-4 h-4 shrink-0" />
          </button>
        )}

        {/* Menu Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            const isRestricted = !isLoggedIn && item.id !== "vitrine" && item.id !== "historia";
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? "border-l-4 border-[#c2f425] bg-[#c2f425]/5 text-[#c2f425] font-bold shadow-[0_0_15px_rgba(194,244,37,0.05)]"
                    : "text-[#c4c9ae] hover:text-[#e2e2e2] hover:bg-[#282a2b]/40"
                } ${isRestricted ? "opacity-75 hover:opacity-100" : ""} ${
                  isCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? "justify-center gap-0" : ""}`}>
                  <IconComponent className={`w-5 h-5 shrink-0 ${isActive ? "text-[#c2f425]" : "text-[#c4c9ae]"}`} />
                  {!isCollapsed && <span className="text-[13px] font-medium tracking-wide whitespace-nowrap">{item.label}</span>}
                </div>
                {!isCollapsed && isRestricted && (
                  <Lock className="w-3.5 h-3.5 text-[#c4c9ae]/40 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Options */}
      <div className="border-t border-[#444934]/20 pt-4 flex flex-col gap-3">
        <button
          onClick={onOpenSettings}
          title={isCollapsed ? "Configurações" : undefined}
          className={`flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-left text-[#c4c9ae] hover:text-[#e2e2e2] hover:bg-[#282a2b]/40 transition-colors ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <Settings className="w-4.5 h-4.5 text-[#c4c9ae] shrink-0" />
          {!isCollapsed && <span className="text-[12px] uppercase tracking-wider font-medium truncate">Configurações</span>}
        </button>

        {isLoggedIn ? (
          <button
            onClick={onLogout}
            title={isCollapsed ? "Sair" : undefined}
            className={`flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-left text-[#c4c9ae] hover:text-[#ffb4ab] hover:bg-[#93000a]/10 transition-colors ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            <LogOut className="w-4.5 h-4.5 text-[#c4c9ae] shrink-0" />
            {!isCollapsed && <span className="text-[12px] uppercase tracking-wider font-medium truncate">Sair</span>}
          </button>
        ) : (
          <button
            onClick={onLogin}
            title={isCollapsed ? "Fazer login" : undefined}
            className={`flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-left text-[#c2f425] hover:bg-[#c2f425]/10 transition-colors ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            <User className="w-4.5 h-4.5 text-[#c2f425] shrink-0" />
            {!isCollapsed && <span className="text-[12px] uppercase tracking-wider font-medium font-bold truncate">FAZER LOGIN</span>}
          </button>
        )}

        {/* Copyright info */}
        {!isCollapsed ? (
          <div className="pt-4 border-t border-[#444934]/10 text-center">
            <p className="text-[9px] text-[#8c8c8c] uppercase tracking-wider leading-relaxed">
              © 2026 COPYRIGHT • POWERED BY
              <br />
              <span className="font-bold text-[#c2f425]/80 hover:text-[#c2f425] hover:underline cursor-pointer transition-colors">
                <a 
                  href="https://romeuportfolio.onrender.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  ROMEU CARVALHO
                </a>
              </span>
            </p>
          </div>
        ) : (
          <div className="border-t border-[#444934]/10 relative flex justify-center mt-1">
            <button
              type="button"
              onClick={() => setIsInfoOpen((v) => !v)}
              title="Informações"
              aria-label="Informações"
              className="p-2 rounded-lg text-[#c4c9ae] hover:text-[#c2f425] hover:bg-[#282a2b]/40 transition-colors cursor-pointer"
            >
              <Info className="w-4.5 h-4.5 shrink-0" />
            </button>

            {isInfoOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsInfoOpen(false)} />
                <div className="fixed bottom-20 left-20 z-50 w-56 bg-[#1e2020] border border-[#444934]/40 rounded-xl p-4 pt-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                  <button
                    type="button"
                    onClick={() => setIsInfoOpen(false)}
                    aria-label="Fechar"
                    title="Fechar"
                    className="absolute top-2 right-2 text-[#c4c9ae] hover:text-[#c2f425] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-[9px] text-[#8c8c8c] uppercase tracking-wider leading-relaxed text-center flex flex-col items-center gap-1.5">
                    <span>© 2026 COPYRIGHT • POWERED BY</span>
                    <span className="font-bold text-[#c2f425]/80 hover:text-[#c2f425] hover:underline cursor-pointer transition-colors">
                      <a 
                        href="https://romeuportfolio.onrender.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        ROMEU CARVALHO
                      </a>
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
