import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import {
  colorOptions,
  fragranceOptions,
  occationOptions,
  sizeOptions,
  typeOptions,
} from "../components/flowerOptions";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCreateFlowerMutation } from "../redux/features/flower/flowerApi";
import { IFlower } from "../types/addFlowerType";


const AddFlower = () => {
  const [createFlower, {isSuccess, error}] = useCreateFlowerMutation()
  const {
    control,
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<IFlower>();

  if(isSuccess) {
    console.log("add Success");
  }
  if(error) {
    console.log(error);
  }

  const img_hosting_token = import.meta.env.VITE_PUBLIC_IMAGE_UPLOAD;

  const onSubmit: SubmitHandler<IFlower> = async (data) => {
    // console.log("form data", data);
    const formData = new FormData();
    formData.append("image", data.img[0]);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      // console.log("response Data", responseData?.data?.url);

      const formattedDate = data.bloom_date ? new Date(data.bloom_date).toISOString().split('T')[0] : '';

      const flowerData = {
        ...data,
        quantity: Number(data?.quantity),
        img: responseData?.data?.url,
        bloom_date: formattedDate,
        color: data?.color?.value,
        type: data?.type?.value,
        size: data?.size?.value,
        fragrance: data?.fragrance?.value,
        occation: data?.occation?.value,
      };

      console.log("payload", flowerData);

      await createFlower(flowerData);
      // setImage(null);
      // reset();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-[18px] font-bold text-green w-full">Add Flower</h1>
      <div className="mt-10 w-full flex justify-center">
        <form
          className="w-full md:w-[60%] lg:w-[40%] shadow-md p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mb-2">
            <label htmlFor="">Name</label>
            <input
              className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-center text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="">Image</label>
            <input
              className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
              type="file"
              placeholder="Image"
              {...register("img", { required: true })}
            />
            {errors.img && (
              <span className="text-center text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="">Price</label>
            <input
              className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
              type="text"
              placeholder="Price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-center text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="">Quantity</label>
            <input
              className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300"
              type="text"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-center text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="">Bloom Date</label>
            <div className="py-[6px] px-2 mx-auto rounded-md w-full border border-gray-300">
              <Controller
                control={control}
                name="bloom_date"
                render={({
                  field: { onChange, onBlur, value },
                }) => (
                  <DatePicker
                    showIcon
                    minDate={new Date()}
                    onChange={onChange}
                    onBlur={onBlur}
                    dateFormat="yyyy-MM-dd"
                    selected={value ? new Date(value) : null}
                  />
                )}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="">Color</label>
            <div className="">
              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <Select options={colorOptions} {...field} />
                )}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="">Type/Category</label>
            <div className="">
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select options={typeOptions} {...field} />
                )}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="">Size</label>
            <div className="">
              <Controller
                control={control}
                name="size"
                render={({ field }) => (
                  <Select options={sizeOptions} {...field} />
                )}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="">Fragrance</label>
            <div className="">
              <Controller
                control={control}
                name="fragrance"
                render={({ field }) => (
                  <Select options={fragranceOptions} {...field} />
                )}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="">Occation</label>
            <div className="">
              <Controller
                control={control}
                name="occation"
                render={({ field }) => (
                  <Select options={occationOptions} {...field} />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <input
              className="bg-green py-2 rounded-md cursor-pointer text-white mx-auto w-full md:w-[60%]"
              type="submit"
              value="Add Flower"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlower;
