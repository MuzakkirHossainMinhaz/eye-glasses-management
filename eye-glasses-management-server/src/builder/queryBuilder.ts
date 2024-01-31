/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export function queryBuilder(queryParams: any, Model: any): any {
    const query: mongoose.FilterQuery<any> = {};

    // const { page = 1, limit = 10, sortBy, sortOrder } = queryParams;
    // const skip = (page - 1) * limit;

    // sorting
    const sortCriteria: any = {};
    // if (sortBy) {
    //     sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
    // }

    // price range
    if (queryParams.minPrice || queryParams.maxPrice) {
        query.price = {};
        if (queryParams.minPrice)
            query.price.$gte = Number(queryParams.minPrice);
        if (queryParams.maxPrice)
            query.price.$lte = Number(queryParams.maxPrice);
    }

    // other filters
    const filterParams = [
        "frameMaterial",
        "frameShape",
        "lensType",
        "brand",
        "gender",
        "color",
    ];

    filterParams.forEach((param) => {
        if (queryParams[param]) {
            query[param] = queryParams[param];
        }
    });

    return Model.find(query).sort(sortCriteria);
}
