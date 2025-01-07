"use client";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
// import Desc from "../components/Desc";
const Desc = lazy(() => import("../components/Desc"));
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h2>Home</h2>
        <Desc />
      </div>
    </Suspense>
  );
}
