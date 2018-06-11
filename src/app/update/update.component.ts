import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id: number;
  data: object = {};
  keyValues = [];
  exist = false;
  confirmationString: string = "";
  isUpdated: boolean = false;
  keyValObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  update(keyVal) {
    this.isUpdated = false;
    this.keyValObj = {
      "key": keyVal.key,
      "value": keyVal.value
    };

    this.http.put("http://localhost:8080/api/key-values", this.keyValObj).subscribe((res: Response) => {
      // this.router.navigate(['/']);
      this.confirmationString = "KeyValue(" + keyVal.key + ", " + keyVal.value + ") has been Updated/Added.";
      this.isUpdated = true;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.http.get(`${"http://localhost:8080/api/key-values/keys"}/${this.id}`).subscribe(
      (res: Response) => {
        this.data = res.json();
        this.exist = true;
      }
    )
  }

}
