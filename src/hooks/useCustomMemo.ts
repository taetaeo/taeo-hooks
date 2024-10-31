//----------------------- useCustomMemo() --------------------------

import { useRef, useEffect } from "react";

const checkChanges = (prevDeps, deps) => {
  if (prevDeps === null) return false;
  if (prevDeps?.length !== deps.length) return false;

  for (let i = 0; i < deps.length; i++) {
    if (prevDeps[i] !== deps[i]) return false;
  }

  return true;
};

export const useCustomMemo = (callback, deps) => {
  //variable or state -> for storing cached Values
  const memoizedRef = useRef(null); // useRef because it will persist the value throughout lifecycle of the component
  //changes in deps
  if (!memoizedRef.current || !checkChanges(memoizedRef?.current?.deps, deps)) {
    memoizedRef.current = {
      value: callback(), // will run and return the value and get stored
      deps: deps,
    };
  }
  //cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);
  //return the result

  return memoizedRef.current.value;
};
