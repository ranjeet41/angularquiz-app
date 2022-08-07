import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionserviceService } from '../service/questionservice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionlist: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter :number= 60;
  correctAnswar: number = 0;
  inCorrectAnswar: number = 0;
  selectdOption:boolean = true;
  interval$: any;
  progress: string = '0';
  isQuizCompleted :boolean = false;
  constructor(private questionService: QuestionserviceService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestion();
    this.startCounter();
  }

  getAllQuestion() {
    this.questionService.getquestionjson().subscribe(res => {
      this.questionlist = res.questions;
      console.log(res.questions)

    })
  }
  // getAllQuestion() {
  //   this.questionService.getquestionApi().subscribe(res => {
  //     this.questionlist = res;
  //     console.log(res)

  //   })
  // }
  nextQuquestion() {
    this.currentQuestion++;
    this.resetCounter()
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answar(currentQno: number, option: any) {
    if (currentQno === this.questionlist.length-1) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswar++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getprogresspercent();
      }, 1000)

    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswar++;
        this.resetCounter();
        this.getprogresspercent();
      })
      if(this.points>0){
        this.points -= 10;
      }
      
    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    })
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 60000)
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0
    this.progress = '0';
  }

  getprogresspercent() {
    this.progress = ((this.currentQuestion / this.questionlist.length) * 100).toString();
    return this.progress;
  }
}
