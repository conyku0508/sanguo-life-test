// 遊戲用州域導覽；輪廓與分界自行繪製，未作184年精確史圖核定。
export const provinces=[
 {id:'liang',name:'涼州',x:24,y:25,color:'#9d9670',path:'M55 220 140 180 240 210 310 180 440 230 460 360 380 405 270 390 180 445 90 380 35 310Z'},
 {id:'bing',name:'并州',x:50,y:25,color:'#94a480',path:'M440 230 480 180 570 200 600 285 580 390 520 430 460 360Z'},
 {id:'you',name:'幽州',x:76,y:14,color:'#809d8d',path:'M570 200 650 170 735 200 825 130 920 150 955 230 910 310 855 330 835 280 760 295 700 330 600 285Z'},
 {id:'ji',name:'冀州',x:65,y:35,color:'#b4a476',path:'M600 285 700 330 760 295 780 390 730 445 650 465 580 390Z'},
 {id:'qing',name:'青州',x:84,y:40,color:'#b59b74',path:'M780 390 825 365 850 395 930 390 910 430 840 470 790 500 730 445Z'},
 {id:'sili',name:'司隸',x:43,y:44,color:'#bda579',path:'M380 405 460 360 520 430 580 390 650 465 620 525 540 550 465 520 390 545 320 490 270 390Z'},
 {id:'yan',name:'兗州',x:68,y:49,color:'#bba573',path:'M650 465 730 445 790 500 735 565 675 555 620 525Z'},
 {id:'xu',name:'徐州',x:82,y:58,color:'#b4ad83',path:'M790 500 820 520 835 600 870 655 800 690 735 625 735 565Z'},
 {id:'yu',name:'豫州',x:59,y:59,color:'#c2ab72',path:'M540 550 620 525 675 555 735 565 735 625 660 680 570 660 500 610 465 520Z'},
 {id:'yi',name:'益州',x:28,y:68,color:'#8f9c79',path:'M320 490 390 545 465 520 500 610 455 700 465 810 390 870 310 850 230 910 180 855 200 760 155 685 190 600 260 585Z'},
 {id:'jing',name:'荊州',x:53,y:75,color:'#9aaa80',path:'M500 610 570 660 660 680 630 785 665 860 565 900 465 870 390 870 465 810 455 700Z'},
 {id:'yang',name:'揚州',x:77,y:77,color:'#a8b18c',path:'M735 625 800 690 870 655 910 705 875 760 860 820 810 855 785 915 700 920 665 860 630 785 660 680Z'},
 {id:'jiao',name:'交州',x:43,y:93,color:'#95a58c',path:'M230 910 310 850 390 870 465 870 565 900 665 860 700 920 640 955 550 965 500 990 415 980 350 1030 310 1060 265 1010 280 950Z'},
];
export const cityProvince={yingchuan:'yu',runan:'yu',chenliu:'yan',luoyang:'sili'};
export const provinceById=id=>provinces.find(p=>p.id===id)??null;
export const provinceCities=id=>Object.keys(cityProvince).filter(cityId=>cityProvince[cityId]===id);
export const provinceOf=cityId=>cityProvince[cityId]??null;
export const isProvinceOpen=id=>provinceCities(id).length>0;
export const geographicNote='州名、位置與邊界為遊戲導覽示意；非184年精確疆域或勢力圖。';
