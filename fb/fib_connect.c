// compile with:
// emcc fib_connect.c --js-library FBlib.js
#include <stdio.h>

extern void loginUser (const char* const message);

int fib (int x) {
  return x <= 2 ? 1 : fib(x - 1) + fib(x - 2);
}

int main () {
  printf("fib(12) = %d\n", fib(12));
  loginUser("Hello world from C!");
}
