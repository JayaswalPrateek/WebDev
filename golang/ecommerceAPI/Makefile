build:
	@go build -o bin/ecom -gcflags "all=-N -l" cmd/main.go

run: build
	@bin/ecom

test:
	@go test -v ./...
