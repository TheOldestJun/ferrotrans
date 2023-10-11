import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContactsIcon from "@mui/icons-material/Contacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import main from "@/localization/main";
import { useState } from "react";
import { useSelector } from "react-redux";

const DoneOrderCard = ({
  firstName,
  lastName,
  lang,
  id,
  title,
  amount,
  orderAmount,
  orderBy,
  doneBy,
  doneAmount,
  orderedAt,
  doneAt,
  product,
  description,
  onDelete,
  acceptedBy,
  units,
}) => {
  const [open, setOpen] = useState(false);
  const loginFirstName = useSelector((state) => state.login.firstName);
  const loginLastName = useSelector((state) => state.login.lastName);
  const loginFullName = `${loginFirstName} ${loginLastName}`;
  const fullName = `${firstName} ${lastName}`;
  const show = loginFullName === fullName;
  return (
    <Card
      sx={{
        display: "flex",
        "&:hover": { boxShadow: 8 },
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ pb: 0, pt: 1 }}>
        {!open && !show && (
          <Typography variant="body2">{`${main[lang].applicant}: ${firstName} ${lastName}`}</Typography>
        )}

        <Typography variant="body2">{`${main[lang].title}: ${product} ${description} - ${amount} ${units}`}</Typography>
        {!open && (
          <Typography variant="body2">{`${main[lang].dateOrdered}: ${title}`}</Typography>
        )}
      </CardContent>
      <CardActionArea sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          <ArrowDropDownIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(id)}>
          <DeleteForeverIcon />
        </IconButton>
      </CardActionArea>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            {`${main[lang].order}: ${amount} ${units}`}
            {<CalendarMonthIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
            {title}
            <ContactsIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />
            {!show ? `${firstName} ${lastName}` : main[lang].yours}
          </Typography>
          <Typography variant="body2">
            {`${main[lang].ordered}: ${orderAmount} ${units}`}

            {<CalendarMonthIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
            {orderedAt}
            {<ContactsIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
            {orderBy}
          </Typography>
          <Typography variant="body2">
            {`${main[lang].done}: ${doneAmount} ${units}`}

            {<CalendarMonthIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
            {doneAt}
            {<ContactsIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
            {doneBy}
          </Typography>
          {acceptedBy && (
            <Typography variant="body2">
              {`${main[lang].acceptedBy}: ${doneAmount} ${units}`}
              {<CalendarMonthIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
              {doneAt}
              {<TaskAltIcon sx={{ ml: 1, mr: 1, fontSize: 12 }} />}
              {acceptedBy !== loginFullName ? acceptedBy : main[lang].you}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default DoneOrderCard;
