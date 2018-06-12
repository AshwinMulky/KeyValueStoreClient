import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private http: Http) { }
  confirmationString: string = "";
  isAdded: boolean = false;
  keyValueObj: object = {};

  addNewKeyValue = function (keyValue) {
    this.isAdded = false;
    this.keyValueObj = {
      "key": keyValue.key,
      "value": keyValue.value
    }
    this.http.post("http://localhost:8080/api/key-values", this.keyValueObj).subscribe((res: Response) => {
      this.confirmationString = "KeyValue(" + this.keyValueObj.key + ", " + this.keyValueObj.value + ") has been added/updated. ";
      this.isAdded = true;
    })
  }

  ngOnInit() {
  }

}
