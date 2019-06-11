import sinon from "sinon";
import BankFilterDropdown from "../BankFilterDropdown.js";
import BankDomain from "../../../../domain/Bank.js";

describe("Bank filter dropdown", function() {
    it("should get value and label", function() {
        const bankDomain = new BankDomain();
        sinon.stub(bankDomain, "getName").returns("HDFC");
        sinon.stub(bankDomain, "getId").returns(1);
        expect(new BankFilterDropdown().getValue(bankDomain)).toBe(1);
        expect(new BankFilterDropdown().getLabel(bankDomain)).toBe("HDFC");
    });
});