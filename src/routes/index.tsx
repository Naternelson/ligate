import { createBrowserRouter } from "react-router-dom";
import MainLandingView from "../views/MainLanding/MainLanding";
import PublicLayout from "../views/public/Public";
import { SignupView } from "../views";
import { FinishSignup } from "../views/Signup/FinishSignup";

const router = createBrowserRouter([{
    path: "/",
    element: <PublicLayout/>,
    children: [{
        index: true,
        element: <MainLandingView/>
    }, {
        path: "signup",
        element: <SignupView/>
    }, {
        path: "finishSignup",
        element: <FinishSignup/>
    }]
}])


export default router;