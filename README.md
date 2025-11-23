# YOLOv11 Video Counter

Sistema completo de contagem de pessoas e veículos em vídeos utilizando YOLOv11 da Ultralytics, com interface web moderna.

## Descrição

Este projeto utiliza o modelo YOLO11 (standard nano model) para:
- Contar o número de pessoas presentes em um vídeo em todos os momentos
- Contar o número de veículos presentes em um vídeo em todos os momentos

## Características

- 🎨 **Interface Web Moderna**: Interface responsiva com Next.js 14 e shadcn/ui
- 🚀 **API RESTful**: Backend FastAPI com WebSocket para progresso em tempo real
- 📊 **Visualizações**: Gráficos interativos e estatísticas detalhadas
- 🎥 **Comparação de Vídeos**: Visualize vídeo original e processado lado a lado
- 📱 **Responsivo**: Funciona em desktop, tablet e mobile
- 🌙 **Dark Mode**: Suporte para modo claro e escuro

## Estrutura do Projeto

```
.
├── frontend/              # Aplicação Next.js
│   ├── app/              # App Router do Next.js
│   ├── components/       # Componentes React
│   │   ├── ui/          # Componentes shadcn/ui
│   │   ├── upload-zone.tsx
│   │   ├── video-player.tsx
│   │   ├── stats-card.tsx
│   │   └── processing-status.tsx
│   └── lib/             # Utilitários
├── backend/              # API FastAPI
│   ├── main.py          # Servidor principal
│   ├── routers/         # Endpoints da API
│   │   ├── people.py
│   │   └── vehicles.py
│   └── utils/           # Utilitários
├── people_counter.py     # Script CLI para contagem de pessoas
├── vehicle_counter.py    # Script CLI para contagem de veículos
├── requirements.txt      # Dependências Python
└── README.md
```

## Requisitos

### Backend
- Python 3.8 ou superior
- pip

### Frontend
- Node.js 18 ou superior
- npm ou yarn

## Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd concess1
```

### 2. Backend Setup

Crie um ambiente virtual e instale as dependências:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

### 3. Frontend Setup

Instale as dependências do Node.js:

```bash
cd frontend
npm install
cd ..
```

## Uso

### Opção 1: Interface Web (Recomendado)

#### 1. Inicie o Backend
```bash
cd backend
python main.py
```

O backend estará rodando em `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- WebSocket: `ws://localhost:8000/ws/{job_id}`

#### 2. Inicie o Frontend
Em outro terminal:

```bash
cd frontend
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

#### 3. Use a Interface

1. Acesse `http://localhost:3000` no navegador
2. Escolha entre "Pessoas" ou "Veículos"
3. Faça upload de um vídeo (arraste ou clique)
4. Ajuste o threshold de confiança (opcional)
5. Clique em "Processar Vídeo"
6. Acompanhe o progresso em tempo real
7. Visualize os resultados com estatísticas e gráficos
8. Baixe o vídeo processado ou CSV com dados

### Opção 2: Scripts CLI (Linha de Comando)

#### Contador de Pessoas

Para processar um vídeo e contar pessoas:

```bash
python people_counter.py videos/input/seu_video.mp4
```

Para salvar o vídeo processado com as detecções:

```bash
python people_counter.py videos/input/seu_video.mp4 -o videos/output/pessoas_detectadas.mp4
```

Para ajustar o threshold de confiança (padrão é 0.5):

```bash
python people_counter.py videos/input/seu_video.mp4 -o videos/output/pessoas_detectadas.mp4 -c 0.6
```

### Contador de Veículos

Para processar um vídeo e contar veículos:

```bash
python vehicle_counter.py videos/input/seu_video.mp4
```

Para salvar o vídeo processado com as detecções:

```bash
python vehicle_counter.py videos/input/seu_video.mp4 -o videos/output/veiculos_detectados.mp4
```

Para ajustar o threshold de confiança (padrão é 0.5):

```bash
python vehicle_counter.py videos/input/seu_video.mp4 -o videos/output/veiculos_detectados.mp4 -c 0.6
```

## Tipos de Veículos Detectados

O contador de veículos detecta os seguintes tipos:
- Carros (car)
- Motocicletas (motorcycle)
- Ônibus (bus)
- Caminhões (truck)

Cada tipo é exibido com uma cor diferente:
- Carros: Verde
- Motocicletas: Azul
- Ônibus: Laranja
- Caminhões: Vermelho

## Características

### Contador de Pessoas
- Detecta e conta pessoas em tempo real
- Desenha caixas delimitadoras ao redor de cada pessoa
- Exibe o número total de pessoas em cada frame
- Mostra a confiança da detecção
- Permite salvar o vídeo processado

### Contador de Veículos
- Detecta e conta diferentes tipos de veículos
- Diferencia entre carros, motos, ônibus e caminhões
- Usa cores diferentes para cada tipo de veículo
- Exibe contagem total e por tipo
- Mostra a confiança da detecção
- Permite salvar o vídeo processado

## Parâmetros

Ambos os scripts aceitam os seguintes parâmetros:

- `video`: Caminho para o vídeo de entrada (obrigatório)
- `-o, --output`: Caminho para salvar o vídeo processado (opcional)
- `-c, --conf`: Threshold de confiança para detecções, valor entre 0 e 1 (padrão: 0.5)

## Exemplos de Output

Durante o processamento, você verá mensagens como:

```
Video: 1920x1080 @ 30fps, 900 frames
Frame 30/900 - People: 5
Frame 60/900 - People: 7
Frame 90/900 - People: 6
...
Processing complete! Total frames processed: 900
Output saved to: videos/output/pessoas_detectadas.mp4
```

## Download do Modelo

Na primeira execução, o modelo YOLOv11n será baixado automaticamente pela biblioteca Ultralytics.
O modelo tem aproximadamente 6MB.

## Performance

O modelo nano (yolo11n.pt) é otimizado para velocidade, sendo adequado para processamento em tempo real
em hardware comum. Para maior precisão, você pode modificar os scripts para usar modelos maiores:
- yolo11s.pt (small)
- yolo11m.pt (medium)
- yolo11l.pt (large)
- yolo11x.pt (extra large)

## Troubleshooting

### Erro ao abrir o vídeo
Certifique-se de que o caminho do vídeo está correto e que o formato é suportado pelo OpenCV
(mp4, avi, mov, mkv, etc.)

### Detecções imprecisas
Tente ajustar o threshold de confiança usando o parâmetro `-c`. Valores maiores (ex: 0.6 ou 0.7)
reduzem falsos positivos mas podem perder algumas detecções. Valores menores (ex: 0.3 ou 0.4)
detectam mais objetos mas podem incluir falsos positivos.

### Performance lenta
Considere usar um modelo menor (nano já é o menor) ou processar o vídeo em uma resolução menor.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI
- **WebSocket**: Para progresso em tempo real
- **CORS**: Habilitado para desenvolvimento
- **Video Processing**: OpenCV + Ultralytics YOLO
- **Language**: Python 3.8+

### AI/ML
- **Model**: YOLOv11 Nano (yolo11n.pt)
- **Framework**: Ultralytics
- **Detection**: COCO dataset (80 classes)

## API Endpoints

### People Counter
- `POST /api/people/upload` - Upload de vídeo
- `POST /api/people/process/{job_id}` - Iniciar processamento
- `GET /api/people/status/{job_id}` - Status do job
- `GET /api/people/results/{job_id}` - Resultados
- `GET /api/people/download/video/{job_id}` - Download vídeo
- `GET /api/people/download/csv/{job_id}` - Download CSV

### Vehicle Counter
- `POST /api/vehicles/upload` - Upload de vídeo
- `POST /api/vehicles/process/{job_id}` - Iniciar processamento
- `GET /api/vehicles/status/{job_id}` - Status do job
- `GET /api/vehicles/results/{job_id}` - Resultados
- `GET /api/vehicles/download/video/{job_id}` - Download vídeo
- `GET /api/vehicles/download/csv/{job_id}` - Download CSV

### WebSocket
- `WS /ws/{job_id}` - Progresso em tempo real

Documentação completa da API: `http://localhost:8000/docs`

## Componentes UI

O projeto utiliza os seguintes componentes shadcn/ui:
- Button
- Card
- Tabs
- Progress
- Badge
- Slider
- Alert
- Input

E componentes customizados:
- UploadZone (drag & drop)
- VideoPlayer
- StatsCard
- ProcessingStatus

## Licença

Este projeto utiliza a biblioteca Ultralytics YOLO, que é licenciada sob AGPL-3.0.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
