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

export class TextAndAdditionalInfoList extends List<TextandAdditionalInfo, TextandAdditionalInfoValueType> {
    getItemValue(domain: ?TextandAdditionalInfo): ?TextandAdditionalInfoValueType {
        if (domain == undefined) {
            return undefined;
        }
        return {
            text: domain.getText(),
            additionalInfo: domain.getAdditionalInfo()
        };
    }

    initDomain(value: TextandAdditionalInfoValueType) {
        return new TextandAdditionalInfo(value);
    }
} 