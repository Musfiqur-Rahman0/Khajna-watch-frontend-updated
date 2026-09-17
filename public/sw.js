self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "New Notification";
  const options = {
    body: data.body || "",
    icon: data.icon || "/icon.png",
    badge: "/badge.png",
    data: data.url || "/", // so we know where to go on click
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data;
  event.waitUntil(clients.openWindow(url));
});
