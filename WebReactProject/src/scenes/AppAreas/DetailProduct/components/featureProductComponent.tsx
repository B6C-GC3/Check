import React, { cloneElement, useEffect, useState } from "react";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";
import { FeatureProductAttribute, FeatureProductAttributeDto, FeatureProductReadDto } from "../dtos/featureProductContainerDto";
import { L, mapThat } from "../../../../lib/abpUtility";
import services from "../services";
import { notifyError } from "../../../../components/Common/notification";

declare var abp: any;
const SCENES_KEY = "PRODUCT_DETAIL";

interface IFeatureProductComponentProps {
  id: number;
  attribute: FeatureProductAttribute | undefined;
  onChange: (data: FeatureProductReadDto) => void;
}

export default function FeatureProductComponent(props: IFeatureProductComponentProps) {

  const [dataFeature, setDataFeature] = useState<FeatureProductReadDto[]>([]);
  const [attributeOne, setAttributeOne] = useState<FeatureProductAttributeDto[]>([]);
  const [attributeTwo, setAttributeTwo] = useState<FeatureProductAttributeDto[]>([]);
  const [attributeThree, setAttributeThree] = useState<FeatureProductAttributeDto[]>([]);
  const [selectedAttributeOne, setSelectedAttributeOne] = useState<number>(0);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState<number>(0);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState<number>(0);
  useEffect(() => {
    _loadFeature(52);
  }, []);

  const _loadFeature = async (idsp: number) => {
    var rsl = await services.featureProductReadDto(idsp);
    if (rsl.error === false && rsl.result !== undefined) {
      let data = rsl.result;
      data.forEach(s => {
        setAttributeOne(prevState => [...prevState, { id: s.attributeValueOne, value: s.attributeValueOneName }]);
        if (s.attributeValueTwo !== null && s.attributeValueTwoName !== null)
          setAttributeTwo(prevState => [...prevState, { id: s.attributeValueTwo, value: s.attributeValueTwoName }]);
        if (s.attributeValueThree !== null && s.attributeValueThreeName !== null)
          setAttributeThree(prevState => [...prevState, { id: s.attributeValueThree, value: s.attributeValueThreeName }]);
      });
      setDataFeature(data);
    }
    else {
      notifyError("Dữ liệu Lỗi", rsl.messageError);
    };
  }

  useEffect(() => {
    setAttributeOne(attributeOne.filter((a, i) => attributeOne.findIndex((s) => a.id === s.id) === i));
    setAttributeTwo(attributeTwo.filter((a, i) => attributeTwo.findIndex((s) => a.id === s.id) === i));
    setAttributeThree(attributeThree.filter((a, i) => attributeThree.findIndex((s) => a.id === s.id) === i));
    setSelectedAttributeOne(attributeOne[0]?.id ?? 0);
    setSelectedAttributeTwo(attributeTwo[0]?.id ?? 0);
    setSelectedAttributeThree(attributeThree[0]?.id ?? 0);
  }, [dataFeature]);

  const _onCheckAttribute = (level: number, id: number) => {
    if (level === 1) setSelectedAttributeOne(id);
    if (level === 2) setSelectedAttributeTwo(id);
    if (level === 3) setSelectedAttributeThree(id);

  }

  useEffect(() => {
    let item = dataFeature.filter(s =>
      s.attributeValueOne === selectedAttributeOne &&
      s.attributeValueTwo === selectedAttributeTwo &&
      s.attributeValueThree === selectedAttributeThree)
    props.onChange(item[0]);
  }, [selectedAttributeOne, selectedAttributeTwo, selectedAttributeThree]);

  return (
    <>
      <div className="wqPWTPYvMr">
        <p className="fBvRJBvshu">
          <span>&nbsp; {L(props.attribute?.attributeIdOneName ?? "", SCENES_KEY)} : </span>
        </p>
        <div className="ofRgAVTeYl">
          {attributeOne.map(m => {
            return (<div className={selectedAttributeOne === m.id ? "lPibOcgFQi nuTLGkaQio_active" : "lPibOcgFQi"}
              onClick={() => _onCheckAttribute(1, m.id ?? 0)}>
              <img alt="" />
              <span>{m.value}</span>
              <span className="nuTLGkaQio" style={{ display: selectedAttributeOne === m.id ? "block" : "none" }}>
                <CheckOutlined className="SWzJAVZYWg" />
              </span>
            </div>)
          })}
        </div>
      </div>
      <div className="wqPWTPYvMr">
        <p className="fBvRJBvshu">
          <span>&nbsp; {L(props.attribute?.attributeIdTwoName ?? "", SCENES_KEY)} :</span>
        </p>
        <div className="ofRgAVTeYl">
          {attributeTwo.map(m => {
            return (
              <div className={selectedAttributeTwo === m.id ? "lBHJWvVzaH nuTLGkaQio_active" : "lBHJWvVzaH"}
                onClick={() => _onCheckAttribute(2, m.id ?? 0)}
              >
                <span>{m.value}</span>
                <span className="nuTLGkaQio" style={{ display: selectedAttributeTwo === m.id ? "block" : "none" }}>
                  <CheckOutlined className="SWzJAVZYWg" />
                </span>
              </div>)
          })}
        </div>
      </div>
      <div className="wqPWTPYvMr">
        <p className="fBvRJBvshu">
          <span>&nbsp; {L(props.attribute?.attributeIdThreeName ?? "", SCENES_KEY)} :</span>
        </p>
        <div className="ofRgAVTeYl">
          {attributeThree.map(m => {
            return (
              <div className={selectedAttributeThree === m.id ? "lBHJWvVzaH nuTLGkaQio_active" : "lBHJWvVzaH"}
                onClick={() => _onCheckAttribute(3, m.id ?? 0)}
              >
                <span>{m.value}</span>
                <span className="nuTLGkaQio" style={{ display: selectedAttributeThree === m.id ? "block" : "none" }}>
                  <CheckOutlined className="SWzJAVZYWg" />
                </span>
              </div>)
          })}
        </div>
      </div>
    </>
  );
}
