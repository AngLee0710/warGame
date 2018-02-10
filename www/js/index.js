$(document).ready(function() {
    var CL = console.log;
    //村民
    var villagers = 5;

    var buildingLevelChinese = ['尚未擁有', '等級一', '等級二', '等級三', '等級四',
     '等級五', '等級六', '等級七', '等級八', '等級九', '等級十'];

    //初始化
    $('#villagers').html(villagers);
    $('#rice').hide();
    $('#food').hide();
    $('#wood').hide();
    $('#rock').hide();
    $('#iron').hide();

    //滑鼠事件

    //農夫
    $('#farmersUpper').click(farmersUpperFuc);

    function farmersUpperFuc() {
        var temp = $('#farmers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#farmers').html(temp);
    }

    $('#farmersLower').click(farmersLowerFuc);

    function farmersLowerFuc() {
        var temp = $('#farmers').html();
        if(temp == 0)
            temp = 0;
        else{
            temp--;
            villagers++;
        }
        $('#farmers').html(temp);
    }

    $('#farmersUpper').mousedown(function() {
        var a = setInterval(farmersUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    $('#farmersLower').mousedown(function() {
        var a = setInterval(farmersLowerFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        });
    });

    //廚夫
    $('#cooksUpper').click(cooksUpperFuc);

    function cooksUpperFuc() {
        var temp = $('#cooks').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#cooks').html(temp);
    }

    $('#cooksLower').click(cooksLowerFuc);

    function cooksLowerFuc() {
        var temp = $('#cooks').html();
        if(temp == 0)
            temp = 0
        else{
            temp--;
            villagers++;
        }
        $('#cooks').html(temp);
    }

    $('#cooksUpper').mousedown(function() {
        var a = setInterval(cooksUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    $('#cooksLower').mousedown(function() {
        var a = setInterval(cooksLowerFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        });
    });

    //伐木工
    $('#lumberjackUpper').click(lumberjackUpperFuc);

    function lumberjackUpperFuc() {
        var temp = $('#lumberjack').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#lumberjack').html(temp);
    }

    $('#lumberjackLower').click(lumberjackLowerFuc);

    function lumberjackLowerFuc() {
        var temp = $('#lumberjack').html();
        if(temp == 0)
            temp = 0
        else{
            temp--;
            villagers++;
        }
        $('#lumberjack').html(temp);
    }

    $('#lumberjackUpper').mousedown(function() {
        var a = setInterval(lumberjackUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    $('#lumberjackLower').mousedown(function() {
        var a = setInterval(lumberjackLowerFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        });
    });

    //石礦工
    $('#rockWorkersUpper').click(rockWorkersUpperFuc);

    function rockWorkersUpperFuc() {
        var temp = $('#rockWorkers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#rockWorkers').html(temp);
    }

    $('#rockWorkersLower').click(rockWorkersLowerFuc);

    function rockWorkersLowerFuc() {
        var temp = $('#rockWorkers').html();
        if(temp == 0)
            temp = 0
        else{
            temp--;
            villagers++;
        }
        $('#rockWorkers').html(temp);
    }

    $('#rockWorkersUpper').mousedown(function() {
        var a = setInterval(rockWorkersUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    $('#rockWorkersLower').mousedown(function() {
        var a = setInterval(rockWorkersLowerFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        });
    });

    //鐵礦工
    $('#ironWorkersUpper').click(ironWorkersUpperFuc);

    function ironWorkersUpperFuc() {
        var temp = $('#ironWorkers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#ironWorkers').html(temp);
    }

    $('#ironWorkersLower').click(ironWorkersLowerFuc);

    function ironWorkersLowerFuc() {
        var temp = $('#ironWorkers').html();
        if(temp == 0)
            temp = 0
        else{
            temp--;
            villagers++;
        }
        $('#ironWorkers').html(temp);
    }

    $('#ironWorkersUpper').mousedown(function() {
        var a = setInterval(ironWorkersUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    $('#ironWorkersLower').mousedown(function() {
        var a = setInterval(ironWorkersLowerFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        });
    });

    //建築
    //房屋
    $('#houseMake').click(houseUpperFuc);

    function houseUpperFuc() {
        var temp = $('#house').html();
        var woodValue = parseInt($('#woodValue').html());
        if($('#woodValue').html() >= 20){
            temp++;
            woodValue -= 20;
            villagers += 5;
        }
        $('#house').html(temp);
        $('#woodValue').html(woodValue);
    }

    $('#houseMake').mousedown(function() {
        var a = setInterval(houseUpperFuc, 200);
        $(document).mouseup(function() {
            clearInterval(a);
        }); 
    });

    //鐵工廠

    //鐵工廠 材料需求
    var arsenalWood = [150, 500, 1000, 5000, 9500, 25000, 100000, 250000, 500000, 1000000];
    var arsenalRock = [0, 200, 500, 1000, 5000, 9500, 25000, 100000, 250000, 500000];

    //鐵工廠Level
    var arsenalLevel = 0;
    $('#arsenal').click(function() {
        if(parseInt($('#woodValue').html()) >= arsenalWood[arsenalLevel] && parseInt($('#rockValue').html()) >= arsenalRock[arsenalLevel]){
            arsenalLevel++;
            $('#arsenal').text(buildingLevelChinese[arsenalLevel]);
            $('#arsenalText').html('木頭:' + arsenalWood[arsenalLevel] + '  石頭:' + arsenalRock[arsenalLevel]);
            CL('#');
        }

    });

    //生產

    function counting() {
        //稻米
        var rice = parseInt($('#riceValue').html());
        //糧食
        var food = parseInt($('#foodValue').html());
        //木頭
        var wood = parseInt($('#woodValue').html());
        //石頭
        var rock = parseInt($('#rockValue').html());
        //鐵
        var iron = parseInt($('#ironValue').html());

        //房屋
        var house = parseInt($('#house').html());

        //農夫
        var farmers = parseInt($('#farmers').html());
        //廚夫
        var cooks = parseInt($('#cooks').html());
        //伐木工
        var lumberjack = parseInt($('#lumberjack').html());
        //石礦工
        var rockWorkers = parseInt($('#rockWorkers').html());
        //鐵礦工
        var ironWorkers = parseInt($('#ironWorkers').html());
        
        //村民
        var villagersHTML = villagers +  '/' + ( 5 + ( house * 5 ) );  

        //稻米
        var riceSum = 0;
        //糧食
        var foodSum = 0;
        //木頭
        var woodSum = 0;
        //石頭
        var rockSum = 0;
        //鐵
        var ironSum = 0;

        //木工缺糧
        var foodOfWoodLack = 0;
        //鐵礦工缺糧
        var foodOfIronLack = 0;
        //石礦工缺糧
        var foodOfRockLack = 0;

        //稻米生產計算
        riceSum = (rice + farmers) - (cooks * 2);

        //糧食生產計算
        if(riceSum < 0){
            riceSum += (cooks * 2);
            foodSum = food;
        }
        else{
            foodSum = food + cooks;
        }

        foodSum -= lumberjack;
        if(foodSum <= 0){
            foodOfWoodLack = 1;
            foodOfIronLack = 1;
            foodOfRockLack = 1;
            foodSum += lumberjack;
            woodSum = wood;
        }else{
            foodSum -= rockWorkers * 2;
            if(foodSum <= 1){
                foodOfRockLack = 1;
                foodOfIronLack = 1;
                foodSum += rockWorkers * 2;
            }else{
                foodSum -= ironWorkers * 4;
                if(foodSum <= 3){
                    foodOfIronLack = 1;
                    foodSum += ironWorkers * 4;
                }
            }
        }
        
        //木頭生產計算
        woodSum = wood + lumberjack;
        if(foodOfWoodLack){
            foodOfWoodLack = 0;
            woodSum -= lumberjack;
        }

        //石頭生產計算
        rockSum = rock + rockWorkers;
        if(foodOfRockLack){
            foodOfRockLack = 0;
            woodSum -= rockWorkers;
        }

        //鐵生產計算 
        ironSum = iron + ironWorkers;
        if(foodOfIronLack){
            foodOfIronLack = 0;
            ironSum -= ironWorkers;
        }




        showStorge(riceSum, foodSum, woodSum, rockSum, ironSum);
        updateStorge(villagersHTML ,riceSum, foodSum, woodSum, rockSum, ironSum);
        var a = setTimeout(counting, 200);
    }
    counting();

    function showStorge(rice, food, wood, rock, iron) {
        if(rice != 0)
            $('#rice').show();
        if(food != 0)
            $('#food').show();
        if(wood != 0)
            $('#wood').show();
        if(rock != 0)
            $('#rock').show();
        if(iron != 0)
            $('#iron').show();
    }

    function updateStorge(villagers, rice, food, wood, rock, iron) {
        $('#villagers').html(villagers);
        $('#riceValue').html(rice);
        $('#foodValue').html(food);
        $('#woodValue').html(wood);
        $('#rockValue').html(rock);
        $('#ironValue').html(iron);
    }
});