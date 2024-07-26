import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  //styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {
  listaCurso:string []=['C#','TypeScript','JavaScript','Java','Gradle'];
  habilita:boolean =true

  constructor() { }

  setHbilitar(){
    this.habilita=(this.habilita==true)?false:true
  }

}
