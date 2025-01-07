import loadable from "@loadable/component";

const AboutLazy = loadable(
  () => import(/* webpackChunkName: "About" */ "./view"),
  { ssr: true }
);
export default AboutLazy;
