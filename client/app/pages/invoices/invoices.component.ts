import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Invoice} from '../../shared/models/invoice.model';
import {ConfirmationDialogComponent} from '../../shared/confirm/confirmation-dialog';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {InvoiceService} from '../../services/invoice.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {

  title = 'My Invoices';
  invoices: Invoice[] = [];
  isLoading = true;
  displayedColumns = ['username', 'invoiceId', 'supplierName', 'totalPayment', 'createdAt', 'action'];
  dataSource: any;
  filterValues = {
    username: '',
    supplierName: '',
    createdAt: ''
  };

  usernameFilter = new FormControl('');
  supplierNameFilter = new FormControl('');
  createdAtFilter = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      public toast: ToastComponent,
      private invoiceService: InvoiceService,
      public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getInvoices();

    this.usernameFilter.valueChanges
        .subscribe(
            value => {
              this.filterValues.username = value;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
        );
    this.supplierNameFilter.valueChanges
        .subscribe(
            value => {
              this.filterValues.createdAt = value;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
        );
    this.createdAtFilter.valueChanges
        .subscribe(
            value => {
              this.filterValues.createdAt = value;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
        );
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let flag = true;
      Object.keys(searchTerms).forEach(function (key) {
        if (searchTerms[key] !== '') {
          if (!data[key] || data[key].toString().indexOf(searchTerms[key]) === -1) {
            flag = false;
          }
        }
      });
      return flag;
    };

    return filterFunction;
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
        data => {
          this.invoices = data;
          this.dataSource = new MatTableDataSource<Invoice>(this.invoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilter();
        },
        error => console.log(error),
        () => this.isLoading = false
    );
  }

  deleteInvoice(invoice: Invoice) {
    var dialogRef = this.dialog.open(ConfirmationDialogComponent, {disableClose: false});
    dialogRef.componentInstance.title = 'Delete User';
    dialogRef.componentInstance.message = 'Are you sure you want to delete ' + invoice.invoiceId + '?';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invoiceService.deleteInvoice(invoice).subscribe(
            data => this.toast.open('invoice deleted successfully.', 'success'),
            error => this.toast.open('error deleting the invoice', 'danger'),
            () => this.getInvoices()
        );
      }
    });
    
  }
  
  editInvoicer(invoice: Invoice) {
    var dialogRef = this.dialog.open(ConfirmationDialogComponent, {disableClose: false});
    dialogRef.componentInstance.title = 'Edit Invoicer';
    dialogRef.componentInstance.message = 'Are you sure you want to edit? ' + invoice.invoiceId + '?';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invoiceService.editInvoice(invoice).subscribe(
            data => this.toast.open('invoice edited successfully.', 'success'),
            error => this.toast.open('error editing the invoice', 'danger'),
            () => this.getInvoices()
        );
      }
    });
  }
}
/*
editInvoicer(invoice: Invoice) {
  this.invoiceService.addInvoicer(this.registerForm.value).subscribe(
      res => {
          this.toast.open('you successfully added new invoice!', 'success');
          this.router.navigate(['/invoices']);
      },
      error => this.toast.open('failed to add new invoice', 'danger')
  );*/