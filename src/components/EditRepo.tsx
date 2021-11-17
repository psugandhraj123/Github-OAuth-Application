import { useState } from "react";
import {
  CardHeader,
  Typography,
  TextField,
  CardContent,
  Button,
  TextareaAutosize,
} from "@mui/material";
import UpdateRepoMutation from "../mutation/EditRepoMutation";

interface EditRepoProps {
  name: string;
  description: string;
  repositoryId: string;
  showDetail: () => void;
  handleClose: () => void;
}
const EditRepo = (props: EditRepoProps) => {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);

  return (
    <>
      <CardHeader
        title={<Typography variant="h4">Edit Repository</Typography>}
        action={
          <Button color="warning" onClick={props.handleClose}>
            ×
          </Button>
        }
      />
      <CardContent>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography variant="subtitle1">Description:</Typography>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Enter description"
          value={description}
          style={{ width: 500, height: 300, display: "block", margin: 5 }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="warning"
          style={{ marginLeft: 5 }}
          onClick={() =>
            UpdateRepoMutation(
              name,
              description,
              props.repositoryId,
              props.showDetail
            )
          }
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="warning"
          style={{ marginLeft: 5 }}
          onClick={props.showDetail}
        >
          Cancel
        </Button>
      </CardContent>
    </>
  );
};

export default EditRepo;
