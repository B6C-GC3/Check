import { Col, Modal, Row, Select, Typography } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './insertOrUpdate.css'
import services from '../services';
import { TenantBasicDto } from '../dtos/tenantDto';
import TreeLoadDataPermission from './treeLoadDataPermission';
import { RoleTenantDictionaryDto } from '../dtos/userTenantDto';
const { Text } = Typography;
const { Option } = Select;

declare var abp: any;

const LocationKey = "CONST_TENANT";

export interface IUserRoleInTenantProps {
    location: any;
    value: TenantBasicDto | undefined;
    optionSelect: RoleTenantDictionaryDto[];
    onClose: (option: RoleTenantDictionaryDto | RoleTenantDictionaryDto[]) => void;
}

export default function UserRoleInTenant(props: IUserRoleInTenantProps) {
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [optionsRoleInTenant, setoptionsRoleInTenant] = useState<RoleTenantDictionaryDto[]>([]);
    const [optionsRoleInTenantSelect, setoptionsRoleInTenantSelect] = useState<RoleTenantDictionaryDto | RoleTenantDictionaryDto[]>([]);

    useEffect(() => {
        props.onClose(optionsRoleInTenantSelect);
    }, [optionsRoleInTenantSelect])

    const _fetchData = async () => {
        if (props.value) {
            var rsRoleForUser = await services.LoadRoleForUser({
                valuesSearch: [props.value.id.toString(), ''],
                pageIndex: 1,
                pageSize: 10
            });

            if (rsRoleForUser && rsRoleForUser.result) {
                setoptionsRoleInTenant(rsRoleForUser.result.items);
            }
        }
    }

    useEffect(() => {
        // set option selected
        setoptionsRoleInTenantSelect(props.optionSelect);
        _fetchData();
    }, [])

    const _onSearchSelect = async (value: string) => {
        setloadingButton(false);
        if (props.value) {
            var rsRoleForUser = await services.LoadRoleForUser({
                valuesSearch: [props.value.id.toString(), value],
                pageIndex: 1,
                pageSize: 10
            });

            if (rsRoleForUser && rsRoleForUser.result) {
                setoptionsRoleInTenant(rsRoleForUser.result.items);
            }
        }
        setloadingButton(false);
    }

    const _onChangeSelect = async (option: RoleTenantDictionaryDto | RoleTenantDictionaryDto[]) => {
        setoptionsRoleInTenantSelect(option);
    }

    return (
        <>
            <Row gutter={[0, 10]} className='sqiTEQQJpx'>
                <Col span={18} offset={4}>
                    <Text>Vai Trò</Text>
                    <Select
                        mode="multiple"
                        placeholder='Lựa chọn vai trò cho tài khoản phân hệ'
                        showArrow
                        loading={loadingButton}
                        defaultValue={props.optionSelect.map(p => p.value)}
                        onSearch={(value: string) => _onSearchSelect(value)}
                        onChange={(value, option) => _onChangeSelect(option)}
                        style={{ width: '100%' }}
                        filterOption={false}
                        fieldNames={{ label: 'value', value: 'id' }}
                        options={optionsRoleInTenant}
                    >
                    </Select>
                    <Text>Chi tiết quyền trong Vai trò</Text>
                </Col>
                <Col span={16} offset={5} className='rQzErTfDIn'>
                    {
                        optionsRoleInTenant ?
                            ((optionsRoleInTenantSelect as RoleTenantDictionaryDto[])
                                .map(p => <TreeLoadDataPermission
                                    title={p.value}
                                    tenantId={props.value?.id}
                                    roleId={p.id} />))
                            : <></>
                    }
                </Col>
            </Row>
        </>
    )
}