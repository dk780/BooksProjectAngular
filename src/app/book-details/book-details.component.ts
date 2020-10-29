import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from './book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookForm: FormGroup;
  bookList;
  bookid;
  btnSave = "Save";

  constructor(private fb: FormBuilder, private http: HttpClient,
    private bookservice: BookService) { }

  ngOnInit(): void {

    this.bookForm = this.fb.group({
      Name: [''],
      Price: [''],
      Category: [''],
      Author: ['']

    });
    this.GetBookData();
  }
  OnSubmit(){
    if(this.bookid && this.bookid > 0){
      const bookdtataforupdate = { id: this.bookid, Name: this.bookForm.controls.Name.value,
        Price: this.bookForm.controls.value,
        Category: this.bookForm.controls.value,
        Author: this.bookForm.controls.value 

      };
      this.bookservice.UpdateBook(bookdtataforupdate).subscribe(data => {
        this.GetBookData();
        this.bookForm.reset();
      });
    }else{
      this.bookservice.saveBook(this.bookForm.value).subscribe(data => {
        this.GetBookData();
        this.bookForm.reset();
      });
    }

  }


GetBookData(){
  this.bookservice.GetAllBook().subscribe(data => {
    this.bookList = data;
  });
}
edit(id){
  this.bookservice.getBookbyId(id).subscribe(data =>{
    this.btnSave = 'Update';
    this.bookForm.patchValue(data);
  });
}

delete(id){
  this.bookservice.deleteBook(id).subscribe(data => {
    this.GetBookData();
  })
}


}
