import { Input, Tooltip } from 'antd';
import React from 'react';
import './style.css';
import { L } from "../../lib/abpUtility";

interface INumericInputProps {
    style?: React.CSSProperties;
    value: string;
    placeholder: string;
    min: number;
    max: number;
    onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
export default function NumericInput(props: INumericInputProps) {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var valueOld = value;
        if ((e.target.value.length < props.max && e.target.value.length > props.min) || e.target.value === '') {
            const { value: inputValue } = e.target;
            const reg = /^-?\d*(\.\d*)?$/;
            if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
                onChange(inputValue);
            }
        }
        else {
            onChange(valueOld);
        }
    };

    const handleBlur = () => {
        let valueTemp = value;
        if (value === undefined) {
            valueTemp = "0";
        }

        if (valueTemp.charAt(valueTemp.length - 1) === '.' || valueTemp === '-') {
            valueTemp = valueTemp.slice(0, -1);
        }
        onChange(valueTemp);
    };

    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        L("INPUT_UNDEFINED", "COMMON")
    );

    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a number"
                maxLength={16}
            />
        </Tooltip>
    );
}
