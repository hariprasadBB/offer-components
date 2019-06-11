import {mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import DropdownFilter from "../DropdownFilter.js";

class DropdownFilterStub extends DropdownFilter {
    getValue(domain) {
        return domain;
    }

    getLabel(domain) {
        return domain;
    }
}

describe("Dropdown filter", function () {
    it("should render filter options of any domain", function() {
        const stubbedOnChange = sinon.stub();
        const domain1 = "VALUE1";
        const domain2 = "VALUE2";
        const wrapper = mount(React.createElement(DropdownFilterStub, {
            options: [domain1, domain2],
            selectedOptions: [domain2],
            onChange: stubbedOnChange,
            title: "someTitle"
        }));
        expect(wrapper.find("Select").prop("options")).toEqual([{value: domain1, label: domain1}, {value: domain2, label: domain2}]);
        expect(wrapper.find("Select").prop("value")).toEqual([{value: domain2, label: domain2}]);
    });

    it("should update filterCriteria when checkbox change happens", function () {
        const stubbedOnChange = sinon.stub();
        const domain1 = "VALUE1";
        const domain2 = "VALUE2";
        const wrapper = mount(React.createElement(DropdownFilterStub, {
            options: [domain1, domain2],
            onChange: stubbedOnChange,
            title: "someTitle"
        }));
        wrapper.find("Select").prop("onChange")([{value: domain1, label: domain1}]);
        sinon.assert.calledWith(stubbedOnChange, sinon.match((domains) => {
            return domains!= undefined && domains.length == 1 && domains[0] == domain1;
        }, "selectedDomain"));
        wrapper.find("Select").prop("onChange")([]);
        sinon.assert.calledWith(stubbedOnChange, sinon.match((domains) => {
            return domains!= undefined && domains.length == 0;
        }, "noDomainChosen"));
    });
});