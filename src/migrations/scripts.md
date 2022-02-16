```bash
# entity class를 전부 정의하고 실제 데이터베이스엔 아무 테이블이 없는 초기 상태에서 테이블 만드는 명령어
npx mikro-orm migration:create --initial

# 이후 entity class의 수정사항이 생겨 테이블에도 수정이 필요해질 때
# Migration20220216023844.ts successfully created
npx mikro-orm migration:create

# 위 2가지 명령어로 만들어지는 건 테이블이 아니라 하나의 파일이다.
# 가장 최신에 만들어진 파일을 실행시켜주는 명렁어
# Processing 'Migration20220216023844'
# Applied 'Migration20220216023844'
# Successfully migrated up to the latest version
npx mikro-orm migration:up
```
