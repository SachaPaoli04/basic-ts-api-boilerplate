import { Router } from "express";
import { Films } from "../types";

const films: Films[] = [
  {
    id: 1,
    title: "Catch me if you can",
    director:"Steven Spielberg",
    duration:141,
    description: "oui je la"
  },
  {
    id: 2,
    title: "Whiplash",
    director:"Damien Chazelle",
    duration:107,
    description: "https://www.intofilm.org/intofilm-production/scaledcropped/970x546https%3A/s3-eu-west-1.amazonaws.com/images.cdn.filmclub.org/film__18296-whiplash--hi_res-e7fab42b.jpg/film__18296-whiplash--hi_res-e7fab42b.jpg"
  },
  {
    id: 3,
    title: "1917",
    director: "Sam Mendes",
    duration: 110,
    description: "nahhh"
  }
];

const router = Router();

router.get("/", (_req, res) => {
  return res.json(films);
});


router.get("/", (req, res) => {
  if (!req.query["DurationMax"]) {
    // Cannot call req.query.budget-max as "-" is an operator
    return res.json(films);
  }
  const durationMax = Number(req.query["DurationMax"]);
  const filteredFilms = films.filter((film) => {
    return film.duration <= durationMax;
  });
  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});



type NewFilm = Omit<Films, "id">;

export type { NewFilm, Films };



router.post("/", (req, res) => {

  const body: unknown = req.body;

  if (

    !body ||

    typeof body !== "object" ||

    !("title" in body) ||

    !("director" in body) ||

    !("duration" in body) ||

    !("description" in body) ||

    typeof body.title !== "string" ||

    typeof body.director !== "string" ||

    typeof body.duration !== "string" ||

    typeof body.description !== "string" ||

    !body.title.trim() ||

    !body.director.trim() ||

    !body.duration.trim() ||

    !body.description.trim()

  ) {

    return res.sendStatus(400);

  }


  const { title, director, duration, description } = body as NewFilm;


  const nextId =

    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +

    1;


  const NewFilm: Films = {

    id: nextId,

    title,

    director,

    duration,

    description,

  };


  films.push(NewFilm);

  return res.json(NewFilm);

});

export default router;
