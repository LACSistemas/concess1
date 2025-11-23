# Plano de Frontend - Sistema de Contagem YOLOv11

## Stack Tecnológica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Ícones**: Lucide React
- **Gerenciamento de Estado**: React Hooks + Context API
- **Upload de Arquivos**: React Dropzone
- **Comunicação Backend**: Fetch API / Axios

### Backend API
- **Framework**: FastAPI
- **WebSocket**: Para progresso em tempo real
- **File Upload**: Multipart form data
- **CORS**: Habilitado para desenvolvimento

## Estrutura do Projeto

```
concess1/
├── frontend/                 # Aplicação Next.js
│   ├── app/
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Página inicial
│   │   └── api/             # API routes (se necessário)
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── upload-zone.tsx  # Componente de upload
│   │   ├── video-player.tsx # Player de vídeo
│   │   ├── stats-card.tsx   # Card de estatísticas
│   │   └── processing-status.tsx # Status do processamento
│   ├── lib/
│   │   └── utils.ts
│   └── public/
├── backend/                  # API FastAPI
│   ├── main.py              # Servidor FastAPI
│   ├── routers/
│   │   ├── people.py        # Endpoints contador de pessoas
│   │   └── vehicles.py      # Endpoints contador de veículos
│   └── utils/
│       ├── video_processor.py  # Wrapper dos scripts Python
│       └── file_handler.py     # Gerenciamento de arquivos
├── people_counter.py         # Script original (reutilizado)
├── vehicle_counter.py        # Script original (reutilizado)
└── requirements.txt          # Atualizado com FastAPI
```

## Design e Layout

### Página Principal

#### Header
- Logo/Título do projeto
- Navegação entre "Contador de Pessoas" e "Contador de Veículos"
- Toggle de tema (Dark/Light mode)

#### Seção de Upload (Card Principal)
```
┌─────────────────────────────────────────────┐
│  📹 Upload de Vídeo                         │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │                                       │ │
│  │    🎬 Arraste o vídeo aqui           │ │
│  │       ou clique para selecionar      │ │
│  │                                       │ │
│  │    Formatos: MP4, AVI, MOV, MKV      │ │
│  │    Tamanho máximo: 500MB             │ │
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  Tipo de Contagem:                          │
│  ○ Pessoas   ○ Veículos                     │
│                                             │
│  Configurações Avançadas (Accordion)        │
│  └─ Threshold de Confiança: [====|===] 0.5 │
│  └─ Salvar vídeo processado: ✓              │
│                                             │
│  [Processar Vídeo]                          │
└─────────────────────────────────────────────┘
```

#### Seção de Processamento (Aparece durante processamento)
```
┌─────────────────────────────────────────────┐
│  ⚙️ Processando...                          │
├─────────────────────────────────────────────┤
│  Frame: 245/900                             │
│  [████████████░░░░░░░░░░░] 27%              │
│                                             │
│  📊 Estatísticas em Tempo Real:             │
│  • Pessoas detectadas: 12                   │
│  • Tempo decorrido: 00:45                   │
│  • Tempo estimado: 02:15                    │
│                                             │
│  [Cancelar Processamento]                   │
└─────────────────────────────────────────────┘
```

#### Seção de Resultados (Após processamento)
```
┌─────────────────────────────────────────────┐
│  ✅ Processamento Concluído!                │
├─────────────────────────────────────────────┤
│                                             │
│  Grid com 2 colunas:                        │
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │  Vídeo       │  │  Vídeo       │        │
│  │  Original    │  │  Processado  │        │
│  │  ▶️ Player   │  │  ▶️ Player   │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
│  📊 Estatísticas:                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │ Total   │ │ Máximo  │ │ Média   │      │
│  │ 12      │ │ 18      │ │ 14.5    │      │
│  │ pessoas │ │ pessoas │ │ pessoas │      │
│  └─────────┘ └─────────┘ └─────────┘      │
│                                             │
│  📈 Gráfico de Contagem ao Longo do Tempo   │
│  [Gráfico de linha mostrando variação]     │
│                                             │
│  [⬇️ Download Vídeo] [📄 Download CSV]      │
│  [🔄 Processar Novo Vídeo]                  │
└─────────────────────────────────────────────┘
```

#### Para Veículos (Cards Adicionais)
```
┌─────────────────────────────────────────────┐
│  🚗 Detalhamento por Tipo de Veículo        │
├─────────────────────────────────────────────┤
│  Grid com 4 cards:                          │
│                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐│
│  │ 🚗 Car │ │ 🏍️ Moto│ │ 🚌 Bus │ │ 🚚Truck││
│  │   45   │ │   12   │ │   3    │ │   7   ││
│  └────────┘ └────────┘ └────────┘ └──────┘│
│                                             │
│  📈 Gráfico Empilhado (Stacked Chart)       │
│  [Gráfico mostrando proporção de cada tipo]│
└─────────────────────────────────────────────┘
```

## Componentes shadcn/ui a Utilizar

- **Card** - Containers principais
- **Button** - Ações (upload, download, processar)
- **Progress** - Barra de progresso
- **Badge** - Tags de status
- **Tabs** - Navegação entre pessoas/veículos
- **Select** - Seleção de threshold
- **Switch** - Toggle de opções
- **Accordion** - Configurações avançadas
- **Alert** - Mensagens de erro/sucesso
- **Dialog** - Confirmações
- **Skeleton** - Loading states
- **Table** - Dados tabulares (se necessário)
- **Chart** (usando Recharts) - Gráficos

## Funcionalidades

### Upload e Validação
- ✅ Drag and drop de vídeos
- ✅ Validação de formato (MP4, AVI, MOV, MKV)
- ✅ Validação de tamanho (limite configurável)
- ✅ Preview do arquivo selecionado

### Processamento
- ✅ Envio do vídeo para API
- ✅ Progresso em tempo real via WebSocket
- ✅ Estatísticas atualizadas durante processamento
- ✅ Opção de cancelar processamento
- ✅ Tratamento de erros

### Visualização de Resultados
- ✅ Player de vídeo original vs processado (lado a lado)
- ✅ Cards de estatísticas resumidas
- ✅ Gráfico de contagem ao longo do tempo
- ✅ Para veículos: breakdown por tipo
- ✅ Tabela de dados detalhados (frame a frame)

### Download
- ✅ Download do vídeo processado
- ✅ Download de CSV com estatísticas
- ✅ Download de relatório JSON

### Extras
- ✅ Histórico de processamentos (localStorage)
- ✅ Modo claro/escuro
- ✅ Responsivo (desktop e mobile)
- ✅ Animações suaves

## API Endpoints (Backend FastAPI)

### POST /api/upload
- Upload de vídeo
- Retorna: ID do job

### POST /api/process/people
- Inicia processamento de pessoas
- Body: { video_id, confidence, save_output }
- Retorna: Job ID

### POST /api/process/vehicles
- Inicia processamento de veículos
- Body: { video_id, confidence, save_output }
- Retorna: Job ID

### GET /api/status/{job_id}
- Retorna status do processamento
- Response: { status, progress, stats }

### WebSocket /ws/{job_id}
- Envia atualizações em tempo real
- Eventos: progress, stats, complete, error

### GET /api/results/{job_id}
- Retorna resultados completos
- Response: { stats, video_url, csv_url }

### GET /api/download/video/{job_id}
- Download do vídeo processado

### GET /api/download/csv/{job_id}
- Download do CSV com dados

## Fluxo de Usuário

1. **Acesso**: Usuário acessa a aplicação
2. **Escolha**: Seleciona tipo (Pessoas ou Veículos)
3. **Upload**: Arrasta/seleciona vídeo
4. **Configuração**: Ajusta threshold (opcional)
5. **Processamento**: Clica em "Processar"
6. **Acompanhamento**: Vê progresso em tempo real
7. **Resultados**: Visualiza vídeos e estatísticas
8. **Download**: Baixa vídeo processado e/ou CSV
9. **Novo**: Processa novo vídeo ou volta ao início

## Melhorias de UX

- Loading skeletons durante carregamento
- Transições suaves entre estados
- Feedback visual em todas as ações
- Mensagens de erro claras e acionáveis
- Tooltips explicativos
- Atalhos de teclado
- Auto-scroll para resultados após processamento

## Responsividade

- **Desktop** (>1024px): Layout de 2 colunas para comparação de vídeos
- **Tablet** (768px-1024px): Layout adaptado, vídeos empilhados
- **Mobile** (<768px): Single column, componentes otimizados para touch

## Temas

- **Light Mode**: Fundo claro, cards brancos, bordas sutis
- **Dark Mode**: Fundo escuro, cards em tons de cinza, acentos coloridos

## Tecnologias Adicionais (Opcionais)

- **Recharts**: Gráficos interativos
- **Framer Motion**: Animações avançadas
- **React Query**: Cache e sincronização de dados
- **Zod**: Validação de formulários

## Estimativa de Arquivos a Criar

### Frontend (~15 arquivos)
- 1 layout.tsx
- 1 page.tsx
- ~8 componentes customizados
- ~12 componentes shadcn/ui (gerados via CLI)
- 1 arquivo de utilidades
- 1 arquivo de configuração

### Backend (~8 arquivos)
- 1 main.py
- 2 routers
- 2 utils
- 1 requirements.txt atualizado
- 1 .env.example
- 1 Dockerfile (opcional)

## Próximos Passos Após Aprovação

1. Configurar projeto Next.js
2. Instalar e configurar shadcn/ui
3. Criar estrutura de componentes
4. Implementar backend FastAPI
5. Conectar frontend com backend
6. Testes e refinamentos
7. Documentação

---

## Perguntas para o Cliente

1. ✅ Prefere processamento local (usuário aguarda) ou em background (com notificações)?
2. ✅ Quer sistema de login/autenticação ou pode ser aberto?
3. ✅ Precisa de banco de dados para histórico ou localStorage é suficiente?
4. ✅ Limite de tamanho de vídeo? (sugestão: 500MB)
5. ✅ Hospedagem planejada? (Vercel/Netlify para frontend, servidor próprio para backend)

**Aprovação necessária para prosseguir com a implementação!**
