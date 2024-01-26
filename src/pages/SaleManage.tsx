import { Link } from "react-router-dom";
import { useGetAllFlowerQuery } from "../redux/features/flower/flowerApi";

const SaleManage = () => {
  const {
    data: flowerData,
    isLoading,
    isSuccess,
    error,
  } = useGetAllFlowerQuery(undefined);

  console.log("data", flowerData?.data?.data);

  return (
    <div className="p-5">
      <h1 className="text-[18px] font-bold text-green w-full">Manage Sale</h1>
      <div className="">
        <div className="">
          <h5 className="">Filter</h5>
        </div>
        <hr />
        <div className="mt-5 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-x-10 gap-x-0">
          {flowerData?.data?.data?.map((item) => {
            return (
              <div
                key={item?._id}
                className="w-[300px] h-fit shadow-md rounded-md "
              >
                <div className="w-full h-[50%] overflow-hidden">
                  <img
                    className="rounded-t-md h-full w-full transition-transform transform hover:scale-110"
                    src="https://plus.unsplash.com/premium_photo-1667667720425-6972aff75f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="img"
                  />
                </div>
                <div className="p-3 text-[16px]">
                  <p className="font-semibold">{item?.name}</p>
                  <p className="">
                    <span className="font-semibold">Price: </span> {item?.price}
                  </p>
                  <p className="">
                    <span className="font-semibold">Color: </span> {item?.color}
                  </p>
                  <p className="">
                    <span className="font-semibold">Quantity: </span>
                    {item?.quantity}
                  </p>
                  <div className="bg-gray-200 hover:bg-green px-3 py-1 mt-3 rounded-md w-full hover:text-white transition-all ease-in text-center">
                    Update
                  </div>
                  <Link to={`/single-service/${item?._id}`} className="">
                    <div className="bg-gray-200 hover:bg-green px-3 py-1 mt-3 rounded-md w-full hover:text-white transition-all ease-in text-center">
                      View
                    </div>
                  </Link>
                  <div className="bg-gray-200 hover:bg-green px-3 py-1 mt-3 rounded-md w-full hover:text-white transition-all ease-in text-center">
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SaleManage;
