install_backend:
	cd backend && pipenv install

install_frontend:
	cd frontend && npm install

run_backend: install_backend
	cd backend && python3 app/main.py

run_frontend: install_frontend
	cd frontend && npm run dev