import { uid } from '@/utils/uid';
import { createStore, useStore } from 'zustand';

export type NotificationType =
    | 'info'
    | 'warning'
    | 'success'
    | 'error';

export type NotificationData = {
    id: string;
    type: NotificationType;
    title: string;
    duration?: number;
    message?: string;
};

type NotificationsStore = {
    notifications: NotificationData[];
    showNotification: (
        notification: Omit<NotificationData, 'id'>
    ) => void;
    dismissNotification: (id: string) => void;
};

export const notificationStore =
    createStore<NotificationsStore>((set, get) => ({
        notifications: [],
        showNotification: (notification) => {
            const id = uid();

            set((state) => ({
                notifications: [
                    ...state.notifications,
                    { id, ...notification },
                ],
            }));

            if (notification.duration) {
                setTimeout(() => {
                    get().dismissNotification(id);
                }, notification.duration);
            }
        },
        dismissNotification: (id) => {
            set((state) => ({
                notifications: state.notifications.filter(
                    (notification) =>
                        id !== notification.id
                ),
            }));
        },
    }));

export const useNotification = () =>
    useStore(notificationStore);
