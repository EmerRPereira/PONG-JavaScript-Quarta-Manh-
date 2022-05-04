// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

// Variáveis Velocidade
let VelocidadeXbolinha = 6;
let VelocidadeYbolinha = 6;

// Variáveis Raquete1
let xRaquete1 = 3;
let yRaquete1 = 160;
let xLarguraR = 5;
let yAlturaR = 80;

// Variáveis Raquete2
let xRaquete2 = 592;
let yRaquete2 = 160;
let Erro = 0;

// Variável Colisão
let colisao = false;

// Variáveis do Placar
Placar1 = 0;
Placar2 = 0;

// Variáveis de SOM
let Raquetada;
let Fundo;
let Trilha;

function preload() {
  Raquetada = loadSound("Sons/PongRaquete.wav");
  Fundo = loadSound("Sons/PongFundo.wav");
  Trilha = loadSound("Sons/TrilhaPong.wav");
}

function setup() {
  createCanvas(600, 400);
  Trilha.loop();
}

function draw() {
  background(50, 150, 0);
  Linha();
  PlacarJogo();
  Bolinha();
  MovimentoBolinha();
  BordaVolte();
  Raquete1();
  Raquete2();
  MoveRaquete1();
  MoveRaquete2();
  Pontuacao();
//  ColisaoR1();
//  ColisaoR2();
  ColisaoRaquete(xRaquete1,yRaquete1);
  ColisaoRaquete(xRaquete2,yRaquete2);
}

function Bolinha() {
  stroke(255, 255, 0);
  fill(255, 255, 0);
  circle(xBolinha, yBolinha, diametro);
}

function Linha() {
  stroke(255, 255, 255);
  strokeWeight(3);
  line(width/2, 0, width/2, height);
}

function MovimentoBolinha() {
  xBolinha += VelocidadeXbolinha;
  yBolinha += VelocidadeYbolinha;
} 

function BordaVolte() {
  if (xBolinha+raio > width || xBolinha < raio) {
    Fundo.play();
    VelocidadeXbolinha *= -1;
  }
  if (yBolinha+raio > height || yBolinha < raio) {
    VelocidadeYbolinha *= -1;
  }
}

function Raquete1() {
  stroke(255, 0, 0);
  fill(255, 0, 0);
  rect(xRaquete1, yRaquete1, xLarguraR, yAlturaR,0,5,5,0);
}

function MoveRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 5;
  }
}

function Raquete2() {
  stroke(255, 0, 0);
  fill(255, 0, 0);
  rect(xRaquete2, yRaquete2, xLarguraR, yAlturaR,5,0,0,5);
}

function MoveRaquete2() {
  yVelocidadeR2 = yBolinha - yAlturaR/2 + Erro;
  yRaquete2 = yVelocidadeR2;
  Erro -= random(-2,2);
  if (Erro > 110 || Erro < -110) {
    Erro = 0;
  }
}

//function ColisaoR1() {
//  if (xBolinha - raio < xRaquete1+xLarguraR && yBolinha - raio < yRaquete1+yAlturaR && yBolinha+raio > yRaquete1) {
//    VelocidadeXbolinha *= -1;
//  }
//}

//function ColisaoR2() {
//  if (xBolinha - raio < xRaquete2+xLarguraR && yBolinha - raio < yRaquete2+yAlturaR && yBolinha+raio > yRaquete2) {
//    VelocidadeXbolinha *= -1;
//  }
//}

function ColisaoRaquete(m,n) {
  colisao = collideRectCircle(m,n,xLarguraR,yAlturaR,xBolinha,yBolinha,diametro)
  if (colisao) {
    Raquetada.play();
    VelocidadeXbolinha *= -1;
  }
}

function PlacarJogo() {
  fill(250,150,70);
  rect(235,2,55,23,5);
  rect(310,2,55,23,5);
  textSize(18);
  textAlign(CENTER);
  text(Placar1, 263,20);
  text(Placar2, 340,20);
}

function Pontuacao() {
  if (xBolinha > 589) {
    Placar1 += 1;
  }
  if (xBolinha < 11) {
    Placar2 += 1;
  }
}