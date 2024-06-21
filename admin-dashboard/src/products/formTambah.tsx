import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import "../products/style.css";

export default function FromTambahProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    discount: "",
    regularPrice: "",
    finalPrice: "",
    stock: "",
    isActive: false,
    image: null, // Store the selected image file
  });

   const handleChange = (
     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
   ) => {
     const { name, value, type } = e.target as
       | HTMLInputElement
       | HTMLTextAreaElement
       | HTMLSelectElement;
     let val: string | boolean | File | null = value;

     if (type === "checkbox") {
       val = (e.target as HTMLInputElement).checked;
     } else if (type === "file") {
       const files = (e.target as HTMLInputElement).files;
       val = files && files.length > 0 ? files[0] : null;
     }

     setFormData((prevData) => {
       const newData = {
         ...prevData,
         [name]: val,
       };

       if (name === "regularPrice" || name === "discount") {
         calculateFinalPrice(newData.regularPrice, newData.discount);
       }

       return newData;
     });
   };



const calculateFinalPrice = (regularPrice: string, discount: string) => {
  const regular = parseFloat(regularPrice);
  const disc = parseFloat(discount);

  if (!isNaN(regular) && !isNaN(disc)) {
    const finalPrice = (regular - regular * (disc / 100)).toFixed(2);
    setFormData((prevData) => ({
      ...prevData,
      finalPrice: finalPrice,
    }));
  }
};
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    // Append form data to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      // If value is not null, treat it as a string; otherwise, ignore it
      if (value !== null) {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      await axios.post(
        "http://localhost:8000/Admin/AddProduct",
        formDataToSend
      );

      alert("Success!");
       window.location.href = "/Product";

      // Optionally, handle success, reset form, etc.
    } catch (error) {
      console.error("Error adding product:", error);
      // Optionally, handle error
    }
  };

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Add Product
        </div>

        <div className="bg-white h-[1,314px] shadow-md  sm:rounded-lg p-6 flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Form fields */}
            <div className="flex flex-col w-full gap-3">
              <div>Photos</div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-[280px] h-[280px] outline-blue-500  outline-dashed outline-2 outline-offset-2  rounded-3xl"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Product Name</div>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Description</div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-lg p-2"
                cols={30}
                rows={10}></textarea>
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Regular Price</div>
              <input
                type="text"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Discount (%)</div>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Final Price</div>
              <input
                type="text"
                name="finalPrice"
                value={formData.finalPrice}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Stock</div>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className=" flex flex-row justify-between">
              <div>Set as Active</div>
              <label className="switch inline-block relative w-12 h-6">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <span className="slider round absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-colors duration-200 before:absolute before:bg-white before:h-4 before:w-4 before:left-1 before:bottom-1 before:transition-transform before:duration-200"></span>
              </label>
            </div>
            <hr />
            <div className=" flex flex-row justify-center content-center gap-3 py-6">
              <div>
                <button
                  // onClick={() => setFormData({})}
                  className="w-[234px] h-[44px] px-6 py-[10px] rounded-3xl bg-[#E0EDFF]">
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[234px] h-[44px] px-6 py-[10px] rounded-3xl bg-[#A2A2A2]">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
