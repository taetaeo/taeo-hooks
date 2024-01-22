import React from "react";
export default function useToggle(initialState = false) {
    const [state, toggle] = React.useState(initialState);
    const handleToggle = React.useCallback(() => {
        return toggle((prev) => !prev);
    }, [state]);
    return [state, handleToggle, toggle];
}
//# sourceMappingURL=useToggle.js.map