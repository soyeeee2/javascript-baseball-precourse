const inputEl = document.querySelector('input');
let ansEl = document.querySelector('.ansEl');

let answer;
setAns();

//랜덤3개 set
//1. 랜덤돌려서 문자열 + (스트링처리)
//2. if 이미 있는 숫자면 다시 랜덤
function setAns() {
    answer = '';
    while (answer.length < 3) {
        let num = Math.floor(Math.random() * 9) + 1;
        if (!answer.includes(num)) {
            answer += num;
        }
    }
    console.log(answer);
}

function onlyNumber(event) {
    const key = event.key;
    // 입력된 키가 숫자인지 또는 백스페이스(Backspace) 키인지 확인
    if (/\d/.test(key) || key === 'Backspace') {
        return true; // 숫자거나 백스페이스면 허용
    } else {
        event.preventDefault(); // 숫자가 아니면 입력 방지
        return false;
    }
}

const handleOnInput = () => {
    // 중복확인
    const value = inputEl.value;
    const idx = value.length - 1;
    if (idx > 0 && value[idx - 1] == value[idx]) {
        inputEl.value = value.slice(0, idx);
        alert('중복 숫자는 허용되지 않습니다.');
    }
}

//compare
//1. 존재하는지 확인 (ball)
//1-1. cnt++ & 위치확인 (strike)
//1-2. 존재하지 않으면 낫싱
const compareValue = (e) => {
    e.preventDefault();

    let strikes = 0, balls = 0;
    for (let i = 0; i < 3; i++) {
        if (inputEl.value[i] === answer[i]) {
            strikes++;
        } else if (answer.includes(inputEl.value[i])) {
            balls++;
        }
    }

    //return element
    if (strikes === 3) {
        ansEl.innerHTML = '<span>정답을 맞추셨습니다!</span><br>게임을 새로 시작하시겠습니까?<br>';
        const resetBtn = document.createElement('button');
        resetBtn.innerText = '게임 재시작';
        resetBtn.setAttribute('onclick', 'resetValue()');
        resetBtn.classList.add('resetBtn');
        ansEl.appendChild(resetBtn);
    } else if (strikes === 0 && balls === 0) {
        ansEl.textContent = '낫싱';
    } else {
        ansEl.textContent = `${strikes} 스트라이크, ${balls} 볼`;
    }
}

//reset
const resetValue = () => {
    inputEl.value = '';
    ansEl.innerHTML = '';
}
