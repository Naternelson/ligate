import { useDispatch } from "react-redux";
import { useAuthListener } from "./useAuthListener";
import { PropsWithChildren, ReactElement } from "react";
import { useAuthAssociations } from "./useAuthAssociations";

/**
 * A component that initializes global listeners for authentication and user associations.
 *
 * @param {PropsWithChildren} props - Children components to be wrapped by the listener.
 * @returns {ReactElement} Returns the children wrapped in a fragment.
 */
export const GlobalListener = (props: PropsWithChildren<{}>): ReactElement => {
	const dispatch = useDispatch();
	useAuthListener(dispatch);
	useAuthAssociations(dispatch);
	return <>{props.children}</>;
};
