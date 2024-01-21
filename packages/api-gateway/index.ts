import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const port = 3001;
const base_url =
  "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api";
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));

app.get("/restaurants/:restaurantId", (req, res) => {
  fetch(`${base_url}/restaurants/${req.params.restaurantId}.json`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => res.json(data));
    } else {
      return res.status(response.status).json({ error: response.statusText });
    }
  });
});

app.get("/restaurants/:restaurantId/menus/:menuName/", (req, res) => {
  const { type } = req.query;
  if (type === "short") {
    fetch(
      `${base_url}/restaurants/${req.params.restaurantId}/menus/${req.params.menuName}/short.json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => res.json(data));
      } else {
        return res.status(response.status).json({ error: response.statusText });
      }
    });
  } else if (type === "full") {
    fetch(
      `${base_url}/restaurants/${req.params.restaurantId}/menus/${req.params.menuName}/full.json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => res.json(data));
      } else {
        return res.status(response.status).json({ error: response.statusText });
      }
    });
  }
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
