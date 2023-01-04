import boxen from "boxen";

function displayBanner(text) {
  const config = {
    title: "archetype",
    borderColor: "#e67e22",
    borderStyle: "bold",
    dimBorder: true,
    padding: {
      top: 0,
      right: 2,
      bottom: 0,
      left: 2,
    },
    margin: {
      top: 1,
      right: 0,
      bottom: 1,
      left: 0,
    },
  };
  console.log(boxen(text, config));
}

// infoBanner
// warnBanner

export { displayBanner };
