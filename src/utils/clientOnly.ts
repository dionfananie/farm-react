import {
  useState,
  useEffect,
  createElement,
  Fragment,
  type ReactNode,
} from "react";

/** React hook that returns true if the component has mounted client-side */
export const useClientOnly = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

/** React component that renders its children client-side only / after first mount */
export const ClientOnly = ({ children }: { children: ReactNode }) => {
  const hasMounted = useClientOnly();

  if (!hasMounted) {
    return null;
  }

  return createElement(Fragment, { children });
};
