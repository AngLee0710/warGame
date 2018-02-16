$(document).ready(function() {
    var CL = console.log;
    //村民
    var villagers = 5;

    //pubilc時間函數
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

    var peopleUpperBtn = [$('#farmersUpper'), $('#cooksUpper'), $('#lumberjackUpper'), $('#rockWorkersUpper'),
        $('#ironWorkersUpper')];

    var peopleLowerBtn = [$('#farmersLower'), $('#cooksLower'), $('#lumberjackLower'),
        $('#ironWorkersLower'), $('#rockWorkersLower')];

    for(var i = 0 ; i < peopleUpperBtn.length ; i++) {
        peopleUpperBtn[i][0].addEventListener('click', function(dom) {
            Upper(dom.path[0].id);
        }, false);

        peopleUpperBtn[i][0].addEventListener('touchstart', function(dom) {
            time = setInterval(function() {
                Upper(dom.path[0].id);
            }, 200);
        }, false);

        peopleUpperBtn[i].mousedown(function(dom) {
            time = setInterval(function() {
                Upper(dom.currentTarget.id);
            }, 200);
        });
    } 
    for(var i = 0 ; i < peopleLowerBtn.length ; i++) {
        peopleLowerBtn[i][0].addEventListener('click', function(dom) {
            Lower(dom.path[0].id);
        }, false);

        peopleLowerBtn[i][0].addEventListener('touchstart', function(dom) {
            time = setInterval(function() {
                Lower(dom.path[0].id);
            }, 200);
        }, false);

        peopleLowerBtn[i].mousedown(function(dom) {
            time = setInterval(function() {
                Lower(dom.currentTarget.id);
            }, 200);
        });
    }

    document.addEventListener('touchend', function() {
        clearInterval(time);
    }, false)

    $(document).mouseup(function() {
        clearInterval(time);
    });

    function Upper(id) {
        var jqueryId = id;
        var jqueryStr = '#' + jqueryId.toString();
        var jqueryStr = jqueryStr.substring(0, jqueryStr.length - 5);
        var temp = $(jqueryStr.toString()).html();
        if(villagers > 0){
            temp++;
            villagers--;
        }
        $(jqueryStr.toString()).html(temp);
    }

    function Lower(id) {
        var jqueryId = id;
        var jqueryStr = '#' + jqueryId.toString();
        var jqueryStr = jqueryStr.substring(0, jqueryStr.length - 5);
        var temp = $(jqueryStr.toString()).html();
        if(temp == 0)
            temp = 0;
        else{
            temp--;
            villagers++;
        }
        $(jqueryStr.toString()).html(temp);
    }

    //遮罩效果
    var peopleScan = [$('#farmers'), $('#cooks'), $('#lumberjack'), $('#rockWorkers'), 
        $('#ironWorkers'), $('#house')];

    var TFHDomId = [$('#plusTen'), $('#plusFifty'), $('#plusHundred'), $('#plusThousand')];

    //共用ID
    var clickBeforeID;

    for(var i = 0 ; i < peopleScan.length ; i++) {  
        peopleScan[i].click(function(dom) {
            $('.bg').css({'display':'block'});
            $('.content').css({'display':'block'});
            clickBeforeID = dom.currentTarget.id;
        });
    }

    for(var i = 0 ; i < TFHDomId.length ; i++) {
        TFHDomId[i].click(function(dom) {
            UpperMore(dom.currentTarget.id, parseInt(dom.currentTarget.innerHTML));
        });
    }

    $('.bg').click(function(){
        $('.bg').css({'display':'none'});
        $('.content').css({'display':'none'});
    }); 

    function UpperMore(id, num) {
        var jqueryStr = '#' + clickBeforeID;
        var temp = 0;
        if(clickBeforeID == 'house') {
            if(parseInt($('#woodValue').html()) >= num * 20) {
                var wood = parseInt($('#woodValue').html());
                wood -= num * 20;
                villagers += 5 * num;
                $('#woodValue').html(wood);
                temp = parseInt($(jqueryStr).html());
                temp += num;
                $(jqueryStr).html(temp);
            }
        } else if(villagers >= num) {
            villagers -= num;
            temp = parseInt($(jqueryStr.toString()).html());
            temp += num;
            $(jqueryStr.toString()).html(temp)
        }
    }

    
    //建築
    //房屋

    $('#houseMake').click(houseMakeFuc);
    $('#houseMake').mousedown(function() {
        time = setInterval(houseMakeFuc, 200);
    })

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
    $('#arsenal').click(arsenalFuc);
    function arsenalFuc() {
        if(parseInt($('#woodValue').html()) >= arsenalWood[arsenalLevel] && parseInt($('#rockValue').html()) >= arsenalRock[arsenalLevel]){
            arsenalLevel++;
            $('#arsenal').text(buildingLevelChinese[arsenalLevel]);
            if(arsenalLevel < 10)
                $('#arsenalText').html('材料:木頭:' + arsenalWood[arsenalLevel] + '  石頭:' + arsenalRock[arsenalLevel]);
            else
                $('#arsenalText').html('已到達等級上限');
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
        if(rice != 0) $('#rice').show();
        if(food != 0) $('#food').show();
        if(wood != 0) $('#wood').show();
        if(rock != 0) $('#rock').show();
        if(iron != 0) $('#iron').show();
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