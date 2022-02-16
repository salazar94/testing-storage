import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.css']
})
export class IndexTableComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  @Input() columns: any[] = [];
  @Input() resource: string = '';
  buttonListener: () => void;

  constructor(private renderer: Renderer2, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buttonListener = this.renderer.listen('document', 'click', (event) => {
      if (event.target.dataset.id && event.target.dataset.action) {
        this.router.navigate(
          [`${event.target.dataset.action}/${event.target.dataset.id}`],
          { relativeTo: this.activatedRoute }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.buttonListener();
  }

  click() {
    alert('click');
  }

}
