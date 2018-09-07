import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
  index1 = 0;
  index2 = 0;
  gridStyle = {
    width    : '25%',
    textAlign: 'center'
  };
  constructor() { }


  ngOnInit() {

  }
  tabs = [ 'tab1','app','project'];

  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }
}
