// import { useEffect, useState } from "react";
// import Input from "../form/Input";
// import Title from "../ui/Title";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Category = () => {
//   const [inputText, setInputText] = useState("");
//   const [categories, setCategories] = useState([""]);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/categories`
//         );
//         setCategories(res?.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCategories();
//   }, []);

//   const handleCreate = async () => {
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/categories`,
//         {
//           title: inputText,
//         }
//       );
//       setCategories([...categories, res?.data]);
//       setInputText("");
//       toast.success("Category Created", {
//         position: "bottom-left",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (e, id) => {
//     e.preventDefault();
//     try {
//       if (confirm("Are you sure you want to delete this category?")) {
//         await axios.delete(
//           `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
//         );
//         setCategories(categories.filter((cat) => cat._id !== id));
//         toast.warning("Category Deleted", {
//           position: "bottom-left",
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
//       <Title addClass="text-[40px]">Category</Title>
//       <div className="mt-5">
//         <div className="flex gap-4 flex-1 items-center">
//           <Input
//             placeholder="Add a new Category..."
//             onChange={(e) => setInputText(e.target.value)}
//             value={inputText}
//           />
//           <button className="btn-primary" onClick={handleCreate}>
//             Add
//           </button>
//         </div>
//         <div className="mt-10  max-h-[40rem] overflow-auto p-4 flex flex-col justify-center ">
//           {categories.map((category) => (
//             <div
//               className="flex justify-between mt-4 border p-3 items-center border-r-4 border-b-8 border-primary rounded-lg hover:border-secondary transition-all"
//               key={category._id}
//             >
//               <b className="sm:text-xl text-md">{category.title}</b>
//               <button
//                 className="btn-primary !bg-danger text-sm sm:text-base"
//                 onClick={(e) => handleDelete(e, category._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Modal, Box, TextField, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Title from "../ui/Title";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { title: inputText });
      setCategories([...categories, res.data]);
      setInputText('');
      toast.success("Category created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
      toast.warning("Category deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 relative min-h-[400px] lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
       <Title addClass="text-[40px]">Category</Title>
    <Paper sx={{ width: '100%', overflow: 'hidden', paddingLeft:'10%', paddingRight:'10%' }}>
      <TableContainer sx={{ maxHeight: 'auto', marginTop:10}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{backgroundColor:'red'}}>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category._id}
              className="transition-all hover:bg-primary">
                <TableCell component="th" scope="row">
                  {category.title}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(category._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box sx={{ p: 2 }}>
        <TextField
          label="Add a new Category"
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button onClick={handleCreate} variant="contained" className='bg-primary'>
          Add
        </Button>
      </Box>
    </Paper>
    </div>
  );
};

export default Category;