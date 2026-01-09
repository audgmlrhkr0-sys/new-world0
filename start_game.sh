#!/bin/bash
# 게임 실행 스크립트

# 스크립트가 있는 디렉토리로 이동
cd "$(dirname "$0")"

# Python 웹 서버를 백그라운드로 실행
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!

# 서버가 시작될 때까지 잠시 대기
sleep 1

# 브라우저로 게임 열기
xdg-open http://localhost:8000 2>/dev/null || \
chromium-browser http://localhost:8000 2>/dev/null || \
firefox http://localhost:8000 2>/dev/null

# 서버 종료를 위한 트랩 설정 (Ctrl+C로 종료 가능)
trap "kill $SERVER_PID 2>/dev/null; exit" INT TERM

# 서버가 실행 중인 동안 대기
wait $SERVER_PID


