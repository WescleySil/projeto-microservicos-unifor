#!/bin/bash

cd /var/www
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
composer dump
php artisan serve --host=0.0.0.0 --port=80
