# 1) Clone & enter
git clone <your-repo-url> blog-post
cd blog-post

# 2) Create environment file
.env
# (or create it yourself; see "Environment Variables")

# 3) Build & run
docker compose up -d --build

# 4) Open the app
# If nginx is mapped to 80:     http://localhost
# If you remapped to 8090:      http://localhost:8090
