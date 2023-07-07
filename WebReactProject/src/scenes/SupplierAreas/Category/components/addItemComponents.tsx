import React, { useEffect, useState } from 'react';

import '../style.css';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Checkbox, Row, Col, Pagination } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import services from '../services';
import { SelectedModel } from '../../../../services/common/selectedModel';
import { notifyError } from '../../../../components/Common/notification';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CategoryInterview, CategorySelectedProps } from '../dtos/categoryDtos';

const SCENES_KEY = "CATEGORY_PRODUCT";

interface IAddItemComponents {
  idCategoryMain: number;
  level: number;
  onCheckValue: (id: number) => void;
  onLoadNextLevel: (value: CategoryInterview) => void;
  onSelected: (value: CategorySelectedProps) => void;
}

export default function AddItemComponents(props: IAddItemComponents) {

  const [categorySelected, setCategorySelected] = useState<number[]>([]);
  const [dataCategory, setDataCategory] = useState<SelectedModel[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDataInit();
  }, [props.idCategoryMain, props.level])

  useEffect(() => {
    getDataInit();
  }, [pageIndex, pageSize])

  const getDataInit = async () => {
    let rsl = await services.getCategoryRoot({
      valuesSearch: [props.idCategoryMain.toString(), (props.level).toString()],
      pageIndex: pageIndex - 1,
      pageSize: pageSize
    });

    if (rsl.error === false && rsl.result !== undefined) {
      let data = rsl.result;
      setDataCategory(data.items);
      setPageIndex(data.pageIndex + 1);
      setPageSize(data.pageSize);
      setTotalItem(data.totalCount);
    }
    else {
      notifyError("ERROR", "ERROR");
    }
  };

  const _changePage = (page: number, pageSize: number) => {
    setPageIndex(page);
    setPageSize(pageSize);
  }

  // ========= CHECK EVENT =========

  const onViewCategory = (value: number) => {
    if (categorySelected.includes(value) === false) {
      setCategorySelected(op => [...op, value]);
    } else {
      setCategorySelected(categorySelected.filter(f => f !== value));
    }
  };

  useEffect(() => {
    props.onSelected({
      level: props.level,
      ids: categorySelected
    });
  }, [categorySelected]);

  // ========= CHECK ALL =========
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (categorySelected.length === 0) {
      setIndeterminate(false);
      setCheckAll(false);
    }
  }, [categorySelected, dataCategory])

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckAll(e.target.checked);
    let temp = categorySelected;
    if (e.target.checked) {
      dataCategory.forEach(item => {
        temp.push(item.id);
      });
      setCategorySelected([...new Set(temp.map(dt => dt))]);
    }
    else {
      dataCategory.forEach(item => {
        setCategorySelected(temp.filter(i => i === item.id));
      });
    }
  };

  //========== INTERVIEW ==========

  const [interViewCategory, setinterViewCategory] = useState<number>(0);

  const _handleInterview = (value: number) => {
    setinterViewCategory(value);

    props.onLoadNextLevel({
      id: value,
      level: props.level
    });
  }

  return (
    <div className='qSMPeagWYj'>
      <div>
        <span>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} disabled checked={checkAll}>
            Đã lựa chọn {categorySelected.length} bản ghi!
          </Checkbox>
        </span>
        <Checkbox.Group style={{ width: '100%' }}>
          {
            dataCategory.length === 0
              ? <div className='cnYPIBowfX'>No Data</div>
              : dataCategory.map(m =>
                <div className='naCdLILsjk'>
                  <Checkbox
                    key={m.id}
                    value={m.id}
                    className='wLtVHBGvoS'
                    onClick={(value: any) => onViewCategory(Number(value.target.value))}
                    checked={categorySelected.includes(m.id)}
                  >
                  </Checkbox>
                  <div
                    className={interViewCategory === m.id ? 'sLCuHoQAsF iTXEBUxfkD' : 'sLCuHoQAsF'}
                    onClick={() => _handleInterview(m.id)}
                  >
                    {m.value}
                  </div>
                </div>)
          }
        </Checkbox.Group>
        <Pagination
          className='ejWwSgtHdh'
          size='small'
          simple
          onChange={_changePage}
          current={pageIndex}
          pageSize={pageSize}
          total={totalItem} />
      </div>
      <DoubleRightOutlined />
    </div >
  )
}
