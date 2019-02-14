call npm install 
rem call npm install -g npm
call npm audit fix
call ng build --prod
call docker build -t wms/wmsui .

