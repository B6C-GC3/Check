import { Col, message, Row, Tree } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import { DataNode } from 'antd/lib/tree';
import React, { Key, useEffect, useState } from 'react'
import { PermissionTenantTreeDto } from '../dtos/tenantDto';
import services from '../services';

const LocationKey = "CONST_TENANT";

export interface ITreeLoadDataPermission {
    roleId?: number;
    tenantId?: number;
    title: string;
}

export default function TreeLoadDataPermission(props: ITreeLoadDataPermission) {
    const [defaultCheckNode, setdefaultCheckNode] = useState<Key[]>([]);
    const [treeData, settreeData] = useState<DataNode[]>([]);

    const fetdataForTree = async () => {
        if (props.roleId && props.tenantId) {
            var dataTreePermission = await services.LoadPermissionReview(props.roleId, props.tenantId);
            if (dataTreePermission && !dataTreePermission.error) {
                var datal = MapDataNode(dataTreePermission.result, '');
                settreeData(datal);
            }
        }
        else {
            message.error("Không tìm thấy dữ liệu" + props.title);
        }
    }

    useEffect(() => {
        fetdataForTree();
    }, [])


    return (
        <>
            <Row>
                <Col span={4}>{props.title}</Col>
                <Col span={20}>
                    <Tree
                        checkedKeys={defaultCheckNode}
                        treeData={treeData}
                    />
                </Col>
            </Row>
        </>
    )
}


function MapDataNode(input: PermissionTenantTreeDto[], keyIndexOf: string): DataNode[] {
    var dataNodes: DataNode[] = [];
    input.map(element => {
        let beginString = keyIndexOf.length == 0 ? element.key : keyIndexOf + "." + element.key;
        let dataNode: DataNode = {
            key: beginString,
            title: L(element.key, LocationKey),
            children: MapDataNode(element.children, beginString)
        }
        dataNodes.push(dataNode);
    });
    return dataNodes;
}