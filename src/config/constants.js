/* eslint-disable indent,linebreak-style */
const TABLE_LIMIT = 50;
const tempLevel = true;

//const tempLevel =  !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const tempDate = new Date();
export default {
    TIME_ZONE: -(tempDate.getTimezoneOffset()/60),
    DEFAULT_TIME_FORMAT: 'DD-MM-YYYY, HH:mm',
    APP_NAME: 'Ezupp-Panel',
    DEFAULT_APP_URL: tempLevel ? 'http://91.205.173.97:8118/api/admin/' :'http://localhost:2444/v1/admin/',
    // DEFAULT_APP_URL: tempLevel ? 'http://91.205.173.97:2444/v1/admin/' :'http://localhost:2444/v1/admin/',
    SOCKET_URL: tempLevel ? 'http://91.205.173.97:8085/' : 'http://91.205.173.97:8085/',
    // DEFAULT_APP_URL: 'http://35.154.147.169:5055/api/',
    DEFAULT_PAGE_VALUE: TABLE_LIMIT,
    GOOGLE_LOGIN_KEY: '1027293586426-qg6lv2vsp57m05tn32m9stku2ljsd1uh.apps.googleusercontent.com',
    GOOGLE_AUTH_KEY:"134723802544-4hdevmlr48jv94psl5unmjlpr5m5b1gt.apps.googleusercontent.com",
    // GOOGLE_MAP_KEY: 'AIzaSyDUTIV7DaCvMUMg3qElE-sxdj4zR-dxhFM',
    GOOGLE_MAP_KEY: 'AIzaSyCFLmHivV8XnwV9qV1vV8oIDI-EOYRCBhY',
    FACEBOOK_LOGIN_KEY: '213504989180156',
    DATATABLE_PROPERTIES: {
        title: 'Search',
        height: 'auto',
        selectable: false,
        showRowHover: true,
        columns: [],
        data: [],
        count: 0,
        page: 0,
        showCheckboxes: false,
        // showHeaderToolbar: true,
        rowsPerPage: TABLE_LIMIT,
        rowsPerPageOptions: [],
    },
    MAP_CENTER: { lat: 25.362945, lng: 82.975657 },
    PRODUCT_TAGS: ['VEG', 'VEGAN', 'GLUTEN FREE', 'DIARY'],
    CURRENCY: 'RS.',
    GENERAL_STATUS: {
        PENDING: "PENDING",
        WAITING: "WAITING",
        ACCEPTED: "ACCEPTED",
        ACTIVE: "ACTIVE",
        SUSPENDED: "SUSPENDED",
        ALLOTTED: "ALLOTTED",
        COMPLETED: "COMPLETED",
      },
    STATUS: {
        'PENDING': 'warning',
        'WAITING': 'waiting',
        'ACCEPTED': 'success',
        'ACTIVE': 'success',
        'SUSPENDED': 'error',
        'ALLOTTED': 'success',
        'COMPLETED': 'success'
    },
    ORDER_STATUS: {
        PENDING: 'PENDING',
        ASSIGNED: 'ASSIGNED',
        PAYMENT: 'PAYMENT',
        ON_PICKUP_LOCATION: 'ON_PICKUP_LOCATION',
        OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
        ON_DROP_LOCATION: 'ON_DROP_LOCATION',
        DELIVERED: 'DELIVERED',
        REJECTED: 'REJECTED',
        ACCEPTED: 'ACCEPTED'
    },
    ORDER_STATUS_TEXT: {
        ORDER: 'Ordered',
        PENDING: 'Pending',
        ASSIGNED: 'Driver Assigned',
        PAYMENT: 'Payment Pending',
        ON_PICKUP_LOCATION: 'Dispatching',
        OUT_FOR_DELIVERY: 'Out For Delivery',
        ON_DROP_LOCATION: 'Arrived On Location',
        DELIVERED: 'Order Delivered',
        REJECTED: 'Rejected',
        ACCEPTED: 'Accepted'
    },
    SOCKET_EVENTS: {
        NEW_ORDER: 'COMPANY_NEW_ORDER',
        ORDER_UPDATE: 'COMPANY_ORDER_UPDATE',
        ORDER_ACCEPTED: 'ORDER_ACCEPTED',
        ORDER_ASSIGNED: 'ORDER_ASSIGNED',
        ORDER_REJECTED: 'ORDER_REJECTED',
        ORDER_ON_PICKUP_LOCATION: 'ORDER_ON_PICKUP_LOCATION',
        ORDER_ON_WAY: 'ORDER_ON_WAY',
        ORDER_ON_DROP_LOCATION: 'ORDER_ON_DROP_LOCATION',
        ORDER_DELIVERED: 'ORDER_DELIVERED',
        ORDER_LOCATION_UPDATE: 'COMPANY_LOCATION_UPDATE',
        ORDER_DATA: 'ORDER_DATA',
        COMPANY_DRIVER_ADD: 'COMPANY_DRIVER_ADD',
        COMPANY_DRIVER_REMOVE: 'COMPANY_DRIVER_REMOVE',
    },
    API_ERROR_OBJ: {
        404: "API error",
        500: "Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
      },
    USER_TYPES: {
        CUSTOMER: 'CUSTOMER',
        MANUFACTURE: 'MANUFACTURER',
        BOTH: 'BOTH'
    },
    PRIORITY_TEXT: {
        HIGH: 'Hot Lead',
        MEDIUM: 'Warm Lead',
        LOW: 'Cold Lead'
    },
    PRIORITY: {
        HIGH: 'HIGH',
        MEDIUM: 'MEDIUM',
        LOW: 'LOW'
    },
    CONCERN_STATUS_TEXT: {
        TRANSACTION_FAILURE : 'Transaction Failure',
        ORDER_DISPUTE: 'Order Dispute',
        ACCOUNT_RELATED_ISSUE: 'Account Related Issue',
        PARTNER_REQUEST : 'Partner Request',
        MEDIA_QUERY: 'Media Query',
        GENERAL_SUPPORT: 'General Support',
        CAREER_OPPORTUNITY: 'Career Opportunity',
        OTHER: 'Other'
    },
    SUPPORT_STATUS: {
        PENDING: 'PENDING',
        RESOLVED: 'RESOLVED'
    },
    SUPPORT_STATUS_TEXT: {
        PENDING: 'Pending',
        RESOLVED: 'Resolved'
    },
    QUOTE_STATUS: {
        PENDING: 'PENDING',
        ON_GOING: 'ON_GOING',
        CONVERTED: 'CONVERTED',
        JUNK: 'JUNK',
        COMPLETED: 'COMPLETED'
    },
    QUOTE_STATUS_TEXT: {
        PENDING: 'Pending',
        ON_GOING: 'On Going',
        CONVERTED: 'Converted',
        JUNK: 'Junk',
        COMPLETED: 'Completed'
    },
    QUOTE_STATUS_COLOR: {
        PENDING: 'pending',
        ON_GOING: 'on_going',
        CONVERTED: 'converted',
        JUNK: 'junk',
        COMPLETED: 'completed'
    },
    INDUSTRY_STATUS_TEXT: {
        'ACTIVE': 'ACTIVE',
        'INACTIVE': 'INACTIVE',
        'PENDING' : 'COMING SOON'
    },
    PROFILE_TYPE: {
        BUSINESS: 'BUSINESS',
        INDIVIDUAL: 'INDIVIDUAL',
        NOT_PREFER: 'NOT_PREFER',
        FEMALE: 'FEMALE',
        MALE: 'MALE'
    },
    PIPELINE_STAGES: {
        QUALIFIED: 'Qualified',
        CONTACT_MADE: 'Contact Made',
        DEMO_SCHEDULED: 'Demo Scheduled',
        PROPOSAL_MADE: 'Proposal Made',
        NEGOTIATIONS_STARTED:'Negotiations Started',
        PENDING: 'Pending',
        IN_PROGRESS: 'In Progress',
        PROPOSAL_SENT: 'Proposal Sent',
        ARCHIVED: 'Archived',
        CUSTOMER: 'Customers'

    },
    LOG_ENABLED: true,
    WARNING_ENABLED: true,
    ERROR_ENABLED: true,
};
