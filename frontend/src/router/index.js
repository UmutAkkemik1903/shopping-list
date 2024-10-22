import Dashboard from "../pages/dashboard";
import UsersLayout from "../layout/UserLayout";
import Login from "../pages/login/signIn";

import PrivateRoute from "./privateRoute";


const routes = [
    {
        path:'/',
        element:<PrivateRoute><UsersLayout /></PrivateRoute>,
        children:[
            {
                index:true,
                element:<Dashboard />
            },
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },

]
export default routes;