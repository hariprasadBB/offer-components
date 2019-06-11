import {EnumDomain} from "../../../../domain/Enum.js";
import EnumBasedDropdownFilter from "../EnumBasedDropdownFilter.js";

class EnumDomainStub extends EnumDomain {
    getTypes() {
        return {
            VALUE: "VALUE"
        };
    }
}
describe("Enum domain filter renderer", function () {
    it("should get value from domain", function() {
        const enumDomain = new EnumDomainStub("VALUE");
        
        expect(new EnumBasedDropdownFilter().getValue(enumDomain)).toBe("VALUE");
        expect(new EnumBasedDropdownFilter().getLabel(enumDomain)).toBe("VALUE");
    });
});