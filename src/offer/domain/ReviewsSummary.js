import ServiceProxy from "../../helpers/ServiceProxy";
import Logger from "../../helpers/Logger";

export default class ReviewsSummary {
    static reviewsSummaryForAllCardsOrBanks = {};

    constructor(id, bankId) {
        this.reviewsSummary = ReviewsSummary.reviewsSummaryForAllCardsOrBanks[id || bankId];
    }

    getAvgRating() {
        return this.reviewsSummary.avgRating.rating;
    }

    getScaleForAvgRating() {
        return this.reviewsSummary.avgRating.scale;
    }

    getCount() {
        return this.reviewsSummary.count;
    }

    static prepare(context) {
        const dummyResponse = { 
            "10234": {
                "avgRating":  {
                    "rating": 2.5,
                    "scale": 5.0
                },
                "count" : 6897
            },
            "10235": {
                "avgRating":  {
                    "rating": 3.5,
                    "scale": 5.0
                },
                "count" : 10987
            },
            "10236": {
                "avgRating":  {
                    "rating": 4.5,
                    "scale": 5.0
                },
                "count" : 979
            }
        };

        const requestURL = "/getReviewsSummary.html?productType=" + context.getProductTypeLongCode();

        const promise = ServiceProxy.getInstance().fetchJson(requestURL)
            .then((response) => ReviewsSummary.reviewsSummaryForAllCardsOrBanks = JSON.parse(response))
            .catch((e) => {
                Logger.error(requestURL + " failed to fetch reviews : ", e);
                ReviewsSummary.reviewsSummaryForAllCardsOrBanks = dummyResponse; //temp change till the endpoint is available.
            });

        return promise;
    }
}