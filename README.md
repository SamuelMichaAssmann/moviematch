# Start
npm start
npm run api

# Deploy
npm install
npm run build


# Server
git pull
sudo systemctl reload nginx

# Venv
### Install
pip install virtualenv
virtualenv venv

### Activate
.\backend\venv\Scripts\activate.ps1
Bei Fehlern:
 - https://stackoverflow.com/questions/18713086/virtualenv-wont-activate-on-windows/18713789

 ### In (venv)
 pip install flask python-dotenv gunicorn

# gunicorn
sudo systemctl daemon-reload
sudo systemctl start moviematch
sudo systemctl status moviematch
