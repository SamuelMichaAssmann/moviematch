# Start
npm start
npm run api

### Install venv
pip install virtualenv
virtualenv venv

### Activate venv
.\backend\venv\Scripts\activate.ps1
(Bei Fehlern)[https://stackoverflow.com/questions/18713086/virtualenv-wont-activate-on-windows/18713789]

### Setup venv
pip install flask python-dotenv gunicorn

# gunicorn
sudo systemctl daemon-reload
sudo systemctl start moviematch
sudo systemctl status moviematch

# nginx
sudo systemctl reload nginx

