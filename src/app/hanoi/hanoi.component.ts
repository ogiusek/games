import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.css']
})
export class HanoiComponent implements OnInit {
  replaceHelpValue = -1;
  pucksHeight = 0;
  public pucksAmount = 8;
  pucks = [
    [0],
    [],
    []
  ];
  GetBackgroundColor(number:number){
    let colors = [
      'darkcyan',
      'blue',
      'red',
      'darkgoldenrod',
      'white',
      'brown',
      'yellow',
      'green'
    ];
    for (let index = colors.length; index > 0; index--) {
      if(number % index == 0){
        return colors[index - 1];
      }
    }
    return 'yellow';
  }
  PlayerReplace(stick:number){
    if(this.replaceHelpValue != -1){
      this.Replace(this.replaceHelpValue, stick);
      this.replaceHelpValue = -1;
    }else{
      this.replaceHelpValue = stick;
    }
  }
  Replace(fromStick:number, toStick:number){
    if (this.pucks[toStick].length == 0){
      this.pucks[toStick].push(this.pucks[fromStick][this.pucks[fromStick].length - 1]);
      this.pucks[fromStick].pop();
    }else if(this.pucks[fromStick][this.pucks[fromStick].length - 1] < this.pucks[toStick][this.pucks[toStick].length - 1]){
      this.pucks[toStick].push(this.pucks[fromStick][this.pucks[fromStick].length - 1]);
      this.pucks[fromStick].pop();
    }
  }
  Ai(puck:number, toStick:number){
    var fromStick = -1;
    var lastStick = -1;
    for (let index = 0; index < this.pucks.length; index++){ 
      var founded = false;
      for(let i = 0; i < this.pucks[index].length; i++){
        if(this.pucks[index][i] == puck){
          founded = true;
          break;
        }
      }
      if(founded){
        fromStick = index;
        break;
      }
    }
    for (let index = 0; index < this.pucks.length; index++) {
      if(index != fromStick && index != toStick){
        lastStick = index;
        break;
      }
    }
    if(puck != 1){
      if(fromStick == toStick){
        this.Ai(puck - 1, fromStick);
      }else{
        if(this.LastValue(fromStick) == puck){
          if (this.pucks[toStick].length == 0 ){
            this.Replace(fromStick, toStick);
          }else if(puck < this.LastValue(toStick)){
            this.Replace(fromStick, toStick);
          }else{
            this.Ai(puck - 1, lastStick);
          }
        }else{
          this.Ai(puck - 1, lastStick);
        }
      }
    }else if(this.LastValue(fromStick) == puck){
      this.Replace(fromStick, toStick);
    }
  }
  LastValue(stick:number){
    return this.pucks[stick][this.pucks[stick].length - 1];
  }
  constructor() { }

  ngOnInit(): void {
    this.pucks[0].pop()
    for (let index = this.pucksAmount; index > 0; index--) {
      this.pucks[0].push(index);
    }
    this.pucksHeight = this.pucksHeight / this.pucksAmount;
  }

}