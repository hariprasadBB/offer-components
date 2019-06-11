import {shallow} from "enzyme";
import React from "react";

import {OneLiner, LastLine} from "../TextAndAdditionalInfo.js";
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
    it("OneLiner should render first data", function() {
        const wrapper = shallow(React.createElement(OneLiner, {
            domain: new TextAndAdditionalInfoList(data)
        }));
        expect(wrapper.find("div[children=\"5 JPMiles/Rs.100 on domestic spends\"]").length).toBe(1);        
    });

    it("OneLiner should render NA when no data found", function() {
        const wrapper = shallow(React.createElement(OneLiner, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });

    it("LastLine should render the last data", function() {
        const wrapper = shallow(React.createElement(LastLine, {
            domain: new TextAndAdditionalInfoList(data)
        }));
        expect(wrapper.find("div[children=\"7 JPMiles/Rs.100 on international spends\"]").length).toBe(1);        
    });

    it("LastLine should render NA when no data found", function() {
        const wrapper = shallow(React.createElement(LastLine, {
            domain: new TextAndAdditionalInfoList([])
        }));
        expect(wrapper.find("div[children=\"NA\"]").length).toBe(1);        
    });
});