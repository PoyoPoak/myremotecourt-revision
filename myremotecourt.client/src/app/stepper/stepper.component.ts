import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Step {
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep: number = 0;
  @Output() stepChange = new EventEmitter<number>();

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStep = index;
      this.stepChange.emit(index);
    }
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.stepChange.emit(this.currentStep);
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepChange.emit(this.currentStep);
    }
  }

  isStepCompleted(index: number): boolean {
    return this.steps[index]?.completed || false;
  }

  isStepActive(index: number): boolean {
    return this.currentStep === index;
  }

  canGoToStep(index: number): boolean {
    // Allow navigation to previous steps or next step if current is completed
    return index <= this.currentStep || this.isStepCompleted(this.currentStep);
  }

  isNextDisabled(): boolean {
    return this.currentStep === this.steps.length - 1 || !this.isStepCompleted(this.currentStep);
  }
}
