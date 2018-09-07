import { Component, OnInit } from '@angular/core';
import { MentionOnSearchTypes } from 'ng-zorro-antd';


@Component({
  selector: 'app-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.less']
})
export class MentionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  inputValue2: string = 'my site';
  inputValue: string;
  loading = false;
  suggestions = [];

  onSearchChange({value}: MentionOnSearchTypes): void {
    console.log(`search: ${value}`);
    this.loading = true;
    this.fetchSuggestions(value, (suggestions) => {
      console.log(suggestions);
      this.suggestions = suggestions;
      this.loading = false;
    });
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
    setTimeout(() => {
      return callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  }
  searchZQ(){
  	console.log(this.inputValue2);
  }
}
