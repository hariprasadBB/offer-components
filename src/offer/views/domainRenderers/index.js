import React from "react";

export function reactElementForRendererViewConfig(viewKlassConfig, offer) {
    return React.createElement(viewKlassConfig.renderer, { domain : viewKlassConfig.getDomain(offer) });
}

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Usp from "./Usp";

export const RatingItemRenderer = {
    renderer: ReviewsSummary.RatingItemRenderer,
    getDomain: (offer) => offer.getReviewsSummary()
};
export const CreditCardImageItemRenderer = {
    renderer: CreditCard.ImageItemRenderer,
    getDomain: (offer) => offer.getCardUrl()
};
export const CreditCardNameItemRenderer = {
    renderer: CreditCard.NameItemRenderer,
    getDomain: (offer) => {
        return {
            cardName: offer.getCardName(),
            cardUrl: offer.getCardUrl()
        };
    }
};
export const CreditCardFirstYearAndReducedFeeItemRenderer = {
    renderer: CreditCardAnnualFee.FirstYearFeeItemRenderer,
    getDomain: (offer) => {
        return {
            firstYearFee: offer.getFirstYearFee(),
            reducedFee: offer.getReducedFee()
        };
    }
};
export const CreditCardSecondYearFeeItemRenderer = {
    renderer: CreditCardAnnualFee.GenericFeeRenderer,
    getDomain: (offer) => offer.getSecondYearOnwards()
};
export const CreditCardFirstYearFeeItemRenderer = {
    renderer: CreditCardAnnualFee.GenericFeeRenderer,
    getDomain: (offer) => offer.getFirstYearFee()
};
export const UspOneLineRenderer = {
    renderer: Usp.OneLinerItemRenderer,
    getDomain: (offer) => offer.getUsp()
};
