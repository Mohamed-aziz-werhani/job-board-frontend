import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from 'src/app/common/constants';
import { GlobalQuery } from 'src/app/common/state/global/state.query';
import { GlobalStore } from 'src/app/common/state/global/state.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // local property to track the global action mode for the application
  // This is used to decide what button to display at the bottom right corner
  protected globalActionMode: string = 'add';

  constructor(
    private readonly router: Router,
    private readonly globalStore: GlobalStore,
    private readonly globalQuery: GlobalQuery,
  ) { }

  ngOnInit(): void {
    this.trackGlobalActionMode();
  }

  trackGlobalActionMode() {
    this.globalQuery.getGlobalActionMode()
      .subscribe({
        next: (actionMode) => {
          this.globalActionMode = actionMode;
        }
      })
  }

  onAddNewJob() {
    // change button to edit
    this.globalStore.update({ globalActionMode: 'edit' });

    // navigate
    this.router.navigate([APPLICATION_ROUTES.jobs.root, '0']);
    this.globalStore.update({ localActionMode: 'edit' });
  }

}
