import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalQuery } from 'src/app/common/state/global/state.query';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  protected loading: boolean = false;

  constructor(
    private readonly globalQuery: GlobalQuery,
  ) { }

  ngOnInit(): void {
    this.globalQuery.getLoading()
      .subscribe({
        next: (value: boolean) => {
          this.loading = value;
        }
      })
  }

}
