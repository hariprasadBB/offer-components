import React from "react";
import {shallow} from "enzyme";

import {TopCategoriesRenderer} from "../CardCategory.js";
import {CardCategoryList} from "../../../domain/CardCategory.js";

describe("Card category renderer", function() {
    it("should render top categories with comma formatting", function() {
        const domain = new CardCategoryList(["REWARDS", "LIFESTYLE", "TRAVEL", "FUEL"]);
        const wrapper = shallow(React.createElement(TopCategoriesRenderer, {
            domain
        }));
        expect(wrapper.find("span").length).toBe(domain.getTop().length);
        expect(wrapper.find("span[children=\"REWARDS, \"]").length).toBe(1);
        expect(wrapper.find("span[children=\"TRAVEL\"]").length).toBe(1);
    });

    it("should render NA when no cards present", function() {
        const domain = new CardCategoryList([]);
        const wrapper = shallow(React.createElement(TopCategoriesRenderer, {
            domain
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);
        
    });
});