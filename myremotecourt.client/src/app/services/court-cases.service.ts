import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// The interface representing the structure of a court case response from the API
export interface CourtCaseResponse {
  caseNumber: string;
  fullName: string;
  caseType: string | null;
  hearingType: string | null;
  hearingDate: string | null;
  location: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class CourtCaseService {
  private baseUrl = '/api/courtcases';

  constructor(private http: HttpClient) { }

  // GET case by case number, sends request to the backend API
  getCaseByCaseNumber(caseNumber: string, lastName: string): Observable<CourtCaseResponse> {
    let params = new HttpParams();
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    return this.http.get<CourtCaseResponse>(`${this.baseUrl}/${caseNumber}`, { params });
  }
}
