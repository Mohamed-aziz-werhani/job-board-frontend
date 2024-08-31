import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {

  @ViewChild('companyName') companyName!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CompanyFormComponent>,
    private readonly companiesService: CompaniesService,
  ) { }

  onNoClick(): void {
    this.companiesService.POST({ name: this.companyName.nativeElement.value })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.dialogRef.close();
        }
      })
  }

}
