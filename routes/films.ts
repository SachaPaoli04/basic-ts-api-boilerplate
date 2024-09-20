import { Router } from "express";
import { Films } from "../types";

const films: Films[] = [
  {
    id: 1,
    title: "Catch me if you can",
    director:"Steven Spielberg",
    duration:141
  },
  {
    id: 2,
    title: "Whiplash",
    director:"Damien Chazelle",
    duration:107
  },
  {
    id: 3,
    title: "1917",
    director: "Sam Mendes",
    duration: 110
  }
];

const router = Router();

router.get("/", (_req, res) => {
  return res.json(films);
});

export default router;
