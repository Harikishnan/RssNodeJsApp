if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('sw.js', { scope: '/' })
      .then(() => {
          console.info('Rss Tvndr App Is Registered');
      }, err => console.error("Rss Tvndr App registration failed: ", err));

  navigator.serviceWorker
      .ready
      .then(() => {
          console.info('Rss Tvndr App Is Ready');
      });
}


document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.body.style.visibility = "0.5"

  }

  else {
    document.body.style.visibility = "1"
  }
}
    

