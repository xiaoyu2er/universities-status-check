const selectors = {
  "www.neche.org": ".elementor-element-e9afef5",
  "www.hlcommission.org": ".kunena_body",
  "www.wscuc.org": "#primary",
  "www.msche.org": ".content-wrap",
  "www.uscis.gov": "#page-content",
};
const ignoreSelectors = {
  "www.hlcommission.org": [".addressblock"],
};
const sites = [
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
  {
    name: 'H1B Electronic Registration Process',
    uri: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations-and-fashion-models/h-1b-electronic-registration-process'
  },
  {
    name: 'H1B Cap Season',
    uri: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations-and-fashion-models/h-1b-cap-season'
  }

];

module.exports = {
  sites,
  selectors,
  ignoreSelectors,
};
