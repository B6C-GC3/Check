import {
  SearchOutlined,
  PlusOutlined,
  RedoOutlined,
  MenuOutlined,
  DragOutlined,
  EditOutlined,
  DeploymentUnitOutlined,
  EyeOutlined,
  SignalFilled,
  MessageFilled,
  StarFilled,
  SyncOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Row, Col, Input, Button, Select, Table, Tooltip, InputRef, Space, Card, Statistic, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { L } from "../../../lib/abpUtility";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "./style.css";
import "../supplier_table.css";
import UriManage from "../../../utils/uriManage";
import service from "./services";
import ExportFileComponent from "../../../components/File/ExportFileComponent";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import CountUp from "react-countup";
import { valueType } from "antd/es/statistic/utils";
import AddModalCompoments from "./components/addModalCompoments";
import services from "./services";
import { notifyError, notifySuccess } from "../../../components/Common/notification";
import { CategorySupplierMappingDto } from "./dtos/categoryDtos";
import { TypeExportFile } from "../../../components/File/ExportFileComponent/dataTypes/typeExport";

const { Option } = Select;

export interface ICategoryProps {
  location: any;
}

export default function Category(props: ICategoryProps) {
  // Default
  const [pageSize, setpageSize] = useState<number>(20);
  const [pageIndex, setpageIndex] = useState<number>(0);
  const [totalCount, settotalCount] = useState<number>(0);
  const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
  const [valueSearch, setvalueSearch] = useState<string[] | undefined>([]);
  const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
  const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
  const [loadingAll, setloadingAll] = useState<boolean>(false);
  const [loadingTable, setloadingTable] = useState<boolean>(false);
  const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);
  const [onShowModal, setonShowModal] = useState<boolean>(false);
  // Local
  const [dataSource, setDataSource] = useState<CategorySupplierMappingDto[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof CategorySupplierMappingDto;

  // fetch data
  const fetchInitData = async () => {
    setloadingAll(true);
    let rsl = await services.GetDataPagedList({
      valuesSearch: valueSearch,
      propertySearch: propertySearch,
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    if (rsl.error == false && rsl.result !== undefined) {
      let data = rsl.result;
      setDataSource(data.items);
      setpageIndex(data.pageIndex);
      setpageSize(data.pageSize);
      settotalCount(data.totalCount);

      setloadingAll(false);
    }
    else {
      notifyError("ERROR", "ERROR");
      setloadingAll(false);
    }
  };
  useEffect(() => {
    setpageIndex(0);
    setpageSize(20);
    fetchInitData();
  }, [valueSearch, propertySearch])

  //constructor
  useEffect(() => {
    var paramUris = UriManage.onCheckParameter(
      props.location.pathname,
      "/supplier/category/cai-dat"
    );
    fetchInitData();
  }, []);

  const _searchDataOnClick = (page: number, pageSize: number) => {
    setpageSize(pageSize);
    setpageIndex(page);
  };

  const _restartData = () => {
    setvalueSearch([]);
    settotalCount(0);
    setloadingTable(false);
    setpageIndex(0);
    setpageSize(20);
  };

  // search single
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setvalueSearch(selectedKeys);
    setpropertySearch([dataIndex]);
    setpageIndex(0);
    setpageSize(20);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // full search
  var timeout: any = 0;
  const handleFullSearch = (value: string) => {
    if (timeout) {
      clearTimeout(timeout);
    };

    timeout = setTimeout(function () {
      setpropertySearch(undefined);
      setvalueSearch([value]);
    }, 500);
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<CategorySupplierMappingDto> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: CategorySupplierMappingDto[]
    ) => {
      setdataSelectFromTable(selectedRowKeys);
    },
    getCheckboxProps: (record: CategorySupplierMappingDto) => ({
      name: record.name,
    }),
  };

  const onSortEnd = async ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      setloadingTable(true);
      if (dataSource[oldIndex].id === undefined || dataSource[newIndex].id === undefined) return;
      let rsl = await service.ChangeOrderNumber({ idOld: dataSource[oldIndex].id, idNew: dataSource[newIndex].id });
      if (rsl.error === false && rsl.result !== undefined && rsl.result === 1) {
        let tempOrderNumber = dataSource[oldIndex].orderNumber;
        dataSource[oldIndex].orderNumber = dataSource[newIndex].orderNumber;
        dataSource[newIndex].orderNumber = tempOrderNumber;

        const newData = arrayMoveImmutable(
          dataSource.slice(),
          oldIndex,
          newIndex
        ).filter((el: CategorySupplierMappingDto) => !!el);
        setDataSource(newData);
        notifySuccess("SUCCESS", "SUCCESS");
        setloadingTable(false);
      }
      else {
        notifyError("ERROR", "ERROR");
        setloadingTable(false);
      }
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

  const DraggableBodyRow: React.FC<any> = ({
    className,
    style,
    ...restProps
  }) => {
    const index = dataSource.findIndex(
      (x) => x.id === restProps["data-row-key"]
    );
    return <SortableItem index={index} disabled={dataSource[index]?.showHomePage === false} {...restProps} />;
  };

  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
  );

  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    )
  );

  // export File
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
  ));

  const columns: ColumnsType<CategorySupplierMappingDto> = [
    {
      title: (
        <>
          <Tooltip title={L("SORT_DROP", "COMMON")}>
            <DragOutlined />
          </Tooltip>
        </>
      ),
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortDirections: ['descend', 'ascend'],
      className: "drag-visible",
      render: (text: string) => {
        return <a onClick={() => handleFullSearch(text)}>{text}</a>;
      },
    },
    {
      title: "showHomePage",
      dataIndex: "showHomePage",
      key: "showHomePage",
      align: 'center',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: "orderNumber",
      dataIndex: "orderNumber",
      key: "orderNumber",
      align: 'center',
      className: "drag-visible",
      render: (text: string) => {
        return (text === null ? <Tag></Tag> : <Tag color='green'>{text}</Tag>);
      }
    },
    {
      title: "CategoryMainName ",
      key: "categoryMainName ",
      dataIndex: "categoryMainName",
      ...getColumnSearchProps('categoryMainName'),
      sorter: (a, b) => a.categoryMainName?.length - b.categoryMainName?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text: string) => {
        return <a onClick={() => handleFullSearch(text)}>{text}</a>;
      },
    },
    {
      title: "userName ",
      key: "userName ",
      dataIndex: "userName",
      align: 'center',
      ...getColumnSearchProps('userName'),
      sorter: (a, b) => a.categoryMainName?.length - b.categoryMainName?.length,
      sortDirections: ['descend', 'ascend'], render: (text: string) => {
        return <a onClick={() => handleFullSearch(text)}>{text}</a>;
      },
    },
    {
      title: L("isActived", "SCENES_KEY"),
      dataIndex: 'isActived',
      key: "isActived",
      align: 'center',
      render: (text: string) => {
        return (text ? <Tag color='green'>TRUE</Tag> : <Tag color='red'>FALSE</Tag>);
      }
    },
    {
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      render: (text: CategorySupplierMappingDto) => (
        <div style={{ textAlign: "center" }}>
          <Tooltip title={L("EDIT", "COMMON")}>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                onFill(text);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title={L("ACTIVE", "COMMON")}>
            <Button
              type="link"
              icon={<SyncOutlined />}
              onClick={() => _changeIsActived(text)}
            ></Button>
          </Tooltip>
          <Tooltip title={L("SHOW", "COMMON")}>
            <Button
              type="link"
              icon={<HomeOutlined />}
              onClick={() => _changeShowOnHomePage(text)}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const onFill = (value: any) => { console.log('value :>> ', value); };

  const _changeIsActived = async (value: CategorySupplierMappingDto) => {
    setloadingTable(true);
    let rsl = await service.ChangeIsActived(value.id);
    if (rsl.error === false && rsl.result !== undefined) {
      let data = rsl.result;
      const dataTemp = dataSource.map(s => {
        if (s.id === value.id) {
          s.isActived = !s.isActived;
          s.orderNumber = data.orderNumber;
          s.showHomePage = data.showHomePage;
        }
        return s;
      });
      setDataSource(dataTemp);
      notifySuccess("SUCCESS", "SUCCESS");
      setloadingTable(false);
    }
    else {
      notifyError("ERROR", "ERROR");
      setloadingTable(false);
    }
  }

  const _changeShowOnHomePage = async (value: CategorySupplierMappingDto) => {
    setloadingTable(true);
    let rsl = await service.ShowOnHomePageHandle(value.id);
    if (rsl.error === false && rsl.result !== undefined) {
      let data = rsl.result;
      const dataTemp = dataSource.map(s => {
        if (s.id === value.id) {
          s.orderNumber = data.orderNumber;
          s.showHomePage = data.showHomePage;
        }
        return s;
      });
      setDataSource(dataTemp);
      notifySuccess("SUCCESS", "SUCCESS");
      setloadingTable(false);
    }
    else {
      notifyError("ERROR", "ERROR");
      setloadingTable(false);
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
                onChange={(text: any) => handleFullSearch(text.target.value)}
                //defaultValue={valueSearch ? valueSearch[0] : ""}
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
                onClick={() => setonShowModal(true)}
              >
                {<PlusOutlined />} {L("ADD", "COMMON")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className='qKulFWRevV'>
          <Card bordered={false}>
            <Statistic title="Tổng sao/Trung bình"
              value={1}
              formatter={(value: valueType) => formatter(Number(value))}
              prefix={<StarFilled style={{ color: "gold" }} />}
              suffix={<>
                / {0}
              </>} />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="Đánh giá và bình luận"
              value={0}
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
                {<EyeOutlined />}
              </Button>
              <ExportFileComponent
                location={undefined}
                urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                paramUri={undefined}
                type={[TypeExportFile.Default, TypeExportFile.Excel]} />
            </Col>
            <Col
              span={12}
              className="JUVFCIUZTy"
              style={{ justifyContent: "flex-end" }}
            >
              <Button loading={loadingAll} type="text">
                {<DeploymentUnitOutlined />}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className='xutqvxhEdP'>
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
            loading={loadingTable || loadingAll}
            size="small"
            scroll={{ y: '47vh' }}
            pagination={{
              pageSize: pageSize,
              total: totalCount,
              defaultCurrent: 1,
              onChange: (page: number, pageSize: number | undefined) =>
                _searchDataOnClick(page, pageSize ?? 20),
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50", "100"],
            }}
          />
        </Col>
      </Row>

      {onShowModal ? (
        <AddModalCompoments open={onShowModal} onClose={() => setonShowModal(false)} />
      ) : (
        <></>
      )}
    </>
  );
}



const formatter = (value: number) => {
  return (<CountUp end={value} separator="," />);
}