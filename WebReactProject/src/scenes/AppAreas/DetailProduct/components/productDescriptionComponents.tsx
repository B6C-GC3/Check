import { Button, Skeleton } from 'antd'
import React, { useState } from 'react'

interface IProductDescription {
    description: string;
}

export default function ProductDescriptionComponents(props: IProductDescription) {
    const [openintroduce, setopenintroduce] = useState(true);
    return (
        <div className="OJkXBiXyst">
            <p className="SwswGUqGyh">Mô Tả Sản Phẩm</p>
            {/* <div className={openintroduce ? "feTSsBMLGN" : "feTSsBMLGN pzScZkIiuj"}
                            dangerouslySetInnerHTML={{ 
                            __html: basicProduct.fullDescription,}}></div> */}
            <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 4 }}>
                <div
                    className={
                        !openintroduce ? "kBynIEHFTL" : "kBynIEHFTL fudZxInsuq"
                    }
                    dangerouslySetInnerHTML={{
                        __html: props.description,
                    }}
                >
                </div>
                <div className="XlRRNzXjls">
                    <Button
                        className="qiLHzvzZEV"
                        onClick={() => setopenintroduce(!openintroduce)}
                        type="default"
                    >
                        {openintroduce ? "Xem thêm" : "Thu gọn"} mô tả
                    </Button>
                </div>
            </Skeleton>
        </div>
    )
}
