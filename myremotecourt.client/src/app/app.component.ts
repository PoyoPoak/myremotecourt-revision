import { Component, OnInit } from '@angular/core';
import { Step } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'myremotecourt.client';
  currentStep = 0;

  steps: Step[] = [
    { label: 'Personal Info', completed: false },
    { label: 'Case Details', completed: false },
    { label: 'Review', completed: false }
  ];

  onStepChange(stepIndex: number): void {
    this.currentStep = stepIndex;
    console.log('Step changed to:', stepIndex);
  }
}
