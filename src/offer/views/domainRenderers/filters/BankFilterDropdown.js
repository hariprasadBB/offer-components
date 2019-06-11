//@flow
import DropdownFilter from "./DropdownFilter.js";
import Bank from "../../../domain/Bank.js";

export default class BankFilterRenderer extends DropdownFilter {
    getValue(domain: Bank) {
        return domain.getId();
    }

    getLabel(domain: Bank) {
        return domain.getName();
    }

    getTitle() {
        return "Bank";
    }
}