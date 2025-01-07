import { lazy, Suspense } from "react";
import Loading from "../../components/Loading";
// import DescAbout from "../../components/DescAbout";
const DescAbout = lazy(() => import("../../components/DescAbout"));
export default function About() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h2>About has SSR</h2>
        <DescAbout />
      </div>
    </Suspense>
  );
}
