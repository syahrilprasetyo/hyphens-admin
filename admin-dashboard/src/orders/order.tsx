// order.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Orders = {
  id: number;
  total_payment: number;
  order_status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone_number: string;
  };
  bank: {
    bank_name: string;
  };
};

const ITEMS_PER_PAGE = 5;

export default function Order() {
  // Dummy order data
  const [orders, setOrders] = useState<Orders[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const handleDeleteorder = (orderId: number) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  async function fetchOrderList() {
    try {
      const response = await axios.post(
        "http://localhost:8000/Admin/OrderList"
      );
      const { data } = response;

      if (data.resultCd === 200 && data.result) {
        const orderList = data.data.orderList;
        const total_items = data.data.total_orders;

        setOrders(orderList);
        setTotalOrders(total_items);
      } else {
        throw new Error("Failed to fetch order list");
      }
    } catch (error) {
      console.error("Error fetching order list:", error);
      throw error;
    }
  }


  useEffect(() => {
    fetchOrderList();
  }, []);

    const [totalOrders, setTotalOrders] = useState(0);

   const handlePageChange = (newPage: number) => {
     if (newPage > 0 && newPage <= Math.ceil(totalOrders / ITEMS_PER_PAGE)) {
       setCurrentPage(newPage);
     }
   };

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

    const navigate = useNavigate();

    const handleUpdateOrder = (id: number) => {
      navigate("/UpdateOrder/" + { id });
    };
  

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Orders
        </div>

        <div className="bg-white shadow-md overflow-hidden sm:rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ORDER ID
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Email
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Phone
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((order) => (
                    <tr key={order.id}>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.id}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.customer.name}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.customer.email}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.customer.phone_number}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.total_payment}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.bank.bank_name}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        {order.order_status}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">
                        <button
                          onClick={() => handleUpdateOrder(order.id)}
                          className="text-red-500 hover:text-red-700">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="flex justify-center mt-4">
            <ul className="flex items-center">
              {/* Previous page button */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-700 text-white rounded-md mr-2">
                  Previous
                </button>
              </li>
              {/* Page numbers */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded-md mr-2 ${
                      currentPage === index + 1
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                    {index + 1}
                  </button>
                </li>
              ))}
              {/* Next page button */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-700 text-white rounded-md ml-2">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
