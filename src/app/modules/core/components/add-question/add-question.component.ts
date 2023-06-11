import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  wrongLogin: boolean = false;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    const modal = document.querySelector('.modal') as HTMLDialogElement;
    const openModal = document.querySelector('.logout-header-btn');
    const closeModal = document.querySelector('.back-btn');

    openModal?.addEventListener('click', () => {
      modal?.showModal();
    });

    closeModal?.addEventListener('click', () => {
      modal?.close();
    });
  }

  form = new FormGroup({
    question: new FormControl('', [Validators.required]),
    firstanswer: new FormControl('', [Validators.required]),
    secondanswer: new FormControl('', [Validators.required]),
    thirdanswer: new FormControl('', [Validators.required]),
    fourthanswer: new FormControl('', [Validators.required]),
    correctanswer: new FormControl('', [Validators.required]),
  });

  logout(): any {
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('hiddenChat');
    this.router.navigate(['/login']);
  }
}
