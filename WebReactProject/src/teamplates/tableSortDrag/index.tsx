import { SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined, MenuOutlined, ApartmentOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button, Select, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { L } from "../../lib/abpUtility";
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ColumnsType } from 'antd/lib/table';
import { arrayMoveImmutable } from 'array-move';
import './style.css';
import UriManage from '../../utils/uriManage';
import ExportFileComponent from '../../components/File/ExportFileComponent';

const { Option } = Select;

type CategotyDto =  {
    key: string;
    name: string;
    age: number;
    address: string;
    index: number;
} & typeof defaultProps;

const defaultProps = {

}

const SCENES_KEY = "";

const data: CategotyDto[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        index: 0,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        index: 1,
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        index: 2,
    },
];

export interface ICategoryProps {
    location: any;
}

export default function Category(props: ICategoryProps) {
    //constructor
    useEffect(() => {
        var paramUris = UriManage.onCheckParameter(props.location.pathname, '/supplier/category/cai-dat');
        console.log('paramUris', paramUris);
    }, [])

    // Default 
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);

    // Local
    const [dataSource, setDataSource] = useState(data);

    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
    };

    var timeout: any = 0;
    const _onchangeInput = (text: any) => {
        if (timeout) {
            clearTimeout(timeout);
        };

        timeout = setTimeout(function () {
            setvalueSearch(text.target.value);
        }, 500);
    };

    const onFill = (value: any) => {
    };

    const _restartData = () => {
        setvalueSearch([]);
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };

    const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

    const columns: ColumnsType<CategotyDto> = [
        {
            title: 'Sort',
            dataIndex: 'sort',
            width: 30,
            className: 'drag-visible',
            render: () => <DragHandle />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: 'drag-visible',
            render: (text: string) => {
                return (<a>{text}</a>);
            }
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        }, 
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            align: 'center',
            render: (text: CategotyDto) => (
              <>
                <Tooltip title={L("EDIT", "COMMON")}>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                  ></Button>
                </Tooltip>
                <Tooltip title={true ? L("LOCK", "COMMON") : L("LOCK", "COMMON")}>
                  <Button
                    type="link"
                    icon={true ? <UnlockOutlined /> : <LockOutlined />}
                    
                  ></Button>
                </Tooltip>
                <Tooltip title={L("DELETE", "COMMON")}>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                  ></Button>
                </Tooltip>
              </>
            ),
          },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: CategotyDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: CategotyDto) => ({
            name: record.name
        }),
    };

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
                (el: CategotyDto) => !!el,
            );
            console.log('oldIndex, newIndex :>> ', oldIndex, newIndex);
            console.log('DataSource[oldIndex]', dataSource[oldIndex]);
            console.log('Sorted items: ', newData);
            setDataSource(newData);
        }
    };

    const DraggableContainer = (props: SortableContainerProps) => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr {...props} />
    ));

    const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props} />
    ));

    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <Row gutter={[5, 10]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Input
                                className="kkLwRiTajL"
                                allowClear
                                onChange={(text: any) => _onchangeInput(text)}
                                placeholder={L("SEARCH_INPUT", "COMMON")}
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col
                            span={12}
                            className="JUVFCIUZTy"
                            style={{ justifyContent: "flex-end" }}
                        >
                            <Button
                                loading={loadingAll}
                                type="text"
                                className="whIyGhlXlY"
                            >
                                {<PlusOutlined />} {L("ADD", "COMMON")}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[5, 5]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<RedoOutlined />}
                                {L("REFRESH", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<DeleteOutlined />}
                                {L("DELETE", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<RetweetOutlined />} {L("CHANGE", "COMMON")}
                            </Button>
                            <ExportFileComponent
                                location={undefined}
                                urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                                paramUri={undefined} type={[]}                            />
                        </Col>
                        <Col
                            span={12}
                            className="JUVFCIUZTy"
                            style={{ justifyContent: "flex-end" }}
                        >
                            <Button loading={loadingAll} type="text">
                                {<ApartmentOutlined />}
                                {L("TREEVIEW", SCENES_KEY)}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<FilterOutlined />}
                                {L("Lọc cấp cao", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<SortAscendingOutlined />}
                                {L("Cấp độ hiển thị", "COMMON")}
                            </Button>
                            <Select placeholder={L("Chỉ cấp 0", "COMMON")} bordered={false}>
                                <Option value={0}>{L("SELECT", "COMMON")}</Option>
                                <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                <Option value={2}>{L("PDF", "COMMON")}</Option>
                                <Option value={3}>{L("ALL", "COMMON")}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ borderRadius: 5, padding: 0, width: "100%", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="id"
                        components={{
                            body: {
                                wrapper: DraggableContainer,
                                row: DraggableBodyRow,
                            },
                        }}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        loading={loadingTable}
                        style={{ width: "100%" }}
                        size="small"
                        scroll={{ y: '60vh' }}
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            showSizeChanger: true,
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}