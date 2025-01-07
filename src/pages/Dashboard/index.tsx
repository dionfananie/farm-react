import loadable from "@loadable/component";

const DashboardLazy = loadable(
  () => import(/* webpackChunkName: "Dashboard" */ "./view"),
  { ssr: false }
);
export default DashboardLazy;
