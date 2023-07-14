import { EditOutlined, UnlockOutlined, LockOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, DeploymentUnitOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Tooltip, Button, Row, Col, Input, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import { AdressUpdateDto } from '../../AdminAreas/Adress/dtos/adressQuery';
import { L } from "../../../lib/abpUtility";
import '../supplier_table.css';

const { Option } = Select;
const SCENES_KEY = "ORDER_SUPPLIER";

type IOrder = {

} & typeof defaultProps;

const defaultProps = {};

Order.defaultProps = defaultProps;

export default function Order(props: IOrder) {
  //constructor
  useEffect(() => {

  }, []);

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
  const [onShowModal, setonShowModal] = useState<boolean>(false);

  // Local
  const [dataSource, setDataSource] = useState<AdressDto[]>(
    [
      {
        name: "Thor Padilla",
        types: 9,
        isActive: false,
        isDeleted: true,
        categoryName: "Nehru Gonzales"
      }, {
        name: "Stone Levine",
        types: 6,
        isActive: true,
        isDeleted: true,
        categoryName: "Malcolm Drake"
      }, {
        name: "Oren Petty",
        types: 0,
        isActive: false,
        isDeleted: true,
        categoryName: "Slade Lancaster"
      }, {
        name: "Sarah Hines",
        types: 9,
        isActive: false,
        isDeleted: false,
        categoryName: "Leslie Weiss"
      }, {
        name: "Indigo Conrad",
        types: 8,
        isActive: false,
        isDeleted: true,
        categoryName: "Slade Morales"
      }, {
        name: "Devin Jordan",
        types: 6,
        isActive: true,
        isDeleted: true,
        categoryName: "Leandra Lindsay"
      }, {
        name: "Alexa Rasmussen",
        types: 1,
        isActive: true,
        isDeleted: true,
        categoryName: "Riley Yates"
      }, {
        name: "Vivian Hebert",
        types: 2,
        isActive: true,
        isDeleted: true,
        categoryName: "Len Aguilar"
      }, {
        name: "Chancellor Sweeney",
        types: 9,
        isActive: false,
        isDeleted: true,
        categoryName: "Allegra Waters"
      }, {
        name: "April Walker",
        types: 8,
        isActive: true,
        isDeleted: true,
        categoryName: "Jared Shepherd"
      }
    ]
  );
  
  const [dataBeginEdit, setdataBeginEdit] = useState<AdressUpdateDto | undefined>(undefined);

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

  const _restartData = () => {
    setvalueSearch([]);
    settotalCount(0);
    setloadingTable(false);
    setpageIndex(1);
    setpageSize(20);
  };

  const columns: ColumnsType<AdressDto> = [
    {
      title: L("name", SCENES_KEY),
      dataIndex: 'name',
      render: (text: string) => {
        return (<a>{text}</a>);
      }
    },
    {
      title: L("types", SCENES_KEY),
      dataIndex: 'types',
      render: (text: string) => {
        return (<>{text}</>);
      }
    },
    {
      title: L("isActive", SCENES_KEY),
      dataIndex: 'isActive',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("isDeleted", SCENES_KEY),
      dataIndex: 'isDeleted',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("categoryName", SCENES_KEY),
      dataIndex: 'categoryName',
      render: (text: string) => {
        return (<>{text}</>);
      }
    },
    {
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      align: 'center',
      render: (text: AdressDto) => (
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
      selectedRows: AdressDto[]
    ) => {
      setdataSelectFromTable(selectedRowKeys);
    },
    getCheckboxProps: (record: AdressDto) => ({
      name: record.name
    }),
  };

  const _onShowModalInsertOrUpdate = (value: AdressUpdateDto | undefined) => {
    setdataBeginEdit(value);
    setonShowModal(true);
  }

  const _onCloseModalAndResertData = () => {
    setonShowModal(false);
    _restartData();
  }

  return (
    <>
      <div className='vfqVMuXEsF'></div>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Row gutter={[5, 5]} className="ZrJziiKjUH">
            <Col span={12} className="JUVFCIUZTy">
              <Input
                className="kkLwRiTajL dCdYg"
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
                className="whIyGhlXlY dCdYg"
                onClick={() => _onShowModalInsertOrUpdate(undefined)}
              >
                {<PlusOutlined />} {L("ADD", "COMMON")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row className="ZrJziiKjUH wWLxpWXYpA">
            <Col className="JUVFCIUZTy">
              <Button
                loading={loadingAll}
                type="text"
                onClick={() => _restartData()}
              >
                {<RedoOutlined />}
              </Button>
              <Button loading={loadingAll} type="text">
                {<DeleteOutlined />}
              </Button>
              <Button loading={loadingAll} type="text">
                {<RetweetOutlined />}
              </Button>
              <ExportFileComponent
                location={undefined}
                urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                paramUri={undefined} type={[]} />
            </Col>
            <Col
              span={12}
              className="JUVFCIUZTy"
              style={{ justifyContent: "flex-end" }}
            >
              <Button loading={loadingAll} type="text">
                {<DeploymentUnitOutlined />}
              </Button>
              <Button
                loading={loadingAll}
                type="text"
                onClick={() => _restartData()}
              >
                {<FilterOutlined />}
              </Button>
              <Button loading={loadingAll} type="text">
                {<SortAscendingOutlined />}
                {L("Cấp độ hiển thị", "COMMON")}
              </Button>
              <Select placeholder={L("Chỉ cấp 0", "COMMON")}>
                <Option value={0}>{L("SELECT", "COMMON")}</Option>
                <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                <Option value={2}>{L("PDF", "COMMON")}</Option>
                <Option value={3}>{L("ALL", "COMMON")}</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col className='xutqvxhEdP'>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            loading={loadingTable}
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

export interface AdressDto {

  id?: number;
  name: string;
  types: number;
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
}