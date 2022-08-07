import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { QuestionserviceService } from '../service/questionservice.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  constructor(private httpClient:HttpClient) { }
 
  ngOnInit(): void {
  }

}
