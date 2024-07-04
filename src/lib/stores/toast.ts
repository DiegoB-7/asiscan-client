// notifications.ts
import { writable, derived, type Writable } from "svelte/store";

const TIMEOUT = 3000;

type NotificationType = "default" | "danger" | "warning" | "info" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timeout: number;
}

function createNotificationStore(timeout: number = TIMEOUT) {
  const _notifications: Writable<Notification[]> = writable([]);

  function send(message: string, type: NotificationType = "default", timeout: number = TIMEOUT) {
    _notifications.update(state => {
      return [...state, { id: generateId(), type, message, timeout }];
    });
  }

  const notifications = derived(_notifications, ($_notifications, set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update(state => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  const { subscribe } = notifications;

  return {
    subscribe,
    send,
    default: (msg: string, timeout?: number) => send(msg, "default", timeout),
    danger: (msg: string, timeout?: number) => send(msg, "danger", timeout),
    warning: (msg: string, timeout?: number) => send(msg, "warning", timeout),
    info: (msg: string, timeout?: number) => send(msg, "info", timeout),
    success: (msg: string, timeout?: number) => send(msg, "success", timeout),
  };
}

function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications = createNotificationStore();