import CardFeeTypeFilter from "../CardFeeTypeFilter.js";
import {CardFeeType} from "../../CardFeeType.js";
import Offer from "../../../model/Offer.js";

describe("Card fee type filter", function() {
    it("should get domains from offer", function() {
        const offerData = {
            cpId: 1,
            cardFeeTypeList: ["PREMIUM", "LIFETIME_FREE"]
        };
        expect(new CardFeeTypeFilter().getDomainsFromOffer(new Offer(offerData))).
            toEqual([new CardFeeType("PREMIUM"), new CardFeeType("LIFETIME_FREE")]);
    });
});