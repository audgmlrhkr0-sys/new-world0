// 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 전체화면 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 이미지 로드
const images = {
    character: new Image(),
    tree1: new Image(),
    tree2: new Image(),
    tile: new Image(), // 바닥 타일
    tileStage2: new Image(), // Stage 2 배경 타일
    pond: new Image(),  // 연못
    stone4: new Image(), // 돌 장식물 4
    stone3: new Image(),  // 돌 장식물 3
    stone2: new Image(),  // 돌 장식물 2 (좌측 상단)
    treeTop: new Image(), // tree_1.png (우측 상단 큰 나무)
    door: new Image(), // 출구 문
    bodyPart1: new Image(), // 심장
    bodyPart2: new Image(), // 갈비뼈 좌
    bodyPart6: new Image(), // 두개골
    bodyPart8: new Image(), // 골반뼈
    bodyPart12: new Image(), // 갈비뼈 우
    bodyPart13: new Image(),  // 뇌
    letter: new Image() // 쪽지/봉투
};

let imagesLoaded = 0;
const totalImages = 18;

function checkAllImagesLoaded() {
    imagesLoaded++;
    console.log(`이미지 로드 중... ${imagesLoaded}/${totalImages}`);
    if (imagesLoaded === totalImages) {
        console.log('모든 이미지 로드 완료!');
        randomizeItemPositions(); // 출구와 신체부위 랜덤 배치
        updatePositions(); // 연못과 출구 위치 자동 찾기
        gameLoop();
    }
}

// 이미지 파일 로드
images.character.onload = checkAllImagesLoaded;
images.character.onerror = () => {
    console.error('캐릭터 이미지를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.character.src = 'characterr.png';

images.tree1.onload = checkAllImagesLoaded;
images.tree1.onerror = () => {
    console.error('tree1.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.tree1.src = 'tree1.png';

images.tree2.onload = checkAllImagesLoaded;
images.tree2.onerror = () => {
    console.error('tree2.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.tree2.src = 'tree2.png';

images.tile.onload = checkAllImagesLoaded;
images.tile.onerror = () => {
    console.error('tile.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.tile.src = 'tile.png';

images.tileStage2.onload = checkAllImagesLoaded;
images.tileStage2.onerror = () => {
    console.error('tile_stage2.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.tileStage2.src = 'tile_stage2.png';

images.pond.onload = checkAllImagesLoaded;
images.pond.onerror = () => {
    console.error('pond.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.pond.src = 'pond.png';

images.stone4.onload = checkAllImagesLoaded;
images.stone4.onerror = () => {
    console.error('stone_4.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.stone4.src = 'stone_4.png';

images.stone3.onload = checkAllImagesLoaded;
images.stone3.onerror = () => {
    console.error('stone_3.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.stone3.src = 'stone_3.png';

images.stone2.onload = checkAllImagesLoaded;
images.stone2.onerror = () => {
    console.error('stone_2.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.stone2.src = 'stone_2.png';

images.treeTop.onload = checkAllImagesLoaded;
images.treeTop.onerror = () => {
    console.error('tree_1.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.treeTop.src = 'tree_1.png';

images.door.onload = checkAllImagesLoaded;
images.door.onerror = () => {
    console.error('door.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.door.src = 'door.png';

images.bodyPart1.onload = checkAllImagesLoaded;
images.bodyPart1.onerror = () => {
    console.error('1.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart1.src = '1.png';

images.bodyPart2.onload = checkAllImagesLoaded;
images.bodyPart2.onerror = () => {
    console.error('2.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart2.src = '2.png';

images.bodyPart6.onload = checkAllImagesLoaded;
images.bodyPart6.onerror = () => {
    console.error('6.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart6.src = '6.png';

images.bodyPart8.onload = checkAllImagesLoaded;
images.bodyPart8.onerror = () => {
    console.error('8.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart8.src = '8.png';

images.bodyPart12.onload = checkAllImagesLoaded;
images.bodyPart12.onerror = () => {
    console.error('12.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart12.src = '12.png';

images.bodyPart13.onload = checkAllImagesLoaded;
images.bodyPart13.onerror = () => {
    console.error('13.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.bodyPart13.src = '13.png';

images.letter.onload = checkAllImagesLoaded;
images.letter.onerror = () => {
    console.error('letter.png를 불러올 수 없습니다.');
    checkAllImagesLoaded();
};
images.letter.src = 'letter.png';

// 타일 크기 (확대)
const TILE_SIZE = 64;
const PIXEL_UNIT = 2;
const MAX_BODY_PARTS = 6;

// 자유로운 픽셀 좌표로 배치된 나무들
const trees = [
    {x: 100, y: 80, type: 1},
    {x: 250, y: 120, type: 2},
    {x: 420, y: 100, type: 1},
    {x: 180, y: 200, type: 2},
    {x: 380, y: 210, type: 1},
    {x: 90, y: 320, type: 2},
    {x: 280, y: 340, type: 1},
    {x: 450, y: 300, type: 2},
    {x: 150, y: 450, type: 1},
    {x: 350, y: 480, type: 2},
    {x: 520, y: 420, type: 1},
    {x: 200, y: 580, type: 2},
    {x: 400, y: 550, type: 1},
    {x: 100, y: 680, type: 2},
    {x: 300, y: 720, type: 1},
    {x: 500, y: 680, type: 2}
];

// 카메라 객체
const camera = {
    x: 0,
    y: 0
};

// 게임 변수
let hasKey = false;
let bodyParts = 0; // 신체 부위 수집 (MAX_BODY_PARTS개 필요)
let currentStage = 1;
let isDead = false;
let gameWon = false;
let deathAnimation = false;
let deathPhase = 0; // 0: 없음, 1: 페이드인, 2: 메시지, 3: 페이드아웃
let fadeAlpha = 0;
let fadeDirection = 1; // 1: fade out, -1: fade in
let deathMessageShown = false;

// 쪽지 완료 페이드 애니메이션
let letterCompleteAnimation = false;
let letterFadePhase = 0; // 0: 없음, 1: 페이드인, 2: 대기, 3: 페이드아웃
let letterFadeAlpha = 0;
let letterFadeWaitStart = 0; // 대기 시작 시간

// 신체 부위 목록
const BODY_PART_NAMES = ['심장', '두개골', '뇌', '갈비뼈(좌)', '갈비뼈(우)', '골반뼈'];
const BODY_PART_TYPES = {
    HEART: 50,      // 심장
    SKULL: 51,      // 두개골
    BRAIN: 52,      // 뇌
    RIB_LEFT: 53,   // 갈비뼈(좌)
    RIB_RIGHT: 54,  // 갈비뼈(우)
    PELVIS: 55      // 골반뼈
};
let collectedParts = []; // 수집한 신체 부위 이름들

// 대화 시스템
let dialogActive = false;
let dialogText = '';
let dialogDisplayText = '';
let dialogCharIndex = 0;
let dialogSpeed = 50; // 타이핑 속도 (ms)
let lastTypeTime = 0;
let dialogComplete = false;
let showChoices = false;
let choices = [];
let selectedChoice = 0;
let dialogState = 'initial'; // initial, watching, touching, end

// 플레이어 객체
const player = {
    x: 3,
    y: 2,
    speed: 1,
    moving: false,
    direction: 'down',
    animFrame: 0,
    animTimer: 0,
    // 횡스크롤용 속성
    vx: 0, // x축 속도
    maxSpeed: 2 // 최대 이동 속도 (느리게)
};

// 키 입력 상태
const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// 게임패드 상태
let gamepad = null;
let lastGamepadButtons = {};

// 게임패드 연결 감지
window.addEventListener('gamepadconnected', (e) => {
    console.log('게임패드 연결됨:', e.gamepad.id);
    gamepad = e.gamepad;
});

window.addEventListener('gamepaddisconnected', (e) => {
    console.log('게임패드 연결 해제됨');
    gamepad = null;
});

function softenStageEdges(layout) {
    return layout.map((row, rowIdx) =>
        row.map((tile, colIdx) => {
            const isBorder =
                rowIdx === 0 ||
                rowIdx === layout.length - 1 ||
                colIdx === 0 ||
                colIdx === row.length - 1;
            if (isBorder && tile === 1) {
                return 2;
            }
            return tile;
        })
    );
}

// 스테이지 1 맵 (0: 돌길, 1: 덤불벽, 2: 풀밭, 3: 연못, 4: 나무, 7: stone_4, 8: stone_3, 9: tree_1, 10: stone_2)
// 출구(6)와 신체부위(50-55)는 게임 시작 시 랜덤 배치됨
// 맵 타일: 0=돌길, 1=덤불, 2=풀밭, 3=연못(고정), 4=나무, 7=stone_4(고정), 8=stone_3(고정), 9=tree_1(고정, 우측상단), 10=stone_2(고정, 좌측상단)
const stage1Base = softenStageEdges([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 2, 2, 2, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 2, 2, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 2, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7]
]);

// 실제 게임에서 사용하는 맵 (랜덤 아이템이 배치됨)
let stage1 = JSON.parse(JSON.stringify(stage1Base));

// 스테이지 2 맵
// Stage 2: 횡스크롤 플랫포머 맵
// 맵 너비 (타일 단위)
const STAGE2_WIDTH = 100;
const STAGE2_GROUND_Y = 0; // 바닥 높이 (타일 단위, 아래에서부터)

// Stage 2 플랫폼 데이터 (x, y, width - 타일 단위)
// y는 바닥에서부터의 높이 (0 = 바닥)
const stage2Platforms = [
    {x: 0, y: STAGE2_GROUND_Y, width: STAGE2_WIDTH} // 바닥만
];

// Stage 2 쪽지/봉투 데이터 (x는 픽셀 단위)
const stage2Letters = [
    {x: 500, collected: false, message: '첫 번째 쪽지를 발견했다...'},
    {x: 1500, collected: false, message: '두 번째 쪽지에는 무언가 적혀있다.'},
    {x: 2800, collected: false, message: '세 번째 쪽지가 바람에 흔들리고 있다.'},
    {x: 4200, collected: false, message: '마지막 쪽지를 주웠다.'}
];

const stage2 = []; // Stage 2는 플랫폼 기반으로 처리

let maze = stage1;
let ROWS = maze.length;
let COLS = maze[0].length;

// 출구와 신체부위를 랜덤 배치하는 함수
function randomizeItemPositions() {
    // 먼저 stage1Base를 복사
    stage1 = JSON.parse(JSON.stringify(stage1Base));
    
    // 연못 위치 찾기
    let pondRow = -1, pondCol = -1;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (stage1[row][col] === 3) {
                pondRow = row;
                pondCol = col;
                break;
            }
        }
        if (pondRow !== -1) break;
    }
    
    // 배치 가능한 타일(0) 위치 수집
    const availablePositions = [];
    const farPositions = []; // 연못과 멀리 떨어진 위치
    
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (stage1[row][col] === 0) {
                const pos = { row, col };
                availablePositions.push(pos);
                
                // 연못과의 거리 계산 (유클리드 거리)
                if (pondRow !== -1) {
                    const distance = Math.sqrt(
                        Math.pow(row - pondRow, 2) + Math.pow(col - pondCol, 2)
                    );
                    // 10타일 이상 떨어진 곳만 출구 후보로
                    if (distance >= 10) {
                        farPositions.push(pos);
                    }
                }
            }
        }
    }
    
    // 출구는 연못의 윗쪽(위 타일)에 고정 배치 - 더 위로!
    if (pondRow !== -1 && pondCol !== -1) {
        // 연못에서 5칸 위 타일에 출구 배치
        const exitRow = pondRow - 5;
        const exitCol = pondCol;
        if (exitRow >= 0 && stage1[exitRow][exitCol] === 0) {
            stage1[exitRow][exitCol] = 6;
        }
    }
    
    // 신체부위 6개 배치 (50=심장, 51=두개골, 52=뇌, 53=갈비뼈좌, 54=갈비뼈우, 55=골반뼈)
    // 서로 최소 거리 이상 떨어지도록 배치
    const bodyParts = [50, 51, 52, 53, 54, 55];
    const placedItems = []; // 배치된 아이템 위치들
    const minDistance = 6; // 최소 거리 (타일 단위)
    
    // 출구 위치도 추가 (아이템들이 출구와도 떨어지도록)
    if (pondRow !== -1) {
        placedItems.push({ row: pondRow - 5, col: pondCol });
    }
    
    for (let i = 0; i < bodyParts.length; i++) {
        let attempts = 0;
        const maxAttempts = 100; // 최대 시도 횟수
        let placed = false;
        
        // 랜덤하게 섞기
        for (let j = availablePositions.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [availablePositions[j], availablePositions[k]] = [availablePositions[k], availablePositions[j]];
        }
        
        // 거리 조건을 만족하는 위치 찾기
        for (let posIndex = 0; posIndex < availablePositions.length && attempts < maxAttempts; posIndex++) {
            const candidate = availablePositions[posIndex];
            let tooClose = false;
            
            // 이미 배치된 아이템들과의 거리 체크
            for (const placedPos of placedItems) {
                const distance = Math.sqrt(
                    Math.pow(candidate.row - placedPos.row, 2) + 
                    Math.pow(candidate.col - placedPos.col, 2)
                );
                
                if (distance < minDistance) {
                    tooClose = true;
                    break;
                }
            }
            
            // 충분히 떨어져 있으면 배치
            if (!tooClose) {
                stage1[candidate.row][candidate.col] = bodyParts[i];
                placedItems.push(candidate);
                // 사용한 위치 제거
                availablePositions.splice(posIndex, 1);
                placed = true;
                break;
            }
            
            attempts++;
        }
        
        // 조건을 만족하는 위치를 못 찾으면 그냥 랜덤 배치
        if (!placed && availablePositions.length > 0) {
            const pos = availablePositions.pop();
            stage1[pos.row][pos.col] = bodyParts[i];
            placedItems.push(pos);
        }
    }
    
    // maze 업데이트
    maze = stage1;
}

// 연못과 출구 위치 찾기 함수
function findTilePosition(tileType) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (maze[row][col] === tileType) {
                return { x: col, y: row };
            }
        }
    }
    return null;
}

// 연못 위치 (스테이지마다 다름)
let pondX = 15;
let pondY = 14;

// 출구 위치
let exitX = 27;
let exitY = 23;

// 맵 로드 시 연못과 출구 위치 업데이트
function updatePositions() {
    const pondPos = findTilePosition(3);
    if (pondPos) {
        pondX = pondPos.x;
        pondY = pondPos.y;
    }
    const exitPos = findTilePosition(6);
    if (exitPos) {
        exitX = exitPos.x;
        exitY = exitPos.y;
    }
}

// 초기 위치 설정
updatePositions();

// 키보드 이벤트 리스너
document.addEventListener('keydown', (e) => {
    if (gameWon) return;
    
    // 죽음 애니메이션 중 (페이드인 단계)에는 입력 무시
    if (deathAnimation && deathPhase === 1) return;
    
    // 대화중일 때
    if (dialogActive) {
        if (e.code === 'Enter' || e.code === 'Space' || e.code === 'KeyZ') {
            e.preventDefault();
            handleDialogInput();
        } else if (showChoices) {
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                selectedChoice = Math.max(0, selectedChoice - 1);
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                selectedChoice = Math.min(choices.length - 1, selectedChoice + 1);
            }
        }
        return;
    }
    
    // 방향키 설정 (길게 누르면 계속 이동)
    if (e.code === 'ArrowUp') {
        keys.up = true;
        e.preventDefault();
    } else if (e.code === 'ArrowDown') {
        keys.down = true;
        e.preventDefault();
    } else if (e.code === 'ArrowLeft') {
        keys.left = true;
        e.preventDefault();
    } else if (e.code === 'ArrowRight') {
        keys.right = true;
        e.preventDefault();
    }
    
    // 스페이스바, 엔터, Z키 (상호작용 키)
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyZ') {
        e.preventDefault();
        
        // Stage 2: 쪽지 수집 시도
        if (currentStage === 2) {
            checkLetterCollection();
        }
        // Stage 1: 문 근처면 출구 체크
        else if (isNearExit()) {
            checkExit();
        }
        // 연못 근처면 연못 대화
        else if (isNearPond() || isOnPond()) {
            startPondDialog();
        }
        // 아니면 아이템 수집 시도
        else {
            collectBodyPart(player.x, player.y);
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (dialogActive) return;
    
    if (e.code === 'ArrowUp') keys.up = false;
    if (e.code === 'ArrowDown') keys.down = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowRight') keys.right = false;
});

// 충돌 체크 함수
function canMove(x, y) {
    // Stage 2에서는 사용 안 함
    if (currentStage === 2) return true;
    
    // maze 배열 안전 체크
    if (!maze || !Array.isArray(maze)) return false;
    
    // 인덱스가 정수인지 확인
    const tileX = Math.floor(x);
    const tileY = Math.floor(y);
    
    if (tileX < 0 || tileX >= COLS || tileY < 0 || tileY >= ROWS) return false;
    if (!maze[tileY] || maze[tileY][tileX] === undefined) return false;
    
    const tile = maze[tileY][tileX];
    
    // 덤불(1), 연못(3), stone_4(7), stone_3(8) 통과 불가
    // tree_1(9), stone_2(10)는 통과 가능 (캐릭터가 올라갈 수 있음)
    return tile !== 1 && tile !== 3 && tile !== 7 && tile !== 8;
}

// 신체 부위 수집
function collectBodyPart(x, y) {
    // Stage 2에서는 아이템 수집 없음
    if (currentStage === 2) return;
    
    // maze 배열 안전 체크
    if (!maze || !Array.isArray(maze)) return;
    
    // 인덱스가 정수인지 확인 (타일 좌표여야 함)
    const tileX = Math.floor(x);
    const tileY = Math.floor(y);
    
    if (tileY < 0 || tileY >= maze.length || !maze[tileY]) return;
    if (tileX < 0 || tileX >= maze[tileY].length) return;
    
    const tile = maze[tileY][tileX];
    
    // 신체 부위 타일 체크 (50-55)
    if (tile >= 50 && tile <= 55) {
        maze[tileY][tileX] = 0; // 타일을 돌길로 변경
        bodyParts++;
        
        // 신체 부위 이름 결정
        let partName = '';
        switch(tile) {
            case 50: partName = '심장'; break;
            case 51: partName = '두개골'; break;
            case 52: partName = '뇌'; break;
            case 53: partName = '갈비뼈(좌)'; break;
            case 54: partName = '갈비뼈(우)'; break;
            case 55: partName = '골반뼈'; break;
        }
        
        // 수집한 부위 기록
        collectedParts.push(partName);
        
        // 메시지 표시
        dialogActive = true;
        dialogState = 'bodypart';
        dialogComplete = false;
        showChoices = false;
        setDialogText(`'${partName}'을(를) 획득했다. (${bodyParts}/${MAX_BODY_PARTS})`);
    }
}

// 출구 체크 (A 버튼으로 호출됨)
function checkExit() {
    console.log('checkExit() 호출됨', {
        isNearExit: isNearExit(),
        hasKey: hasKey,
        playerPos: {x: player.x, y: player.y},
        exitPos: {x: exitX, y: exitY}
    });
    
    // 출구 근처에 있는지 확인
    if (!isNearExit()) {
        console.log('문 근처가 아님 - checkExit() 종료');
        return;
    }
    
    if (!hasKey) {
        console.log('열쇠 없음 - 죽음 시작');
        // 열쇠 없이 출구 시도 -> 죽음
        isDead = true;
        deathAnimation = true;
        deathPhase = 1; // 페이드인 시작
        fadeAlpha = 0;
        fadeDirection = 1; // fade out 시작
        deathMessageShown = false;
        dialogActive = false; // 일단 대화창 끄기
    } else {
        console.log('열쇠 있음 - 다음 스테이지로');
        // 다음 스테이지로
        goToNextStage();
    }
}

// 연못 근처인지 체크
function isNearPond() {
    // Stage 2에서는 연못 없음
    if (currentStage === 2) return false;
    
    if (!maze || !maze[player.y] || maze[player.y][player.x] === undefined) return false;
    
    const dx = Math.abs(player.x - pondX);
    const dy = Math.abs(player.y - pondY);
    // 연못 주변 1-2타일에서 상호작용 가능
    return dx <= 2 && dy <= 2 && maze[player.y][player.x] !== 3;
}

// 연못에 있는지 체크
function isOnPond() {
    // Stage 2에서는 연못 없음
    if (currentStage === 2) return false;
    
    if (!maze || !maze[player.y] || maze[player.y][player.x] === undefined) return false;
    
    return maze[player.y][player.x] === 3;
}

// 출구(문) 근처인지 체크
function isNearExit() {
    // Stage 2에서는 출구 없음 (일단)
    if (currentStage === 2) return false;
    
    // 문 타일 위에 있는지 확인
    if (!maze || !maze[player.y] || maze[player.y][player.x] === undefined) return false;
    
    const currentTile = maze[player.y][player.x];
    if (currentTile === 6) {
        console.log('isNearExit: 문 타일 위에 있음', {x: player.x, y: player.y, tile: currentTile});
        return true;
    }
    // 문 주변 1타일에서 상호작용 가능
    if (exitX === -1 || exitY === -1) {
        console.log('isNearExit: exitX 또는 exitY가 -1', {exitX, exitY});
        return false;
    }
    const dx = Math.abs(player.x - exitX);
    const dy = Math.abs(player.y - exitY);
    const isNear = dx <= 1 && dy <= 1;
    console.log('isNearExit: 거리 체크', {
        playerPos: {x: player.x, y: player.y},
        exitPos: {x: exitX, y: exitY},
        dx, dy,
        isNear
    });
    return isNear;
}

// 연못 대화 시작
function startPondDialog() {
    if (hasKey) {
        // 이미 열쇠 획득
        dialogActive = true;
        dialogState = 'haskey';
        dialogComplete = false;
        showChoices = false;
        setDialogText('이미 열쇠를 획득했다.');
        return;
    }
    
    dialogActive = true;
    dialogState = 'initial';
    dialogComplete = false;
    showChoices = false;
    setDialogText('.. 연못이 일렁이고 있다.');
}

// 다음 스테이지로
function goToNextStage() {
    currentStage++;
    
    if (currentStage === 2) {
        // 스테이지 2로 (횡스크롤 플랫포머)
        player.x = 2; // 시작 x 위치 (타일 단위)
        const charHeight = TILE_SIZE * 2.64;
        player.y = canvas.height - charHeight - TILE_SIZE; // 바닥 y 위치 (픽셀 단위)
        player.vx = 0; // 속도 초기화
        hasKey = false;
        bodyParts = 0;
        collectedParts = []; // 수집한 신체 부위 초기화
        
        // 쪽지 초기화
        for (let letter of stage2Letters) {
            letter.collected = false;
        }
        
        // 안내 메시지 없이 바로 시작
        dialogActive = false;
        dialogState = 'initial';
        dialogComplete = false;
        showChoices = false;
    } else {
        // 게임 클리어
        gameWon = true;
        dialogActive = true;
        dialogState = 'clear';
        dialogComplete = false;
        showChoices = false;
        setDialogText('축하합니다! 게임을 클리어했습니다!');
    }
}

// 대화 텍스트 설정
function setDialogText(text) {
    dialogText = text;
    dialogDisplayText = '';
    dialogCharIndex = 0;
    dialogComplete = false;
}

// 대화 입력 처리
function handleDialogInput() {
    console.log('handleDialogInput 호출됨', 'dialogState:', dialogState, 'dialogComplete:', dialogComplete);
    
    // 죽음 상태 - 메시지 확인 후 진행
    if (dialogState === 'death') {
        console.log('죽음 상태 처리', 'dialogComplete:', dialogComplete);
        // 타이핑 중이면 완료시키기
        if (!dialogComplete) {
            console.log('타이핑 완료시키기');
            dialogDisplayText = dialogText;
            dialogCharIndex = dialogText.length;
            dialogComplete = true;
            return;
        }
        // 타이핑 완료 후 버튼을 누르면 진행
        if (dialogComplete) {
            console.log('죽음 메시지 확인 완료 - dialogComplete는 true 유지');
            // updateDeathAnimation()에서 이 상태를 감지하고 게임 리셋
            return;
        }
    }
    
    // 타이핑 중이면 스킵
    if (!dialogComplete) {
        dialogDisplayText = dialogText;
        dialogCharIndex = dialogText.length;
        dialogComplete = true;
        return;
    }
    
    // 선택지가 보이는 상태
    if (showChoices) {
        handleChoice(selectedChoice);
        return;
    }
    
    // 다음 대화 진행
    if (dialogState === 'initial') {
        showChoices = true;
        selectedChoice = 0;
        choices = [
            '유심히 바라본다.',
            '손을 담가본다.',
            '그만둔다.'
        ];
    } else if (dialogState === 'watching1') {
        dialogState = 'watching2';
        setDialogText('아무 일도 일어나지 않는다.');
    } else if (dialogState === 'watching2') {
        dialogActive = false;
        dialogState = 'initial';
    } else if (dialogState === 'touched1') {
        dialogState = 'touched2';
        setDialogText('열쇠를 획득했다!');
    } else if (dialogState === 'touched2') {
        dialogState = 'touched3';
        setDialogText('어디선가 문이 열리는 소리가 났다.');
        hasKey = true;
    } else if (dialogState === 'touched3') {
        dialogActive = false;
        dialogState = 'initial';
    } else if (dialogState === 'cancel' || dialogState === 'bodypart' || dialogState === 'haskey' || dialogState === 'stage2' || dialogState === 'clear') {
        dialogActive = false;
        dialogState = 'initial';
    } else if (dialogState === 'letter') {
        // 쪽지 대화창 닫기
        dialogActive = false;
        dialogState = 'initial';
        
        // 모든 쪽지를 수집했는지 확인
        const allCollected = stage2Letters.every(letter => letter.collected);
        if (allCollected) {
            // 마지막 쪽지 - 페이드 애니메이션 시작
            letterCompleteAnimation = true;
            letterFadePhase = 1; // 페이드인 시작
            letterFadeAlpha = 0;
        }
    }
}

// 선택지 처리
function handleChoice(choice) {
    showChoices = false;
    
    if (choice === 0) {
        // 유심히 바라본다
        dialogState = 'watching1';
        setDialogText('. . .');
    } else if (choice === 1) {
        // 손을 담가본다
        dialogState = 'touched1';
        setDialogText('. . .');
    } else if (choice === 2) {
        // 그만둔다
        dialogState = 'cancel';
        dialogActive = false;
    }
}

// 플레이어 업데이트
let lastMoveTime = 0;
const moveDelay = 150; // 이동 간격 (ms)

// 게임패드 입력 처리
function updateGamepad() {
    if (!gamepad) {
        // 게임패드 재확인
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                gamepad = gamepads[i];
                break;
            }
        }
        if (!gamepad) return;
    }
    
    // 게임패드 상태 갱신
    const gp = navigator.getGamepads()[gamepad.index];
    if (!gp) return;
    
    const threshold = 0.5;
    
    // Start 버튼 (버튼 9): 게임 리셋 (언제든지 작동)
    const startPressed = gp.buttons[9]?.pressed;
    if (startPressed && !lastGamepadButtons['start']) {
        console.log('Start 버튼 눌림 - 게임 리셋');
        resetGame();
        return; // 리셋 후 다른 입력 처리 안 함
    }
    lastGamepadButtons['start'] = startPressed;
    
    // 죽음 애니메이션 중에는 Phase 2가 아닐 때만 다른 게임패드 입력 무시
    // Phase 2 (메시지 표시 중)일 때는 대화 입력 처리 가능
    if (deathAnimation && deathPhase !== 2) {
        // Phase 1 (페이드인) 중에는 입력 무시
        return;
    }
    
    // 대화 중일 때
    if (dialogActive) {
        // 선택지에서 위/아래 이동
        if (showChoices) {
            if ((gp.buttons[12]?.pressed || gp.axes[1] < -threshold) && !lastGamepadButtons['up']) {
                selectedChoice = Math.max(0, selectedChoice - 1);
            }
            lastGamepadButtons['up'] = gp.buttons[12]?.pressed || gp.axes[1] < -threshold;
            
            if ((gp.buttons[13]?.pressed || gp.axes[1] > threshold) && !lastGamepadButtons['down']) {
                selectedChoice = Math.min(choices.length - 1, selectedChoice + 1);
            }
            lastGamepadButtons['down'] = gp.buttons[13]?.pressed || gp.axes[1] > threshold;
        }
        
        // A버튼 또는 B버튼: 대화 진행/선택 확정 (엔터/스페이스 역할)
        // 버튼 0 = A, 버튼 1 = B
        const button0Pressed = gp.buttons[0]?.pressed;
        const button1Pressed = gp.buttons[1]?.pressed;
        const aOrBPressed = button0Pressed || button1Pressed;
        
        // 디버깅: 버튼 상태 확인
        if (aOrBPressed && !lastGamepadButtons['confirm']) {
            console.log('A/B 버튼 눌림!', {
                button0: button0Pressed,
                button1: button1Pressed,
                dialogState: dialogState,
                dialogComplete: dialogComplete,
                deathPhase: deathPhase,
                deathAnimation: deathAnimation
            });
        }
        
        if (aOrBPressed && !lastGamepadButtons['confirm']) {
            handleDialogInput();
        }
        lastGamepadButtons['confirm'] = aOrBPressed;
        
    } else {
        // 대화 중이 아닐 때 - 일반 게임 플레이
        // 방향 입력 (D-Pad 또는 왼쪽 스틱)
        keys.up = gp.buttons[12]?.pressed || gp.axes[1] < -threshold;
        keys.down = gp.buttons[13]?.pressed || gp.axes[1] > threshold;
        keys.left = gp.buttons[14]?.pressed || gp.axes[0] < -threshold;
        keys.right = gp.buttons[15]?.pressed || gp.axes[0] > threshold;
        
        // A버튼 또는 B버튼: 상호작용 (문/연못 대화/아이템 수집)
        // 버튼 0 = A, 버튼 1 = B
        const aOrBPressed = gp.buttons[0]?.pressed || gp.buttons[1]?.pressed;
        if (aOrBPressed && !lastGamepadButtons['confirm']) {
            console.log('게임패드 A/B 버튼 눌림', {
                playerPos: {x: player.x, y: player.y},
                exitPos: {x: exitX, y: exitY},
                currentTile: (currentStage === 2 || !maze || !maze[player.y]) ? 'N/A (Stage 2)' : maze[player.y][player.x],
                isNearExit: isNearExit(),
                isNearPond: isNearPond() || isOnPond()
            });
            
            // Stage 2: 쪽지 수집 시도
            if (currentStage === 2) {
                checkLetterCollection();
            }
            // Stage 1: 문 근처면 출구 체크
            else if (isNearExit()) {
                console.log('문 근처 감지 - checkExit() 호출');
                checkExit();
            }
            // 연못 근처면 연못 대화
            else if (isNearPond() || isOnPond()) {
                startPondDialog();
            }
            // 아니면 아이템 수집 시도
            else {
                collectBodyPart(player.x, player.y);
            }
        }
        lastGamepadButtons['confirm'] = aOrBPressed;
    }
}

function updatePlayer() {
    if (gameWon || dialogActive || deathAnimation || letterCompleteAnimation) return;
    
    // Stage 2: 횡스크롤 플랫포머
    if (currentStage === 2) {
        updatePlayerPlatformer();
        return;
    }
    
    // Stage 1: 기존 탑다운 방식
    const now = Date.now();
    if (now - lastMoveTime < moveDelay) return;
    
    let newX = player.x;
    let newY = player.y;
    let moved = false;

    // 방향키 눌린 상태 체크 (우선순위: 마지막 누른 키)
    if (keys.up && !keys.down && !keys.left && !keys.right) {
        newY--;
        player.direction = 'up';
        moved = true;
    } else if (keys.down && !keys.up && !keys.left && !keys.right) {
        newY++;
        player.direction = 'down';
        moved = true;
    } else if (keys.left && !keys.up && !keys.down && !keys.right) {
        newX--;
        player.direction = 'left';
        moved = true;
    } else if (keys.right && !keys.up && !keys.down && !keys.left) {
        newX++;
        player.direction = 'right';
        moved = true;
    }

    if (moved) {
        if (canMove(newX, newY)) {
            player.x = newX;
            player.y = newY;
            player.moving = true;
            player.animFrame++;
            lastMoveTime = now;
            
            // 출구 체크는 A 버튼으로만 처리 (자동 체크 제거)
        }
    } else {
        player.moving = false;
    }
}

// Stage 2: 횡스크롤 플랫포머 플레이어 업데이트 (타일 단위 이동)
function updatePlayerPlatformer() {
    const now = Date.now();
    if (now - lastMoveTime < moveDelay) return;
    
    let newX = player.x;
    let moved = false;
    
    // 좌우 이동 (타일 단위, Stage 1처럼)
    if (keys.left) {
        newX--;
        player.direction = 'left';
        moved = true;
    } else if (keys.right) {
        newX++;
        player.direction = 'right';
        moved = true;
    }
    
    if (moved) {
        // 맵 경계 체크
        if (newX < 0) newX = 0;
        if (newX >= STAGE2_WIDTH) newX = STAGE2_WIDTH - 1;
        
        player.x = newX;
        player.moving = true;
        player.animFrame++;
        lastMoveTime = now;
        
        // 쪽지 수집은 A키로만 가능 (자동 수집 제거)
    } else {
        player.moving = false;
    }
    
    // y축은 바닥에 고정 (화면 하단에서 캐릭터 높이만큼 위)
    const charHeight = TILE_SIZE * 2.64;
    player.y = canvas.height - charHeight - TILE_SIZE; // 바닥 위에 서 있도록
}

// Stage 2 쪽지 수집 체크
function checkLetterCollection() {
    const playerPixelX = player.x * TILE_SIZE;
    const collectRange = TILE_SIZE * 2; // 수집 범위 (A키로도 수집 가능하도록 넓게)
    
    for (let letter of stage2Letters) {
        if (!letter.collected) {
            const distance = Math.abs(playerPixelX - letter.x);
            if (distance < collectRange) {
                letter.collected = true;
                // 메시지 표시
                dialogActive = true;
                dialogState = 'letter';
                dialogComplete = false;
                showChoices = false;
                setDialogText(letter.message);
                break; // 한 번에 하나만
            }
        }
    }
}

// 플레이어 x 위치에서 바닥 y 좌표 반환 (타일 단위, 화면 상단 기준)
// Stage 2에서는 바닥이 항상 화면 하단이므로, 플레이어는 항상 같은 높이에 있음
function getGroundY(x) {
    // 화면 높이를 타일 단위로 변환 (화면 하단 = 바닥)
    // 플레이어가 바닥 위에 서 있으려면, 화면 하단에서 캐릭터 높이만큼 위에 있어야 함
    // 타일 단위로 계산: 화면 높이 / TILE_SIZE - 캐릭터 높이(타일 단위)
    const screenHeightInTiles = canvas.height / TILE_SIZE;
    const charHeightInTiles = 2.64; // 캐릭터 높이 (타일 단위)
    return screenHeightInTiles - charHeightInTiles - 1; // 바닥 위에 서 있도록
}

// 플랫폼 충돌 체크 (Stage 2) - x축만 체크
function checkPlatformCollision(x, y) {
    const playerWidth = TILE_SIZE * 0.8;
    
    // 플레이어 x 위치
    const left = x * TILE_SIZE;
    const right = left + playerWidth;
    
    // 모든 플랫폼과 x축 충돌 체크
    for (let platform of stage2Platforms) {
        const platLeft = platform.x * TILE_SIZE;
        const platRight = (platform.x + platform.width) * TILE_SIZE;
        
        // 플레이어가 플랫폼 위에 있는지 확인
        const groundY = getGroundY(x);
        const platformY = STAGE2_GROUND_Y - platform.y;
        
        // 같은 높이의 플랫폼과 x축 충돌만 체크
        if (Math.abs(groundY - platformY) < 0.1) {
            if (right > platLeft && left < platRight) {
                return true;
            }
        }
    }
    
    return false;
}

// 카메라 업데이트 (플레이어를 중심으로)
function updateCamera() {
    if (currentStage === 2) {
        // Stage 2: 횡스크롤 카메라 (좌우만 따라감, player.x는 타일 단위)
        camera.x = player.x * TILE_SIZE - canvas.width / 2 + TILE_SIZE / 2;
        camera.y = 0; // y축은 고정
        
        // 맵 경계 제한
        const maxCameraX = STAGE2_WIDTH * TILE_SIZE - canvas.width;
        camera.x = Math.max(0, Math.min(camera.x, maxCameraX));
    } else {
        // Stage 1: 기존 탑다운 카메라
        camera.x = player.x * TILE_SIZE - canvas.width / 2 + TILE_SIZE / 2;
        camera.y = player.y * TILE_SIZE - canvas.height / 2 + TILE_SIZE / 2;
        
        // 맵 경계 제한
        const maxCameraX = COLS * TILE_SIZE - canvas.width;
        const maxCameraY = ROWS * TILE_SIZE - canvas.height;
        
        camera.x = Math.max(0, Math.min(camera.x, maxCameraX));
        camera.y = Math.max(0, Math.min(camera.y, maxCameraY));
    }
}

// 돌길 타일 그리기
function drawStonePath(x, y, row, col) {
    const unit = PIXEL_UNIT;
    const seed = (row * 31 + col * 37) % 97;
    
    const baseColors = ['#4b3a2c', '#523f30', '#5a4633'];
    const midColors = ['#6b513b', '#72563f'];
    const highlightColor = '#8a6d54';
    const crackColor = '#2f2016';
    
    ctx.fillStyle = baseColors[seed % baseColors.length];
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    
    ctx.fillStyle = midColors[seed % midColors.length];
    for (let i = 0; i < TILE_SIZE; i += unit * 2) {
        for (let j = 0; j < TILE_SIZE; j += unit * 2) {
            const noise = (i * 5 + j * 11 + seed * 13) % 23;
            if (noise < 12) {
                ctx.fillRect(x + i, y + j, unit * 2, unit * 2);
            }
        }
    }
    
    ctx.fillStyle = highlightColor;
    for (let i = unit; i < TILE_SIZE; i += unit * 4) {
        for (let j = unit; j < TILE_SIZE; j += unit * 4) {
            const noise = (i * 7 + j * 3 + seed * 5) % 17;
            if (noise < 4) {
                ctx.fillRect(x + i, y + j, unit * 2, unit);
            }
        }
    }
    
    ctx.fillStyle = crackColor;
    for (let i = 0; i < TILE_SIZE; i += unit * 5) {
        for (let j = 0; j < TILE_SIZE; j += unit * 5) {
            const noise = (i * 11 + j * 13 + seed * 19) % 21;
            if (noise < 3) {
                ctx.fillRect(x + i, y + j, unit * 3, unit);
            }
        }
    }
    
    // 돌길 가장자리에 이끼 섞기
    ctx.fillStyle = 'rgba(24, 40, 24, 0.35)';
    for (let i = 0; i < TILE_SIZE; i += unit * 3) {
        const noiseTop = (i * 13 + seed * 3) % 7;
        const noiseBottom = (i * 17 + seed * 5) % 7;
        if (noiseTop < 3) {
            ctx.fillRect(x + i, y, unit, unit * 2);
        }
        if (noiseBottom < 3) {
            ctx.fillRect(x + i, y + TILE_SIZE - unit * 2, unit, unit * 2);
        }
    }
    for (let j = 0; j < TILE_SIZE; j += unit * 3) {
        const noiseLeft = (j * 19 + seed * 7) % 7;
        const noiseRight = (j * 23 + seed * 11) % 7;
        if (noiseLeft < 3) {
            ctx.fillRect(x, y + j, unit * 2, unit);
        }
        if (noiseRight < 3) {
            ctx.fillRect(x + TILE_SIZE - unit * 2, y + j, unit * 2, unit);
        }
    }
}

// 풀밭 타일 그리기
function drawGrassland(x, y, row, col) {
    const unit = PIXEL_UNIT;
    const seed = (row * 17 + col * 23) % 97;
    
    const baseColors = ['#1c2415', '#1f2a17', '#222f1a'];
    const midColors = ['#2b3b1f', '#314322'];
    const highlightColors = ['#3c4f28', '#45652f'];
    const shadowColor = '#121c10';
    
    ctx.fillStyle = baseColors[seed % baseColors.length];
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    
    ctx.fillStyle = midColors[seed % midColors.length];
    for (let i = 0; i < TILE_SIZE; i += unit * 2) {
        for (let j = 0; j < TILE_SIZE; j += unit * 2) {
            const noise = (i * 5 + j * 7 + seed * 11) % 19;
            if (noise < 11) {
                ctx.fillRect(x + i, y + j, unit * 2, unit * 2);
            }
        }
    }
    
    ctx.fillStyle = highlightColors[seed % highlightColors.length];
    for (let i = 0; i < TILE_SIZE; i += unit * 4) {
        for (let j = 0; j < TILE_SIZE; j += unit * 4) {
            const noise = (i * 3 + j * 9 + seed * 5) % 17;
            if (noise < 4) {
                ctx.fillRect(x + i, y + j, unit, unit * 2);
            }
        }
    }
    
    ctx.fillStyle = shadowColor;
    for (let i = 0; i < TILE_SIZE; i += unit * 5) {
        for (let j = 0; j < TILE_SIZE; j += unit * 5) {
            const noise = (i * 11 + j * 13 + seed * 7) % 23;
            if (noise < 4) {
                ctx.fillRect(x + i, y + j, unit * 2, unit);
            }
        }
    }
    
    // 마른 풀 패치
    ctx.fillStyle = 'rgba(88, 72, 42, 0.3)';
    for (let i = 0; i < TILE_SIZE; i += unit * 6) {
        for (let j = 0; j < TILE_SIZE; j += unit * 6) {
            const noise = (i * 17 + j * 5 + seed * 3) % 13;
            if (noise < 2) {
                ctx.fillRect(x + i, y + j, unit * 2, unit * 2);
            }
        }
    }
    
    if ((seed + row + col) % 9 === 0) {
        const flowerX = x + (seed % (TILE_SIZE - unit * 4)) + unit * 2;
        const flowerY = y + ((seed * 3) % (TILE_SIZE - unit * 4)) + unit * 2;
        ctx.fillStyle = '#d8c45b';
        ctx.fillRect(flowerX, flowerY, unit, unit);
        ctx.fillStyle = '#f5e7a5';
        ctx.fillRect(flowerX - unit, flowerY + unit, unit, unit);
        ctx.fillStyle = '#b06b3c';
        ctx.fillRect(flowerX + unit, flowerY + unit, unit, unit);
    }
}

// 덤불(벽) 타일
function drawRockTile(x, y, row, col) {
    const unit = PIXEL_UNIT;
    const seed = (row * 19 + col * 13) % 83;
    
    drawGrassland(x, y, row, col);
    
    const bushDark = '#0c150c';
    const bushMid = '#122012';
    const bushLight = '#1a2c1a';
    const bushHighlight = '#243b24';
    const outline = '#050805';
    
    ctx.fillStyle = bushDark;
    ctx.fillRect(x + unit * 2, y + unit * 2, TILE_SIZE - unit * 4, TILE_SIZE - unit * 4);
    
    ctx.fillStyle = bushMid;
    ctx.fillRect(x + unit * 4, y + unit * 3, TILE_SIZE - unit * 8, TILE_SIZE - unit * 6);
    
    ctx.fillStyle = bushLight;
    for (let i = unit * 5; i < TILE_SIZE - unit * 5; i += unit * 3) {
        for (let j = unit * 5; j < TILE_SIZE - unit * 5; j += unit * 3) {
            const noise = (i * 7 + j * 11 + seed * 5) % 13;
            if (noise < 7) {
                ctx.fillRect(x + i, y + j, unit * 2, unit * 2);
            }
        }
    }
    
    ctx.fillStyle = bushHighlight;
    for (let i = unit * 6; i < TILE_SIZE - unit * 6; i += unit * 4) {
        for (let j = unit * 6; j < TILE_SIZE - unit * 6; j += unit * 4) {
            const noise = (i * 3 + j * 5 + seed * 7) % 11;
            if (noise < 4) {
                ctx.fillRect(x + i, y + j, unit * 2, unit);
            }
        }
    }
    
    ctx.fillStyle = outline;
    for (let i = unit * 3; i < TILE_SIZE - unit * 3; i += unit * 2) {
        const noiseTop = (i * 5 + seed * 3) % 7;
        const noiseBottom = (i * 7 + seed * 11) % 7;
        if (noiseTop < 4) ctx.fillRect(x + i, y + unit * 2, unit, unit);
        if (noiseBottom < 4) ctx.fillRect(x + i, y + TILE_SIZE - unit * 3, unit, unit);
    }
    for (let j = unit * 3; j < TILE_SIZE - unit * 3; j += unit * 2) {
        const noiseLeft = (j * 5 + seed * 13) % 7;
        const noiseRight = (j * 7 + seed * 17) % 7;
        if (noiseLeft < 4) ctx.fillRect(x + unit * 2, y + j, unit, unit);
        if (noiseRight < 4) ctx.fillRect(x + TILE_SIZE - unit * 3, y + j, unit, unit);
    }
}

// 별 함수 제거됨 (더 이상 사용 안함)

// 나무 그리기 (tree1.png와 tree2.png 사용)
function drawNaturalTree(x, y, row, col) {
    // row와 col에 따라 tree1 또는 tree2 선택
    const seed = (row * 7 + col * 11) % 2;
    const treeImage = seed === 0 ? images.tree1 : images.tree2;
    
    if (treeImage && treeImage.complete && treeImage.naturalWidth > 0) {
        // 나무를 타일보다 크게 그려서 자연스럽게
        const treeWidth = TILE_SIZE * 2;
        const treeHeight = TILE_SIZE * 2.5;
        const treeX = x + TILE_SIZE / 2 - treeWidth / 2;
        const treeY = y + TILE_SIZE / 2 - treeHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(treeImage, treeX, treeY, treeWidth, treeHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 이미지 로드 전 임시 나무 (간단하게)
        const p = 4;
        const cx = x + TILE_SIZE / 2;
        const baseY = y + TILE_SIZE * 0.5;
        
        // 줄기
        ctx.fillStyle = '#3a3530';
        ctx.fillRect(cx - p * 2, baseY + p * 4, p * 4, p * 8);
        
        // 나뭇잎
        ctx.fillStyle = '#1a3a1a';
        ctx.fillRect(cx - p * 6, baseY - p * 4, p * 12, p * 10);
    }
}

// 연못 그리기 (픽셀 아트 스타일)
function drawPond(x, y) {
    // pond.png 사용 (원본 비율 유지, 타일 크기의 3배)
    if (images.pond && images.pond.complete && images.pond.naturalWidth > 0) {
        const originalWidth = images.pond.naturalWidth;
        const originalHeight = images.pond.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 타일 크기의 6배를 기준으로 (3배의 2배)
        const baseSize = TILE_SIZE * 6;
        
        let pondWidth, pondHeight;
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            pondWidth = baseSize;
            pondHeight = baseSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            pondHeight = baseSize;
            pondWidth = baseSize * aspectRatio;
        }
        
        // 타일 중심에 연못 배치
        const offsetX = x + TILE_SIZE / 2 - pondWidth / 2;
        const offsetY = y + TILE_SIZE / 2 - pondHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.pond, offsetX, offsetY, pondWidth, pondHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 폴백: pond.png 로드 전 임시 연못
        const unit = Math.max(1, PIXEL_UNIT * 2);
        const time = Date.now();
        const wave = Math.sin(time * 0.002) * 0.5 + 0.5;
        
        ctx.fillStyle = '#0b0f0f';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        
        ctx.fillStyle = '#142222';
        ctx.fillRect(x + unit, y + unit, TILE_SIZE - unit * 2, TILE_SIZE - unit * 2);
        
        ctx.fillStyle = '#1d3232';
        ctx.fillRect(x + unit * 2, y + unit * 2, TILE_SIZE - unit * 4, TILE_SIZE - unit * 4);
        
        ctx.fillStyle = `rgba(120, 180, 190, ${0.15 + wave * 0.15})`;
        for (let i = unit * 2; i < TILE_SIZE - unit * 2; i += unit * 3) {
            const ripple = Math.sin(time * 0.003 + i * 0.1) * unit;
            ctx.fillRect(x + i, y + TILE_SIZE / 2 + ripple, unit * 2, unit);
        }
    }
}

// 신체 부위 그리기
function drawBodyPart(x, y, row, col, tile) {
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    
    // 노란색 발광 효과 (2배 크기, 그라디언트로 부드럽게)
    const pulse = Math.sin(Date.now() * 0.004) * 0.3 + 0.7;
    const radius = TILE_SIZE * 0.7; // 0.35 * 2 = 0.7
    
    // 방사형 그라디언트 생성 (중심에서 밖으로 페이드)
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, `rgba(220, 200, 100, ${pulse * 0.4})`); // 중심은 더 밝게
    gradient.addColorStop(0.5, `rgba(220, 200, 100, ${pulse * 0.3})`);
    gradient.addColorStop(1, `rgba(220, 200, 100, 0)`); // 테두리는 투명하게
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // 이미지 파일 선택
    let bodyPartImage = null;
    
    // 타일 타입에 따라 다른 이미지 파일 선택
    if (tile === 50) {
        // 심장 - 1.png
        bodyPartImage = images.bodyPart1;
    } else if (tile === 51) {
        // 두개골 - 6.png
        bodyPartImage = images.bodyPart6;
    } else if (tile === 52) {
        // 뇌 - 13.png
        bodyPartImage = images.bodyPart13;
    } else if (tile === 53) {
        // 갈비뼈 (좌) - 2.png
        bodyPartImage = images.bodyPart2;
    } else if (tile === 54) {
        // 갈비뼈 (우) - 12.png
        bodyPartImage = images.bodyPart12;
    } else if (tile === 55) {
        // 골반뼈 - 8.png
        bodyPartImage = images.bodyPart8;
    }
    
    // 이미지 그리기 (1.8배 크기)
    if (bodyPartImage && bodyPartImage.complete && bodyPartImage.naturalWidth > 0) {
        const imgWidth = bodyPartImage.naturalWidth;
        const imgHeight = bodyPartImage.naturalHeight;
        const aspectRatio = imgWidth / imgHeight;
        
        // 아이콘 크기 1.8배 (TILE_SIZE * 0.9)
        const iconSize = TILE_SIZE * 0.9; // 0.5 * 1.8 = 0.9
        let drawWidth, drawHeight;
        
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            drawWidth = iconSize;
            drawHeight = iconSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            drawHeight = iconSize;
            drawWidth = iconSize * aspectRatio;
        }
        
        // 중앙 정렬
        const drawX = cx - drawWidth / 2;
        const drawY = cy - drawHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bodyPartImage, drawX, drawY, drawWidth, drawHeight);
        ctx.imageSmoothingEnabled = true;
    }
}

// 출구 그리기
function drawExit(x, y) {
    if (images.door && images.door.complete && images.door.naturalWidth > 0) {
        const originalWidth = images.door.naturalWidth;
        const originalHeight = images.door.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 기본 크기의 2.25배로 설정 (1.5배의 1.5배)
        const baseSize = TILE_SIZE * 2.25;
        
        let doorWidth, doorHeight;
        
        // 비율을 유지하면서 크기 결정
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            doorWidth = baseSize;
            doorHeight = baseSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            doorHeight = baseSize;
            doorWidth = baseSize * aspectRatio;
        }
        
        // 문을 타일 중앙에 배치
        const doorX = x + (TILE_SIZE - doorWidth) / 2;
        const doorY = y + (TILE_SIZE - doorHeight) / 2;
        
        // 열쇠가 있을 때 노란색 테두리 깜빡이기
        if (hasKey) {
            const pulse = Math.sin(Date.now() * 0.003) * 0.4 + 0.6;
            const glowRadius = Math.max(doorWidth, doorHeight) * 0.6;
            
            // 흐린 노란색 원형 그라데이션
            const gradient = ctx.createRadialGradient(
                doorX + doorWidth / 2, 
                doorY + doorHeight / 2, 
                0,
                doorX + doorWidth / 2, 
                doorY + doorHeight / 2, 
                glowRadius
            );
            gradient.addColorStop(0, `rgba(255, 220, 100, ${pulse * 0.6})`);
            gradient.addColorStop(0.5, `rgba(255, 220, 100, ${pulse * 0.3})`);
            gradient.addColorStop(1, 'rgba(255, 220, 100, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                doorX - glowRadius / 2, 
                doorY - glowRadius / 2, 
                doorWidth + glowRadius, 
                doorHeight + glowRadius
            );
        }
        
        // door.png 그리기
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.door, doorX, doorY, doorWidth, doorHeight);
        ctx.imageSmoothingEnabled = true;
        
    } else {
        // 폴백: door.png 로드 전 기본 문
        const p = Math.max(1, PIXEL_UNIT);
        const cx = x + TILE_SIZE / 2;
        const cy = y + TILE_SIZE / 2;
        
        // 문 형태
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + p * 4, y + p * 2, TILE_SIZE - p * 8, TILE_SIZE - p * 4);
        
        // 문 테두리
        ctx.strokeStyle = hasKey ? '#8a8a4a' : '#3a3a3a';
        ctx.lineWidth = 3;
        ctx.strokeRect(x + p * 4, y + p * 2, TILE_SIZE - p * 8, TILE_SIZE - p * 4);
        
        // 문손잡이
        ctx.fillStyle = hasKey ? '#aaaa6a' : '#4a4a4a';
        ctx.fillRect(cx + p * 6, cy, p * 2, p * 3);
        
        // 열쇠 구멍
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(cx + p * 6.5, cy + p, p, p);
    }
}

// stone_2.png 그리기 (맵 좌측 상단, tree_1보다 조금 작게)
function drawStone2(x, y) {
    if (images.stone2 && images.stone2.complete && images.stone2.naturalWidth > 0) {
        const originalWidth = images.stone2.naturalWidth;
        const originalHeight = images.stone2.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 10x10 타일 영역에 맞춤 (tree_1보다 조금 작게)
        const targetSize = TILE_SIZE * 10;
        
        let stoneWidth, stoneHeight;
        
        // 비율을 유지하면서 크기 결정
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            stoneWidth = targetSize;
            stoneHeight = targetSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            stoneHeight = targetSize;
            stoneWidth = targetSize * aspectRatio;
        }
        
        // stone_2의 중심이 타일 영역 중심에 오도록
        const stoneCenterX = x + (TILE_SIZE * 10) / 2;
        const stoneCenterY = y + (TILE_SIZE * 10) / 2;
        
        const offsetX = stoneCenterX - stoneWidth / 2;
        const offsetY = stoneCenterY - stoneHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.stone2, offsetX, offsetY, stoneWidth, stoneHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 폴백: stone_2.png 로드 전 임시 돌
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x, y, TILE_SIZE * 10, TILE_SIZE * 10);
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(x + 10, y + 10, TILE_SIZE * 10 - 20, TILE_SIZE * 10 - 20);
    }
}

// tree_1.png 그리기 (맵 우측 상단, 화면 안쪽에 배치 - 2배 크기)
function drawTreeTop(x, y) {
    if (images.treeTop && images.treeTop.complete && images.treeTop.naturalWidth > 0) {
        const originalWidth = images.treeTop.naturalWidth;
        const originalHeight = images.treeTop.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 12x12 타일 영역에 맞춤 (6x6의 2배)
        const targetSize = TILE_SIZE * 12;
        
        let treeWidth, treeHeight;
        
        // 비율을 유지하면서 크기 결정
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            treeWidth = targetSize;
            treeHeight = targetSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            treeHeight = targetSize;
            treeWidth = targetSize * aspectRatio;
        }
        
        // tree_1의 중심이 타일 영역 중심에 오도록
        const treeCenterX = x + (TILE_SIZE * 12) / 2;
        const treeCenterY = y + (TILE_SIZE * 12) / 2;
        
        const offsetX = treeCenterX - treeWidth / 2;
        const offsetY = treeCenterY - treeHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.treeTop, offsetX, offsetY, treeWidth, treeHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 폴백: tree_1.png 로드 전 임시 나무
        ctx.fillStyle = '#2a4a2a';
        ctx.fillRect(x, y, TILE_SIZE * 12, TILE_SIZE * 12);
        ctx.fillStyle = '#3a5a3a';
        ctx.fillRect(x + 10, y + 10, TILE_SIZE * 12 - 20, TILE_SIZE * 12 - 20);
    }
}

// stone_3.png 그리기 (맵 좌측 하단 모서리에 딱 맞게, stone_4보다 크게)
function drawStone3(x, y) {
    if (images.stone3 && images.stone3.complete && images.stone3.naturalWidth > 0) {
        const originalWidth = images.stone3.naturalWidth;
        const originalHeight = images.stone3.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 8x6 타일 영역을 기준으로 1.8배 크게 그리기 (stone_4보다 크게)
        const baseWidth = TILE_SIZE * 8;
        const baseHeight = TILE_SIZE * 6;
        
        let stoneWidth, stoneHeight;
        
        // 비율을 유지하면서 크기 결정 (1.8배 스케일)
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            stoneWidth = baseWidth * 1.8;
            stoneHeight = stoneWidth / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            stoneHeight = baseHeight * 1.8;
            stoneWidth = stoneHeight * aspectRatio;
        }
        
        // 맵의 좌측 하단 모서리에 맞춰서 배치
        // stone_3의 좌측 하단이 맵의 좌측 하단에 오도록
        const mapBottomLeft = {
            x: 0 - camera.x,
            y: ROWS * TILE_SIZE - camera.y
        };
        
        const offsetX = mapBottomLeft.x;
        const offsetY = mapBottomLeft.y - stoneHeight;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.stone3, offsetX, offsetY, stoneWidth, stoneHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 폴백: stone_3.png 로드 전 임시 돌
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, TILE_SIZE * 8, TILE_SIZE * 6);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x + 10, y + 10, TILE_SIZE * 8 - 20, TILE_SIZE * 6 - 20);
    }
}

// stone_4.png 그리기 (맵 우측 하단 모서리에 딱 맞게, 크게)
function drawStone4(x, y) {
    if (images.stone4 && images.stone4.complete && images.stone4.naturalWidth > 0) {
        const originalWidth = images.stone4.naturalWidth;
        const originalHeight = images.stone4.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        
        // 8x6 타일 영역을 기준으로 1.5배 크게 그리기
        const baseWidth = TILE_SIZE * 8;
        const baseHeight = TILE_SIZE * 6;
        
        let stoneWidth, stoneHeight;
        
        // 비율을 유지하면서 크기 결정 (1.5배 스케일)
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            stoneWidth = baseWidth * 1.5;
            stoneHeight = stoneWidth / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            stoneHeight = baseHeight * 1.5;
            stoneWidth = stoneHeight * aspectRatio;
        }
        
        // 맵의 우측 하단 모서리에 맞춰서 배치
        // stone_4의 우측 하단이 맵의 우측 하단에 오도록
        const mapBottomRight = {
            x: COLS * TILE_SIZE - camera.x,
            y: ROWS * TILE_SIZE - camera.y
        };
        
        const offsetX = mapBottomRight.x - stoneWidth;
        const offsetY = mapBottomRight.y - stoneHeight;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images.stone4, offsetX, offsetY, stoneWidth, stoneHeight);
        ctx.imageSmoothingEnabled = true;
    } else {
        // 폴백: stone_4.png 로드 전 임시 돌
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, TILE_SIZE * 8, TILE_SIZE * 6);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x + 10, y + 10, TILE_SIZE * 8 - 20, TILE_SIZE * 6 - 20);
    }
}

// Stage 2 횡스크롤 맵 그리기
function drawStage2Map() {
    // 배경 타일 그리기 (tile_stage2.png 사용)
    if (images.tileStage2 && images.tileStage2.complete && images.tileStage2.naturalWidth > 0) {
        console.log('Stage 2 배경 이미지 로드됨', images.tileStage2.naturalWidth, images.tileStage2.naturalHeight);
        const tileW = images.tileStage2.naturalWidth * 2;
        const tileH = images.tileStage2.naturalHeight * 2;
        
        const startX = Math.floor(camera.x / tileW) * tileW - camera.x;
        const startY = 0;
        
        ctx.imageSmoothingEnabled = false;
        for (let y = startY; y < canvas.height; y += tileH) {
            for (let x = startX; x < canvas.width + tileW; x += tileW) {
                ctx.drawImage(images.tileStage2, x, y, tileW, tileH);
            }
        }
        ctx.imageSmoothingEnabled = true;
    } else {
        // tile_stage2.png 로드 전 임시 배경 (밝은 회색으로 변경)
        console.log('Stage 2 배경 이미지 로드 안 됨, 임시 배경 사용');
        ctx.fillStyle = '#4a5a4a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 쪽지/봉투 그리기
    for (let letter of stage2Letters) {
        if (!letter.collected) {
            const letterX = letter.x - camera.x;
            // 바닥에 배치 (플레이어가 서 있는 위치와 동일)
            const charHeight = TILE_SIZE * 2.64;
            const letterY = canvas.height - charHeight - TILE_SIZE; // 플레이어 발 위치
            
            // 화면에 보이는지 체크
            if (letterX > -50 && letterX < canvas.width + 50) {
                if (images.letter && images.letter.complete && images.letter.naturalWidth > 0) {
                    const letterSize = TILE_SIZE * 0.8;
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(images.letter, letterX - letterSize / 2, letterY - letterSize, letterSize, letterSize);
                    ctx.imageSmoothingEnabled = true;
                } else {
                    // 임시 쪽지 그리기
                    ctx.fillStyle = '#ffffaa';
                    ctx.fillRect(letterX - 15, letterY - 30, 30, 40);
                    ctx.strokeStyle = '#aaaa88';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(letterX - 15, letterY - 30, 30, 40);
                }
            }
        }
    }
}

// 미로 그리기 (카메라 기준)
function drawMaze() {
    // Stage 2: 횡스크롤 맵 그리기
    if (currentStage === 2) {
        drawStage2Map();
        return;
    }
    
    // Stage 1: 기존 탑다운 맵 그리기
    // 1. 먼저 tile.png를 2x2 크기로 전체 배경에 반복해서 그리기
    if (images.tile && images.tile.complete && images.tile.naturalWidth > 0) {
        const tileW = images.tile.naturalWidth * 2; // 2배 크기
        const tileH = images.tile.naturalHeight * 2;
        
        // 카메라 위치를 고려한 타일 시작 위치
        const startX = Math.floor(camera.x / tileW) * tileW - camera.x;
        const startY = Math.floor(camera.y / tileH) * tileH - camera.y;
        
        ctx.imageSmoothingEnabled = false;
        for (let y = startY; y < canvas.height; y += tileH) {
            for (let x = startX; x < canvas.width; x += tileW) {
                ctx.drawImage(images.tile, x, y, tileW, tileH);
            }
        }
        ctx.imageSmoothingEnabled = true;
    } else {
        // tile.png 로드 전 임시 배경
        ctx.fillStyle = '#2a3a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 2. 그 위에 오브젝트 그리기
    const startCol = Math.floor(camera.x / TILE_SIZE);
    const endCol = Math.ceil((camera.x + canvas.width) / TILE_SIZE);
    const startRow = Math.floor(camera.y / TILE_SIZE);
    const endRow = Math.ceil((camera.y + canvas.height) / TILE_SIZE);
    
    // stone_4 블록을 추적하기 위한 Set
    const drawnStone4 = new Set();
    
    for (let row = Math.max(0, startRow); row < Math.min(ROWS, endRow); row++) {
        for (let col = Math.max(0, startCol); col < Math.min(COLS, endCol); col++) {
            const x = col * TILE_SIZE - camera.x;
            const y = row * TILE_SIZE - camera.y;
            
            // 타일 타입에 따라 그리기
            const tile = maze[row][col];
            
            if (tile === 1) {
                // 덤불 (벽)
                drawRockTile(x, y, row, col);
            } else if (tile === 3) {
                // 연못
                drawPond(x, y);
            } else if (tile === 4) {
                // 나무
                drawNaturalTree(x, y, row, col);
            } else if (tile === 7) {
                // stone_4 (8x6 크기)
                // 왼쪽 상단 타일에서만 그리기
                const isTopLeft = (row === 0 || maze[row - 1][col] !== 7) && 
                                  (col === 0 || maze[row][col - 1] !== 7);
                const blockKey = `${Math.floor(row / 4)}-${Math.floor(col / 4)}`;
                
                if (isTopLeft && !drawnStone4.has(blockKey)) {
                    drawStone4(x, y);
                    drawnStone4.add(blockKey);
                }
            } else if (tile === 8) {
                // stone_3 (8x6 크기)
                // 왼쪽 상단 타일에서만 그리기
                const isTopLeft = (row === 0 || maze[row - 1][col] !== 8) && 
                                  (col === 0 || maze[row][col - 1] !== 8);
                const blockKey = `${Math.floor(row / 4)}-${Math.floor(col / 4)}`;
                
                if (isTopLeft && !drawnStone4.has(blockKey)) {
                    drawStone3(x, y);
                    drawnStone4.add(blockKey);
                }
            } else if (tile === 9) {
                // tree_1 (12x12 크기)
                // 왼쪽 상단 타일에서만 그리기
                const isTopLeft = (row === 0 || maze[row - 1][col] !== 9) && 
                                  (col === 0 || maze[row][col - 1] !== 9);
                const blockKey = `${Math.floor(row / 12)}-${Math.floor(col / 12)}`;
                
                if (isTopLeft && !drawnStone4.has(blockKey)) {
                    drawTreeTop(x, y);
                    drawnStone4.add(blockKey);
                }
            } else if (tile === 10) {
                // stone_2 (10x10 크기)
                // 왼쪽 상단 타일에서만 그리기
                const isTopLeft = (row === 0 || maze[row - 1][col] !== 10) && 
                                  (col === 0 || maze[row][col - 1] !== 10);
                const blockKey = `${Math.floor(row / 10)}-${Math.floor(col / 10)}`;
                
                if (isTopLeft && !drawnStone4.has(blockKey)) {
                    drawStone2(x, y);
                    drawnStone4.add(blockKey);
                }
            } else if (tile >= 50 && tile <= 55) {
                // 신체 부위 (50=심장, 51=두개골, 52=뇌, 53=갈비뼈좌, 54=갈비뼈우, 55=골반뼈)
                drawBodyPart(x, y, row, col, tile);
            } else if (tile === 6) {
                // 출구 (연못의 윗쪽 타일)
                drawExit(x, y);
            }
        }
    }
}

// 손전등 효과 (캐릭터 중심 조명)
function drawLighting() {
    // Stage 2에서는 조명 효과 없음 (밝게)
    if (currentStage === 2) return;
    
    // 플레이어 화면상 위치 (Stage 1만)
    const playerScreenX = player.x * TILE_SIZE - camera.x + TILE_SIZE / 2;
    const playerScreenY = player.y * TILE_SIZE - camera.y + TILE_SIZE / 2;
    
    // 조명 반경
    const lightRadius = TILE_SIZE * 7;
    
    // 방사형 그라데이션으로 조명 생성
    const gradient = ctx.createRadialGradient(
        playerScreenX, playerScreenY, 0,
        playerScreenX, playerScreenY, lightRadius
    );
    
    // 중심은 완전히 밝게, 외곽으로 갈수록 어둡게
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.2)');
    gradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    
    // 어두운 오버레이 그리기
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 플레이어 그리기 (더 크고 디테일한 쯔꾸르 스타일)
function drawPlayer() {
    let screenX, screenY;
    
    if (currentStage === 2) {
        // Stage 2: 타일 단위 (Stage 1처럼)
        screenX = player.x * TILE_SIZE - camera.x;
        screenY = player.y; // y는 픽셀 단위 (바닥 고정)
    } else {
        // Stage 1: 타일 단위
        screenX = player.x * TILE_SIZE - camera.x;
        screenY = player.y * TILE_SIZE - camera.y;
    }
    
    // characterr.png - 전체 이미지 사용
    if (images.character && images.character.complete && images.character.naturalWidth > 0) {
        const imgWidth = images.character.naturalWidth;
        const imgHeight = images.character.naturalHeight;
        
        // 캐릭터 크기 (이미지 비율 유지, 0.8배로 축소)
        const aspectRatio = imgWidth / imgHeight;
        const charHeight = TILE_SIZE * 2.64; // 3.3 * 0.8 = 2.64
        const charWidth = charHeight * aspectRatio;
        
        // 캐릭터 위치 계산
        let drawX, drawY;
        if (currentStage === 2) {
            // Stage 2: 픽셀 단위, 바닥에 맞춤
            drawX = screenX - charWidth / 2;
            drawY = screenY - charHeight; // player.y는 바닥 기준이므로
        } else {
            // Stage 1: 타일 단위
            drawX = screenX + TILE_SIZE / 2 - charWidth / 2;
            drawY = screenY + TILE_SIZE - charHeight;
        }
        
        // 그림자 (캐릭터 크기에 맞춰)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        const shadowX = currentStage === 2 ? screenX : screenX + TILE_SIZE / 2;
        const shadowY = currentStage === 2 ? screenY - 6 : screenY + TILE_SIZE - 6;
        ctx.ellipse(shadowX, shadowY, TILE_SIZE * 0.3, TILE_SIZE * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 좌우 반전 처리
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        
        if (player.direction === 'left') {
            // 왼쪽을 볼 때 좌우 반전
            ctx.translate(drawX + charWidth, drawY);
            ctx.scale(-1, 1);
            ctx.drawImage(
                images.character,
                0, 0, imgWidth, imgHeight,
                0, 0, charWidth, charHeight
            );
        } else {
            // 오른쪽, 위, 아래는 원본 그대로
            ctx.drawImage(
                images.character,
                0, 0, imgWidth, imgHeight,
                drawX, drawY, charWidth, charHeight
            );
        }
        
        ctx.imageSmoothingEnabled = true;
        ctx.restore();
    } else {
        // 캐릭터 이미지 없을 때 임시로 간단한 캐릭터 그리기
        const centerX = screenX + TILE_SIZE / 2;
        const baseY = screenY + TILE_SIZE * 0.3;
        
        // 머리
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(centerX - 12, baseY, 24, 30);
        
        // 몸
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(centerX - 15, baseY + 30, 30, 40);
    }
}

// 대화창 그리기
function drawDialog() {
    if (!dialogActive) return;
    
    const boxHeight = showChoices ? 280 : 150;
    const boxY = canvas.height - boxHeight - 40;
    const boxX = 40;
    const boxWidth = canvas.width - 80;
    
    // 대화창 배경
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    
    // 대화창 테두리
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    
    // 내부 테두리
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX + 10, boxY + 10, boxWidth - 20, boxHeight - 20);
    
    // 대화 텍스트
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px "Georgia", serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    const textX = boxX + 30;
    const textY = boxY + 30;
    
    ctx.fillText(dialogDisplayText, textX, textY);
    
    // 선택지 그리기
    if (showChoices && dialogComplete) {
        ctx.font = '24px "Georgia", serif';
        const choiceY = textY + 60;
        
        choices.forEach((choice, index) => {
            const y = choiceY + index * 40;
            
            // 선택된 항목 표시
            if (index === selectedChoice) {
                ctx.fillStyle = '#ffcc00';
                ctx.fillText('▶ ' + choice, textX + 20, y);
            } else {
                ctx.fillStyle = '#cccccc';
                ctx.fillText('   ' + choice, textX + 20, y);
            }
        });
    }
    
    // 계속 진행 표시 (▼)
    if (dialogComplete && !showChoices) {
        const arrowY = boxY + boxHeight - 35;
        const arrowX = boxX + boxWidth - 50;
        const bounce = Math.sin(Date.now() * 0.005) * 5;
        
        ctx.fillStyle = '#ffcc00';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('▼', arrowX, arrowY + bounce);
    }
}

// 픽셀 인벤토리 UI
function drawUI() {
    // Stage 2에서는 인벤 창 숨기기
    if (currentStage === 2) {
        return;
    }
    
    // 대화창이 활성화되어 있으면 인벤토리 숨기기
    if (dialogActive) {
        return;
    }
    
    const slotSize = 40;
    const slotGap = 12;
    const totalSlots = MAX_BODY_PARTS + 1; // + 열쇠
    const totalWidth = totalSlots * slotSize + (totalSlots - 1) * slotGap;
    const startX = canvas.width / 2 - totalWidth / 2;
    const startY = canvas.height - slotSize - 20;
    
    // 타이틀 박스 제거 - 슬롯만 표시
    for (let i = 0; i < MAX_BODY_PARTS; i++) {
        const slotX = startX + i * (slotSize + slotGap);
        drawInventorySlot(slotX, startY, slotSize, i < bodyParts ? 'body' : 'empty', i);
    }
    
    const keySlotX = startX + MAX_BODY_PARTS * (slotSize + slotGap);
    drawInventorySlot(keySlotX, startY, slotSize, hasKey ? 'key' : 'key-empty');
}

function drawInventorySlot(x, y, size, type, index = 0) {
    ctx.save();
    ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = type === 'body' || type === 'key' ? '#d5c07a' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);
    
    if (type === 'body') {
        drawSlotBodyIcon(x, y, size, index);
    } else if (type === 'key') {
        drawSlotKeyIcon(x, y, size, true);
    } else if (type === 'key-empty') {
        drawSlotKeyIcon(x, y, size, false);
    }
    ctx.restore();
}

function drawSlotBodyIcon(x, y, size, index) {
    if (index >= collectedParts.length) return;
    
    const pad = size * 0.15;
    const cx = x + size / 2;
    const cy = y + size / 2;
    
    const partName = collectedParts[index];
    
    // 신체 부위 이름에 따라 이미지 선택
    let bodyPartImage = null;
    
    if (partName === '심장') {
        bodyPartImage = images.bodyPart1; // 1.png
    } else if (partName === '두개골') {
        bodyPartImage = images.bodyPart6; // 6.png
    } else if (partName === '뇌') {
        bodyPartImage = images.bodyPart13; // 13.png
    } else if (partName === '갈비뼈(좌)') {
        bodyPartImage = images.bodyPart2; // 2.png
    } else if (partName === '갈비뼈(우)') {
        bodyPartImage = images.bodyPart12; // 12.png
    } else if (partName === '골반뼈') {
        bodyPartImage = images.bodyPart8; // 8.png
    }
    
    // 이미지 그리기
    if (bodyPartImage && bodyPartImage.complete && bodyPartImage.naturalWidth > 0) {
        const imgWidth = bodyPartImage.naturalWidth;
        const imgHeight = bodyPartImage.naturalHeight;
        const aspectRatio = imgWidth / imgHeight;
        
        // 슬롯 크기의 70%로 아이콘 크기 설정
        const iconSize = size * 0.7;
        let drawWidth, drawHeight;
        
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            drawWidth = iconSize;
            drawHeight = iconSize / aspectRatio;
        } else {
            // 세로가 더 긴 경우
            drawHeight = iconSize;
            drawWidth = iconSize * aspectRatio;
        }
        
        // 중앙 정렬
        const drawX = cx - drawWidth / 2;
        const drawY = cy - drawHeight / 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bodyPartImage, drawX, drawY, drawWidth, drawHeight);
        ctx.imageSmoothingEnabled = true;
    }
}

function drawSlotKeyIcon(x, y, size, active) {
    const pad = size * 0.25;
    const midY = y + size / 2;
    const color = active ? '#d9c36b' : 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + pad, midY);
    ctx.lineTo(x + size - pad * 0.4, midY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x + pad, midY, size * 0.18, 0, Math.PI * 2);
    ctx.stroke();
    
    if (active) {
        ctx.fillStyle = color;
        ctx.fillRect(x + size - pad * 0.8, midY - size * 0.08, size * 0.12, size * 0.16);
    }
}

// 타이핑 효과 업데이트
function updateTyping() {
    if (!dialogActive || dialogComplete) return;
    
    const currentTime = Date.now();
    if (currentTime - lastTypeTime > dialogSpeed) {
        if (dialogCharIndex < dialogText.length) {
            dialogDisplayText += dialogText[dialogCharIndex];
            dialogCharIndex++;
            lastTypeTime = currentTime;
        } else {
            dialogComplete = true;
            
            // 죽음 대화가 끝나면 자동으로 다음 단계로
            if (dialogState === 'death') {
                setTimeout(() => {
                    dialogState = 'death2';
                    setDialogText('그리고... 모든 것이 어두워졌다.');
                }, 1000);
            }
        }
    }
}

// 죽음 애니메이션 업데이트
function updateDeathAnimation() {
    if (!deathAnimation) return;
    
    // Phase 1: 5초 동안 검은 화면으로 페이드인
    if (deathPhase === 1) {
        fadeAlpha += 0.004; // 5초 (1 / 0.004 / 60fps ≈ 4.16초)
        if (fadeAlpha >= 1) {
            fadeAlpha = 1;
            deathPhase = 2; // 메시지 페이즈로
        }
    }
    // Phase 2: 메시지 표시 중 - Enter/Space/Z 또는 게임패드 버튼으로 넘기기
    else if (deathPhase === 2) {
        // 죽음 메시지 표시 (한 번만)
        if (!deathMessageShown) {
            console.log('죽음 메시지 표시 시작');
            dialogActive = true;
            dialogState = 'death';
            dialogComplete = false;
            showChoices = false;
            setDialogText('열쇠가 없다. . .');
            deathMessageShown = true;
        }
        
        // 타이핑이 완료되고 대화가 완료 상태가 되면 즉시 게임 리셋
        // dialogComplete는 handleDialogInput()에서 true로 설정됨
        if (dialogComplete && dialogDisplayText === dialogText) {
            console.log('죽음 메시지 확인됨 - 게임 리셋 시작');
            dialogActive = false;
            // 게임 리셋
            resetGame();
        }
    }
}

// 쪽지 완료 페이드 애니메이션 업데이트
function updateLetterCompleteAnimation() {
    if (!letterCompleteAnimation) return;
    
    // Phase 1: 천천히 검은 화면으로 페이드인
    if (letterFadePhase === 1) {
        letterFadeAlpha += 0.003; // 천천히 (약 5.5초)
        if (letterFadeAlpha >= 1) {
            letterFadeAlpha = 1;
            letterFadePhase = 2; // 대기 페이즈로
            letterFadeWaitStart = Date.now();
        }
    }
    // Phase 2: 검은 화면에서 2초 대기
    else if (letterFadePhase === 2) {
        const waitTime = Date.now() - letterFadeWaitStart;
        if (waitTime >= 2000) { // 2초 대기
            // 게임 리셋 (Stage 1로 전환)
            resetGame();
            // 페이드아웃 시작
            letterFadePhase = 3;
        }
    }
    // Phase 3: Stage 1 첫 화면에서 페이드아웃
    else if (letterFadePhase === 3) {
        letterFadeAlpha -= 0.01; // 페이드아웃
        if (letterFadeAlpha <= 0) {
            letterFadeAlpha = 0;
            letterCompleteAnimation = false;
            letterFadePhase = 0;
        }
    }
}

// 게임 리셋
function resetGame() {
    // 모든 변수 초기화
    randomizeItemPositions(); // 출구와 신체부위 랜덤 배치
    maze = stage1;
    ROWS = maze.length;
    COLS = maze[0].length;
    player.x = 3;
    player.y = 2;
    player.direction = 'down';
    player.moving = false;
    hasKey = false;
    bodyParts = 0;
    collectedParts = []; // 수집한 신체 부위 초기화
    currentStage = 1;
    updatePositions(); // 연못과 출구 위치 자동 찾기
    dialogActive = false;
    dialogState = 'initial';
    showChoices = false;
    dialogComplete = false;
    dialogText = '';
    dialogDisplayText = '';
    dialogCharIndex = 0;
    
    // 죽음 관련 변수 초기화
    deathAnimation = false;
    isDead = false;
    deathPhase = 0;
    fadeAlpha = 0;
    fadeDirection = 1;
    deathMessageShown = false;
    
    // 쪽지 완료 애니메이션 변수 초기화
    letterCompleteAnimation = false;
    letterFadePhase = 0;
    letterFadeAlpha = 0;
    letterFadeWaitStart = 0;
    
    // 게임패드 버튼 상태 초기화
    lastGamepadButtons = {};
}

// 게임 루프
function gameLoop() {
    const currentTime = Date.now();
    
    // 화면 지우기
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 게임패드 입력 처리 (항상 호출 - 죽음 애니메이션 중에도)
    updateGamepad();
    
    // 죽음 애니메이션 또는 쪽지 완료 애니메이션 중이 아닐 때만 업데이트
    if (!deathAnimation && !letterCompleteAnimation) {
        // 업데이트
        updatePlayer();
        updateCamera();
        updateTyping();
        
        // 그리기
        drawMaze();
        drawPlayer();
        
        // 조명 효과 (가장 위에)
        drawLighting();
        
        // UI
        drawUI();
        drawDialog();
    } else {
        // 죽음 애니메이션 중
        if (deathAnimation) {
            // 타이핑은 업데이트 (대화 진행용)
            updateTyping();
            
            // 죽음 애니메이션 중에는 마지막 프레임 유지하다가 페이드
            if (fadeAlpha < 0.5) {
                drawMaze();
                drawPlayer();
                drawLighting();
                drawUI();
                drawDialog();
            }
            
            updateDeathAnimation();
        }
        
        // 쪽지 완료 애니메이션 중
        if (letterCompleteAnimation) {
            // Phase 1: 페이드인 중에는 마지막 프레임 유지
            // Phase 3: 페이드아웃 중에는 Stage 1 화면 그리기
            if (letterFadePhase === 1 && letterFadeAlpha < 1) {
                // Stage 2 마지막 프레임 유지
                drawMaze();
                drawPlayer();
                drawLighting();
                drawUI();
                drawDialog();
            } else if (letterFadePhase === 3) {
                // Stage 1 화면 그리기 (페이드아웃 중)
                drawMaze();
                drawPlayer();
                drawLighting();
                drawUI();
                drawDialog();
            }
            
            updateLetterCompleteAnimation();
        }
    }
    
    // 쪽지 완료 페이드 효과
    if (letterCompleteAnimation && letterFadeAlpha > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${letterFadeAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 페이드 효과
    if (deathAnimation && fadeAlpha > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 죽음 메시지 (fade out 중간에)
        if (fadeAlpha > 0.3 && fadeAlpha < 0.9) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, fadeAlpha * 2 - 0.6)})`;
            ctx.font = '36px "Georgia", serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('열쇠가 없다. . .', canvas.width / 2, canvas.height / 2 - 30);
            ctx.font = '28px "Georgia", serif';
            ctx.fillText('그리고... 모든 것이 어두워졌다.', canvas.width / 2, canvas.height / 2 + 30);
        }
    }
    
    // 다음 프레임
    requestAnimationFrame(gameLoop);
}