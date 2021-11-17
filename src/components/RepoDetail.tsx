import {
  Typography,
  Button,
  CardContent,
  CardHeader,
  Link,
  Grid,
} from "@mui/material";
const RepoDetail = ({
  repo,
  handleClose,
  onEdit,
}: {
  repo: any;
  handleClose: () => void;
  onEdit: () => void;
}) => {
  return (
    <>
      <CardHeader
        title={<Typography variant="h4">{repo.name}</Typography>}
        subheader={
          <Typography variant="subtitle1" style={{ color: "#777" }}>
            Created At:{new Date(repo.createdAt).toLocaleString()}
          </Typography>
        }
        action={
          <Button color="warning" onClick={handleClose}>
            ×
          </Button>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Typography variant="subtitle1">Description:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle1">{repo.description}</Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="subtitle1">
              Link to github repository:
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle1">
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
          </Grid>
          <Grid item md={4}>
            <Typography variant="subtitle1">
              Link to github issues page:
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle1">
              <Button
                style={{ textTransform: "none", textDecoration: "underline" }}
                color="warning"
                component={Link}
                href={`${repo.url}/issues`}
                target="_blank"
              >
                {`${repo.url}/issues`}
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="warning"
          style={{ marginLeft: "auto" }}
          onClick={onEdit}
        >
          Edit
        </Button>
      </CardContent>
    </>
  );
};
export default RepoDetail;
