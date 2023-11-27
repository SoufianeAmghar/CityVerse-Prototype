
const initState = {
    data: [
        { x: 0.0, "PROPERTY": 0.0, "MARINE": 0.0, "ONSHORE PD": 0.0, "LLOYDS": 0, "Munich A": 0, "Munich B": 0, "Swiss Y1": 0, "Swiss Y4": 0 },
        { x: 1.0, "PROPERTY": 43.7, "MARINE": 41.7, "ONSHORE PD": 45.7, "LLOYDS": 22.4, "Munich A": 20.0, "Munich B": 12.5, "Swiss Y1": 3.0, "Swiss Y4": 15.0 },
        { x: 2.0, "PROPERTY": 49.5, "MARINE": 47.6, "ONSHORE PD": 51.4, "LLOYDS": 27.1, "Munich A": 32.5, "Munich B": 20.0, "Swiss Y1": 7.0, "Swiss Y4": 24.0 },
        { x: 3.0, "PROPERTY": 53.2, "MARINE": 51.4, "ONSHORE PD": 55.1, "LLOYDS": 33.4, "Munich A": 44.5, "Munich B": 24.0, "Swiss Y1": 9.0, "Swiss Y4": 33.0 },
        { x: 4.0, "PROPERTY": 56.0, "MARINE": 54.2, "ONSHORE PD": 57.9, "LLOYDS": 38.4, "Munich A": 49.0, "Munich B": 29.0, "Swiss Y1": 12.0, "Swiss Y4": 37.0 },
        { x: 5.0, "PROPERTY": 58.3, "MARINE": 56.6, "ONSHORE PD": 60.1, "LLOYDS": 42.5, "Munich A": 55.5, "Munich B": 31.3, "Swiss Y1": 14.0, "Swiss Y4": 42.0 },
        { x: 6.0, "PROPERTY": 60.3, "MARINE": 58.6, "ONSHORE PD": 62.0, "LLOYDS": 44.8, "Munich A": 57.5, "Munich B": 34.5, "Swiss Y1": 16.0, "Swiss Y4": 46.0 },
        { x: 7.0, "PROPERTY": 62.0, "MARINE": 60.3, "ONSHORE PD": 63.6, "LLOYDS": 47.1, "Munich A": 60.0, "Munich B": 37.5, "Swiss Y1": 18.0, "Swiss Y4": 49.0 },
        { x: 8.0, "PROPERTY": 63.5, "MARINE": 61.9, "ONSHORE PD": 65.1, "LLOYDS": 49.4, "Munich A": 62.0, "Munich B": 40.5, "Swiss Y1": 20.0, "Swiss Y4": 51.0 },
        { x: 9.0, "PROPERTY": 64.8, "MARINE": 63.3, "ONSHORE PD": 66.4, "LLOYDS": 51.7, "Munich A": 63.5, "Munich B": 43.0, "Swiss Y1": 22.0, "Swiss Y4": 53.0 },
        { x: 10.0, "PROPERTY": 66.1, "MARINE": 64.6, "ONSHORE PD": 67.6, "LLOYDS": 52.9, "Munich A": 65.5, "Munich B": 45.5, "Swiss Y1": 24.0, "Swiss Y4": 55.0 },
        { x: 11.0, "PROPERTY": 67.2, "MARINE": 65.7, "ONSHORE PD": 68.7, "LLOYDS": 54.2, "Munich A": 67.0, "Munich B": 47.5, "Swiss Y1": 25.0, "Swiss Y4": 57.0 },
        { x: 12.0, "PROPERTY": 68.3, "MARINE": 66.8, "ONSHORE PD": 69.7, "LLOYDS": 55.5, "Munich A": 68.5, "Munich B": 49.5, "Swiss Y1": 27.0, "Swiss Y4": 59.0 },
        { x: 13.0, "PROPERTY": 69.3, "MARINE": 67.9, "ONSHORE PD": 70.7, "LLOYDS": 56.5, "Munich A": 70.0, "Munich B": 52.0, "Swiss Y1": 28.0, "Swiss Y4": 60.0 },
        { x: 14.0, "PROPERTY": 70.2, "MARINE": 68.8, "ONSHORE PD": 71.6, "LLOYDS": 57.8, "Munich A": 71.0, "Munich B": 53.5, "Swiss Y1": 29.0, "Swiss Y4": 61.0 },
        { x: 15.0, "PROPERTY": 71.1, "MARINE": 69.7, "ONSHORE PD": 72.4, "LLOYDS": 59.0, "Munich A": 72.5, "Munich B": 55.3, "Swiss Y1": 30.0, "Swiss Y4": 63.0 },
        { x: 16.0, "PROPERTY": 71.9, "MARINE": 70.6, "ONSHORE PD": 73.2, "LLOYDS": 60.1, "Munich A": 73.5, "Munich B": 57.0, "Swiss Y1": 32.0, "Swiss Y4": 64.0 },
        { x: 17.0, "PROPERTY": 72.7, "MARINE": 71.4, "ONSHORE PD": 74.0, "LLOYDS": 61.2, "Munich A": 74.5, "Munich B": 59.0, "Swiss Y1": 33.0, "Swiss Y4": 65.0 },
        { x: 18.0, "PROPERTY": 73.4, "MARINE": 72.2, "ONSHORE PD": 74.7, "LLOYDS": 62.3, "Munich A": 76.0, "Munich B": 60.5, "Swiss Y1": 34.0, "Swiss Y4": 66.0 },
        { x: 19.0, "PROPERTY": 74.2, "MARINE": 72.9, "ONSHORE PD": 75.4, "LLOYDS": 	63.3, "Munich A": 	77.0, "Munich B": 	62.0, "Swiss Y1": 	35.0, "Swiss Y4": 	67.0 },
        { x: 20.0, "PROPERTY": 74.8, "MARINE": 73.7, "ONSHORE PD": 76.1, "LLOYDS": 	64.4, "Munich A": 	78.0, "Munich B": 	63.3, "Swiss Y1": 	36.0, "Swiss Y4":	67.0 },
        { x: 21.0, "PROPERTY": 75.5, "MARINE": 74.3, "ONSHORE PD": 76.7, "LLOYDS": 	65.3, "Munich A": 	78.8, "Munich B": 	65.0, "Swiss Y1": 	37.0, "Swiss Y4": 	68.0 },
        { x: 22.0, "PROPERTY": 76.1, "MARINE": 75.0, "ONSHORE PD": 77.3, "LLOYDS": 	66.2, "Munich A": 	79.8, "Munich B": 	66.0, "Swiss Y1": 	38.0, "Swiss Y4": 	69.0}, 
        { x: 23.0, "PROPERTY": 76.8, "MARINE": 75.6, "ONSHORE PD": 77.9, "LLOYDS": 	67.0, "Munich A": 	80.5, "Munich B": 	67.0, "Swiss Y1": 	39.0, "Swiss Y4": 	70.0}, 
        { x: 24.0, "PROPERTY": 77.3, "MARINE": 76.3, "ONSHORE PD": 78.5, "LLOYDS":	67.8, "Munich A": 	81.5, "Munich B": 	68.5, "Swiss Y1": 	40.0, "Swiss Y4": 	70.0 },
        { x: 25.0, "PROPERTY": 77.9, "MARINE": 76.8, "ONSHORE PD": 79.0, "LLOYDS":	68.8, "Munich A": 	82.3, "Munich B": 	69.8, "Swiss Y1": 	41.0, "Swiss Y4": 	71.0}, 
        { x: 26.0, "PROPERTY": 78.5, "MARINE": 77.4, "ONSHORE PD": 79.5, "LLOYDS": 	69.5, "Munich A": 	83.0, "Munich B": 	70.5, "Swiss Y1": 	42.0, "Swiss Y4": 	72.0 },
        { x: 27.0, "PROPERTY": 79.0, "MARINE": 78.0, "ONSHORE PD": 80.0, "LLOYDS": 	70.3, "Munich A": 	83.5, "Munich B": 	71.8, "Swiss Y1": 	43.0, "Swiss Y4": 	73.0 },
        { x: 28.0, "PROPERTY": 79.5, "MARINE": 78.5, "ONSHORE PD": 80.5, "LLOYDS": 	71.7, "Munich A": 	84.3, "Munich B": 	73.0, "Swiss Y1": 	44.0, "Swiss Y4": 	73.0 },
        {x:29.0	, "PROPERTY":80.0 ,	"MARINE":79.0 , "ONSHORE PD":	81.0, "LLOYDS": 	71.9, "Munich A": 	85.0, "Munich B": 	74.0, "Swiss Y1": 	45.0, "Swiss Y4": 	74.0 },
        {x:30.0	, "PROPERTY":80.5 ,	"MARINE":79.6 , "ONSHORE PD":	81.5, "LLOYDS": 	72.7, "Munich A": 	85.5, "Munich B": 	74.8, "Swiss Y1": 	46.0, "Swiss Y4": 	75.0}, 
        {x:31.0	, "PROPERTY":81.0 ,	"MARINE":80.0 , "ONSHORE PD":	81.9, "LLOYDS": 	73.5, "Munich A": 	86.0, "Munich B": 	75.8, "Swiss Y1": 	47.0, "Swiss Y4": 	76.0}, 
        {x:32.0	, "PROPERTY":81.5 ,	"MARINE":80.5 , "ONSHORE PD":	82.4, "LLOYDS": 	74.2, "Munich A": 	86.8, "Munich B": 	76.5, "Swiss Y1": 	48.0, "Swiss Y4": 	76.0}, 
        {x:33.0	, "PROPERTY":81.9 ,	"MARINE":81.0 , "ONSHORE PD":	82.8, "LLOYDS": 	74.9, "Munich A": 	87.3, "Munich B": 	77.5, "Swiss Y1": 	49.0, "Swiss Y4": 	77.0}, 
        {x:34.0	, "PROPERTY":82.4 ,	"MARINE":81.5 , "ONSHORE PD":	83.2, "LLOYDS": 	75.6, "Munich A": 	87.8, "Munich B": 	78.5, "Swiss Y1": 	50.0, "Swiss Y4": 	78.0}, 
        {x:35.0	, "PROPERTY":82.8 ,	"MARINE":81.9 , "ONSHORE PD":	83.7, "LLOYDS": 	76.2, "Munich A": 	88.3, "Munich B": 	79.3, "Swiss Y1": 	51.0, "Swiss Y4": 	79.0}, 
        {x:36.0	, "PROPERTY":83.2 ,	"MARINE":82.4 , "ONSHORE PD":	84.1, "LLOYDS": 	76.9, "Munich A": 	88.5, "Munich B": 	80.3, "Swiss Y1": 	52.0, "Swiss Y4": 	79.0}, 
        {x:37.0	, "PROPERTY":83.6 ,	"MARINE":82.8 , "ONSHORE PD":	84.4, "LLOYDS": 	77.7, "Munich A": 	89.0, "Munich B": 	81.0, "Swiss Y1": 	52.0, "Swiss Y4": 	80.0} ,
        {x:38.0	, "PROPERTY":84.0 ,	"MARINE":83.2 , "ONSHORE PD":	84.8, "LLOYDS": 	78.2, "Munich A": 	89.5, "Munich B": 	81.5, "Swiss Y1": 	53.0, "Swiss Y4": 	81.0} ,
        {x:39.0	, "PROPERTY":84.4 ,	"MARINE":83.6 , "ONSHORE PD":	85.2, "LLOYDS": 	78.9, "Munich A": 	90.0, "Munich B": 	82.3, "Swiss Y1": 	54.0, "Swiss Y4": 	81.0} ,
        {x:40.0	, "PROPERTY":84.8 ,	"MARINE":84.0 , "ONSHORE PD":	85.6, "LLOYDS": 	79.4, "Munich A": 	90.5, "Munich B": 	83.3, "Swiss Y1": 	55.0, "Swiss Y4": 	82.0} ,
        {x:41.0	, "PROPERTY":85.2 ,	"MARINE":84.4 , "ONSHORE PD":	85.9, "LLOYDS": 	79.9, "Munich A": 	91.0, "Munich B": 	83.8, "Swiss Y1": 	56.0, "Swiss Y4": 	83.0} ,
        {x:42.0	, "PROPERTY":85.5 ,	"MARINE":84.8 , "ONSHORE PD":	86.3, "LLOYDS": 	80.3, "Munich A": 	91.5, "Munich B": 	84.5, "Swiss Y1": 	57.0, "Swiss Y4": 	83.0},
        {x:43.0	, "PROPERTY":85.9 ,	"MARINE":85.2 , "ONSHORE PD":	86.6, "LLOYDS": 	80.7, "Munich A": 	91.8, "Munich B": 	85.3, "Swiss Y1": 	58.0, "Swiss Y4": 	84.0},
        {x:44.0	, "PROPERTY":86.3 ,	"MARINE":85.6 , "ONSHORE PD":	87.0, "LLOYDS": 	81.2, "Munich A": 	92.0, "Munich B": 	86.0, "Swiss Y1": 	59.0, "Swiss Y4": 	84.0} ,
        {x:45.0	, "PROPERTY":86.6 ,	"MARINE":85.9 , "ONSHORE PD":	87.3, "LLOYDS": 	81.6, "Munich A": 	92.5, "Munich B": 	86.5, "Swiss Y1": 	60.0, "Swiss Y4": 	85.0} ,
        {x:46.0	, "PROPERTY":87.0 ,	"MARINE":86.3 , "ONSHORE PD":	87.6, "LLOYDS": 	82.0, "Munich A": 	92.8, "Munich B": 	87.0, "Swiss Y1": 	61.0, "Swiss Y4": 	86.0} ,
        {x:47.0	, "PROPERTY":87.3 ,	"MARINE":86.6 , "ONSHORE PD":	88.0, "LLOYDS": 	82.3, "Munich A": 	93.3, "Munich B": 	87.5, "Swiss Y1": 	62.0, "Swiss Y4": 	86.0} ,
        {x:48.0	, "PROPERTY":87.6 ,	"MARINE":87.0 , "ONSHORE PD":	88.3, "LLOYDS": 	82.7, "Munich A": 	93.5, "Munich B": 	88.0, "Swiss Y1": 	63.0, "Swiss Y4": 	87.0} ,
        {x:49.0	, "PROPERTY":87.9 ,	"MARINE":87.3 , "ONSHORE PD":	88.6, "LLOYDS": 	83.1, "Munich A": 	93.8, "Munich B": 	88.5, "Swiss Y1": 	63.0, "Swiss Y4": 	87.0} ,
        {x:50.0	, "PROPERTY":88.3 ,	"MARINE":87.7 , "ONSHORE PD":	88.9, "LLOYDS": 	83.5, "Munich A": 	94.0, "Munich B": 	89.3, "Swiss Y1": 	64.0, "Swiss Y4": 	88.0} ,
        {x:51.0	, "PROPERTY":88.6 ,	"MARINE":88.0 , "ONSHORE PD":	89.2, "LLOYDS": 	83.9, "Munich A": 	94.3, "Munich B": 	89.8, "Swiss Y1": 	65.0, "Swiss Y4": 	88.0} ,
        {x:52.0	, "PROPERTY":88.9 ,	"MARINE":88.3 , "ONSHORE PD":	89.5, "LLOYDS": 	84.3, "Munich A": 	94.8, "Munich B": 	90.3, "Swiss Y1": 	66.0, "Swiss Y4": 	89.0} ,
        {x:53.0	, "PROPERTY":89.2 ,	"MARINE":88.6 , "ONSHORE PD":	89.8, "LLOYDS": 	84.7, "Munich A": 	95.0, "Munich B": 	90.8, "Swiss Y1": 	67.0, "Swiss Y4": 	89.0} ,
        {x:54.0	, "PROPERTY":89.5 ,	"MARINE":89.0 , "ONSHORE PD":	90.1, "LLOYDS": 	85.0, "Munich A": 	95.3, "Munich B": 	91.3, "Swiss Y1": 	68.0, "Swiss Y4": 	90.0} ,
        {x:55.0	, "PROPERTY":89.8 ,	"MARINE":89.3 , "ONSHORE PD":	90.3, "LLOYDS": 	85.4, "Munich A": 	95.5, "Munich B": 	91.5, "Swiss Y1": 	69.0, "Swiss Y4": 	90.0} ,
        {x:56.0	, "PROPERTY":90.1 ,	"MARINE":89.6 , "ONSHORE PD":	90.6, "LLOYDS": 	85.8, "Munich A": 	95.8, "Munich B": 	92.3, "Swiss Y1": 	70.0, "Swiss Y4": 	90.0} ,
        {x:57.0	, "PROPERTY":90.4 ,	"MARINE":89.9 , "ONSHORE PD":	90.9, "LLOYDS": 	86.1, "Munich A": 	96.0, "Munich B": 	92.5, "Swiss Y1": 	71.0, "Swiss Y4": 	91.0} ,
        {x:58.0	, "PROPERTY":90.7 ,	"MARINE":90.2 , "ONSHORE PD":	91.2, "LLOYDS": 	86.5, "Munich A": 	96.3, "Munich B": 	93.0, "Swiss Y1": 	72.0, "Swiss Y4": 	91.0} ,
        {x:59.0	, "PROPERTY":90.9 ,	"MARINE":90.5 , "ONSHORE PD":	91.4, "LLOYDS": 	86.9, "Munich A": 	96.5, "Munich B": 	93.5, "Swiss Y1": 	72.0, "Swiss Y4": 	91.0} ,
        {x:60.0	, "PROPERTY":91.2 ,	"MARINE":90.8 , "ONSHORE PD":	91.7, "LLOYDS": 	87.2, "Munich A": 	96.8, "Munich B": 	93.8, "Swiss Y1": 	73.0, "Swiss Y4": 	92.0} ,
        {x:61.0	, "PROPERTY":91.5 ,	"MARINE":91.0 , "ONSHORE PD":	91.9, "LLOYDS": 	87.5, "Munich A": 	96.1, "Munich B": 	94.0, "Swiss Y1": 	74.0, "Swiss Y4": 	92.0} ,
        {x:62.0	, "PROPERTY":91.8 ,	"MARINE":91.3 , "ONSHORE PD":	92.2, "LLOYDS": 	87.9, "Munich A": 	97.0, "Munich B": 	94.5, "Swiss Y1": 	75.0, "Swiss Y4": 	92.0} ,
        {x:63.0	, "PROPERTY":92.0 ,	"MARINE":91.6 , "ONSHORE PD":	92.4, "LLOYDS": 	88.2, "Munich A": 	97.3, "Munich B": 	95.0, "Swiss Y1": 	76.0, "Swiss Y4": 	92.0} ,
        {x:64.0	, "PROPERTY":92.3 ,	"MARINE":91.9 , "ONSHORE PD":	92.7, "LLOYDS": 	88.5, "Munich A": 	97.4, "Munich B": 	95.2, "Swiss Y1": 	77.0, "Swiss Y4": 	93.0} ,
        {x:65.0	, "PROPERTY":92.5 ,	"MARINE":92.1 , "ONSHORE PD":	92.9, "LLOYDS": 	88.9, "Munich A": 	97.5, "Munich B": 	95.3, "Swiss Y1": 	77.0, "Swiss Y4": 	93.0} ,
        {x:66.0	, "PROPERTY":92.8 ,	"MARINE":92.4 , "ONSHORE PD":	93.2, "LLOYDS": 	89.2, "Munich A": 	97.8, "Munich B": 	95.5, "Swiss Y1": 	78.0, "Swiss Y4": 	93.0} ,
        {x:67.0	, "PROPERTY":93.0 ,	"MARINE":92.7 , "ONSHORE PD":	93.4, "LLOYDS": 	89.6, "Munich A": 	98.0, "Munich B": 	96.0, "Swiss Y1": 	79.0, "Swiss Y4": 	93.0} ,
        {x:68.0	, "PROPERTY":93.3 ,	"MARINE":92.9 , "ONSHORE PD":	93.7, "LLOYDS": 	89.9, "Munich A": 	98.1, "Munich B": 	96.3, "Swiss Y1": 	80.0, "Swiss Y4": 	94.0} ,
        {x:69.0	, "PROPERTY":93.5 ,	"MARINE":93.2 , "ONSHORE PD":	93.9, "LLOYDS": 	90.2, "Munich A": 	98.3, "Munich B": 	96.5, "Swiss Y1": 	80.0, "Swiss Y4": 	94.0} ,
        {x:70.0	, "PROPERTY":93.8 ,	"MARINE":93.4 , "ONSHORE PD":	94.1, "LLOYDS": 	90.6, "Munich A": 	98.4, "Munich B": 	96.8, "Swiss Y1": 	81.0, "Swiss Y4": 	94.0} ,
        {x:71.0	, "PROPERTY":94.0 ,	"MARINE":93.7 , "ONSHORE PD":	94.3, "LLOYDS": 	91.0, "Munich A": 	98.5, "Munich B": 	97.2, "Swiss Y1": 	81.0, "Swiss Y4": 	94.0} ,
        {x:72.0	, "PROPERTY":94.3 ,	"MARINE":93.9 , "ONSHORE PD":	94.6, "LLOYDS": 	91.3, "Munich A": 	98.7, "Munich B": 	97.3, "Swiss Y1": 	82.0, "Swiss Y4": 	94.0} ,
        {x:73.0	, "PROPERTY":94.5 ,	"MARINE":94.2 , "ONSHORE PD":	94.8, "LLOYDS": 	91.6, "Munich A": 	98.9, "Munich B": 	97.4, "Swiss Y1": 	83.0, "Swiss Y4": 	95.0} ,
        {x:74.0	, "PROPERTY":94.7 ,	"MARINE":94.4 , "ONSHORE PD":	95.0, "LLOYDS": 	91.9, "Munich A": 	99.0, "Munich B": 	97.5, "Swiss Y1": 	83.0, "Swiss Y4": 	95.0} ,
        {x:75.0	, "PROPERTY":95.0 ,	"MARINE":94.7 , "ONSHORE PD":	95.2, "LLOYDS": 	92.2, "Munich A": 	99.2, "Munich B": 	97.5, "Swiss Y1": 	84.0, "Swiss Y4": 	95.0} ,
        {x:76.0	, "PROPERTY":95.2 ,	"MARINE":94.9 , "ONSHORE PD":	95.4, "LLOYDS": 	92.6, "Munich A": 	99.3, "Munich B": 	97.6, "Swiss Y1": 	85.0, "Swiss Y4": 	95.0} ,
        {x:77.0	, "PROPERTY":95.4 ,	"MARINE":95.2 , "ONSHORE PD":	95.7, "LLOYDS": 	93.0, "Munich A": 	99.4, "Munich B": 	97.9, "Swiss Y1": 	85.0, "Swiss Y4": 	96.0} ,
        {x:78.0	, "PROPERTY":95.6 ,	"MARINE":95.4 , "ONSHORE PD":	95.9, "LLOYDS": 	93.3, "Munich A": 	99.6, "Munich B": 	98.0, "Swiss Y1": 	86.0, "Swiss Y4": 	96.0},
        {x:79.0	, "PROPERTY":95.8 ,	"MARINE":95.6 , "ONSHORE PD":	96.1, "LLOYDS": 	93.7, "Munich A": 	99.8, "Munich B": 	98.2, "Swiss Y1": 	86.0, "Swiss Y4": 	96.0} ,
        {x:80.0	, "PROPERTY":96.1 ,	"MARINE":95.8 , "ONSHORE PD":	96.3, "LLOYDS": 	94.0, "Munich A": 	99.8, "Munich B": 	98.3, "Swiss Y1": 	87.0, "Swiss Y4": 	96.0} ,
        {x:81.0	, "PROPERTY":96.3 ,	"MARINE":96.1 , "ONSHORE PD":	96.5, "LLOYDS": 	94.3, "Munich A": 	99.8, "Munich B": 	98.4, "Swiss Y1": 	88.0, "Swiss Y4": 	97.0} ,
        {x:82.0	, "PROPERTY":96.5 ,	"MARINE":96.3 , "ONSHORE PD":	96.7, "LLOYDS": 	94.7, "Munich A": 	99.8, "Munich B": 	98.6, "Swiss Y1": 	88.0, "Swiss Y4": 	97.0} ,
        {x:83.0	, "PROPERTY":96.7 ,	"MARINE":96.5 , "ONSHORE PD":	96.9, "LLOYDS": 	95.0, "Munich A": 	99.8, "Munich B": 	98.7, "Swiss Y1": 	89.0, "Swiss Y4": 	97.0} ,
        {x:84.0	, "PROPERTY":96.9 ,	"MARINE":96.7 , "ONSHORE PD":	97.1, "LLOYDS": 	95.3, "Munich A": 	99.8, "Munich B": 	98.9, "Swiss Y1": 	90.0, "Swiss Y4": 	98.0} ,
        {x:85.0	, "PROPERTY":97.1 ,	"MARINE":97.0 , "ONSHORE PD":	97.3, "LLOYDS": 	95.7, "Munich A": 	99.8, "Munich B": 	99.0, "Swiss Y1": 	90.0, "Swiss Y4": 	98.0} ,
        {x:86.0	, "PROPERTY":97.3 ,	"MARINE":97.2 , "ONSHORE PD":	97.5, "LLOYDS": 	96.0, "Munich A": 	99.9, "Munich B": 	99.1, "Swiss Y1": 	91.0, "Swiss Y4": 	98.0} ,
        {x:87.0	, "PROPERTY":97.5 ,	"MARINE":97.4 , "ONSHORE PD":	97.7, "LLOYDS": 	96.3, "Munich A": 	99.9, "Munich B": 	99.2, "Swiss Y1": 	91.0, "Swiss Y4": 	98.0} ,
        {x:88.0	, "PROPERTY":97.7 ,	"MARINE":97.6 , "ONSHORE PD":	97.9, "LLOYDS": 	96.6, "Munich A": 	99.9, "Munich B": 	99.3, "Swiss Y1": 	92.0, "Swiss Y4": 	99.0} ,
        {x:89.0	, "PROPERTY":97.9 ,	"MARINE":97.8 , "ONSHORE PD":	98.0, "LLOYDS": 	97.0, "Munich A": 	100.0, "Munich B": 	99.4, "Swiss Y1": 	92.0, "Swiss Y4": 	99.0} ,
        {x:90.0	, "PROPERTY":98.1 ,	"MARINE":98.0 , "ONSHORE PD":	98.2, "LLOYDS": 	97.3, "Munich A": 	100.0, "Munich B": 	99.5, "Swiss Y1": 	93.0, "Swiss Y4": 	99.0} ,
        {x:91.0	, "PROPERTY":98.3 ,	"MARINE":98.2 , "ONSHORE PD":	98.4, "LLOYDS": 	97.6, "Munich A": 	100.0, "Munich B": 	99.6, "Swiss Y1": 	94.0, "Swiss Y4": 	99.0} ,
        {x:92.0	, "PROPERTY":98.5 ,	"MARINE":98.4 , "ONSHORE PD":	98.6, "LLOYDS": 	97.9, "Munich A": 	100.0, "Munich B": 	99.6, "Swiss Y1": 	94.0, "Swiss Y4": 	99.0} ,
        {x:93.0	, "PROPERTY":98.7 ,	"MARINE":98.6 , "ONSHORE PD":	98.8, "LLOYDS": 	98.2, "Munich A": 	100.0, "Munich B": 	99.7, "Swiss Y1": 	95.0, "Swiss Y4": 	99.0} ,
        {x:94.0	, "PROPERTY":98.9 ,	"MARINE":98.8 , "ONSHORE PD":	99.0, "LLOYDS": 	98.4, "Munich A": 	100.0, "Munich B": 	99.7, "Swiss Y1": 	96.0, "Swiss Y4": 	99.0} ,
        {x:95.0	, "PROPERTY":99.1 ,	"MARINE":99.0 , "ONSHORE PD":	99.1, "LLOYDS": 	98.6, "Munich A": 	100.0, "Munich B": 	99.8, "Swiss Y1": 	96.0, "Swiss Y4": 	100.0} ,
        {x:96.0	, "PROPERTY":99.3 ,	"MARINE":99.2 , "ONSHORE PD":	99.3, "LLOYDS": 	98.8, "Munich A": 	100.0, "Munich B": 	99.8, "Swiss Y1": 	97.0, "Swiss Y4": 	100.0} ,
        {x:97.0	, "PROPERTY":99.5 ,	"MARINE":99.4 , "ONSHORE PD":	99.5, "LLOYDS": 	99.0, "Munich A": 	100.0, "Munich B": 	99.9, "Swiss Y1": 	98.0, "Swiss Y4": 	100.0} ,
        {x:98.0	, "PROPERTY":99.6 ,	"MARINE":99.6 , "ONSHORE PD":	99.7, "LLOYDS": 	99.2, "Munich A": 	100.0, "Munich B": 	99.9, "Swiss Y1": 	98.0, "Swiss Y4": 	100.0} ,
        {x:99.0	, "PROPERTY":99.8 ,	"MARINE":99.8 , "ONSHORE PD":	99.8, "LLOYDS": 	99.5, "Munich A": 	100.0, "Munich B": 	100.0, "Swiss Y1": 	99.0, "Swiss Y4": 	100.0 },
        {x:100.0, "PROPERTY":100.0 ,"MARINE":100.0 , "ONSHORE PD":	100.0, "LLOYDS": 	100.0, "Munich A": 	100.0, "Munich B": 	100.0, "Swiss Y1": 	100.0, "Swiss Y4": 	100.0} ,
    ],
    courbe1: "PROPERTY",
    courbe2: "MARINE",
    courbe3: "ONSHORE PD",
    courbe4: "LLOYDS",
    courbe5: "Munich A",
    courbe6: "Munich B",
    courbe7: "Swiss Y1",
    courbe8: "Swiss Y4"
};

const CourbeReducer = (state = initState, action) => {
    switch (action.type) {
        case "data":
            return {
                ...state,
                data: action.data,
            }
        case "courbe1":
            return {
                ...state,
                courbe1: action.courbe1,
            }
        case "courbe2":
            return {
                ...state,
                courbe2: action.courbe2,
            }
        case "courbe3":
            return {
                ...state,
                courbe3: action.courbe3,
            }
        case "courbe4":
            return {
                ...state,
                courbe4: action.courbe4,
            }
        case "courbe5":
            return {
                ...state,
                courbe5: action.courbe5,
            }
        case "courbe6":
            return {
                ...state,
                courbe6: action.courbe6,
            }
        case "courbe7":
            return {
                ...state,
                courbe7: action.courbe7,
            }
        case "courbe8":
            return {
                ...state,
                courbe8: action.courbe8,
            }
        default:
            return state;
    }
}

export default CourbeReducer