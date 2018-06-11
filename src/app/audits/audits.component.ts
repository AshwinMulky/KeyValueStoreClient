import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent implements OnInit {

  audits = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData = function () {
    this.http.get("http://localhost:8080/api/audits")
      .subscribe((res: Response) => {
        this.audits = res.json();
      }
      )
  }

  filter = function (data) {
    this.http.get(`${"http://localhost:8080/api/audits"}/${data}`)
      .subscribe((res: Response) => {
        this.audits = res.json();
      }
      )
  }

}
