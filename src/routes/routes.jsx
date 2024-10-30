import { createBrowserRouter } from "react-router-dom";
import Wallet from "../components/Wallet"
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AllTask from "../components/AllTask";
import CreateTask from "../components/CreateTask";
import UpdateTask from "../components/UpdateTask";
import DeleteTask from "../components/DeleteTask";

export const routes = createBrowserRouter([
    {path:'/',element:(
    <div>
        <NavBar/>
        <Wallet/>
        <Footer/>
    </div>)},
    {path:'/create-task',element:(
    <div>
        <NavBar/>
        <CreateTask/>
        <Footer/>
    </div>)},
    {path:'/update-task',element:(
    <div>
        <NavBar/>
        <UpdateTask/>
        <Footer/>
    </div>)},
    {path:'/delete-task',element:(
    <div>
        <NavBar/>
        <DeleteTask/>
        <Footer/>
    </div>)},
    {path:'/all-task',element:(
    <div>
        <NavBar/>
        <AllTask/>
        <Footer/>
    </div>)}
])