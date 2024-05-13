import React from 'react';
import { useCallback } from "react";
import RouteName from '../../routes/Route.name';
import history from '../../libs/history.utils';
const NotificationDetailsHook = () => {
    const handleDetail = useCallback(() => {
        history.push(RouteName.NOTIFICATION_DETAILS);
      }, []);
  return{
    handleDetail,
  }
}

export default NotificationDetailsHook