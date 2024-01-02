mergeInto(LibraryManager.library, {
  DispatchEarthConfig: function (clockwise, speed) {
    window.dispatchReactUnityEvent("EarthConfigInitialized", clockwise, speed);
  },
  DispatchEarthConfigDto: function (dto) {
    const jsonString = UTF8ToString(dto);
    window.dispatchReactUnityEvent("EarthConfigObjectInitialized", jsonString);
  },
});