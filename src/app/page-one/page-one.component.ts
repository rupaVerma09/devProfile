import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {
countryData:any=[];
sno:number;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const header = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('x-rapidapi-key', 'd53be3ceb4mshc25909855034c5ap1066cfjsnaf423c980fa5')
    .set('x-rapidapi-host', 'restcountries-v1.p.rapidapi.com')
    ;

    this.http.get("https://restcountries-v1.p.rapidapi.com/all", {headers:header})
    .subscribe((responseData)=>{
          this.countryData = responseData;
    })
    
  }

}
