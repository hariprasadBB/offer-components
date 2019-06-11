import React from "react";

export function reactElementForRendererViewConfig(viewKlassConfig, offer) {
    return React.createElement(viewKlassConfig.renderer, { domain : viewKlassConfig.getDomain(offer) });
}

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Usp from "./Usp";
import YesNoRenderer from "./YesNo.js";
import * as TextAndAdditionalInfo from "./TextAndAdditionalInfo.js";

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
    title: "2ND YEAR FEE",
    getDomain: (offerModel) => offerModel.getSecondYearOnwards()
};
export const CreditCardFirstYearFeeItemRenderer = {
    renderer: CreditCardAnnualFee.GenericFeeRenderer,
    title: "1ST YEAR FEE",
    getDomain: (offerModel) => offerModel.getFirstYearFee()
};
export const LifeTimeFreeYesNoRenderer = {
    renderer: YesNoRenderer,
    title: "LIFETIME FREE",
    getDomain: (offerModel) => offerModel.getLifeTimeFree()
};
export const FeeWaiverYesNoRenderer = {
    renderer: YesNoRenderer,
    title: "FEE WAIVER",
    getDomain: (offerModel) => offerModel.getFeeWaiver()
};
export const LoungeAccessYesNoRenderer = {
    renderer: YesNoRenderer,
    title: "LOUNGE ACCESS",
    getDomain: (offerModel) => offerModel.getLoungeAccess()
};
export const UspOneLineRenderer = {
    renderer: Usp.OneLinerItemRenderer,
    getDomain: (offer) => offer.getUsp()
};
export const RewardsOneLineRenderer = {
    renderer: TextAndAdditionalInfo.FirstItemRenderer,
    title: "REWARDS",
    getDomain: (offerModel) => offerModel.getRewards()
};
export const JoiningPerksOneLineRenderer = {
    renderer: TextAndAdditionalInfo.FirstItemRenderer,
    title: "JOINING PERKS",
    getDomain: (offerModel) => offerModel.getJoiningPerks()
};
export const MoreRewardsRenderer = {
    renderer: TextAndAdditionalInfo.LastItemRenderer,
    title: "MORE REWARDS",
    getDomain: (offerModel) => offerModel.getRewards()
};

export const FuelSurchargeWaiverRenderer = {
    renderer: TextAndAdditionalInfo.ItemRenderer,
    title: "FUEL SURCHARGE",
    getDomain: (offerModel) => offerModel.getFuelSurchargeWaiver()
};