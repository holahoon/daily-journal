import { CardActions, Button } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

export default function CardButton({ classes, onEdit, onDelete }) {
  return (
    <CardActions>
      <Button className={classes.cardButton} onClick={onEdit}>
        <Edit className={classes.cardEdit} />
      </Button>
      <Button className={classes.cardButton} onClick={onDelete}>
        <Delete className={classes.cardDelete} />
      </Button>
    </CardActions>
  );
}
