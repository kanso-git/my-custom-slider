import { useState } from "react";

function useToggle(
  initialState: boolean = false
): [boolean, (val?: boolean) => void] {
  const [state, setstate] = useState<boolean>(initialState);
  const toggle = (val?: boolean): void => setstate(val || !state);
  return [state, toggle];
}

export default useToggle;
