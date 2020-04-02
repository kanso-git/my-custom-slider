
@echo off
cd /d "C:\Program Files\Mozilla Firefox"
start firefox.exe  --kiosk "http://localhost:3000/"
timeout 10
cd /d "C:\VisualSutdioCode\sitel\x-leafit\aiec\my-react-custom-slider"
pause