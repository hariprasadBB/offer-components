import CardNetworkFilter from "../CardNetworkFilter.js";
import {CardNetwork} from "../../CardNetwork.js";
import Offer from "../../../model/Offer.js";

describe("Card fee type filter", function() {
    it("should get domains from offer", function() {
        const offerData = {
            cpId: 1,
            cardNetworkList: ["VISA", "MASTER"]
        };
        expect(new CardNetworkFilter().getDomainsFromOffer(new Offer(offerData))).
            toEqual([new CardNetwork("VISA"), new CardNetwork("MASTER")]);
    });
});