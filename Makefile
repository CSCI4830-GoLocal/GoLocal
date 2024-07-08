run_backend:
	cd backend && python3 app/main.py

run_frontend:
	cd frontend && npm run dev

install_backend:
	cd backend && pipenv install && cd ..

install_frontend:
	cd frontend && npm install && cd ..