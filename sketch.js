let data;
let maxSuperficie = 0;
let maxProduzione = 0;
let territori = [];
let selectedId;

let margin = 20;
let gutter = 4;



async function setup(){
  createCanvas(windowWidth, windowHeight + 50);



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
  background('#EBD2AD');

  let numeroColonne = 10;
  let dimRiga = 0;
  let numberOfGutters = data.getRowCount() - 1;

  let barsWidth = width - 2 * margin - numberOfGutters * gutter;

  let xPos = margin;
  let yPos = margin;
  let label = "";
  noStroke();

//   let colorScale = {
//   10: '#E494FE',
//   20: '#DC77FE',
//   30: '#BE11D1',
//   40: '#B03AB0',
//   50: '#970C97',
//   60: '#89118F',
//   70: '#721684',
//   80: '#710971',
//   90: '#590859',
//   100: '#3A0A3A',
// }

  let colorScale = {
  10:'#8d257c',
  20: '#6f4687',
  30: '#725f8b',
  40: '#75778d',
  50: '#778d8f',
  60: '#79a490',
  70: '#7abb90',
  80: '#7cd28f',
  90: '#7fe88d',
  100: '#82ff8a',
}

//   let colorScale = {
//   10:'#6b2983',
//   20: '#46e0e0',
//   30: '#725f8b',
//   40: '#c52a52',
//   50: '#778d8f',
//   60: '#79a490',
//   70: '#93003a',
//   80: '#7cd28f',
//   90: '#ffcab9',
//   100: '#82ff8a',
// }

  for(let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++){
    let currentSuperficie = data.getNum(rowNumber, "Superficie totale - ettari");
    let currentProduzione = data.getNum(rowNumber, "Produzione totale - quintali");
    let territorio = data.getString(rowNumber, "Territorio");
    
    let scaledProduzione = map(currentProduzione, 0, maxProduzione / 4, 0, barsWidth);
    let scaledSuperficie = map(currentSuperficie, 0, maxSuperficie, 0, height - 2 * margin);

    if(scaledProduzione > dimRiga) {
      dimRiga = scaledProduzione + gutter;
    }

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
    // for(let g = 0; g <= data.getRowCount(); g++){
    //   mioGlifo(xPos+)
    // }
    if(xPos + scaledProduzione <= (windowWidth - margin)) {
      // rect(xPos, yPos, scaledProduzione, scaledProduzione);
      mioGlifo(xPos, yPos, scaledProduzione);
      xPos += scaledProduzione + gutter;

      if(xPos >= windowWidth){
        xPos = margin;
        yPos = yPos + dimRiga;
      }
    } else {
      xPos = margin; 
      yPos = yPos + dimRiga;           
      // rect(xPos, yPos, scaledProduzione, scaledProduzione);
      mioGlifo(xPos, yPos, scaledProduzione);

      xPos += scaledProduzione + gutter;    
    }
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

//  fill(255);
  circle(x1, y1, sizeCerchio);
  //  fill(255);
  circle(x2, y2, sizeCerchio);
    //  fill(255);
  circle(x3, y3, sizeCerchio);
  //  fill(255);
  circle(x4, y4, sizeCerchio);
  //  fill(255);
  circle(x5, y5, sizeCerchio);
    //  fill(255);
  circle(x6, y6, sizeCerchio);
fill('#4D382D')
  rect(0, 0, size, size/4);
  pop();

}