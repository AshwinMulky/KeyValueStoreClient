import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }
  id: number;
  disableDeleteAll: boolean;
  currentKey: string;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  keyValues = [];
  fetchData = function () {
    this.http.get("http://localhost:8080/api/key-values")
      .subscribe((res: Response) => {
        this.keyValues = res.json();
        this.disableDeleteAll = false;
        if(this.keyValues.length < 1){
          this.disableDeleteAll = true;
        }
      }
      )
  }

  delete = function (id) {
      const url = `${"http://localhost:8080/api/key-values/keys"}/${id}`;
      return this.http.delete(url, { headers: this.headers }).toPromise()
        .then(() => {
          this.fetchData();
        })
  }

  deleteAll = function () {
      const url = `${"http://localhost:8080/api/key-values"}`;
      return this.http.delete(url, { headers: this.headers }).toPromise()
        .then(() => {
          this.fetchData();
        })
  }

  setKey = function(key) {
    this.currentKey = key;
  }

  ngOnInit() {
    this.fetchData();
  }
}
