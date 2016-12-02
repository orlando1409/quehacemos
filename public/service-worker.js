self.addEventListener('fetch', event => {
  console.log('service worker event', event);
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('.png')) {
    console.log('service worker png req');
    event.respondWith(
      fetch('/images/placeholder.png')
    );
  }
});
