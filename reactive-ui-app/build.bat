rem cd c:\neel\wms-git\reactiveui\reactive-ui-app
call npm install
call npm audit fix
call ng build --prod
call docker build -t wms/wmsui .
