import loadable from "@loadable/component";

const DescLazy = loadable(
  () => import(/* webpackChunkName: "Desc" */ "./view")
);
export default DescLazy;
