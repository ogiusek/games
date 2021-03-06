import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reversi',
  templateUrl: './reversi.component.html',
  styleUrls: ['./reversi.component.css']
})
export class ReversiComponent implements OnInit {
  amountOfBlocks: number;
  arrayOfBlocks: string[][] = [];
  movesHistory: string[][][] = [];
  colorsHistory: string[] = [];
  colorHasTurn = 'black';
  blackBlocks = 0;
  whiteBlocks = 0;
  finishText = '';
  showWinner = false;
  changedTurn = false;
  aiColor:string = 'null';
  showQuestion = false;
  ngOnInit(): void {
    this.AddSpace();
    this.blackBlocks = this.CountBlocks('black');
    this.whiteBlocks = this.CountBlocks('white');
  }
  constructor(){
    this.amountOfBlocks = 8;
  }
  reload(){
    this.colorHasTurn = 'black';
    this.blackBlocks = 2;
    this.whiteBlocks = 2;
    this.showWinner = false;
    this.changedTurn = false;
    this.showQuestion = false;
    this.arrayOfBlocks = [];
    this.colorsHistory = [];
    this.movesHistory = [];
    this.AddSpace();
    this.CountBlocks('black');
    this.CountBlocks('white');
  }
  GetAi(ai:string){
    this.showQuestion = false;
    this.aiColor = ai;
    if(ai == 'black'){
      this.Ai();
    }
  }
  AddSpace(){
    for (let i = 0; i < this.amountOfBlocks; i++) {
      this.arrayOfBlocks.push([]);
      for (let j = 0; j < this.amountOfBlocks; j++) {
        this.arrayOfBlocks[i].push('');
      }
    }
    this.arrayOfBlocks[this.amountOfBlocks  / 2][this.amountOfBlocks  / 2] = 'white';
    this.arrayOfBlocks[this.amountOfBlocks  / 2 - 1][this.amountOfBlocks  / 2 - 1] = 'white';
    this.arrayOfBlocks[this.amountOfBlocks  / 2][this.amountOfBlocks  / 2 - 1] = 'black';
    this.arrayOfBlocks[this.amountOfBlocks  / 2 - 1][this.amountOfBlocks  / 2] = 'black';
  }
  AddBlock(x:number, y:number){
    if(!this.showQuestion){
      if(this.CanAddBlock(x, y)){
        this.movesHistory.unshift(this.PushArray());
        this.colorsHistory.unshift(this.colorHasTurn);
        this.changedTurn = false;
        this.ReplaceBlocks(x, y);
        this.arrayOfBlocks[x][y] = this.colorHasTurn;
        if(this.colorHasTurn == 'black'){
          this.colorHasTurn = 'white';
        }else if(this.colorHasTurn == 'white'){
          this.colorHasTurn = 'black';
        }
        this.blackBlocks = this.CountBlocks('black');
        this.whiteBlocks = this.CountBlocks('white');
      }
    }
  }
  PushArray(): string[][]{
    let array: string[][] = [];
    for (let index = 0; index < this.arrayOfBlocks.length; index++) {
      array.push([]);
      const element = this.arrayOfBlocks[index];
      for (let i = 0; i < element.length; i++) {
        const secondElement = element[i];
        array[index].push(secondElement);
        
      }
    }
    return array;
  }
  MoveBack(){
    if(this.movesHistory.length > 0){
      this.arrayOfBlocks = this.movesHistory[0];
      this.movesHistory.shift();
      this.colorHasTurn = this.colorsHistory[0];
      this.colorsHistory.shift();
      this.blackBlocks = this.CountBlocks('black');
      this.whiteBlocks = this.CountBlocks('white');
    }
  }
  CountBlocks(missingElement:string):number{
    let number = 0;
    for (let i = 0; i < this.amountOfBlocks; i++) {
      for (let j = 0; j < this.amountOfBlocks; j++) {
        if(this.arrayOfBlocks[i][j] == missingElement){
          number++;
        }
      }
    }
    return number;
  }
  CanAddBlock(x:number, y:number){
    if(this.arrayOfBlocks[x][y] == ''){
      for (let index = 1; index <= 8; index++) {
        if(this.CheckDirection(index, x, y)){
          return true;
        }      
      }
    }
    return false;
  }
  Check(x:number, addToX:number, y:number, addToY:number, seenOpostie:boolean = false):boolean{
    let color = this.colorHasTurn;
    let secondColor:string;
    if(color == 'white'){
      secondColor = 'black';
    }else{
      secondColor = 'white';
    }
    let array = this.arrayOfBlocks;
    let amountOfBlocks = this.amountOfBlocks;
    
    if(x + addToX <= amountOfBlocks - 1 &&
      x + addToX >= 0 &&
      y + addToY <= amountOfBlocks - 1 &&
      y + addToY >= 0){
      if(array[x + addToX][y + addToY] == secondColor){
        x += addToX;
        y += addToY;
        return this.Check(x, addToX, y, addToY, true);
      }else if(array[x + addToX][y + addToY] == color){
        if(!seenOpostie){
          return false;
        }else{
          return true;
        }
      }
    }
    return false;
  }
  ReplaceLine(x:number, addToX:number, y:number, addToY:number){
    if(this.arrayOfBlocks[x + addToX][y + addToY] != this.colorHasTurn){
      this.arrayOfBlocks[x + addToX][y + addToY] = this.colorHasTurn;
      this.ReplaceLine(x + addToX, addToX, y + addToY, addToY);
    }
  }
  ReplaceBlocks(x:number, y:number){
    if(this.Check(x, 1, y, 0)){
      this.ReplaceLine(x, 1, y, 0);
    }
    if(this.Check(x, 1, y, -1)){
      this.ReplaceLine(x, 1, y, -1);
    }
    if(this.Check(x, 0, y, -1)){
      this.ReplaceLine(x, 0, y, -1);
    }
    if(this.Check(x, -1, y, -1)){
      this.ReplaceLine(x, -1, y, -1);
    }
    if(this.Check(x, -1, y, 0)){
      this.ReplaceLine(x, -1, y, 0);
    }
    if(this.Check(x, -1, y, 1)){
      this.ReplaceLine(x, -1, y, 1);
    }
    if(this.Check(x, 0, y, 1)){
      this.ReplaceLine(x, 0, y, 1);
    }
    if(this.Check(x, 1, y, 1)){
      this.ReplaceLine(x, 1, y, 1);
    }
  }
  CheckDirection(direction:number, x:number, y:number):boolean{
    //1(1.0), 2(1.-1), 3(0.-1), 4(-1.-1), 5(-1.0), 6(-1.1), 7(0.1), 8(1.1)
    let addToX:number = 0;
    let addToY:number = 0;
    switch(direction){
      case 1:
        addToX = 1;
        addToY = 0;
        break;
      case 2:
        addToX = 1;
        addToY = -1;
        break;
      case 3:
        addToX = 0;
        addToY = -1;
        break;
      case 4:
        addToX = -1;
        addToY = -1;
        break;
      case 5:
        addToX = -1;
        addToY = 0;
        break;
      case 6:
        addToX = -1;
        addToY = 1;
        break;
      case 7:
        addToX = 0;
        addToY = 1;
        break;
      case 8:
        addToX = 1;
        addToY = 1;
        break;
    }
    if(this.Check(x, addToX, y, addToY)){
      let find = function(array:number[][], element:number[]):boolean{
        for (let index = 0; index < array.length; index++) {
          if(element[0] == array[index][0] && element[1] == array[index][1]){
            return true;
          }
        }
        return false;
      }
      return true;
    }else{
      return false;
    }
  }
  GetColor(x:number, y:number){
    if(this.arrayOfBlocks[x][y] == 'black'){
      return 'black';
    }
    if(this.arrayOfBlocks[x][y] == 'white'){
      return 'white';
    }
    if(this.CanAddBlock(x, y)){
      return 'rgb(10, 150, 10)';
    }
    return 'green';
  }
  OnClick(){
    setTimeout(() => {
      let moves = this.FindMoves();
      if(moves.length == 0){
        if(this.changedTurn == false){
          this.colorHasTurn == 'black' ? this.colorHasTurn = 'white' : this.colorHasTurn = 'black';
          this.changedTurn = true;
          this.OnClick();
        }else{
          this.ShowWinner();
        }
      }
      if(this.colorHasTurn == this.aiColor){
        this.Ai();
        this.OnClick();
      }
    }, 1);
  }
  FindMoves(): number[][]{
    let moves: number[][] = [];
    for (let i = 0; i < this.amountOfBlocks; i++) {
      for (let j = 0; j < this.amountOfBlocks; j++) {
        if(this.CanAddBlock(i, j)){
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }
  Ai(){
    
  }
  ShowWinner(){
    if(this.changedTurn){
      this.showWinner = true;
      if(this.blackBlocks > this.whiteBlocks){
        this.finishText = 'Czarny wygra??';
      }else if(this.whiteBlocks > this.blackBlocks){
        this.finishText = 'Bia??y wygra??';
      }else{
        this.finishText = 'Remis';
      }
    }else{
      this.changedTurn = true;
    }
  }
  ChangeColor(){
    this.colorHasTurn == 'black' ? this.colorHasTurn = 'white':this.colorHasTurn = 'black';
  }
}