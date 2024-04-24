// import { useEffect, useState } from "react";
// import Title from "../ui/Title";
// import Image from "next/image";
// import AddProduct from "./AddProduct";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Products = () => {
//   const [isProductModal, setIsProductModal] = useState(false);
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/products`
//       );
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);
//   const handleDelete = async (id) => {
//     try {
//       if (confirm("Are you sure you want to delete this product?")) {
//         const res = await axios.delete(
//           `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
//         );
//         if (res.status === 200) {
//           toast.success("Product deleted successfully");
//           getProducts();
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <div className="lg:p-8 flex-1 lg:mt-0 relative min-h-[400px]  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
//       <Title addClass="text-[40px]">Products</Title>
//       <div className="overflow-x-auto w-full mt-5 max-h-[500px] overflow-auto">
//         <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px]">
//           <thead className="text-xs text-gray-400 uppercase bg-gray-700">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 IMAGE
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 ID
//               </th>
//               <th scope="col" className="py-3">
//                 TITLE
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 PRICE
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 ACTION
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {products &&
//               products.map((product) => (
//                 <tr
//                   className="transition-all bg-secondary border-gray-700 hover:bg-primary"
//                   key={product._id}
//                 >
//                   <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
//                     <Image src={product.img} alt="" width={50} height={50} />
//                   </td>
//                   <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                     {product._id.substring(0, 5)}...
//                   </td>
//                   <td className="py-4 font-medium whitespace-nowrap hover:text-white">
//                     {product.title}
//                   </td>
//                   <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                     ${product.prices[0]}
//                   </td>
//                   <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                     <button
//                       className="btn-primary !bg-danger"
//                       onClick={() => handleDelete(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//       {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
//       <button
//         className="btn-primary w-12 h-12 !p-0  bottom-14 right-14 text-4xl text-center absolute"
//         onClick={() => setIsProductModal(true)}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default Products;


import { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import AddProduct from "./AddProduct";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';

const Products = () => {
  const [isProductModal, setIsProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (res.status === 200) {
          toast.success("Product deleted successfully");
          getProducts();
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 relative min-h-[400px] lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
      <Title addClass="text-[40px]">Products</Title>
      <Paper sx={{ width: 'auto', overflow: 'hidden', maxHeight: 500 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>IMAGE</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow
                  key={product._id}
                  className="transition-all hover:bg-primary"
                >
                  <TableCell align="center">
                    <Image src={product.img || "/no-image.png"} alt={product.title} width={50} height={50} />
                  </TableCell>
                  <TableCell>{product._id.substring(0, 5)}...</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.prices[0]}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
      <button
        className="btn-primary w-12 h-12 !p-0 bottom-14 right-14 text-4xl text-center absolute"
        onClick={() => setIsProductModal(true)}
      >
        +
      </button>
    </div>
  );
};

export default Products;