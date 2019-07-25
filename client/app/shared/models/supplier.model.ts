export class Supplier {
    _id: string;
    supplierName: String;
    address: String;
    phoneNumber: Number;
    faxNumber: Number;
    email: String;
    createdAt: Date;
    invoiceScheme: { date:[String],id:[String],
        payment:[String]}
}
