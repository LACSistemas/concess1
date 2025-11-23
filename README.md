# YOLOv11 Video Counter

Sistema de contagem de pessoas e veículos em vídeos utilizando YOLOv11 da Ultralytics.

## Descrição

Este projeto utiliza o modelo YOLO11 (standard nano model) para:
- Contar o número de pessoas presentes em um vídeo em todos os momentos
- Contar o número de veículos presentes em um vídeo em todos os momentos

## Estrutura do Projeto

```
.
├── people_counter.py      # Script para contagem de pessoas
├── vehicle_counter.py     # Script para contagem de veículos
├── requirements.txt       # Dependências do projeto
├── videos/
│   ├── input/            # Coloque seus vídeos aqui
│   └── output/           # Vídeos processados serão salvos aqui
└── README.md
```

## Requisitos

- Python 3.8 ou superior
- pip

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd concess1
```

2. Crie um ambiente virtual (recomendado):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Uso

### Contador de Pessoas

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

## Licença

Este projeto utiliza a biblioteca Ultralytics YOLO, que é licenciada sob AGPL-3.0.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
