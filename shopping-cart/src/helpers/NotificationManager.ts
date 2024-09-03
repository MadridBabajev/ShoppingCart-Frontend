import INotification from "../types/props/layout/INotification";
import NotificationColors from "../types/strings/notifications/NotificationColors";

class NotificationManager {
    callback: ((notification: INotification) => void) | null = null;

    showSuccessNotification = (message: string) => {
        if (this.callback) {
            this.callback({ message, color: NotificationColors.SUCCESS });
        }
    };

    showErrorNotification = (message: string) => {
        if (this.callback) {
            this.callback({ message, color: NotificationColors.ERROR });
        }
    };

    setNotificationCallback = (callback: (notification: { message: string; color: string }) => void) => {
        this.callback = callback;
    };
}

export const notificationManager = new NotificationManager();