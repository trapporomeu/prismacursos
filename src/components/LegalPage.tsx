import { ArrowLeft, FileText, ShieldCheck, CalendarClock } from "lucide-react";

interface LegalPageProps {
  type: "termos" | "politica";
  onBack: () => void;
}

interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

interface LegalContent {
  title: string;
  icon: typeof FileText;
  tagline: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTENT: Record<"termos" | "politica", LegalContent> = {
  termos: {
    title: "Termos de Uso",
    icon: FileText,
    tagline: "Regras e condições para uso da plataforma Prisma",
    updated: "Última atualização: 14 de agosto de 2026",
    intro:
      "Estes Termos de Uso regulam o acesso e a utilização da plataforma Prisma (cursos, mentorias, certificados, comunidade e demais recursos). Ao criar sua conta ou acessar qualquer área da plataforma, você concorda integralmente com as condições descritas abaixo.",
    sections: [
      {
        heading: "1. Aceitação dos Termos",
        paragraphs: [
          "Ao utilizar a Prisma, você declara ter lido, compreendido e aceitado estes Termos de Uso, bem como a nossa Política de Privacidade. Caso não concorde com qualquer disposição, você não deve criar uma conta ou utilizar os serviços.",
          "Estes Termos se aplicam a todos os usuários, sejam eles estudantes, mentores, parceiros ou visitantes da plataforma."
        ]
      },
      {
        heading: "2. Cadastro e Conta",
        list: [
          "Você é responsável por fornecer informações verdadeiras e atualizadas no momento do cadastro.",
          "Suas credenciais de acesso são pessoais e intransferíveis; você é o único responsável por manter a confidencialidade de sua senha.",
          "A Prisma pode suspender contas que apresentem indícios de fraude, uso indevido ou violação destes Termos.",
          "A criação de múltiplas contas para burlar planos, testes gratuitos ou benefícios é expressamente proibida."
        ]
      },
      {
        heading: "3. Assinaturas e Pagamentos",
        paragraphs: [
          "Os planos e valores são exibidos na vitrine e podem ser alterados a qualquer momento, sem prejuízo das condições já contratadas por usuários ativos.",
          "Ao assinar um plano, você autoriza a cobrança dos valores na forma escolhida. Renovações automáticas ocorrem até o cancelamento do plano, que pode ser feito a qualquer momento na área de conta."
        ],
        list: [
          "Reembolsos seguem a política vigente no momento da compra e são analisados individualmente pelo suporte.",
          "Acesso a conteúdos pagos permanece ativo enquanto a assinatura estiver em dia."
        ]
      },
      {
        heading: "4. Licença de Uso e Propriedade Intelectual",
        paragraphs: [
          "Todo o conteúdo disponibilizado na plataforma (aulas, materiais, textos, vídeos, marca e identidade visual) é propriedade da Prisma ou de seus licenciantes, protegido pela legislação de propriedade intelectual.",
          "A sua compra ou assinatura concede uma licença limitada, pessoal, intransferível e não exclusiva para acesso ao conteúdo, com fins exclusivamente educacionais."
        ],
        list: [
          "É proibido copiar, reproduzir, revender, distribuir ou disponibilizar o conteúdo da plataforma a terceiros.",
          "É proibido o uso de técnicas automatizadas (scraping, bots) para extração de conteúdo."
        ]
      },
      {
        heading: "5. Conduta do Usuário",
        list: [
          "Respeitar a comunidade, alunos e mentores, sem prática de assédio, discriminação ou linguagem ofensiva.",
          "Não compartilhar materiais, respostas de avaliações ou chaves de acesso de forma indevida.",
          "Não tentar invadir, alterar ou interferir na infraestrutura da plataforma.",
          "Não publicar conteúdos que infrinjam direitos de terceiros ou a legislação vigente."
        ]
      },
      {
        heading: "6. Certificados e Credenciais",
        paragraphs: [
          "Os certificados emitidos pela Prisma confirmam a conclusão de trilhas e módulos conforme o progresso registrado na sua conta.",
          "O certificado possui identificação única vinculada ao seu e-mail. A falsificação ou o uso indevido de certificados sujeita o infrator às penalidades legais e à suspensão definitiva da conta."
        ]
      },
      {
        heading: "7. Limitação de Responsabilidade",
        paragraphs: [
          "A Prisma emprega os melhores esforços para manter a plataforma disponível, segura e com conteúdo atualizado, mas não garante disponibilidade ininterrupta ou ausência de erros.",
          "Os resultados de aprendizado e desempenho dependem do empenho individual de cada usuário. A Prisma não se responsabiliza por ganhos ou resultados específicos prometidos por terceiros."
        ]
      },
      {
        heading: "8. Rescisão",
        paragraphs: [
          "Você pode encerrar sua conta a qualquer momento pela área de configurações. A Prisma pode suspender ou encerrar contas em caso de violação destes Termos, mediante aviso prévio quando aplicável."
        ]
      },
      {
        heading: "9. Alterações destes Termos",
        paragraphs: [
          "Podemos atualizar estes Termos periodicamente. A versão vigente será sempre publicada nesta página, com a data de última atualização. O uso contínuo da plataforma após alterações implica aceitação dos novos termos."
        ]
      },
      {
        heading: "10. Lei Aplicável e Foro",
        paragraphs: [
          "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Paulo/SP para dirimir eventuais controvérsias, com renúncia a qualquer outro."
        ]
      }
    ]
  },
  politica: {
    title: "Política de Privacidade",
    icon: ShieldCheck,
    tagline: "Como tratamos e protegemos os seus dados",
    updated: "Última atualização: 14 de agosto de 2026",
    intro:
      "A sua privacidade é prioridade na Prisma. Esta Política de Privacidade explica quais dados coletamos, como os utilizamos, protegemos e compartilhamos, sempre em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).",
    sections: [
      {
        heading: "1. Dados que coletamos",
        list: [
          "Dados de cadastro: nome, e-mail, foto de perfil e informações de conta fornecidas por você.",
          "Dados de uso: progresso em aulas, módulos concluídos, anotações, comentários, avaliações e preferências.",
          "Dados técnicos: endereço IP, tipo de navegador, dispositivo e páginas acessadas, utilizados para segurança e melhorias.",
          "Dados de pagamento: processados por provedores de pagamento certificados; a Prisma não armazena dados completos de cartão."
        ]
      },
      {
        heading: "2. Como utilizamos os seus dados",
        list: [
          "Fornecer, manter e melhorar os cursos, mentorias, certificados e a comunidade.",
          "Personalizar a sua experiência, recomendando conteúdos e trilhas de aprendizado.",
          "Processar pagamentos, emitir certificados e gerenciar a sua conta.",
          "Enviar comunicados relevantes sobre a plataforma, com opção de descadastro.",
          "Garantir segurança, prevenir fraudes e cumprir obrigações legais."
        ]
      },
      {
        heading: "3. Cookies e tecnologias",
        paragraphs: [
          "Utilizamos cookies e tecnologias similares para lembrar as suas preferências, autenticar sua sessão e analisar o desempenho da plataforma. Você pode gerenciar ou desativar cookies nas configurações do seu navegador, o que pode limitar algumas funcionalidades."
        ]
      },
      {
        heading: "4. Compartilhamento de dados",
        paragraphs: [
          "Não vendemos os seus dados pessoais. Podemos compartilhar dados estritamente necessários com provedores de infraestrutura, pagamento e análise, sempre sob obrigações contratuais de confidencialidade e segurança, e com autoridades competentes quando exigido por lei."
        ]
      },
      {
        heading: "5. Segurança da informação",
        paragraphs: [
          "Adotamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra acessos não autorizados, perda, alteração ou destruição, incluindo criptografia em trânsito, controles de acesso e monitoramento contínuo."
        ]
      },
      {
        heading: "6. Retenção dos dados",
        paragraphs: [
          "Mantemos os seus dados apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, respeitando prazos legais. Ao encerrar a sua conta, os dados pessoais são excluídos ou anonimizados, ressalvadas as hipóteses de obrigação legal de retenção."
        ]
      },
      {
        heading: "7. Seus direitos como titular",
        list: [
          "Confirmar a existência de tratamento e acessar os seus dados pessoais.",
          "Corrigir dados incompletos, inexatos ou desatualizados.",
          "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.",
          "Portabilidade dos dados, na forma e nos limites da legislação aplicável.",
          "Revogar consentimentos e solicitar a eliminação dos dados tratados com base no consentimento."
        ]
      },
      {
        heading: "8. Fale com o nosso Encarregado (DPO)",
        paragraphs: [
          "Para exercer seus direitos, esclarecer dúvidas ou registrar reclamações sobre o tratamento de dados, entre em contato com o nosso Encarregado de Proteção de Dados pelo e-mail privacidade@prisma.me. Responderemos em até 15 dias úteis."
        ]
      }
    ]
  }
};

export default function LegalPage({ type, onBack }: LegalPageProps) {
  const { title, icon: Icon, tagline, updated, intro, sections } = CONTENT[type];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#c4c9ae] bg-[#1a1c1c] border border-[#444934]/50 hover:border-[#c2f425] hover:text-[#c2f425] hover:scale-105 active:scale-95 transition-all duration-200 rounded-full py-2 px-4 mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Voltar
      </button>

      {/* Header hero card */}
      <div className="bg-[#1a1c1c] border-l-4 border-[#c2f425] border-y border-r border-[#444934]/30 rounded-2xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
        <span className="absolute -right-6 -top-10 select-none font-headline text-[120px] sm:text-[160px] font-extrabold leading-none text-[#c2f425]/5 pointer-events-none">
          {type === "termos" ? "01" : "02"}
        </span>

        <div className="relative flex items-center gap-4 mb-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#c2f425]/10 border border-[#c2f425]/30 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-[#c2f425]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-headline text-[22px] sm:text-[26px] font-bold text-white leading-tight">
              {title}
            </h1>
            <p className="text-[11px] sm:text-[12px] text-[#c4c9ae]/70 mt-1 font-sans">
              {tagline}
            </p>
          </div>
        </div>

        <div className="relative inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#c2f425] bg-[#c2f425]/5 border border-[#c2f425]/20 px-3 py-1.5 rounded-full mb-6">
          <CalendarClock className="w-3 h-3" /> {updated}
        </div>

        <div className="relative border-t border-[#444934]/30 pt-6">
          <p className="text-[13px] sm:text-[14px] text-[#c4c9ae] leading-relaxed">
            {intro}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 flex flex-col gap-5">
        {sections.map((section) => (
          <section
            key={section.heading}
            className="bg-[#1a1c1c] border border-[#444934]/30 rounded-xl p-5 sm:p-7 hover:border-[#c2f425]/40 transition-colors"
          >
            <h2 className="font-headline text-[15px] sm:text-[17px] font-bold text-[#c2f425] mb-3 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#c2f425]/50 font-extrabold">
                §
              </span>
              {section.heading}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[12.5px] sm:text-[13.5px] text-[#c4c9ae] leading-relaxed mb-3 last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="flex flex-col gap-2 mt-1">
                {section.list.map((item) => (
                  <li
                    key={item.slice(0, 24)}
                    className="flex items-start gap-2.5 text-[12.5px] sm:text-[13.5px] text-[#c4c9ae] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c2f425] shrink-0 mt-[7px]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center bg-[#1a1c1c]/60 border border-[#444934]/20 rounded-xl px-5 py-4">
        <p className="text-[11px] sm:text-[12px] text-[#c4c9ae]/70">
          Dúvidas sobre este documento? Fale com a nossa equipe em{" "}
          <span className="text-[#c2f425] font-bold font-mono">suporte@prisma.me</span>
        </p>
      </div>
    </div>
  );
}