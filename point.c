/* Compile with:
 * clang point.c
 *  or
 * emcc point.c
 *
 * then in node you can do:
 * var unused = require('./a.out.js');
 * var distance = Module.cwrap('distance', 'number', ['number', 'number', 'number', 'number']);
 * distance(1, 2, 6, -5);
 *
 * Also, you can look in a.out.js to see how _distance is defined
 */
#include "stdio.h"
#include "math.h"

typedef struct {
  int x, y;
} Point;

int square (int x) {
  return x * x;
}
int distance (Point a, Point b) {
  return sqrt(square(b.x - a.x) + square(b.y - a.y));
}

int main () {
  Point a = {1, 2};
  Point b = {6, -5};
  printf("The distance between (%d, %d) and (%d, %d) is %d\n",
         a.x, a.y, b.x, b.y, distance(a, b));
}
