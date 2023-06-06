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
} from "@ant-design/icons";
import { Row, Col, Input, Button, Select, Table, Tooltip, InputRef, Space } from "antd";
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
import { CategoryInOrUpDto, CategoryTableDto } from "./dataTypes/categoryDtos";
import { CategoryTableFake } from "./dataTypes/dataFake";
import UriManage from "../../../utils/uriManage";
import service from "./services";
import AddCategoryComponent from "./components/addCategoryComponent";
import ExportFileComponent from "../../../components/File/ExportFileComponent";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

const { Option } = Select;

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
  const [dataBeginEdit, setdataBeginEdit] = useState<CategoryInOrUpDto | undefined>(undefined);
  // Local
  const [dataSource, setDataSource] = useState<CategoryTableDto[]>(CategoryTableFake);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof CategoryTableDto;

  // fetch data
  const fetchInitData = async () => {
    var dataInit = await service.getdataTable({
      pageIndex: 0,
      pageSize: 0,
    });
    setDataSource(dataInit);
  };

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

  var timeout: any = 0;
  const _onchangeInput = (text: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      setvalueSearch(text.target.value);
    }, 500);
  };

  const onFill = (value: any) => { };

  const _restartData = () => {
    setvalueSearch([]);
    settotalCount(0);
    setloadingTable(false);
    setpageIndex(1);
    setpageSize(20);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      className: "drag-visible",
      render: (text: string) => {
        return <a>{text}</a>;
      },
    },
    {
      title: "level",
      key: "level",
      ...getColumnSearchProps('level'),
      sorter: (a, b) => a.level.length - b.level.length,
      sortDirections: ['descend', 'ascend'],
      dataIndex: "level",
    },
    {
      title: "nameParent",
      key: "nameParent",
      ...getColumnSearchProps('nameParent'),
      sorter: (a, b) => a.nameParent.length - b.nameParent.length,
      sortDirections: ['descend', 'ascend'],
      dataIndex: "nameParent",
    },
    {
      title: L("ACTION", "COMMON"),
      key: "x",
      width: 120,
      render: (text: CategoryTableDto) => (
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
        </div>
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
      name: record.name,
    }),
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataSource.slice(),
        oldIndex,
        newIndex
      ).filter((el: CategoryTableDto) => !!el);
      console.log("oldIndex, newIndex :>> ", oldIndex, newIndex);
      console.log("DataSource[oldIndex]", dataSource[oldIndex]);
      console.log("Sorted items: ", newData);
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
                onClick={() => {
                  onFill(undefined);
                  setonShowModal(true);
                }}
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
              <ExportFileComponent<CategoryTableDto>
                location={undefined}
                urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                paramUri={{
                  id: 0,
                  name: "string",
                  level: "string",
                  idParent: 0,
                  nameParent: "string",
                }}
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
                onClick={() => _restartData()}
              >
                {<FilterOutlined />}
                {L("REFRESH", "COMMON")}
              </Button>
              <Button loading={loadingAll} type="text">
                {<SortAscendingOutlined />}
                {L("DELETE", "COMMON")}
              </Button>
              <Select placeholder={L("REPORT_FILE", "COMMON")} bordered={false}>
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
        <AddCategoryComponent
          location={undefined}
          value={dataBeginEdit}
          onClose={() => {
            setonShowModal(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
