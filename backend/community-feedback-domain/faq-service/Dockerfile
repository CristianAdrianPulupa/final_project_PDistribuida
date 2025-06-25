FROM golang:1.20

WORKDIR /app

COPY go.mod ./
COPY . .

RUN go mod tidy

EXPOSE 3011

CMD ["go", "run", "main.go"]