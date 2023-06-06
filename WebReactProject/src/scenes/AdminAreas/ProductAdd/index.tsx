import { Button, Select, Steps, message, Typography, TourProps, Tour } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { L, mapThat } from "../../../lib/abpUtility";
import './style.css';
import '../admin_table.css';
import { CategorySelectedDto, DataTypeProductAdd, DataTypeProductDto, ProductAddDto, ProductQueryDto } from './dtos/productAddDto';
import Title from 'antd/es/typography/Title';
import CategorySelectAdd from './components/categorySelectAdd';
import IntroductionComponents from './components/introductionComponents';
import InfoBasicProduct from './components/infoBasicProduct';
import UploadImageProduct from './components/uploadImageProduct';
import FutureProductComponents from './components/futureProductComponents';
import EditerProduct from './components/editerProduct';
import SeoAndTagProduct from './components/seoAndTagProduct';
import TechnicalProperties from './components/technicalProperties';
import PromotionsComponents from './components/promotionsComponents';
import ImportWarehouse from './components/importWarehouse';
import { notifyWarning } from '../../../components/Common/notification';
import useKeyPress, { KEY_PRESS } from '../../../components/Hook/useKeyPress';
import { KeyAndValue } from '../../../services/common/keyAndValue';
import { ProductAddInsertsDto } from './dtos/productAddQuery';
import services from './services';

const { Option } = Select;

const SCENES_KEY = "PRODUCT_ADD";

const data: ProductAddDto[] = [];

export interface IProductAddProps {
    location: any;
}

const MAX_STEPS = 7;
const KEY_LOCAL_STORAGE_INFO = 'OQQBr';
const KEY_LOCAL_STORAGE_IMG = 'Vbjde';
const KEY_LOCAL_STORAGE_FUTURE = 'koOXr';
const KEY_CATEGORY_SELECTED = "AGbFJ";
const KEY_CATEGORY_TECHNICAL = "TpXmW";


export default function ProductAdd(props: IProductAddProps) {
    //constructor

    const [current, setCurrent] = useState<number>(9);
    const [activeButtonNext, setactiveButtonNext] = useState<boolean>(false);
    const [openTour, setOpenTour] = useState<boolean>(false);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);

    useEffect(() => setactiveButtonNext(false), [current]);
    const [categorySelected, setCategorySelected] = useState<number[]>([]);
    const [infomationPublic, setinfomationPublic] = useState<ProductQueryDto>({} as ProductQueryDto);
    const [uploadImageProduct, setUploadImageProduct] = useState<string[]>([]);
    const [dataTechnical, setDataTechnical] = useState<KeyAndValue<string, KeyAndValue<number, string>[]>[]>([]);
    const [dataSource, setDataSource] = useState<DataTypeProductAdd[]>([]);

    useEffect(() => {
        try {
            setinfomationPublic(JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE_INFO) || ''));
            setUploadImageProduct(JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE_IMG) || ''));
            setDataSource(JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE_FUTURE) || ''));
            setCategorySelected(JSON.parse(localStorage.getItem(KEY_CATEGORY_SELECTED) || ''));
            setDataTechnical(JSON.parse(localStorage.getItem(KEY_CATEGORY_TECHNICAL) || ''));
        } catch {
            localStorage.setItem(KEY_LOCAL_STORAGE_INFO, '');
            localStorage.setItem(KEY_LOCAL_STORAGE_IMG, '');
            localStorage.setItem(KEY_LOCAL_STORAGE_FUTURE, '');
            localStorage.setItem(KEY_CATEGORY_SELECTED, '');
            localStorage.setItem(KEY_CATEGORY_TECHNICAL, '');
        }

    }, []);

    const steps = [
        {
            title: L("STEPS_0", SCENES_KEY),
            content: <IntroductionComponents />,
        },
        {
            title: L("STEPS_1", SCENES_KEY),
            content: <CategorySelectAdd
                categoryInit={categorySelected}
                onCategorySelected={(keys: number[]) => {
                    setCategorySelected(keys);
                }}
            />,

        },
        {
            title: L("STEPS_2", SCENES_KEY),
            content: <InfoBasicProduct
                infoInit={infomationPublic}
                categoryProduct={categorySelected}
                onChange={function (value: ProductQueryDto): void {
                    setinfomationPublic(value);
                }} />,
        },
        {
            title: L("STEPS_3", SCENES_KEY),
            content: <UploadImageProduct
                ImageHistory={uploadImageProduct}
                onOk={function (value: string[]): void {
                    setUploadImageProduct(value);
                }} />,
        },
        {
            title: L("STEPS_4", SCENES_KEY),
            content: <FutureProductComponents
                category={categorySelected}
                infoBasic={infomationPublic}
                imageCommon={uploadImageProduct}
                dataSourceInit={dataSource} onOk={(value: DataTypeProductAdd[]) => {
                    setDataSource(value);
                }} />,
        },
        {
            title: L("STEPS_5", SCENES_KEY),
            content: <TechnicalProperties
                categoty={categorySelected}
                onOk={(value: KeyAndValue<string, KeyAndValue<number, string>[]>[]) => { setDataTechnical(value) }}
                initData={dataTechnical} />,
        },
        {
            title: L("STEPS_6", SCENES_KEY),
            content: <PromotionsComponents />,
        },
        {
            title: L("STEPS_7", SCENES_KEY),
            content: <EditerProduct />,
        },
        {
            title: L("STEPS_8", SCENES_KEY),
            content: <SeoAndTagProduct />,
        },
        {
            title: L("STEPS_9", SCENES_KEY),
            content: <ImportWarehouse />,
        }
    ];

    const stepsTour: TourProps['steps'] = [
        {
            title: L("TITLE_TOUR", SCENES_KEY),
            description: L("", SCENES_KEY),
            target: () => ref1.current,
        },
        {
            title: L("CONTENT_TOUR", SCENES_KEY),
            description: L("", SCENES_KEY),
            target: () => ref2.current,
        },
        {
            title: L("BUTTON_TOUR", SCENES_KEY),
            description: L("", SCENES_KEY),
            target: () => ref3.current,
        }
    ];

    const _processCompleted = (next: boolean): boolean => {
        switch (current) {
            case 0: return currentZeno(next);
            case 1: return currentOne(next);
            case 2: return currentTwo(next);
            case 3: return currentThree(next);
            case 4: return currentFour(next);
            case 5: return currentFive(next);
            case 6: return currentSix(next);
            case 7: return currentSeven(next);
            case 8: return currentEight(next);
            case 9: return currentNine(next);
            default: return false;
        }
    }

    const currentZeno = (next: boolean): boolean => {
        return true;
    }

    const currentOne = (next: boolean): boolean => {
        return true;
    }

    const currentTwo = (next: boolean): boolean => {
        return true;
    }

    const currentThree = (next: boolean): boolean => {
        return true;
    }

    const currentFour = (next: boolean): boolean => {
        return true;
    }

    const currentFive = (next: boolean): boolean => {
        return true;
    }

    const currentSix = (next: boolean): boolean => {
        return true;
    }

    const currentSeven = (next: boolean): boolean => {
        return true;
    }

    const currentEight = (next: boolean): boolean => {
        return true;
    }

    const currentNine = (next: boolean): boolean => {
        return true;
    }

    const __arrowUpKey__: boolean = useKeyPress(KEY_PRESS.ARROW_UP);
    const __arrowDownKey__: boolean = useKeyPress(KEY_PRESS.ARROW_DOWN);
    const __arrowLeftKey__: boolean = useKeyPress(KEY_PRESS.ARROW_LEFT);
    const __arrowRightKey__: boolean = useKeyPress(KEY_PRESS.ARROW_RIGHT);

    useEffect(() => {
        if (__arrowRightKey__) next();
        if (__arrowLeftKey__) prev();
    }, [__arrowRightKey__, __arrowLeftKey__, __arrowDownKey__, __arrowUpKey__]);

    const next = () => {
        _processCompleted(true) ? setCurrent((current + 1) > steps.length - 1 ? (steps.length - 1) : (current + 1)) : notifyWarning(L('WANNING', 'COMMON'), L('Bạn cần hoàn thành đầy đủ yêu cầu bắt buộc!', SCENES_KEY));
    };

    const prev = () => {
        _processCompleted(false) ? setCurrent(current - 1 < 0 ? 0 : current - 1) : notifyWarning(L('WANNING', 'COMMON'), L('Bạn cần hoàn thành đầy đủ yêu cầu bắt buộc!', SCENES_KEY));
    };

    const items = steps.map((item) => ({ key: item.title, title: "" }));

    const _done = async () => {
        var categoryArr: CategorySelectedDto[] = JSON.parse(localStorage.getItem(KEY_CATEGORY_SELECTED) || '');
        var dataSent: DataTypeProductDto[] = dataSource.map(s => {
            return {
                key: s.key,
                name: s.name,
                price: s.price,
                quantity: s.quantity,
                displayOrder: s.displayOrder,
                avatar: s.avatar,
                isActive: s.isActive,
                keyAttributeOne: s.keyAttributeOne,
                keyAttributeTwo: s.keyAttributeTwo,
                keyAttributeThree: s.keyAttributeThree,
                idKeyAttributeOne: s.idKeyAttributeOne,
                idKeyAttributeTwo: s.idKeyAttributeTwo,
                idKeyAttributeThree: s.idKeyAttributeThree
            }
        });
        let dataInput: ProductAddInsertsDto = {
            categorys: categoryArr.map(a => a.id),
            infoBasic: infomationPublic,
            images: uploadImageProduct,
            techProduct: JSON.stringify(dataTechnical),
            futureProduct: dataSent,
            gift: [],
            postProduct: "",
            seo: []
        };
        let rsl = await services.productAddbySuppplier(dataInput);
        return message.success('Processing complete!');
    }
    return (
        <>
            <Typography ref={ref1}>
                <Title className='zEJxSpaQzN' level={2}>{L("STEPS_" + current, SCENES_KEY)}</Title>
            </Typography>
            <Steps
                type="navigation"
                className="site-navigation-steps"
                current={current} items={items}
            />
            <div className="steps-content" ref={ref2}>{steps[current].content}</div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        {L("PREVIOUS", SCENES_KEY)}
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button ref={ref3} type="primary" disabled={activeButtonNext} onClick={() => next()}>
                        {L("NEXT", SCENES_KEY)}
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" disabled={activeButtonNext}
                        onClick={_done}>
                        {L("DONE", SCENES_KEY)}
                    </Button>
                )}
            </div>
            <Tour open={openTour} onClose={() => setOpenTour(false)} steps={stepsTour} />
        </>
    )
}