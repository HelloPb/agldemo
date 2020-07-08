import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from 'src/app/shared/models';
import { apiUrl } from 'src/app/shared/consts';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  public get(): Observable<People[]> {
    return this.http.get<People[]>( apiUrl + '/people.json');
  }

}
