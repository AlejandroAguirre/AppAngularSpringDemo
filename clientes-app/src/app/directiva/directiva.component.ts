import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-directiva',
    templateUrl: './directiva.component.html',
    standalone: true,
    imports: [NgIf, NgFor],
})
export class DirectivaComponent {
  listaCurso:string []=['C#','TypeScript','JavaScript','Java','Gradle'];
  habilita:boolean =true

  constructor() { }

  setHbilitar(){
    this.habilita=(this.habilita==true)?false:true
  }

}
