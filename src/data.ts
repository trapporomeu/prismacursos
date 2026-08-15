import { Course, ActiveModule, HistoryItem, Certificate, Announcement, Topic } from "./types";

export const initialCourses: Course[] = [
  // Inglês para Iniciantes
  {
    title: "English Zero One",
    instructor: "Prof. Marcos",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGDT-IjkBKZudQZucpRtEqkGHDRHDzMhoX8-AmAac4XJLcEG3nsdyfEMUlT6BlFcD5oA5_AjpyOoALNF2CVTNJvHhOCQL3FOL7La2y4rtndq_FOnq2Cec6F87-DxmFAsZlk9RkJnIi36WsJbzEY89PtyXiF3-bNtDj5eS9o2clWBoNUPUkFvW4Kv5kPm3BUdZdOGFHmntWVx-7537PYL7rbjR00cMAW8dxzsjHAc2xK-IyBXN5gtfJbJP7VxdaWsSPkvQRsJegHYU",
    locked: false,
    progress: 45,
    category: "iniciantes"
  },
  {
    title: "Vocabulário de Sobrevivência",
    instructor: "Sarah J.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD87bE_Tx4pnj0bTV8GLaOiJjspqgNDwVj-cL9MH0nhRmkRgsAtiukgpU1ZOnRJO0RevnZQrC33_iBaOQsa5zpDG8MrB9XHvkSI5aK0YlEqH6rtPXsj3lWLblXPwYE7ADHKV1f2hbs5PsU0IaURLu3GsoPe2Elz_JaOH2M81gBk8zNADMDtaJuyGvShkD6eh0eAQGrhMZ8xUu_oRYrHIB1YhBEaROxR19MVxihcHbuLYbcUNjGb7cqdSeFLKtXbcTJdXmGzwDMYgYA",
    locked: true,
    category: "iniciantes"
  },
  {
    title: "Sons do Inglês (Fonética)",
    instructor: "Dr. Lilian",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJYsWT5Qr9Rzw59o0rewigVxDZ3c-ZJq2dl9tZ4AK37vtDGtkd5RZWqpGTyHKIlhcykZQxbo7_E2dPE5er-3Et9rvwXMADC4E8gmXgUf5RzABm_ePEjwT-DjmLR1e-IdtFOPS_lPZ6jV2kGk_bVxMFvLVMgzCPhI1awP3wAMw678Zfx17x197OBX1EeeXnYe9clOuXb5pO-8d4Hwm9w7W1jEGL3mNLJ6xROyGATdxDEGcw1YXeUQqRkddLPRTxE8CBf1nEGIzfZzI",
    locked: true,
    category: "iniciantes"
  },
  {
    title: "Gramática Visual 101",
    instructor: "Alex River",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdvz7Y-q3IxZFc1JzT9hyniDI--lmNdz3VMkjRKhiil3MkzNpWNCBxs_S9IqrR7kuqClvVDdUEXGKgZMJsvQCviTDXgQXj31UPtWOiOzsrlBh3U24cdZajhtrYCBr6RWjstzVJQg36dIbDL4FiAJVIwERVOJTyiYwH5GBPRMexuUGBLGGGYc_cbIKjx8ykY7vb-uhSrdZTFtMwNBAwx5UEd2wAoZZWa3HPXLkAqKSScfdj_fQdLFz7BxLKOudD4VGAAkgtJRtxh3U",
    locked: true,
    category: "iniciantes"
  },
  // Português Avançado
  {
    title: "Redação de Impacto",
    instructor: "Clarice L.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGTBvZj3PRIRsQW3Rafc9UvW1V8dvWyKx5r-btHYzmh3HedS4XD3eEvStnd14W9HvTDlJ-SrMxTZHz0QB1grewrgjgcXNxGK1NficXDwUIOjNjXaHki4LqG9qoe1pkv_bXYVO0Acyqox2sxjY4b1rqD4-EaPiCmevGTc_jHrlyH3TKbOgVy0ZqfYwmpi-R-XL1SctrMTQYpYOmZehPy0zLvyKcKfAI4yV5pwe_rn_HB4jZFrW51qAtQdObehLDML0ye9PSgF4p1tY",
    locked: true,
    category: "portugues"
  },
  {
    title: "Literatura Contemporânea",
    instructor: "Prof. Jorge",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYtRE-cXoM5gfcx8KQK_tsLngzLB2LG5MOauKOVwAkMWrUTJy-PJFHMQ_Bio1BbOVXYy3uDq29qf_2HWpbFDAid-LwP_QlWaR6k3rlEZqxjs3nKgTH2Rak4De_y0gg9hOl5ETj8r5ggMgl6qPEtdU238UQCCcAUu5db4nHdKMa0Ve3GQmi9bfHSdEwNaAE0tTBjoRgUt7HuT2uK0BJUoFzTHBbQ0w4BDi2oKDzAlMWWPUuE729YBGncx7niIqjRKBH-Jrl6-5Udk",
    locked: true,
    category: "portugues"
  },
  {
    title: "Oratória & Persuasão",
    instructor: "Erika Mendes",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzIG3EywALNyQjl0uYG6M9998lWTxe7ytxDVjzyi6tYmuW9oWNlVUbeqh-KdkB5rRYdRh2qRvDfmEo749Ppo3f5UusWD--dvey-chI9wuLyrlrEEkUsEfZWqLIFR3QIJ9ne6k8kmtsgbQWupcqJSvWt9qpptWcWIp9N6mnNZ3wnHrF9Gd6DDebuT3bblii79g5N_MKQ66KrWRMeJHJlcqgqD3YTJ0YdY_WhveP59iA_m9oxn1XuSisNT-esKFB3FHy0BObEelqldY",
    locked: true,
    category: "portugues"
  },
  // Gramática Prática
  {
    title: "Tempos Verbais Master",
    instructor: "Rodrigo F.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7xRUiCnEC4zX4YuFQOkm2ERL_8PkiQObhywDABUl9GOINm_VMzYRoBsYVFP6Jv5Q9m0a9Wts8avkxcJuLJvV7BkOd1cbnXYPBVHIpSSnFqyRTKv9RKSj4jLdKKx6aI9Sgwf23pJ2UBb7ZLUV3953yuxKAKjfrPH8PVPcFMcPxbMAKugL4MZc1q1TYOERGBdrX9xgC_St6QWTUzLtDd9t-jW0ahMeYvbi51U_TSdPsOXDBNOqTf2MlcAxisO-bii3B-X_eb3NRNXQ",
    locked: true,
    category: "gramatica"
  },
  {
    title: "Preposições Sem Segredo",
    instructor: "Julia K.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQfAV1KzI9D5ZiLadwbS9WtDVPsx7vEWWsRMmpdzmHn9Wp6dYGyv4DaAdarBUdgl-vwMEm7m4xMGAKwjZYdvhVfB1EjvgAflAssqMmM3ysoN-uePb1T22RK2FEly9OgwN7rfVnDZX9B0w1LldCLwjUT_fBbAnbrOB0sJ-WMYqO-l6Jkzd_6hVtus3UQEAvFhYkS1zeglJakjdUM1U3jcdVgdgjXFOVRpd_rh7kFjfI_fSa33AU9PP5fxWl0UxOsjAnf3mNT-VxwY",
    locked: true,
    category: "gramatica"
  },
  {
    title: "Crase na Prática",
    instructor: "Ana Lu",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnKHDXnAkmvhTzQi_k0cOWLCHhWpPQNlGukfsmet22lU1qXlA92KSMyPadkSFSUUmf3Fyo8oOzZuSbXl_LrObvVHNBaMBl-gdDGmicn-29-eyhw9oqAuKNBNE9QSEJSAhIltGLjajShOQVt7NqHWenNB50mwr_aeD-IMVtAUtC6aPHdfHG1yb06zfxX-eIb2uoefObaF83dJt5DaPQ4d2PmCpSB0re62xtvCfwfh4oFVI-_vldvt-3lFgZoyL4_YKrrJGOcg_UcqY",
    locked: true,
    category: "gramatica"
  },
  // Espanhol para Viagens
  {
    title: "Hola Mundo! Básico",
    instructor: "Elena S.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvN9pt_Q8BCGXj-Av6pTjT1qYeiA1IhsHV4rMvGFqBOVo9WeMidDduN8g2tUB8VduI5jxcUCEVItwdehsX9Yqg-H3ofkDZ1WIl7Ex_ubTkfXoZggEYvOqk63qt-v514a8LaRkbq8nlSlRAQKsW4nzW-oKnZUSMJCbAfhkDnC_I6IOvvk39xsChKDoAGajV9iKqa9MVed60281Ftt_oYiCaNQ4GJIa8eic7PsUywoLuPDWEqV6q2B-_Gfyt3TMlkUXLFoTRyQscDcg",
    locked: true,
    category: "espanhol"
  },
  {
    title: "Espanhol para Negócios",
    instructor: "Carlos R.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ25JwLCUiqC_P5viE_0Z3CfMn29Jj70ZGECik_LfmmTr62ja52aIktyMfj5aUMYNjTRyVHJZnxhmVAbkPjo_RxZk0OwF1qZhWqb8JR0FdEEKWtzfq8U8HP0T4vtnL8fkZhb-uQs2A_GNTJpQb_etruN-ffGVHPXH9GJ292TH6U5nGXyWb18a17Rc3r-s2eAof8LrvKt-m8KobIttH0NriE3J-AiBCpky_uncFXgagRNpvzaZee5ZK6otm7qaDfZppjVyYCtKGD7I",
    locked: true,
    category: "espanhol"
  },
  {
    title: "Guia de Viagem: Madrid",
    instructor: "Javier M.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9XgMPiaZDm4Y4Y5B1hx2pWs0YxFwe5aKl9AUWdCtwu1v4M1DUbZM9-hY4V_-hxT5IxlYLn320zDIMTGmDnPmSfdjCDd9Xa4RNRywWt-Z0Ndj97h__sYkQwYFCSwAnXwHkOyUn2_Q_mGeQVyfpG2XUKZbUj49B5pZ0E9JJYkyrO5Pej005jCl-uz6MmcAyW9Zs_f6kJIV_p1D_ee52nDTYdr1tzxOeM_n0fRmq76HCB4q_xh1AesS75skNz4TIQ047zI3SWK2JSf0",
    locked: true,
    category: "espanhol"
  }
];

export const initialActiveModules: ActiveModule[] = [
  {
    id: "mod-1",
    title: "Inglês para Viagens",
    moduleNum: "Módulo 04",
    progress: 75,
    description: "Aula 12: Check-in no Aeroporto e Situações de Imigração: Expressões essenciais para viagens internacionais.",
    timeLeft: "14 min restantes",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1wsO41X4YaILwAoQDniMx6cWTOsVH1FH4IGIt-i9fB2AK9_8TxEI7hFUEa6TkLcfxmYr67EmaU-6gzUbP4q9J5rUJmnI6IMVpj2Wvavsv220Jad4GZVQ04nGSeNm3y3RIW51Rg7bIibWSlH1d6rG9U-pyhxHxJg5UzVOi56d2o-VJ0pepe82Mz950x6WE6yfAdXF-twQs8RWu6Abll25TVLUsTfoXDihfdPqjFYMNWZMfwD3CSnkwQYznRbRfkA2uBoV9fvvxl7E"
  },
  {
    id: "mod-2",
    title: "Português para Concursos",
    moduleNum: "Módulo 02",
    progress: 42,
    description: "Sintaxe do Período Composto: Coordenação e subordinação focada em editais de alta complexidade.",
    timeLeft: "28 min restantes",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwsWCTmTeYrtHROHra6GBXsKcqFHMi48nVjdLKf2Vkri9UC4BRccARPl3FxOZkz2QtwKocYjHZJho-znN9l-i90bbxCIX66hnFZlcZOvveqtEyomzzDPOF406K9SRkA_Qs4e54Ly68FKwyJ_XWMlIH70XeY0GLtd7nazLZpso5noRZXi-4RXO_NUC4hHqXF5sBlSeeuohlmnYNR2zsJk-qcmELumSVQtRBptHI2qlYDoBodl5JJSmVPsA4wi72nUR_HFOkpQmD088"
  },
  {
    id: "mod-3",
    title: "Phrasal Verbs Essenciais",
    moduleNum: "Módulo 08",
    progress: 15,
    description: "Verbos de movimento e rotina: Como usar phrasal verbs de forma natural na conversação diária.",
    timeLeft: "52 min restantes",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3JK0xZM6P5p_34hCXTzd4fSaveC3U0e4JUQPTMcqt7GJnPgnc9Hrm_N6ZSWgSHUFugsVQWspOZ6ldd9b0WubFvL7RkpQO6ZKMTYR25tD19q_g5KVD7NEE7Vcbs6wP2wdvsYxJbKFM4WKssflPM1NmAQcx24-35QqiuamunmQp5lHZ7TSx_cvkbayWHuBz460R6x9Iesc4SSjHpc0Q71B5OUpyo4_Se03B8ExAK5cbmRN7Us67F-X5iKsS5m2yylUPaMbaKvlFEgk"
  }
];

export const initialHistoryItems: HistoryItem[] = [
  {
    id: "hist-1",
    title: "Acentuação Gráfica",
    timestamp: "Concluído há 2 horas",
    award: "Mastery Level 1",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqdjvc3jwaI9pIFTYYlnp7rcVsGlTKA1ZNZg6tsS0rhW-SypnhaDvL3K8rrdb5Zod0ghBR527a4rpXvxJ-3lh59ZwT8DPVFNRowzHWQm-MOQ_4owp84fmzTngH9B22nC89MThJ2Hyyv3PaLg-NPtO4FWMKM84Hu5B4V20n2QEpTuI3osPP82D4ciCBIMUqR5dWstCUO4r6_FeIyDVvPWlcbWUoSKBPguS90jjFIZ5VCsdCZokx_87Ks4jSZU0ngEId65AHl1tJD18"
  },
  {
    id: "hist-2",
    title: "Pronúncia Nativa",
    timestamp: "Concluído ontem",
    award: "Efficiency Badge",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsb6jgbxIhRywKHMZXemqg8GDZ6kcyet7SZVnXCAf3WApuWSPmuoy-BeBiaj-bJu2GdEnsxhOF5Q1o9GY2CJxmjILu4K7apoOFZWRuWZ0sQzMNqwKqCv0ZpBXA69vTXcR_GYzs34cfeQ3OHPlxaOt1j6fRVt6RnS-AuEnUuIbAe6sIa_GUdPdAUfwaTxOXrAGnbeV482qJEYJqAAiUVWt38BhVXewCRlD6Bm9QkKO3ZoHb03KshR6u_jivHbYKnpiD4C0URZ5zXqA"
  },
  {
    id: "hist-3",
    title: "Redação Corporativa",
    timestamp: "Concluído há 3 dias",
    award: "Pioneer Level 2",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkBHOGo7cUqQIHPDoQDcsASfe3FGUgHmlGvVJRHWCtncjh-G2kFYEq4jy9ASG4Be9LYHL4aHtFmQgJ0wca3dRdynw3cu_yPnWHvNbB_LoePDX0ZD40s40iOXwZV1cFPr9u6Io08PXAUtxOlUKE7n95JkpcOAfTiBHZH-CPi1CXTEWWPqZ0ueMZ8n8-16z74ovlzJTJLg9i83uWjnC0yasgL1ld8C6p-RdUmFU6o1r6SWA8Zd1qYcwU-qYju4Y8enwgBAnOHHN3Kfk"
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Inglês Avançado: Business",
    date: "Concluído em 12 de Out, 2023",
    verified: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4QoNe6gBzwFpZmuKYtixr05h1RBTq1NRWoxvkj0Qtkev9sQABsj_wNZl9NlCRjvLJkxgbbPgOFnEJy4vKCpXrEm1FqTNSzOF0b0kD5n5cV7J_oxyQj0uM0GbJy7pSk01eBa4qe4V0qyWsmjcsDJ1hp7GjCr5Kz3zaDA9IbbaH3OMsmvudF0XqWZICETUMlmxfxwjOY5m5joKfFb2qtYmKZj2c2ScExCNfkTcmqpiXXhzBhaO7C0I810mdnDk6cA5ias9uXfqp5ZQ"
  },
  {
    id: "cert-2",
    title: "Gramática Portuguesa Aplicada",
    date: "Concluído em 05 de Ago, 2023",
    verified: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgCEceY19cwlfZbkgpohmY5ykqfwVgbBv3TU9k_mgVJGhBXBWhhhHKERUdj4NX74xdpBe5BfyEYVRvGPdgzvDq-ltA4bAcPESfvnKNLG0ka_q_-zS5gPgU_XbckYWg2LCJ4l0Gn78y_6a27xqcQ6qjxqW7XX1uapIZfR3-KfGkxZmv_F0DOtxA_G4SBL_4_l92UHorOiATRFh4quA4jtrNBz3kERDZJdvBK1Burvcl6RYZFtq53xLoaZWtQ8oAEPXg8MAu_9osybY"
  },
  {
    id: "cert-3",
    title: "Interpretação de Textos",
    date: "Concluído em 15 de Jan, 2024",
    verified: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_USNypxcXRAjnJ97BxvE7ZHwxBRFyUVoSLS6YB_gT8sgI0gDfQMD_LWwVdbjiNOUkfIMEqei6Kxnv0BcCZIBHdZN_RXUu9eYdtG22JgzcikNQc84Euaig9-_c9I1aqmd5JHMjrQmgK0vAezr1npg4ArHRh_iykZzsZKXs-064Jn3TtFyx7gk10UcWhuO7v-w6Yzhc-Io8zv4xnq5Gklj6dpnES0eCpGhpS4rcMFJ0e4-z4IAshFRRH4eqlqt8aJHWaRUjYEew684"
  },
  {
    id: "cert-4",
    title: "Conversação em Inglês",
    date: "Concluído em 22 de Fev, 2024",
    verified: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL9HIhkk2E23Kj8CPiFQJiR9Q3obta_F7GK-DOjG97mS_tFEiPwGNxTefAv6fBiDMbDuOWV5JqU5ueZZ8-ic9YflGGxJ9hNng8dW2hghtEdYOcUUVXrhoZ6D-PfHyeSGFw9DT_NKm5Kq3GnMnevH9LbMrSIEagMO5gvZZ6DReqlIGYIJnzmchEGPG29dazgnXcBLWgloJYJ5SvhV3jum0A0AMrIa9pEfXVtvg1-mfHBs5mxzms3s06AoqeDuk3szUnn_bhYeU_8ZU"
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Live: Dicas de Pronúncia com Nativos",
    relativeTime: "Há 2 horas",
    isNew: true,
    text: "Junte-se aos nossos mentores estrangeiros para uma prática real de conversação hoje às 19h.",
    icon: "record_voice_over"
  },
  {
    id: "ann-2",
    title: "Novos Certificados Disponíveis",
    relativeTime: "Há 1 dia",
    isNew: false,
    text: "A seção de Certificados foi atualizada com novos selos de proficiência para o nível Intermediário B2.",
    icon: "military_tech"
  }
];

export const initialTopics: Topic[] = [
  { id: "top-1", tag: "#DicasDeGramatica", count: 42 },
  { id: "top-2", tag: "#BusinessEnglish", count: 18 },
  { id: "top-3", tag: "#RedacaoNota10", count: 28 },
  { id: "top-4", tag: "#SlangsAndIdioms", count: 55 }
];
