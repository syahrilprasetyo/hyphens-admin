// Product.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

export type Product = {
  id: number;
  product_name: string;
  regular_price: string;
  discount: null;
  final_price: string;
  image: string;
  qty: number;
  desc: string;
  status: string;
};

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    console.log(offset, ITEMS_PER_PAGE);
    try {
      const response = await axios.post(
        "http://localhost:8000/Admin/ProductList",
        {
          startIndex: offset,
          limit: ITEMS_PER_PAGE,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setProducts(response.data.data.productList);
      setTotalProducts(response.data.data.total_product);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalProducts / ITEMS_PER_PAGE)) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

   const navigate = useNavigate();

   const handleAddProduct = () => {
     navigate("/FormTambahProduct");
   };

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Product
        </div>

        {/* Create Product Button */}

        {/* Add Product Form */}

        {/* Table of Products */}
        <div className="bg-white shadow-md overflow-hidden sm:rounded-lg py-6">
          <div className="flex flex-row justify-between p-6 gap-6">
            <input type="text" className="border w-full h-[48px] rounded-xl" />
            <button
              onClick={handleAddProduct}
              className="px-6 py-[10px] rounded-3xl h-[44px] w-[181px] bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4">
              Add Product
            </button>
          </div>
          <table className="min-w-full  ">
            <thead className="">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Normal Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-gray-200">
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.product_name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.qty}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.regular_price}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.discount ?? 0}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {product.final_price}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">Active</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        // onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 mr-2">
                        Delete
                      </button>
                      <button
                        // onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 mr-2">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div>
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
      </div>
    </>
  );
}
