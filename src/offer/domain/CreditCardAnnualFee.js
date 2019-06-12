export default class CreditCardAnnualFee {

    constructor(creditCardAnnualFee) {
        this.creditCardAnnualFee = creditCardAnnualFee;
    }

    getCurrentFee() {
        if (this.creditCardAnnualFee!=undefined && this.creditCardAnnualFee.fees != undefined) {
            return this.creditCardAnnualFee.fees.value;
        } 
        return "";
    }

    getOldFees() {
        if (this.creditCardAnnualFee.oldFees != undefined) {
            return this.creditCardAnnualFee.oldFees.value;
        }
        return "";
    }

    getConditionForFee() {
        if (this.creditCardAnnualFee!=undefined) {
            return this.creditCardAnnualFee.conditions;
        } 
        return "";
    }

}