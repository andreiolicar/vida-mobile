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
- Preferências iniciais são definidas.
- O app coleta informações sobre rotina, horários, metas e desafios.
- A IA gera uma primeira versão da rotina sugerida.
- O usuário escolhe tema (light/dark).

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

🎯 Projeto Inicial
- Criado projeto Expo com React Native + TypeScript
- Configurado estrutura de pastas completa (src/, components/, screens/, etc)
- Instalado dependências: React Navigation, Ionicons, Nunito fonts

🎨 Design System
- Sistema de temas (Light/Dark mode)
- Paleta de cores (primary, success, warning, error)
- Hook useTheme() para acesso global
- Fontes Nunito (400, 500, 600, 700, 800)

🧩 Componentes UI Base
- Button (variants: primary, secondary, outline)
- Input (com ícones, password toggle, focus correto, sem outline preto)
- Select (dropdown modal funcional com ícones coloridos)
- Card, Badge, Avatar
- TaskCircleIcon (4 estados: locked, available, in-progress, completed)

📱 Navegação
- Tab Navigator (Home, Rotina, Social, Perfil)
- Stack Navigator para autenticação
- Estrutura MainNavigator + AuthNavigator + AppNavigator

🏠 DashboardScreen (Home)
- Header com avatar, streak e notificações
- XP Bar animada com nível e progresso
- 3 Stats Cards (Dias, Conquistas, Tarefas)
- Título "Sua Rotina" com animação (slide + fade)
- Botão info animado (scale + fade)
- Exibição de tarefas por período (Manhã/Tarde/Noite)
- PeriodHub com progresso circular
- MindFlowNodes clicáveis
- Toggle de status de tarefas
- Sistema de bloqueio por horário
- Alertas (locked-period, multiple-tasks)
- Modal informativo (RoutineInfoModal)
- Animações sequenciais de entrada

📅 RoutineScreen (Rotinas)
- CRUD Completo de Tarefas:
  - Criar tarefa (modal com formulário completo)
  - Editar tarefa (long press 500ms → menu)
  - Excluir tarefa (confirmação + animação de bolha estourando)
  - Toggle de status (pendente → em progresso → concluída)
- Sistema de Bloqueio:
  - Tarefas futuras aparecem cinzas/locked
  - Apenas 1 tarefa em progresso por vez
  - Validação de horário por período
- Filtros: Tudo, Manhã, Tarde, Noite
- PeriodHub com progresso por período
- Contador de tarefas concluídas no header
- FAB para adicionar tarefas
- Animação de bolha ao deletar (scale 1.5 + fade out)

🎭 Modais
- TaskFormModal (criar/editar com validação)
- TaskActionsModal (menu: editar/deletar)
- ConfirmDeleteModal (confirmação de exclusão)
- AlertModal (período bloqueado, múltiplas tarefas)
- RoutineInfoModal (como usar a rotina)
- NotificationsModal (lista de notificações)
- StreakInfoModal (info sobre sequência)
- OnboardingModal (tutorial inicial)

🛠️ Utilitários
- isPeriodAvailable() - verifica horário disponível
- getCurrentPeriod() - retorna período atual
- Validações de formulário
- Mock data (12 tarefas distribuídas)

🎬 Animações
- Entrada sequencial de componentes (fade + slide)
- Animação de bolha ao deletar tarefas
- Transições de navegação
- Feedback visual em interações

📦 Build
- EAS Build configurado
- Conta Expo criada (@vidamobile)
- Application ID: com.vidamobile.vida
- Keystore Android gerada
- Build APK iniciada (preview profile)

🔐 Autenticação Completa
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

- OnBoarding pós-registro (coleta de preferências, horários, metas)
- Tela Social (não iniciada)
- Tela Perfil (não iniciada)
- Geração de rotina inicial pela IA
- Persistência de dados (AsyncStorage/Backend)
- Sistema de gamificação real (XP, níveis, conquistas)
- Backend/API

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
    │   │   │   ├── OnboardingModal.tsx
    │   │   │   ├── RoutineInfoModal.tsx
    │   │   │   ├── StreakInfoModal.tsx
    │   │   │   ├── TaskActionsModal.tsx
    │   │   │   └── TaskFormModal.tsx
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
    │           ├── WelcomeIllustration.tsx
    │           └── index.ts
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
    │   ├── profile/
    │   │   └── ProfileScreen.tsx
    │   └── routine/
    │       └── RoutineScreen.tsx
    |   └── welcome/
            └── WelcomeScreen.tsx
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