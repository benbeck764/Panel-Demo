mergeInto(LibraryManager.library, {
  DispatchEarthConfig: function (clockwise, speed) {
    window.dispatchReactUnityEvent("EarthConfigInitialized", clockwise, speed);
  },
  DispatchEarthConfigObject: function (config) {
    const jsonString = UTF8ToString(config);
    window.dispatchReactUnityEvent("EarthConfigObjectInitialized", jsonString);
  },
});