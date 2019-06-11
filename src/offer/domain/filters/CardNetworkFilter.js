//@flow
import Offer from "../../model/Offer.js";
import {CardNetwork} from "../CardNetwork.js";
import EnumFilter from "./EnumFilter.js";

export default class CardNetworkFilter extends EnumFilter<CardNetwork> {
    getDomainsFromOffer(offer: Offer): Array<CardNetwork> {
        const cardCategoryList = (offer.getCardNetworkList()).getDomains();
        return cardCategoryList;
    }
}