import React from "react";
import { Container, Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function PesquisaPokemon({ filtraPokemon }) {
	return (
		<Container maxWidth="lg" sx={{ padding: "0px 16px 0px 26px", marginBottom: "40px" }}>
			<Grid container justifyContent={"center"}>
				<Paper
					component="form"
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Pesquise um pokemon"
						onChange={(e) => filtraPokemon(e.target.value)}
					/>
					<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
			</Grid>
		</Container>
	)
}