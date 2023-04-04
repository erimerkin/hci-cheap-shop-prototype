import Head from 'next/head'
import { useState } from "react";
import SpanningTable from '../components/OrderTable';
import { useRouter } from 'next/navigation';


import { Box, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import CardLayout from '../components/CardLayout';
import AccordionItem from '../components/AccordionItem';
import OrderConfirmationDialog from '../components/OrderConfirmation';


export default function Home() {
  const { push } = useRouter();

  const [addedProducts, setAddedProducts] = useState([]);

  const [expandUserData, setExpandUserData] = useState(true);
  const [userDataComplete, setuserDataComplete] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    children: "",
    cancelAction: () => { },
    buttonAction: () => { },
    buttonLabel: "",
  });


  const [newProduct, setNewProduct] = useState({
    id: "",
    price: 0,
    amount: 0,
  });

  const [addError, setAddError] = useState({
    id: "",
    price: "",
    amount: "",
  });


  const [purchaserInfo, setPurchaserInfo] = useState({
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    province: "",
    date: "",
    address: "",
    credit_card: "",
    validation: "",
  });


  const [purchaserError, setPurchaserError] = useState({
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    province: "",
    date: "",
    address: "",
    credit_card: "",
    validation: "",
  });

  const addProduct = (item) => {

    let errorFound = false;

    setAddError({
      id: "",
      price: "",
      amount: "",
    });

    if (item.id === "") {
      setAddError({ ...addError, id: "Product ID cannot be empty" });
      errorFound = true;
    }

    if (item.price === "") {
      setAddError({ ...addError, price: "Please enter price" });
      errorFound = true;
    }
    else if (parseFloat(item.price) <= 0) {
      setAddError({ ...addError, price: "Price must be greater than 0" });
      errorFound = true;
    }

    if (item.amount <= 0) {
      setAddError({ ...addError, amount: "Amount must be greater than 0" });
      errorFound = true;
    }

    if (errorFound) {
      return;
    }

    const product = {
      id: item.id,
      price: item.price,
      amount: item.amount,
      totalPrice: item.price * item.amount,
    };

    setAddedProducts([...addedProducts, product]);

    setNewProduct({
      id: "",
      price: 0,
      amount: 0,
    });
  };


  const removeProduct = (id) => {

    setDialog({
      open: true,
      title: "Remove Product",
      children: `Are you sure you want to remove the product with id ${id}?`,
      cancelAction: () => {
        setDialog({ ...dialog, open: false });
      },
      buttonAction: () => {
        const newProducts = addedProducts.filter((product) => product.id !== id);
        setAddedProducts(newProducts);
        setDialog({ ...dialog, open: false });
      },
      buttonLabel: "Remove",
    });
  };

  const adjustAmount = (id, amount) => {
    const newProducts = addedProducts.map((product) =>
      product.id === id ? { ...product, amount: amount, totalPrice: amount * product.price } : product
    );
    setAddedProducts(newProducts);
  };

  const saveUserInfo = () => {

    if (!editInfo && userDataComplete) {
      console.log("here")
      setEditInfo(true);
      return;
    }

    let tempError = {
      name: "",
      phone: "",
      postalCode: "",
      city: "",
      province: "",
      date: "",
      address: "",
      credit_card: "",
      validation: "",
    }

    let errorFound = false;
    if (purchaserInfo.name === "") {
      tempError.name = "Name cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.phone === "") {
      tempError.phone = "Phone cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.postalCode === "") {
      tempError.postalCode = "Postal Code cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.city === "") {
      tempError.city = "City cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.province === "") {
      tempError.province = "Province cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.date === "") {
      tempError.date = "Date cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.address === "") {
      tempError.address = "Address cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.credit_card === "") {
      tempError.credit_card = "Credit Card cannot be empty";
      errorFound = true;
    }

    if (purchaserInfo.validation === "") {
      tempError.validation = "Validation cannot be empty";
      errorFound = true;
    }

    setPurchaserError(tempError);

    if (errorFound) {
      return;
    }

    setuserDataComplete(true);
    setEditInfo(false);
    setExpandUserData(false);
  };


  const finishOrder = () => {

    setDialog({
      open: true,
      title: "Confirm Order",
      children: (
        <div>
          Are you sure you want to confirm your order, please check the details below:
          <br />
          <strong>Name:</strong>{purchaserInfo.name}
          <br />
          <strong>Phone:</strong>{purchaserInfo.phone}
          <br />
          <strong>Address:</strong>{purchaserInfo.address},{purchaserInfo.city},{purchaserInfo.province},{purchaserInfo.postalCode}
          <br />

          <br />
          <strong>Products:</strong>
          <br />
          <ul>
            {addedProducts.map((product) => (
              <div>
                <li>
                  {product.amount} x {product.id} - ${product.totalPrice}
                </li>
                <br />
              </div>
            ))}
          </ul>
          <strong>Total Price:</strong> {addedProducts.reduce((total, product) => total + product.totalPrice, 0)}
        </div>
      ),
      cancelAction: () => {
        setDialog({ ...dialog, open: false });
      },
      buttonAction: () => {
        push(`/confirmation/${parseInt(Math.random() * 100000)}`)
        setDialog({ ...dialog, open: false });
      },
      buttonLabel: "Confirm",
    });
  };



  return (
    <div>
      <Head>
        <title>Cheap Shop - CMPE496 Assignment 2</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <OrderConfirmationDialog isOpen={dialog.open} title={dialog.title} children={dialog.children} cancelAction={dialog.cancelAction} buttonAction={dialog.buttonAction} buttonLabel={dialog.buttonLabel} />
        <CardLayout maxWidth="80%">
          <Typography variant='h2' sx={{ fontSize: 32, fontWeight: 600 }} gutterBottom>
            Cheap Shop
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <AccordionItem
            expandStatus={expandUserData}
            title="Purchaser Information"
            secondary={
              userDataComplete ? <Typography sx={{ marginLeft: 4, color: "green" }}>
                Completed
              </Typography> : <Typography sx={{ marginLeft: 4, color: "red" }}> *Required </Typography>
            }
          >
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Name'
                    value={purchaserInfo.name}
                    helperText={purchaserError.name}
                    error={purchaserError.name !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Phone'
                    value={purchaserInfo.phone}
                    helperText={purchaserError.phone}
                    error={purchaserError.phone !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={2} md={2}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Postal Code'
                    value={purchaserInfo.postalCode}
                    helperText={purchaserError.postalCode}
                    error={purchaserError.postalCode !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, postalCode: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='City'
                    value={purchaserInfo.city}
                    helperText={purchaserError.city}
                    error={purchaserError.city !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Province'
                    value={purchaserInfo.province}
                    helperText={purchaserError.province}
                    error={purchaserError.province !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, province: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Address'
                    multiline
                    rows={3}
                    value={purchaserInfo.address}
                    helperText={purchaserError.address}
                    error={purchaserError.address !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Date'
                    value={purchaserInfo.date}
                    helperText={purchaserError.date}
                    error={purchaserError.date !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Credit Card'
                    value={purchaserInfo.credit_card}
                    helperText={purchaserError.credit_card}
                    error={purchaserError.credit_card !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, credit_card: e.target.value })}
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <TextField
                    disabled={!editInfo && userDataComplete}
                    fullWidth
                    variant='outlined'
                    label='Validation Id'
                    value={purchaserInfo.validation}
                    helperText={purchaserError.validation}
                    error={purchaserError.validation !== ""}
                    onChange={(e) => setPurchaserInfo({ ...purchaserInfo, validation: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <Button variant="outlined" color="primary" onClick={saveUserInfo}>
                      {!userDataComplete ? "Confirm" : editInfo ? "Save" : "Edit"}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </AccordionItem>
          <AccordionItem title={`Cart Items (${addedProducts.length})`}>
            <SpanningTable addedProducts={addedProducts} deleteAction={removeProduct} updateAmount={adjustAmount}></SpanningTable>
          </AccordionItem>

          <div>
            <AccordionItem title="Add Product">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Product ID'
                    value={newProduct.id}
                    helperText={addError.id}
                    error={addError.id !== ""}
                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                  />
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Price'
                    type="number"
                    value={newProduct.price}
                    helperText={addError.price}
                    error={addError.price !== ""}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </Grid>
                <Grid item xs={4} sm={3} md={2}>
                  <TextField
                    fullWidth
                    id="outlined-number"
                    value={newProduct.amount}
                    helperText={addError.amount}
                    label="Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: '100px'
                    }}
                    error={addError.amount !== ""}
                    onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value > -1 ? e.target.value : 0 })}
                  />
                </Grid>
                <Grid item xs={4} sm={3} md={2}>
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <Button fullWidth variant='outlined' size="medium" onClick={() => addProduct(newProduct)}>+ Add Product</Button>
                  </div>
                </Grid>
              </Grid>
            </AccordionItem>
          </div>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button disabled={!userDataComplete || addedProducts.length === 0} variant="contained" color="success" size="large" sx={{ marginLeft: "auto" }} onClick={finishOrder}>
              Finish order
            </Button>
          </div>
        </CardLayout>
      </main>
    </div >
  )
}
