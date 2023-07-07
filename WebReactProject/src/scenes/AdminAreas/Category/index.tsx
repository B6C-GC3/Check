import {
  SearchOutlined,
  PlusOutlined,
  RedoOutlined,
  DeleteOutlined,
  RetweetOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  MenuOutlined,
  DragOutlined,
  EditOutlined,
  UserOutlined,
  LockOutlined,
  ApartmentOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Row, Col, Input, Button, Select, Table, Tooltip, InputRef, Space, Avatar, Tag, TableProps } from "antd";
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
import { AdminCategoryCreateDto, CategoryInOrUpDto, CategoryTableDto } from "./dataTypes/categoryDtos";
import { CategoryTableFake } from "./dataTypes/dataFake";
import UriManage from "../../../utils/uriManage";
import service from "./services";
import AddCategoryComponent from "./components/addCategoryComponent";
import ExportFileComponent from "../../../components/File/ExportFileComponent";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { notifyError, notifySuccess } from "../../../components/Common/notification";
import { ToClientExceptionNotifyError } from "../../../services/dto/clientExceptionDto";
import TreeCategoryComponenrt from "./components/treeCategoryComponenrt";

const { Option } = Select;

declare var abp: any;

const SCENES_KEY = "ADMIN_CATEGORY";
export interface ICategoryProps {
  location: any;
}

export default function Category(props: ICategoryProps) {
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
  const [dataBeginEdit, setdataBeginEdit] = useState<AdminCategoryCreateDto | undefined>(undefined);
  const [flag, setflag] = useState<boolean>(false);
  // Local
  const [dataSource, setDataSource] = useState<CategoryTableDto[]>(CategoryTableFake);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [showTreeViewModal, setshowTreeViewModal] = useState<boolean>(false);

  type DataIndex = keyof CategoryTableDto;

  // fetch data
  const fetchInitData = async () => {
    setloadingTable(true);
    var dataInit = await service.getdataTable({
      propertySearch: propertySearch,
      valuesSearch: ["1", ""],
      propertyOrder: propertyOrder,
      valueOrderBy: valueOrderBy,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    if (dataInit.error === false && dataInit.result !== undefined) {
      setDataSource(dataInit.result.items);
      setpageIndex(dataInit.result.pageIndex);
      setpageSize(dataInit.result.pageSize);
      settotalCount(dataInit.result.totalCount);
    }
    else {
      notifyError("Dữ liệu Lỗi", dataInit.messageError);
    };

    setloadingTable(false);
    setflag(false);
  };

  //constructor
  useEffect(() => {
    var paramUris = UriManage.onCheckParameter(
      props.location.pathname,
      "/admin/category/cai-dat"
    );
    fetchInitData();
  }, []);

  useEffect(() => {
    if (flag) { fetchInitData(); }
  }, [flag])

  var timeout: any = 0;
  const _onchangeInput = (text: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

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
    setflag(true);
  };

  // search 
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // order
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<CategoryTableDto> => ({
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

  // export File
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
  ));

  const columns: ColumnsType<CategoryTableDto> = [
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
      title: L("Name", SCENES_KEY),
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      className: "drag-visible",
      render: (text: string) => {
        return <a>{text}</a>;
      },
    },
    {
      title: L("Url", SCENES_KEY),
      dataIndex: "url",
      key: "url",
      ...getColumnSearchProps('url'),
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      className: "drag-visible",
      render: (text: string) => {
        return <a>{text}</a>;
      },
    },
    {
      title: L("Icon", SCENES_KEY),
      dataIndex: "icon",
      key: "icon",
      className: "drag-visible",
      render: (text: string) => {
        return <Avatar shape="square" src={abp.appServiceUrl + text} size={64} icon={<UserOutlined />} />;
      },
    },
    {
      title: L("Level", SCENES_KEY),
      dataIndex: "level",
      key: "level",
      align: 'center',
      ...getColumnSearchProps('level'),
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: L("CategoryMainName", SCENES_KEY),
      dataIndex: "categoryMainName",
      key: "categoryMainName",
      className: "drag-visible",
      render: (text: string) => {
        return text ? <a>{text}</a> : <Tag color="#FF0004">{L("NULL", "COMMON")}</Tag>;
      },
    },
    {
      title: L("TenantName", SCENES_KEY),
      dataIndex: "tenantName",
      key: "tenantName",
      className: "drag-visible",
      render: (text: string) => {
        return <>{text}</>;
      },
    },
    {
      title: L("NumberOrder", SCENES_KEY),
      key: "numberOrder",
      dataIndex: "numberOrder",
      align: 'center',
      ...getColumnSearchProps('numberOrder'),
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: L("IsActive", SCENES_KEY),
      dataIndex: "isActive",
      key: "isActive",
      align: 'center',
      className: "drag-visible",
      render: (text: boolean) => {
        return text ? <Tag color="#52c41a">True</Tag> : <Tag color="#FF0004">False</Tag>;
      },
    },
    {
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      align: 'center',
      render: (text: CategoryTableDto) => (
        <>
          <Tooltip title={L("EDIT", "COMMON")}>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => _onFillEditData(text)}
            ></Button>
          </Tooltip>
          <Tooltip title={text.isActive ? L("LOCK", "COMMON") : L("LOCK", "COMMON")}>
            <Button
              type="link"
              icon={text.isActive ? <UnlockOutlined /> : <LockOutlined />}
              onClick={() => {
                _lockUnLockCategory(text.id);
              }}
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
      selectedRows: CategoryTableDto[]
    ) => {
      setdataSelectFromTable(selectedRowKeys);
    },
    getCheckboxProps: (record: CategoryTableDto) => ({
      name: record.name
    }),
  };

  const onSortEnd = async ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      setloadingTable(true);
      const newData = arrayMoveImmutable(
        dataSource.slice(),
        oldIndex,
        newIndex
      ).filter((el: CategoryTableDto) => !!el);

      var result = await service.changePlacesCategory({
        idRoot: dataSource[oldIndex].id,
        idDestination: dataSource[newIndex].id
      });

      if (result && result.error) {
        setloadingTable(false);
        ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
      }
      else {
        setloadingTable(false);
        notifySuccess(L("SUCCESS", "COMMON"), L("UPDATE_SUCCESS", "COMMON"));
        var historyNumberOrder = dataSource[oldIndex].numberOrder;
        dataSource[oldIndex].numberOrder = dataSource[newIndex].numberOrder;
        dataSource[newIndex].numberOrder = historyNumberOrder;
        setDataSource(newData);
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
    return <SortableItem index={index} {...restProps} />;
  };

  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
  );

  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    )
  );

  const _onChangeTable: TableProps<CategoryTableDto>['onChange'] = (pagination: any, filters, sorter: any, extra) => {
    setpageIndex(pagination.current);
    setpageSize(pagination.pageSize);
    setpropertyOrder(sorter.columnKey);
    setvalueOrderBy(sorter.order === "descend" ? false : true);
    setflag(true);
  };

  //Lock - Unlock
  const _lockUnLockCategory = async (id: number) => {
    setloadingTable(true);
    if (id === 0) {
      notifyError(L("WANNING", "COMMON"), L("NOT_EXIST", "COMMON"));
    }
    else {
      var result = await service.lockCategory({ id: id });

      if (result && result.error) {
        ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
      }
      else {
        notifySuccess(L("SUCCESS", SCENES_KEY), L("UPDATE_SUCCESS", SCENES_KEY));
        _restartData();
      }
    }
    setloadingTable(false);
  }

  const _onCloseModalAndResertData = () => {
    setonShowModal(false);
    setshowTreeViewModal(false);
    _restartData();
  }
  // fill data edit 

  const _onFillEditData = (value: CategoryTableDto | undefined) => {
    if (value === undefined) setdataBeginEdit(undefined);
    else
      setdataBeginEdit({
        id: value.id,
        name: value.name,
        url: value.url,
        icon: value.icon,
        level: value.level,
        categoryMain: value.categoryMainId,
        tenantId: value.tenantId,
        isActive: value.isActive
      });
    setonShowModal(true);
  };

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
                onClick={() => _onFillEditData(undefined)}
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
                paramUri={undefined} type={[]}              />
            </Col>
            <Col
              span={12}
              className="JUVFCIUZTy"
              style={{ justifyContent: "flex-end" }}
            >
              <Button onClick={() => setshowTreeViewModal(true)} loading={loadingAll} type="text">
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
            onChange={_onChangeTable}
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
      {onShowModal
        ? (<AddCategoryComponent
          location={undefined}
          value={dataBeginEdit}
          onClose={_onCloseModalAndResertData}
        />)
        : (<></>)
      }
      {showTreeViewModal
        ? (<TreeCategoryComponenrt onClose={_onCloseModalAndResertData} />)
        : (<></>)}
    </>
  );
}
