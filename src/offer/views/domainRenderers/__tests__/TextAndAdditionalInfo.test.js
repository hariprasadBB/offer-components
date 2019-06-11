import {shallow} from "enzyme";
import React from "react";

import {FirstItemRenderer, LastItemRenderer} from "../TextAndAdditionalInfo.js";
import {TextAndAdditionalInfoList} from "../../../domain/TextAndAdditionalInfo.js";

describe("TextAndAdditionalInfo renderer", function () {
    const data = [
        {
            "text": "5 JPMiles/Rs.100 on domestic spends",
            "additionalInfo": ""
        },
        {
            "text": "7 JPMiles/Rs.100 on international spends",
            "additionalInfo": ""
        }
    ];
    it("FirstItemRenderer should render first data", function() {
        const wrapper = shallow(React.createElement(FirstItemRenderer, {
            domain: new TextAndAdditionalInfoList(data)
        }));
        expect(wrapper.find("div[children=\"5 JPMiles/Rs.100 on domestic spends\"]").length).toBe(1);        
    });

    it("FirstItemRenderer should render NA when no data found", function() {
        const wrapper = shallow(React.createElement(FirstItemRenderer, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });

    it("LastItemRenderer should render the last data", function() {
        const wrapper = shallow(React.createElement(LastItemRenderer, {
            domain: new TextAndAdditionalInfoList(data)
        }));
        expect(wrapper.find("div[children=\"7 JPMiles/Rs.100 on international spends\"]").length).toBe(1);        
    });

    it("LastItemRenderer should render NA when no data found", function() {
        const wrapper = shallow(React.createElement(LastItemRenderer, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });
});