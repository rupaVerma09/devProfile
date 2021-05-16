import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild, 
  OnInit} from '@angular/core';
// import { Highcharts } from 'highcharts/modules/map';
import * as Highcharts from "highcharts";



@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.css']
})
export class PageTwoComponent implements OnInit {
  chartData = [];
  @ViewChild('charts') public chartEl: ElementRef;
 
  regions ={};

        data:any = [];

        defaultOptions:any = {
            chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
            },
            title: {
            text: 'population according to regions'
            },
            tooltip: {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y} ',
                  style: {
                      color: 'black'
                  }
              },
              showInLegend: true
            }
            },
            series: [{
            name: 'Brands',
            colorByPoint: true,
            data: []
            }]
}
  mysubObj: any;
  someTimeOut: any;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getData();
}

getData(){
  const header = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-rapidapi-key', 'd53be3ceb4mshc25909855034c5ap1066cfjsnaf423c980fa5')
  .set('x-rapidapi-host', 'restcountries-v1.p.rapidapi.com')
  ;
  this.someTimeOut = setTimeout(()=>{
  this.mysubObj = this.http.get("https://restcountries-v1.p.rapidapi.com/all", {headers:header})
  .subscribe((responseData)=>{
       //timeout
       
        let Mydata:any = responseData;
        let regions:any= [];
        for(let i=0; i<Mydata.length; i++){
         regions.push(Mydata[i].region);
        }
        let uniqueRegion=regions.map(item => item)
        .filter((value, index, self) => self.indexOf(value) === index);
        let regionPopulation:any= [];
        for(let i=0; i<uniqueRegion.length; i++){
          regionPopulation.push(0) ;
        }
        for(let i=0; i<uniqueRegion.length; i++){         
         for(let j=0; j<Mydata.length; j++){
          if(uniqueRegion[i]===Mydata[j].region){
            regionPopulation[i] += Mydata[j].population;         
          }   
         }
        }
        uniqueRegion.pop();
        this.data =[];
        for(let i=0; i<uniqueRegion.length; i++){
          this.data.push({
            'name': uniqueRegion[i],
            'y' :  regionPopulation[i]     
           })
        }
        this.createChart();
      
  })
},6000);
}

  createChart() {
    this.defaultOptions.series[0].data = this.data;
    let e = document.createElement("div");
  
    this.chartEl.nativeElement.appendChild(e);
    Highcharts.chart(this.chartEl.nativeElement, this.defaultOptions);
  }
  
  cancel(){
    if(this.mysubObj){
      this.mysubObj.unsubscribe();
    }
    if(this.someTimeOut){
      clearTimeout(this.someTimeOut);
    }
  }

  getPiData(){
    this.getData();
  }
}



