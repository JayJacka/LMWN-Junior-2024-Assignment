import { test, expect } from "vitest";
import fetch from "node-fetch";

test("GET /", async () => {
  const response = await fetch("http://localhost:3001/");
  const text = await response.text();

  expect(response.status).toBe(200);
  expect(text).toBe("LINE MAN Wongnai Frontend Assignment");
});

test("GET /restaurants/:restaurantId", async () => {
  const response = await fetch("http://localhost:3001/restaurants/227018");
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toBeDefined();
});

test("GET /restaurants/:restaurantId", async () => {
  const response = await fetch("http://localhost:3001/restaurants/567051");
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toBeDefined();
});

test("GET /restaurants/:restaurantId", async () => {
  const response = await fetch("http://localhost:3001/restaurants/nonono");
  const data = await response.json();

  expect(response.status).toBe(404);
  expect(data).toBeDefined();
});

test("GET /restaurants/:restaurantId/menus/:menuName/ short menu", async () => {
  const response = await fetch(
    "http://localhost:3001/restaurants/227018/menus/Egg?type=short",
  );
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toBeDefined();
});

test("GET /restaurants/:restaurantId/menus/:menuName/ full menu", async () => {
  const response = await fetch(
    "http://localhost:3001/restaurants/227018/menus/Egg?type=full",
  );
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toBeDefined();
});
