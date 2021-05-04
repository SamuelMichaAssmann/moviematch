# Domains: 
www.matchyourmovie.de, www.matchmovie.de

ip-adresse: 217.160.71.237
username: root
password: GroMMserver1301

# E-Mail:
user: noreply@matchyourmovie.de
pw: DaMiPaWo200!

user: service@matchyourmovie.de
pw: DaMiPaWo200!

# Path nginx:
sudo ln -s /etc/nginx/sites-available/moviematch.nginx /etc/nginx/sites-enabled/moviematch.nginx
sudo systemctl reload nginx
sudo nano /etc/nginx/sites-available/moviematch.nginx