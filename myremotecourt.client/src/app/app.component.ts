import { Component, OnInit } from '@angular/core';
import { Step } from './stepper/stepper.component';

interface CaseData {
  caseNumber: string;
  fullName: string;
  caseType: string;
  hearingType: string;
  hearingDate: string;
  location: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'myremotecourt.client';
  currentStep = 0;
  caseNumber = '';
  lastName = '';
  caseData: CaseData | null = null;
  isEligible: boolean | null = null;
  caseConfirmed = false;

  steps: Step[] = [
    { label: 'Enter Case Number', completed: false },
    { label: 'Verify Case Details', completed: false },
    { label: 'Eligibility Result', completed: false }
  ];

  onStepChange(stepIndex: number): void {
    this.currentStep = stepIndex;
    console.log('Step changed to:', stepIndex);
  }

  // Step 1: Search for case by case/citation number and last name
  searchCase(): void {
    if (this.caseNumber.trim() && this.lastName.trim()) {
      // TODO: Call API to fetch case data
      // For now, simulate API response
      this.simulateCaseLookup();
    }
  }

  simulateCaseLookup(): void {
    // Simulate API call - replace with actual API call later
    setTimeout(() => {
      // Mock case data
      this.caseData = {
        caseNumber: this.caseNumber,
        fullName: 'John Doe',
        caseType: 'Traffic',
        hearingType: 'Traffic Arraignment',
        hearingDate: '2025-02-15',
        location: 'Orange County Justice Center'
      };
      this.steps[0].completed = true;
      this.currentStep = 1;
    }, 500);
  }

  // Step 2: Confirm case details
  confirmCase(isCorrect: boolean): void {
    if (isCorrect) {
      this.caseConfirmed = true;
      this.checkEligibility();
      this.steps[1].completed = true;
      this.currentStep = 2;
    } else {
      // Reset and allow user to search again
      this.resetSearch();
    }
  }

  resetSearch(): void {
    this.caseNumber = '';
    this.lastName = '';
    this.caseData = null;
    this.caseConfirmed = false;
    this.isEligible = null;
    this.currentStep = 0;
    this.steps.forEach(step => step.completed = false);
  }

  // Step 3: Check eligibility based on hearing type
  checkEligibility(): void {
    if (this.caseData) {
      // Determine eligibility based on hearing type
      // Traffic Arraignment = Eligible
      // Court Trial = Ineligible
      this.isEligible = this.caseData.hearingType.toLowerCase().includes('arraignment');
      this.steps[2].completed = true;
    }
  }

  requestRemoteAppearance(): void {
    // TODO: Navigate to request form or open modal
    console.log('Requesting remote appearance for case:', this.caseNumber);
  }

  getDirections(): void {
    // Open Google Maps to the court location
    if (this.caseData?.location) {
      const address = encodeURIComponent(this.caseData.location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
  }
}
