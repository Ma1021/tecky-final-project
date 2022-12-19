git filter-branch --force --index-filter \
'git rm -r --cached --ignore-unmatch \
  frontend/ios/DerivedData/ \
  frontend/android/app/build/ \
  frontend/ios/App/App/public/ \
  frontend/package-lock.json \
  backend/package-lock.json' \
--prune-empty \
-- --all

