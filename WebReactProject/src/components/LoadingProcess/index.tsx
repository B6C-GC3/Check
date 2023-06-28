import React from 'react';
import './style.css';

type LoadingProcessProps = {
    open?: boolean;
    className?: string;
} & typeof defaultProps;

const defaultProps = {
    open: true,
    className: ''
};

export default function LoadingProcess(props: LoadingProcessProps) {
    return (
        <>
            {props.open
                ? <div className={props.className + ' mask'}>
                    <span className="loader"></span>
                </div>
                : <></>
            }
        </>
    )
}
LoadingProcess.defaultProps = defaultProps;