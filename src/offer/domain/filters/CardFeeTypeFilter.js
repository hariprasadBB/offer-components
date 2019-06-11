//@flow
import Offer from "../../model/Offer.js";
import {CardFeeType} from "../CardFeeType.js";
import EnumFilter from "./EnumFilter.js";

export default class CardFeeTypeFilter extends EnumFilter<CardFeeType> {
    getDomainsFromOffer(offer: Offer): Array<CardFeeType> {
        const cardCategoryList = (offer.getCardFeeTypeList()).getDomains();
        return cardCategoryList;
    }
}