/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllFlowerQuery } from "../redux/features/flower/flowerApi";
import Select, { ValueType } from "react-select";
import {
  colorOptions,
  fragranceOptions,
  occationOptions,
  sizeOptions,
  typeOptions,
} from "../components/flowerOptions";
// import EditModals from "../modals/editModals";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewFlower = () => {
  // manage user
  const [Dmodal, setDModal] = useState(false);
  const [DmodalData, setDModalData] = useState<any>();

  const [searchValue, setSearchValue] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selectedColor, setSelectedColor] =
    useState<ValueType<{ value: string | null }>>("");
  const [selectedType, setSelectedType] =
    useState<ValueType<{ value: string }>>("");
  const [selectedSize, setSelectedSize] =
    useState<ValueType<{ value: string }>>("");
  const [selectedFragrance, setSelectedFragrance] =
    useState<ValueType<{ value: string }>>("");
  const [selectedOccation, setSelectedOccation] =
    useState<ValueType<{ value: string }>>("");
  const [selectedBloom, setSelectedBloom] = useState<any>("");

  // edit
  // const [editUser, setEditUser] = useState(false);
  // const [EUser, setEUser] = useState<any>();

  const formattedDate = selectedBloom
    ? new Date(selectedBloom).toISOString().split("T")[0]
    : "";

  console.log("date", formattedDate);
  const {
    data: AllFlower,
    isLoading,
    isSuccess,
  } = useGetAllFlowerQuery({
    searchVal,
    selectedColor,
    selectedFragrance,
    selectedOccation,
    selectedSize,
    selectedType,
    selectedBloom,
  });
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
        <h3 className="text-center font-bold underline text-lg">
          Flower Detail
        </h3>
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
    console.log(id);
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

  const handleSearch = () => {
    setSearchVal(searchValue);
  };

  // const handleSelectChange = (e: any) => {
  //   setSelectedGender(e.target.value);
  // };
if(selectedType) {
  console.log(selectedType);
} else {
  console.log("nulll");
  
}
  console.log("data", AllFlower);

  return (
    <div className="p-10 relative">
      <h2 className="text-center font-bold underline text-xl">
        Manage Flowers
      </h2>

      {Dmodal && detailModal}
      {/* {editUser && <EditModals EUser={EUser} setEditUser={setEditUser} />} */}

      <div className="mt-5">
        <h4 className="">Filter</h4>
        <div className="">
          <div className="h-fit py-5">
            <div className="flex outline w-[400px] rounded-md outline-1 outline-light">
              <input
                className="w-full px-2 outline-none"
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search"
              />
              <p
                onClick={() => handleSearch()}
                className="bg-light px-2 py-1 rounded-r-md cursor-pointer hover:bg-deep hover:text-white transition-all ease-in"
              >
                Search
              </p>
            </div>
            <div className="flex flex-wrap gap-5 w-fit pt-5">
              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Color:</label>
                <Select
                  name="color"
                  options={colorOptions}
                  isClearable={true}
                  onChange={(selectedOption) =>
                    setSelectedColor(selectedOption)
                  }
                  value={selectedColor}
                />
              </div>
              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Type:</label>
                <Select
                  name="type"
                  options={typeOptions}
                  isClearable={true}
                  onChange={(selectedOption) => setSelectedType(selectedOption)}
                  value={selectedType}
                />
              </div>
              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Size:</label>
                <Select
                  name="size"
                  options={sizeOptions}
                  isClearable={true}
                  onChange={(selectedOption) => setSelectedSize(selectedOption)}
                  value={selectedSize}
                />
              </div>
              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Fragrance:</label>
                <Select
                  name="fragrance"
                  options={fragranceOptions}
                  isClearable={true}
                  onChange={(selectedOption) =>
                    setSelectedFragrance(selectedOption)
                  }
                  value={selectedFragrance}
                />
              </div>
              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Occation:</label>
                <Select
                  name="occation"
                  options={occationOptions}
                  isClearable={true}
                  onChange={(selectedOption) =>
                    setSelectedOccation(selectedOption)
                  }
                  value={selectedOccation}
                />
              </div>

              <div className="outline outline-1 outline-light px-2 py-[2px] rounded-md flex justify-between items-center gap-5 mb-5">
                <label htmlFor="selectgender">Bloom Date:</label>
                <DatePicker
                  showIcon
                  // minDate={new Date()}
                  onChange={(date) => setSelectedBloom(date)}
                  dateFormat="yyyy-MM-dd"
                  selected={selectedBloom ? new Date(selectedBloom) : null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
