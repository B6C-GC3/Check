import { notification } from 'antd';
import React from 'react'

export const notifyError = (message: string, details: string) => {
    return notification.error({
        message: message,
        description: details,
        placement: 'bottomRight'
    });
}

export const notifySuccess = (message: string, details: string) => {
    return notification.success({
        message: message,
        description: details,
        placement: 'bottomRight'
    });
}

export const notifyInfo = (message: string, details: string) => {
    return notification.info({
        message: message,
        description: details,
        placement: 'bottomRight'
    });
}

export const notifyWarning = (message: string, details: string) => {
    return notification.warning({
        message: message,
        description: details,
        placement: 'bottomRight'
    });
}