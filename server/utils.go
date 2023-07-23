package main

import (
	"encoding/json"
	"os"
)

func readEnvVariables() (string, error) {
	file, err := os.Open("env.json")
	if err != nil {
		return "", err
	}
	defer file.Close()

	var keys EnvKeys

	err = json.NewDecoder(file).Decode(&keys)

	if err != nil {
		return "", err
	}

	return keys.OpenAI, nil
}
