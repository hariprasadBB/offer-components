//@flow
import {EnumDomain, EnumList} from "./Enum.js";

const cardNetworkTypes = {
    VISA: "VISA",
    MASTER: "MASTER",
    AMEX: "AMEX",
    DINING: "DINING"
};
export type CardNetworkValueType = $Keys<typeof cardNetworkTypes>;

export class CardNetworkList extends EnumList<CardNetworkValueType> {

    initDomain(value: CardNetworkValueType) {
        return new CardNetwork(value);
    }
}

export class CardNetwork extends EnumDomain<CardNetworkValueType> {
    getTypes(): any {
        return cardNetworkTypes;
    }
}