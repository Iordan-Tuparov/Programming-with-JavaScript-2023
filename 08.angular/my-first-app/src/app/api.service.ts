import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSomeThing(clientGet: string) {
    return this.http.get(this.baseUrl + clientGet);
  }
}
