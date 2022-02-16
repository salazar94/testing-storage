import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesResponse } from 'src/app/shared/interfaces/data-tables-response';
import { LANGUAGE } from 'src/app/lang/es_MX';

@Component({
  selector: 'app-datatable',
  templateUrl: './dadatable.component.html',
  styleUrls: ['./dadatable.component.css']
})
export class DatatableComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: true })
  private datatableElement: DataTableDirective;

  @Input() order?: any = [[0, 'desc']];
  @Input() searchQuery?: any = {};
  @Input() columns: any[];
  @Input() ajaxURI: string;
  @Input() dtOptions?: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.dtOptions) {
      this.dtOptions  = {
        pagingType: 'full_numbers',
        order: this.order,
        serverSide: true,
        processing: true,
        ajax: this.ajax,
        columns:  this.columns,
        responsive: true,
        language: LANGUAGE.datatables
      };
    }
  }

  get ajax() {
    return (dataTablesParameters: any, callback) => {
      dataTablesParameters.searchQuery = this.searchQuery;
      this.http.post<DataTablesResponse>(
        `${environment.endpoint}api/${this.ajaxURI}/datatable`,
        dataTablesParameters
        ).subscribe(response => {
          callback({
            recordsTotal: response.recordsTotal,
            recordsFiltered: response.recordsFiltered,
            data: response.data
          });
        });
    };
  }

  reload(searchQuery = {}) {
    this.searchQuery = searchQuery;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
