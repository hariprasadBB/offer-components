import React from "react";
import PropTypes from "prop-types";
import {find, concat, filter, isEmpty} from "lodash";

import Checkbox from "../../../../controls/Checkbox.js";

export default class CheckboxFilterRenderer extends React.PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func.isRequired,
        selectedOptions: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        selectedOptions: []
    }

    render() {
        const filterItems = this.props.options.map((option) => {
            const checked = !isEmpty(find(this.props.selectedOptions, (selectedOption) => this.getValue(selectedOption) == this.getValue(option)));
            const checkbox = <Checkbox key={this.getFilterType() + this.getValue(option)} 
                name={this.getName(option)} value={this.getValue(option)} 
                onChange={this.onFilterItemChange} checked={checked}/>;
            return checkbox;
        });
        return <div>{filterItems}</div>;
    }
    onFilterItemChange = (e, data) => {
        const changedOption = find(this.props.options, 
            (option) => this.getValue(option) == data.value);
        let newSelectedOptions;
        if (data.checked) {
            newSelectedOptions = concat(this.props.selectedOptions, changedOption);
        } else {
            newSelectedOptions = filter(this.props.selectedOptions, (selectedOption) => this.getValue(selectedOption) != this.getValue(changedOption));
        }
        this.props.onChange(newSelectedOptions);
    }
}