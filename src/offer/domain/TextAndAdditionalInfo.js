//@flow
import List from "./List.js";

type TextandAdditionalInfoValueType = {
    text: string,
    additionalInfo?: string
}
export default class TextandAdditionalInfo {
    textAndAdditionalInfo: TextandAdditionalInfoValueType
    constructor(textAndAdditionalInfo: TextandAdditionalInfoValueType) {
        this.textAndAdditionalInfo = textAndAdditionalInfo;
    }

    getText() {
        return this.textAndAdditionalInfo.text;
    }

    getAdditionalInfo() {
        return this.textAndAdditionalInfo.additionalInfo;
    }
}

export class TextAndAdditionalInfoList extends List<TextandAdditionalInfo, string> {
    getItemValue(domain: ?TextandAdditionalInfo): ?string {
        if (domain == undefined) {
            return undefined;
        }
        return domain.getText();
    }

    initDomain(value: any) {
        return new TextandAdditionalInfo(value);
    }
} 