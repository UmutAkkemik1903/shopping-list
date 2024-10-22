<h3>Proje Kurulumu:</h3>

<h5>Backend:</h5>
Projeyi klonladıktan sonra ana dizinde;

    cd backend
    composer install
    cp .env.example .env

env dosyanızda mysql bağlantısını kendi ayarlarıza göre düzenleyin.

    php artisan config:cache
    php artisan key:generate
    php artisan migrate:fresh --seed
    php artisan serv

<h5>Frontend:</h5>
Projenin ana dizininde;

    cd frontend
    npm install
    npm start

Kullanıcı Bilgileri;

    email    :  kullanici1@gmail.com
    password :  123456

    email    :  kullanici2@gmail.com
    password :  123456