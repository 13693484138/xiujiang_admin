import { Component, OnInit } from '@angular/core';
//import * as G2 from '@antv/g2';
import 'zone.js';
import 'reflect-metadata';
import DataSet from '@antv/data-set';
//饼图
const sourceDataB = [
	  { item: '事例一', count: 40 },
	  { item: '事例二', count: 21 },
	  { item: '事例三', count: 17 },
	  { item: '事例四', count: 13 },
	  { item: '事例五', count: 9 }
	];
	
const dv = new DataSet.View().source(sourceDataB);
	dv.transform({
	  type: 'percent',
	  field: 'count',
	  dimension: 'item',
	  as: 'percent'
	});
const dataB=dv.rows;

//柱形图
const sourceDataD = [
  { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
  { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
];
const dvD = new DataSet.View().source(sourceDataD);
dvD.transform({
  type: 'fold',
  fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
  key: '月份',
  value: '月均降雨量',
});
const dataD = dvD.rows;


@Component({
  selector: 'app-antv',
  templateUrl: './antv.component.html',
  styleUrls: ['./antv.component.less']
})
export class AntvComponent implements OnInit {
//
//title = 'app';
//data = {};
//chart ;
//graph;
//constructor() { }
//ngOnInit() {
//  this.chartData();
//}
//chartData() {
//   this.data = [
//    { genre: 'Sports', sold: 275 },
//    { genre: 'Strategy', sold: 115 },
//    { genre: 'Action', sold: 120 },
//    { genre: 'Shooter', sold: 350 },
//    { genre: 'Other', sold: 150 }
//  ];
//   this.chart = new G2.Chart({
//    container: 'c1', // 指定图表容器 ID
//    width : 600, // 指定图表宽度
//    height : 300 // 指定图表高度
//  });
//
//  this.chart.source(this.data);
//  this.chart.interval().position('genre*sold').color('genre');
//  //  渲染图表
//  this.chart.render();
//}
  ngOnInit() {
  }
//折线图
	forceFit: boolean= true;
  height: number = 400;
	data = [
	  { year: '1991', value: 3 },
	  { year: '1992', value: 4 },
	  { year: '1993', value: 3.5 },
	  { year: '1994', value: 5 },
	  { year: '1995', value: 4.9 },
	  { year: '1996', value: 6 },
	  { year: '1997', value: 7 },
	  { year: '1998', value: 9 },
	  { year: '1999', value: 13 },
	];
	
	scale = [{
	  dataKey: 'value',
	  min: 0,
	},{
	  dataKey: 'year',
	  min: 0,
	  max: 1,
	}];

//饼图
  
  forceFitB: boolean = true;
  heightB: number = 400;
  dataB = dataB;
  scaleB = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
  }];
  pieStyle = {
    stroke: "#fff",
    lineWidth: 1
  };
  labelConfig = ['percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + val;
    }
  }];
  
  //
  
  forceFitC: boolean = true;
  heightC: number = 400;
  dataC =[
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];;
  sectorStyle = {
    stroke: "#fff",
    lineWidth: 1,
  };

//柱形图

forceFitD: boolean = true;
  heightD: number = 400;
  dataD = dataD;
  adjust = [{
    type: 'dodge',
    marginRatio: 1 / 32,
  }];
}