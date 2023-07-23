# Use the latest official Golang image
FROM golang:1.20

# Set the working directory inside the container
WORKDIR /server

# Copy only the go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download the Go module dependencies
RUN go mod download

# Copy the specific Go source files needed for the build
COPY main.go ./

# Build and install the binary using go install
RUN go install

# Expose the port on which the server will listen
EXPOSE 8080

RUN go build -tags netgo -ldflags '-s -w' -o app

# Set the default command to run when the container starts
CMD ["./app"]