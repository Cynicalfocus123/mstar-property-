param(
  [ValidateSet('init','start','stop','status')][string]$Action = 'status',
  [string]$Bin = $env:MSTAR_PG_BIN
)
$ErrorActionPreference = 'Stop'
$project = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$state = Join-Path $project '.local'
$data = Join-Path $state 'postgres-data'
if (!$Bin -or !(Test-Path -LiteralPath (Join-Path $Bin 'pg_ctl.exe'))) { throw 'Set MSTAR_PG_BIN to the existing PostgreSQL bin directory.' }
if ($Action -eq 'init') {
  if (Test-Path -LiteralPath (Join-Path $data 'PG_VERSION')) { throw 'Existing cluster preserved; use start instead.' }
  New-Item -ItemType Directory -Force $state | Out-Null
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
  & icacls.exe $state /inheritance:r /grant:r "${identity}:(OI)(CI)F" 'SYSTEM:(OI)(CI)F' | Out-Null
  if ($LASTEXITCODE) { throw 'Cannot protect local credential directory.' }
  $bytes = New-Object byte[] 32
  [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $secret = [BitConverter]::ToString($bytes).Replace('-', '').ToLowerInvariant()
  [IO.File]::WriteAllText((Join-Path $state 'postgres-password'), $secret)
  $passwordFile = Join-Path $state 'postgres-password'
  & (Join-Path $Bin 'initdb.exe') -D $data -U postgres --encoding=UTF8 --locale=C --auth=scram-sha-256 "--pwfile=$passwordFile" | Select-Object -Last 3
  if ($LASTEXITCODE) { throw 'initdb failed.' }
  Add-Content -LiteralPath (Join-Path $data 'postgresql.conf') -Value "`nlisten_addresses = '127.0.0.1'`nport = 5432`ntimezone = 'UTC'"
  $Action = 'start'
}
if ($Action -eq 'start') {
  & (Join-Path $Bin 'pg_ctl.exe') -D $data -l (Join-Path $state 'postgres.log') -w start
} elseif ($Action -eq 'stop') {
  & (Join-Path $Bin 'pg_ctl.exe') -D $data -m fast -w stop
} else {
  & (Join-Path $Bin 'pg_ctl.exe') -D $data status
}
if ($LASTEXITCODE) { throw "PostgreSQL $Action failed ($LASTEXITCODE)." }
