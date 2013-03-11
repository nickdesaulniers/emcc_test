// Compiled with: emcc main.cpp --js-library mylib1.js --js-library mylib2.js
#include <stdio.h>

extern "C" {
  extern void printey ();
  extern int add (int x, int y);
}

int main () {
  printey();
  printf("*%d*\n", add(10, 22));
}
