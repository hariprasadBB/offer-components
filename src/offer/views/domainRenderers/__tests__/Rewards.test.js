import {shallow} from "enzyme";
import React from "react";

import {OneLiner, MoreRewards} from "../Rewards.js";
import {TextAndAdditionalInfoList} from "../../../domain/TextAndAdditionalInfo.js";

describe("Rewards renderer", function () {
    const rewardsData = [
        {
            "text": "5 JPMiles/Rs.100 on domestic spends",
            "additionalInfo": ""
        },
        {
            "text": "7 JPMiles/Rs.100 on international spends",
            "additionalInfo": ""
        }
    ];
    it("OneLiner should render first reward", function() {
        const wrapper = shallow(React.createElement(OneLiner, {
            domain: new TextAndAdditionalInfoList(rewardsData)
        }));
        expect(wrapper.find("div[children=\"5 JPMiles/Rs.100 on domestic spends\"]").length).toBe(1);        
    });

    it("OneLiner should render NA when no rewards found", function() {
        const wrapper = shallow(React.createElement(OneLiner, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });

    it("MoreRewards should render the last reward", function() {
        const wrapper = shallow(React.createElement(MoreRewards, {
            domain: new TextAndAdditionalInfoList(rewardsData)
        }));
        expect(wrapper.find("div[children=\"7 JPMiles/Rs.100 on international spends\"]").length).toBe(1);        
    });

    it("MoreRewards should render NA when no rewards found", function() {
        const wrapper = shallow(React.createElement(MoreRewards, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });
});