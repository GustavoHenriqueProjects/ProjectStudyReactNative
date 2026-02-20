# Mostra os IPv4 do PC. Use o IP do adaptador Wi-Fi (geralmente 192.168.x.x).
# Nao use 172.20.x.x ou 172.17.x.x (sao Docker/WSL - o celular nao alcança).
$addr = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.InterfaceAlias -notmatch 'Loopback|vEthernet|WSL|Docker|Virtual'
} | Select-Object InterfaceAlias, IPAddress
$addr | Format-Table -AutoSize
Write-Host "Copie o IP do adaptador Wi-Fi (ex: 192.168.x.x) para o .env como HOST_IP=..." -ForegroundColor Yellow
