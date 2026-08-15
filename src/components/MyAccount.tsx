import React, { useState } from "react";
import { 
  User, 
  Award, 
  Share2, 
  FolderOpen, 
  Key, 
  FileText, 
  BookOpen, 
  TrendingUp, 
  Globe2, 
  Pencil, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link2, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";

interface MyAccountProps {
  userName: string;
  setUserName: (name: string) => void;
  userAvatar: string;
  setUserAvatar: (avatar: string) => void;
  userEmail: string;
  onBackToDashboard: () => void;
  onOpenTermos: () => void;
}

export const DEFAULT_PLACEHOLDER_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><rect width='100' height='100' fill='%231b202e'/><circle cx='50' cy='36' r='14' stroke='white' stroke-width='4.5'/><path d='M26 76 C26 58, 74 58, 74 76' stroke='white' stroke-width='4.5' stroke-linecap='round'/></svg>";

const AVATAR_PRESETS = [
  DEFAULT_PLACEHOLDER_AVATAR,
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqdjvc3jwaI9pIFTYYlnp7rcVsGlTKA1ZNZg6tsS0rhW-SypnhaDvL3K8rrdb5Zod0ghBR527a4rpXvxJ-3lh59ZwT8DPVFNRowzHWQm-MOQ_4owp84fmzTngH9B22nC89MThJ2Hyyv3PaLg-NPtO4FWMKM84Hu5B4V20n2QEpTuI3osPP82D4ciCBIMUqR5dWstCUO4r6_FeIyDVvPWlcbWUoSKBPguS90jjFIZ5VCsdCZokx_87Ks4jSZU0ngEId65AHl1tJD18", // Golden Star Icon helper
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", // Female tech learner
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", // Male professional
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", // Energetic young lady
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" // Studio portrait girl
];

export default function MyAccount({
  userName,
  setUserName,
  userAvatar,
  setUserAvatar,
  userEmail,
  onBackToDashboard,
  onOpenTermos
}: MyAccountProps) {
  // Current active sub-tab on the My Account secondary sidebar
  const [activeSubTab, setActiveSubTab] = useState<string>("dados-pessoais");
  
  // Local form states (initialized to empty)
  const [localName, setLocalName] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const [localBio, setLocalBio] = useState("");
  const [localBirthdate, setLocalBirthdate] = useState("");
  const [localDocument, setLocalDocument] = useState("");
  const [localCountry, setLocalCountry] = useState("BR");
  const [localZipCode, setLocalZipCode] = useState("");
  const [localState, setLocalState] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localBairro, setLocalBairro] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const [localComplement, setLocalComplement] = useState("");
  const [localPhoneDDD, setLocalPhoneDDD] = useState("");
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");
  const [localLanguage, setLocalLanguage] = useState("pt_BR");

  // Load local form states on mount or user shift
  React.useEffect(() => {
    setLocalName(userName || "");
    if (userEmail) {
      const savedProfileJSON = localStorage.getItem(`prisma_profile_${userEmail.toLowerCase()}`);
      if (savedProfileJSON) {
        try {
          const profile = JSON.parse(savedProfileJSON);
          if (profile.name) setLocalName(profile.name);
          if (profile.title) setLocalTitle(profile.title);
          if (profile.bio) setLocalBio(profile.bio);
          if (profile.birthdate) setLocalBirthdate(profile.birthdate);
          if (profile.document) setLocalDocument(profile.document);
          if (profile.country) setLocalCountry(profile.country);
          if (profile.zipCode) setLocalZipCode(profile.zipCode);
          if (profile.state) setLocalState(profile.state);
          if (profile.city) setLocalCity(profile.city);
          if (profile.bairro) setLocalBairro(profile.bairro);
          if (profile.address) setLocalAddress(profile.address);
          if (profile.number) setLocalNumber(profile.number);
          if (profile.complement) setLocalComplement(profile.complement);
          if (profile.phoneDDD) setLocalPhoneDDD(profile.phoneDDD);
          if (profile.phoneNumber) setLocalPhoneNumber(profile.phoneNumber);
          if (profile.language) setLocalLanguage(profile.language);
        } catch (e) {
          console.error("Error reading profile JSON", e);
        }
      } else {
        // Fallback default
        setLocalTitle("");
        setLocalBio("");
        setLocalBirthdate("");
        setLocalDocument("");
        setLocalCountry("BR");
        setLocalZipCode("");
        setLocalState("");
        setLocalCity("");
        setLocalBairro("");
        setLocalAddress("");
        setLocalNumber("");
        setLocalComplement("");
        setLocalPhoneDDD("");
        setLocalPhoneNumber("");
      }
    }
  }, [userEmail, userName]);

  // Rich Text Editor states
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Avatar selector state
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  // System alert feedback simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password / Credentials tab local states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);

  // Social handles state
  const [linkedinHandle, setLinkedinHandle] = useState("");
  const [githubHandle, setGithubHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  // State for document/media placeholder upload files (cleared)
  const [mediaFiles, setMediaFiles] = useState<Array<{ name: string; size: string; date: string }>>([]);
  const [mediaNameInput, setMediaNameInput] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSaveDadosPessoais = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(localName);

    if (userEmail) {
      const emailKey = userEmail.toLowerCase();
      // 1. Save specific user profile values
      const profileData = {
        name: localName,
        title: localTitle,
        bio: localBio,
        birthdate: localBirthdate,
        document: localDocument,
        country: localCountry,
        zipCode: localZipCode,
        state: localState,
        city: localCity,
        bairro: localBairro,
        address: localAddress,
        number: localNumber,
        complement: localComplement,
        phoneDDD: localPhoneDDD,
        phoneNumber: localPhoneNumber,
        language: localLanguage
      };
      localStorage.setItem(`prisma_profile_${emailKey}`, JSON.stringify(profileData));

      // 2. Update master registered users list
      const savedUsersJSON = localStorage.getItem("prisma_registered_users");
      if (savedUsersJSON) {
        try {
          const registeredUsers = JSON.parse(savedUsersJSON);
          const updatedUsers = registeredUsers.map((u: any) => {
            if (u.email && u.email.toLowerCase() === emailKey) {
              return {
                ...u,
                name: localName
              };
            }
            return u;
          });
          localStorage.setItem("prisma_registered_users", JSON.stringify(updatedUsers));
        } catch (err) {
          console.error("Error updating user list", err);
        }
      }
    }

    triggerToast("Dados pessoais atualizados com sucesso!");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Redes sociais gravadas com sucesso.");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("Erro: A nova senha e sua confirmação estão desalinhadas.");
      return;
    }
    triggerToast("Credenciais e senhas salvas com segurança!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUploadMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaNameInput.trim()) return;
    setMediaFiles(prev => [
      { name: mediaNameInput, size: "1.5 MB", date: "Hoje mesmo" },
      ...prev
    ]);
    setMediaNameInput("");
    triggerToast("Arquivo adicionado com sucesso!");
  };

  // Helper formatting for CPF or birthdate
  const formatDocument = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      // Format as CPF: 000.000.000-00
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
      }
    }
    return val;
  };

  const formatBirthdate = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length === 8) {
      let match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
      if (match) {
        return `${match[1]}/${match[2]}/${match[3]}`;
      }
    }
    return val;
  };

  // Calculate Password Strength bar percentage (0-100)
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length > 6) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;
    return Math.min(score, 100);
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const menuSidebarItems = [
    { id: "dados-pessoais", label: "Dados pessoais", icon: TrendingUp },
    { id: "perfil", label: "Perfil", icon: User },
    { id: "recompensa", label: "Recompensa", icon: Award },
    { id: "redes-sociais", label: "Redes sociais", icon: Share2 },
    { id: "midias", label: "Mídias", icon: FolderOpen },
    { id: "dados-de-acesso", label: "Dados de acesso", icon: Key }
  ];

  return (
    <div className="p-3 sm:p-4 md:p-8 max-w-[1400px] mx-auto animate-fade-in relative min-h-[85vh]">
      
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div id="toast-save-feedback" className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#c2f425] text-[#121414] py-3 px-6 rounded-full font-bold text-[13px] shadow-[0_4px_30px_rgba(194,244,37,0.4)] flex items-center gap-2.5 z-55 border border-white/20 animate-bounce">
          <Check className="w-4 h-4 stroke-[3px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Level Option block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={onBackToDashboard}
              className="text-[#c4c9ae] hover:text-[#c2f425] text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-[#1a1c1c]/40 py-1 px-2.5 border border-[#444934]/30 rounded-full hover:bg-[#1a1c1c] mb-1"
            >
              ← Painel Geral
            </button>
          </div>
          <h2 className="font-headline text-[22px] sm:text-[26px] md:text-[32px] font-bold text-white tracking-tight">
            Minha conta
          </h2>
          <p className="text-[12px] sm:text-[13px] md:text-[14.5px] text-[#c4c9ae] mt-1">
            Administre informações e configurações de seu usuário
          </p>
        </div>

        {/* BR Português selector */}
        <div className="relative shrink-0">
          <select 
            value={localLanguage} 
            onChange={(e) => {
              setLocalLanguage(e.target.value);
              triggerToast(`Idioma alterado para: ${e.target.value === "pt_BR" ? "Português (BR)" : "English (US)"}`);
            }}
            className="bg-[#1a1c1c] border border-[#444934]/50 rounded-lg px-3 sm:px-4 py-2 text-[12px] text-[#e2e2e2] hover:border-[#c2f425] focus:outline-none transition-all cursor-pointer font-medium"
          >
            <option value="pt_BR">🇧🇷 Português (BR)</option>
            <option value="en_US">🇺🇸 English (US)</option>
          </select>
        </div>
      </div>

      {/* Main Core Secondary Box Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 my-4">
        
        {/* Left column sidebar option selection row */}
        <div className="lg:col-span-3 bg-[#13151a] border border-[#2a2c32] rounded-2xl p-4 sm:p-6 flex flex-col justify-between lg:min-h-[580px] min-h-fit gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-visible">
          <div>
            {/* User Profile Avatar with pencil editor */}
            <div className="flex flex-col items-center py-4 sm:py-6 border-b border-[#2a2c32]/60 mb-4 sm:mb-6 relative">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 select-none">
                <div className="w-full h-full rounded-full border-2 border-[#c2f425]/30 overflow-hidden bg-[#24262c] shadow-[0_0_20px_rgba(194,244,37,0.1)]">
                  <img 
                    src={userAvatar} 
                    alt="Romeu Dom" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Pencil badge overlay */}
                <button 
                  onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                  className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c2f425] hover:bg-[#d4ff4d] cursor-pointer flex items-center justify-center border-4 border-[#13151a] shadow-md transition-all active:scale-90"
                  title="Alterar avatar de usuário"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#121414] fill-current" />
                </button>
              </div>

              {showAvatarSelector && (
                <div id="avatar-presets-modal" className="absolute top-[110px] bg-[#1e2026] border border-[#c2f425]/30 rounded-xl p-3.5 w-64 shadow-2xl z-40 transition-all">
                  <p className="text-[10.5px] font-bold text-[#c2f425] uppercase tracking-wider mb-2.5 text-center">Selecione seu Avatar</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setUserAvatar(preset);
                          setShowAvatarSelector(false);
                          triggerToast("Avatar do perfil redefinido!");
                        }}
                        className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                          userAvatar === preset ? "border-[#c2f425]" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={preset} className="w-full h-full object-cover" alt="Preset pointer" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-[#2a2c32]/50 flex flex-col gap-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const fileInput = document.getElementById("profile-upload-input");
                        if (fileInput) fileInput.click();
                      }}
                      className="w-full bg-[#c2f425] hover:bg-[#d4ff4d] text-[#121414] text-[11px] font-extrabold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-wide cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Fazer Upload</span>
                    </button>
                    <span className="text-[9px] text-[#c4c9ae]/50">Máximo de 1.5 MB</span>
                    <input
                      type="file"
                      id="profile-upload-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 1.5 * 1024 * 1024) {
                            alert("Por favor, selecione uma imagem com tamanho de até 1.5 MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result;
                            if (typeof result === "string") {
                              setUserAvatar(result);
                              setShowAvatarSelector(false);
                              triggerToast("Avatar do perfil atualizado!");
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <h4 className="font-headline font-bold text-[15px] text-white text-center">
                {userName}
              </h4>
            </div>

            {/* Menu options list */}
            <nav className="flex flex-wrap flex-row lg:flex-col gap-1.5 py-1.5 shrink-0 w-full">
              {menuSidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`flex items-center gap-2 sm:gap-3 px-3 py-2 lg:px-4 lg:py-3 rounded-xl text-left transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive
                        ? "text-[#c2f425] bg-[#c2f425]/5 font-bold shadow-[inset_0_0_10px_rgba(194,244,37,0.03)] border-b-2 lg:border-b-0 lg:border-l-4 border-[#c2f425]"
                        : "text-[#c4c9ae] hover:text-white hover:bg-[#1a1c22]/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#c2f425]" : "text-[#c4c9ae]"}`} />
                    <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-medium tracking-wide whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t border-[#2a2c32]/40 hidden lg:block">
            <button 
              onClick={onOpenTermos}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#c4c9ae] hover:text-white hover:bg-[#1a1c22]/50 transition-colors w-full text-left text-[11.5px] font-medium"
            >
              <BookOpen className="w-4 h-4 text-[#c4c9ae]/70" />
              <span>Termos de uso</span>
            </button>
          </div>

        </div>

        {/* Right column Form interactive panel area */}
        <div className="lg:col-span-9 bg-[#13151a] border border-[#2a2c32] rounded-2xl p-4 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          
          {/* TAB 1: DADOS PESSOAIS FORM */}
          {activeSubTab === "dados-pessoais" && (
            <form onSubmit={handleSaveDadosPessoais} className="flex flex-col gap-8 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Dados pessoais
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Preencha seus principais dados
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                    Nome
                  </label>
                  <input 
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    required
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                  />
                </div>

                {/* Título profissional */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                    Título profissional
                  </label>
                  <input 
                    type="text"
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    placeholder="Ex: Desenvolvedor Full Stack"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/40"
                  />
                </div>

                {/* Bio text area - with custom visual toolbar layout */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                    Bio (opcional)
                  </label>
                  
                  {/* Visual toolbar buttons resembling image attachments */}
                  <div className="bg-[#1f2129] border border-[#343745] rounded-xl overflow-hidden focus-within:border-[#c2f425]/80 transition-all">
                    <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-[#343745] bg-[#1a1c22]">
                      <button 
                        type="button" 
                        onClick={() => setIsBold(!isBold)}
                        className={`p-1.5 rounded-full transition-all ${isBold ? "bg-[#c2f425]/20 text-[#c2f425]" : "text-[#c4c9ae] hover:bg-[#343745]/50"}`}
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsItalic(!isItalic)}
                        className={`p-1.5 rounded-full transition-all ${isItalic ? "bg-[#c2f425]/20 text-[#c2f425]" : "text-[#c4c9ae] hover:bg-[#343745]/50"}`}
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsUnderline(!isUnderline)}
                        className={`p-1.5 rounded-full transition-all ${isUnderline ? "bg-[#c2f425]/20 text-[#c2f425]" : "text-[#c4c9ae] hover:bg-[#343745]/50"}`}
                        title="Underline"
                      >
                        <Underline className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-[#343745] mx-2" />
                      
                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Bullet List">
                        <List className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Numbered List">
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-[#343745] mx-2" />

                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Align Left">
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Align Center">
                        <AlignCenter className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Align Right">
                        <AlignRight className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-[#343745] mx-2" />

                      <button type="button" className="p-1.5 rounded-full text-[#c4c9ae] hover:bg-[#343745]/50 transition-all" title="Insert Link">
                        <Link2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      value={localBio}
                      onChange={(e) => setLocalBio(e.target.value)}
                      placeholder="Conte um pouco sobre você..."
                      rows={6}
                      className={`w-full bg-transparent px-4 py-3.5 text-[13px] text-white focus:outline-none placeholder-[#c4c9ae]/30 ${
                        isBold ? "font-bold" : ""
                      } ${isItalic ? "italic" : ""} ${isUnderline ? "underline" : ""}`}
                    />
                  </div>
                </div>

                {/* Data de nascimento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                    Data de nascimento
                  </label>
                  <input 
                    type="text"
                    value={localBirthdate}
                    onChange={(e) => setLocalBirthdate(formatBirthdate(e.target.value))}
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>

                {/* Documento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                    Documento
                  </label>
                  <input 
                    type="text"
                    value={localDocument}
                    onChange={(e) => setLocalDocument(formatDocument(e.target.value))}
                    placeholder="Ex: CPF ou Identificação"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>

                {/* SUBSECTION ADDRESS */}
                <div className="md:col-span-2 mt-4 pt-4 border-t border-[#2a2c32]/40">
                  <h4 className="font-headline font-bold text-[14px] text-white mb-4">
                    Endereço
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* País dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        País
                      </label>
                      <select 
                        value={localCountry}
                        onChange={(e) => setLocalCountry(e.target.value)}
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="BR">Brasil</option>
                        <option value="US">Estados Unidos</option>
                        <option value="PT">Portugal</option>
                        <option value="ES">Espanha</option>
                        <option value="UK">Reino Unido</option>
                      </select>
                    </div>

                    {/* ZIP Code */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        ZIP Code
                      </label>
                      <input 
                        type="text"
                        value={localZipCode}
                        onChange={(e) => setLocalZipCode(e.target.value)}
                        placeholder="ZIP Code"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Estado / Província */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Estado / Província
                      </label>
                      <input 
                        type="text"
                        value={localState}
                        onChange={(e) => setLocalState(e.target.value)}
                        placeholder="Estado / Província"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Cidade */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Cidade
                      </label>
                      <input 
                        type="text"
                        value={localCity}
                        onChange={(e) => setLocalCity(e.target.value)}
                        placeholder="Cidade"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Bairro
                      </label>
                      <input 
                        type="text"
                        value={localBairro}
                        onChange={(e) => setLocalBairro(e.target.value)}
                        placeholder="Bairro"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Endereço */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Endereço
                      </label>
                      <input 
                        type="text"
                        value={localAddress}
                        onChange={(e) => setLocalAddress(e.target.value)}
                        placeholder="Rua, Avenida..."
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Número */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Número
                      </label>
                      <input 
                        type="text"
                        value={localNumber}
                        onChange={(e) => setLocalNumber(e.target.value)}
                        placeholder="Número"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                    {/* Complemento (opcional) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                        Complemento (opcional)
                      </label>
                      <input 
                        type="text"
                        value={localComplement}
                        onChange={(e) => setLocalComplement(e.target.value)}
                        placeholder="Apto, Sala, Bloco..."
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all placeholder-[#c4c9ae]/30"
                      />
                    </div>

                  </div>
                </div>

                {/* SUBSECTION TELEFONE */}
                <div className="md:col-span-2 mt-4 pt-4 border-t border-[#2a2c32]/40 flex flex-col gap-3">
                  <h4 className="font-headline font-bold text-[14px] text-white mb-2">
                    Telefones
                  </h4>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-[#c4c9ae] uppercase tracking-wider">
                      Celular
                    </label>
                    <div className="flex gap-3 flex-wrap md:flex-nowrap">
                      {/* DDI select */}
                      <select 
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-3.5 py-3 text-[13px] text-white focus:outline-none max-w-[140px] cursor-pointer"
                        title="DDI País"
                        defaultValue="55"
                      >
                        <option value="55">🇧🇷 +55</option>
                        <option value="1">🇺🇸 +1</option>
                        <option value="351">🇵🇹 +351</option>
                      </select>

                      {/* DDD */}
                      <input 
                        type="text" 
                        maxLength={3}
                        value={localPhoneDDD}
                        onChange={(e) => setLocalPhoneDDD(e.target.value.replace(/\D/g, ""))}
                        placeholder="83" 
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none w-16 text-center"
                      />

                      {/* Number */}
                      <input 
                        type="text"
                        value={localPhoneNumber}
                        onChange={(e) => setLocalPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="99999-9999"
                        className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none flex-grow"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Salvar Button container */}
              <div className="flex justify-end pt-6 border-t border-[#2a2c32]/40">
                <button 
                  type="submit"
                  className="bg-[#c2f425] hover:bg-[#d4ff4d] text-[#121414] font-extrabold text-[12.5px] py-3.5 px-8 rounded-full cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(194,244,37,0.25)] uppercase tracking-wider"
                >
                  Salvar alterações
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: PERFIL & PRESET CONFIG */}
          {activeSubTab === "perfil" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Personalização do Perfil
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Configure os aspectos visuais e sua aparência na comunidade
                </p>
              </div>

              {/* Profile Card Mockup */}
              <div className="bg-[#1a1c22] border border-[#2a2c32] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#c2f425] overflow-hidden shrink-0">
                  <img src={userAvatar} className="w-full h-full object-cover" alt="Avatar demo pointer" />
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <h4 className="text-[14px] sm:text-[16px] font-bold text-white font-headline truncate">{userName}</h4>
                  <p className="text-[#c2f425] text-xs font-semibold">{localTitle || "Aluno Prisma"}</p>
                  <p className="text-[#c4c9ae] text-[11px] sm:text-xs mt-2 italic max-w-md line-clamp-2">
                    "{localBio || "Conte um pouco sobre você..."}"
                  </p>
                </div>
                <span className="bg-[#c2f425]/10 border border-[#c2f425]/30 text-[#c2f425] text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase shrink-0">
                  Membro Premium
                </span>
              </div>

              {/* Accent Theme color switcher */}
              <div className="mt-6 flex flex-col gap-3">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Cor de Destaque Pessoal</h4>
                <div className="flex gap-4">
                  <button className="bg-[#c2f425] border-2 border-white w-9 h-9 rounded-full relative" title="Prisma Lime">
                    <Check className="w-4 h-4 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </button>
                  <button onClick={() => triggerToast("Cyberpunk Vermelho aplicado (Visual)")} className="bg-red-500 hover:scale-105 transition-transform w-9 h-9 rounded-full" title="Cyber Red" />
                  <button onClick={() => triggerToast("Ocean Aqua aplicado (Visual)")} className="bg-sky-400 hover:scale-105 transition-transform w-9 h-9 rounded-full" title="Ocean Aqua" />
                  <button onClick={() => triggerToast("Galactic Violet aplicado (Visual)")} className="bg-violet-600 hover:scale-105 transition-transform w-9 h-9 rounded-full" title="Galactic Violet" />
                </div>
              </div>

              {/* Save */}
              <div className="flex justify-end pt-6 border-t border-[#2a2c32]/40 mt-12">
                <button 
                  onClick={() => triggerToast("Preferências de perfil gravadas!")}
                  className="bg-[#c2f425] hover:bg-[#d4ff4d] text-[#121414] font-extrabold text-[12.5px] py-3 px-6 rounded-full uppercase cursor-pointer"
                >
                  Salvar Perfil
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RECOMPENSAS / GAMIFICATION */}
          {activeSubTab === "recompensa" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Minhas Conquistas e Recompensas
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Seus status de engajamento, conquistas desbloqueadas e mimos acumulados
                </p>
              </div>

              {/* XP Overview Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                
                <div className="bg-[#1a1c22] border border-[#2a2c32] p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c4c9ae] tracking-wider">Pontuação Total</span>
                    <h5 className="text-[28px] font-black text-[#c2f425] font-headline mt-1">4.850 XP</h5>
                  </div>
                  <div className="w-full h-1 bg-[#343745] rounded-full overflow-hidden mt-4">
                    <div className="w-3/4 h-full bg-[#c2f425]" />
                  </div>
                </div>

                <div className="bg-[#1a1c22] border border-[#2a2c32] p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c4c9ae] tracking-wider">Streak Ativo</span>
                    <h5 className="text-[28px] font-black text-rose-500 font-headline mt-1">🔥 12 Dias</h5>
                  </div>
                  <span className="text-[10px] text-[#c4c9ae] mt-2">Próxima meta: 15 dias (+500 XP)</span>
                </div>

                <div className="bg-[#1a1c22] border border-[#2a2c32] p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c4c9ae] tracking-wider">Certificados Prontos</span>
                    <h5 className="text-[28px] font-black text-blue-400 font-headline mt-1">03 Concluídos</h5>
                  </div>
                  <span className="text-[10px] text-[#c4c9ae] mt-2">Próximo upgrade estimado: 2 dias</span>
                </div>

              </div>

              {/* Achievements badges row */}
              <div className="mt-6 flex flex-col gap-4">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Medalhas desbloqueadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-[#1f2129]/60 p-4 rounded-xl border border-[#2a2c32]">
                    <div className="w-12 h-12 rounded-full bg-[#c2f425]/10 flex items-center justify-center border border-[#c2f425]/40 text-[#c2f425] text-lg font-bold">🥇</div>
                    <div>
                      <h6 className="text-white font-bold text-xs">Pioneiro da Fluência</h6>
                      <p className="text-[10.5px] text-[#c4c9ae]">Completou a primeira lição na semana de largada.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#1f2129]/60 p-4 rounded-xl border border-[#2a2c32]">
                    <div className="w-12 h-12 rounded-full bg-[#c2f425]/10 flex items-center justify-center border border-[#c2f425]/40 text-[#c2f425] text-lg font-bold">🗣️</div>
                    <div>
                      <h6 className="text-white font-bold text-xs">Comunidade Ativa</h6>
                      <p className="text-[10.5px] text-[#c4c9ae]">Fez 3 perguntas ou respostas nos canais da comunidade.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REDES SOCIAIS */}
          {activeSubTab === "redes-sociais" && (
            <form onSubmit={handleSaveSocial} className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Redes sociais
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Vincule suas mídias profissionais para exibir no seu perfil e compartilhar certificados
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* LinkedIn */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">LinkedIn</label>
                  <input 
                    type="url"
                    value={linkedinHandle}
                    onChange={(e) => setLinkedinHandle(e.target.value)}
                    placeholder="https://linkedin.com/in/seuuser"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>

                {/* GitHub */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">GitHub</label>
                  <input 
                    type="url"
                    value={githubHandle}
                    onChange={(e) => setGithubHandle(e.target.value)}
                    placeholder="https://github.com/seuuser"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>

                {/* Twitter / X */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">Twitter / X</label>
                  <input 
                    type="url"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    placeholder="https://x.com/seuuser"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>

                {/* Instagram */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">Instagram</label>
                  <input 
                    type="url"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="https://instagram.com/seuuser"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-[#2a2c32]/40 mt-12">
                <button 
                  type="submit"
                  className="bg-[#c2f425] hover:bg-[#d4ff4d] text-[#121414] font-extrabold text-[12.5px] py-3.5 px-8 rounded-full uppercase cursor-pointer"
                >
                  Salvar Redes Sociais
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: MIDIAS / UPLOAD */}
          {activeSubTab === "midias" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Mídias e Documentos
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Envie e organize seus portfólios or arquivos de apoio para validação técnica
                </p>
              </div>

              {/* Drag and Drop Box with interactive simulated adder */}
              <form onSubmit={handleUploadMedia} className="bg-[#1f2129]/40 border-2 border-dashed border-[#343745] hover:border-[#c2f425]/70 rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all group cursor-pointer relative">
                <Plus className="w-10 h-10 text-[#c4c9ae] group-hover:text-[#c2f425] transition-colors" />
                <div className="text-center">
                  <p className="text-[13px] text-white font-semibold">Arraste e solte seus comprovantes ou arquivos relevantes</p>
                  <p className="text-[11px] text-[#c4c9ae]/70 mt-1">Formatos aceitos: PDF, PNG, JPG de até 15MB</p>
                </div>

                <div className="flex gap-2 max-w-md w-full mt-2">
                  <input 
                    type="text" 
                    value={mediaNameInput}
                    onChange={(e) => setMediaNameInput(e.target.value)}
                    placeholder="Nome do arquivo..." 
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1a1c22] border border-[#343745] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c2f425] flex-grow"
                  />
                  <button 
                    type="submit"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#c2f425] text-black text-[11px] font-bold px-4 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
                  >
                    Fazer Upload
                  </button>
                </div>
              </form>

              {/* Media table list representation */}
              <div className="mt-6 flex flex-col gap-3">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Seus documentos carregados</h4>
                <div className="flex flex-col gap-2">
                  {mediaFiles.map((file, idx) => (
                    <div key={idx} className="bg-[#1f2129] border border-[#2a2c32] rounded-lg p-4 flex justify-between items-center hover:border-neutral-500 transition-all">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#c2f425]" />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">{file.name}</p>
                          <p className="text-[10px] text-[#c4c9ae] mt-0.5">{file.date} ({file.size})</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setMediaFiles(prev => prev.filter((_, i) => i !== idx));
                          triggerToast("Documento excluído");
                        }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DADOS DE ACESSO */}
          {activeSubTab === "dados-de-acesso" && (
            <form onSubmit={handleSaveSecurity} className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-white mb-1">
                  Dados de acesso e segurança
                </h3>
                <p className="text-[12px] text-[#c4c9ae]">
                  Gerencie sua senha, credenciais e mecanismos de autenticação em dois fatores
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 max-w-xl mt-4">
                
                {/* Username / Email read-only */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">E-mail Cadastrado</label>
                  <input 
                    type="text" 
                    value={userEmail}
                    disabled 
                    className="bg-[#1a1c22]/55 border border-[#343745] rounded-lg px-4 py-2.5 text-xs text-neutral-400 font-mono" 
                  />
                </div>

                {/* Current Password with visible/invisible trigger */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">Senha Atual</label>
                  <div className="relative">
                    <input 
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none w-full"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4c9ae] hover:text-white transition-colors"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">Nova Senha</label>
                  <div className="relative">
                    <input 
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none w-full"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4c9ae] hover:text-white transition-colors"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {newPassword && (
                    <div className="mt-2 text-[10px]">
                      <div className="flex justify-between text-[#c4c9ae] mb-1">
                        <span>Força da senha</span>
                        <span className="font-bold font-mono text-[#c2f425]">
                          {passwordStrength < 40 ? "Fraca ⚠️" : passwordStrength < 80 ? "Intermediária ⚡" : "Altamente Segura! 🔥"}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1a1c22] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#c2f425] transition-all duration-300" 
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11.5px] font-bold text-[#c4c9ae] uppercase tracking-wider">Confirmar Nova Senha</label>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha cadastrada"
                    className="bg-[#1f2129] border border-[#343745] focus:border-[#c2f425] rounded-lg px-4 py-3 text-[13px] text-white focus:outline-none w-full animate-none"
                  />
                </div>

                {/* 2FA switch */}
                <div className="flex items-center justify-between p-4 bg-[#1f2129]/60 rounded-xl border border-[#2a2c32] mt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#c2f425] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Autenticação em Dois Fatores (2FA)</p>
                      <p className="text-[10.5px] text-[#c4c9ae] mt-0.5 leading-relaxed">Adicione uma barreira extra exigindo código temporário no seu celular.</p>
                    </div>
                  </div>
                  
                  {/* Switch container */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={enable2FA}
                      onChange={() => {
                        setEnable2FA(!enable2FA);
                        triggerToast(enable2FA ? "Autenticação 2FA desativada" : "Autenticação 2FA configurada!");
                      }}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-[#343745] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-800 hover:after:bg-black after:border-neutral-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c2f425]" />
                  </label>
                </div>

              </div>

              <div className="flex justify-end pt-6 border-t border-[#2a2c32]/40 mt-12">
                <button 
                  type="submit"
                  disabled={!currentPassword}
                  className="bg-[#c2f425] hover:bg-[#d4ff4d] text-[#121414] font-extrabold text-[12.5px] py-3.5 px-8 rounded-full uppercase tracking-wider disabled:bg-[#c2f425]/15 disabled:text-neutral-500 transition-all cursor-pointer"
                >
                  Salvar Credenciais
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
