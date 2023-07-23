FROM golang:1.20

WORKDIR /server

COPY go.mod ./
RUN go mod download

COPY *.go ./

RUN go build -o /start-server

EXPOSE 8080

CMD ["/start-server"]