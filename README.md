bl# Cubo Mágico 3D – Three.js

## Integrantes

- Artur Lima Pinto Bacalhau — RA: 852137
- Davi Magalhães Mendes — RA: 852600
- Renato Hideki Nakao Ichigi — RA: 858696
- João Estevam Costa dos Santos Tavares — RA: 849501

---

## Descrição do Projeto

Este projeto consiste em uma simulação interativa de um Cubo Mágico 3D, desenvolvido com Three.js e JavaScript.

O objetivo principal é representar um cubo 3×3×3 composto por 27 cubinhos independentes, permitindo a rotação animada das faces, interação por teclado, movimentação da câmera com o mouse e funcionalidades extras como contador de movimentos, embaralhamento, troca de tema e detecção de vitória.

O projeto foi desenvolvido com arquitetura modular utilizando Vite, separando a criação da cena, a estrutura do cubo, as rotações, a interface e as regras do jogo em arquivos específicos.

---

## Tecnologias Utilizadas

- JavaScript
- Three.js
- Vite
- HTML5
- CSS3
- WebGL
- Git
- GitHub

---

## Funcionalidades Implementadas

### Base 3D

- Cena 3D com Three.js
- Renderização com WebGLRenderer
- Câmera PerspectiveCamera
- Controle de câmera com OrbitControls
- Iluminação ambiente e direcional
- Responsividade ao redimensionar a janela
- Loop de animação com requestAnimationFrame

### Cubo Mágico

- Cubo 3×3×3
- 27 cubinhos independentes
- Cores corretas nas faces externas
- Organização espacial nos eixos X, Y e Z
- Sistema de rotação por face
- Rotação suave com animação
- Atualização lógica das posições após cada movimento
- Correção de pequenas imprecisões numéricas após as rotações

### Interface e Extras

- Contador de movimentos
- Botão de embaralhamento
- Troca de tema
- Detecção de vitória
- Controles por teclado

---

## Controles

| Tecla | Face movimentada | Descrição |
|------|------------------|-----------|
| Q | Superior | Gira a face de cima |
| A | Inferior | Gira a face de baixo |
| W | Frontal | Gira a face da frente |
| S | Traseira | Gira a face de trás |
| E | Direita | Gira a face direita |
| D | Esquerda | Gira a face esquerda |
| Shift + tecla | Face correspondente | Gira no sentido inverso |

O mouse pode ser usado para movimentar a câmera ao redor do cubo por meio do OrbitControls.

---

## Cores das Faces

| Face | Cor |
|------|-----|
| Direita | Vermelho |
| Esquerda | Laranja |
| Superior | Branco |
| Inferior | Amarelo |
| Frontal | Verde |
| Traseira | Azul |

---

## Como Executar o Projeto

### Pré-requisitos

É necessário ter o Node.js instalado.

### Passos

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd Projeto-3D-Cubo
```

Caso o projeto esteja dentro da subpasta `rubiks-cube`, entre nela:

```bash
cd rubiks-cube
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Depois, abra no navegador o endereço mostrado no terminal. Normalmente será:

```txt
http://localhost:5173
```

---

## Estrutura do Projeto

```txt
rubiks-cube/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   ├── style.css
│   │
│   ├── scene/
│   │   ├── sceneSetup.js
│   │   ├── camera.js
│   │   └── lights.js
│   │
│   ├── cube/
│   │   ├── colors.js
│   │   ├── cubie.js
│   │   ├── createCube.js
│   │   └── rotations.js
│   │
│   ├── game/
│   │   ├── moveCounter.js
│   │   ├── shuffle.js
│   │   └── victoryCheck.js
│   │
│   └── ui/
│       └── interface.js
```

---

## Funcionamento Técnico

### Criação da Cena

A cena é criada com Three.js e recebe todos os elementos do projeto, como o cubo, a câmera, as luzes e os objetos auxiliares.

A câmera utilizada é uma PerspectiveCamera, que permite visualizar a cena em perspectiva tridimensional. O controle da câmera é feito com OrbitControls, permitindo que o usuário gire a visualização usando o mouse.

O renderizador utilizado é o WebGLRenderer, responsável por desenhar a cena 3D no navegador.

---

## Construção do Cubo

O Cubo Mágico é formado por 27 cubinhos independentes.

Cada cubinho é criado com:

```js
THREE.BoxGeometry
```

e recebe materiais individuais para suas faces.

A criação dos cubinhos ocorre por meio de três laços de repetição, um para cada eixo:

```txt
x = -1, 0, 1
y = -1, 0, 1
z = -1, 0, 1
```

Como existem 3 posições em cada eixo, o total é:

```txt
3 × 3 × 3 = 27 cubinhos
```

Cada cubinho é armazenado em uma lista chamada `cubies`, usada posteriormente para selecionar quais peças pertencem a cada face.

Além disso, cada cubinho é adicionado visualmente à cena por meio de um grupo principal do cubo.

---

## Posição Lógica dos Cubinhos

Cada cubinho possui uma posição lógica armazenada em:

```js
cubie.userData.logicalPosition
```

Exemplo:

```js
{ x: 1, y: 0, z: -1 }
```

Essa posição indica onde o cubinho está dentro da estrutura do cubo.

- `x = 1` indica a camada da direita
- `x = -1` indica a camada da esquerda
- `y = 1` indica a camada superior
- `y = -1` indica a camada inferior
- `z = 1` indica a camada frontal
- `z = -1` indica a camada traseira

Essa posição lógica é essencial para selecionar corretamente os cubinhos que devem girar em cada movimento.

---

## Sistema de Rotação das Faces

A rotação de uma face é feita em etapas:

1. O código identifica qual face foi solicitada.
2. Seleciona os 9 cubinhos daquela camada.
3. Cria um `THREE.Group` temporário.
4. Adiciona os cubinhos selecionados ao grupo.
5. Rotaciona o grupo suavemente até completar 90 graus.
6. Devolve os cubinhos para a cena principal.
7. Atualiza a posição lógica dos cubinhos.

Exemplo de seleção da face superior:

```js
cubie.userData.logicalPosition.y === 1
```

Essa condição seleciona todos os cubinhos que estão na camada de cima.

---

## Uso de THREE.Group

O `THREE.Group` é utilizado para aplicar uma transformação em vários cubinhos ao mesmo tempo.

Em vez de rotacionar manualmente cada cubinho da face, os 9 cubinhos selecionados são colocados temporariamente em um grupo. Depois, o grupo inteiro é rotacionado.

Exemplo:

```js
const group = new THREE.Group();
scene.add(group);
group.attach(cubie);
```

Após a rotação terminar, os cubinhos são devolvidos para a cena:

```js
scene.attach(cubie);
```

Esse processo é chamado de reancoragem. Ele é necessário porque o grupo só existe durante a rotação daquela face. Depois disso, os cubinhos precisam voltar a ser objetos independentes para participarem de outras rotações.

---

## Animação Suave

A rotação não acontece instantaneamente.

O alvo da rotação é de 90 graus, que em radianos equivale a:

```js
Math.PI / 2
```

A cada frame, o ângulo é incrementado aos poucos até atingir esse valor.

Exemplo:

```js
const SPEED = 0.12;
```

Esse processo ocorre dentro do loop de animação com `requestAnimationFrame`, garantindo uma rotação visualmente suave.

---

## Correção de Precisão Numérica

Durante rotações sucessivas, podem surgir pequenas imprecisões por causa de cálculos com números decimais.

Exemplo:

```txt
1.0000000002
```

em vez de:

```txt
1
```

Para evitar que o cubo fique desalinhado com o tempo, o projeto arredonda posições e rotações após cada movimento usando `Math.round()`.

Essa etapa mantém os cubinhos alinhados corretamente depois das rotações.

---

## Atualização da Posição Lógica

Após cada rotação, os cubinhos mudam de posição dentro do cubo.

Por isso, além de alterar a posição visual, o código também atualiza a posição lógica armazenada em:

```js
cubie.userData.logicalPosition
```

Essa atualização é importante porque as próximas rotações dependem desses valores para selecionar as peças corretas.

Sem essa atualização, o código poderia selecionar cubinhos errados depois de alguns movimentos.

---

## Sistema de Embaralhamento

O embaralhamento realiza uma sequência de movimentos aleatórios nas faces do cubo.

A lógica utiliza os mesmos comandos de rotação usados pelo teclado, garantindo que o embaralhamento siga as regras do próprio sistema de movimentação do cubo.

---

## Contador de Movimentos

O contador registra a quantidade de movimentos realizados pelo usuário.

Ele é atualizado sempre que uma rotação válida é executada.

Essa funcionalidade ajuda a acompanhar o progresso durante a resolução do cubo.

---

## Sistema de Vitória

A detecção de vitória verifica se o cubo voltou ao estado resolvido.

Para isso, o projeto compara o estado atual dos cubinhos com suas posições iniciais. Quando todos os cubinhos retornam às posições esperadas, o sistema identifica que o cubo foi resolvido.

---

## Conceitos Matemáticos Utilizados

### Vetores

Vetores são usados para representar posições e direções no espaço 3D.

No projeto, eles aparecem principalmente nas posições dos cubinhos, da câmera e dos objetos da cena.

### Transformações 3D

O projeto utiliza transformações geométricas como:

- translação
- rotação
- escala

Essas transformações são aplicadas aos objetos da cena pelo Three.js.

### Matrizes

Internamente, o Three.js utiliza matrizes 4×4 para calcular transformações 3D.

Essas matrizes representam operações como rotação, translação e escala, permitindo posicionar e transformar objetos corretamente no espaço.

---

## Divisão de Tarefas

### Artur Lima Pinto Bacalhau

Responsável pela base 3D do projeto:

- Configuração da cena
- Câmera
- OrbitControls
- Iluminação
- Renderização
- Responsividade
- Integração principal

### Davi Magalhães Mendes

Responsável pela estrutura visual e espacial do cubo:

- Estrutura dos cubinhos
- Sistema de cores
- Organização espacial
- Construção do cubo 3×3×3
- Armazenamento das posições lógicas dos cubinhos

### Renato Hideki Nakao Ichigi

Responsável pelo sistema de rotação e lógica matemática das faces:

- Sistema de rotação
- Seleção das faces
- Atualização lógica das posições
- Reancoragem dos cubinhos
- Sistema matemático das rotações
- Correção de precisão numérica após rotações

### João Estevam Costa dos Santos Tavares

Responsável pela interface e funcionalidades extras:

- Interface do usuário
- Contador de movimentos
- Botão de embaralhamento
- Sistema de vitória
- Troca de tema
- Controles por teclado

---

## Uso de Inteligência Artificial

A inteligência artificial foi utilizada como ferramenta auxiliar durante o desenvolvimento do projeto.

O uso foi voltado para:

- Organização da arquitetura do projeto
- Explicação de conceitos de Three.js
- Explicação de transformações 3D
- Apoio na lógica de rotação das faces
- Apoio na documentação
- Apoio na divisão de tarefas
- Revisão do README

A implementação final foi adaptada e testada pelos integrantes do grupo dentro do ambiente de desenvolvimento.

---

## Considerações Finais

O projeto demonstra o uso de conceitos fundamentais de computação gráfica 3D, como cena, câmera, renderização, malhas, materiais, grupos, transformações geométricas e animação.

A estrutura modular facilita a manutenção do código e a divisão das responsabilidades entre os integrantes do grupo.
