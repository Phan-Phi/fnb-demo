import { useCallback } from "react";
import { useToggle as useOriginalToggle } from "react-use";

export default function useToggle(initState = false) {
  const [on, toggle] = useOriginalToggle(initState);

  const toggleOn = useCallback(() => {
    toggle(true);
  }, []);

  const toggleOff = useCallback(() => {
    toggle(false);
  }, []);

  return {
    on,
    toggle,
    toggleOff,
    toggleOn,
  };
}
