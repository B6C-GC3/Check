import React from 'react';
import './style.css';

type LoadingProcessProps = {
    open?: boolean;
} & typeof defaultProps;

const defaultProps = {
    open: true,
};

export default function LoadingProcess(props: LoadingProcessProps) {
    return (
        <>
            {props.open
                ? <div className='mask'>
                    <span className="loader"></span>
                </div>
                : <></>
            }
        </>
    )
}
LoadingProcess.defaultProps = defaultProps;