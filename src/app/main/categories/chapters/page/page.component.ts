import { Component, OnInit } from '@angular/core';
import { ChaptersService } from '../chapters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  role: string;
  topicId: number;
  template: String;
  recordId: number;
  topic: any;
  
  constructor(
    private chaptersService: ChaptersService,
    private router: Router
  ) { }

  ngOnInit() {

    this.topic = this.chaptersService.getTopic();
    console.log(this.topic);

    if (this.topic) {
      this.topicId = this.topic.topicId;
      this.recordId = this.topic.pages[0].record;
      this.template = this.topic.pages[0].template;

      console.log(`TopicId: ${this.topicId}  RecordId: ${this.recordId} Template: ${this.template}`);

    }

    this.getRecordData();

    this.role = localStorage.getItem('role');

  }

  getRecordData(): any {
    if (this.topic) {
      this.chaptersService.getRecord(this.topicId, this.template, this.recordId)
        .subscribe((res: any) => {
          console.log(res);
        }, (err: any) => {
          console.log(err);
        })
    }
  }

  addPage(): any {
    if (this.topic) {
      this.chaptersService.storeTopicId(this.topicId);
    } 
  }

}
