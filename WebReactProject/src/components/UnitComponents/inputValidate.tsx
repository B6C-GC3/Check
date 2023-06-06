import { Input, InputProps, Typography } from 'antd';
import { InputRef } from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { L } from "../../lib/abpUtility";

const { Text } = Typography;
export interface IInputValidateComponentProps extends InputProps, React.RefAttributes<InputRef> {
    keyTitle?: string;
    locationKey?: string;
    errorValidate?: string;
    isShow?: boolean;
}

export default function InputValidate(props: IInputValidateComponentProps) {
    const [status, setstatus] = useState<"" | "error" | "warning" | undefined>(undefined);
    return (
        props.isShow == true ? <>
            <Text strong>{L(props.keyTitle ?? "", props.locationKey ?? "COMMON")}</Text>
            <Input status={status} {...props} />
            <Text type='danger'>{L(props.errorValidate ?? "", props.locationKey ?? "COMMON")}</Text>
        </> : <></>

    )
}