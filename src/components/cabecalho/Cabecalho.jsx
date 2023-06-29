import { Container, Grid } from "@mui/material";
import pokeapi_logo from "./images/pokeapi_logo.png";

export default function Cabecalho() {

  return (
    <Container maxWidth="lg" sx={{ margin: "20px auto 40px" }}>
      <Grid container justifyContent="center">
        <Grid item>
          <div>
            <img src={pokeapi_logo} alt="" />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
