import * as React from 'react';
import { Badge, Divider, Input, Select } from 'antd';
import { useState } from 'react';
import CategoryComponents from './components/categoryComponents';
import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import CardInfoComponents from './components/cardInfoComponents';
import SettingAppComponents from './components/settingAppComponents';
import NotifyComponent from './components/notifyComponent';
import UserAccountComponent from './components/userAccountComponent';

const { Option } = Select;

declare var abp: any;
const SCENES_KEY = "HOME_APP";

const HeaderAppComponent = () => {
    return (
        <>
            <Helmet>
                <title>Wekee.vn</title>
            </Helmet>
            <div className='QHmkNFlJaB'>
                <div>
                    <a href="/"><img src="./logo192.png" alt="" /></a>
                </div>
                <div className='ggQAuKETJw'>
                    <div>
                        <Input.Group compact>
                            <Select defaultValue="Option1" className="WftrqkfVlN">
                                <Option value="Option1">Tất Cả</Option>
                                <Option value="Option2">Tên sản phẩm</Option>
                                <Option value="Option3">Tên nhà cung cấp</Option>
                                <Option value="Option4">Tên người dùng</Option>
                                <Option value="Option5">Giá sản phẩm</Option>
                                <Option value="Option6">Mô tả sản phẩm</Option>
                                <Option value="Option7">Tag sản phẩm</Option>
                            </Select>
                            <Select
                                className='uaLLOirpgi'
                                placeholder='Tìm kiếm sản phẩm, nhà cung cấp'
                                autoFocus={true}
                                showSearch
                                optionLabelProp="label"
                                allowClear
                                suffixIcon={<SearchOutlined />}
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        Lịch sử
                                    </div>
                                )}
                            >
                                <Option value="china" label="China">
                                    <div className="NfxUTNJIOM">
                                        <img src="" alt="" />
                                        <div>DSQUARED2 - Áo khoác blazer nam phối cổ satin S71BN0735-900 DSQUARED2 - Áo khoác blazer nam phối cổ satin S71BN0735-900</div>
                                    </div>
                                </Option>
                            </Select>
                        </Input.Group>
                    </div>
                    <div>
                        <a href="/">Ví dụ 1</a>
                        <a href="/">Ví dụ 2</a>
                        <a href="/">Ví dụ 3</a>
                        <a href="/">Ví dụ 4</a>
                        <a href="/">Ví dụ 5</a>
                        <a href="/">Ví dụ 6</a>
                        <a href="/">Ví dụ 7</a>
                        <a href="/">Ví dụ 8</a>
                        <a href="/">Ví dụ 9</a>
                        <a href="/">Ví dụ 10</a>
                    </div>
                </div>
                <div>
                    <div>
                        <UserAccountComponent />
                        <NotifyComponent />
                    </div>
                </div>
                <div>
                    <div>
                        <CardInfoComponents />
                        <SettingAppComponents />
                    </div>
                    <div>
                        <a href='/supplier' className='cIcajICXbl'>Trở thành đối tác</a>
                    </div>
                </div>
            </div>
            <CategoryComponents />
        </>
    );
};
export default HeaderAppComponent;
