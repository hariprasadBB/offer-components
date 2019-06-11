import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";

import OffersTableViewMobileLayout from "../OfferTableViewMobileLayout.js";
import {createCCContext} from "../../../../helpers/__tests__/TestUtils.js";
import OffersModel from "../../../model/OffersModel.js";
import {default as getViewConfiguration} from "../../Config";

describe("Offer table view mobile layout", function() {
    const offerData = [
        {
            cpId: 1,
            cardCategoryList: ["REWARDS", "LIFESTYLE"],
            bank: {
                id: 1,
                name: "HDFC"
            }
        },
        {
            cpId: 2,
            cardCategoryList: ["REWARDS", "LIFESTYLE", "FUEL"],
            bank: {
                id: 1,
                name: "ICICI"
            }
        }
    ];
    const context = createCCContext();
    const offersModel = new OffersModel(offerData, context);
    const viewConfiguration = getViewConfiguration(context.getProductType());
    let setStateSpy;
    beforeEach(() => {
        setStateSpy = sinon.spy(OffersTableViewMobileLayout.prototype, "setState");        

    });

    afterEach(() => {
        setStateSpy.restore();

    });

    it("should have filters container", function() { 
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const filterContainer = wrapper.find("FilterContainerMobileLayout");
        expect(filterContainer.length).toBe(1);
        expect(filterContainer.prop("offersModel")).toBe(offersModel);
    });

    it("should update state with filtered offersModel", function() {
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const filterContainer = wrapper.find("FilterContainerMobileLayout");
        const filteredOffersModel = new OffersModel(offerData, context);
        filterContainer.prop("onFilter")(filteredOffersModel);
        expect(setStateSpy.called).toBe(true);
        expect(setStateSpy.args[0][0]).toEqual({filteredOffersModel, filterShown: false});
    });

    it("should have checkbox for each row and update selected offers into state", function() {
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const checkBoxes = wrapper.find("Checkbox");
        expect(checkBoxes.length).toBe(offerData.length);
        checkBoxes.at(0).prop("onChange")(null, {checked: true});
        expect(setStateSpy.called).toBe(true);
        expect(setStateSpy.args[0][0]).toEqual({offerIdsToBeCompared: [offerData[0].cpId]});
        expect(wrapper.find("button[name=\"Compare\"]").length).toBe(1);
        checkBoxes.at(0).prop("onChange")(null, {checked: false});
        expect(setStateSpy.args[1][0]).toEqual({offerIdsToBeCompared: []});
        expect(wrapper.find("button[name=\"Compare\"]").length).toBe(0);
    });

    it("should show compare modal when compare button is clicked with two offers selected", function() {
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const checkBoxes = wrapper.find("Checkbox");
        expect(checkBoxes.length).toBe(offerData.length);
        checkBoxes.at(0).prop("onChange")(null, {checked: true});
        checkBoxes.at(1).prop("onChange")(null, {checked: true});
        wrapper.find("button[name=\"Compare\"]").simulate("click");
        expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
    });
});