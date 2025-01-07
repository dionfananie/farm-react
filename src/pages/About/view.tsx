import { lazy, Suspense } from "react";
const DescAbout = lazy(() => import("../../components/DescAbout"));
import { ClientOnly } from "../../utils/clientOnly";
import Loading from "../../components/Loading";

export default function About() {
  return (
    <div>
      <h2>About has SSR</h2>
      <Suspense fallback={<Loading />}>
        <ClientOnly>
          <DescAbout />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
