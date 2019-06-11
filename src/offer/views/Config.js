import * as DomainRenderers from "./domainRenderers";
import {BankFilterRenderer, CardCategoryFilterRenderer, CardFeeTypeFilterRenderer, CardNetworkFilterRenderer} from "./domainRenderers/filters/index.js";

const layoutConfiguration = {
    "CC": {
        "visibleItems": {
            "logoRenderer": DomainRenderers.CreditCardImageItemRenderer,
            "ratingsRenderer": DomainRenderers.RatingItemRenderer,
            "rowRenderers": {
                "1": [DomainRenderers.CreditCardNameItemRenderer],
                "2": [DomainRenderers.CreditCardFirstYearAndReducedFeeItemRenderer],
                "3": [DomainRenderers.UspOneLineRenderer]
            },
            "ctaRowPosition": "2"               
        },
        "filters": [BankFilterRenderer, CardCategoryFilterRenderer, 
            CardFeeTypeFilterRenderer, CardNetworkFilterRenderer],
        "compare": {
            "header": DomainRenderers.CreditCardNameItemRenderer,
            "rows": [
                DomainRenderers.CreditCardFirstYearFeeItemRenderer,
                DomainRenderers.CreditCardSecondYearFeeItemRenderer,
                DomainRenderers.RewardsOneLineRenderer,
                DomainRenderers.MoreRewardsRenderer,
                DomainRenderers.JoiningPerksOneLineRenderer,
                DomainRenderers.LifeTimeFreeYesNoRenderer,
                DomainRenderers.FeeWaiverYesNoRenderer,
                DomainRenderers.LoungeAccessYesNoRenderer,
                DomainRenderers.FuelSurchargeWaiverRenderer
            ]
        }
    }
};

export default function getViewConfiguration(productType) {
    return layoutConfiguration[productType];
}

