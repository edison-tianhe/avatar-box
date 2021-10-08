/** 获取设备像素比率 */
export const getDevicePixelRatio = () => {
  var ratio = 1;
  // To account for zoom, change to use deviceXDPI instead of systemXDPI
  // @ts-ignore
  if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
    // Only allow for values > 1
    // @ts-ignore
    ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
  } else if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  return Math.floor(ratio);
};