import React, { useEffect, useState } from 'react';
import './index.css';
import services from './services';
import { AndroidOutlined, AppleOutlined, ForwardOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';
import { L } from "../../../../lib/abpUtility";
import { notifyError } from '../../../../components/Common/notification';
import CategorySelectAdd from '../components/categorySelectAdd';
import SettingProductComponents from './components/settingProductComponents';
import InfoBasicProduct from '../components/infoBasicProduct';
import { DataTypeProductAdd, ProductQueryDto } from '../dtos/productAddDto';
import UploadImageProduct from '../components/uploadImageProduct';
import { KeyAndValue } from '../../../../services/common/keyAndValue';
import FutureProductComponents from '../components/futureProductComponents';
import TechnicalProperties from '../components/technicalProperties';
import PromotionsComponents from '../components/promotionsComponents';
import EditerProduct from '../components/editerProduct';
import SeoAndTagProduct from '../components/seoAndTagProduct';

declare var abp: any;
const SCENES_KEY = "ADRESS";

interface IEditProduct {

}

const DEFAULT_ID_PRODUCT = 52;
const DEFAULT_KEY_TAB = "1";
export default function EditProduct(props: IEditProduct) {
    const [categorySelected, setCategorySelected] = useState<number[]>([]);
    const [infomationPublic, setinfomationPublic] = useState<ProductQueryDto>({} as ProductQueryDto);
    const [uploadImageProduct, setUploadImageProduct] = useState<string[]>([]);
    const [dataTechnical, setDataTechnical] = useState<KeyAndValue<string, KeyAndValue<number, string>[]>[]>([]);
    const [dataSource, setDataSource] = useState<DataTypeProductAdd[]>([]);

    useEffect(() => {
        getInit();
    }, []);

    const getInit = async () => {
        var rsl = await services.GetProduct(DEFAULT_ID_PRODUCT);
        if (rsl.error === false && rsl.result !== undefined) {
            let data = rsl.result;
            setCategorySelected(data.categorys);
            setinfomationPublic(data.infoBasic);
            setUploadImageProduct(data.images);
            setDataSource(data.futureProduct as DataTypeProductAdd[]);
        }
        else {
            notifyError("ERROR", "ERROR");
        }
    }
    
    const items: TabsProps['items'] = [
        {
            key: '1',
            label:
                <span>
                    Category
                </span>,
            children:
                <CategorySelectAdd
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
            children: <FutureProductComponents
                category={categorySelected}
                infoBasic={infomationPublic}
                imageCommon={uploadImageProduct}
                dataSourceInit={dataSource}
                onOk={(value: DataTypeProductAdd[]) => {
                    setDataSource(value);
                }} />,
        },
        {
            key: '5',
            label:
                <span>
                    Thuộc tính kỹ thuật
                </span>,
            children: <TechnicalProperties
                categoty={categorySelected}
                onOk={(value: KeyAndValue<string, KeyAndValue<number, string>[]>[]) => { setDataTechnical(value) }}
                initData={dataTechnical} />,
        },
        {
            key: '6',
            label:
                <span>
                    Khuyến mãi
                </span>,
            children: <PromotionsComponents />,
        },
        {
            key: '7',
            label:
                <span>
                    Bài viết sản phẩm
                </span>,
            children: <EditerProduct />,
        },
        {
            key: '8',
            label:
                <span>
                    Tìm kiếm sản phẩm
                </span>,
            children: <SeoAndTagProduct />,
        },
        {
            key: '9',
            label:
                <span>
                    Kho hàng
                </span>,
            children: 'Kho Hàng',
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
                animated={{ inkBar: true, tabPane: true }}
                defaultActiveKey={DEFAULT_KEY_TAB}
                type="card"
                className='qHBuAKkaAv'
                items={items}
            />
        </>
    )
}
