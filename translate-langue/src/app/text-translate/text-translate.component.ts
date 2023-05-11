import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-text-translate',
  templateUrl: './text-translate.component.html',
  styleUrls: ['./text-translate.component.css']
})
export class TextTranslateComponent {

  userText: string;
  currentTranslation;

  constructor(private translateSvc: TranslateService) { }

  handleTranslation() {
    this.currentTranslation = this.translateSvc.createTranslation(this.userText)
  }

  defaultMessage() {
    if (!this.currentTranslation) return "Enter text and click run translation"
    else return "Running translation in the cloud..."
  }
}
