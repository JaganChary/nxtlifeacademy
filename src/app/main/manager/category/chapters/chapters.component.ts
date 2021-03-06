import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  chapters: any;
  courses: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    if (this.categoryService.categoriesData == null || this.categoryService.categoriesData == undefined) {
      this.getDataFromServer();

    } else {
      this.getDataDirectly();
    }

  }

  // Retreive data from server

  getDataFromServer(): any {
    this.progressBarService.startProgressBar();

    this.categoryService.getManagerTasks()
      .subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        this.categoryService.storeCategoryData(res.data);
        const id = +this.route.snapshot.paramMap.get('id');
        this.courses = this.categoryService.getCourseDataByID(id);
        console.log(this.courses);
        this.chapters = this.courses.chapters;
        console.log(this.chapters);
        
      }, (err: any) => {

        this.progressBarService.endProgressBar();
        alertify.alert(err.msg).setHeader('Error Message');
        console.log(err);
      });
  }

  // Retrieve data directly

  getDataDirectly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courses = this.categoryService.getCourseDataByID(id);
    console.log(this.courses);

    this.chapters = this.courses.chapters;
    console.log(this.chapters);
  }

}
  