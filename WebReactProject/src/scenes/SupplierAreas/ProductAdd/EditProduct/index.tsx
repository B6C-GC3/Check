import React, { useState } from 'react';
import './index.css';
import services from './services';
import { AndroidOutlined, AppleOutlined, ForwardOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { L } from "../../../../lib/abpUtility";
import { } from '../../../../components/Common/notification';
import CategorySelectAdd from '../components/categorySelectAdd';
import SettingProductComponents from './components/settingProductComponents';
import InfoBasicProduct from '../components/infoBasicProduct';
import { DataTypeProductAdd, ProductQueryDto } from '../dtos/productAddDto';
import UploadImageProduct from '../components/uploadImageProduct';
import { KeyAndValue } from '../../../../services/common/keyAndValue';

declare var abp: any;
const SCENES_KEY = "ADRESS";

interface IEditProduct {

}



export default function EditProduct(props: IEditProduct) {
    const [categorySelected, setCategorySelected] = useState<number[]>([]);
    const [infomationPublic, setinfomationPublic] = useState<ProductQueryDto>({} as ProductQueryDto);
    const [uploadImageProduct, setUploadImageProduct] = useState<string[]>([]);
    const [dataTechnical, setDataTechnical] = useState<KeyAndValue<string, KeyAndValue<number, string>[]>[]>([]);
    const [dataSource, setDataSource] = useState<DataTypeProductAdd[]>([]);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label:
                <span>
                    Category
                </span>,
            children: <CategorySelectAdd
                categoryInit={categorySelected}
                onCategorySelected={(keys: number[]) => {
                    setCategorySelected(keys);
                }}
            />,
        },
        {
            key: '2',
            label:
                <span>
                    Thông tin chung
                </span>,
            children: <InfoBasicProduct
                infoInit={infomationPublic}
                categoryProduct={categorySelected}
                onChange={function (value: ProductQueryDto): void {
                    setinfomationPublic(value);
                }} />,
        },
        {
            key: '3',
            label:
                <span>
                    Ảnh sản phẩm
                </span>,
            children: <UploadImageProduct
                ImageHistory={uploadImageProduct}
                onOk={function (value: string[]): void {
                    setUploadImageProduct(value);
                }} />,
        },
        {
            key: '4',
            label:
                <span>
                    Chủng loại sản phẩm
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '5',
            label:
                <span>
                    Thuộc tính kỹ thuật
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '6',
            label:
                <span>
                    Khuyến mãi
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '7',
            label:
                <span>
                    Bài viết sản phẩm
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '8',
            label:
                <span>
                    Tìm kiếm sản phẩm
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '9',
            label:
                <span>
                    SEO
                </span>,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '10',
            label:
                <span>
                    Khác
                </span>,
            children: <SettingProductComponents />,
        },
    ];
    return (
        <>
            <div className='vfqVMuXEsF'></div>
            <Tabs
                defaultActiveKey="1"
                type="card"
                className='qHBuAKkaAv'
                items={items}
            />
        </>
    )
}
