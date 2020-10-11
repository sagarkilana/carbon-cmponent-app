import { Component, OnInit, Input, Inject } from '@angular/core';
import { PaginationModel } from 'carbon-components-angular';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  @Input() model = new PaginationModel();
  @Input() skeleton = false;
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;

  @Input() get totalDataLength() {
    return this.model.totalDataLength;
  }
  set totalDataLength(value) {
    this.model.totalDataLength = value;
  }
  totalOrders: any[] = []

  constructor() { }


  selectPage(page) {
    this.model.currentPage = page;
  }


  ngOnInit() {
    if (sessionStorage.getItem('totalOrders')) {
      this.totalOrders = JSON.parse(sessionStorage.getItem('totalOrders'))
      this.model.pageLength = 10;
      this.model.currentPage = 1;
      // Set for pagination
      this.model.pageLength = 10;
      this.model.totalDataLength = this.totalOrders.length;
      this.selectPage(1);
    }
  }

}
