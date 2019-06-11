//@flow
import DropdownFilter from "./DropdownFilter.js";
import {EnumDomain} from "../../../domain/Enum.js";

export default class EnumBasedDropdownFilterRenderer extends DropdownFilter {
    getValue(domain: EnumDomain<any>) {
        return domain.getValue();
    }

    getLabel(domain: EnumDomain<any>) {
        return domain.getValue();
    }
}