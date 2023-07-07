import { EditOutlined, UnlockOutlined, LockOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, DeploymentUnitOutlined, FilterOutlined, SortAscendingOutlined, EyeOutlined, StarOutlined, StarFilled, LikeFilled, MessageFilled, PieChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Tooltip, Button, Row, Col, Input, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import { AdressUpdateDto } from '../../AdminAreas/Adress/dtos/adressQuery';
import { L } from "../../../lib/abpUtility";
import '../supplier_table.css';
import { ProductSupplierDto } from './dtos/productSupplierDto';
import services from './services';
import { notifyError } from '../../../components/Common/notification';

const { Option } = Select;
declare var abp: any;
const SCENES_KEY = "ADRESS";

export default function Product() {
  useEffect(() => {

  }, []);

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

  const [dataSource, setDataSource] = useState<ProductSupplierDto[]>([]);

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

  const columns: ColumnsType<ProductSupplierDto> = [
    {
      title: L("name", SCENES_KEY),
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
      render: (text: string) => {
        return (<a className='iVlicoJMzD'>{text}</a>);
      }
    },
    {
      title: L("featureNumber", SCENES_KEY),
      dataIndex: 'featureNumber',
      align: 'center',
      render: (text: number) => {
        return (<a href="">{text} sản phẩm</a>);
      }
    },
    {
      title: L("avgStar", SCENES_KEY),
      dataIndex: 'avgStar',
      align: 'center',
      render: (text: number) => {
        return (<a href="">{text} <StarFilled style={{ color: "gold" }} /></a>);
      }
    },
    {
      title: L("avatar", SCENES_KEY),
      dataIndex: 'avatar',
      align: 'center',
      render: (text: string) => {
        return (<img className='mtmlFwsHbR' src={abp.appServiceUrl + text} alt='' />);
      }
    },
    {
      title: L("trademarName", SCENES_KEY),
      dataIndex: 'trademarkName',
      render: (text: string) => {
        return (<>{text}</>);
      }
    },
    {
      title: L("isActive", SCENES_KEY),
      dataIndex: 'isActive',
      align: 'center',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("isDeleted", SCENES_KEY),
      dataIndex: 'isDeleted',
      align: 'center',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (text: ProductSupplierDto) => (
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
              icon={<PieChartOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title={L("DELETE", "COMMON")}>
            <Button
              type="link"
              icon={<SettingOutlined />}
            ></Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ProductSupplierDto[]
    ) => {
      setdataSelectFromTable(selectedRowKeys);
    },
    getCheckboxProps: (record: ProductSupplierDto) => ({
      name: record.name
    }),
  };

  const _loadData = async () => {
    setloadingTable(true);
    var rsl = await services.GetProduct({
      pageIndex: pageIndex,
      pageSize: pageSize
    });
    if (rsl.error === false || rsl.result !== undefined) {
      setDataSource(rsl.result.items);
      setpageIndex(rsl.result.pageIndex);
      setpageSize(rsl.result.pageSize);
    }
    else {
      notifyError("ERROR", "DATA_NULL");
    }
    setloadingTable(false);
  }

  useEffect(() => {
    if (!loadingTable) return;
    _loadData();
  }, []);

  useEffect(() => {
    _loadData();
  }, [pageIndex, pageSize, valueSearch]);

  return (
    <>
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
                onClick={() => { window.location.href = "/supplier/add-product" }}
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
                paramUri={undefined} type={[]}              />
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
            scroll={{ x: 1300, y: '60vh' }}
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