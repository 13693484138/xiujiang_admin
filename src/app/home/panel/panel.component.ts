import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  panels = [
    {
      active    : true,
      name      : 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name  : 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name  : 'This is panel header 2'
    },
    {
      active: false,
      name  : 'This is panel header 3'
    }
  ];
}
