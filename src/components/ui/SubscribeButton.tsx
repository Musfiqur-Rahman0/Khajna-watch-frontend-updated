"use client";

import { registerPush } from "@/lib/push-notification";
import { Button } from "./button";

export default function SubscribeButton() {
  const handleSubscribe = async () => {
    try {
      await registerPush();
      alert("Subscribed successfully!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return <Button onClick={handleSubscribe}>Enable Notifications</Button>;
}
