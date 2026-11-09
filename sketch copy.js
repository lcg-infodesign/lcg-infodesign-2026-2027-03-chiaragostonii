let data;
let maxSuperficie = 0;
let maxProduzione = 0;
let territori = [];
let selectedId;

let margin = 0;
let gutter = 4;

async function setup(){
  createCanvas(windowWidth, windowHeight);

  data = await loadTable("assets/Coltivazioni-Superfici-e-produzione-provincie.csv", ",", "header");

  for(let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++){
    let produzione = data.getNum(rowNumber, "Produzione totale - quintali");
    let superficie = data.getNum(rowNumber, "Superficie totale - ettari");

    if (superficie > maxSuperficie) {
      maxSuperficie = superficie;
    }

    maxProduzione += produzione;
    
    let territorio = data.getString(rowNumber, "Territorio");

    if (!territori.includes(territorio)){
      territori.push(territorio);
    }
  }
}

function draw(){
  background(52);

  let numberOfGutters = data.getRowCount() - 1;

  let barsWidth = width - 2 * margin - numberOfGutters * gutter;

  let xPos = margin;
  let label = "";
  noStroke();

  let colorScale = {
  10: '#E494FE',
  20: '#DC77FE',
  30: '#BE11D1',
  40: '#B03AB0',
  50: '#970C97',
  60: '#89118F',
  70: '#721684',
  80: '#710971',
  90: '#590859',
  100: '#3A0A3A',
}

  for(let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++){
    let currentSuperficie = data.getNum(rowNumber, "Superficie totale - ettari");
    let currentProduzione = data.getNum(rowNumber, "Produzione totale - quintali");
    let territorio = data.getString(rowNumber, "Territorio");
    
    let scaledProduzione = map(currentProduzione, 0, maxProduzione, 0, barsWidth);
    let scaledSuperficie = map(currentSuperficie, 0, maxSuperficie, 0, height - 2 * margin);

    // fill(255);
    //rect(xPos, margin, scaledSuperficie, scaledSuperficie);
    // fill(255, 0, 0);
    let valoreSuperficie = ceil(map(currentSuperficie, 0, maxSuperficie, 0, 100));
    console.log(valoreSuperficie);

    if(valoreSuperficie<10){
      fill(colorScale[10])
    }else if(valoreSuperficie>10 && valoreSuperficie<20){
      fill(colorScale[20])
    }else if(valoreSuperficie>20 && valoreSuperficie<30){
      fill(colorScale[30])
    }else if(valoreSuperficie>30 && valoreSuperficie<40){
      fill(colorScale[40])
    }else if(valoreSuperficie>40 && valoreSuperficie<50){
      fill(colorScale[50])
    }else if(valoreSuperficie>50 && valoreSuperficie<60){
      fill(colorScale[60])
    }else if(valoreSuperficie>60 && valoreSuperficie<70){
      fill(colorScale[70])
    }else if(valoreSuperficie>70 && valoreSuperficie<80){
      fill(colorScale[80])
    }else if(valoreSuperficie>80 && valoreSuperficie<90){
      fill(colorScale[90])
    }else{
      fill(colorScale[100])
    }
    // fill(100, 60, 160);
    rect(xPos, margin, scaledProduzione, scaledProduzione);


    // mioGlifo(xPos, margin, scaledProduzione, scaledSuperficie);
    mioGlifo(xPos, margin, scaledProduzione);
      xPos += scaledProduzione + gutter;
  }
}

function mioGlifo(x, y, size){
  push();
  translate(x, y);
  // rectMode(CENTER);

  //fill(0);
  //rettangolo griglia base
  //rect(x, y, size);

  let sizeCerchio = size/4

  let x1 = size/4
  let y1 = size * 3/8
    let x2 = size/2
  let y2 = size * 3/8
    let x3 = size * 6/8
  let y3 = size * 3/8
    let x4 = size * 3/8
  let y4 = size* 5/8
  let x5 = size * 5/8
  let y5 = size * 5/8
  let x6 = size/2
  let y6 = size *7/8

  let rx1 = size
  let ry1 = size * 2/8

 fill(255);
  circle(x1, y1, sizeCerchio);
   fill(255);
  circle(x2, y2, sizeCerchio);
     fill(255);
  circle(x3, y3, sizeCerchio);
   fill(255);
  circle(x4, y4, sizeCerchio);
   fill(255);
  circle(x5, y5, sizeCerchio);
     fill(255);
  circle(x6, y6, sizeCerchio);

  rect(0, 0, size, size/4);
  pop();

}