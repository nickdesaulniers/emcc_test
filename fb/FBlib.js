var lib = {
  loginUser: function loginUser (messagePtr) {
    FB.login(function(response) {
      // emscripten utility for dereferencing C strings
      var message = Pointer_stringify(messagePtr);
      publishStory(message);
    }, { scope:'email,publish_actions' });
  }
};

mergeInto(LibraryManager.library, lib); // needed for emscripten