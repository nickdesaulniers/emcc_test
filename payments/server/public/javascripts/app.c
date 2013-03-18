#include <stdio.h>

extern void pay (void (*callback)(char* secret_number));
extern void log_to_screen (char* msg);

int main () {
  // app running
  // pay called
  pay(log_to_screen);
}