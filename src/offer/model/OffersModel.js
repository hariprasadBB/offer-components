import Offer from "./Offer";
import * as Domains from "../domain";

export default class OffersModel {
    constructor(offersData, context) {
        this.offersMap = offersData.map((offerData) => new Offer({offerData, context}));
        this.context = context;
    }

    getOffersMap() {
        return this.offersMap;
    }

    copy(offersMap) {
        const offersModel = new OffersModel([], this.context);
        offersModel.offersMap = offersMap;
        return offersModel;
    }

    getContext() {
        return this.context;
    }
 
    static prepare(context) {
        const preparableDomainKlasses = [Domains.ReviewsSummary];
        return preparableDomainKlasses.map((domainKlass) => {
            if (domainKlass.prepare) {
                return domainKlass.prepare(context);
            }
            return Promise.resolve({});
        });
    }
}