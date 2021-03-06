import Invoice from '../models/invoice';
import Supplier from '../models/supplier';
import User from '../models/user';
import {modelTypeEnum} from '../commons/consts/enums';


abstract class SearchCtrl {
    model: any;
    retVal: any;

    // Get all
    groupBy = async (modelType, userName, groupParameter) => {
        console.log('userName: ',userName);
        console.log('modelType: ',modelType);
        console.log('groupParameter: ', groupParameter);

        switch (modelType) {
            case modelTypeEnum.INVOICE: {
                this.model = Invoice;
                break;
            }
            case modelTypeEnum.SUPPLIER: {
                this.model = Supplier;
                break;
            }
            case modelTypeEnum.USER: {
                this.model = User;
                break;
            }
        }

        const docs = await this.model.aggregate(
            // { $match: { username: userName } },
            {
                $group: {
                    _id: `$${groupParameter}`, // grouping key - group by field district
                    totalPayment: { $sum: { $multiply: [ "$totalPayment" ] } },
                    totalInvoices: {$sum: 1}
                }
            }
        );

        this.setRetVal(docs);

        return this.retVal;
    }

    setRetVal = function (data) {
        console.log('retVal: ', data);

        this.retVal = data;
    };
}


export default SearchCtrl;
