//@flow
import Offer from "../../model/Offer.js";
import {CardCategory} from "../CardCategory.js";
import EnumFilter from "./EnumFilter.js";

export default class CardCategoryFilter extends EnumFilter<CardCategory> {
    getDomainsFromOffer(offer: Offer): Array<CardCategory> {
        const cardCategoryList = (offer.getCardCategoryList()).getDomains();
        return cardCategoryList;
    }
}
