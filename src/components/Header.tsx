import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogIn, UserPlus, Menu, X } from "lucide-react";

interface HeaderProps {
  pageTitle?: string;
  searchPlaceholder: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userName?: string;
  userAvatar?: string;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
  isLoggedIn?: boolean;
  onLoginClick?: (mode: "login" | "register") => void;
  onMenuToggle?: () => void;
}

export default function Header({
  pageTitle,
  searchPlaceholder,
  searchQuery,
  setSearchQuery,
  userName = "Alex Silva",
  userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuACKMdAtdITzvy0m1dFaMR7eRKteFaKox4KqjuM0QRdmxS9YArFgZva18-ACq36_pnAUwcRcYXhPL3WsSzomeowuCHDJ5HeQadnNSAqvm-5eb4yx1t-rTDCwvpvHpqg_ne5cbkUMv3kwHcFaM5fBv6YuO5brnNHYM2BapvQqs2B7dEAq6evHJL-xVjso1WKvfokYrzFaK7TAIVrYFYW4qEZOPh-DvJ9MxdD6EUdk6B9-bTHe3b9l5GcDYebf0Vy5szHlv3L5uSVqGc",
  onProfileClick,
  onNotificationsClick,
  notificationCount = 2,
  isLoggedIn = true,
  onLoginClick,
  onMenuToggle
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      if (onProfileClick) onProfileClick();
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <header className="h-auto min-h-[64px] sm:h-[76px] lg:h-[88px] border-b border-[#444934]/30 bg-[#121414]/90 backdrop-blur-md sticky top-0 px-3 sm:px-4 md:px-8 py-2 sm:py-0 flex items-center justify-between shrink-0 z-40 gap-2">
      {/* Page Title or Brand Label */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 text-[#c4c9ae] hover:text-[#c2f425] transition-colors rounded-lg hover:bg-[#282a2b]/60 cursor-pointer shrink-0"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {pageTitle ? (
          <h1 className="font-headline text-[15px] xs:text-[17px] sm:text-[20px] lg:text-[24px] xl:text-[28px] font-bold text-[#c2f425] leading-none tracking-tight truncate max-w-[42vw] xs:max-w-[55vw] sm:max-w-md lg:max-w-none">
            {pageTitle}
          </h1>
        ) : (
          <div className="w-1" />
        )}
      </div>

      {/* Modern Search and Profile Actions */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-grow justify-end max-w-2xl shrink-0">
        {/* Search Input bar */}
        <div className="relative w-full max-w-[110px] xs:max-w-[150px] sm:max-w-xs md:max-w-md hidden sm:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-[#1a1c1c] border border-[#444934]/50 rounded-full py-2 pl-3 sm:pl-11 pr-3 sm:pr-4 text-[12px] sm:text-[13px] text-[#e2e2e2] placeholder-[#c4c9ae]/50 focus:outline-none focus:ring-1 focus:ring-[#c2f425] focus:border-[#c2f425] transition-all font-sans placeholder:text-[10px] sm:placeholder:text-[13px]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4c9ae] hidden sm:block" />
        </div>

        {/* Mobile search icon button */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="sm:hidden p-2 text-[#c4c9ae] hover:text-[#c2f425] transition-colors rounded-full hover:bg-[#282a2b] shrink-0 cursor-pointer"
          title="Pesquisar"
          aria-label="Pesquisar"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Mobile full-screen search overlay */}
        {mobileSearchOpen && (
          <div className="sm:hidden fixed inset-0 bg-[#121414]/95 backdrop-blur-md z-50 flex flex-col p-4 pt-6 gap-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-[#c4c9ae] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-[#1a1c1c] border border-[#444934]/50 rounded-full py-2.5 px-4 text-[13px] text-[#e2e2e2] placeholder-[#c4c9ae]/50 focus:outline-none focus:ring-1 focus:ring-[#c2f425] focus:border-[#c2f425] transition-all font-sans placeholder:text-[12px]"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 text-[#c4c9ae] hover:text-[#c2f425] transition-colors rounded-full hover:bg-[#282a2b] shrink-0 cursor-pointer"
                title="Fechar"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {searchQuery.trim() !== "" && (
              <p className="text-[12px] text-[#c4c9ae]/60 px-1">
                Resultados para "<span className="text-[#c2f425]">{searchQuery}</span>"
              </p>
            )}
          </div>
        )}

        {/* Action icons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
          <button
            onClick={onNotificationsClick}
            className="relative p-2 text-[#c4c9ae] hover:text-[#c2f425] transition-colors rounded-full hover:bg-[#282a2b]"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#c2f425] rounded-full ring-2 ring-[#121414]" />
            )}
          </button>

          {/* User profile identifier block */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={handleProfileClick}
              className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-[#444934]/30 h-8 cursor-pointer group select-none"
            >
              <span className="text-[13px] text-[#e2e2e2] font-semibold group-hover:text-[#c2f425] transition-colors hidden md:block max-w-[120px] truncate">
                {isLoggedIn ? (userName ? userName.split(" ")[0] : "") : "Olá, Visitante"}
              </span>
              
              {isLoggedIn ? (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#282a2b] border border-[#c2f425]/30 hover:border-[#c2f425] overflow-hidden flex items-center justify-center transition-all relative shrink-0">
                  <img
                    src={userAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <User className="w-5 h-5 text-[#c2f425] absolute hidden group-hover:block" />
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3b434b] border border-[#c2f425]/20 hover:border-[#c2f425]/60 flex items-center justify-center transition-all shrink-0">
                  <span className="text-[14px] font-bold text-white tracking-wider font-sans select-none">V</span>
                </div>
              )}
            </div>

            {/* Dropdown Menu for visitors */}
            {dropdownOpen && !isLoggedIn && (
              <div className="absolute right-0 mt-3.5 w-[180px] sm:w-[190px] bg-[#1e2029] border-t-2 border-[#b02a2a] rounded-b-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden py-1.5 border border-white/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onLoginClick) onLoginClick("login");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-[14px] font-medium text-[#e2e2e2] hover:bg-[#c2f425]/10 hover:text-[#c2f425] transition-colors group/item"
                >
                  <LogIn className="w-4 h-4 text-[#c4c9ae] group-hover/item:text-[#c2f425] transition-colors" />
                  <span>Entrar</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onLoginClick) onLoginClick("register");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-[14px] font-medium text-[#e2e2e2] hover:bg-[#c2f425]/10 hover:text-[#c2f425] transition-colors group/item"
                >
                  <User className="w-4 h-4 text-[#c4c9ae] group-hover/item:text-[#c2f425] transition-colors" />
                  <span>Criar conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
