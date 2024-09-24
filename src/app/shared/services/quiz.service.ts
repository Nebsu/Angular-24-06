import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: any[] = [];
  playerAnswers: {questionId: number; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';
  categoryId: number = 0;
  categoryLabel: string = '';
  private quizLoaded: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  getNameCategory(){
    // recupérer le nom de la catégorie en fonctipon de l'id avec une requete
    this.http.get('http://localhost:3000/categories').subscribe((categories: any) => {
      for (const category of categories) {
        if(this.categoryId == category.id){
          console.log(category.categoryLabel);
          this.categoryLabel = category.categoryLabel;
          return category.categoryLabel;
        }
      }
    });
  }

  getQuizContent() {
    if (this.quizLoaded) return;
    this.http.get('http://localhost:3000/questions').subscribe((questions: any) => {
      for (const question of questions) {
        this.http.get(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers: any) => {
          console.log(this.categoryId);
          if(this.categoryId == question.categoryId){
            this.quizContent.push({
                id: question.id,
                question: question.questionLabel,
                categoryId : question.categoryId,
                answers
            });
          }
        });
      }
      this.quizLoaded = true;
    });
  }

  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
    this.quizLoaded = false;
  }
}
