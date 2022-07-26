import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const { IngredientId } = cartItems;
  console.log(cartItems);
  return (
    <div className="main">
      <div className="flex-container">
        <div className="flex-child">
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.Name}
                      </TableCell>
                      <TableCell align="right">{row.Amount}</TableCell>
                      <TableCell align="right">{row.Unit}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button Style="danger" children="Complete Shopping" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
