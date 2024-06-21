// dokter.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Dokter = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  contact: string;
};

const ITEMS_PER_PAGE = 5;

export default function Dokter() {
  // Dummy dokter data
  const [dokters, setDokters] = useState<Dokter[]>([
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      location: "City Hospital",
      contact: "1234567890",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Dermatologist",
      location: "County Medical Center",
      contact: "9876543210",
    },
    // Add more dummy data here if needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dokters.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Any additional logic on component mount can be added here
  }, []);

  const [totalDokters, setTotalDokters] = useState(dokters.length);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalDokters / ITEMS_PER_PAGE)) {
      setCurrentPage(newPage);
    }
  };

  const navigate = useNavigate();
  const handleAddDokter = () => {
    navigate("/FormTambahDokter");
  };

  const totalPages = Math.ceil(totalDokters / ITEMS_PER_PAGE);

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Dokters
        </div>

        <div className="bg-white shadow-md overflow-hidden sm:rounded-lg p-6">
          <div className="flex flex-row justify-between p-6 gap-6">
            {/* <input type="text" className="border w-full h-[48px] rounded-xl" /> */}
            <button
              onClick={handleAddDokter}
              className="px-6 py-[10px] rounded-3xl h-[44px] w-[181px] bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4">
              Add Dokter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((dokter) => (
                  <tr key={dokter.id}>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                      {dokter.id}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                      {dokter.name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                      {dokter.specialty}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                      {dokter.location}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">
                      {dokter.contact}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs flex gap-2">
                      <button className="text-green-600 font-bold">
                        update
                      </button>
                      <button className="text-red-500 font-bold">remove</button>
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
