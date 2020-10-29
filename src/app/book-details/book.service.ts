import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  saveBook(BookData){
    return this.http.post('http://localhost:59729/api/books',BookData);
  }

  UpdateBook(BookData){
    return this.http.put('http://localhost:59729/api/books',BookData);
  }

  GetAllBook(){
    return this.http.get('http://localhost:59729/api/books');
  }

  getBookbyId(bookid){
    return this.http.get('http://localhost:59729/api/books'+bookid);
  }

  deleteBook(bookid){
    return this.http.delete('http://localhost:59729/api/books'+bookid);
  }

}
