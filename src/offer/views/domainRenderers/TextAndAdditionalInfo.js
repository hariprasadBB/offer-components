import React from "react";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";

import {TextAndAdditionalInfoList} from "../../domain/TextAndAdditionalInfo.js";
import TextAndAdditionalInfo from "../../domain/TextAndAdditionalInfo.js";

export class OneLiner extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.instanceOf(TextAndAdditionalInfoList).isRequired
    }
    render() {
        const domains = this.props.domain.getDomains();
        return renderItem(domains, 0);
    }
}

export class LastLine extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.instanceOf(TextAndAdditionalInfoList).isRequired
    }
    render() {
        const domains = this.props.domain.getDomains();
        return renderItem(domains, domains.length-1);
    }
}

export class StandAlone extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.instanceOf(TextAndAdditionalInfo).isRequired
    }
    render() {
        return <div>{this.props.domain.getText()}</div>;
    }
}

const renderItem = function(domains, index) {
    if (isEmpty(domains)) {
        return <div>NA</div>;
    }
    const text = domains[index].getText();
    return <div>{text}</div>;
};