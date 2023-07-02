import React, { useEffect, useState } from 'react';
import './index.css';
import services from './services';
import { AndroidOutlined, AppleOutlined, ForwardOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { L } from "../../../../lib/abpUtility";
import { notifyError, notifySuccess } from '../../../../components/Common/notification';
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
const { confirm } = Modal;

declare var abp: any;
const SCENES_KEY = "ADRESS";

interface IEditProduct {

}

const DEFAULT_ID_PRODUCT = 52;
export default function EditProduct(props: IEditProduct) {
    const [tabSelected, setTabSelected] = useState<number>(1);
    const [itMightChange, setItMightChange] = useState<boolean>(true);

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
                <span className='noselect'>
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
                <span className='noselect'>
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
                <span className='noselect'>
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
                <span className='noselect'>
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
                <span className='noselect'>
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
                <span className='noselect'>
                    Khuyến mãi
                </span>,
            children: <PromotionsComponents />,
        },
        {
            key: '7',
            label:
                <span className='noselect'>
                    Bài viết sản phẩm
                </span>,
            children: <EditerProduct />,
        },
        {
            key: '8',
            label:
                <span className='noselect'>
                    Tìm kiếm sản phẩm
                </span>,
            children: <SeoAndTagProduct />,
        },
        {
            key: '9',
            label:
                <span className='noselect'>
                    Kho hàng
                </span>,
            children: 'Kho Hàng',
        },
        {
            key: '10',
            label:
                <span className='noselect'>
                    Khác
                </span>,
            children: <SettingProductComponents />,
        },
    ];

    const _onChangeTab = (activeKey: string) => {
        // if (itMightChange) {
        //     confirm({
        //         title: 'Ê thằng kia, ',
        //         icon: <WarningOutlined />,
        //         content: 'Tao vừa tìm thấy mấy cái khang khác, giờ mày có muốn thay đổi không để tao còn biết?',
        //         onOk() {
        //             setTabSelected(Number(activeKey));
        //             notifySuccess("Thông báo","Ta vừa đổi đổi dữ liệu cho mày rồi đấy, Cảm ơn đê!")
        //         },
        //         onCancel() {

        //         },
        //         okText: "Làm luôn bạn ơi",
        //         cancelText: "Dell"
        //     });
        // }
        // else {
        //     setTabSelected(Number(activeKey));
        // }

        setTabSelected(Number(activeKey));
    }

    const _processDataChange = (activeKey: string) => {

    }

    return (
        <>
            <div className='vfqVMuXEsF'></div>
            <Tabs
                animated={{ inkBar: true, tabPane: true }}
                onChange={_onChangeTab}
                activeKey={tabSelected.toString()}
                type="card"
                className='qHBuAKkaAv'
                items={items}
            />
        </>
    )
}
