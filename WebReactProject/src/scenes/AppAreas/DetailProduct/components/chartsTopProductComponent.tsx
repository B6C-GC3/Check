//#region import
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Rate, Skeleton } from 'antd';

declare var abp: any;
//#endregion

interface IChartsTopProductComponentProps {
    id: number;
    name: string | undefined;
}

export default function ChartsTopProductComponent(props: IChartsTopProductComponentProps) {

    // const dispatch = useDispatch();
    // const [basicProduct, setbasicProduct] = useState<CartBasicProductDto>({ trademark: "" });
    return (
        <>
            <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 0 }}>
                <div className="LboUrliYOw">
                    <div className="RnmeRAZZRs">
                        <a>{props.name}</a> | Đứng thứ 3 trong
                        <a href=""> Top 1000 Áo thun nữ bán chạy tháng này</a>
                    </div>
                    <div className="EQjksUFMJC">
                        {/* {basicProduct.name} */}
                    </div>
                    <div className="xYeyreVUjs">
                        <Rate disabled defaultValue={2} /> (Xem 157 đánh giá) | Đã bán 537
                    </div>
                </div>
            </Skeleton>
        </>
    )
}
