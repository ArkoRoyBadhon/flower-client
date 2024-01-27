import { useAppSelector } from "../redux/hook";

const Home = () => {

    const {user} = useAppSelector(state => state.user)

    return (
        <div className="p-5">
            {
                user?.email ? <>
                <h1 className="text-[32px] font-bold leading-10 text-green">Welcome Back</h1>
                <h4 className="">Hello, {user.name}. We are happy to see you.</h4>
                </>
                : 
                <>
                <h1 className="text-[32px] font-bold leading-10 text-green">Sorry Dear</h1>
                <h4 className="">Please Login First</h4>
                </>
            }
        </div>
    );
};

export default Home;