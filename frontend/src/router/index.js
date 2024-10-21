import Dashboard from "../pages/dashboard";
import UsersLayout from "../layout/UserLayout";
import Login from "../pages/login/signIn";

//import PrivateRoute from "../PrivateRoute";


const routes = [
    {
        path:'/',
        element:<UsersLayout />,
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