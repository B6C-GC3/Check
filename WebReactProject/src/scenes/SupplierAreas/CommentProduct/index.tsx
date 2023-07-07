import { EditOutlined, UnlockOutlined, LockOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, DeploymentUnitOutlined, FilterOutlined, SortAscendingOutlined, StarFilled, MessageFilled, SignalFilled, EyeOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Tooltip, Button, Row, Col, Input, Select, Table, Tag, Card, Statistic, Rate, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import { AdressUpdateDto } from '../../AdminAreas/Adress/dtos/adressQuery';
import CountUp from 'react-countup';
import { L } from "../../../lib/abpUtility";
import '../supplier_table.css';
import './index.css';
import { valueType } from 'antd/es/statistic/utils';
import { AssessmentSupplierCommentDto, AssessmentSupplierOverviewDto } from './dtos/assessmentSupplierOverviewDto';
import services from './services';
import { notifyError, notifySuccess } from '../../../components/Common/notification';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import CommentDetailComponent from './components/commentDetailComponent';

const { Option } = Select;
const SCENES_KEY = "ADRESS";

export default function CommentProduct() {
  const [pageSize, setpageSize] = useState<number>(20);
  const [pageIndex, setpageIndex] = useState<number>(1);
  const [totalCount, settotalCount] = useState<number>(0);
  const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
  const [valueSearch, setvalueSearch] = useState<string[] | undefined>(['52', '1']);
  const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
  const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
  const [loadingAll, setloadingAll] = useState<boolean>(false);
  const [loadingTable, setloadingTable] = useState<boolean>(false);
  const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);
  const [onShowModal, setonShowModal] = useState<boolean>(false);
  const [dataOvewview, setDataOvewview] = useState<AssessmentSupplierOverviewDto>();
  const [idCommentSelected, setIdCommentSelected] = useState<number>(0);

  // Local
  const [dataSource, setDataSource] = useState<AssessmentSupplierCommentDto[]>([]);

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

  const columns: ColumnsType<AssessmentSupplierCommentDto> = [
    {
      title: L("nameUser", SCENES_KEY),
      dataIndex: 'nameUser',
      align: 'center',
      width: 150,
      render: (text: string) => {
        return (<>{text}</>);
      }
    },
    {
      title: L("comment", SCENES_KEY),
      dataIndex: 'comment',
      render: (text: string) => {
        return (<span className='iVlicoJMzD'>{text}</span>);
      }
    },
    {
      title: L("productName", SCENES_KEY),
      dataIndex: 'productName',
      render: (text: string) => {
        return (<span className='iVlicoJMzD'>{text}</span>);
      }
    },
    {
      title: L("star", SCENES_KEY),
      dataIndex: 'star',
      align: 'center',
      width: 150,
      render: (text: number) => {
        return (<Rate className='nKoCyfBmwV' disabled defaultValue={text} />);
      }
    },
    {
      title: L("isNew", SCENES_KEY),
      dataIndex: 'isNew',
      align: 'center',
      render: (text: boolean) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("numberImage", SCENES_KEY),
      dataIndex: 'numberImage',
      align: 'center',
      render: (text: string) => {
        return (<>{text}</>);
      }
    },
    {
      title: L("lastModificationTime", SCENES_KEY),
      dataIndex: 'lastModificationTime',
      render: (text: Date) => {
        return (<>{new Date(text).toLocaleString()}</>);
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
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      align: 'center',
      render: (text: AssessmentSupplierCommentDto) => (
        <>
          <Tooltip title={L("EDIT", "COMMON")}>
            <Button
              type="link"
              onClick={() => setIdCommentSelected(text.id)}
              icon={<EyeOutlined />}
            ></Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: AssessmentSupplierCommentDto[]
    ) => {
      setdataSelectFromTable(selectedRowKeys);
    },
    getCheckboxProps: (record: AssessmentSupplierCommentDto) => ({
      name: record.id.toString()
    }),
  };

  useEffect(() => {
    _loadOverview();
    _onLoadCommnetDefault();
  }, []);

  const _loadOverview = async () => {
    var rsl = await services.GetOverrview(52);
    if (!rsl.error || rsl.result !== undefined) {
      setDataOvewview(rsl.result);
    } else {
      notifyError("ERROR", "ERROR");
    }
  }

  const _onLoadCommnetDefault = async () => {
    setloadingTable(true);
    var rsl = await services.GetCommentProduct({
      valuesSearch: valueSearch,
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    if (!rsl.error || rsl.result !== undefined) {
      setDataSource(rsl.result.items);
      setpageIndex(rsl.result.pageIndex);
      setpageSize(rsl.result.pageSize);
      settotalCount(rsl.result.totalCount);
    } else {
      notifyError("ERROR", "ERROR");
    }
    setloadingTable(false);
  }

  useEffect(() => {
    if (loadingTable) return;
    _onLoadCommnetDefault();
  }, [pageIndex, pageSize]);

  const _onWatchedComment = async () => {
    var rsl = await services.WatchedComment(dataSelectFromTable);
    if (rsl.error == false && rsl.result !== undefined) {
      var newData = dataSource.map(item => {
        if (dataSelectFromTable.some(s => s === item.id)) {
          item.isNew = false;
        }
        return item;
      });

      setDataSource(newData);
      notifySuccess("SUCCESS", "INSERT " + rsl.result + " RECORD SUCCESS");
    }
    else {
      notifyError("ERROR", "ERROR");
    }
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
              >
                {<PlusOutlined />} {L("ADD", "COMMON")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className='qKulFWRevV'>
          <Card bordered={false}>
            <Statistic title="Tổng sao/Trung bình"
              value={dataOvewview?.totalStar}
              formatter={(value: valueType) => formatter(Number(value))}
              prefix={<StarFilled style={{ color: "gold" }} />}
              suffix={<>
                / {dataOvewview?.avgStar}
              </>} />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="Đánh giá và bình luận"
              value={dataOvewview?.totalComment}
              formatter={(value: valueType) => formatter(Number(value))}
              prefix={<MessageFilled style={{ color: '#1677ff' }} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="Xếp hạng chung"
              value={112893}
              formatter={(value: valueType) => formatter(Number(value))}
              prefix={<SignalFilled style={{ color: 'cornflowerblue' }} />}
            />
          </Card>
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
                {<RetweetOutlined />}
              </Button>
              <Button loading={loadingAll} type="text" onClick={_onWatchedComment}>
                {<EyeOutlined />}
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
            rowSelection={{ ...rowSelection }}
            loading={loadingTable}
            size="small"
            scroll={{ y: '47vh' }}
            pagination={{
              onChange: _searchDataOnClick,
              pageSize: pageSize,
              total: totalCount,
              defaultCurrent: 1,
              showSizeChanger: true,
              pageSizeOptions: ["1", "10", "20", "50", "100"],
            }}
          />
        </Col>
      </Row>
      {idCommentSelected !== 0
        ? <CommentDetailComponent idComment={idCommentSelected} onClose={() => setIdCommentSelected(0)} />
        : <></>}
    </>
  )
}

const formatter = (value: number) => {
  return (<CountUp end={value} separator="," />);
}