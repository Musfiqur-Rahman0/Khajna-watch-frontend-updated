import { getAnonId, urlBase64ToUint8Array } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerPush() {
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("Notification" in window)
  ) {
    throw new Error("Push notifications are not supported by this browser.");
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  // Don't register again — RegisterSW already did this on app load.
  // Just wait for it to be ready.
  const registration = await navigator.serviceWorker.ready;

  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const keyRes = await fetch(`${API_BASE_URL}/notifications/vapid-public-key`);
  const { data } = await keyRes.json();

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(data.publicKey),
  });

  await fetch(`${API_BASE_URL}/notifications/subscribe`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-anon-id": getAnonId(),
    },
    body: JSON.stringify(subscription),
  });

  return subscription;
}
