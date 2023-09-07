import { CardContent, Typography, Divider } from "@mui/material";

import { useSelector } from "react-redux";

import main from "@/localization/main";

const OrderCardContent = ({
  title,
  product,
  amount,
  description,
  units,
  doneAt,
  done,
  doneAmount,
  ordered,
  orderedAt,
}) => {
  const lang = useSelector((state) => state.lang.lang);
  return (
    <CardContent sx={{ flex: "1 0 auto" }}>
      <Typography
        sx={{ fontSize: "10px" }}
      >{`${main[lang].dateOrdered}: ${title}`}</Typography>
      {ordered && (
        <Typography
          sx={{ fontSize: "10px", textAlign: "center" }}
        >{`${main[lang].ordered}: ${orderedAt}`}</Typography>
      )}
      {done && (
        <Typography
          sx={{ fontSize: "10px", textAlign: "right" }}
        >{`${main[lang].done}: ${doneAt}`}</Typography>
      )}
      <Divider sx={{ my: 1 }} color="#4caf50" />
      <Typography component="div" variant="h5" color={"primary.dark"}>
        {product}
      </Typography>
      <Typography component="div" variant="subtitle2">
        {description ? description : main[lang].noNotes}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        component="div"
        sx={{ pb: 1 }}
      >
        {`${amount} ${units}, ${main[lang].doneAmount} - ${doneAmount} ${units}`}
      </Typography>
      <Divider color="#ff9800" />
    </CardContent>
  );
};

export default OrderCardContent;
