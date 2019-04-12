
<script>

(function () {
    $(".EjectMode .describe span").text("新增复印");
    var configAddress="http://"+$("body").attr("address");
    $("#mainInform").css("height","200px");
    $("#secondaryInform").css("height","220px");
    
    
    // $(".common-sure").click(function () {
    //     $(".EjectMode").remove();

    // });
    // console.log(user)
    
    $(".newInformation").css({"width":"600px"});
    var activeID = $(".middleTop .active a").attr("href");
    activeID = activeID.split("_");
    var row = $("#" + activeID[1]).datagrid('getChecked')[0];
    // console.log(row);
    
    $("#fiYin-caoZuoRen").text(user.resultDomain.user.name);
    $("#bingId").text(row.medicalRecId);
    $("#fuYin-date").datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        minView: 2
    });
    
    $("#fuYinDengJi-phone").blur(function(){
        var val = $(this).val();
        if(val != ''){
            if(!isPoneAvailable(val)){
                $(this).val("");
            }
        }
    });
    
    $.ajax({
        type: "post", //post提交方式默认是get
        url: configAddress + "/config/getNewDate",
        dataType: "json",
        success: function (data) {
            // console.log(data)
            $("#fuYin-date").val(data.date);
        }
    })
    $.ajax({                                                     //患者信息回显     
        type: "post", //post提交方式默认是get
        url: configAddress + "/mraBorrowed/queryPatByChildId",
        data: {
            "clinicId":row.clinicId,
            "userId":user.resultDomain.user.id
        },
        dataType: "json",
        success: function (data) {
            if(data.error==false){
           
                $("#bingAnId").html(data.patMap.mrnumber);
                $("#huanZheName").html(data.patMap.patname);
                $("#huanZheSex").html(data.patMap.sex);
                $("#huanZheAge").html(data.patMap.age);
                $("#huanZheIDcard").html(data.patMap.documentnum);
            }else{
                middleOperation({
                    "name": "系统",
                    "id": "System",
                    "important": "classThree",
                    "text": "[系统] 查看：该患者不存在"
                });
            }
        }
    })
    
    $.ajax({  //联系人关系
        type: "POST",
        url:configAddress + "/basicData/findGeneralDictionaryDatasByParentId",
        data:{
            'parentId':'f0d517b9787553b181a32c2779a3b4d0',
            'name':''
        },
        success: function(msg){
            var data = JSON.parse(msg).resultDomains;
            var html = '<option value="">请选择</option>';
            for(var i = 0,l = data.length;i < l;i ++){
                html += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
            }
            $("#huanZhe-Guanxi").html(html);
        }
    });
    
    function isPoneAvailable(poneInput) {
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(poneInput)) {
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classThree",
                "text": "[系统] 手机号输入错误"
            });
            return false;
        } else {
            return true;
        }
    }
    
    $(".common-sure").click(function () {
        var mraPageCopyId = row.mrpcId;  //病案ID
        var printingUserName = $("#fuYinDengJi-name").val();  //复印人姓名
        var contact = $("#fuYinDengJi-phone").val(); //复印人的电话号码
        var contactGeneration = $("#huanZhe-Guanxi > option:selected").text(); // 关系
        var printingReason = $.trim($("#fuYin-YongTu").val());  //用途
        var content = $.trim($("#fuYin-neiRong").val()); //复印内容
        var prove = $.trim($("#fuYin-zhengMing").val());  //证明材料
        var operUserId = user.resultDomain.user.id; //操作人ID
        var clinicId = row.clinicId;  //就诊号ID
        var mrhpId = row.mrhpId; //病案首页ID
        var printDate = $("#fuYin-date").val(); //复印时间
        if(!printingUserName){
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classTwo",
                "text": "请填写复印人姓名"
            });
            return -1;
        }
        if(!contact){
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classTwo",
                "text": "请填写复印人的联系方式"
            });
            return -1;
        }
        if(!contactGeneration || contactGeneration == '请选择'){
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classTwo",
                "text": "请选择与患者的关系"
            });
            return -1;
        }
        
        if(printingUserName != "" && contact != "" && contactGeneration != "请选择"){
            $.ajax({
                url: configAddress + "/mraPringting/savePringtingRecod",
                type: "post",
                data: {
                    "mraPageCopyId":mraPageCopyId,
                    "printingUserName":printingUserName,
                    "contact":contact,
                    "contactGeneration":contactGeneration,
                    "printingReason":printingReason,
                    "content":content,
                    "prove":prove,
                    "operUserId":operUserId,
                    "clinicId":clinicId,
                    "mrhpId":mrhpId,
                    "printDate":printDate
                },
                dataType: "json",
                success: function (data) {
                    if(data.error == false){
                        middleOperation({
                            "name": "系统",
                            "id": "System",
                            "important": "classOne",
                            "text":  data.message
                        });
                    }else{
                        middleOperation({
                            "name": "系统",
                            "id": "System",
                            "important": "classThree",
                            "text":  data.message
                        });
                    }
                    $("#" + activeID[1]).datagrid('reload');
                    $(".EjectMode").remove();
                }
            });
        }else{
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classThree",
                "text":  "请完善复印人、联系电话和关系信息！"
            });   
        }
        
    });
})();

</script>
