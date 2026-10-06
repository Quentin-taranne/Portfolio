import type { MinorProject, Project, T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

// Labels de champs réutilisés.
const CONTEXT = t("Cadre", "Context");
const ROLE = t("Rôle", "Role");
const STACK = t("Stack", "Stack");

export const projects: Project[] = [
  {
    slug: "piano-concerto-festival",
    featured: true,
    name: "Piano Concerto Festival",
    kind: t("Freelance", "Freelance"),
    line: t("Site d'un festival international de piano", "Website for an international piano festival"),
    summary: t(
      "Site d'un festival international de piano : programme, enseignants, candidatures, comptes participants.",
      "Website for an international piano festival: programme, faculty, applications, participant accounts.",
    ),
    stack: ["PHP"],
    result: t("En ligne", "Live"),
    fields: [
      { label: CONTEXT, value: t("Mission freelance · client : Congyu Wang", "Freelance · client: Congyu Wang") },
      { label: ROLE, value: t("Conception et développement complets", "Full design and development") },
      {
        label: t("Fonctions", "Features"),
        value: t(
          "Pré-inscription payante · comptes participants · filtres par discipline · événements · archives des éditions",
          "Paid pre-registration · participant accounts · discipline filters · events · past editions",
        ),
      },
    ],
    links: [{ href: "https://pianoconcertofestival.com", label: t("pianoconcertofestival.com", "pianoconcertofestival.com") }],
    media: [
      { kind: "image", src: "/media/pcf-home.jpg", width: 1440, height: 900, alt: t("Page d'accueil du festival", "Festival homepage") },
      { kind: "image", src: "/media/pcf-preinscription.jpg", width: 1440, height: 900, alt: t("Formulaire de pré-inscription", "Pre-registration form") },
      { kind: "image", src: "/media/pcf-faculty.jpg", width: 1440, height: 900, alt: t("Enseignants filtrables par discipline", "Faculty filtered by discipline") },
      { kind: "image", src: "/media/pcf-mobile.jpg", width: 600, height: 1298, alt: t("Accueil sur mobile", "Homepage on mobile") },
    ],
  },
  {
    slug: "cyclone",
    featured: true,
    name: "Cyclone · EDF",
    kind: t("EDF", "EDF"),
    line: t("Affectation des équipes après un cyclone", "Repair-crew dispatch after a cyclone"),
    summary: t(
      "Affectation des équipes de dépannage après un cyclone. Version hors-ligne pour les agences isolées.",
      "Dispatching repair crews after a cyclone. Offline version for isolated agencies.",
    ),
    stack: ["Svelte", "Supabase", "SQLite"],
    result: t("Testée en exercice de crise", "Tested in crisis drills"),
    fields: [
      {
        label: CONTEXT,
        value: t(
          "EDF SEI Réunion · stage · juillet–décembre 2025 · binôme",
          "EDF SEI Réunion · internship · July–December 2025 · pair",
        ),
      },
      {
        label: ROLE,
        value: t("Back-end, import / export des données", "Back end, data import / export"),
      },
      {
        label: t("Usage", "Usage"),
        value: t(
          "Utilisée par l'agence APERF de Saint-Leu · testée en exercice de crise",
          "Used by the APERF agency in Saint-Leu · tested in crisis drills",
        ),
      },
      {
        label: t("Fonctions", "Features"),
        value: t(
          "Vue partagée poste de commande ↔ agences · affectation automatique selon le type d'équipe et les préférences · import/export Excel",
          "Shared view between command centre and agencies · automatic matching by crew type and preferences · Excel import/export",
        ),
      },
      {
        label: STACK,
        value: t(
          "En ligne : Svelte, Supabase · Hors-ligne : SvelteKit, SQLite",
          "Online: Svelte, Supabase · Offline: SvelteKit, SQLite",
        ),
      },
    ],
    media: [
      { kind: "image", src: "/media/cyclone-before.jpg", width: 1600, height: 913, alt: t("Demandes des agences et équipes prestataires", "Agency requests and contractor crews") },
      { kind: "image", src: "/media/cyclone-after.jpg", width: 1400, height: 966, alt: t("Affectations produites par l'Auto Match", "Assignments produced by Auto Match") },
      { kind: "image", src: "/media/cyclone-dashboard.jpg", width: 1440, height: 1100, alt: t("Tableau de bord", "Dashboard") },
    ],
  },
  {
    slug: "edf-automation",
    name: "Automatisation · EDF",
    kind: t("EDF", "EDF"),
    line: t("Macros et tableaux de bord", "Macros and dashboards"),
    summary: t("Macros de traitement de données et tableaux de bord.", "Data-processing macros and dashboards."),
    stack: ["VBA", "Excel", "Power BI", "Python"],
    result: t("2 h → 3 min", "2 h → 3 min"),
    fields: [
      { label: CONTEXT, value: t("EDF SEI Réunion · stage · 2025", "EDF SEI Réunion · internship · 2025") },
      {
        label: t("Détail", "Details"),
        value: t(
          "Traitement manuel réduit de 2 h à 3 min · fiabilisation des saisies · tableau de bord Power BI des campagnes d'élagage · analyse des défaillances réseau (pandas, scikit-learn)",
          "Manual processing cut from 2 h to 3 min · fewer input errors · Power BI dashboard for vegetation-management campaigns · grid failure analysis (pandas, scikit-learn)",
        ),
      },
    ],
  },
  {
    slug: "zappy",
    featured: true,
    name: "Zappy",
    kind: t("Compétition", "Competition"),
    line: t("IA de joueurs pour un jeu réseau", "Player AI for a network game"),
    rank: 1,
    summary: t(
      "IA de joueurs pour un jeu réseau multi-clients, et serveur de test local.",
      "Player AI for a multi-client network game, plus a local test server.",
    ),
    stack: ["Python"],
    result: t("1er régional", "1st regional"),
    fields: [
      { label: CONTEXT, value: t("Epitech · équipe de 6 · 2026", "Epitech · team of 6 · 2026") },
      { label: ROLE, value: t("IA, outillage de test", "AI, test tooling") },
      {
        label: t("IA", "AI"),
        value: t(
          "Machine à 6 états · priorités : survie > ralliement > incantation > collecte · coordination par broadcast · niveau 8 atteint (max)",
          "6-state machine · priorities: survival > rally > incantation > gathering · broadcast coordination · reaches level 8 (max)",
        ),
      },
      {
        label: t("Outil", "Tool"),
        value: t(
          "ai_lab : serveur local reproductible pour tester l'IA sans le serveur officiel",
          "ai_lab: reproducible local server to test the AI without the official server",
        ),
      },
      {
        label: t("Projet", "Project"),
        value: t("Serveur C++ · interface 3D OpenGL · clients IA · protocole commun", "C++ server · OpenGL 3D client · AI clients · shared protocol"),
      },
    ],
    media: [
      { kind: "video", src: "/media/zappy-3d.mp4", poster: "/media/zappy-3d-poster.jpg", width: 1280, height: 720, alt: t("Partie en cours, vue 3D", "Game in progress, 3D view") },
      { kind: "image", src: "/media/zappy-torus.jpg", width: 1280, height: 720, alt: t("Le monde affiché en tore", "The world rendered as a torus") },
    ],
  },
  {
    slug: "robocar",
    featured: true,
    name: "Robocar",
    kind: t("Compétition", "Competition"),
    line: t("IA de conduite d'une voiture autonome", "Driving AI for an autonomous car"),
    rank: 3,
    summary: t("IA de conduite d'une voiture autonome.", "Driving AI for an autonomous car."),
    stack: ["Python", "C"],
    result: t("3e place", "3rd place"),
    fields: [
      { label: CONTEXT, value: t("Compétition RoboCar, Epitech Paris · équipe de 6", "RoboCar competition, Epitech Paris · team of 6") },
      { label: ROLE, value: t("IA de conduite", "Driving AI") },
      {
        label: t("Principe", "Approach"),
        value: t(
          "Flux caméra → détection des lignes blanches par raycasting → direction et vitesse",
          "Camera feed → white-line detection by raycasting → steering and speed",
        ),
      },
      { label: t("Matériel", "Hardware"), value: t("Jetson Nano, VESC", "Jetson Nano, VESC") },
    ],
    links: [
      {
        href: "https://www.linkedin.com/posts/theo-futol_robocar-epitech-robotique-activity-7479738511403765760-HzxH",
        label: t("Vidéo : Théo Futol", "Video: Théo Futol"),
      },
    ],
    media: [
      { kind: "video", src: "/media/robocar.mp4", poster: "/media/robocar-poster.jpg", width: 720, height: 1280, alt: t("La voiture sur la piste", "The car on the track") },
    ],
  },
  {
    slug: "cartepro",
    featured: true,
    name: "CartePro",
    kind: t("Epitech", "Epitech"),
    line: t("MVP de paiement par QR code", "QR-payment benefits MVP"),
    summary: t(
      "MVP d'avantages salariés : catalogue partenaires, paiement par QR code, back-office.",
      "Employee-benefits MVP: partner catalogue, QR-code payment, back office.",
    ),
    stack: ["PostgreSQL", "NestJS", "React"],
    result: t("Livré en 2 semaines", "Shipped in 2 weeks"),
    fields: [
      {
        label: CONTEXT,
        value: t(
          "Survivor Seminar Epitech · équipe de 4 · septembre 2026 · cahier des charges d'un client fictif volontairement contradictoire",
          "Epitech Survivor Seminar · team of 4 · September 2026 · brief from a deliberately contradictory mock client",
        ),
      },
      { label: ROLE, value: t("Base de données (migrations), API, espaces admin et salarié", "Database (migrations), API, admin and employee spaces") },
      { label: STACK, value: t("PostgreSQL/PostGIS, NestJS, React, Docker, GitHub Actions", "PostgreSQL/PostGIS, NestJS, React, Docker, GitHub Actions") },
      {
        label: t("Sécurité", "Security"),
        value: t(
          "QR signés, valables 5 min · paiements idempotents (pas de double débit) · rôle applicatif sans droit de modification du grand livre",
          "Signed QR codes, valid 5 min · idempotent payments (no double charge) · app role cannot modify the ledger",
        ),
      },
    ],
    media: [
      { kind: "image", src: "/media/tt-mobile-qr.jpg", width: 600, height: 1298, alt: t("Paiement par QR code, espace salarié", "QR payment, employee space") },
      { kind: "image", src: "/media/tt-admin.jpg", width: 1440, height: 900, alt: t("Tableau de bord national, espace admin", "National dashboard, admin space") },
      { kind: "image", src: "/media/tt-partner.jpg", width: 1440, height: 900, alt: t("Encaissement, espace partenaire", "Checkout, partner space") },
      { kind: "image", src: "/media/tt-mobile-home.jpg", width: 600, height: 1298, alt: t("Solde et carte, espace salarié", "Balance and card, employee space") },
    ],
  },
  {
    slug: "antennes",
    name: "Hackathon Epitech × Free",
    kind: t("Hackathon", "Hackathon"),
    line: t("Répartition de la couverture réseau", "Network-coverage balancing"),
    rank: 2,
    summary: t("Localisation d'antennes et répartition de la couverture réseau.", "Antenna mapping and network-coverage balancing."),
    stack: ["Web"],
    result: t("2e place", "2nd place"),
    fields: [{ label: CONTEXT, value: t("Hackathon Epitech × Free", "Epitech × Free hackathon") }],
  },
  {
    slug: "dqn",
    name: "Lunar Lander · DQN",
    kind: t("IA", "AI"),
    line: t("Un agent qui apprend à atterrir", "An agent that learns to land"),
    summary: t(
      "Agent d'apprentissage par renforcement qui apprend à poser un atterrisseur.",
      "Reinforcement-learning agent that learns to land a lander.",
    ),
    stack: ["Python", "PyTorch"],
    fields: [
      { label: CONTEXT, value: t("Epitech · 2026", "Epitech · 2026") },
      { label: ROLE, value: t("Implémentation, entraînement, évaluation, documentation", "Implementation, training, evaluation, documentation") },
      {
        label: t("Méthode", "Method"),
        value: t(
          "DQN discret (PyTorch, Gymnasium) · comparé à un agent aléatoire et à une heuristique · ablation du replay buffer · variante avec vent",
          "Discrete DQN (PyTorch, Gymnasium) · compared with random and heuristic agents · replay-buffer ablation · wind variant",
        ),
      },
    ],
    media: [
      { kind: "video", src: "/media/dqn-before.mp4", poster: "/media/dqn-before-poster.jpg", width: 600, height: 400, alt: t("Agent aléatoire", "Random agent") },
      { kind: "video", src: "/media/dqn-after.mp4", poster: "/media/dqn-after-poster.jpg", width: 600, height: 400, alt: t("Agent DQN entraîné", "Trained DQN agent") },
      { kind: "image", src: "/media/dqn-metrics.jpg", width: 1400, height: 1018, alt: t("Récompense par épisode pendant l'entraînement", "Reward per episode during training") },
    ],
  },
  {
    slug: "raytracer",
    name: "Raytracer",
    kind: t("Epitech", "Epitech"),
    line: t("Moteur de rendu par lancer de rayons", "Ray-tracing renderer"),
    summary: t("Moteur de rendu par lancer de rayons.", "Ray-tracing renderer."),
    stack: ["C++"],
    fields: [
      { label: CONTEXT, value: t("Epitech · projet d'équipe · 2026", "Epitech · team project · 2026") },
      {
        label: ROLE,
        value: t(
          "Cœur du moteur · primitive cône limité · réflexions · texture damier · scènes",
          "Engine core · limited-cone primitive · reflections · checkerboard texture · scenes",
        ),
      },
    ],
    media: [
      { kind: "image", src: "/media/rt-refraction.jpg", width: 1280, height: 720, alt: t("Réfraction sur damier", "Refraction over a checkerboard") },
      { kind: "image", src: "/media/rt-donut-land.jpg", width: 1280, height: 720, alt: t("Tores, cylindres et lumières colorées", "Tori, cylinders and coloured lights") },
      { kind: "image", src: "/media/rt-secte.jpg", width: 1280, height: 720, alt: t("Cylindres et tore", "Cylinders and torus") },
      { kind: "image", src: "/media/rt-lights.jpg", width: 1280, height: 720, alt: t("Sphères sous plusieurs lumières", "Spheres under several lights") },
    ],
  },
  {
    slug: "42sh",
    name: "42sh",
    kind: t("Epitech", "Epitech"),
    line: t("Shell Unix en C", "Unix shell in C"),
    summary: t("Shell Unix en C.", "Unix shell in C."),
    stack: ["C"],
    fields: [
      { label: CONTEXT, value: t("Epitech · projet d'équipe · 2025", "Epitech · team project · 2025") },
      {
        label: ROLE,
        value: t(
          "Alias et fichier .myrc · builtin where · exécution · script de tests",
          "Aliases and .myrc file · where builtin · execution · test script",
        ),
      },
      {
        label: t("Shell", "Shell"),
        value: t(
          "Pipes, redirections, variables d'environnement, builtins (cd, setenv, alias, where, which, repeat…)",
          "Pipes, redirections, environment variables, builtins (cd, setenv, alias, where, which, repeat…)",
        ),
      },
    ],
    media: [
      { kind: "image", src: "/media/42sh-session.jpg", width: 936, height: 1264, alt: t("Session dans 42sh", "A 42sh session") },
    ],
  },
  {
    slug: "lego-gemini",
    name: "Lego × Gemini",
    kind: t("Hors cursus", "Side project"),
    line: t("Concours Lego jugé par Gemini", "Lego contest judged by Gemini"),
    summary: t(
      "Concours Lego jugé par Gemini, recréé à partir d'une démo du Google Cloud Summit Paris 2025.",
      "Lego contest judged by Gemini, rebuilt from a Google Cloud Summit Paris 2025 demo.",
    ),
    stack: ["JavaScript", "Supabase", "Vertex AI"],
    result: t("3 jours", "3 days"),
    fields: [
      { label: CONTEXT, value: t("Hors cursus · avec Manny Bray Mahinc · 2025", "Side project · with Manny Bray Mahinc · 2025") },
      {
        label: t("Contrainte", "Constraint"),
        value: t(
          "API Gemini et une partie de Firebase indisponibles depuis La Réunion → Supabase et Vertex AI",
          "Gemini API and parts of Firebase unavailable from Réunion → Supabase and Vertex AI",
        ),
      },
    ],
    links: [
      {
        href: "https://www.epitech.eu/2025/10/10/defi-intelligence-artificielle-formation-epitech/",
        label: t("Article Epitech", "Epitech article (French)"),
      },
    ],
  },
];

export const minorProjects: MinorProject[] = [
  {
    name: "Hack&Juice",
    summary: t("15 failles exploitées sur OWASP Juice Shop, avec rapports", "15 vulnerabilities exploited on OWASP Juice Shop, with write-ups"),
    stack: "Pentest",
  },
  { name: "Octopus", summary: t("Déploiement d'une application multi-services", "Multi-service app deployment"), stack: "Ansible" },
  { name: "MyTeams", summary: t("Messagerie collaborative client/serveur", "Client/server team messaging"), stack: "Rust" },
  { name: "myftp", summary: t("Serveur FTP", "FTP server"), stack: "C" },
  { name: "Arcade", summary: t("Jeux et bibliothèques graphiques chargés dynamiquement", "Games and graphics libraries loaded at runtime"), stack: "C++" },
  { name: "NanoTekSpice", summary: t("Simulateur de circuits logiques", "Logic circuit simulator"), stack: "C++" },
];
