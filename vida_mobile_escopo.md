# VIDA Mobile — Documento de Escopo Completo (Versão 1)

## 1. Visão Geral

VIDA Mobile é um aplicativo multiplataforma (iOS e Android) focado em organização cotidiana, produtividade assistida por IA e relações sociais saudáveis. Construído com React Native e integrado à API do Google Gemini, o app busca aumentar o bem-estar dos usuários por meio de rotinas inteligentes, tarefas otimizadas, insights personalizados e uma camada social minimalista que fomenta vínculos reais, não dopamina barata.

A estética segue princípios minimalistas inspirados no Duolingo, porém com identidade visual própria, baseada em tons de azul claro — principalmente **#0052e2**.

---

## 2. Objetivo Principal

Criar um ambiente digital que ajude o usuário a viver uma vida mais equilibrada, produtiva e organizada, com o mínimo de ruído e o máximo de clareza, oferecendo IA como suporte invisível e gamificação que estimula consistência sem vício.

---

## 3. Pilares do Produto

### 3.1 Organização e Produtividade
- Rotina diária estruturada
- Tasks inteligentes com priorização via IA
- Lembretes

### 3.2 Inteligência Artificial (Gemini API)
- Sugestões de rotina personalizadas
- Planejamento diário inteligente
- Reescrita e otimização de tarefas
- Insights sobre desempenho e hábitos

### 3.3 Social Saudável
- "Momento do Dia" (1 por usuário)
- Reações simples (emojis)
- Conexão via NFC ou QR Code
- Sem feed infinito ou métricas de vaidade

### 3.4 Gamificação
- Sistema de XP diário
- Selos semanais
- Streak saudável
- Desafios entre amigos

---

## 4. Funcionalidades (Detalhamento Completo)

### 4.1 Onboarding
- O usuário cria conta ou faz login.
- Wizard de 3 etapas coleta preferências:
  - Boas-vindas: Apresentação do app e funcionalidades principais
  - Tarefas Diárias: Seleção de atividades com período do dia (Manhã/Tarde/Noite)
  - Tema: Escolha entre modo Claro ou Escuro
- Simulação de geração de rotina com IA (loading animado com 3 mensagens)
- Navegação automática para o Dashboard após conclusão

### 4.2 Home (Dashboard)
Exibe:
- Header com mensagem de boas vindas, botão de notificações e avatar do usuário com sua streak
- Cards com insigths
- Rotina diária

### 4.3 Rotina
- Filtros por período do dia (Manhã, Tarde e Noite)
- Rotina diária (Mesma da home)
- Edição e Exclusão de tarefas onPress
- Adição de tarefas usando botão
- O usuário pode pedir à IA para:
  - Priorizar
  - Simplificar
  - Dividir tarefas grandes
- Sistema de lembretes com push notifications.

### 4.4 Social
- O usuário pode postar apenas 1 momento por dia.
- Interface de "cards" horizontais, sem scroll infinito.
- Cada momento pode receber reações por emojis.
- O usuário conecta amigos via NFC ou QR Code.
- Não existem seguidores, somente "conexões".

### 4.5 Perfil
- Dados do usuário
- Estatísticas privadas
- Conquistas desbloqueadas
- Histórico de progresso

---

## 5. Arquitetura do App

### 5.1 Frontend
- React Native
- TypeScript
- Expo
- React Navigation
- Zustand ou Context API
- Tailwind RN
- Reanimated + Moti

### 5.2 Backend
- Node.js + Express
- PostgreSQL (Supabase)
- Prisma ORM
- JWT + Refresh Token
- Integração com Google Gemini
- Storage para imagens

### 5.3 Integração com IA
Endpoints internos:
- `/ai/generate-routine`
- `/ai/daily-insight`
- `/ai/analyze-journal`
- `/ai/prioritize-task`

Fluxos principais:
- Onboarding IA
- Sugestões diárias
- Planejamento semanal
- Assistente contextual

---

## 6. UI/UX — Diretrizes Visuais

### Inspiração:
Interfaces semelhantes ao Duolingo:
- Cards amigáveis
- Animações suaves
- Feedback tátil
- Ícones grandes e coloridos

### Estilo VIDA:
- Cores baseadas em azul claro, foco no tom **#0052e2**
- Espaçamento generoso
- Tipografia limpa
- Sombras suaves
- Feedback visual imediato

### Componentes principais:
- Botões arredondados
- Cards interativos
- Barra inferior simples
- Layout dividido em seções claras

---

## 7. Planejamento de Execução (Roadmap Completo)

### **Fase 1 — Fundação**
- Criar estrutura React Native
- Arquitetura de rotas
- Autenticação
- Integração inicial com backend
- Onboarding básico
- UI preliminar

### **Fase 2 — Produtividade**
- Desenvolvimento de rotina + tarefas
- Sistema de lembretes
- Dashboard diário
- Primeira versão da IA

### **Fase 3 — Social**
- Perfis
- Momento do Dia
- Reações por emoji
- Conexão NFC/QR
- Notificações sociais

### **Fase 4 — Gamificação**
- XP diário
- Selos
- Streak saudável
- Desafios entre amigos

### **Fase 5 — Polimento**
- Dark mode
- Performance
- Acessibilidade

---

## 8. Estágio de Desenvolvimento Atual

### O que foi desenvolvido:

🎯 **Projeto Inicial**
- Criado projeto Expo com React Native + TypeScript
- Configurado estrutura de pastas completa (src/, components/, screens/, etc)
- Instalado dependências: React Navigation, Ionicons, Nunito fonts

🎨 **Design System**
- Sistema de temas (Light/Dark mode)
- Paleta de cores (primary, success, warning, error)
- Hook useTheme() para acesso global
- Fontes Nunito (400, 500, 600, 700, 800)

🧩 **Componentes UI Base**
- Button (variants: primary, secondary, outline)
- Input (com ícones, password toggle, focus correto)
- Select (dropdown modal funcional com ícones coloridos)
- Card, Badge, Avatar
- TaskCircleIcon (4 estados: locked, available, in-progress, completed)

🚀 **Onboarding (Wizard Completo - 3 Etapas)**

**Fluxo:**
1. **Boas-vindas**: Apresentação com ícone animado e 3 cards de funcionalidades (Rotina Personalizada, Assistente IA, Gamificação)
2. **Tarefas Diárias**: Seleção de 8 atividades práticas com escolha de período:
   - Praticar Exercícios, Estudar, Meditar, Ler, Trabalhar em Projetos, Organizar Ambiente, Cozinhar, Conversar com Amigos
   - Cada tarefa permite selecionar: Manhã, Tarde ou Noite
   - Expansão/colapso animado do seletor de períodos
3. **Tema**: Preview visual (Claro/Escuro) com seleção interativa

**Funcionalidades:**
- Barra de progresso visual (1 de 3, 2 de 3, 3 de 3)
- Navegação fluida com animações (Voltar/Continuar/Finalizar)
- Fade in/out suaves entre etapas (sem flash inicial)
- Transições com fade + slide (200ms saída + 400ms entrada)
- Validação: mínimo 1 tarefa selecionada
- **Loading de geração de rotina:**
  - "Analisando seus objetivos..." (1.5s)
  - "Gerando rotina ideal..." (2s)
  - "Rotina criada com sucesso!" (3s)
  - Ícone de sucesso com animação bounce + spring
  - Card informativo com fade + slide up (delay 300ms)
- Integração com authStore.completeOnboarding()
- Coleta de dados: tarefas selecionadas, períodos e tema

📱 **Navegação**
- Tab Navigator (Home, Rotina, Social, Perfil)
- Stack Navigator para autenticação (Welcome, Login, Register)
- Stack Navigator para Onboarding
- Estrutura: MainNavigator + AuthNavigator + AppNavigator
- Fluxo: Auth → Onboarding (se não completado) → Main

🏠 **DashboardScreen (Home)**
- Header fixo com avatar, streak e notificações
- XP Bar animada com nível e progresso
- 2 Stats Cards (Tarefas Concluídas, Tempo Focado)
- Título "Sua Rotina" com botão de informação
- Exibição de tarefas por período (Manhã/Tarde/Noite)
- PeriodHub com progresso circular por período
- MindFlowNodes clicáveis para toggle de status
- Sistema de bloqueio por período (futuro = locked)
- Alertas: período bloqueado, múltiplas tarefas em progresso
- Animações sequenciais de entrada (header → cards → períodos)

📅 **RoutineScreen (Rotinas)**
- **CRUD Completo de Tarefas:**
  - Criar tarefa (modal com formulário: título, período, prioridade)
  - Editar tarefa (long press 500ms → menu de ações)
  - Excluir tarefa (confirmação + animação de bolha estourando)
  - Toggle de status (pendente → em progresso → concluída)
- **Sistema de Bloqueio:**
  - Tarefas de períodos futuros aparecem locked/cinzas
  - Apenas 1 tarefa em progresso por vez
  - Validação de horário por período
- **Filtros:** Tudo, Manhã, Tarde, Noite
- PeriodHub com progresso por período
- Contador de tarefas concluídas no header
- FAB (Floating Action Button) para adicionar tarefas
- Animação de bolha ao deletar (scale 1.5 + fade out)

🎭 **Modais**
- TaskFormModal (criar/editar com validação)
- TaskActionsModal (menu: editar/deletar)
- ConfirmDeleteModal (confirmação de exclusão)
- AlertModal (período bloqueado, múltiplas tarefas)
- RoutineInfoModal (como usar a rotina)
- NotificationsModal (lista de insights/notificações)
- StreakInfoModal (informações sobre sequência de dias)

🛠️ **Utilitários**
- isPeriodAvailable() - verifica se período está disponível
- getCurrentPeriod() - retorna período atual do dia
- Validações de formulário (título, email, senha)
- Mock data (12 tarefas distribuídas por período)

🎬 **Animações**
- Entrada sequencial de componentes (fade + slide)
- Transições suaves entre telas (200ms + 400ms)
- Expansão/colapso de seletores (spring + timing)
- Animação de bolha ao deletar tarefas
- Feedback visual em todas as interações
- Loading animado com mensagens sequenciais
- Sucesso com bounce + spring (ícone) + fade up (card)

📦 **Build**
- EAS Build configurado
- Conta Expo criada (@vidamobile)
- Application ID: com.vidamobile.vida
- Keystore Android gerada
- Build APK configurada (preview profile)

🔐 **Autenticação Completa**
- WelcomeScreen com animações
- LoginScreen funcional com validação de formulário
- RegisterScreen funcional com validação completa
- Integração com authStore e userStore
- Mock de API com delay realista (1.5s)
- Navegação automática após login/registro
- Animações suaves em todas as telas
- KeyboardAvoidingView para melhor UX mobile
- Validações em tempo real (email, senha, confirmação)

### O que ainda não foi desenvolvido:

- Tela Social (Feed de momento único, Conexões via NFC/QR)
- Tela Perfil (Estatísticas detalhadas, Histórico, Conquistas)
- Integração real com IA Gemini (geração de rotina baseada nos dados)
- Persistência de dados (Backend com Supabase)
- Sistema de gamificação completo (XP real, níveis, conquistas desbloqueáveis)
- Sistema de lembretes com push notifications
- Backend/API (Node.js + Express + PostgreSQL)
- Sincronização entre dispositivos

---

## 9. Estrutura de pastas e arquivos:

vida-mobile/
├── .env.example
├── .gitignore
├── .prettierrc
├── app.json
├── babel.config.js
├── eas.json
├── eslint.config.mjs
├── index.ts
├── metro.config.js
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
└── src/
    ├── .env
    ├── App.tsx
    ├── @types/
    ├── assets/
    ├── components/
    │   ├── features/
    │   │   ├── index.ts
    │   │   ├── dashboard/
    │   │   │   ├── AvatarWithStreak.tsx
    │   │   │   ├── index.ts
    │   │   │   ├── MindFlowNode.tsx
    │   │   │   ├── PeriodHub.tsx
    │   │   │   └── XPBar.tsx
    │   │   ├── modals/
    │   │   │   ├── AlertModal.tsx
    │   │   │   ├── ConfirmDeleteModal.tsx
    │   │   │   ├── FluxoInfoModal.tsx
    │   │   │   ├── index.ts
    │   │   │   ├── NotificationsModal.tsx
    │   │   │   ├── RoutineInfoModal.tsx
    │   │   │   ├── StreakInfoModal.tsx
    │   │   │   ├── TaskActionsModal.tsx
    │   │   │   └── TaskFormModal.tsx
    │   │   └── onboarding/
    │           ├── OnboardingWizard.tsx
    │           └── index.ts
    │   │   ├── routine/
    │   │   │   ├── index.ts
    │   │   │   └── PeriodFilter.tsx
    │   │   ├── shared/
    │   │   │   ├── ConnectionLine.tsx
    │   │   │   └── index.ts
    │   │   └── tasks/
    │   │       ├── EmptyState.tsx
    │   │       ├── index.ts
    │   │       ├── TaskItem.tsx
    │   │       └── TaskNode.tsx
    |   |   └── welcome/
    │   │       ├── WelcomeIllustration.tsx
    │   │       └── index.ts
    │   ├── icons/
    │   │   ├── index.ts
    │   │   ├── NotificationIcon.tsx
    │   │   ├── StreakIcon.tsx
    │   │   └── TaskCircleIcon.tsx
    │   └── ui/
    │       ├── Avatar.tsx
    │       ├── Badge.tsx
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── index.ts
    │       ├── Input.tsx
    │       └── Select.tsx
    ├── hooks/
    │   ├── index.ts
    │   ├── useAI.ts
    │   ├── useAuth.ts
    │   ├── useFonts.ts
    │   ├── useTheme.ts
    │   └── useUser.ts
    ├── navigation/
    │   ├── AppNavigator.tsx
    │   ├── AuthNavigator.tsx
    │   ├── MainNavigator.tsx
    │   └── types.ts
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.tsx
    │   │   └── RegisterScreen.tsx
    │   ├── home/
    │   │   └── DashboardScreen.tsx
    │   ├── onboarding/
    │   │   └── OnboardingScreen.tsx
    │   ├── profile/
    │   │   └── ProfileScreen.tsx
    │   └── routine/
    │       └── RoutineScreen.tsx
    |   └── welcome/
    │       └── WelcomeScreen.tsx
    │
    ├── services/
    │   ├── api/
    │   │   ├── aiApi.ts
    │   │   ├── authApi.ts
    │   │   ├── client.ts
    │   │   ├── index.ts
    │   │   └── userApi.ts
    │   └── mock/
    │       ├── dashboardData.ts
    │       └── routineData.ts
    ├── store/
    │   ├── authStore.ts
    │   ├── index.ts
    │   ├── themeStore.ts
    │   └── userStore.ts
    ├── styles/
    │   ├── colors.ts
    │   ├── theme.ts
    │   └── typography.ts
    └── utils/
        ├── constants.ts
        ├── index.ts
        └── timeUtils.ts

---

## 9. Conclusão
VIDA Mobile é um app completo e moderno, que foca em produtividade, bem-estar e conexões humanas reais. A interface inspirada no Duolingo e a paleta azul #0052e2 garantem uma experiência visual agradável, enquanto a IA Gemini potencializa a organização do usuário de forma personalizada.

Este documento funciona como base inicial para desenvolvimento, design, tecnologia e validação do produto.