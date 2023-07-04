import React, { useEffect } from "react";
import CardPokemon from "../components/cardPokemon/CardPokemon";
import Cabecalho from "../components/cabecalho/Cabecalho";
import PesquisaPokemon from "../components/pesquisaPokemon/PesquisaPokemon";
import Paginacao from "../components/paginacao/Paginacao";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

export default function Home() {

  const [api, setApi] = useState([]);
  const [apiFilter, setApiFilter] = useState(null);
  const [filtrado, setFiltrado] = useState("");
  const [totalPokemons, setTotalPokemons] = useState([]);
  const [pages, setPages] = useState(0 + 1);
  const [offset, setOffset] = useState(0);
  const limit = 24;
  const totalPages = (totalPokemons / limit);

  const filtraPokemon = (nome) => {
    setFiltrado(nome);
  }

  useEffect(() => {
    getApiData();
  }, [offset]);

  useEffect(() => {
    if (filtrado === "" && apiFilter != null) {
      setApiFilter(null);
    }
  }, [filtrado]);

  useEffect(() => {
    numberOfPokemons();
  }, [])

  const getApiData = async () => {
    try {
      const endpoints = [];
      for (var i = offset + 1; i <= limit + offset; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      await Promise.all(endpoints.map((endpoint) => fetch(endpoint)))
        .then((res) => Promise.all(res.map(async r => r.json())))
        .then((res) => {
          setApi([...res]);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const filterApiData = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${filtrado}/`)
        .then((res) => (res.json()))
        .then((data) => setApiFilter(data));
    } catch (err) {
      console.log(err);
    }
  }

  const numberOfPokemons = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/`)
        .then((res) => (res.json()))
        .then((data) => setTotalPokemons(data.count));
    } catch (err) {
      console.log(err);
    }
  }

  const nextPage = () => {
    if (pages <= totalPages) {
      setPages(pages + 1);
      setOffset(offset + limit);
    }
  }

  const previousPage = () => {
    if (pages > 1) {
      setPages(pages - 1);
      setOffset(offset - limit);
    }
  }

  return (
    <>
      <Container sx={{ paddingBottom: 5 }}>
        <Grid container spacing={2}>
          <Cabecalho />
          <PesquisaPokemon filtraPokemon={filtraPokemon} filterApiData={filterApiData} />

          {apiFilter ? null : api.map((item, index) => (
            <Grid item key={index} xs={12} sm={4} md={2}>
              <CardPokemon nome={item.name} imagem={item.sprites.front_default} tipo={item.types} />
            </Grid>
          ))}

          {apiFilter ? (
            <Grid item key={apiFilter.id} xs={12} sm={4} md={2}>
              <CardPokemon nome={apiFilter.name} imagem={apiFilter.sprites.front_default} tipo={apiFilter.types} />
            </Grid>
          ) : null}

          <Grid item xs={12} textAlign="center">
            <Paginacao nextPage={nextPage} previousPage={previousPage} totalPokemons={totalPokemons} limit={limit} pages={pages} />
          </Grid>
        </Grid>
      </Container>

    </>
  )
}   
