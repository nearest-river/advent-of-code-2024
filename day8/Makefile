
CFLAGS=-Wall -g
CC=gcc
BUILD=./scripts/build
DEPS=./target/*.o


build:
	$(BUILD)
run1:
	$(BUILD)
	$(CC) $(CFLAGS) $(DEPS) ./src/part1.c -o ./bin/part1
	./bin/part1
run2:
	$(BUILD)
	$(CC) $(CFLAGS) $(DEPS) ./src/part2.c -o ./bin/part2
	./bin/part2

clean:
	rm -rf target

