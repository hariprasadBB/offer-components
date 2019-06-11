import React from "react";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";

import {CardCategoryList} from "../../domain/CardCategory.js";

export class TopCategoriesRenderer extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.instanceOf(CardCategoryList).isRequired
    }
    render() {
        const topCardCategoryItems = this.props.domain.getTop();
        if (isEmpty(topCardCategoryItems)) {
            return <div>NA</div>;
        }
        const topItems = topCardCategoryItems.map((cardCategoryValue, index) => {
            const delimiter = index !== topCardCategoryItems.length - 1 ? ", " : "";
            return <span key={index}>{cardCategoryValue + delimiter}</span>;
        });
        return <div>{topItems}</div>;
    }
}