
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../style.css'
import AddItemComponents from './addItemComponents';
import { CategoryInterview, CategorySelectedProps } from '../dataTypes/categoryDtos';
import services from '../services';
import { notifyError } from '../../../../components/Common/notification';

const SCENES_KEY = "CATEGORY_PRODUCT";

interface IAddModalCompoments {
    open: boolean;
    onClose: () => void;
}

export default function AddModalCompoments(props: IAddModalCompoments) {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [interviewContainer, setInterviewContainer] = useState<CategoryInterview[]>([{ id: 0, level: 0 }])
    const [dataSelected, setDataSelected] = useState<CategorySelectedProps[]>([]);

    const _onLoadNextLevel = (value: CategoryInterview) => {
        if (value.level < interviewContainer.length - 1) {
            let temp = interviewContainer.slice(0, value.level + 2);
            temp[temp.length - 1].id = value.id;
            setInterviewContainer(temp);
        }
        else {
            let temp = [
                ...interviewContainer.slice(0, value.level + 1),
                { id: value.id, level: value.level + 1 },
                ...interviewContainer.slice(value.level + 1)
            ];
            setInterviewContainer(temp);
        }
    }

    const _onChangeValueSelected = (value: CategorySelectedProps) => {
        let found = false;
        // update
        for (let i = 0; i < dataSelected.length; i++) {
            if (dataSelected[i].level === value.level) {
                dataSelected[i].ids = value.ids;
                found = true;
                break;
            }
        }

        // insert
        if (found === false) {
            setDataSelected(op => [...op, value]);
        }
    }

    //========== ON OK HANDLE ==========
    const _onOkHandle = async () => {
        let dataSend = dataSelected.map(s => s.ids).flat(1);
        console.log('dataSend', dataSend);
        var rsl = await services.insertOrUpdateCategory(dataSend);
        if (rsl.error === false && rsl.result !== undefined) {
            console.log('rsl.result', rsl.result)
        }
        else {
            notifyError("ERROR", "ERROR");
        }
    }

    // ========== ON CANCEL HANDLE ==========
    const _onCancelHandle = () => {
        setDataSelected([]);
        props.onClose()
    }

    return (
        <>
            <Modal
                className='vLHoKQEDOP'
                maskClosable={false}
                title="SELECT_CATEGORY_FOR_YOU"
                open={props.open}
                onOk={_onOkHandle}
                onCancel={_onCancelHandle}>

                {[...Array(interviewContainer.length).keys()].map((item, index) => {
                    return (<AddItemComponents
                        idCategoryMain={interviewContainer[index].id}
                        level={interviewContainer[index].level}
                        onCheckValue={function (id: number): void {
                            throw new Error('Function not implemented.');
                        }}
                        onLoadNextLevel={(value: CategoryInterview) => _onLoadNextLevel(value)}
                        onSelected={_onChangeValueSelected} />)
                })}
            </Modal>
        </>
    )
}
