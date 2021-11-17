import { useState } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import RepoDetail from "./RepoDetail";
import EditRepoDetail from "./EditRepoDetail";
const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};
const RepoItem = ({ repo }: { repo: any }) => {
  const [modal, setModal] = useState<"" | "VIEW" | "EDIT">("");
  return (
    <>
      <Card
        style={{
          marginTop: 10,
          height: 200,
          backgroundColor: "white",
        }}
      >
        <CardHeader
          title={<Typography variant="h5">{repo.name}</Typography>}
          subheader={
            <Typography variant="subtitle1" style={{ color: "#777" }}>
              Created At:{new Date(repo.createdAt).toLocaleString()}
            </Typography>
          }
          action={
            <Button
              variant="contained"
              color="warning"
              onClick={() => setModal("VIEW")}
            >
              Details
            </Button>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">
            Link to github repository:
            <Button
              style={{ textTransform: "none", textDecoration: "underline" }}
              color="warning"
              component={Link}
              href={repo.url}
              target="_blank"
            >
              {repo.url}
            </Button>
          </Typography>
        </CardContent>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal !== ""}
        onClose={() => setModal("")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal !== ""}>
          <Card sx={style}>
            {modal === "VIEW" && (
              <RepoDetail
                repo={repo}
                handleClose={() => setModal("")}
                onEdit={() => setModal("EDIT")}
              />
            )}
            {modal === "EDIT" && (
              <EditRepoDetail
                repositoryId={repo.id}
                name={repo.name}
                description={repo.description}
                handleClose={() => setModal("")}
                showDetail={() => setModal("VIEW")}
              />
            )}
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default createFragmentContainer(RepoItem, {
  repo: graphql`
    fragment RepoItem_repo on Repository {
      id
      name
      createdAt
      url
      description
      collaborators {
        nodes {
          login
          name
        }
      }
    }
  `,
});
