import React from "react";
import PropTypes from "prop-types";
import {filter, concat, find} from "lodash";
import Modal from "react-modal";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";
import FilterContainerMobileLayout from "./FilterContainerMobileLayout.js";
import CompareContainerMobileLayout from "./CompareContainerMobileLayout.js";
import {reactElementForRendererViewConfig} from "../domainRenderers";
import Checkbox from "../../../controls/Checkbox.js";
import Style from "./OfferTableViewMobileLayout.scss";

export default class OfferTableViewMobileLayout extends React.PureComponent  {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
        viewConfiguration: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            filteredOffersModel: this.props.offersModel,
            filterShown: false,
            offerIdsToBeCompared: [],
            compareModalOpen: false
        };
    }

    renderOfferRow(offer) {
        const config = this.props.viewConfiguration["visibleItems"];
        const compareCheckHandler = (e, data) => {
            this.onCompareCheckChange(offer, data.checked);
        };
        return (
            <section className={Style.offer} key={`row-${offer.getId()}`}>
                <div className={Style.offerTopSection}>
                    <span className={Style.offerImageSection}>
                        <Checkbox value={offer.getId()} onChange={compareCheckHandler} />
                        {getLogoRenderer(config, offer)}
                        {getRatingsRenderer(config, offer)}
                    </span>
                    {getRowsRenderer(config, offer)}
                    <div>
                        {this.renderCTAButton()}
                    </div>
                </div>
            </section>
        );
    }

    render() {
        const offerRows = [];
        this.state.filteredOffersModel.getOffersMap().forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });
        const offerRowsComponent =  <div className={Style.offerSection}>{offerRows}</div>;
        const filterContainer = getFilterContainer(this.props.offersModel, this.onFilter);
        const compareContainer = getCompareContainer(this.state.offerIdsToBeCompared, this.props.offersModel, this.state.compareModalOpen, this.closeCompareModal, this.props.viewConfiguration);
        return (
            //ToDo:
            <React.Fragment>
                <div className={[Style.offerSection, Style.offersCompare].join(" ")}>
                    <div className={[Style.editAppContainer, Style.container, Style.filterSticky].join(" ")}>
                        <div className={Style.filterStickyContainer}>
                            <div className={Style.offerCountInfo}>We found 14 Credit Cards<span onClick={this.showFilter} className={[Style.filterBtn, Style.symbolFilter].join(" ")}>Filter</span></div>
                        </div>
                    </div>
                    <div className={["modal", "fade", "filterModal", [this.state.filterShown ? "in":""]].join(" ")} style={!this.state.filterShown ? {display: "none"}: {display: "block"}}>
                        {filterContainer}
                    </div>
                    {offerRowsComponent}
                </div>
                <div className={Style.moreOffers}>+ 7 cards</div>
                <div className={[Style.offerScrollTop, Style.symbolofferScrollTop].join(" ")}></div>
                <div>
                    {this.state.offerIdsToBeCompared.length > 0 
                        && <button name="Compare" onClick={this.onCompareButtonClick}>
                            {this.state.offerIdsToBeCompared.length} COMPARE OFFERS
                        </button> }
                    {compareContainer}
                </div>
            </React.Fragment>
        );
    }

    onFilter = (filteredOffersModel) => {
        this.setState({filteredOffersModel, filterShown: false});
    }

    onCompareCheckChange = (offer, checked) => {
        let newOfferIdsToBeCompared;
        if (checked) {
            newOfferIdsToBeCompared  = concat(this.state.offerIdsToBeCompared, offer.getId());
        } else {
            newOfferIdsToBeCompared  = filter(this.state.offerIdsToBeCompared, (offerId) => offer.getId() != offerId);
        }
        this.setState({offerIdsToBeCompared: newOfferIdsToBeCompared});
    }

    onCompareButtonClick = () => {
        this.setState({compareModalOpen: true});
    }
    closeCompareModal = () => {
        this.setState({compareModalOpen: false});
    }
    showFilter = () => {
        this.setState({filterShown: true});
    }

    renderCTAButton() {
        return (
            <a className={Style.offerButton} onClick={this.applyNowHandler}>APPLY NOW</a>
        );
    }

    applyNowHandler() {
        //implement this
        return;
    }

} 

const getLogoRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.logoRenderer, offer);
};

const getRatingsRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.ratingsRenderer, offer);
};

const getRowsRenderer = function(config, offer) {
    const rows = [];
    Object.entries(config.rowRenderers).forEach(function([rowNumber, itemTypes]) {
        const itemsDiv = itemTypes.map((itemType) => {
            return (<React.Fragment key={rowNumber}>{reactElementForRendererViewConfig(itemType, offer)}</React.Fragment>);
        });
        rows.push((
            <div className={[`row-${rowNumber}`, Style.row].join(" ")} key={rowNumber}>
                {itemsDiv}
            </div>
        ));
    });

    return rows;
};

const getFilterContainer = function(offersModel, onFilter) {
    return <FilterContainerMobileLayout 
        offersModel={offersModel}
        onFilter={onFilter}/>;
};

const getCompareContainer = function(offerIdsToBeCompared, offersModel, compareModalOpen, closeCompareModal, viewConfiguration) {
    const selectedOffersForComparing = offerIdsToBeCompared.map((offerId) => find(offersModel.getOffersMap(), (offerModel) => offerId == offerModel.getId()));
    return <Modal
        isOpen={compareModalOpen}
        onRequestClose={closeCompareModal}
        contentLabel="Compare Modal">
        <CompareContainerMobileLayout selectedOffers={selectedOffersForComparing} 
            headerComponentConfig={viewConfiguration.compare.header}
            rowsConfig={viewConfiguration.compare.rows}/>
    </Modal>;
};