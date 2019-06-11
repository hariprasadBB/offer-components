//@flow
import List from "./List.js";

export class EnumList<VT> extends List<EnumDomain<VT>, VT> {

    getItemValue(domain: ?EnumDomain<VT>): ?VT {
        if (domain == undefined) {
            return undefined;
        }
        return domain.getValue();
    }
}

export class EnumDomain<VT> {
    value: VT
    constructor(value: string) {
        this.value = this.getTypes()[value];
    }

    getValue(): VT {
        return this.value;
    }

    getTypes(): any {
        return undefined;
    }
}

