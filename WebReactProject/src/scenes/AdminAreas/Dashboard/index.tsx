import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Upload } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import sevice from './services';
import './index.css'
import useAxios from '../../../components/Hook/useAxios';

//const key = 'Dashboard';

export interface IDashboardProps {
    location: any;
}
export default function Dashboard(props: IDashboardProps) {

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = async () => {
        if (selectedFile !== undefined)
            await sevice.checkToken(selectedFile);
    };

    const dowloadFile = () => {
       
    }

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Tair file lên</button>
            </div>

            <br />

            <button onClick={() => dowloadFile()}> Download the File</button>

            <Card title="Default size card" className='pBCnguwXdW' extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>

        </div>
    )
};