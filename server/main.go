package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sashabaranov/go-openai"
)

type EnvKeys struct {
	OpenAI string `json:"openai"`
}

func main() {
	key, err := readEnvVariables()
	client := openai.NewClient(key)

	if err != nil {
		log.Fatal("Error reading keys")
	}

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
		Content: "You are a helpful ai companion named Kyle",
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
	fmt.Println((*p))

	return nil
}
