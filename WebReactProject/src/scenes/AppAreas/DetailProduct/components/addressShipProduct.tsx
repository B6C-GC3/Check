//#region import
import React from 'react'
import Select from 'antd/lib/select';
import { Skeleton } from 'antd';
const { Option } = Select;

declare var abp: any;
//#endregion

interface IAddressShipProductProps {

}
export default function AddressShipProduct(props: IAddressShipProductProps) {

    //const dispatch = useDispatch();

    // const {
    // } = useSelector(stateSelector);

    return (
        <>
            <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 2 }}>
                <div>
                    <hr className="BozncDhktp" />
                    <div className="hcUCOccMik">
                        <span>
                            Địa chỉ của bạn : 
                            <p>đổi địa chỉ</p>
                        </span>
                    </div>
                    <div className="hcUCOccMik">
                        <span>Phí vận chuyển : </span>
                        <Select defaultValue="lucy" bordered={false}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <hr className="BozncDhktp" />
                </div>
            </Skeleton>
        </>
    )
}
