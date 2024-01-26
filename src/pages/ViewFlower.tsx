/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useGetAllFlowerQuery } from "../redux/features/flower/flowerApi";
// import EditModals from "../modals/editModals";

const ViewFlower = () => {
  // manage user
  const [Dmodal, setDModal] = useState(false);
  const [DmodalData, setDModalData] = useState<any>();

  // edit
  const [editUser, setEditUser] = useState(false);
  const [EUser, setEUser] = useState<any>();

  const {
    data: AllFlower,
    isLoading,
    isSuccess,
  } = useGetAllFlowerQuery(undefined);
  // const [deleteUser, { isSuccess: isSuccessError, error }] =
  //   useDeleteUserMutation();
  // const [updateUser, { isSuccess: isSuccessUpdate, error: errorUpdate }] =
  //   useUpdateUserMutation();

  const detailModal = (
    <div className="fixed top-[100px] h-[400px] bg-gray-200 shadow-md w-[400px] rounded-md overflow-hidden overflow-y-auto">
      <div className="flex justify-end">
        <div
          className="cursor-pointer
        px-2 py-1 bg-red-300 w-fit"
          onClick={() => {
            setDModal(false);
          }}
        >
          close
        </div>
      </div>
      <div className="scroll-m-0">
        <h3 className="text-center font-bold underline text-lg">Flower Detail</h3>
        <div className="px-5 py-5 capitalize">
          <img className="rounded-md" src={DmodalData?.img} alt="flower_img" />
          <p className="mt-5">
            <span className="font-semibold">Name: </span>
            {DmodalData?.name}
          </p>
          <p className="">
            <span className="font-semibold">Price: </span>
            {DmodalData?.price}
          </p>
          <p className="">
            <span className="font-semibold">Available Quantity: </span>
            {DmodalData?.quantity}
          </p>
          <p className="">
            <span className="font-semibold">Bloom Date: </span>
            {DmodalData?.bloom_date}
          </p>
          <p className="">
            <span className="font-semibold">Color: </span>
            {DmodalData?.color}
          </p>
          <p className="">
            <span className="font-semibold">Type/Category: </span>
            {DmodalData?.type}
          </p>
          <p className="">
            <span className="font-semibold">Size: </span>
            {DmodalData?.size}
          </p>
          <p className="">
            <span className="font-semibold">Fragrance: </span>
            {DmodalData?.fragrance}
          </p>
          <p className="">
            <span className="font-semibold">Occation: </span>
            {DmodalData?.occation}
          </p>
        </div>
      </div>
    </div>
  );

  const handleDelUser = (id: string) => {
    // deleteUser({ id });
  };

  // if (isSuccessError) {
  //   console.log("delete success");
  // }

  // if (error) {
  //   console.log("error", (error as any)?.data.message);
  // }

  // if (errorUpdate) {
  //   console.log("error", (errorUpdate as any)?.data.message);
  // }

  return (
    <div className="p-10 relative">
      <h2 className="text-center font-bold underline text-xl">
        Manage Flowers
      </h2>

      {Dmodal && detailModal}
      {/* {editUser && <EditModals EUser={EUser} setEditUser={setEditUser} />} */}

      <div className="overflow-x-auto">
        <table className="mt-5 min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Size</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {AllFlower &&
              AllFlower?.data?.data.map((item: any) => {
                return (
                  <tr key={item._id}>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.type}</td>
                    <td className="py-2 px-4 border-b">{item.size}</td>
                    <td className="py-2 px-4 border-b flex gap-2">
                      <button
                        onClick={() => {
                          setDModal(true);
                          setDModalData(item);
                        }}
                        className="px-2 py-1 rounded-md bg-green hover:bg-deeper hover:text-white cursor-pointer transition-all ease-in"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDelUser(item?._id)}
                        className="px-2 py-1 rounded-md bg-green hover:bg-deeper hover:text-white cursor-pointer transition-all ease-in"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setEditUser(true);
                          setEUser(item);
                        }}
                        className="px-2 py-1 rounded-md bg-green hover:bg-deeper hover:text-white cursor-pointer transition-all ease-in"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFlower;
