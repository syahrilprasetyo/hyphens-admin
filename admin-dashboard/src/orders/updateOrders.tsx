// order.js
import axios from "axios";
// import React from "react";
import React, { FormEvent, useEffect, useState } from "react";

// Data model for orderDetail
 export type orderDetailModel = {
  order_id: number; // Number (assuming it's an integer)
  total_payment: number; // Number or string (depending on how it's represented)
  order_status: string; // String
};

// Data model for each product in productDetail array
export type productModel = {
  product_id: number
  product_name: string; // String
  final_price: number; // Number or string (depending on how it's represented)
  discount: number; // Number
  image_url: string; // Array of strings (image URLs)
};

// Data model for address
export type addressModel = {
  id: number; // Number (assuming it's an integer)
  customer_id: number; // Number (assuming it's an integer)
  email: string; // String
  no_telp: string; // String
  address: string; // String
  full_name: string; // String
  city: string; // String
  country: string; // String
  zipCode: string; // String
};

export default function UpdateOrder() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:8000/Admin/UpdateOrder",
          {
            order_id: orderDetail?.order_id,
            status: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      alert(response.data.data.message);
      window.location.href = "/Orders";
      } catch (error) {
        console.error("Error updating order:", error);
      }
     
    };

  const [orderDetail, setOrderDetail] = useState<orderDetailModel >();
  const [productDetail, setProductDetail] = useState<productModel[]>([]);
  const [address, setAddress] = useState<addressModel>();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/Admin/OrderDetail",
          {
            order_id: 32,
          }
        );

        const { data } = response;

        if (data.resultCd === 200 && data.result && data.data) {
          setOrderDetail(data.data.order_detail);
          setProductDetail(data.data.product_details);
          setAddress(data.data.address);
          setStatus(data.data.order_detail.order_status);
         
        } else {
          throw new Error("Failed to fetch order detail");
        }
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };

    fetchOrderDetail();
  }, []);

  const [status, setStatus] = useState("");
  const handleStatusChange = (event: { target: { value: string; }; }) => {
    setStatus(event.target.value);
  };

 

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Update Order
        </div>

        <div className="bg-white h-[1,314px] shadow-md  sm:rounded-lg p-6 flex flex-col gap-6 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Order ID:
              </label>
              <span>{orderDetail?.order_id}</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Products:
              </label>
              <ul>
                {productDetail &&
                  productDetail.map((product) => (
                    <>
                      <li className="flex items-center mb-2">
                        <img
                          src={product.image_url}
                          // alt={product.product_name}
                          className="w-8 h-8 mr-2"
                        />
                      </li>
                      <span>{product.product_name}</span>
                    </>
                  ))}
              </ul>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Total Amount:
              </label>
              <span>{orderDetail?.total_payment}</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <span>{address?.address}</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Recipient:
              </label>
              <span>{address?.full_name}</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status:
              </label>
              <select 
                
                value={status}
                onChange={handleStatusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ">
                <option value="waiting_for_payment">Waiting for Payment</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Update Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
