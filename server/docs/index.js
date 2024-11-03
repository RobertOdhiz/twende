import basicInfo from "./basicInfo.docs.js";
import bookingPaths from "./booking.docs.js";
import busPaths from "./bus.docs.js";
import companyPaths from "./company.docs.js";
import locationPaths from "./location.docs.js";
import paymentPaths from "./payment.docs.js";
import userPaths from "./users.docs.js";

export default {
    ...basicInfo,
    paths: {
        ...userPaths,
        ...locationPaths,
        ...bookingPaths,
        ...paymentPaths,
        ...companyPaths,
        ...busPaths
    }
}