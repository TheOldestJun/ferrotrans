import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import { useState } from "react";
import DebitDialog from "../executionDialog/DebitDialog";

const ProductCard = ({
  id,
  name,
  units,
  currentLabel,
  averageLabel,
  current,
  average,
  amount,
  quantity,
  onEdit,
  confirm,
  cancel,
  debitQuestion,
  error,
}) => {
  const [modal, showModal] = useState(false);
  const handleCancel = () => {
    showModal(false);
  };
  return (
    <>
      <Card>
        <CardActionArea onClick={() => showModal(true)}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography
              color={"primary.dark"}
            >{`${name}, ${units}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              color={"primary.main"}
            >{`${currentLabel}: ${current}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              color={"primary.light"}
            >{`${averageLabel}: ${average}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              color={"info.main"}
            >{`${amount}: ${quantity}`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {modal && (
        <DebitDialog
          productId={id}
          debitQuestion={debitQuestion}
          confirm={confirm}
          cancel={cancel}
          editLabel={amount}
          onCancel={handleCancel}
          onEdit={onEdit}
          error={error}
        />
      )}
    </>
  );
};

export default ProductCard;
