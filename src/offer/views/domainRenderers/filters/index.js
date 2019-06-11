import EnumBasedDropdownFilter from "./EnumBasedDropdownFilter.js";
import BankFilterDropdown from "./BankFilterDropdown.js";
import * as Domains from "../../../domain/filters/index.js";

export const CardCategoryFilterRenderer = {
    renderer: EnumBasedDropdownFilter,
    domain: Domains.CardCategoryFilterableDomain,
    props: {
        title: "Card Categories",
        imageClassName: "symbolCardCategories"
    }
};
export const CardFeeTypeFilterRenderer = {
    renderer: EnumBasedDropdownFilter,
    domain: Domains.CardFeeTypeFilterableDomain,
    props: {
        title: "Card Fee Type",
        imageClassName: "symbolCardFeeType"
    }
};

export const CardNetworkFilterRenderer = {
    renderer: EnumBasedDropdownFilter,
    domain: Domains.CardNetworkFilterableDomain,
    props: {
        title: "Card Network",
        imageClassName: "symbolCardNetwork"
    }
};

export const BankFilterRenderer = {
    renderer: BankFilterDropdown,
    domain: Domains.BankFilterableDomain,
    props:{
        title: "Bank",
        imageClassName: "symbolBank"
    }
};