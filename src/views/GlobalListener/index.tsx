import { useDispatch } from "react-redux";
import { useAuthListener } from "./useAuthListener";
import { PropsWithChildren } from "react";
import { useAuthAssociations } from "./useAuthAssociations";

/**
 * A component that initializes global listeners for authentication and user associations.
 *
 * @param {PropsWithChildren} props - Children components to be wrapped by the listener.
 */
export const GlobalListener = (props: PropsWithChildren) => {
	const dispatch = useDispatch();
	useAuthListener(dispatch);
	useAuthAssociations(dispatch);
	return props.children;
};
