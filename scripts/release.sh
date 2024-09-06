#!/bin/bash


# 명령어가 실패하면 즉시 종료
set -e

# 현재 package.json의 버전 읽기
current_version=$(node -p "require('./package.json').version")
echo "현재 버전: $current_version"

# Git 태그를 생성하지 않고 버전 번호 증가
new_version=${npm version --no-git-tag-version patch}
echo "새로운 버전: $new_version"

# 프로젝트 빌드
$(npm run build)


# 변경 사항 커밋
git add .
git commit -m "release: 새 배포 $new_version"

# 사용자에게 알림
echo "Released $new_version"