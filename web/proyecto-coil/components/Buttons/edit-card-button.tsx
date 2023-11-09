import { useTheme } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
interface PropsType {
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setModalClose?: React.Dispatch<React.SetStateAction<boolean>>;
  modalClose?: boolean;
}

const EditCardButton = ({
  onEdit,
  setOnEdit,
  setModalClose,
  modalClose,
}: PropsType) => {
  const theme = useTheme();
  return (
    <EditTwoToneIcon
      sx={{
        position: "absolute",
        left: "10px",
        top: "10px",
        fontSize: "30px",
        cursor: "pointer",
        color: "green",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "50%",
        padding: "2px",
      }}
      onClick={() => {
        onEdit ? setOnEdit(false) : setOnEdit(true);
        if (modalClose && setModalClose) {
          modalClose ? setModalClose(false) : setModalClose(true);
        }
      }}
    />
  );
};

export default EditCardButton;
