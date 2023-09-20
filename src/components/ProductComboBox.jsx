//*ComboBox for creating orders with
//*the ability to create new products

import orderCombo from "@/localization/orderCombo";
import toastLocals from "@/localization/toast";
import { createProduct } from "../services/product";
import { createOrder } from "@/services/orders";
import {
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { capitalize } from "@/utilities/helpers";
import toast from "react-hot-toast";

//*autocomplete filter options
const filter = createFilterOptions();

const ProductComboBox = ({ data, units, type, lang }) => {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.login.userId);

  //!create product special for current user role
  const { mutate: addProduct } = useMutation({
    mutationFn: ({ name, unitId, type }) => createProduct(name, unitId, type),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(toastLocals[lang].successProduct);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });

  //!create order for current user
  const { mutate: addOrder } = useMutation({
    mutationFn: ({ productId, unitId, amount, description, applicantId }) =>
      createOrder(productId, unitId, amount, description, applicantId),
    mutationKey: ["orders", userId],
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userId]);
      toast.success(toastLocals[lang].successOrder);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });

  const [value, setValue] = useState(null); //!dropbox value
  const [open, toggleOpen] = useState(false); //!add dialog open toggle
  //!dialog for new item
  const [dialogValue, setDialogValue] = useState({
    label: "",
    unitsId: "",
  });
  const [amount, setAmount] = useState(null); //!amount to order
  const [description, setDescription] = useState(""); //!additional description for order

  //!format products dataset
  const products = data.map((product) => {
    return {
      id: product.id,
      label: product.name,
      unitsId: product.unitId,
      unit: product.units[lang],
    };
  });

  //!format units data
  const unitsIds = units.map((unit) => {
    return (
      <MenuItem key={unit.id} value={unit.id}>
        {unit[lang]}
      </MenuItem>
    );
  });

  //!close add new item dialog without any data
  const handleClose = () => {
    setDialogValue({
      label: "",
      unitsId: "",
    });
    toggleOpen(false);
  };

  //!add new product
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDialogValue({ ...dialogValue, unitsId: e.target.value });
    addProduct({
      name: dialogValue.label,
      unitId: dialogValue.unitsId,
      type: type,
    });
    handleClose();
  };

  //!handle add to order list
  const handleAddToOrder = async (e) => {
    e.preventDefault();
    let newAmount;
    if (typeof amount !== "number") {
      newAmount = parseFloat(amount.replace(/,/, "."));
      if (!newAmount) {
        toast.error(toastLocals[lang].errorNoNumber);
        return;
      }
    } else {
      newAmount = amount;
    }
    addOrder({
      productId: value.id,
      unitId: value.unitsId,
      amount: newAmount,
      description,
      applicantId: userId,
    });
  };
  return (
    <>
      <Stack direction="column" spacing={2}>
        <Autocomplete
          options={products}
          value={value}
          id="product-options"
          renderInput={(params) => (
            <TextField {...params} label={orderCombo[lang].chooseProduct} />
          )}
          renderOption={(props, option) => (
            <li {...props}>{`${option.label}${option.unit ? "," : "?"} ${
              option.unit ? option.unit : ""
            }`}</li>
          )}
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          onChange={(e, newValue) => {
            if (typeof newValue === "string") {
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  label: capitalize(newValue),
                  unitsId: "",
                });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                label: capitalize(newValue.inputValue),
                unitsId: "",
              });
            } else {
              setValue(newValue);
            }
          }}
          /*filter products while entering input*/
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                label: `${orderCombo[lang].add} ${params.inputValue}`,
              });
            }
            return filtered;
          }}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return capitalize(option);
            }
            if (option.inputValue) {
              return capitalize(option.inputValue);
            }
            return capitalize(option.label);
          }}
        />
        {value && (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              value={amount}
              onChange={(e) => {
                e.preventDefault();
                setAmount(e.target.value);
              }}
              label={orderCombo[lang].amount}
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="amount"
              value={description}
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
              label={orderCombo[lang].desc}
              type="text"
              variant="standard"
            />
            <Button variant="contained" size="large" onClick={handleAddToOrder}>
              {orderCombo[lang].order}
            </Button>
          </>
        )}
      </Stack>
      {/*add new product dialog */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>{orderCombo[lang].newProduct}</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <DialogContentText>
              {orderCombo[lang].addDialogTitle}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="label"
              value={dialogValue.label}
              onChange={(e) => {
                setDialogValue({ ...dialogValue, label: e.target.value });
              }}
              label={orderCombo[lang].title}
              type="text"
              variant="standard"
            />
            <Select
              value={dialogValue.unitsId}
              variant="standard"
              onChange={(e) => {
                setDialogValue({ ...dialogValue, unitsId: e.target.value });
              }}
            >
              {unitsIds}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{orderCombo[lang].cancel}</Button>
            <Button type="submit">{orderCombo[lang].add}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProductComboBox;
