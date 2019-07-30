import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import { SupplierService } from '../../services/supplier.service';
import { MatDialogRef } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: "app-create-supplier",
    templateUrl: "./createSupplier.component.html",
    styleUrls: ["./createSupplier.component.scss"]
})
export class CreateSupplierComponent implements OnInit {
    title = "Create New Supplier";
    registerForm: FormGroup;
    supplierName = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[א-תa-zA-Z0-9_-\\s]*")
    ]);
    email = new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(EMAIL_REGEX)
    ]);
    address = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[א-תa-zA-Z0-9_-\\s]*")
    ]);
    phoneNumber = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[0-9_-\\s]*")
    ]);

    date = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[a-zA-Z0-9_-\\s]*")
    ]);

    id = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[a-zA-Z0-9_-\\s]*")
    ]);

    payment = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[a-zA-Z0-9_-\\s]*")
    ]);

    constructor(
        private formBuilder: FormBuilder,
        public toast: ToastComponent,
        private supplierService: SupplierService,
        public dialogRef: MatDialogRef<CreateSupplierComponent>
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            supplierName: this.supplierName,
            email: this.email,
            address: this.address,
            phoneNumber: this.phoneNumber,
            invoiceScheme: this.formBuilder.group({
                date: this.date,
                id: this.id,
                payment: this.payment
            })
        });
    }

    register() {
        this.supplierService.addSupplier(this.registerForm.value).subscribe(
            res => {
                this.toast.open("you successfully added new supplier!", "success");
            },
            error => this.toast.open("failed to add new supplier", "danger")
        );
        this.onClose();
    }

    onClose() {
        this.dialogRef.close();
    }
}
