package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("test")

	app := fiber.New()

	app.Get("/", handleDefault)
	app.Listen(":8080")
}

func handleDefault(c *fiber.Ctx) error {
	c.JSON("hihi")

	return nil
}
