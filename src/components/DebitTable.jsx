import { Button, Grid, Typography } from "@mui/material";

import ProductCard from "./productCard/ProductCard";
import toast from "react-hot-toast";

import { editQuantity } from "@/services/product";

import { useMutation, useQueryClient } from "react-query";

import kitchen from "@/localization/kitchen";
import toastLocals from "@/localization/toast";
import main from "@/localization/main";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

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
            error={toastLocals[lang].errorNoNumber}
          />
        </Grid>
      );
    }
  });
  const handleExport = async () => {
    const borderStyles = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Export");
    //column titles
    worksheet.columns = [
      {
        header: `${kitchen[lang].title}`,
        key: "title",
        width: 40,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: `${kitchen[lang].abbrUnits}`,
        key: "units",
        width: 10,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: `${kitchen[lang].currentPrice}`,
        key: "currentPrice",
        width: 13,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: `${kitchen[lang].averagePrice}`,
        key: "averagePrice",
        width: 13,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: `${kitchen[lang].amount}`,
        key: "amount",
        width: 11,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: `${kitchen[lang].sum}`,
        key: "sum",
        width: 11,
        style: { alignment: { horizontal: "center" } },
      },
    ];
    //add rows
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (product.quantity > 0) {
        worksheet.addRow({
          title: product.name,
          units: product.units[lang],
          currentPrice: product.currentPrice,
          averagePrice: product.average,
          amount: product.quantity,
          sum: product.quantity * product.average,
        });
        total += product.quantity * product.average;
      }
    }
    worksheet.addRow({ amount: kitchen[lang].total, sum: total });
    //add borders
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = borderStyles;
      });
    });

    //save file
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${kitchen[lang].report}.xlsx`
      );
    });
  };
  return (
    <>
      <Grid container spacing={1}>
        {productCards}
      </Grid>
      <Button
        onClick={handleExport}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        {main[lang].export}
      </Button>
    </>
  );
};

export default DebitTable;
