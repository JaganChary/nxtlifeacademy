import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CategoriesService } from '../../categories.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  image: any;
  courseId: any;
  id: number;
  category: any;
  categoryData: any;
  categoryId: number;
  file: any;
  addORedit: String;
  courseData: any;
  addCourseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router

  ) { }

  ngOnInit() {

    this.getCategoryId();

    this.initForm();

    this.fromServer();
  }

  // Array of categories and their information received via sa/categories url

  fromServer(): any {
    this.categoriesService.getSaCategories()
      .subscribe((res: any) => {
        this.categoryData = res.data;
        console.log(res.data);

        // Object of CategoryData received according to the category the superAdmin Selected

        this.categoriesService.storeCategoriesData(res.data);
        this.id = +this.route.snapshot.paramMap.get('id');
        this.category = this.categoriesService.getCategoryDataById(this.id);

      }, (err: any) => {
        console.log(err);
      })
  }

  // Retrieving Category Id from Route Snapshot

  getCategoryId(): any {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
  }

  // Validations for input boxes

  initForm(): any {

    this.courseData = this.coursesService.getCourseData();

    if (this.courseData === undefined) {

      this.router.navigate(['/main/category']);
    } else {
      this.courseId = this.courseData.courseId;
      this.addORedit = this.coursesService.getAction();

      if (this.addORedit === 'Add') {

        this.addCourseForm = this.formBuilder.group({

          courseName: ['', Validators.required],

          courseDescription: ['', Validators.required],

          courseCost: ['', Validators.required],

        })
      } else if (this.addORedit === 'Edit') {

        this.addCourseForm = this.formBuilder.group({

          courseName: [this.courseData.course, Validators.required],

          courseDescription: [this.courseData.description, Validators.required],

          courseCost: [this.courseData.cost, Validators.required],

          courseImage: [this.courseData.image]

        })

        this.image = this.addCourseForm.controls.courseImage.value;
      }
    }
  }

  // Uploading File

  fileUpload(e: any): any {

    if (!e.target.files[0]) {
      
      return;
    } else {

      this.file = e.target.files[0];
      console.log(this.file);
      if (e.target.files || e.target.files[0]) {

        var reader = new FileReader();

        reader.readAsDataURL(this.file);

        reader.onload = (e: any) => {
          this.image = e.target.result;
        }
      }
    }
  }

  // Submitting Form
  btnClick(): any {

    let formData = new FormData();

    formData.append('course', this.addCourseForm.value.courseName);
    formData.append('description', this.addCourseForm.value.courseDescription);
    formData.append('cost', this.addCourseForm.value.courseCost)
    formData.append('imageFile', this.file);

    if (this.addORedit === 'Add') {

      this.coursesService.postCourses(formData, this.categoryId)
        .subscribe((res: any) => {
          console.log(res);
          alertify.success('Course Added');
          this.router.navigate(['/main/category']);
        }, (err: any) => {
          alertify.alert(err.msg).setHeader('Message');
          console.log(err);
        })
    } else if (this.addORedit === 'Edit') {

      this.coursesService.editCourses(formData, this.courseId)
        .subscribe((res: any) => {
          console.log(res);
          alertify.success('Course Updated');
          this.router.navigate(['/main/category']);
        }, (err: any) => {
          alertify.alert(err.msg).setHeader('Message');
          console.log(err);
        })
    }
  }
}
