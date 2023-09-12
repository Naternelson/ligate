import { createBrowserRouter } from "react-router-dom";
import MainLandingView from "../views/MainLanding/MainLanding";

const router = createBrowserRouter([{
    path: "/",
    element: <MainLandingView/>
}])


export default router;