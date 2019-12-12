import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  userInfo = {
    companyId: '',
  };
  noticeInfo = {
    id: 0,
    Title: "",
    NewsAuthor: "",
    NewsContent: "",
    CreationTime: ""
  };
  listType = 0;
  title = "";
  loading = false;

  constructor(public nav: NavController,
    public route: ActivatedRoute,
    public service: MainService,
    public storage: Storage,
    public sanitizer: DomSanitizer
  ) {
    this.userInfo.companyId = localStorage.getItem("companyid");
  }

  ngOnInit() {

    this.route.queryParams.subscribe((data) => {
      this.noticeInfo.id = data.id;

      if (this.noticeInfo.id > 0) {
        this.getDetail();
      }
    });


  }
  getDetail() {

    this.service.getDetail({
      id: this.noticeInfo.id
    }).subscribe(res => {
      if (res.isSuccess) {
        this.noticeInfo.Title = res.data.title;
        this.noticeInfo.NewsAuthor = res.data.newsAuthor;
        this.noticeInfo.NewsContent = res.data.newsContent;
        this.noticeInfo.CreationTime = res.data.creationTime;
      }
      console.log(this.noticeInfo)
    })
  }
  ngOnDestroy() {
    this.userInfo = {
      companyId: '',
    };
    this.noticeInfo = {
      id: 0,
      Title: "",
      NewsAuthor: "",
      NewsContent: "",
      CreationTime: ""
    };
  }
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }


  viewList() {
    this.nav.navigateForward(['/home/main'], {
      queryParams: {

      }
    });
  }
}
