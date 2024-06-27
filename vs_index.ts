export default async function vsi(n: string) {
  if (n == "fs") {
    if (
      (typeof navigator !== "undefined" &&
        navigator.product === "ReactNative") ||
      process.env.IS_REACT_NATIVE == "true"
    ) {
      const fs = await import("./lib/rn/fs");

      return fs;
    } else {
      try {
        const fs = require("fs");

        return fs;
      } catch (e) {
        const fs = await import("./lib/rn/fs");

        return fs;
      }
    }
  }

  return "Not supported";
}
