import React, { useState, useMemo } from 'react';

const getAverage = (numbers) => {
    console.log('평균값 계산 중..');
    if (numbers.length === 0) return 0;
    // reduce, 내장함수, -> 이전값을 받아서, 행위를 해서, 새로운 값을 누적해서 반환. 
    // reduce(콜백함수, 초깃값)
    const sum = numbers.reduce((a, b) => a + b, 0); // 초기값 0 추가
    return sum / numbers.length;
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    // 실습 1-1, 숫자인 경우만 업데이트 해보기. 
    const onChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value.trim() !== "") {
            console.log("숫자인 경우만, onChange")
            setNumber(value);
        }
        // console.log("숫자가 아닌 경우만, onChange")
        // setNumber(e.target.value);
    };

    // 실습 1-2, 공백 입력시 유효성 체크. 
    const onInsert = () => {
        // parseInt(number, 10), number 문자열로 된 숫자, 숫자 타입 변경, 
        // 진법 10 진법 표기. 
        // 유효성 체크 
        const parsedNumber = parseInt(number, 10);
        if (isNaN(parsedNumber) && parsedNumber < 0) {
            setNumber('');
            // inputEl.current.focus();
            return;
        }

        const nextList = list.concat(parseInt(number, 10));
        setList(nextList);
        setNumber('');
    };

    // useMemo, 추가, 기존 평균 구하는 함수를 메모 이용하기. 
    const avg = useMemo(() => getAverage(list), [list]);
    // 실습 2, 사용하기전, 콘솔 확인 해보기. 
    // 숫자 입력 중에도, 불필요한 연산을 계속함. 
    // const avg = getAverage(list);
    return (
        <div>
            <input value={number} onChange={onChange} placeholder="숫자를 입력하세요" />
            <button onClick={onInsert}>추가</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                {/* <b>평균값:</b> {getAverage(list)} */}
                <b>평균값:</b> {avg}
            </div>
        </div>
    );
};

export default Average;