
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log("SW Registerd");
  })
};


document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.body.style.visibility = "0.5"

  }

  else {
    document.body.style.visibility = "1"
  }
}
    

