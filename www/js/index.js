$(document).ready(function() {
    var CL = console.log;
    //村民
    var villagers = 5;
    //時間函數
    var time;

    var buildingLevelChinese = ['尚未擁有', '等級一', '等級二', '等級三', '等級四',
     '等級五', '等級六', '等級七', '等級八', '等級九', '等級十'];

    //初始化
    $('#villagers').html(villagers);
    $('#rice').hide();
    $('#food').hide();
    $('#wood').hide();
    $('#rock').hide();
    $('#iron').hide();

    //滑鼠監聽事件
    document.addEventListener('click', function(dom) {
        var fuc =  dom.path[0].id + 'Fuc()';
        eval(fuc);
    }, false);

    document.addEventListener('touchstart', function(dom) {
        setTime(dom.path[0].id);
    }, false)

    document.addEventListener('touchend', function() {
        clearInterval(time);
    }, false)

    function setTime(id) {
        var fuc = 'setInterval(' + id + 'Fuc, 200)';
        time = eval(fuc);
    }
    function clearTime(id) {
        clearInterval(a);
    }

    //遮罩效果
    //農夫
    // $('#farmers').click(function(){
    //     $('.bg').css({'display':'block'});
    //     $('.content').css({'display':'block'});
    // });
    // $('.bg').click(function(){
    //     $('.bg').css({'display':'none'});
    //     $('.content').css({'display':'none'});
    // });
    $('#people > span').click(function() {
        CL(this.id);
    });

    //滑鼠事件

    //農夫

    function farmersUpperFuc() {
        var temp = $('#farmers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#farmers').html(temp);
    }

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

    //廚夫

    function cooksUpperFuc() {
        var temp = $('#cooks').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#cooks').html(temp);
    }

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

    //伐木工
    function lumberjackUpperFuc() {
        var temp = $('#lumberjack').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#lumberjack').html(temp);
    }

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

    //石礦工
    function rockWorkersUpperFuc() {
        var temp = $('#rockWorkers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#rockWorkers').html(temp);
    }

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

    //鐵礦工
    function ironWorkersUpperFuc() {
        var temp = $('#ironWorkers').html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $('#ironWorkers').html(temp);
    }
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

    //建築
    //房屋

    function houseMakeFuc() {
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

    //鐵工廠

    //鐵工廠 材料需求
    var arsenalWood = [150, 500, 1000, 5000, 9500, 25000, 100000, 250000, 500000, 1000000];
    var arsenalRock = [0, 200, 500, 1000, 5000, 9500, 25000, 100000, 250000, 500000];

    //鐵工廠Level
    var arsenalLevel = 0;
    function arsenalFuc() {
        if(parseInt($('#woodValue').html()) >= arsenalWood[arsenalLevel] && parseInt($('#rockValue').html()) >= arsenalRock[arsenalLevel]){
            arsenalLevel++;
            $('#arsenal').text(buildingLevelChinese[arsenalLevel]);
            $('#arsenalText').html('木頭:' + arsenalWood[arsenalLevel] + '  石頭:' + arsenalRock[arsenalLevel]);
        }
    }

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
            woodSum = wood;
        }

        //石頭生產計算
        rockSum = rock + rockWorkers;
        if(foodOfRockLack){
            foodOfRockLack = 0;
            rockSum = rock;
        }

        //鐵生產計算 
        ironSum = iron + ironWorkers;
        if(foodOfIronLack){
            foodOfIronLack = 0;
            ironSum = iron;
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