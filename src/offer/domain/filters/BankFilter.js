//@flow

import {uniqWith, filter, isEmpty} from "lodash";

import FilterableDomain from "./FilterableDomain.js";
import OffersModel from "../../model/OffersModel.js";
import BankDomain from "../Bank.js";
import Offer from "../../model/Offer.js";

export default class BankFilter extends FilterableDomain<BankDomain, OffersModel> {
    getFilterOptions(offersModel: OffersModel): Array<BankDomain> {
        const filterOptions = offersModel.getOffersMap().reduce((aggr, offer) => {
            aggr.push(getBankDomainFromOffer(offer));
            return aggr;
        }, []);
        return uniqWith(filterOptions, comparator);
    }

    filter(offersModel: OffersModel): Promise<OffersModel> {
        if (isEmpty(this.filterCriteria)) {
            return Promise.resolve(offersModel);
        }
        const offers = offersModel.getOffersMap();
        const filteredValues =  filter(offers, (offer) => {
            const bankDomainFromOffer = getBankDomainFromOffer(offer);
            const matching = filter(this.filterCriteria, (filterCriterion) => filterCriterion.getId() === bankDomainFromOffer.getId());
            return !isEmpty(matching);
        });
        const offersModelFiltered = offersModel.copy(filteredValues);
        return Promise.resolve(offersModelFiltered);
    }
}

const getBankDomainFromOffer = function(offer: Offer): BankDomain {
    const bank = (offer.getBank());
    return bank;
};

const comparator = function(oneVal, othVal) {
    return oneVal.getId() === othVal.getId();
};