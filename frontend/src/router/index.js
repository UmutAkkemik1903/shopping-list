import List from "../pages/list/tab";
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
                element:<List />
            },
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },

]
export default routes;