import { Container, Typography } from "@mui/material";
import FullScreenLoading from "../components/loading";

export default function Loading() {
  return (
    // <Container>
    //     <Typography variant="h4">Loading...</Typography>
    // </Container>
    <FullScreenLoading open={true} />
  );
}
