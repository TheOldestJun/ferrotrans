import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import ProductCard from "./productCard/ProductCard";
import toast from "react-hot-toast";

import { editQuantity } from "@/services/product";

import { useMutation, useQueryClient } from "react-query";

import kitchen from "@/localization/kitchen";
import toastLocals from "@/localization/toast";
import main from "@/localization/main";

const DebitTable = ({ data, lang }) => {
  const queryClient = useQueryClient();
  const { mutate: editAmount } = useMutation({
    mutationFn: ({ id, amount }) => editQuantity(id, amount),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(toastLocals[lang].successProductUpdate);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });


  const productCards = data.map((product) => {
    if (product.quantity > 0) {
      return (
        <Grid item key={product.id} xs={12}>
          <ProductCard
            id={product.id}
            name={product.name}
            units={product.units[lang]}
            currentLabel={kitchen[lang].currentPrice}
            averageLabel={kitchen[lang].averagePrice}
            current={product.currentPrice}
            average={product.average}
            amount={kitchen[lang].amount}
            quantity={product.quantity}
            onEdit={editAmount}
            confirm={main[lang].confirm}
            cancel={main[lang].cancel}
            debitQuestion={kitchen[lang].debitQuestion}
          />
        </Grid>
      );
    }
  });
  return (
    <Grid container spacing={1}>
      {productCards}
    </Grid>
  );
};

export default DebitTable;
