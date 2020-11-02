import { CardMedia, CardActionArea, Typography } from "@material-ui/core";

export default function CardListContent({
  classes,
  editedTime,
  description,
  hour,
  minute,
  term,
  onToggleModal,
}) {
  return (
    <CardMedia className={classes.cardContent}>
      <CardActionArea
        className={classes.cardContentButton}
        onClick={onToggleModal}
      >
        <Typography variant='h6' component='h3' className={classes.cardTime}>
          {editedTime} {hour}:{minute} {term}
        </Typography>
        <Typography
          variant='body1'
          component='p'
          className={classes.cardDescription}
        >
          {description}
        </Typography>
      </CardActionArea>
    </CardMedia>
  );
}
