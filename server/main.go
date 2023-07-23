package main

import (
	"context"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("There was an error reading env variables")
	}

	key := os.Getenv("OPENAI")
	client := openai.NewClient(key)

	app := fiber.New()
	app.Use(cors.New())

	app.Post("/sendMessage", func(c *fiber.Ctx) error {
		err := handleIncomingMessage(c, client)
		return err
	})

	app.Listen(":8080")
}

func handleIncomingMessage(c *fiber.Ctx, client *openai.Client) error {
	p := new([]openai.ChatCompletionMessage)

	if err := c.BodyParser(p); err != nil {
		return err
	}

	test := []openai.ChatCompletionMessage{{
		Role:    openai.ChatMessageRoleSystem,
		Content: os.Getenv("PROMPT"),
	}}

	(*p) = append(test, *p...)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:    openai.GPT3Dot5Turbo,
			Messages: (*p),
		},
	)

	if err != nil {
		log.Fatalf("ChatCompletion error: %v\n", err)
		return err
	}

	c.JSON(resp.Choices[0].Message.Content)

	return nil
}
