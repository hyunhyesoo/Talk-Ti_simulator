// ==========================================
// 🌟 똑띠 전역 마이크 및 음성 명령어 공통 스크립트
// ==========================================

function routeCommand(inputVal) {
    try {
        if (inputVal.trim() === "") {
            alert("명령어를 입력해 주세요!");
            return;
        }

        let text = inputVal.replace(/[.?!~]/g, '').trim();

        // 1) 택시 호출 키워드가 있을 때
        if (text.includes("택시")) {
            let keyword = text.replace(/택시(로|를)?|호출|잡아줘|잡아|불러줘|불러|가고\s*싶어|가고\s*싶다|갈래|가자|가주세요|가줘|안내해줘|알려줘|탈래|타고/g, ' ').trim();
            keyword = keyword.replace(/\s+/g, ' ');
            keyword = keyword.replace(/(으로|로|까지|가는|에)$/g, '').trim();
            keyword = keyword.replace(/(으로|로|까지|가는|에)$/g, '').trim();

            localStorage.setItem('targetKeyword', keyword || '이태원역');
            window.location.href = 'taxi.html';
            return;
        }

        // 2) 길찾기 키워드가 있을 때
        else if (text.match(/(길\s*찾|지도|네비|어떻게\s*가|가는\s*길|길안내|어디야|가고\s*싶|갈래|가자|가주세요|가줘)/)) {
            let keyword = text.replace(/길\s*찾기|길\s*찾아|찾아줘|길찾기|가는\s*길|길|알려줘|어떻게\s*가|가고\s*싶어|가고\s*싶다|갈래|가자|가주세요|가줘|안내해줘|지도|네비|어디야/g, ' ').trim();
            keyword = keyword.replace(/\s+/g, ' ');
            keyword = keyword.replace(/(으로|로|까지|가는|에)$/g, '').trim();
            keyword = keyword.replace(/(으로|로|까지|가는|에)$/g, '').trim();

            localStorage.setItem('targetKeyword', keyword || '서울역');
            window.location.href = 'map.html';
            return;
        }

        // 3) 카카오톡 키워드가 있을 때
        else if (text.match(/(사진|카톡|문자|메시지|메세지|전송)/)) {
            let keyword = text;
            if (keyword.includes("한테")) {
                let arr = keyword.split("한테")[0].trim().split(" ");
                keyword = arr[arr.length - 1];
            } else if (keyword.includes("에게")) {
                let arr = keyword.split("에게")[0].trim().split(" ");
                keyword = arr[arr.length - 1];
            } else if (keyword.includes("께")) {
                let arr = keyword.split("께")[0].trim().split(" ");
                keyword = arr[arr.length - 1];
            } else {
                keyword = keyword.replace(/사진|이미지|카톡|문자|메시지|메세지|보내줘|보내|주세요|전송|빨리|좀/g, ' ').trim();
                keyword = keyword.replace(/\s+/g, ' ');
                let arr = keyword.split(" ");
                keyword = arr[arr.length - 1];
            }
            localStorage.setItem('targetKeyword', keyword || '엄마');
            window.location.href = 'kakaotalk.html';
            return;
        }

        // 4) 키오스크 주문 키워드가 명확히 있을 때 (기존에는 무조건 여기로 빠졌지만, 이제 분리했습니다)
        else if (text.match(/(주문|시켜|먹을래|먹고|마실래|주세요|한\s*잔|두\s*잔|하나|두\s*개|핫|따뜻한|아이스)/)) {
            let menuName = text.replace(/주문할래|주문하고\s*싶어|주문해|주문|시켜줘|먹을래|먹고\s*싶어|마실래|주세요|한\s*잔|두\s*잔|하나|두\s*개|핫|따뜻한|아이스/g, ' ').trim();
            menuName = menuName.replace(/\s+/g, ' ');

            let categoryName = "커피";
            if (menuName.match(/(케이크|케익|쿠키|빵|스콘|마카롱|디저트|베이글|크로플|샌드위치|마들렌|휘낭시에|타르트|와플|크루아상|소금빵|까눌레)/)) categoryName = "디저트";
            else if (menuName.match(/(에이드|탄산|스파클링)/)) categoryName = "에이드";
            else if (menuName.match(/(스무디|주스|쥬스|차|티|프라페|프라푸치노|블렌디드|쉐이크|요거트|밀크티|아이스티|초코|딸기|녹차|말차|고구마|밀크)/)) categoryName = "논커피";

            localStorage.setItem('targetKeyword', menuName || '아메리카노');
            localStorage.setItem('targetCategory', categoryName);
            window.location.href = 'kiosk.html';
            return;
        }

        // 💡 5) 단어만 입력했을 때의 동작 분리
        else {
            let keyword = text.trim();

            // 현재 화면이 처음 입력하는 'input.html'인지 주소를 통해 확인합니다.
            let isFirstInput = window.location.href.includes('input.html');

            if (isFirstInput) {
                // --- [A] 처음 input.html 화면인 경우 (눈치껏 넘기기) ---
                let currentScenario = localStorage.getItem('currentScenario');

                if (currentScenario === 'taxi') {
                    localStorage.setItem('targetKeyword', keyword);
                    window.location.href = 'taxi.html';

                } else if (currentScenario === 'map') {
                    localStorage.setItem('targetKeyword', keyword);
                    window.location.href = 'map.html';

                } else if (currentScenario === 'kakaotalk') {
                    localStorage.setItem('targetKeyword', keyword);
                    window.location.href = 'kakaotalk.html';

                } else if (currentScenario === 'kiosk') {
                    let categoryName = "커피";
                    if (keyword.match(/(케이크|케익|쿠키|빵|스콘|마카롱|디저트|베이글|크로플|샌드위치|마들렌|휘낭시에|타르트|와플|크루아상|소금빵|까눌레)/)) categoryName = "디저트";
                    else if (keyword.match(/(에이드|탄산|스파클링)/)) categoryName = "에이드";
                    else if (keyword.match(/(스무디|주스|쥬스|차|티|프라페|프라푸치노|블렌디드|쉐이크|요거트|밀크티|아이스티|초코|딸기|녹차|말차|고구마|밀크)/)) categoryName = "논커피";

                    localStorage.setItem('targetKeyword', keyword);
                    localStorage.setItem('targetCategory', categoryName);
                    window.location.href = 'kiosk.html';

                } else {
                    showGuideBubble("어떤 작업을 도와드릴까요?<br>명령어를 끝까지 말씀해주세요!");
                }
            } else {
                // --- [B] 다른 화면(taxi, kiosk 등)에서 마이크를 눌렀을 때 ---
                showGuideBubble("명령을 정확하게<br>끝까지 말씀해 주세요!");
            }
        }

    } catch (e) {
        alert("명령어 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        console.error(e);
    }
}


// 2. 마이크 버튼 및 팝업창 자동 생성기
document.addEventListener("DOMContentLoaded", () => {
    // input.html처럼 화면 한가운데에 메인 입력창('command-input')이 있으면
    // 우측 하단에 떠다니는 전역 마이크 팝업을 만들지 않고 그냥 돌아갑니다.
    if (document.getElementById('command-input')) return;

    // CSS 주입
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        .global-mic-btn { position: absolute; bottom: 160px; right: 20px; width: 65px; height: 65px; background: #FF7B30; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 32px; color: white; box-shadow: 0 4px 15px rgba(255,123,48,0.5); cursor: pointer; z-index: 999; border: 4px solid #fff; transition: transform 0.2s; }
        .global-mic-btn:active { transform: scale(0.9); }
        #global-mic-modal { display: none; position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.6); z-index: 1000; justify-content: center; align-items: center; }
        .global-modal-content { background: #fff; width: 85%; border-radius: 20px; padding: 30px; text-align: center; box-sizing: border-box; position: relative; }
    `;
    document.head.appendChild(styleEl);

    // HTML 주입
    const container = document.querySelector('.mobile-container') || document.querySelector('.kiosk-container') || document.body;

    const micBtn = document.createElement('button');
    micBtn.className = 'global-mic-btn';
    micBtn.innerHTML = '🎙️';
    micBtn.onclick = openGlobalMic;

    const modalDiv = document.createElement('div');
    modalDiv.id = 'global-mic-modal';
    modalDiv.innerHTML = `
        <div class="global-modal-content">
            <h3 style="margin-top:0; font-size: 24px; color: #222;">🎙️ 똑띠에게 말하기</h3>
            <p style="color:#666; font-size:15px; margin-bottom:20px; word-break: keep-all;">어느 화면에서든 똑띠에게 새로운 요청을 할 수 있습니다.</p>
            <input type="text" id="global-command-input" style="width:100%; padding: 15px; border-radius:10px; border:2px solid #ddd; font-size:16px; margin-bottom: 20px; text-align: center; box-sizing: border-box;" placeholder="예: 서울역 가는 택시 불러줘">
            <div style="display: flex; gap: 10px;">
                <button style="width: 100%; padding: 18px; background: #ddd; color: #333; font-size: 18px; font-weight: bold; border-radius: 12px; border: none; cursor: pointer; flex: 1;" onclick="closeGlobalMic()">취소</button>
                <button style="width: 100%; padding: 18px; background: #FF7B30; color: white; font-size: 18px; font-weight: bold; border-radius: 12px; border: none; cursor: pointer; flex: 2;" onclick="processGlobalCommand()">요청하기</button>
            </div>
        </div>
    `;
    container.appendChild(micBtn);
    container.appendChild(modalDiv);
});

// 팝업 열기/닫기
function openGlobalMic() {
    document.getElementById('global-mic-modal').style.display = 'flex';
    const inputEl = document.getElementById('global-command-input');
    inputEl.value = '';
    inputEl.focus();
}

function closeGlobalMic() {
    document.getElementById('global-mic-modal').style.display = 'none';
}

// 팝업에서 [요청하기] 눌렀을 때
function processGlobalCommand() {
    const inputVal = document.getElementById('global-command-input').value;
    routeCommand(inputVal);
}

// 💡 화면 중앙 입력창(모달) 바로 아래에 뜨는 똑띠 말풍선 함수
function showGuideBubble(message) {
    let bubble = document.getElementById('common-guide-bubble');
    
    // 말풍선이 화면에 없으면 최초로 한 번 만들어줍니다.
    if (!bubble) {
        bubble = document.createElement('div');
        bubble.id = 'common-guide-bubble';
        
        bubble.style.cssText = "position: fixed; top: 68%; left: 50%; transform: translateX(-50%); background-color: #FF7B30; color: #fff; padding: 18px 28px; border-radius: 20px; font-size: 17px; font-weight: bold; box-shadow: 0 6px 16px rgba(255, 123, 48, 0.35); z-index: 9999; text-align: center; word-break: keep-all; line-height: 1.5; opacity: 0; transition: opacity 0.3s ease-in-out; pointer-events: none; width: max-content; max-width: 85%;";
        
        document.body.appendChild(bubble);
    }

    bubble.innerHTML = message + "<div style=\"content: ''; position: absolute; top: -8px; left: 50%; transform: translateX(-50%); border-width: 0 8px 10px 8px; border-style: solid; border-color: transparent transparent #FF7B30 transparent;\"></div>";
    
    bubble.style.opacity = '1';

    setTimeout(() => {
        bubble.style.opacity = '0';
    }, 3000);
}