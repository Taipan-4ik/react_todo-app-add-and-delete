import classNames from 'classnames';
import { useEffect, useRef } from 'react';

type NotificationProps = {
  isError: boolean;
  errorId: number;
  errors: string[];
  setNotificationIsHide: (value: boolean) => void;
  notificationIsHide: boolean;
};

export const ErrorNotification: React.FC<NotificationProps> = ({
  isError,
  errors,
  notificationIsHide,
  setNotificationIsHide,
  errorId,
}) => {
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  function errorHide() {
    setNotificationIsHide(false);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setNotificationIsHide(true);
    }, 3000);
  }

  useEffect(() => {
    if (isError) {
      errorHide();
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [errorId]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: notificationIsHide },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setNotificationIsHide(true);
        }}
      />
      {/* show only one message at a time */}
      {errors.map((error, index) => (
        <span key={index}>
          {error}
          <br />
        </span>
      ))}
    </div>
  );
};
