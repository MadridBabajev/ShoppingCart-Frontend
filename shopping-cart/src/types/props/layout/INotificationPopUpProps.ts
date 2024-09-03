import INotification from "./INotification";

interface INotificationPopUpProps {
    notification: INotification;
    setNotification: (notification: INotification) => void;
}

export default INotificationPopUpProps;