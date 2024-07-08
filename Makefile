install_backend:
	cd backend && pipenv install

install_frontend:
	cd frontend && npm install

run_backend: 
	make install_backend
	cd backend && python3 -m app.main

run_frontend: 
	make install_frontend
	cd frontend && npm run dev

test:
	cd backend && pipenv run pytest -p no:warnings