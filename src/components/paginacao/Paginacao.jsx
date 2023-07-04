import { Button } from "@mui/material";

export default function Paginacao({ nextPage, previousPage, totalPokemons, limit, pages }) {

	return (
		<div className="paginacao">
			<Button onClick={previousPage} variant="contained" color="success" sx={{ width: 250 }}>
				Página anterior
			</Button>
			<div>{pages} / {Math.ceil(totalPokemons / limit)}</div>
			<Button onClick={nextPage} variant="contained" color="success" sx={{ width: 250 }}>
				Próxima página
			</Button>
		</div>
	)
}