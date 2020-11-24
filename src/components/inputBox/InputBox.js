import { Box, TextField } from "@material-ui/core";
import { Face, Fingerprint, PersonAdd } from "@material-ui/icons";

export default function InputBox({
  classes,
  icon,
  label,
  type,
  name,
  form,
  onChangeHandler,
}) {
  const iconList = {
    personAddIcon: <PersonAdd />,
    faceIcon: <Face />,
    fingerPrintIcon: <Fingerprint />,
  };

  return (
    <Box display='flex' alignItems='center' className={classes.userNameBox}>
      {iconList[icon]}
      <TextField
        label={label}
        variant='outlined'
        type={type}
        name={name}
        value={form}
        onChange={onChangeHandler}
      />
    </Box>
  );
}
