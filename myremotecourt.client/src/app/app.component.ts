import { Component, OnInit } from '@angular/core';
import { Step } from './stepper/stepper.component';
import { CourtCaseResponse, CourtCaseService } from './services/court-cases.service';

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
  errorMessage = '';

  steps: Step[] = [
    { label: 'Enter Case Number', completed: false },
    { label: 'Verify Case Details', completed: false },
    { label: 'Eligibility Result', completed: false }
  ];

  onStepChange(stepIndex: number): void {
    this.currentStep = stepIndex;
    console.log('Step changed to:', stepIndex);
  }

  // Initialize CourtCaseService and inject it
  constructor(private courtCaseService: CourtCaseService) { }

  // Step 1: Search for case by case/citation number and last name
  searchCase(): void {
    // Ensure case number and last name are provided
    if (this.caseNumber.trim() && this.lastName.trim()) {
      // Call the backend API to fetch case details
      this.courtCaseService.getCaseByCaseNumber(this.caseNumber, this.lastName).subscribe({
        next: (response: CourtCaseResponse) => { // Handle successful response
          this.caseData = { // Map response to CaseData interface
            caseNumber: response.caseNumber,
            fullName: response.fullName,
            caseType: response.caseType || 'N/A',
            hearingType: response.hearingType || 'N/A',
            hearingDate: response.hearingDate || 'N/A',
            location: response.location || 'N/A'
          };
          this.steps[0].completed = true; // Mark step 1 as completed
          this.currentStep = 1; // Move to confirmation step
        },
        error: (err) => { // Err handling
          console.error('Error fetching case data:', err);
          if (err.status === 404) { // Not found
            this.errorMessage = 'Case Not Found';
          } else { // Anything else, generalizing for MVP
            alert('Unexpected Error');
          }
        }
      });
    }
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
    this.errorMessage = '';
  }

  // Step 3: Check eligibility based on hearing type
  checkEligibility(): void {
    if (this.caseData) {
      // Determine eligibility based on hearing type
      this.isEligible = this.caseData.hearingType.toLowerCase().includes('traffic');
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
