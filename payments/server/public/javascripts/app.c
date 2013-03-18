#include <stdio.h>

extern void pay (void (*callback)(char* secret_number));
extern void draw_image (char* dataURI);

int main () {
  // app running
  // pay called
  pay(draw_image);
}