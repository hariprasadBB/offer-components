import Offer from "./Offer";

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
}