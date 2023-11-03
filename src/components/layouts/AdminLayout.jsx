import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="h-screen flex w-full bg">
            <div className="w-1/3 bg-gray-400">
            <Link to={`/admin`}><button className="btn btn-primary">home</button></Link>
            <br />
            <Link to={`/admin/check`}><button className="btn btn-primary">Check</button></Link>
            <br />
            <Link to={`/admin/test`}> <button className="btn btn-primary">Test</button></Link>
            </div>
            <div className="w-2/3 bg-red-400"><Outlet></Outlet></div>
        </div>
    );
};

export default AdminLayout;