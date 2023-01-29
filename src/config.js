const selectors = {
  "www.neche.org": ".institution-details",
  "www.hlcommission.org": ".kunena_body",
  "www.wscuc.org": "#primary",
  "www.msche.org": ".content-wrap",
};
const ignoreSelectors = {
  "www.hlcommission.org": [".addressblock"],
};
const universities = [
  {
    name: "NEW ENGLAND COLLEGE",
    uri: "https://www.neche.org/institution/new-england-college/",
  },
  {
    name: "TRINE UNIVERSITY",
    uri: "https://www.hlcommission.org/component/directory/?Itemid=&Action=ShowBasic&instid=1215",
  },
  {
    name: "HUMPHREYS UNIVERSITY",
    uri: "https://www.wscuc.org/institutions/humphreys-university/",
  },
  {
    name: "SOFIA UNIVERSITY",
    uri: "https://www.wscuc.org/institutions/sofia-university/",
  },
  {
    name: "INTERNATIONAL TECHNOLOGICAL UNIVERSITY",
    uri: "https://www.wscuc.org/institutions/international-technological-university/",
  },
  {
    name: "WESTCLIFF UNIVERSITY",
    uri: "https://www.wscuc.org/institutions/westcliff-university/",
  },
  {
    name: "CALIFORNIA INSTITUTE OF ADVANCED MANAGEMENT",
    uri: "https://www.wscuc.org/institutions/california-institute-of-advanced-management/",
  },
  {
    name: "OTTAWA UNIVERSITY",
    uri: "https://www.hlcommission.org/component/directory/?Itemid=&Action=ShowBasic&instid=1294",
  },
  {
    name: "HARRISBURG UNIVERSITY OF SCIENCE AND TECHNOLOGY",
    uri: "https://www.msche.org/institution/9171/",
  },
  {
    name: "MONROE COLLEGE",
    uri: "https://www.msche.org/institution/0715/",
  },
];

module.exports = {
  universities,
  selectors,
  ignoreSelectors,
};
