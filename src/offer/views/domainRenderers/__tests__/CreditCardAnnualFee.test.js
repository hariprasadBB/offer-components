import {mount} from "enzyme";
import React from "react";
import {FirstYearFeeItemRenderer} from  "../CreditCardAnnualFee.js";
import CreditCardAnnualFee from "../../../domain/CreditCardAnnualFee.js";

const propsWithReducedFee = {
    domain : {
        firstYearFee : new CreditCardAnnualFee({
            "conditions": "",
            "fees": {
                "value": 1783.0,
                "code": "INR"
            },
            "oldFees": {
                "value": 0.0,
                "code": "INR"
            },
            "bbExclusive": false
        }),
        reducedFee: new CreditCardAnnualFee({
            "conditions": "If annual spends > ${RUPEE} 30,000",
            "fees": {
                "value": 1123.0,
                "code": "INR"
            },
            "oldFees": null,
            "bbExclusive": false
        })
    }
};

const propsWithoutReducedFee = {
    domain : {
        firstYearFee :new CreditCardAnnualFee({
            "conditions": "",
            "fees": {
                "value": 1861.0,
                "code": "INR"
            },
            "oldFees": {
                "value": 0.0,
                "code": "INR"
            },
            "bbExclusive": false
        }),
    }
};


describe("FirstYearFeeItemRenderer", function() {
    it("should always have first year fee in the DOM", function() {
        let firstYearFee = parseInt(propsWithReducedFee.domain.firstYearFee.getCurrentFee()).toString();
        expect(mount(<FirstYearFeeItemRenderer {...propsWithReducedFee}/>).text()).toMatch(new RegExp(firstYearFee));

        firstYearFee = parseInt(propsWithoutReducedFee.domain.firstYearFee.getCurrentFee()).toString();
        expect(mount(<FirstYearFeeItemRenderer {...propsWithoutReducedFee}/>).text()).toMatch(new RegExp(firstYearFee));
    });

    it("should have reduced fee in the DOM if reduced fee is sent as props", function() {
        const reducedFee = parseInt(propsWithReducedFee.domain.reducedFee.getCurrentFee()).toString();
        expect(mount(<FirstYearFeeItemRenderer {...propsWithReducedFee}/>).text()).toMatch(new RegExp(reducedFee));
    });
});
