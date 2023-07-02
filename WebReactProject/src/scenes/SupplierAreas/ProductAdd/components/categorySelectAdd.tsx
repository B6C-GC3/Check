import React, { Key, useEffect, useState } from 'react'
import { L } from "../../../../lib/abpUtility";
import { Checkbox, Col, Divider, Input, List, Pagination, Row, Skeleton, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DoubleRightOutlined } from '@ant-design/icons';
import { CategorySelectedDto, SupplierCategorAddProductDto } from '../dtos/productAddDto';
import services from '../services';
import { notifyError } from '../../../../components/Common/notification';
import '../style.css';
const { Search } = Input;

const SCENES_KEY = "PRODUCT_ADD";
const KEY_CATEGORY_SELECTED = "AGbFJ";

export interface ICategorySelectAdd {
  categoryInit: number[];
  onCategorySelected(keys: number[]): void;
}

export default function CategorySelectAdd(props: ICategorySelectAdd) {

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [categorySelected, setcategorySelected] = useState<CategorySelectedDto[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [searchTextCategorySelected, setsearchTextCategorySelected] = useState<string>("");
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    _loadCategory(0);
    if (props.categoryInit.length !== 0) {
      setCheckedKeys(props.categoryInit);
      setExpandedKeys(props.categoryInit);
    }
  }, []);

  useEffect(() => {
    if(treeData.length !== 0)
    {
      setCheckedKeys(props.categoryInit);
      setExpandedKeys(props.categoryInit);
    }
  }, [props.categoryInit])
  
  // load root category
  const _loadCategory = async (idCategoryMain: number) => {
    var result = await services.loadCategoryBySupplier({
      valuesSearch: [idCategoryMain.toString()],
      pageIndex: 0,
      pageSize: 0
    });

    if (result.error || !result.result) {
      notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
      setloading(false);
      return [];
    }
    else {
      var data = _convertDataDtoToDataNode(result.result);
      setloading(false);
      if (idCategoryMain === 0) setTreeData(data);
      return data;
    }
  };

  useEffect(() => {
    props.onCategorySelected(categorySelected.map(m => m.id));
  }, [categorySelected])

  useEffect(() => {
    if (props.categoryInit.length !== 0 && categorySelected.length !== props.categoryInit.length) {
      let data: CategorySelectedDto[] = [];
      treeData.forEach(item => {
        if (props.categoryInit.some(s => s === item.key)) {
          
          data.push({ id: item.key ?? 0, value: item.title?.toString() ?? '' } as CategorySelectedDto);
        }
      });

      setcategorySelected(data);
      setCheckedKeys(props.categoryInit);
    }
  }, [treeData])


  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[], info: any) => {
    var dataCategory: CategorySelectedDto[] = info.checkedNodes.map((m: any): CategorySelectedDto => { return { id: m.key, value: m.title } });
    // lấy key db
    localStorage.setItem(KEY_CATEGORY_SELECTED, JSON.stringify(dataCategory));
    setcategorySelected(dataCategory);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const onChangeCheckboxs = (e: CheckboxChangeEvent) => {
    var dataCategory = categorySelected.filter(m => m.id != e.target.value);
    setcategorySelected(dataCategory);
    var keyCategory: React.Key[] = dataCategory.map(m => m.id);
    setCheckedKeys(keyCategory);
  };

  const _setsearchTextCategorySelected = (text: string) => {
    setsearchTextCategorySelected(text);
  };

  // convert data dto to DataNode
  const _convertDataDtoToDataNode = (data: SupplierCategorAddProductDto[]): DataNode[] => {
    return !data ? [] : data.map((m: SupplierCategorAddProductDto): DataNode => { return { key: m.id, title: m.name } });
  };

  const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return { ...node, children, };
      }
      if (node.children) {
        return { ...node, children: updateTreeData(node.children, key, children) };
      }
      return node;
    });

  const onLoadData = async ({ key, children }: any) => {
    var data = await _loadCategory(key);
    setTreeData((origin: DataNode[]) => updateTreeData(origin, key, data));
  };

  return (
    <>

      <Skeleton loading={loading} paragraph={{ rows: 4 }}>
        <Row gutter={[5, 5]}>
          <Col span={17}>
            <Search className='WvLXmbGjwb' placeholder={L("Input search text", SCENES_KEY)} />
            <Tree
              checkable
              onExpand={onExpand}
              loadData={onLoadData}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={(checked: any, info: any) => onCheck(checked, info)}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
              className='zhtrtxKvQm'
              style={{ width: "100%", height: "65vh", overflowY: 'scroll' }}
            />
          </Col>
          <Col span={1} className="XNnGAmPRak">
            <DoubleRightOutlined />
          </Col>
          <Col span={6}>
            <Input className='WvLXmbGjwb' onChange={(e: React.ChangeEvent<HTMLInputElement>) => _setsearchTextCategorySelected(e.target.value)} placeholder={L("input search text", SCENES_KEY)} />
            <List
              style={{ width: "100%", height: "65vh", background: "#ffffff", borderRadius: "6px", overflowY: 'scroll' }}
              size='small'
              className='xkCJSyqDzS'
              dataSource={categorySelected}
              renderItem={(item: CategorySelectedDto) => (
                <List.Item key={item.id} style={(item.value.toLocaleLowerCase().indexOf(searchTextCategorySelected.toLocaleLowerCase()) > -1 && searchTextCategorySelected) ? { background: "#d9d9d9" } : {}}>
                  <Checkbox key={item.id} onChange={onChangeCheckboxs} checked={true} value={item.id}>{item.value}</Checkbox>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Skeleton>
    </>
  )
}
