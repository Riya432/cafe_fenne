// import { useEffect, useState } from "react";
// import Title from "../ui/Title";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const status = ["preparing", "delivering", "delivered"];
//   const [hasExtra, setHasExtra] = useState(false);

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/orders`
//         );
//         setOrders(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getOrders();
//   }, []);

//   const handleStatusNext = async (id) => {
//     const item = orders.find((order) => order._id === id);
//     const currentStatus = item.status;

//     try {
//       const res = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
//         { status: currentStatus + 1 }
//       );
//       setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleStatusPrior = async (id) => {
//     const item = orders.find((order) => order._id === id);
//     const currentStatus = item.status;

//     try {
//       const res = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
//         { status: currentStatus - 1 }
//       );
//       setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleDelete = async (id) => {
//     if (confirm("Are you sure you want to delete this order?")) {
//       try {
//         const res = await axios.delete(
//           ` ${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
//         );
//         setOrders(orders.filter((order) => order._id !== id));
//         if (res.data) {
//           toast.success("Order deleted successfully");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
//       <Title addClass="text-[40px]">Products</Title>
//       <div className="overflow-x-auto w-full mt-5">
//         <table className="w-full text-sm text-center text-gray-500">
//           <thead className="text-xs text-gray-400 uppercase bg-gray-700">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 PRODUCT ID
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 CUSTOMER
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Products
//               </th>
//               <th scope="col" className="py-3">
//                 EXTRAS
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 TOTAL
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 PAYMENT
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 STATUS
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 ACTION
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 &&
//               orders
//                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                 .map((order) => (
//                   <tr
//                     className="transition-all bg-secondary border-gray-700 hover:bg-primary "
//                     key={order._id}
//                   >
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
//                       {order?._id.substring(0, 7)}
//                     </td>
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                       {order?.customer}
//                     </td>
//                     <td className="py-4 px-6 font-medium  hover:text-white flex-wrap w-[100px] whitespace-nowrap">
//                       {order?.products.map((product, index) => (
//                         <span key={index}>
//                           {product.title} * {product.foodQuantity} <br />
//                         </span>
//                       ))}
//                     </td>
//                     <td className="py-4 font-medium hover:text-white">
//                       {order?.products.map((item) => {
//                         return (
//                           <div key={item._id}>
//                             {item.extras &&
//                               item.extras.length > 0 &&
//                               item.extras.map((extra) => (
//                                 <span key={extra._id}>{extra.text}, </span>
//                               ))}
//                           </div>
//                         );
//                       })}
//                     </td>
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                       ${order?.total}
//                     </td>

//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                       {order?.method === 0 ? "Cash" : "Card"}
//                     </td>
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                       {status[order?.status]}
//                     </td>
//                     <td className="py-4 px-1 font-small whitespace-nowrap hover:text-white flex gap-3">
//                       <button
//                         className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
//                         onClick={() => handleStatusPrior(order?._id)}
//                         disabled={order?.status < 1}
//                       >
//                         Prior Stage
//                       </button>
//                       <button
//                         className="btn-primary !bg-yellow-600 w-28 !pl-0 !pr-0"
//                         onClick={() => handleDelete(order?._id)}
//                       >
//                         Delete Order
//                       </button>
//                       <button
//                         className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
//                         onClick={() => handleStatusNext(order?._id)}
//                         disabled={order?.status > 1}
//                       >
//                         Next Stage
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Order;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Title from "../ui/Title";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const status = ["preparing", "delivering", "delivered"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status: newStatus });
      const updatedOrders = orders.map(order => order._id === id ? res.data : order);
      setOrders(updatedOrders);
      toast.success(`Order status updated to ${status[newStatus]}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`);
        const filteredOrders = orders.filter(order => order._id !== id);
        setOrders(filteredOrders);
        toast.success("Order deleted successfully");
      } catch (error) {
        console.error('Failed to delete order:', error);
        toast.error('Failed to delete order');
      }
    }
  };

  return (
  <div className="lg:p-8 flex-1 lg:mt-0 relative min-h-[400px] lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
     <Title addClass="text-[40px]">Orders</Title>
    <Paper sx={{ width: '100%', overflow: 'hidden' , paddingLeft: '10%', paddingRight:'10%'}}>
      <TableContainer sx={{ maxHeight:" auto", marginTop:10 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Extras</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order._id}
              className="transition-all hover:bg-primary">
                <TableCell>{order._id.substring(0, 7)}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <div key={index}>{product.title} x {product.quantity}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.products.map((product) =>
                    product.extras.map((extra, index) => <span key={index}>{extra.text}, </span>)
                  )}
                </TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.method === 0 ? "Cash" : "Card"}</TableCell>
                <TableCell>{status[order.status]}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleStatusChange(order._id, Math.max(order.status - 1, 0))} disabled={order.status === 0}>
                    <ArrowBackIosIcon /> 
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleStatusChange(order._id, Math.min(order.status + 1, 2))} disabled={order.status === 2}>
                    <ArrowForwardIosIcon /> 
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   </div>
  );
};

export default Order;